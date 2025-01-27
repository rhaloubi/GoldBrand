import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Toast = ({ message, type, onClose }) => {
    const [visible, setVisible] = useState(true);
    const toastRef = useRef(null);

    const getToastStyle = () => {
        switch (type) {
            case 'success':
                return {
                    container: 'text-gray-500 bg-white dark:text-gray-400 dark:bg-gray-800',
                    iconContainer: 'text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200',
                    icon: (
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                        </svg>
                    ),
                };
            case 'danger':
                return {
                    container: 'text-gray-500 bg-white dark:text-gray-400 dark:bg-gray-800',
                    iconContainer: 'text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200',
                    icon: (
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                        </svg>
                    ),
                };
            case 'warning':
                return {
                    container: 'text-gray-500 bg-white dark:text-gray-400 dark:bg-gray-800',
                    iconContainer: 'text-orange-500 bg-orange-100 dark:bg-orange-700 dark:text-orange-200',
                    icon: (
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
                        </svg>
                    ),
                };
            default:
                return {
                    container: 'text-gray-500 bg-white dark:text-gray-400 dark:bg-gray-800',
                    iconContainer: 'bg-gray-100 dark:bg-gray-700',
                    icon: null,
                };
        }
    };

    const { container, iconContainer, icon } = getToastStyle();

    useEffect(() => {
        if (toastRef.current) {
            gsap.fromTo(
                toastRef.current,
                { x: '100%', opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
            );
        }

        // Auto-close after 3 seconds
        const timer = setTimeout(handleClose, 3000);

        // Clear the timer if the component unmounts
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        if (toastRef.current) {
            gsap.to(toastRef.current, {
                x: '100%',
                opacity: 0,
                duration: 0.5,
                ease: 'power3.in',
                onComplete: () => {
                    setVisible(false);
                    if (onClose) onClose();
                },
            });
        }
    };

    if (!visible) return null;

    return (
        <div
        ref={toastRef}
        className={`fixed top-[40px] right-5 p-4 rounded-lg shadow flex items-center w-full max-w-xs mb-4 ${container}`}
      >
            {icon && (
                <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${iconContainer} rounded-lg`}>
                    {icon}
                    <span className="sr-only">{type} icon</span>
                </div>
            )}
            <div className="ms-3">
                <span className="text-lg font-normal">{message}</span>
            </div>
            <button
                onClick={handleClose}
                className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                aria-label="Close"
            >
                <span className="sr-only">Close</span>
                <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                </svg>
            </button>
        </div>
    );
};

export default Toast;
