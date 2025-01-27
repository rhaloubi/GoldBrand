import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Template from '../template';
import Header from "../components/nav/Header";
import Footer from "../components/nav/footer";
import Lv from "../components/assets/img/lvImg.jpg";
import Loading from '../components/nav/loading'; // Import the Loading component

const Signup = () => {
    const [name, setName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // State for loading
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                await axios.get('https://gbr.clarodigi.com/sanctum/csrf-cookie');
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
            }
        };
        fetchCsrfToken();
    }, []);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous error messages
        setLoading(true); // Set loading to true when signup starts

        try {
            // Send signup request
            const response = await axios.post('https://api.clarodigi.com/api/register', {
                name,
                last_name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });

            if (response.status === 201) {
                // Store the authentication token
                localStorage.setItem('authToken', response.data.token);

                // Navigate to the dashboard or another authenticated route
                navigate('/admin/dashboard');
            }
        } catch (error) {
            console.error('Signup error:', error.response || error.message);
            if (error.response && error.response.status === 422) {
                setError('Validation error. Please check your inputs.');
            } else {
                setError('An error occurred. Please try again.');
            }
        } finally {
            setLoading(false); // Set loading to false when signup process is complete
        }
    };

    return (
        <Template>
            <div data-barba="wrapper" data-navigation-status="not-active" data-scrolling-started="false" data-scrolling-direction="down" data-theme-page="light" data-theme-nav="light" data-theme-nav-bottom="light" data-bg-nav="light" data-bg-nav-bottom="light" data-page-transition="active" data-page-transition-bottom="active">
                <Header />
                {loading ? (
                    <Loading /> // Show loading animation if loading is true
                ) : (
                    <div className="flex flex-col md:flex-row sm:h-screen md:mb-11">
                        <div className="relative md:w-1/2 flex flex-col text-center justify-center items-start p-8 md:p-[70px] sm:h-full text-white h-[50vh]">
                            <img
                                src={Lv}
                                alt="Background"
                                className="absolute inset-0 w-full h-full object-cover opacity-75"
                            />
                            <div className="relative z-10">
                                <h2 className="text-xl md:text-left md:text-[40px] font-bold mb-[-10px] md:mb-[-4px] text-yellow-400" style={{ fontFamily: "'Dancing Script', cursive", zIndex: '100' }}>
                                    Sign Up
                                </h2>
                                <h1 className="text-[80px] text-white md:text-[110px] xxl:text-[190px] md:text-left font-bold">
                                    Create <span className='text-[40px] text-yellow-400 md:text-[40px]' style={{ fontFamily: "'Dancing Script', cursive", zIndex: '100' }}>an </span>
                                    <span className='md:pl-[90px]'> Account </span>
                                </h1>
                                <p className="mt-4 text-white text-xl">Create an account to get started on your journey.</p>
                            </div>
                        </div>

                        <div className="md:w-1/2 w-full h-[100vh] md:mt-8 sm:h-full flex flex-col justify-center p-8 md:p-12 bg-black">
                            <form onSubmit={handleSignup} className="space-y-6 w-full">
                                {error && <p className="text-red-500 text-center">{error}</p>}
                                <div className="flex space-x-4 mb-4">
                                    <div className="w-1/2">
                                        <label className="block text-white text-xl font-bold mb-2">First Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            style={{ fontFamily: "'Formula Condensed', sans-serif" }}
                                            className="shadow appearance-none border-b border-l text-m md:text-xl border-yellow-300 rounded w-full bg-black py-5 md:py-3 px-3 text-white mb-3 md:mb-1 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder="Enter your first name"
                                            required
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-white text-xl font-bold mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            value={last_name}
                                            onChange={(e) => setLastName(e.target.value)}
                                            style={{ fontFamily: "'Formula Condensed', sans-serif" }}
                                            className="shadow appearance-none border-b border-r text-m md:text-xl border-yellow-300 rounded w-full bg-black py-5 md:py-3 px-3 text-white mb-3 md:mb-1 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder="Enter your last name"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-white text-xl font-bold mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{ fontFamily: "'Formula Condensed', sans-serif" }}
                                        className="shadow appearance-none border-b border-r text-xl border-yellow-300 rounded w-full bg-black py-5 md:py-3 px-3 text-white mb-3 md:mb-1 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-white text-xl font-bold mb-2">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{ fontFamily: "'Formula Condensed', sans-serif" }}
                                        className="shadow appearance-none border-b border-r text-xl border-yellow-300 rounded w-full bg-black py-5 md:py-3 px-3 text-white mb-3 md:mb-1 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-white text-xl font-bold mb-2">Confirm Password</label>
                                    <input
                                        type="password"
                                        value={passwordConfirmation}
                                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                                        style={{ fontFamily: "'Formula Condensed', sans-serif" }}
                                        className="shadow appearance-none border-b border-r text-xl border-yellow-300 rounded w-full bg-black py-5 md:py-3 px-3 text-white mb-3 md:mb-1 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Confirm your password"
                                        required
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <button
                                        type="submit"
                                        className="bg-yellow-400 hover:bg-green-500 text-black font-bold py-2 md:py-1 md:px-6 px-8 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        <span className='text-[25px]'>SIGN UP</span>
                                    </button>
                                </div>
                            </form>
                            <div className="mt-6 pt-3 md:mt-[20px] flex justify-between border-t border-light-800 text-light-800 font-bold">
                                <div className=" text-[17px] md:text-[20px] ">
                                    <span>Already have an account?</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => navigate('/login')}
                                    className="hover:underline text-[17px] md:text-[20px] "
                                >
                                    <span>BACK TO LOGIN</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <Footer />
            </div>
        </Template>
    );
};

export default Signup;
