import React, { useEffect } from 'react';
import SvgNotfound from "./nav/404";
import Header from "./nav/Header";
import Navbar from './nav/navbar';
import { gsap } from 'gsap';
import Template from '../template';
import Footer from './nav/footer';

const NotFoundPage = () => {


  return (
   <>
   <Template>
   <body data-barba="wrapper" data-navigation-status="not-active" data-scrolling-started="false" data-scrolling-direction="down" data-theme-page="light" data-theme-nav="light" data-theme-nav-bottom="light" data-bg-nav="light" data-bg-nav-bottom="light" data-page-transition="active" data-page-transition-bottom="active">
      <Header />
    <SvgNotfound/>

    <Footer/>
    </body>

    </Template>
   </>
  );
};

export default NotFoundPage;
