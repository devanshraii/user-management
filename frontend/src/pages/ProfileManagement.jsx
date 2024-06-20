import React, { useState, useEffect } from 'react';
import API from '../utils/api';

const ProfileManagement = () => {
    const [profile, setProfile] = useState({ name: '', email: '' });
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await API.get('/user/profile');
                setProfile(response.data);
                setFormData(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.put('/user/profile', formData);
            setProfile(formData);
            setIsEditing(false);
            setMessage('Profile updated successfully');
        } catch (err) {
            console.error(err);
            setMessage('Error updating profile');
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-2xl font-bold">Profile Management</h2>
            {message && <p className="mt-2 text-green-500">{message}</p>}
            {isEditing ? (
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-2"
                    >
                        Cancel
                    </button>
                </form>
            ) : (
                <div className="mt-4">
                    <div className="mt-2">
                        <strong>Name:</strong> {profile.name}
                    </div>
                    <div className="mt-2">
                        <strong>Email:</strong> {profile.email}
                    </div>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Edit Profile
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileManagement;
