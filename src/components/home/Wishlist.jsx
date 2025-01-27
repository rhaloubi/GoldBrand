import React, { useState, useEffect } from 'react';
import Header from "../nav/Header";
import Footer from '../nav/footer';
import useAuth from '../../auth/useAuth';
import Template from '../../template';
import axios from 'axios';
import Toast from '../media/store/Toast'; // Import Toast component

const Wishlist = () => {
    useAuth();
    const [wishlistItems, setWishlistItems] = useState([]);
    const [selectedSize, setSelectedSize] = useState({});
    const [error, setError] = useState('');
    const [toast, setToast] = useState({ message: '', type: '' }); // State for toast notification

    // Define available sizes
    const availableSizes = ["XS", "S", "M", "L", "XL", "2XL"];

    useEffect(() => {
        const fetchWishlistItems = async () => {
            const token = localStorage.getItem('authToken');
            try {
                const response = await axios.get('https://api.clarodigi.com/api/wishlist/items', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const itemsWithQuantity = response.data.map(item => ({
                    ...item,
                    quantity: 1, // Add quantity field for each product
                }));
                setWishlistItems(itemsWithQuantity);
            } catch (error) {
                console.error('Error fetching wishlist items:', error);
                setError('Failed to fetch wishlist items. Please try again later.');
            }
        };

        fetchWishlistItems();
    }, []);

    const handleDelete = async (productId) => {
        const token = localStorage.getItem('authToken');
        const confirmDelete = window.confirm('Do you want to delete this product?');

        if (confirmDelete) {
            try {
                await axios.delete(`https://api.clarodigi.com/api/wishlist/remove?product_id=${productId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setWishlistItems(prevItems => prevItems.filter(item => item.product.id !== productId));
                setToast({ message: 'Item removed from wishlist', type: 'success' });
            } catch (error) {
                console.error('Error removing item from wishlist:', error.response?.data || error.message);
                setToast({ message: 'Failed to remove item from wishlist', type: 'danger' });
            }
        }
    };

    // Handle quantity change
    const handleQuantityChange = (productId, change) => {
        setWishlistItems(prevItems =>
            prevItems.map(item =>
                item.product.id === productId
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        );
    };

    // Handle size selection
    const handleSizeChange = (productId, size) => {
        setSelectedSize(prevSelectedSize => ({
            ...prevSelectedSize,
            [productId]: size,
        }));
    };

    // Add to cart functionality
    const handleAddToCart = (item) => {
        const selectedSizeForProduct = selectedSize[item.product.id];
        
        if (!selectedSizeForProduct) {
            setToast({ message: 'Please select a size before adding to the cart.', type: 'warning' });
            return;
        }
    
        // Create cart item object
        const cartItem = {
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            size: selectedSizeForProduct,
            image: `https://api.clarodigi.com/storage/${item.product.images[0]?.image_path}`, // Adjusted image URL format
        };
    
        // Retrieve existing cart items from localStorage
        const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
        // Add new item to the cart
        const updatedCartItems = [...existingCartItems, cartItem];
    
        // Save updated cart to localStorage
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        window.location.reload();

        setToast({ message: 'Item added to cart!', type: 'success' });
    };
    

    // Calculate the total price of the wishlist based on quantities
    const calculateTotalPrice = () => {
        return wishlistItems.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2);
    };

    return (
        <Template>
            <Header />
            <main className="main py-[100px]">
                <section className="wishlist-section pb-[50px]">
                    <h1 className="text-6xl font-bold text-center text-white mb-8">MY WISHLIST</h1>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <div className="wishlist-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-10">
                        {wishlistItems.length > 0 ? (
                            wishlistItems.map(item => (
                                <div key={item.product.id} className="wishlist-item border rounded-lg shadow-lg p-4 bg-gray-800">
                                    <div className="relative">
                                        {item.product.images && item.product.images.length > 0 && (
                                            <img 
                                                src={`https://api.clarodigi.com/storage/${item.product.images[0].image_path}`} 
                                                alt={item.product.name}
                                                className="w-full h-[300px] object-cover rounded-md mb-4"
                                            />
                                        )}
                                        <button
                                            onClick={() => handleDelete(item.product.id)}
                                            className="absolute top-0 right-0 text-black bg-white rounded-full p-1"
                                        >
                                            <span className="text-[25px] px-3 bg-black text-bold hover:text-red-600 hover:underline text-white" 
                                            style={{borderRadius:'50%'}}>&times;</span>
                                        </button>
                                    </div>
                                    <div className="item-info text-center">
                                        <h2 className="text-[25px] md:text-[25px] pb-3 font-semibold text-white">{item.product.name}</h2>
                                        
                                        {/* Size Selector */}
                                        <div className="sizes mb-4">
                                            <div className="flex justify-center gap-2">
                                                {availableSizes.map(size => (
                                                    <label 
                                                    key={size} 
                                                    className={`text-white font-bold py-[4px] px-[10px] border rounded-full cursor-pointer ${
                                                        selectedSize[item.product.id] === size && item.product.size.includes(size) ? 
                                                        'bg-yellow-500 border-yellow-500' : 
                                                        'bg-gray-700 border-gray-600'
                                                    } transition duration-200 ${
                                                        item.product.size.includes(size) ? 
                                                        'hover:bg-yellow-400' : 
                                                        'bg-red-500 border-red-500 cursor-not-allowed'
                                                    }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name={`size-${item.product.id}`}
                                                        value={size}
                                                        disabled={!item.product.size.includes(size)}
                                                        checked={selectedSize[item.product.id] === size}
                                                        onChange={() => handleSizeChange(item.product.id, size)}
                                                        className="hidden" // Hide the default radio button
                                                    />
                                                    {size}
                                                </label>

                                                ))}
                                            </div>
                                        </div>

                                        <p className="text-xl font-bold my-2 text-white">{`DH ${(item.product.price * item.quantity).toFixed(2)}`}</p>
                                        
                                        {/* Quantity Selector */}
                                        <div className="quantity-selector flex justify-center items-center mb-4">
                                            <button 
                                                className="px-2 py-1 bg-gray-700 rounded-l"
                                                onClick={() => handleQuantityChange(item.product.id, -1)}
                                                style={{ border: '2px solid white' }}
                                                disabled={item.quantity <= 1}
                                            >
                                                −
                                            </button>
                                            <input 
                                                type="number" 
                                                value={item.quantity} 
                                                readOnly
                                                className="w-12 text-center border border-gray-100 bg-gray-700 text-white"
                                                style={{ border: '2px solid white' }} 
                                            />
                                            <button 
                                                className="px-2 py-1 bg-gray-700 rounded-r"
                                                onClick={() => handleQuantityChange(item.product.id, 1)}
                                                style={{ border: '2px solid white' }}
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Add to Cart Button */}
                                        <button 
                                            className="w-full py-2 rounded bg-yellow-500  text-bold text-gray-800 hover:text-gray-600 hover:underline"
                                            onClick={() => handleAddToCart(item)}
                                        >
                                           <span> Add to Cart </span>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-white text-center">No items in your wishlist.</p>
                        )}
                    </div>

                    {/* Total Price Section */}
                    <div className="text-center text-white mt-8">
                        <h2 className="text-2xl font-bold">Total Price: DH {calculateTotalPrice()}</h2>
                    </div>
                </section>
                <Footer />
            </main>
            {toast.message && (
                <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />
            )}
        </Template>
    );
};

export default Wishlist;
