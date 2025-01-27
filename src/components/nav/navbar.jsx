import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import product from '../assets/img/LV2.jpg';
import NewArr from '../assets/img/gucci3.jpg';
import Men from '../assets/img/Cap1.jpg';
import Kids from '../assets/img/kids.jpg';
import img4 from '../assets/img/gucci4.jpg';



const Navbar = () => {
  const [hoveredLink, setHoveredLink] = useState('two-percent'); // Default image

  const handleMouseEnter = (linkId) => {
    setHoveredLink(linkId);
  };

  const handleMouseLeave = () => {
    setHoveredLink('two-percent'); // Default image when not hovering over any link
  };

  useEffect(() => {
    // GSAP animation for image change, pop out from below
    gsap.fromTo(
      `.single-stacked-image.overlay[data-stacked-image-id="${hoveredLink}"]`,
      { y: '100%', zIndex: 1 }, // Start below
      { y: '0%', zIndex: 2, duration: 0.6, ease: 'power4.out' } // Move to the current position
    );
  }, [hoveredLink]);

  return (
    <>
      <nav aria-label="Navigation Overlay and Mobile" className="navigation-full ">
        <div className="navigation-tile" style={{ backgroundColor: '#3C3D37' }} />
        <div className="navigation-tile" style={{ backgroundColor: '#3C3D37' }} />
        <div className="navigation-tile last" style={{ backgroundColor: '#3C3D37' }} />
        <div className="navigation-tile last" style={{ backgroundColor: '#3C3D37' }} />
        <div className="overlay navigation-shade" />
        <div className="navigation-images" data-nav-stacked-images-init="">
          <div className="navigation-images-wrapper overlay">
            <div className="navigation-images-inner-wrapper overlay">
              {/* Display image based on hovered link */}
              {hoveredLink === 'two-percent' && (
                <div
                  data-barba-update=""
                  data-stacked-image-id="two-percent"
                  data-stacked-image-status="active"
                  data-link-status="not-active"
                  className="single-stacked-image overlay"
                >
                  <picture className="overlay">
                    <source
                      type="image/webp"
                      srcSet={product}
                    />
                    <img
                      alt="2% Navigation Image"
                      className="overlay"
                      width={1440}
                      height={2160}
                    />
                  </picture>
                </div>
              )}
              {/* Repeat for other links: contact, about, services, and work */}
              {/* Example for 'New Arrivals': */}
              {hoveredLink === 'New Arrivals' && (
                <div
                  data-barba-update=""
                  data-stacked-image-id="New Arrivals"
                  data-stacked-image-status="active"
                  data-link-status="not-active"
                  className="single-stacked-image overlay"
                >
                  <picture className="overlay">
                    <source
                      type="image/webp"
                      srcSet={NewArr}
                    />
                    <img
                      alt="New Arrivals Navigation Image"
                      className="overlay"
                      width={1080}
                      height={1440}
                    />
                  </picture>
                </div>
              )}
              {hoveredLink === 'Kids' && (
                <div
                      data-barba-update=""
                      data-stacked-image-id="Kids"
                      data-stacked-image-status="active"
                      data-link-status="not-active"
                      className="single-stacked-image overlay"
                      style={{
                        height: '100vh',
                        display: 'flex',
                        justifyContent: 'center', // optional, to center the image
                        alignItems: 'center', // optional, to center the image
                      }}
                    >
                      <picture className="overlay">
                        <source type="image/webp" srcSet={Kids} />
                        <img
                          alt="Kids Navigation Image"
                          className="overlay"
                          style={{
                            height: '63%',
                            objectFit: 'cover', // ensures the image covers the entire area
                            width: 'auto', // maintain the aspect ratio
                          }}
                          width={1440}
                          height={2260}
                        />
                      </picture>
                    </div>

              )}
              {hoveredLink === 'product' && (
                <div
                  data-barba-update=""
                  data-stacked-image-id="services"
                  data-stacked-image-status="active"
                  data-link-status="not-active"
                  className="single-stacked-image overlay"
                >
                  <picture className="overlay">
                    <source
                      type="image/webp"
                        srcSet={img4}
                        />
                        <img
                        alt="Services Navigation Image"
                        className="overlay"
                        width={1440}
                        height={2558}
                        />
                    </picture>
                    </div>
              )}
              {hoveredLink === 'Men' && (
                    <div
                    data-barba-update=""
                    data-stacked-image-id="Men"
                    data-stacked-image-status="active"
                    data-link-status="not-active"
                    className="single-stacked-image overlay"
                    >
                    <picture className="overlay">
                        <source
                        type="image/webp"
                        srcSet={Men}
                        />
                        <img
                        alt="Men Navigation Image"
                        className="overlay"
                        width={1440}
                        height={1920}
                        />
                    </picture>
                    </div>
              )}
                </div>
                </div>
            </div>
            <ul className="navigation-center" data-links-hover="false">
                <div className="link-wrap" data-nav-id-wrap="Men">
                <li
                className="link dark large"
                data-barba-update=""
                data-link-status="not-active"
                data-nav-id="Men"
                onMouseEnter={() => handleMouseEnter('Men')}
                onMouseLeave={handleMouseLeave}
                >
                 <Link   to="/AllProducts" 
                      onClick={(e) => {
                        // Set the selected gender to 'kids'
                        localStorage.setItem('selectedGender', 'male');
                        
                        // Check if the current page is already '/AllProducts'
                        if (window.location.pathname === '/AllProducts') {
                          e.preventDefault(); // Prevent default navigation
                          window.location.reload(); // Manually reload the page
                        }
                      }}   className="link-click">
                    <div className="link-content">
                    <div className="link-text">
                        <span>Men</span>
                        <span className="duplicate">Men</span>
                    </div>
                    </div>
                </Link>
                </li>
                </div>
                <div className="link-wrap" data-nav-id-wrap="work">

                    <li
                        className="link dark large"
                        data-barba-update=""
                        data-link-status="not-active"
                        data-nav-id="product"
                        onMouseEnter={() => handleMouseEnter('product')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link   to="/AllProducts" 
                      onClick={(e) => {
                        
                        // Check if the current page is already '/AllProducts'
                        if (window.location.pathname === '/AllProducts') {
                          e.preventDefault(); // Prevent default navigation
                          window.location.reload(); // Manually reload the page
                        }
                      }}  className="link-click">
                        <div className="link-content">
                            <div className="link-text">
                            <span>Product</span>
                            <span className="duplicate">Product</span>
                            </div>
                        </div>
                        </Link>
                    </li>
                </div>
                <div className="link-wrap" data-nav-id-wrap="Men">

                <li
                    className="link dark large"
                    data-barba-update=""
                    data-link-status="not-active"
                    data-nav-id="Kids"
                    onMouseEnter={() => handleMouseEnter('Kids')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link 
                      to="/AllProducts" 
                      onClick={(e) => {
                        // Set the selected gender to 'kids'
                        localStorage.setItem('selectedGender', 'kids');
                        
                        // Check if the current page is already '/AllProducts'
                        if (window.location.pathname === '/AllProducts') {
                          e.preventDefault(); // Prevent default navigation
                          window.location.reload(); // Manually reload the page
                        }
                      }}  
                      className="link-click"
                    >
                      <div className="link-content">
                        <div className="link-text">
                          <span>Kids</span>
                          <span className="duplicate">Kids</span>
                        </div>
                      </div>
                    </Link>
                  </li>

                </div>
                <div className="link-wrap" data-nav-id-wrap="work">

                        <li
                            className="link dark large"
                            data-barba-update=""
                            data-link-status="not-active"
                            data-nav-id="New Arrivals"
                            onMouseEnter={() => handleMouseEnter('New Arrivals')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link to="AllProducts"   onClick={(e) => {
                        // Check if the current page is already '/AllProducts'
                        if (window.location.pathname === '/AllProducts') {
                          e.preventDefault(); // Prevent default navigation
                          window.location.reload(); // Manually reload the page
                        }
                      }}   className="link-click">
                            <div className="link-content">
                                <div className="link-text">
                                <span>New Arrivals</span>
                                <span className="duplicate">New Arrivals</span>
                                </div>
                            </div>
                            </Link>
                        </li>
                </div>

        </ul>

            <div className="navigation-bottom-usps">
                <div className="container large">
                <div className="col-row">
                    <span className="eyebrow inactive">Address</span>
                    <h4 className="xxs"> Tanger 90010, Morroco</h4>
                </div>
                <div className="col-row">
                    <span className="eyebrow inactive">Contact</span>
                    <div className="link dark large">
                    <div
                        data-copy-clipboard="redahaloubi8@gmail.com"
                        className="link-click"
                    >
                        <div className="link-content">
                        <div className="link-text">
                            <span>redahaloubi8@gmail.com</span>
                            <span className="duplicate">redahaloubi8@gmail.com</span>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
    </nav>

        </>


)

}


export default Navbar;
           