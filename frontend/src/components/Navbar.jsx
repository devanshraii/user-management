import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex space-x-4">
                <li>
                    <Link to="/" className="text-white hover:text-gray-400">Home</Link>
                </li>
                {localStorage.getItem('token') ? (
                    <>
                        <li>
                            <Link to="/profile" className="text-white hover:text-gray-400">Profile</Link>
                        </li>
                        <li>
                            <Link to="/profile-management" className="text-white hover:text-gray-400">Profile Management</Link>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="text-white hover:text-gray-400">Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login" className="text-white hover:text-gray-400">Login</Link>
                        </li>
                        <li>
                            <Link to="/register" className="text-white hover:text-gray-400">Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
