import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { Link } from 'react-router-dom';

const SvgNotfound = () => {
  const lottieContainer = useRef(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: lottieContainer.current, // the DOM element where the animation should be rendered
      renderer: 'svg',
      loop: true, // Set loop to true to enable continuous looping
      autoplay: true,
      path: 'https://cdn.prod.website-files.com/634d5c356b8adeff5a7c6393/6374a8feb22bb3cb2d2190ec_404%20page%20(1).json' // the path to the animation JSON
    });

    return () => {
      animation.destroy(); // clean up the animation when the component unmounts
    };
  }, []);

  return (
    <div className='justify-center' style={{
      display: 'flex',
      flexDirection: 'column', // This will stack the elements vertically
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Full viewport height
      backgroundColor: '#101314', // Optional: Set a background color
    }}>
    <div > 
                          <span className='text-center mt-4'> Oops! :((  </span>            
          </div>
     <div style={{marginBottom:'30px'}}> 
                          <span className='text-red'>Something went wrong</span> 
          </div>
      <div
        className="lottie-404 part-2"
        ref={lottieContainer} // the ref pointing to the div where the animation will be rendered
        style={{
          filter: 'invert(1) brightness(2)', // Applying CSS filter to change the color
          maxWidth: '700px', // Optional: Set a max width for the animation
          width: '100%',
        }}
      ></div>
           <div style={{ marginTop: '40px' }}>
              <span className='text-center'>Visit my homepage: URL homepage to browse our latest content.</span>
           </div>
        


      {/* Centering the button below the SVG */}
      <div style={{ marginTop: '15px' }}>
       {/* Optional: Add some space between the SVG and the button */}
        <Link
          to='/'
          className=" text-white border border-white font-bold py-2 px-8  focus:outline-none focus:shadow-outline"
          style={{borderRadius:'50%'}}
        >
          <span className='text-[25px] hover:underline'>Visit to home</span>
        </Link>
      </div>
    </div>
  );
};

export default SvgNotfound;
