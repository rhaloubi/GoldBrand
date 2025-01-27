import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PlusIcon, ListBulletIcon, UsersIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon, Bars3Icon } from '@heroicons/react/24/outline';
import axios from 'axios';

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        const token = localStorage.getItem('authToken');
        try {
            await axios.post(`${import.meta.env.REACT_API_URL}/api/logout`, {}, {
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
        <>
            {/* Sidebar */}
            <div className="hidden md:fixed md:top-0 md:left-0 md:w-64 md:h-screen bg-gray-800 text-white md:flex flex-col">
                <div className="p-4 text-[31px]  hover:underline font-bold">
                    <Link to='/admin/dashboard' >Dashboard</Link> 
                </div>
                <nav className="flex-1 overflow-y-auto">
                    <ul>
                        {navItems.map((item) => (
                            <li
                                key={item.name}
                                className={`p-4 flex items-center space-x-3 hover:bg-gray-700 transition ${
                                    location.pathname === item.to ? 'bg-gray-700' : ''
                                }`}
                            >
                                <item.icon className="h-8 w-8 text-white" />
                                <Link to={item.to} className="flex-1">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                {/* Logout button fixed to the bottom left */}
                <div className="p-4 flex items-center space-x-3 cursor-pointer hover:bg-gray-700 transition mt-auto" onClick={handleLogout}>
                    <ArrowRightOnRectangleIcon className="h-6 w-6 text-white" />
                    <span>Logout</span>
                </div>
            </div>

            {/* Main content */}
            <div className="ml-1 mb-[250px] md:mb-1 md:ml-64 ">
            </div>
        </>
    );
};

export default Sidebar;
