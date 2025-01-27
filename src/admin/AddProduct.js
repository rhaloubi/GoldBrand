import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { PlusCircleIcon } from '@heroicons/react/24/solid'; // Importing Heroicon

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        cost_price: '',
        size: [], // Adjusted to store selected sizes as an array
        category: '',
        markname: '',
        stock_status: '',
        discount: '',
        gender: '',
        quantity: '',
        images: [], // Adjusted to store multiple images
    });
    const [imagePreviews, setImagePreviews] = useState([]); // Store image previews
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'images') {
            const newImages = Array.from(files);
            setFormData({
                ...formData,
                images: [...formData.images, ...newImages], // Add selected images to existing ones
            });

            // Generate previews
            const newPreviews = newImages.map((file) => URL.createObjectURL(file));
            setImagePreviews([...imagePreviews, ...newPreviews]);
        } else if (name === 'size') {
            // Toggle size in the array
            const newSizeArray = formData.size.includes(value)
                ? formData.size.filter(size => size !== value)
                : [...formData.size, value];

            setFormData({
                ...formData,
                size: newSizeArray,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();

        // Append non-file fields
        for (const key in formData) {
            if (key !== 'images' && key !== 'size') {
                form.append(key, formData[key]);
            }
        }

        // Append sizes as a comma-separated string
        form.append('size', formData.size.join(','));

        // Append images to the form data
        formData.images.forEach((image, index) => {
            form.append(`images[${index}]`, image); // Name the images as an array
        });

        try {
            const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
            const response = await axios.post(`${import.meta.env.REACT_API_URL}/api/products`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                },
            });

            if (response.status === 201) {
                navigate('/admin/list-products');
            }
        } catch (err) {
            console.error('Error Response:', err.response);
            console.error('Error Data:', err.response.data);
            setError('Error adding product. Please try again.');
        }
    };

    return (
        <div className="flex flex-col h-screen">
         

            <section className="flex flex-1 h-auto mt-14 md:mt-1 mb-20">
                <div className="content-container flex flex-1">
                    <div className="home-container p-6 md:p-16  w-full">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <PlusCircleIcon className="w-10 h-10 text-white mr-2" />
                            <h2 className="h2-bold text-white text-left w-full" style={{ fontSize: '28px', fontWeight: 'bold' }}>Add Product</h2>
                        </div>

                        {error && <div className="alert alert-danger">{error}</div>}

                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            {/* Name and Price on the same line */}
                            <div className="flex space-x-4">
                                <div className="w-1/2 space-y-2 flex flex-col">
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

                                <div className="w-1/2 space-y-2 flex flex-col">
                                <label className="font-bold">Size</label>
                                <div className="flex flex-wrap gap-4">
                                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sizeOption, index) => (
                                        <div key={index} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="size"
                                                value={sizeOption}
                                                checked={formData.size.includes(sizeOption)}
                                                onChange={handleInputChange}
                                                className="mr-2 h-4 w-4"
                                            />
                                            <label>{sizeOption}</label>
                                        </div>
                                    ))}
                                </div>
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <div className="w-1/2 space-y-2 flex flex-col">
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

                                <div className="w-1/2 space-y-2 flex flex-col">
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
                            </div>

                            

                            {/* Categories and Markname on the same line */}
                            <div className="flex space-x-4 mt-4">
                                <div className="w-1/2 space-y-2 flex flex-col">
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

                                <div className="w-1/2 space-y-2 flex flex-col">
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

                            {/* Discount and Stock Status on the same line */}
                            <div className="flex space-x-4 mt-4">
                                <div className="w-1/2 space-y-2 flex flex-col">
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

                                <div className="w-1/2 space-y-2 flex flex-col">
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
                            </div>

                            {/* Gender and Quantity on the same line */}
                            <div className="flex space-x-4 mt-4">
                                <div className="w-1/2 space-y-2 flex flex-col">
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

                                <div className="w-1/2 space-y-2 flex flex-col">
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

                            {/* Image Upload */}
                            <div className="space-y-2">
                                <label className="font-bold">Images</label>
                                <div>
                                    <div id="fileUploader" className="file_uploader-box w-full rounded-lg" style={{ height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '2px dashed #ccc' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                                    <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                    </svg>
                                        <h3 className="base-medium text-white text-light-2 mb-2 mt-6">Drag photo here</h3>
                                        <p className="text-light-4 small-regular text-white mb-6">SVG, PNG, JPG, JPEG</p>
                                        <label className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full cursor-pointer">
                                            Select from computer
                                            <input type="file" name="images" id="fileInput" style={{ display: 'none' }} onChange={handleInputChange} multiple required />
                                        </label>
                                    </div>
                                    <div id="filePreviewContainer" className="file-preview-container" style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                        {imagePreviews.map((preview, index) => (
                                            <div key={index} className="relative">
                                                <img src={preview} alt={`Preview ${index}`} className="w-32 h-32 object-cover rounded-lg" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex gap-4 items-center justify-end mt-6 mb-16 md:mb-5">
                            <Link to="/admin/dashboard" className="bg-gray-700 text-white font-bold py-2 px-4 rounded-full"> Cancel</Link>
                                <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full">Add Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AddProduct;

                           