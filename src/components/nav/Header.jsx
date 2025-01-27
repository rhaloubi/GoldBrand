import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import axios from 'axios';
import Navbar from './navbar'; // Make sure to replace this with the correct path to your Navbar component
import WishlistIcon from './wishlistsvg';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../About';
import CartIcon from '../media/store/CartIcon'
const Header = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const svgRef = useRef(null);
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Adjust the width as needed
  const [cartItemCount, setCartItemCount] = useState(0);
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItemCount(storedCartItems.length);
  }, []);

  const handleClick = () => {
    if (isMobile) {
      navigate('/login'); // Navigate to the login page on mobile
    } else {
      handleDropdownToggle(); // Toggle the dropdown on non-mobile
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the width as needed
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Check if the user is logged in by looking for a token or user info in local storage
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  // Toggle the dropdown visibility
 

  const handleLogout = () => {
    // Clear the token or user information from local storage
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    // Refresh the page
    window.location.reload();
  };


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

  const handleRemove = (id, size) => {
    const updatedCartItems = cartItems.filter(item => !(item.id === id && item.size === size));
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
        const response = await axios.get('https://api.clarodigi.com/api/products');
        const romperProducts = response.data.filter(product => product.category === 'T-shirt');
        const firstFiveRomperProducts = romperProducts.slice(0, 5);
        setProducts(firstFiveRomperProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const toggleSidebar = () => {
    const sidebar = sidebarRef.current;
    gsap.to(sidebar, { x: isSidebarVisible ? '100%' : '0%', duration: 0.9, ease: 'power2.out' });
    setIsSidebarVisible(!isSidebarVisible);
  };

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

     // Dropdown menu animations
  const handleDropdownToggle = () => {
    setIsOpen(prev => !prev);
  };

  
  return (

    <div className="flex bg-black text-white">
    
       <header>
                <div className="main-nav-bar">
                    <div className="row">
                        <nav aria-label="Navigation Desktop">
                            <ul>
                                <li className="link large">
                                <Link   to="/AllProducts" 
                      onClick={(e) => {
                        
                        // Check if the current page is already '/AllProducts'
                        if (window.location.pathname === '/AllProducts') {
                          e.preventDefault(); // Prevent default navigation
                          window.location.reload(); // Manually reload the page
                        }
                      }}  className="link-click">
                                        <div className="link-content">
                                            <div className="link-text">
                                                <span>Product</span>
                                                <span className="duplicate">Product</span>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="link large">
                                <Link   to="/AllProducts" 
                      onClick={(e) => {
                        // Set the selected gender to 'kids'
                        localStorage.setItem('selectedGender', 'male');
                        
                        // Check if the current page is already '/AllProducts'
                        if (window.location.pathname === '/AllProducts') {
                          e.preventDefault(); // Prevent default navigation
                          window.location.reload(); // Manually reload the page
                        }
                      }}  className="link-click">
                                        <div className="link-content">
                                            <div className="link-text">
                                                <span>Men</span>
                                                <span className="duplicate">Men</span>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="link-logo">
                                    <Link to="/" className="link-logo-click">
                                        <h1 className="text-white text-[25px] text-center md:text-[33px]" >골드 브랜드</h1>
                                    </Link>
                                </li>
                                <li className="link large">
                                <Link 
                      to="/AllProducts" 
                      onClick={(e) => {
                        // Set the selected gender to 'kids'
                        localStorage.setItem('selectedGender', 'kids');
                        
                        // Check if the current page is already '/AllProducts'
                        if (window.location.pathname === '/AllProducts') {
                          e.preventDefault(); // Prevent default navigation
                          window.location.reload(); // Manually reload the page
                        }
                      }} className="link-click">
                                        <div className="link-content">
                                            <div className="link-text">
                                                <span>Kids</span>
                                                <span className="duplicate">Kids</span>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                <li className="link large flex space-x-4">
                                <WishlistIcon/>
                                
                                <div 
                                    onClick={handleClick} 
                                    className="link-click flex items-center cursor-pointer"
                                >
                                    <div  className="link-click relative group">
                                    <div className="link-content">
                                        <div className="link-text flex items-center">
                                        <span>
                                            <svg
                                            width="25px"
                                            height="25px"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            >
                                            <circle cx="12" cy="6" r="4" stroke="#FCFFE0" strokeWidth="1.5" />
                                            <path
                                                d="M15 20.6151C14.0907 20.8619 13.0736 21 12 21C8.13401 21 5 19.2091 5 17C5 14.7909 8.13401 13 12 13C15.866 13 19 14.7909 19 17C19 17.3453 18.9234 17.6804 18.7795 18"
                                                stroke="#FCFFE0"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                            </svg>
                                        </span>
                                        <span className="duplicate">
                                            <svg
                                            width="25px"
                                            height="25px"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            >
                                            <circle cx="12" cy="6" r="4" stroke="#FCFFE0" strokeWidth="1.5" />
                                            <path
                                                d="M15 20.6151C14.0907 20.8619 13.0736 21 12 21C8.13401 21 5 19.2091 5 17C5 14.7909 8.13401 13 12 13C15.866 13 19 14.7909 19 17C19 17.3453 18.9234 17.6804 18.7795 18"
                                                stroke="#FCFFE0"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                            </svg>
                                        </span>
                                        </div>
                                    </div>

                                   
                                </div> 
                                </div>

                                    <a  onClick={toggleSidebar} className="link-click cart-button">
                                      <div className="link-content">
                                        
                                          <CartIcon/>

                                      </div>
                                  </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="btn btn-hamburger" onClick={toggleNavbar} >
                    <div className="btn-click">
                        <div className="btn-icon">
                            <div className="hamburger">
                                <div className="bar before" />
                                <div className="bar" />
                                <div className="bar after" />
                            </div>
                        </div>
                        <div className="btn-content">
                            {isNavbarOpen ? (
                                <div className="btn-text ">
                                    <span>Close</span>
                                    <span className="duplicate">Close</span>
                                </div>
                            ) : (
                                <div className="btn-text">
                                    <span>Menu</span>
                                    <span className="duplicate">Menu</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            <div
              ref={dropdownRef}
              className="fixed top-11 right-0 mt-2 w-48 bg-white text-black border border-gray-200 rounded-md shadow-lg flex hidden md:flex"
              style={{ opacity: 0, transform: 'translateY(-100vh)', zIndex: 9999, transition: 'transform 0.3s ease, opacity 0.3s ease', pointerEvents: 'none' }}
            >
              <ul className="py-2">
                {isLoggedIn ? (
                  <>
                    <li>
                      <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/signup" className="block px-4 py-2 hover:bg-gray-100">
                        Join Us
                      </Link>
                    </li>
                    <li>
                      <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">
                        Login
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <nav
                aria-label="Navigation Overlay and Mobile"
                className={`navigation-full ${isNavbarOpen ? 'active' : ''}`}
                data-navigation-status={isNavbarOpen ? 'active' : 'inactive'}
                
            >
                <Navbar />
            </nav>
     

      {/* Sidebar (right side) */}
      <div
          ref={sidebarRef}
          className="fixed bg-black border-l h-full right-0 border-white flex flex-col md:flex-row w-full md:w-2/3 md:transform-none md:translate-x-0"
          style={{ transform: 'translateX(100%)', zIndex: '9000' }} // Initial position off-screen
        >
          {/* Left section of the sidebar - ANYTHING ELSE? */}
          <div className="w-full md:w-1/3 border-r border-white bg-black flex flex-col overflow-y-auto md:overflow-y-auto overflow-x-hidden md:overflow-x-hidden md:order-1">
      <div className='border-b pl-7 pt-6 p-3 border-white'>
        <h3 className="text-xl text-white font-bold mb-2" style={{ fontSize: '42px' }}>ANYTHING ELSE?</h3>
      </div>

      {/* Loop over the fetched romper products */}
      <div className="flex flex-col space-y-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onClick={() => handleProductClick(product.id)} />
        ))}
      </div>
    </div>

          {/* Right section of the sidebar - YOUR BAG */}
                <div className="w-full md:w-2/3 flex flex-col p-4 md:p-4 min-h-screen bg-black md:order-2 relative">
            <div className="flex justify-between items-center p-4 md:p-1 border-b border-white">
              <h3 className="text-xl text-white font-bold mb-4" style={{ fontSize: '36px' }}>CART :</h3>
              <button onClick={closeSidebar} className="text-[#F9D00F] hover:underline">
               <span className='text-white hover:text-[#F9D00F] text-[20px] '>Close</span>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto mb-20">
              <div className="my-2 mb-[120px] sm:mb-[80px]">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center border-b border-white pr-6 pl-4 md:px-8 py-3 justify-between">
                    <img src={item.image} alt={item.name} className="w-[87px] h-[91px] md:w-[91px] md:h-[95px] border border-gray-600 object-cover" />
                    <div className="flex-1 ml-4">
                      <h3 className="font-semibold text-white text-lg md:text-[25px]">{item.name}</h3>
                      <p className="text-sm md:text-[16px] text-gray-400">Size: {item.size}</p>
                      <div className="text-lg text-white  font-semibold">
                       <span className='text-xl'> Dh {(parseFloat(item.price) * item.quantity).toFixed(2)} </span>
                      </div>
                      {/* Quantity Counter */}
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.size, -1)}
                          className="px-2 py-1 bg-gray-700 text-white rounded-l-md"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-4 py-1 text-white bg-gray-800">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.size, 1)}
                          className="px-2 py-1 bg-gray-700 text-white rounded-r-md"
                          disabled={item.quantity >= 10}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button onClick={() => handleRemove(item.id, item.size)} className="text-gray-400 hover:text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkout Section */}
            <div className="w-full md:w-2/3 fixed bottom-0 right-0 bg-black p-4 border-t border-white">
              <div className="flex justify-between items-center p-3 sm:p-3 border-b border-white text-white text-lg font-semibold mb-4">
                <p className='text-white' style={{ fontSize: '26px' }}>CHECKOUT :</p>
                <p className='text-white' style={{ fontSize: '26px' }}>
                  DH {totalPrice}
                </p>
              </div>
              <div className="flex flex-row p-2 sm:p-0 justify-between">
                <Link 
                  to='/AllProducts'
                  className="py-2 px-4 bg-gray-800 hover:bg-gray-600 border sm:mx-2 border-gray-600 text-white rounded-md mb-4 sm:mb-2 md:mb-0" 
                  style={{ borderRadius: '20px' }}
                >
                 <span className='text-center text-[20px] '>CONTINUE SHOPPING</span> 
                </Link>
                <button 
                  
                  className="py-2 px-4 bg-yellow-500 text-center hover:bg-yellow-600 sm:mx-2 text-white font-bold rounded-md mb-4 sm:mb-2 md:mb-0" 
                  style={{ borderRadius: '20px' }}
                >
                 <span className='text-black  text-[20px] '>PROCEED TO CHECKOUT</span> 
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
  );
};


const ProductCard = ({ product, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const allSizes = ["S", "M", "L", "XL", "2XL"];
  const availableSizes = product.size.split(" ");

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="relative pt-5 px-5 border-b cursor-pointer"
    >
      <ProductImageTransition
        image1={product.images[0]?.image_path}
        image2={product.images[1]?.image_path}
        isHovered={isHovered}
      />
      <div className={`block my-4 ${isHovered ? 'hidden' : 'block'}`}>
        <h2 className="font-bold mb-2 text-white text-lg md:text-[25px]">
          {product.name}
        </h2>
        <h2 className="text-lg font-semibold text-white md:text-[20px]">{`DH ${product.price}`}</h2>
      </div>
      <div className={`text-sm text-white pt-4 pb-[80px] ${isHovered ? 'block' : 'hidden'}`}>
        <h2 className="text-white text-md md:text-[30px]">
          {allSizes.map(size => (
            <span
              key={size}
              className="mr-2"
              style={{
                color: availableSizes.includes(size) ? 'white' : '#B43F3F',
              }}
            >
              {size}
            </span>
          ))}
        </h2>
      </div>
    </div>
  );
};
const ProductImageTransition = ({ image1, image2, isHovered }) => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;
    gsap.fromTo(imageElement, { opacity: 0 }, { opacity: 1, duration: 1 });
  }, [isHovered]);

  return (
    <div className="w-full h-80 md:h-80  relative bg-white flex justify-center items-center border-2 border-white overflow-hidden">
      <img
        ref={imageRef}
        src={isHovered ? `https://api.clarodigi.com/storage/${image2}` : `https://api.clarodigi.com/storage/${image1}`}
        alt="Product Image"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Header;
