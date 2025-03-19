import React, { useEffect, useRef } from 'react';

import Header from "./nav/Header";
import Footer from './nav/footer';
import Mark from './home/mark';
import Hero from './home/hero';
import SuHero from './home/suhero';
import NewProduct from './home/product';
import Tshirts from './home/T-shirts';
import Swimwear from './home/Swimwear';
import img1 from './media/home/img1.png';
import vid1 from './media/home/vid1.mp4';
import nikeVid from './media/home/nike-vid.mov';
import Template from '../template';


const Home = () => {
 
  return (
    <>
       <Template >
        <Header />
          <div className="scrollbar" data-scrollbar="" data-scrollbar-drag="false">
            <div
              className="thumb"
              data-scrollbar-thumb=""
              data-scrollbar-thumb-height="variable"
            />
          </div>

        <main
          className="main"
          id="main"
          data-barba="container"
          data-barba-namespace="home"
        >
            <div className="main-wrap" id="main-wrap" data-scroll-container="">
             <Hero />

             
              <NewProduct/>
              <Mark />
              <Tshirts/>
             <SuHero />
             <Swimwear/>
              { /*<section
                className="section section-quotes"
                data-theme-section="dark"
                data-bg-section="dark"
              >
                <div className="container wide">
                  <div className="row row-title">
                    <div className="col">
                      <h2 className="m">
                        <span>Just believe our clients</span>
                        <div className="icon">
                          <svg
                            width={56}
                            height={40}
                            viewBox="0 0 56 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.8921 19.2393H5.70438V0.405971H25.3782V19.5275L12.6687 39.594H0.73768L13.2351 19.8625L13.6298 19.2393H12.8921ZM43.0957 19.2393H35.9081V0.405971H55.5818V19.5275L42.8723 39.594H30.9413L43.4387 19.8625L43.8334 19.2393H43.0957Z"
                              stroke="#001514"
                              strokeWidth="0.811942"  // Changed from stroke-width
                              strokeLinejoin="round"  // Changed from stroke-linejoin if present
                            />
                          </svg>
                        </div>{" "}
                        <span>words</span>
                      </h2>
                    </div>
                  </div>

                  <div className="row row-btn">
                    <div className="col">
                      <div className="col-row col-row-btn">
                        <div className="btn">
                          <a href="contact" className="btn-click">
                            <div className="btn-icon">
                              <div className="icon-sprite">
                                <svg
                                  width={144}
                                  height={24}
                                  viewBox="0 0 144 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M102.5 6.5H113.5V17.5H102.5V6.5ZM111.718 15.7179V8.28207H104.282V15.7179H111.718Z"
                                    fill="black"
                                  />
                                  <path
                                    d="M30 12C30 8.70046 32.7005 6 36 6C39.2995 6 42 8.70046 42 12C42 15.2995 39.2995 18 36 18C32.7005 18 30 15.2995 30 12ZM40.1309 12C40.1309 9.73824 38.2618 7.86913 36 7.86913C33.7383 7.86913 31.8691 9.73824 31.8691 12C31.8691 14.2617 33.7383 16.1309 36 16.1309C38.2618 16.1309 40.1309 14.2617 40.1309 12Z"
                                    fill="black"
                                  />
                                  <path
                                    d="M84.8248 13.9873V18H83.1752V13.9873L80.0625 17.1L78.8999 15.9375L82.0127 12.8248H78V11.1752H82.0127L78.8999 8.06247L80.0625 6.89995L83.1752 10.0127V6H84.8248V10.0127L87.9375 6.89995L89.1001 8.06247L85.9873 11.1752H90V12.8248H85.9873L89.1001 15.9375L87.9375 17.1L84.8248 13.9873Z"
                                    fill="black"
                                  />
                                  <path
                                    d="M136.5 14.6138V17.5045L131.889 14.3058L127.5 17.5045V14.6138L131.889 11.5477L136.5 14.6138ZM136.5 9.56106V12.4731L131.889 9.27443L127.5 12.4731V9.56106L131.889 6.495L136.5 9.56106Z"
                                    fill="black"
                                  />
                                  <path
                                    d="M59.6043 8.435V11.9362L57.3022 15.5638H55L57.3022 11.9362H55.9461V8.435H59.6065H59.6043ZM64.9978 8.435V11.9362L62.6957 15.5638H60.3935L62.6957 11.9362H61.3397V8.435H65H64.9978Z"
                                    fill="black"
                                  />
                                  <path
                                    d="M10.1016 16.6517L8.36246 15.5498L10.2178 12.7367L7 11.7509L7.57904 9.77938L10.9712 10.7932V7.345H13.0288V10.7952L16.421 9.78139L17 11.7529L13.7522 12.7387L15.6075 15.5518L13.8684 16.6538L11.983 13.7545L10.0976 16.6538L10.1016 16.6517Z"
                                    fill="black"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="btn-content">
                              <div className="btn-text">
                                <span>Work with us</span>
                                <span className="duplicate">Work with us</span>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section> */}


              <Footer />
            </div>
        </main>
      </Template>
    </>
  );
};

export default Home;
