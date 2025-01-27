import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedText = ({ text }) => {
  const spanRef = useRef(null);

  useEffect(() => {
    if (spanRef.current) {
      // Split the text into individual characters, preserving spaces
      const splitText = text.split("").map((char, index) => {
        if (char === " ") {
          return `<span style="display:inline-block; width: 0.2em;">&nbsp;</span>`;
        }
        return `<span style="display:inline-block;">${char}</span>`;
      }).join("");

      // Replace the content with the split text
      spanRef.current.innerHTML = splitText;

      // Get all the individual character spans
      const chars = spanRef.current.querySelectorAll("span");

      // Create the staggered animation
      gsap.from(chars, {
        y: '100%', // Start from 100% below its normal position
        opacity: 0, // Start invisible
        duration: 1.7, // Animation duration for each character
        ease: 'power3.out', // Easing function
        stagger: 0.05, // Stagger the start time of each character animation
        scrollTrigger: {
          trigger: spanRef.current, // Trigger the animation when the span is in view
          start: 'top 70%', // Start the animation when the top of the span reaches 70% of the viewport
        },
      });
    }
  }, [text]);

  return (
    <span
      ref={spanRef}
      className="text-white text-[67px]  lg:text-[140px]"
    >
      {text}
    </span>
  );
};

export default AnimatedText;
