import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useNavigate, useParams } from 'react-router-dom';
import { PencilIcon } from '@heroicons/react/24/solid';


const EditProduct = () => {
    const { id } = useParams(); // Get the product ID from the route
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        cost_price: '',
        size: [],
        category: '',
        markname: '',
        stock_status: '',
        discount: '',
        gender: '',
        quantity: '',
        images: [],
    });
    const [existingImages, setExistingImages] = useState([]); // To hold existing images
    const [newImagePreviews, setNewImagePreviews] = useState([]); // To hold previews of newly added images
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']; // Sizes to display as checkboxes

    useEffect(() => {
        // Fetch the product details when the component loads
        const fetchProduct = async () => {
            const token = localStorage.getItem('authToken');
            try {
                const response = await axios.get(`${import.meta.env.REACT_API_URL}/api/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const product = response.data;

                setFormData({
                    name: product.name,
                    price: product.price,
                    cost_price:product.cost_price,
                    size: product.size ? product.size.split(' ') : [], // Split sizes by space
                    category: product.category,
                    markname: product.markname,
                    stock_status: product.stock_status,
                    discount: product.discount,
                    gender: product.gender,
                    quantity: product.quantity,
                    images: [],
                });
                setExistingImages(product.images); // Set the existing images
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Failed to load product data. Please try again later.');
            }
        };

        fetchProduct();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'images') {
            const newImages = Array.from(files);
            setFormData({
                ...formData,
                images: [...formData.images, ...newImages], // Add selected images to existing ones
            });

            const newPreviews = newImages.map((file) => URL.createObjectURL(file));
            setNewImagePreviews([...newImagePreviews, ...newPreviews]);
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSizeChange = (size) => {
        let updatedSizes = [...formData.size];
        if (updatedSizes.includes(size)) {
            updatedSizes = updatedSizes.filter((s) => s !== size);
        } else {
            updatedSizes.push(size);
        }
        setFormData({
            ...formData,
            size: updatedSizes,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: formData.name,
            price: formData.price,
            cost_price: formData.cost_price,
            size: formData.size.join(' '), // Join sizes with a space for storage
            category: formData.category,
            markname: formData.markname,
            stock_status: formData.stock_status,
            discount: formData.discount,
            gender: formData.gender,
            quantity: formData.quantity,
            // Exclude images
        };

        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.put(`${import.meta.env.REACT_API_URL}/api/products/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                navigate('/admin/list-products');
            }
        } catch (err) {
            console.error('Error Response:', err.response);
            console.error('Error Data:', err.response.data);
            setError('Error updating product. Please try again.');
        }
    };


    return (
            <section className="flex flex-1 mt-14 md:mt-1 h-auto">
                <div className="content-container flex flex-1">
                    <div className="home-container p-6 md:p-16  w-full">
                    <div className='mb-5' style={{ display: 'flex', alignItems: 'center' }}>
                        <PencilIcon className="w-12 h-12 p-2 bg-gray-800 text-gray-500" style={{ marginRight: '10px' , borderRadius:'50%'}} />
                        <h2 className="h2-bold text-left text-white w-full" style={{ fontSize: '28px', fontWeight: 'bold' }}>Edit Product</h2>
                    </div>


                        {error && <div className="alert alert-danger">{error}</div>}

                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                                {/* Name and Size */}
                                <div className="flex space-x-4">
                                    <div className="w-1/2 space-y-2">
                                        <label className="font-bold">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg shadow appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder="Enter product name"
                                            required
                                        />
                                    </div>
                                    <div className="w-1/2 space-y-2">
                                                                <label className="font-bold">Size</label>
                                                                <div className="flex flex-wrap">
                                                                    {sizes.map((size) => (
                                                                        <div key={size} className="mr-4 ">
                                                                            <label>
                                                                                <input
                                                                                    className='h-4 w-4  '
                                                                                    type="checkbox"
                                                                                    name="size"
                                                                                    value={size}
                                                                                    checked={formData.size.includes(size)}
                                                                                    onChange={() => handleSizeChange(size)}
                                                                                />
                                                                                {size}
                                                                            </label>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                    </div>
                                </div>

                                {/* Price and Cost Price */}
                                <div className="flex space-x-4 mt-4">
                                    <div className="w-1/2 space-y-2">
                                        <label className="font-bold">Price</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg shadow appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder="Enter price"
                                            required
                                        />
                                    </div>
                                    <div className="w-1/2 space-y-2">
                                        <label className="font-bold">Cost Price</label>
                                        <input
                                            type="number"
                                            name="cost_price"
                                            value={formData.cost_price}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg shadow appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder="Enter Cost Price"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Categories and Markname */}
                                <div className="flex space-x-4 mt-4">
                                    <div className="w-1/2 space-y-2">
                                        <label className="font-bold">Categories</label>
                                        <input
                                            type="text"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg shadow appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder="Enter categories"
                                            required
                                        />
                                    </div>
                                    <div className="w-1/2 space-y-2">
                                        <label className="font-bold">Markname</label>
                                        <input
                                            type="text"
                                            name="markname"
                                            value={formData.markname}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg shadow appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder="Enter markname"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Discount and Gender */}
                                <div className="flex space-x-4 mt-4">
                                    <div className="w-1/2 space-y-2">
                                        <label className="font-bold">Discount</label>
                                        <input
                                            type="number"
                                            name="discount"
                                            value={formData.discount}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg shadow appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder="Enter discount percentage"
                                            required
                                        />
                                    </div>
                                    <div className="w-1/2 space-y-2">
                                        <label className="font-bold">Gender</label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg shadow appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            required
                                        >
                                            <option value="">Select gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="kids">Kids</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Stock Status and Quantity */}
                                <div className="flex space-x-4 mt-4">
                                    <div className="w-1/2 space-y-2">
                                        <label className="font-bold">Stock Status</label>
                                        <select
                                            name="stock_status"
                                            value={formData.stock_status}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg shadow appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            required
                                        >
                                            <option value="">Select stock status</option>
                                            <option value="in_stock">In Stock</option>
                                            <option value="out_of_stock">Out of Stock</option>
                                        </select>
                                    </div>
                                    <div className="w-1/2 space-y-2">
                                        <label className="font-bold">Quantity</label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={formData.quantity}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg shadow appearance-none border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder="Enter quantity"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Existing Images Display */}
                                <div className="space-y-2 mt-4">
                                    <label className="font-bold">Existing Images</label>
                                    <div className="file-preview-container" style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                        {existingImages.length > 0 ? (
                                            existingImages.map((image, index) => (
                                                <div key={index} className="relative">
                                                    <img 
                                                        src={image.image_path}
                                                        alt={`Existing ${index}`}
                                                        className="w-32 h-32 object-cover rounded-lg"
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <p>No existing images found.</p>
                                        )}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex gap-4 items-center justify-end mt-6 mb-20 md:mb-5">
                                    <Link to="/admin/list-products" className="bg-gray-700 text-white font-bold py-2 px-4 rounded-full"> Cancel</Link>
                                    <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full">
                                        Update Product
                                    </button>
                                </div>
                            </form>

                    </div>
                </div>
            </section>

           
        
    );
};

export default EditProduct;
