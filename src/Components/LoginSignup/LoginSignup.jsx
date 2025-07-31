import React, { useState } from "react";
import './LoginSignup.css'

import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';

import axios from "axios";
import { useNavigate } from "react-router-dom";



const api = axios.create({
    baseURL: 'http://localhost:5000',
});

const LoginSignup = () => {
    const navigate = useNavigate();

    const[action,setAction] = useState("Login");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted, action:', action);
        console.log('Form data:', formData);
        
        try {
            if (action === "Login") {
                console.log('Attempting login...');
                const response = await api.post('/api/login', {
                    email: formData.email,
                    password: formData.password
                });
                console.log('Login successful:', response.data);
                
                // Navigate to dashboard after successful login
                console.log('Navigating to dashboard...');
                navigate('/dashboard');
            } else {
                console.log('Attempting signup...');
                const response = await api.post('/api/registration', {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                });
                console.log('Signup successful:', response.data);
                
                // Navigate to dashboard after successful signup
                console.log('Navigating to dashboard...');
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error:', error);
            console.log('Navigation failed due to API error');
        }
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">{ action }</div>
                <div className="underline"></div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    {action === "Login"?<div></div>:<div className="input">
                        <img src={user_icon} alt=""/>
                        <input 
                            type="text" 
                            placeholder="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>}
                    

                    <div className="input">
                        <img src={email_icon} alt=""/>
                        <input 
                            type="email" 
                            placeholder="Email Id"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="input">
                        <img src={password_icon} alt=""/>
                        <input 
                            type="password" 
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    

                </div>

                {action === "Sign Up"? <div></div>:<div className="forgot-password">Lost Password ? <span onClick={() => setAction("Sign Up")} style={{cursor: 'pointer', color: '#4c00b4'}}>Click Here!</span></div>}
                
                                {/* Centered Submit Button */}
                <div style={{display: 'flex', justifyContent: 'center', margin: '40px 0'}}>
                    <button type="button" className="submit" onClick={handleSubmit}>Submit</button>
                    
                </div>
            </form>

            <div className="submit-container">
                <div className={action==="Login"?"submit gray":"submit"} onClick={() =>{setAction("Sign Up")}}>Sign Up</div>
                <div className={action==="Sign Up"?"submit gray":"submit"} onClick={() =>{setAction("Login")}}>Login</div>
            </div>
        </div>
    )
}

export default LoginSignup;

// on submit
// hit test on backend 
// wait noor


// react native expo