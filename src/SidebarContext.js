import React, { createContext, useContext, useState, useRef } from 'react';
import { gsap } from 'gsap';

// Create Context
const SidebarContext = createContext();

// Provide Context
export const SidebarProvider = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    const sidebar = sidebarRef.current;
    gsap.to(sidebar, { x: isSidebarVisible ? '100%' : '0%', duration: 0.9, ease: 'power2.out' });
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarVisible, toggleSidebar, sidebarRef }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook for using context
export const useSidebar = () => useContext(SidebarContext);
