import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../admin/Sidebar';
import Topbar from '../admin/topbar';
import Bottombar from '../admin/bottombar';
import Loading from '../components/nav/loading'; // Import the Loading component

const PrivateRoute = ({ isAdminRoute }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const response = await axios.get('https://api.clarodigi.com/api/user', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                const user = response.data;
                setIsAdmin(user.admin === 1);
            } catch (error) {
                console.error('Error checking admin status:', error);
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        };

        checkAdmin();
    }, []);

    if (loading) {
        return <Loading/>;
    }

    if (isAdminRoute && !isAdmin) {
        return <Navigate to="/" replace />;
    }

    return ( 
            <div className="flex">
               <Topbar/>
                <Sidebar />
                <div className="flex-grow ">
                    <Outlet />
                </div>
                <Bottombar/>

            </div>
);
};

export default PrivateRoute;
