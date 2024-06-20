import React, { useState, useEffect } from 'react';
import API from '../utils/api';

const Profile = () => {
    const [profile, setProfile] = useState({ name: '', email: '' });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await API.get('/user/profile');
                setProfile(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="container mx-auto mt-10">
            <h2 className="text-2xl font-bold">Profile</h2>
            <div className="mt-4">
                <strong>Name:</strong> {profile.name}
            </div>
            <div className="mt-2">
                <strong>Email:</strong> {profile.email}
            </div>
        </div>
    );
};

export default Profile;
