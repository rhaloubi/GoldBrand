import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightOnRectangleIcon, UserIcon } from '@heroicons/react/24/outline';
import Avatar from 'react-avatar'; // Importing Avatar from react-avatar
import axios from 'axios';

const TopBar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    // Toggle the dropdown
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    // Handle profile navigation
    const handleProfileClick = () => {
        navigate('/profile'); // Adjust to your actual profile route
        setDropdownOpen(false);
    };

    // Handle logout functionality
    const handleLogout = async () => {
        const token = localStorage.getItem('authToken');
        try {
            await axios.post('https://api.clarodigi.com/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            localStorage.removeItem('authToken'); // Clear the token from local storage
            navigate('/login'); // Redirect to the login page
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleLogoutClick = () => {
        handleLogout();
        setDropdownOpen(false);
    };

    return (
        <div className="fixed top-0 left-0 w-full bg-gray-800 text-white flex justify-between items-center p-2 shadow-md z-50 md:hidden">
            {/* Left: Dashboard Button */}
            <div>
                <Link to="/admin/dashboard" className="flex items-center p-2">
                    <span className="ml-2 text-lg">Dashboard</span>
                </Link>
            </div>

            {/* Right: Profile with Dropdown */}
            <div className="relative">
                <button onClick={toggleDropdown} className="flex items-center p-2 focus:outline-none">
                    <Avatar
                        name="Reda Haloubi" // Replace with the actual user name
                        round={true}
                        size="40"       // Size of the avatar
                        textSizeRatio={1.75} // Adjust text size for initials
                        color="#f5f5f5"  // Optional: Background color
                        fgColor="#333"   // Optional: Foreground color (text)
                    />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-2">
                        <button
                            onClick={handleProfileClick}
                            className="block px-4 py-2 text-sm text-white hover:bg-gray-600 w-full text-left"
                        >
                            <UserIcon className="inline-block h-5 w-5 mr-2" /> Profile
                        </button>
                        <button
                            onClick={handleLogoutClick}
                            className="block px-4 py-2 text-sm text-white hover:bg-gray-600 w-full text-left"
                        >
                            <ArrowRightOnRectangleIcon className="inline-block h-5 w-5 mr-2" /> Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopBar;
