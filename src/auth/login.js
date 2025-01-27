import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import Template from '../template';
import Header from "../components/nav/Header";
import Footer from "../components/nav/footer";
import Gucci from "../components/assets/img/gucciImg.jpg";
import Loading from '../components/nav/loading'; // Import the Loading component

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); // State to manage loading
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                await axios.get('https://api.clarodigi.com/sanctum/csrf-cookie');
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
            }
        };
        fetchCsrfToken();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true); // Set loading to true when the login request starts

        try {
            const response = await axios.post('https://api.clarodigi.com/api/login', {
                email,
                password,
            });

            if (response.status === 200) {
                localStorage.setItem('authToken', response.data.token);
                navigate('/admin/dashboard');
            }
        } catch (error) {
            console.error('Login error:', error.response || error.message);
            if (error.response && error.response.status === 401) {
                setError('Invalid credentials');
            } else if (error.response && error.response.status === 419) {
                setError('CSRF token mismatch. Please try again.');
            } else {
                setError('An error occurred. Please try again.');
            }
        } finally {
            setLoading(false); // Set loading to false when the request finishes
        }
    };

    return (
        <Template>
            {loading && <Loading />} {/* Render the Loading component if loading is true */}
            <div data-barba="wrapper" data-navigation-status="not-active" data-scrolling-started="false" data-scrolling-direction="down" data-theme-page="light" data-theme-nav="light" data-theme-nav-bottom="light" data-bg-nav="light" data-bg-nav-bottom="light" data-page-transition="active" data-page-transition-bottom="active">
                <Header />
                <div className="flex flex-col md:flex-row sm:h-screen md:mb-11">
                    <div className="relative md:w-1/2 flex flex-col text-center justify-center items-start p-8 md:p-[70px] sm:h-full text-white h-[50vh]">
                        <img
                            src={Gucci}
                            alt="Background"
                            className="absolute inset-0 w-full h-full object-cover opacity-75"
                        />
                        <div className="relative z-10">
                            <h2 className="text-xl text-left md:text-[35px] font-bold mb-[-10px] md:mb-[-4px] text-yellow-400" style={{ fontFamily: "'Dancing Script', cursive", zIndex: '100' }}>
                                Log in
                            </h2>
                            <h1 className="text-[80px] text-white md:text-[120px]  font-bold">
                                WELCOME BACK
                            </h1>
                            <p className="mt-4 text-white text-xl">Sign back in to your account.</p>
                        </div>
                    </div>

                    <div className="md:w-1/2 w-full h-[80vh] sm:h-full flex flex-col justify-center p-8 md:p-12 bg-black">
                        <form onSubmit={handleLogin} className="space-y-6 w-full">
                            <h2 className="text-[50px] text-center font-bold md:text-[60px] mb-[50px] text-white">YOUR ACCOUNT</h2>
                            {error && <p className="text-red-500 text-center">{error}</p>}
                            <div className="mb-4">
                                <label className="block text-white text-xl font-bold mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{ fontFamily: "'Formula Condensed', sans-serif" }}
                                    className="shadow appearance-none border-b border-r text-xl border-yellow-300 rounded w-full bg-black py-5 md:py-3 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="mb-6 relative">
                                <label className="block text-white text-xl font-bold mb-2">Password</label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{ fontFamily: "'Formula Condensed', sans-serif" }}
                                    className="shadow appearance-none border-b border-r md:py-3 text-xl border-yellow-300 rounded w-full bg-black py-5 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-[67px] transform -translate-y-1/2 text-yellow-300"
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon className="h-8 w-8" />
                                    ) : (
                                        <EyeIcon className="h-8 w-8" />
                                    )}
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-yellow-400 hover:bg-green-500 text-black font-bold py-2 px-8 md:px-6 rounded focus:outline-none focus:shadow-outline"
                                >
                                    <span className='text-[23px]'>LOG IN</span>
                                </button>
                            </div>
                        </form>
                        <div className="mt-6 pt-5 md:mt-[100px] flex justify-between border-t border-light-800 text-light-800 font-bold">
                            <button
                                type="button"
                                className="hover:underline text-[17px] md:text-[20px] "
                            >
                               <span>FORGOTTEN PASSWORD?</span> 
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/signup')}
                                className="hover:underline text-[17px] md:text-[20px] "
                            >
                               <span> CREATE AN ACCOUNT </span>
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </Template>
    );
};

export default Login;
