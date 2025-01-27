import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

function SidebarCart() {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const svgRef = useRef(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      const items = JSON.parse(storedCartItems).map(item => ({
        ...item,
        quantity: item.quantity || 1
      }));
      setCartItems(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleRemove = (id) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
  };

  const handleQuantityChange = (id, size, change) => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === id && item.size === size) {
          const newQuantity = Math.max(1, Math.min(10, item.quantity + change));
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const totalPrice = cartItems.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0).toFixed(2);

  // Dropdown menu animations
  useEffect(() => {
    gsap.to(dropdownRef.current, {
      opacity: isOpen ? 1 : 0,
      y: isOpen ? 0 : -10,
      duration: 0.3,
      pointerEvents: isOpen ? 'auto' : 'none'
    });
  }, [isOpen]);

  // SVG hover animations
  const handleSvgMouseEnter = () => {
    gsap.to(svgRef.current, { scale: 1.2, duration: 0.3, ease: 'power2.out' });
  };

  const handleSvgMouseLeave = () => {
    gsap.to(svgRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
  };

  // Fetch Romper products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.REACT_API_URL}/api/products`);
        const romperProducts = response.data.filter(product => product.category === 'T-shirt');
        const firstFiveRomperProducts = romperProducts.slice(0, 5);
        setProducts(firstFiveRomperProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

 

  const closeSidebar = () => {
    gsap.to(sidebarRef.current, { x: '100%', duration: 0.9, ease: 'power2.out' });
    setIsSidebarVisible(false);
  };

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(prev => !prev);
  };

  useEffect(() => {
    const timeline = gsap.timeline();
    if (isNavbarOpen) {
      timeline
        .to('.navigation-shade', { opacity: 0.1, visibility: 'visible', duration: 0.5 })
        .to('.navigation-tile', {
          y: '0%',
          rotate: '0deg',
          scaleX: 1.02,
          scaleY: 1.05,
          stagger: 0.1,
          duration: 0.8,
          ease: 'expo.out',
        }, "-=0.5")
        .to('.navigation-center .link', { y: '0%', rotate: '0deg', duration: 0.8, stagger: 0.1, ease: 'expo.out' }, "-=0.8");
    } else {
      timeline
        .to('.navigation-center .link', { y: '110%', rotate: '-6deg', duration: 0.5, stagger: 0.1, ease: 'expo.in' })
        .to('.navigation-tile', {
          y: '100%',
          rotate: '-6deg',
          scaleX: 1.2,
          scaleY: 1.05,
          stagger: 0.1,
          duration: 0.5,
          ease: 'expo.in',
        }, "-=0.5")
        .to('.navigation-shade', { opacity: 0, visibility: 'hidden', duration: 0.3 }, "-=0.5");
    }
  }, [isNavbarOpen]);

  return (
        <>
            {/* Sidebar (right side) */}
            <div
                ref={sidebarRef}
                className="fixed bg-black border-l h-full right-0 border-white flex flex-col md:flex-row w-full md:w-2/3 md:transform-none md:translate-x-0"
                style={{ transform: 'translateX(100%)', zIndex: '9000' }} // Initial position off-screen
            >
                {/* Left section of the sidebar - ANYTHING ELSE? */}
                <div className="w-full md:w-1/3 border-r border-white bg-black flex flex-col overflow-y-auto md:overflow-y-auto overflow-x-hidden md:overflow-x-hidden md:order-1">
                <div className='border-b pl-7 pt-6 p-3 border-white'>
                    <h3 className="text-xl text-white font-bold mb-4" style={{ fontSize: '30px' }}>ANYTHING ELSE?</h3>
                </div>

                {/* Loop over the fetched romper products */}
                <div className="flex flex-col space-y-4">
                    {products.map(product => (
                    <div key={product.id} onClick={() => handleProductClick(product.id)} className="flex-shrink-0 w-full">
                        <div className="p-4 bg-black border-b sm:p-6 border-white"
                            onClick={handleProductClick}>
                        <img 
                            src={`${import.meta.env.REACT_API_URL}/storage/${product.images[0]?.image_path}`} 
                            alt={product.name} 
                            className="w-full h-80 object-cover" 
                        />
                        <h3 className="font-semibold text-white text-lg mb-2">{product.name}</h3>
                        <p className="text-lg text-white font-semibold">{`DH ${product.price}`}</p>
                        </div>
                    </div>
                    ))}
                </div>
                </div>

                {/* Right section of the sidebar - YOUR BAG */}
                <div className="w-full md:w-2/3 flex flex-col p-4 bg-black h-full md:h-auto md:overflow-auto md:order-2">
                {/* Close Button */}
                <button className="self-end text-white" onClick={closeSidebar}>
                    Close
                </button>
                <h3 className="text-xl font-bold mb-4 text-white">YOUR BAG</h3>
                {cartItems.length === 0 ? (
                    <p className="text-lg text-white">Your cart is empty</p>
                ) : (
                    cartItems.map((item, index) => (
                    <div key={index} className="border-b border-white pb-2 mb-4">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover mb-2" />
                        <h3 className="font-semibold text-lg text-white">{item.name}</h3>
                        <p className="text-lg text-white">{`Price: DH ${item.price}`}</p>
                        <p className="text-lg text-white">{`Size: ${item.size}`}</p>
                        <div className="flex items-center">
                        <button onClick={() => handleQuantityChange(item.id, item.size, -1)} className="text-white">
                            -
                        </button>
                        <p className="mx-2 text-white">{item.quantity}</p>
                        <button onClick={() => handleQuantityChange(item.id, item.size, 1)} className="text-white">
                            +
                        </button>
                        </div>
                        <p className="text-lg text-white">{`Total: DH ${(item.quantity * item.price).toFixed(2)}`}</p>
                        <button onClick={() => handleRemove(item.id)} className="text-red-500">Remove</button>
                    </div>
                    ))
                )}
                <div className="mt-auto">
                    <p className="text-lg font-bold mb-4 text-white">{`Total: DH ${totalPrice}`}</p>
                    <button className="px-4 py-2  text-white bg-green-600">Proceed to Checkout</button>
                </div>
                </div>
            </div>
        </>
  );
}

export default SidebarCart;
