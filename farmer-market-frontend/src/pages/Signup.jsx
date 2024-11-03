import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/Signup.css'

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('customer');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/signup', { name, email, password, userType });
            alert('Signup successful! Please login.');
            navigate('/');
        } catch (error) {
            console.error('Signup error:', error);
            alert('Error signing up');
        }
    };

    return (
        <div className="signup">
            <h1>Signup</h1>
            <div className='forms'>
                <form onSubmit={handleSignup}>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <label>
                        I am a:
                        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                            <option value="customer">Customer</option>
                            <option value="farmer">Farmer</option>
                        </select>
                    </label>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            <p>Already have an account? <a href="/">Login here</a></p>
        </div>
    );
}

export default Signup;
