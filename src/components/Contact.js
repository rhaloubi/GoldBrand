import React, { useEffect } from 'react';
import gsap from 'gsap';

const Contact = () => {
    useEffect(() => {
        const element = document.querySelector('.fade-in');

        if (element) {
            gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 1 });
        }
    }, []);

    return (
        <div>
<h1 className="fade-in flex justify-center text-center" style={{ color: 'white' }}>
    Welcome to My Website!
</h1>
        </div>
    );
};

export default Contact;
