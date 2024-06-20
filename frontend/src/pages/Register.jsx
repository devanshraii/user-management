import React from 'react';
import AuthForm from '../components/AuthForm';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const handleRegister = async (formData) => {
        try {
            await API.post('/auth/register', formData);
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                <AuthForm onSubmit={handleRegister} buttonText="Register" />
            </div>
        </div>
    );
};

export default Register;
