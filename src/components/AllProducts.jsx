import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Header from "./nav/Header";
import Footer from './nav/footer';
import Template from '../template';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

import MyBrand from './media/home/mybrand-logo.webp';
import Slider from 'rc-slider'; // Use a slider library for price range
import 'rc-slider/assets/index.css'; // Slider library styles

const FilterSidebar = ({ isVisible, toggleVisibility, filters, selectedFilters, toggleFilter, priceRange, handlePriceChange }) => {
  const sidebarRef = useRef(null);
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    if (isVisible) {
      gsap.to(sidebarRef.current, { x: 0, duration: 0.3 });
      document.body.style.overflow = 'hidden'; // Prevent body scroll
    } else {
      gsap.to(sidebarRef.current, { x: '-100%', duration: 0.3 });
      document.body.style.overflow = 'auto'; // Restore body scroll
    }
  }, [isVisible]);

  return (
    <aside
      ref={sidebarRef}
      className="fixed top-0 left-0 w-full h-full pt-20 bg-black border-r border-gray-300 transform -translate-x-full z-20 sm:hidden"
    >
      <div className="flex border-b justify-between items-center px-3 py-2">
        <h3 className="font-semibold text-gray-200" style={{ fontSize: '22px', lineHeight: '32px' }}>
          Filter by
        </h3>
        <button
          onClick={toggleVisibility}
          className="text-white text-2xl border bg-black rounded-full h-9 w-9 flex items-center justify-center"
        >
          &times;
        </button>
      </div>

      {/* Accordion Filters */}
      <Accordion title="Brand">
  <ul className="mt-2 space-y-3 p-3">
    {filters.brands.map((brand, index) => {
      const productCount = products.filter(product => {
        console.log(`Checking product: ${product.markname}, brand: ${brand}`);
        return product.markname === brand;
      }).length;
      console.log(`Brand: ${brand}, Product Count: ${productCount}`); // Debugging line
      return (
        <li key={index} className="flex justify-between items-center">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedFilters.brands.includes(brand)}
              onChange={() => toggleFilter('brands', brand)}
              className="form-checkbox h-5 w-5 text-[#FFC100] border-gray-300 rounded-full focus:ring-[#FFC100] checked:bg-[#FFC100] checked:border-[#FFC100]"
            />
            <span className="text-gray-200">{brand}</span>
          </label>
          <span className="text-gray-400">({productCount})</span>
        </li>
      );
    })}
  </ul>
