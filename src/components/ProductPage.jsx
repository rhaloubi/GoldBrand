import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "./nav/Header";
import Navbar from './nav/navbar';
import Footer from './nav/footer';
import { gsap } from 'gsap';
import Template from '../template';
import Loading from './nav/loading'; // Import the Loading component
import Toast from './media/store/Toast'; // Import Toast component


function ProductPage({ }) {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const timerLineRef = useRef(null);
  const imageRef = useRef(null);
  const navigate = useNavigate(); // To handle navigation
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedSize, setSelectedSize] = useState(''); // State for selected size
  const allSizes = ["XS","S", "M", "L", "XL", "2XL"];
  const availableSizes = product ? product.size.split(" ") : [];
  const [toast, setToast] = useState({ message: '', type: '', show: false });


  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${import.meta.env.REACT_API_URL}/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  // Check if user is logged in
  useEffect(() => {
    const userToken = localStorage.getItem('authToken'); // Ensure you use 'authToken'
    console.log("Token in Local Storage:", userToken);
    setIsLoggedIn(!!userToken);
  }, []);

  // Handle image rotation
  useEffect(() => {
    if (product && product.images.length > 0) {
      const interval = setInterval(() => {
        updateImageIndex();

        // Reset and animate the timer line
        gsap.fromTo(timerLineRef.current, 
          { width: '0%' }, 
          { width: '100%', duration: 11, ease: 'linear', backgroundColor: '#FFC100' }
        );
      }, 11000);

      return () => clearInterval(interval);
    }
  }, [product]);

  // Update image index for rotation
  const updateImageIndex = () => {
    gsap.to(imageRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.5,
      onComplete: () => {
        setSelectedImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);

        gsap.fromTo(imageRef.current, 
          { opacity: 0, scale: 1.05 }, 
          { opacity: 1, scale: 1, duration: 0.5 }
        );
      }
    });
  };

  // Handle adding product to cart
  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast('Please select a size.', 'warning');
      return;
    }

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const newCartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: product.images[selectedImageIndex]?.image_path,
      quantity: 1,
    };

    const updatedCartItems = [...cartItems, newCartItem];
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    window.location.reload();

    showToast('Product added to cart!', 'success');
  };

  // Handle adding product to wishlist
  const handleAddToWishlist = async () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      const token = localStorage.getItem('authToken');
      try {
        await axios.post(
          `${import.meta.env.REACT_API_URL}/api/wishlist/add`,
          { product_id: product.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        window.location.reload();
        showToast('Product added to wishlist!', 'success');
        
      } catch (error) {
        if (error.response && error.response.status === 400) {
          showToast(error.response.data.message || 'Failed to add product to wishlist.', 'danger');
        } else {
          showToast('Failed to add product to wishlist.', 'danger');
        }
      }
    }
  };
  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 3000); // Hide after 3 seconds
};

