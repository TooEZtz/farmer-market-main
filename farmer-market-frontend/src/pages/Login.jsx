import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './styles/login.css'

function Login() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            const { token, userType } = response.data;
            login(token, userType);
            if (userType === 'farmer') navigate('/farmer-dashboard');
            else navigate('/user-dashboard');
        } catch (error) {
            console.error('Login error:', error);
            alert('Invalid credentials');
        }
    };

    return (
        <div className="login">
            <h1>Login</h1>
            <div className='forms'>
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Login</button>
                </form>
            </div>
            <p>Don't have an account? <a href="/signup">Sign up here</a></p>
        </div>
    );
}

export default Login;
