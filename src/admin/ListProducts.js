import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListProducts = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedStockStatus, setSelectedStockStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10); // Number of products per page
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem('authToken');
            try {
                const response = await axios.get(`${import.meta.env.REACT_API_URL}/api/products`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProducts(response.data);
                setFilteredProducts(response.data);
                setCategories([...new Set(response.data.map(product => product.category))]); // Extract unique categories
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to fetch products. Please try again later.');
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        // Filter products based on selected category and stock status
        let filtered = products;

        if (selectedCategory) {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        if (selectedStockStatus) {
            filtered = filtered.filter(product => product.stock_status === selectedStockStatus);
        }

        setFilteredProducts(filtered);
        setCurrentPage(1); // Reset to the first page when filters change
    }, [selectedCategory, selectedStockStatus, products]);

    useEffect(() => {
        // Handle page change
        const handlePageChange = (page) => {
            setCurrentPage(page);
        };

        handlePageChange(currentPage);
    }, [currentPage]);

    const handleDelete = async (productId) => {
        const token = localStorage.getItem('authToken');
        const confirmDelete = window.confirm('Do you want to delete this product?');

        if (confirmDelete) {
            try {
                await axios.delete(`${import.meta.env.REACT_API_URL}/api/products/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProducts(products.filter(product => product.id !== productId));
            } catch (error) {
                console.error('Error deleting product:', error);
                setError('Failed to delete product. Please try again later.');
            }
        }
    };

    const handleEdit = (productId) => {
        navigate(`/admin/edit-product/${productId}`);
    };

    // Calculate paginated products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Pagination Controls
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="p-6 w-full mt-14 md:mt-1 overflow-x-auto">
            <div className="flex justify-between mb-4 w-full">
                <h2 className="text-2xl font-bold text-white">List of Products</h2>
                <div className="flex space-x-4">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-gray-700 text-white p-2 rounded"
                    >
                        <option value="">All Categories</option>
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <select
                        value={selectedStockStatus}
                        onChange={(e) => setSelectedStockStatus(e.target.value)}
                        className="bg-gray-700 text-white p-2 rounded"
                    >
                        <option value="">All Stock Statuses</option>
                        <option value="in_stock">In Stock</option>
                        <option value="out_of_stock">Out of Stock</option>
                    </select>
                </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <ul className="space-y-4">
                {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                        <li key={product.id} className="p-4 bg-gray-800 rounded-lg flex justify-between items-center">
                            <div className="flex items-center">
                                {product.images && product.images.length > 0 && (
                                    <img
                                        src={`${import.meta.env.REACT_API_URL}/storage/${product.images[0].image_path}`} 
                                        alt={product.name}
                                        className="w-16 h-16 object-cover rounded-lg mr-4"
                                    />
                                )}
                                <div>
                                    <p className="text-white"><strong className='text-[#F9D00F]'>Name:</strong> {product.name}</p>
                                    <p className="text-white"><strong className='text-[#F9D00F]'>Price:</strong> ${product.price}</p>
                                    <p className="text-white"><strong className='text-[#F9D00F]'>Stock:</strong> {product.stock_status === 'in_stock' ? 'In Stock' : 'Out of Stock'}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <button
                                    onClick={() => handleEdit(product.id)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-white">No products found.</p>
                )}
            </ul>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 mb-20 md:mb-2">
                {pages.map(page => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 mx-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ListProducts;
