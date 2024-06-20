import React from 'react';
import AuthForm from '../components/AuthForm';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = async (formData) => {
        try {
            const response = await API.post('/auth/login', formData);
            localStorage.setItem('token', response.data.token);
            navigate('/profile');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <AuthForm onSubmit={handleLogin} buttonText="Login" />
            </div>
        </div>
    );
};

export default Login;
