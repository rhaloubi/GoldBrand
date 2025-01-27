import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import img1 from '../assets/img/hero-nike.jpg';
import img2 from '../assets/img/heroSm.jpg';

const HeroSection = () => {
  const scrollTextRef = useRef(null);
  const dressRef = useRef(null);
  const impressRef = useRef(null);

  useEffect(() => {
    // GSAP bubble-out animation for "scroll down" text
    gsap.fromTo(
      scrollTextRef.current,
      { opacity: 1, scale: 0.9 }, 
      { opacity: 1, scale: 1.1, duration: 2.5, ease: 'elastic.out(1, 0.5)', yoyo: true, repeat: -1 }
    );

    // GSAP animation for "Dress" and "Impress" text
    gsap.fromTo(dressRef.current, 
      { x: '-100%', opacity: 0 }, // Initial state for Dress (from left)
      { x: '0%', opacity: 1, duration: 1.5, ease: 'power4.out' } // Animate to normal position
    );

    gsap.fromTo(impressRef.current, 
      { x: '100%', opacity: 0 }, // Initial state for Impress (from right)
      { x: '0%', opacity: 1, duration: 1.5, ease: 'power4.out', delay: 0.5 } // Animate to normal position with delay
    );

    // GSAP hide on scroll for "scroll down" text
    const handleScroll = () => {
      if (window.scrollY > 50) {
        gsap.to(scrollTextRef.current, { opacity: 0, duration: 0.5 });
      } else {
        gsap.to(scrollTextRef.current, { opacity: 1, duration: 0.5 });
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative bg-black overflow-hidden h-[100vh] sm:h-[110vh]">
      <div id="hero-splide" className="splide h-full">
        <div className="splide__track h-full">
          <ul className="splide__list h-full">
            <li className="splide__slide h-full">
              <div className="relative z-10 h-full">
                <div className="object-wrapper h-full media-style-container">
                  {/* Desktop Image */}
                  <div className="hidden lg:block h-full">
                    <img className="w-full h-full object-cover" src={img1} alt="Nike Desktop" />
                  </div>
                  {/* Mobile Image */}
                  <div className="lg:hidden h-full">
                    <img className="w-full h-full object-cover" src={img2} alt="Nike Mobile" />
                  </div>
                </div>

                {/* "Dress to Impress" text */}
                <div className="absolute inset-0 flex items-center justify-center text-center text-white p-4">
                  <h1
                    className="text-[8rem]  lg:text-[9rem] font-bold leading-none text-white"
                    style={{
                      position: 'absolute',
                      top: '80vh',
                      transform: 'translateY(-50%)',
                    }}
                  >
                    <span ref={dressRef} style={{ display: 'inline-block', marginRight: '1rem' }}>Dress</span>
                    <span>to </span>
                    <span ref={impressRef} style={{ display: 'inline-block' }}>Impress.</span>
                  </h1>
                </div>

                {/* Scroll down text */}
                <div
                  className="absolute bottom-1 right-2 md:bottom-[12vh] md:right-4"
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <h2
                    className="relative text-black hover:text-[#F0AE2C] text-sm md:text-[17px] font-bold"
                    ref={scrollTextRef}
                    style={{
                      textShadow: '0 0 1px #F9D00F, 0 0 1px #F9D00F, 0 0 3px #F9D00F, 0 0 1px #F9D00F, 0 0 1px #F9D00F'
                    }}
                  >
                    scroll down
                  </h2>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="splide__arrows flex justify-between items-center mt-5 px-5 lg:px-10">
          {/* Arrows content */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