if (!product) return <Loading />; // Use the custom Loading component while the product data is loading

  return (
    <Template>
      <div data-barba="wrapper" data-navigation-status="not-active" data-scrolling-started="false" data-scrolling-direction="down" data-theme-page="light" data-theme-nav="light" data-theme-nav-bottom="light" data-bg-nav="light" data-bg-nav-bottom="light" data-page-transition="active" data-page-transition-bottom="active">
        <Header />
         

        <main className="main" id="main" data-barba="container" data-barba-namespace="home">
        <div className="main-wrap" id="main-wrap" data-scroll-container="">

            <div className="flex flex-col md:flex-row justify-center items-start p-5 pt-20">
 
              {/* Sidebar Thumbnails */}
              <div 
                className="flex md:flex-col flex-row items-center sm:space-y-4 md:mr-4 md:w-[70px] md:pr-2 mb-4 md:mb-0 w-[150px] space-x-3  "
              >
                {product.images.map((img, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setSelectedImageIndex(idx)}
                    style={{
                      border: `1px solid ${selectedImageIndex === idx ? '#FFC100' : 'transparent'}`,
                      borderRadius: '4px',
                      padding: '1px',
                    }}
                  >
                    <img
                      src={img.image_path}
                      alt={`Thumbnail ${idx + 1}`}
                      className={`w-full cursor-pointer border-2 ${selectedImageIndex === idx ? 'border-gray-800' : 'border-gray-300'} hover:border-gray-800`}
                      style={{ 
                        filter: selectedImageIndex === idx ? 'blur(0px)' : 'blur(2px)',
                        transition: 'filter 0.3s ease',
                        aspectRatio: '1 / 1',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                ))}
              </div>


              {/* Main Product Image and Details */}
              <div className="flex flex-col md:flex-row flex-grow space-x-0 md:space-x-8">
                
                {/* Main Product Image */}
                <div className="flex-1 flex justify-center items-center relative w-full md:w-auto mb-4 md:mb-0">
                  <img
                    ref={imageRef}
                    src={product.images[selectedImageIndex]?.image_path}
                    alt="Main Product"
                    className="w-full h-[50vh] md:h-[580px] object-cover border-6 border-gray-800"
                    style={{
                      borderRadius: '4px',
                    }}
                  />
                  <div ref={timerLineRef} className="absolute bottom-0 left-0 h-1 w-full md:w-auto" style={{ backgroundColor: '#FFC100' }}></div>
                </div>

                {/* Product Details and Purchase Options */}
                <div className="flex-1 pl-0 md:pl-8">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-200">
                    {product.name} <span className="font-black">[</span> {product.gender[0][0]} <span className="font-black">]</span>
                  </h1>
                  <h1 className="text-2xl md:text-3xl text-gray-200 mb-4">{`DH ${product.price}`}</h1>

                  <div className="flex flex-wrap md:items-center space-x-2 md:space-x-4 mb-4">
                    {allSizes.map((size, idx) => (
                      <label key={idx} className="flex items-center">
                        <input 
                          type="radio" 
                          name="size" 
                          value={size} 
                          onChange={() => setSelectedSize(size)} 
                          checked={selectedSize === size} 
                          className="hidden"
                          disabled={!availableSizes.includes(size)} // Disable input if size is not available
                        />
                        <span 
                          className={`text-white font-bold py-2 px-4 border rounded-full cursor-pointer ${
                            selectedSize === size && availableSizes.includes(size) ? 
                              'bg-yellow-500 border-yellow-500' : 
                              'bg-gray-700 border-gray-600'
                          } transition duration-200 ${
                            availableSizes.includes(size) ? 
                              'hover:bg-yellow-400' : 
                              'bg-red-500 border-red-500 cursor-not-allowed'
                          }`}
                        >
                          {size}
                        </span>
                      </label>
                    ))}
                  </div>

                  <div className="flex flex-wrap space-x-4 space-y-0">
                  
                    <button
                      onClick={handleAddToCart}
                      className="flex-shrink-0 w-[80%] bg-yellow-500 text-gray-800 font-bold py-2 px-6 rounded-full hover:bg-yellow-600 transition duration-300"
                    >
                     <span className='text-[25px] md:text-[25px] '>ADD TO CART</span> 
                    </button>

                    <button 
                      className="flex-shrink-0 w-[15%] bg-gray-700 text-gray-200 font-bold py-3 px-6 rounded-full hover:bg-gray-800 transition duration-300 flex justify-center items-center"
                      onClick={handleAddToWishlist}
                    >
                      <span className="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                      </span>
                    </button>
                  </div>




                  <p className="mt-4 text-gray-200">{`Product SKU: ${product.sku}`}</p>

                  <div className="mt-8 text-gray-200">
                    <Accordion title="DETAILS">
                      {product.details}
                    </Accordion>
                    <Accordion title="SHIPPING / RETURNS">
                      Lemkus.com exclusively uses RAM, one of the leading Courier Companies in SA offering door to door FREE delivery on every order over R1 200.
                    </Accordion>
                    <Accordion title="BUY NOW, PAY LATER">
                      Pay with 4 interest-free payments of R199. Interest Free.
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
            {toast.message && (
                <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />
            )}
          </div>

        </main>
      </div>
    </Template>
  );
};

// Accordion Component
const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t py-4 cursor-pointer">
      <h3 className="font-semibold text-lg text-gray-200 flex justify-between items-center" onClick={() => setIsOpen(!isOpen)}>
        {title}
        <span style={{ color: 'white' }}>{isOpen ? '-' : '+'}</span>
      </h3>
      {isOpen && <p className="mt-2 text-gray-200">{children}</p>}
    </div>
  );
};

export default ProductPage;