</Accordion>


              <Accordion title="Type">
                <ul className="mt-2 space-y-3 p-3">
                  {filters.types.map((type, index) => {
                    const productCount = products.filter(product => product.category === type).length;
                    return (
                      <li key={index} className="flex justify-between items-center">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedFilters.types.includes(type)}
                            onChange={() => toggleFilter('types', type)}
                            className="form-checkbox h-5 w-5 text-[#FFC100] border-gray-300 rounded-full focus:ring-[#FFC100] checked:bg-[#FFC100] checked:border-[#FFC100]"
                          />
                          <span className="text-gray-200">{type}</span>
                        </label>
                        <span className="text-gray-400">({productCount})</span>
                      </li>
                    );
                  })}
                </ul>
              </Accordion>

              <Accordion title="Size">
                <ul className="mt-2 space-y-3 p-3">
                  {filters.sizes.map((size, index) => {
                    const productCount = products.filter(product => product.size.split(' ').includes(size)).length;
                    return (
                      <li key={index} className="flex justify-between items-center">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedFilters.sizes.includes(size)}
                            onChange={() => toggleFilter('sizes', size)}
                            className="form-checkbox h-5 w-5 text-[#FFC100] border-gray-300 rounded-full focus:ring-[#FFC100] checked:bg-[#FFC100] checked:border-[#FFC100]"
                          />
                          <span className="text-gray-200">{size}</span>
                        </label>
                        <span className="text-gray-400">({productCount})</span>
                      </li>
                    );
                  })}
                </ul>
              </Accordion>

              <Accordion title="Gender">
                <ul className="mt-2 space-y-3 p-3">
                  {filters.genders.map((gender, index) => {
                    const productCount = products.filter(product => product.gender === gender).length;
                    return (
                      <li key={index} className="flex justify-between items-center">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedFilters.genders.includes(gender)}
                            onChange={() => toggleFilter('genders', gender)}
                            className="form-checkbox h-5 w-5 text-[#FFC100] border-gray-300 rounded-full focus:ring-[#FFC100] checked:bg-[#FFC100] checked:border-[#FFC100]"
                          />
                          <span className="text-gray-200">{gender}</span>
                        </label>
                        <span className="text-gray-400">({productCount})</span>
                      </li>
                    );
                  })}
                </ul>
              </Accordion>

              <Accordion title="Price Range">
                <div className="mt-2 space-y-2 p-3">
                  <Slider
                    range
                    min={filters.priceRange[0]}
                    max={filters.priceRange[1]}
                    defaultValue={priceRange}
                    onChange={handlePriceChange}
                    trackStyle={[{ backgroundColor: '#FFC100' }]}
                    handleStyle={[
                      { borderColor: '#FFC100', backgroundColor: '#FFC100' },
                      { borderColor: '#FFC100', backgroundColor: '#FFC100' }
                    ]}
                  />
                  <div className="flex justify-between text-gray-200">
                    <span>Min: DH {priceRange[0]}</span>
                    <span>Max: DH {priceRange[1]}</span>
                  </div>
                </div>
              </Accordion>
      
      
    </aside>
  );
};



