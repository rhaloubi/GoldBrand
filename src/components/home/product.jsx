import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyBrand from '../media/home/mybrand-logo.webp';
import AnimatedText from '../assets/animation/textbottom';

gsap.registerPlugin(Draggable);

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // Fetch all products from the backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
        const sortedProducts = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        const lastEightProducts = sortedProducts.slice(0, 8);
        setProducts(lastEightProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (containerRef.current && products.length > 0) {
      // Apply GSAP animations
      gsap.to(containerRef.current.children, {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
      });

      // Use window width to detect mobile screen
      const isMobile = window.innerWidth <= 768;

      Draggable.create(containerRef.current, {
        type: 'x',
        bounds: containerRef.current.parentElement,
        inertia: true,
        edgeResistance: isMobile ? 0.8 : 0.65, // Less resistance on mobile for quicker scroll
        dragResistance: isMobile ? 0.1 : 0.3, // Reduced drag resistance for smoother scrolling
        allowContextMenu: true,
        snap: isMobile
          ? {
              x: (value) => Math.round(value / 200) * 200, // Adjust for mobile snapping
            }
          : false,
      });
    }
  }, [products]);

  if (products.length === 0) return null; // Hide the section if there are no products

  return (
    <>
      <div className="row row-title sm:pl-3 z-20 pt-9 pb-1 md:pt-12 border-t-2 text-white" style={{ justifyContent: 'left' }}>
        <div className="col pt-4 px-2 md:py-0 md:pt-6 md:pr-3 md:px-0">
          <h2 className="m">
            <AnimatedText text="NEW COLLECTION:" />
          </h2>
        </div>
      </div>

      <div className="flex overflow-x-scroll min-h-[200px] md:min-h-[470px] border-b border-white bg-black snap-x snap-mandatory">
        <div ref={containerRef} className="flex cursor-grab">
          {products.map((product, index) => (
            <div
              key={index}
              className="border border-white bg-black p-2 md:p-3 min-w-[250px] md:min-w-[360px] flex-shrink-0 relative snap-start"
              style={{ opacity: 0, transform: 'translateX(100px)' }}
            >
              <ProductCard product={product} />
            </div>
          ))}
          <div className="border border-white p-4 md:p-6 min-w-[250px] min-h-[350px] md:min-w-[350px] md:min-h-[456px] flex-shrink-0 flex items-center justify-center snap-start">
            <li className="link large" data-link-status="not-active">
              <Link to="/AllProducts" className="link-click">
                <div className="link-content">
                  <div className="link-text" style={{ fontSize: '30px' }}>
                    <span>View All</span>
                    <span className="duplicate">View All</span>
                  </div>
                </div>
              </Link>
            </li>
          </div>
        </div>
      </div>
    </>
  );
};

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const allSizes = ["S", "M", "L", "XL", "2XL"];
  const availableSizes = product.size.split(" ");

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleProductClick}
      className="relative cursor-pointer"
    >
      <ProductImageTransition
        image1={product.images[0]?.image_path}
        image2={product.images[1]?.image_path}
        logo={MyBrand}
        isHovered={isHovered}
      />
      <div className={`block my-4 ${isHovered ? 'hidden' : 'block'}`}>
        <h2 className="font-bold mb-2 text-white text-lg md:text-[26px]">
          {product.name}
        </h2>
        <h2 className="text-lg font-semibold text-white md:text-[22px]">{`DH ${product.price}`}</h2>
      </div>
      <div className={`text-sm text-white pt-4 ${isHovered ? 'block' : 'hidden'}`}>
        <h2 className="text-white text-[30px] md:text-[30px]">
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

const ProductImageTransition = ({ image1, image2, logo, isHovered }) => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;
    gsap.fromTo(imageElement, { opacity: 0 }, { opacity: 1, duration: 1 });
  }, [isHovered]);

  return (
    <div
    className="w-[230px] h-[250px] md:h-[22rem] md:w-full relative bg-white flex justify-center items-center border-2 border-white overflow-hidden"
  >
    <img
      ref={imageRef}
      src={isHovered ? `${process.env.REACT_APP_API_URL}/storage/${image2}` : `${process.env.REACT_APP_API_URL}/storage/${image1}`}
      alt="Product Image"
      className="w-full h-full object-contain"
    />
    <img
      src={logo}
      alt="Brand logo"
      className="absolute top-2 left-2 w-8 h-8 md:w-10 md:h-10"
    />
  </div>
  );
};

export default ProductSection;
