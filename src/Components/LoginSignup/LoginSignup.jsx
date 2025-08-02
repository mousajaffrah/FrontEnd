import React, { useState } from "react";
import './LoginSignup.css'
import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true, 
});

const LoginSignup = () => {
    const navigate = useNavigate();
    const [action, setAction] = useState("Login");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (action === "Login") {
            if (!formData.name || !formData.password) {
                setError('Please fill in all required fields (Username and Password).');
                return;
            }
        } else {
            if (!formData.name || !formData.email || !formData.password) {
                setError('Please fill in all required fields (Name, Email and Password).');
                return;
            }
        }
        
        setLoading(true);
        
        try {
            if (action === "Login") {
                const response = await api.post('/login', {
                    username: formData.name,
                    password: formData.password
                });
                navigate('/dashboard');
            } else {
                const response = await api.post('/register', {
                    username: formData.name,
                    email: formData.email,
                    password: formData.password
                });
                navigate('/dashboard');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    setError('Invalid username or password. Please try again.');
                } else if (error.response.status === 404) {
                    setError('User not found. Please register first.');
                } else if (error.response.status === 409) {
                    setError('User already exists. Please login instead.');
                } else if (error.response.data && error.response.data.message) {
                    setError(error.response.data.message);
                } else {
                    setError('An error occurred. Please try again.');
                }
            } else if (error.request) {
                setError('Cannot connect to server. Please check your connection.');
            } else {
                setError('An error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
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
                    {action === "Login"?<div className="input">
                        <img src={user_icon} alt=""/>
                        <input 
                            type="text" 
                            placeholder="Username *"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>:<div className="input">
                        <img src={user_icon} alt=""/>
                        <input 
                            type="text" 
                            placeholder="Name *"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>}
                    

                    {action === "Login"?<div></div>:<div className="input">
                        <img src={email_icon} alt=""/>
                        <input 
                            type="email" 
                            placeholder="Email Id *"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>}

                    <div className="input">
                        <img src={password_icon} alt=""/>
                        <input 
                            type="password" 
                            placeholder="Password *"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    
                    

                </div>

                {action === "Sign Up"? <div></div>:<div className="forgot-password">Lost Password ? <span onClick={() => setAction("Sign Up")} style={{cursor: 'pointer', color: '#4c00b4'}}>Click Here!</span></div>}
                
                {/* Error Message */}
                {error && (
                    <div style={{
                        color: '#ff6b6b',
                        textAlign: 'center',
                        margin: '20px 0',
                        padding: '10px',
                        backgroundColor: '#ffe6e6',
                        borderRadius: '5px',
                        border: '1px solid #ff6b6b'
                    }}>
                        {error}
                    </div>
                )}
                
                <div style={{display: 'flex', justifyContent: 'center', margin: '40px 0'}}>
                    <button 
                        type="button" 
                        className="submit" 
                        onClick={handleSubmit}
                        disabled={loading}
                        style={{
                            opacity: loading ? 0.7 : 1,
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? 'Loading...' : 'Submit'}
                    </button>
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