const AllProduct = () => {
  const [products, setProducts] = useState([]);
  // Add this at the top of your component
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const [sortOption, setSortOption] = useState('new-to-old'); // Default sort option
  const productsPerPage = 8;
  const [selectedFilters, setSelectedFilters] = useState({
    brands: [],
    types: [],
    sizes: [],
    genders: [],
  });
  const [filters, setFilters] = useState({
    brands: [],
    types: [],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    genders: ['male', 'female', 'kids'],
    priceRange: [0, 10000] // Initial min and max price
  });

  // Retrieve category and gender from URL parameters
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [searchQuery, setSearchQuery] = useState('');

  // Get selected category and gender from localStorage
  useEffect(() => {
    const categoryFromStorage = localStorage.getItem('selectedCategory');
    const genderFromStorage = localStorage.getItem('selectedGender');

    if (categoryFromStorage) {
      setSelectedFilters((prev) => ({
        ...prev,
        types: [categoryFromStorage],
      }));
    }
    if (genderFromStorage) {
      setSelectedFilters((prev) => ({
        ...prev,
        genders: [genderFromStorage],
      }));
    }



    // Cleanup function to remove values when leaving the page
    return () => {
      localStorage.removeItem('selectedCategory');
      localStorage.removeItem('selectedGender');
    };
  }, []);
  

  const toggleHideSidebar = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };

  const toggleSidebarVisibility = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const toggleFilter = (category, value) => {
    setSelectedFilters((prevFilters) => {
      const isSelected = prevFilters[category].includes(value);
      if (isSelected) {
        // Remove the value from the selected filters
        return {
          ...prevFilters,
          [category]: prevFilters[category].filter((item) => item !== value),
        };
      } else {
        // Add the value to the selected filters
        return {
          ...prevFilters,
          [category]: [...prevFilters[category], value],
        };
      }
    });
  };

  const filterProducts = (products) => {
    return products.filter((product) => {
      const matchesBrand = selectedFilters.brands.length === 0 || selectedFilters.brands.includes(product.markname);
      const matchesType = selectedFilters.types.length === 0 || selectedFilters.types.includes(product.category);
      const matchesSize = selectedFilters.sizes.length === 0 || selectedFilters.sizes.includes(product.size);
      const matchesGender = selectedFilters.genders.length === 0 || selectedFilters.genders.includes(product.gender);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesSearchQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.markname.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesBrand && matchesType && matchesSize && matchesGender && matchesPrice && matchesSearchQuery;
    });
  };
  
  
  

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.REACT_API_URL}/api/products`);
        const sortedProducts = sortProducts(response.data, sortOption);
        setProducts(sortedProducts);
  
        // Extract unique values for brands and types
        const brands = [...new Set(response.data.map(product => product.markname))];
        const types = [...new Set(response.data.map(product => product.category))];
        const gender = [...new Set(response.data.map(product => product.gender))];
        const name = [...new Set(response.data.map(product => product.name))];

        setFilters({
          ...filters,
          brands,
          types,
          gender,
          name,
          priceRange: [
            Math.min(...response.data.map(product => product.price)),
            Math.max(...response.data.map(product => product.price))
          ]
        });
        setPriceRange([
          Math.min(...response.data.map(product => product.price)),
          Math.max(...response.data.map(product => product.price))
        ]);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, [sortOption, searchQuery]); // Added searchQuery as a dependency
  

  // Sort products based on the selected option
  const sortProducts = (products, option) => {
    return [...products].sort((a, b) => {
      switch (option) {
        case 'new-to-old':
          return new Date(b.created_at) - new Date(a.created_at);
        case 'old-to-new':
          return new Date(a.created_at) - new Date(b.created_at);
        case 'price-low-to-high':
          return a.price - b.price;
        case 'price-high-to-low':
          return b.price - a.price;
        default:
          return products;
      }
    });
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const filteredProducts = filterProducts(products);
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Template>
      <div
        className="w-screen"
        style={{
          width: '100vw',
          margin: '0',
          padding: '0',
          overflowX: 'hidden',
          minWidth: '100vw'
        }}>
        <Header />
        <div className="row-title text-center text-white pt-10 pb-8">
          <h2 className="text-4xl md:text-[65px] text-white mt-8 md:mt-[50px] font-bold">PRODUCTS PAGE :</h2>
        </div>

        {/* Search Bar and Filters */}
        <div className="mb-6">
          <div className="flex justify-between">
              <input
                type="text"
                placeholder="Search products"
                className="border-b pt-2 pb-2 pr-3 mr-4 ml-4 pl-7 sm:ml-5 sm:mr-7 w-full bg-black text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

          </div>
        </div>

        <div className="border-b flex flex-col sm:flex-row items-center sm:justify-between sm:pr-8 sm:pl-8 pb-4">
          <FilterToggleButton toggleVisibility={toggleSidebarVisibility} />
          <FilterSidebar
            isVisible={isSidebarVisible}
            toggleVisibility={toggleSidebarVisibility}
            filters={filters}
            selectedFilters={selectedFilters}
            toggleFilter={toggleFilter}
            priceRange={priceRange}
            handlePriceChange={handlePriceChange}
          />

          <div className="flex-1 flex justify-center">
            <button
              className="text-sm hidden sm:block"
              onClick={toggleHideSidebar}
            >
              <h2 className='text-gray-400 hover:underline hover:text-[#F9D00F] '  style={{ fontSize: '20px' }}>
                {isSidebarHidden ? 'Show Sidebar' : 'Hide Sidebar'}
              </h2>
            </button>
          </div>

          <div className="w-full sm:w-auto p-3 sm:flex-row sm:justify-end gap-4 sm:gap-6 border-b border-t sm:border-none">
            <select
              className="font-formula-condensed font-bold uppercase text-white bg-black text-lg leading-tight"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="new-to-old">Date, new to old</option>
              <option value="old-to-new">Date, old to new</option>
              <option value="price-low-to-high">Price, low to high</option>
              <option value="price-high-to-low">Price, high to low</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row mb-10">
          {/* Sidebar */}
          <aside
              className={`fixed sm:relative top-0 left-0 sm:h-full sm:p-4 sm:border-r border-gray-300 transform ${isSidebarHidden ? '-translate-x-[120%]' : 'translate-x-0 sm:w-1/3'} transition-transform duration-1000 ease-in-out hidden sm:block z-20`}
            >
              {/* Accordion Filters */}
              <Accordion title="Brand">
                <ul className="mt-2 space-y-3 p-3">
                  {filters.brands.map((brand, index) => {
                    const productCount = products.filter(product => product.markname === brand).length;
                    return (
                      <li key={index} className="flex justify-between items-center">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedFilters.brands.includes(brand)}
                            onChange={() => toggleFilter('brands', brand)}
                            className="form-checkbox h-5 w-5 text-[#FFC100] border-gray-300 rounded-full focus:ring-[#FFC100] checked:bg-[#FFC100] checked:border-[#FFC100]"
                          />
                          <span className="text-gray-200">{brand}</span>
                        </label>
                        <span className="text-gray-400">({productCount})</span>
                      </li>
                    );
                  })}
                </ul>
              </Accordion>

              <Accordion title="Type">
                <ul className="mt-2 space-y-3 p-3">
                  {filters.types.map((type, index) => {
                    const productCount = products.filter(product => product.category === type).length;
                    return (
                      <li key={index} className="flex justify-between items-center">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedFilters.types.includes(type)}
                            onChange={() => toggleFilter('types', type)}
                            className="form-checkbox h-5 w-5 text-[#FFC100] border-gray-300 rounded-full focus:ring-[#FFC100] checked:bg-[#FFC100] checked:border-[#FFC100]"
                          />
                          <span className="text-gray-200">{type}</span>
                        </label>
                        <span className="text-gray-400">({productCount})</span>
                      </li>
                    );
                  })}
                </ul>
              </Accordion>

              <Accordion title="Size">
                <ul className="mt-2 space-y-3 p-3">
                  {filters.sizes.map((size, index) => {
                    const productCount = products.filter(product => product.size.split(' ').includes(size)).length;
                    return (
                      <li key={index} className="flex justify-between items-center">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedFilters.sizes.includes(size)}
                            onChange={() => toggleFilter('sizes', size)}
                            className="form-checkbox h-5 w-5 text-[#FFC100] border-gray-300 rounded-full focus:ring-[#FFC100] checked:bg-[#FFC100] checked:border-[#FFC100]"
                          />
                          <span className="text-gray-200">{size}</span>
                        </label>
                        <span className="text-gray-400">({productCount})</span>
                      </li>
                    );
                  })}
                </ul>
              </Accordion>

              <Accordion title="Gender">
                <ul className="mt-2 space-y-3 p-3">
                  {filters.genders.map((gender, index) => {
                    const productCount = products.filter(product => product.gender === gender).length;
                    return (
                      <li key={index} className="flex justify-between items-center">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedFilters.genders.includes(gender)}
                            onChange={() => toggleFilter('genders', gender)}
                            className="form-checkbox h-5 w-5 text-[#FFC100] border-gray-300 rounded-full focus:ring-[#FFC100] checked:bg-[#FFC100] checked:border-[#FFC100]"
                          />
                          <span className="text-gray-200">{gender}</span>
                        </label>
                        <span className="text-gray-400">({productCount})</span>
                      </li>
                    );
                  })}
                </ul>
              </Accordion>

              <Accordion title="Price Range">
                <div className="mt-2 space-y-2 p-3">
                  <Slider
                    range
                    min={filters.priceRange[0]}
                    max={filters.priceRange[1]}
                    defaultValue={priceRange}
                    onChange={handlePriceChange}
                    trackStyle={[{ backgroundColor: '#FFC100' }]}
                    handleStyle={[
                      { borderColor: '#FFC100', backgroundColor: '#FFC100' },
                      { borderColor: '#FFC100', backgroundColor: '#FFC100' }
                    ]}
                  />
                  <div className="flex justify-between text-gray-200">
                    <span>Min: DH {priceRange[0]}</span>
                    <span>Max: DH {priceRange[1]}</span>
                  </div>
                </div>
              </Accordion>
            </aside>



          {/* Main Content */}
          <div className={`w-full ${isSidebarHidden ? 'sm:w-full' : 'sm:w-2/3'} border grid grid-cols-2 ${isSidebarHidden ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} transition-all duration-1400 ease-in-out`}>
            {currentProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
            {/* Pagination */}
            <div className="col-span-2 border flex justify-center items-center pt-4 pb-3 space-x-2">
              {[...Array(totalPages).keys()].map((page) => (
                <span key={page} className="page">
                  <a
                    onClick={() => paginate(page + 1)}
                    className={`px-3 py-1 rounded ${currentPage === page + 1 ? 'bg-gray-200 text-gray-700' : 'text-white hover:bg-gray-200'}`}
                  >
                    {page + 1}
                  </a>
                </span>
              ))}
            
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Template>
  );
};
const FilterToggleButton = ({ toggleVisibility }) => {
  return (
    <button
      onClick={toggleVisibility}
      className="w-full sm:hidden border-t p-3 font-bold rounded"
    >
      <h2 className='text-lg text-white'> Filter By</h2>
    </button>
  );
};
const renderSizes = (allSizes, availableSizes) => {
  return (
    <h2 className="text-white" style={{ fontSize: '25px', letterSpacing: '0.3em' }}>
      {allSizes.map(size => (
        <span
          key={size}
          style={{
            marginRight: '0.5em',
            color: availableSizes.includes(size) ? 'white' : '#B43F3F',
          }}
        >
          {size}
        </span>
      ))}
    </h2>
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
  const availableSizes = Array.isArray(product.size)
    ? product.size
    : typeof product.size === 'string'
    ? product.size.split(' ')
    : [];

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleProductClick}
      className="border border-gray-200 p-5 bg-black hover:bg-black transition duration-300"
    >
      <ProductImageTransition
        image1={product.images[0]?.image_path}
        image2={product.images[1]?.image_path}
        logo={product.logo}
        isHovered={isHovered}
      />
      <div className={`block my-4 ${isHovered ? 'hidden' : 'block'}`}>
        <h2 className="font-bold mb-2 text-gray-200 text-center" style={{ fontSize: '23px' }}>
          {product.name}
        </h2>
        <h2 className="text-lg font-semibold text-gray-200 text-center">{`DH ${product.price}`}</h2>
      </div>
      <div className={`text-sm text-gray-200 mt-2 ${isHovered ? 'block' : 'hidden'} text-center`}>
        {renderSizes(allSizes, availableSizes)}
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
      style={{
        width: '100%',
        height: '0',
        paddingBottom: '100%', // This maintains a square aspect ratio
        position: 'relative',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #e5e5e5',
        overflow: 'hidden',
      }}
    >
      <img
        ref={imageRef}
        src={isHovered ? `${import.meta.env.REACT_API_URL}/storage/${image2}` : `${import.meta.env.REACT_API_URL}/storage/${image1}`}
        alt="Product Image"
        className=' md:top-5 top-[20px]'
        style={{
          position: 'absolute',
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
      <im
        src={MyBrand}
        alt="Brand logo"
        className="absolute top-1 w-[25px] h-[25px] md:w-[50px] md:h-[50px] left-2"
      />
    </div>
  );
};

// Accordion Component
const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-4 px-3 md:px-1 border-b cursor-pointer">
      <h3 className="font-semibold text-lg text-gray-200 flex justify-between items-center" onClick={() => setIsOpen(!isOpen)}>
        {title}
        <span className="transition-transform text-[25px] duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', color: 'white' }}>{isOpen ? '-' : '+'}</span>
      </h3>
      {isOpen && <div className="mt-2 text-gray-200">{children}</div>}
    </div>
  );
};

export default AllProduct;
