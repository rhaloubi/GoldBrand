import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('authToken');
            try {
                const response = await axios.get('https://api.clarodigi.com/api/users', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Access the users array from response.data.users
                setUsers(response.data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to fetch users. Please try again later.');
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        const token = localStorage.getItem('authToken');
        const confirmDelete = window.confirm('Do you want to delete this user?');

        if (confirmDelete) {
            try {
                await axios.delete(`https://api.clarodigi.com/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(users.filter(user => user.id !== userId));
            } catch (error) {
                console.error('Error deleting user:', error);
                setError('Failed to delete user. Please try again later.');
            }
        }
    };


    return (
        <div className="p-6 mt-14 md:mt-1">
            <h2 className="text-2xl font-bold text-white">List of Users</h2>
            
            {error && <p className="text-red-500">{error}</p>}
            <ul className="space-y-4">
                {users.length > 0 ? (
                    users.map((user) => (
                        <li key={user.id} className="p-4 bg-gray-800 rounded-lg flex justify-between items-center">
                            <div>
                                <p className="text-white"><strong className='text-[#F9D00F]'>Name:</strong> {user.name}</p>
                                <p className="text-white"><strong className='text-[#F9D00F]'>Email:</strong> {user.email}</p>
                                <p className="text-white"><strong className='text-[#F9D00F]'>Admin:</strong> {user.admin === 1 ? 'Yes' : 'No'}</p>
                            </div>
                            <div className="flex items-center">
                              
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-white">No users found.</p>
                )}
            </ul>
        </div>
    );
};

export default ListUsers;
