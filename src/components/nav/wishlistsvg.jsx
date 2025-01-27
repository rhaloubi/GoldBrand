import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const WishlistIcon = () => {
    const [wishlistCount, setWishlistCount] = useState(0);
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

    useEffect(() => {
        const fetchWishlistCount = async () => {
            if (authToken) {
                try {
                    const response = await axios.get('https://api.clarodigi.com/api/wishlist/count', {
                        headers: {
                            Authorization: `Bearer ${authToken}`
                        }
                    });
                    setWishlistCount(response.data.count);
                } catch (error) {
                    console.error('Error fetching wishlist count:', error);
                }
            }
        };

        fetchWishlistCount();
    }, [authToken]); // Refresh count if authToken changes

    return (
        <Link to="/Wishlist" className="link-click relative group">
            <div className="link-content">
                <div className="relative">
                    {/* Wishlist Count Badge */}
                    {wishlistCount > 0 && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white  rounded-full px-1 py-0.5"
                        style={{fontSize:'11px', lineHeight:'14px'}}>
                            {wishlistCount}
                        </span>
                    )}
                    {/* Wishlist Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                </div>
            </div>
        </Link>
    );
};

export default WishlistIcon;
