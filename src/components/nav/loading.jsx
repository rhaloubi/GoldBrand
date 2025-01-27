import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Loading = () => {
  const loadingRef = useRef(null);
  const progressBarRef = useRef(null);
  const loadingTextRef = useRef(null);

  useEffect(() => {
    // Fade in the entire loading screen
    gsap.to(loadingRef.current, {
      opacity: 1,
      pointerEvents: 'auto',
      duration: 0.5,
      ease: 'power3.out',
    });
  
    // Animate the progress bar
    gsap.to(progressBarRef.current, {
      width: '100%',
      duration: 1.5,
      ease: 'power3.out',
    });
  
    // Animate the text percentage from 0% to 100%
    gsap.fromTo(
      loadingTextRef.current,
      { textContent: 0 },
      {
        textContent: 100,
        duration: 1.5,
        ease: 'none',
        snap: { textContent: 1 },
        onUpdate: function () {
          // Ensure the element exists before updating the textContent
          if (loadingTextRef.current) {
            loadingTextRef.current.textContent =
              Math.round(loadingTextRef.current.textContent) + '%';
          }
        },
      }
    );
  
    // Fade out the loading screen after animation
    gsap.to(loadingRef.current, {
      opacity: 0,
      pointerEvents: 'none',
      delay: 2,
      duration: 0.5,
      ease: 'power3.in',
    });
  }, []);
  

  return (
    <div
      ref={loadingRef}
      className="fixed left-0 top-0 flex h-screen w-screen flex-col items-center justify-center gap-[10px] bg-[#08161F] pointer-events-none opacity-0 z-[91] transition duration-500"
    >
      <p
        ref={loadingTextRef}
        className="loading text-[65px] text-white opacity-40"
      >
        0<span className="text-[55px] text-white">%</span>
      </p>
      <div className="h-[34px] w-full max-w-[293px] rounded-full border border-[#F0FAFB66] p-[4px]">
        <div
          ref={progressBarRef}
          className="h-full w-0 max-w-full rounded-full bg-gradient-to-br from-[#fffc3c] to-[#9e9409] transition duration-300"
        />
      </div>
    </div>
  );
};

export default Loading;
