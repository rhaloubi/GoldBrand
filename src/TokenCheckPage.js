import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TokenCheckPage = () => {
    const [status, setStatus] = useState('Checking token...');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('authToken'); // Make sure to use the correct key
            console.log("Token retrieved from Local Storage:", token);

            if (!token) {
                setStatus('No token found');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('https://api.clarodigi.com/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Token verification response:', response.data);

                // Check for a valid token
                if (response.data && response.data.id) {
                    setStatus('Token is valid');
                } else {
                    setStatus('Invalid token');
                }
            } catch (error) {
                console.error('Error verifying token:', error);
                setStatus('Invalid token');
            } finally {
                setLoading(false);
            }
        };

        checkToken();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className='text-white'>Token Check</h1>
            <p className='text-white'>Status: {status}</p>
        </div>
    );
};

export default TokenCheckPage;
