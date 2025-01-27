import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PlusIcon, ListBulletIcon, UsersIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const BottomBar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Function to handle logout
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

    const navItems = [
        { name: 'Add Product', to: '/admin/add-product', icon: PlusIcon },
        { name: 'List Products', to: '/admin/list-products', icon: ListBulletIcon },
        { name: 'List Users', to: '/admin/list-users', icon: UsersIcon },
    ];

    return (
        <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white flex justify-around items-center md:hidden">
            {navItems.map((item) => (
                <Link
                    key={item.name}
                    to={item.to}
                    className={`flex flex-col items-center p-2 ${
                        location.pathname === item.to ? 'bg-gray-700' : ''
                    }`}
                >
                    <item.icon className="h-6 w-6" />
                    <span className="text-xs">{item.name}</span>
                </Link>
            ))}
            <button onClick={handleLogout} className="flex flex-col items-center p-2">
                <ArrowRightOnRectangleIcon className="h-6 w-6" />
                <span className="text-xs">Logout</span>
            </button>
        </div>
    );
};

export default BottomBar;
