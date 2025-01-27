import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './admin/Dashboard';
import Login from './auth/login';
import Signup from './auth/signup';
import AddProduct from './admin/AddProduct';
import ListProducts from './admin/ListProducts';
import ListUsers from './admin/ListUsers';
import EditProduct from './admin/EditProduct';
import Sidebar from './admin/Sidebar';
import Bottombar from './admin/bottombar';
import Home from './components/Home';
import About from './components/About';
import ProductPage from './components/ProductPage';
import Contact from './components/Contact';
import NotFoundPage from './components/404page';
import AllProducts from './components/AllProducts';
import PrivateRoute from './auth/PrivateRoute'; // Import PrivateRoute
import Wishlist from './components/home/Wishlist';
import TokenCheckPage from './TokenCheckPage'; // Import your new page


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/AllProducts" element={<AllProducts />} />
      <Route path="/Wishlist" element={<Wishlist />} />

      <Route path="/token-check" element={<TokenCheckPage />} /> {/* Add route for the new page */}

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Admin Routes */}
      <Route path="/admin" element={<PrivateRoute isAdminRoute={true} />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="edit-product/:id" element={<EditProduct />} />
        <Route path="list-products" element={<ListProducts />} />
        <Route path="list-users" element={<ListUsers />} />
        <Route path="another-feature" element={<h2>Another Feature</h2>} />
      </Route>

      {/* Catch-all route for undefined paths */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
