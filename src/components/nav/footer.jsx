import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo-gb.png'

const footer = () => {
    return (
        <>
        <footer
        className="section section-footer"
        data-theme-section="dark"
        data-bg-section="dark"
        >
        <div className="container wide">
            <div className="row row-logo grid" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
                <div className="col-logo" style={{ flex: '1' }}>
                    <div className="col-row col-row-payoff">
                    <p>You only live once, so think</p>
                    </div>
                    <div className="col-row flex flex-1 text-[30px] sm:text-[80px] md:text-[90px] col-row-logo">
                   <h1 style={{color:'rgba( 192, 202, 201 , 0.8)'}}>골드 브랜드</h1>
                </div>
                </div>
                <div className="col col-text styled-col" style={{ flex: '1', textAlign: 'right', paddingLeft: '20px' }}>
                    <div className="col-row col-row-text">
                    <p>
                    We’re a luxury clothing boutique dedicated to offering exclusive fashion pieces that help you stand out in every occasion.                    </p>
                    </div>
                    <div className="col-row col-row-btn">
                    <div className="btn">
                    <a href="mailto:redahaloubi8@gmail.com" className="btn-click">
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
                        <span>Contact us</span>
                        <span className="duplicate">Contact us</span>
                        </div>
                    </div>
                    </a>
                </div>
                </div>
                 </div>
            </div>
            <div className="row row-links">
            <ul className="col col-sitemap">
                <li className="link large" data-link-status="not-active">
                <Link to="AllProducts" className="link-click">
                    <div className="link-content">
                    <div className="link-text">
                        <span>Product</span>
                        <span className="duplicate">Product</span>
                    </div>
                    </div>
                </Link>
                </li>
                <li className="link large" data-link-status="not-active">
                <Link to="" className="link-click">
                    <div className="link-content">
                    <div className="link-text">
                        <span>Men</span>
                        <span className="duplicate">Men</span>
                    </div>
                    </div>
                </Link>
                </li>
                <li className="link large" data-link-status="not-active">
                <Link to="" className="link-click">
                    <div className="link-content">
                    <div className="link-text">
                        <span>Kids</span>
                        <span className="duplicate">Kids</span>
                    </div>
                    </div>
                </Link>
                </li>
                <li className="link large" data-link-status="not-active">

                <Link to="AllProducts" className="link-click">
                    <div className="link-content">
                    <div className="link-text">
                        <span>New Arrivals</span>
                        <span className="duplicate">New Arrivals</span>
                    </div>
                    </div>
                </Link>
                </li>
            </ul>
            <ul className="col col-socials">
                <li className="social-link">
                <a
                    href="#"
                    target="_blank"
                    className="social-link-click"
                >
                    <div className="social-link-content">
                    <div className="social-link-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M21.94,7.88a7.59,7.59,0,0,0-.46-2.43,4.85,4.85,0,0,0-1.16-1.77,4.85,4.85,0,0,0-1.77-1.16,7.59,7.59,0,0,0-2.43-.46C15.06,2,14.72,2,12,2s-3.06,0-4.12.06a7.59,7.59,0,0,0-2.43.46A4.85,4.85,0,0,0,3.68,3.68,4.7,4.7,0,0,0,2.53,5.45a7.3,7.3,0,0,0-.47,2.43C2,8.94,2,9.28,2,12s0,3.06.06,4.12a7.3,7.3,0,0,0,.47,2.43,4.7,4.7,0,0,0,1.15,1.77,4.85,4.85,0,0,0,1.77,1.16,7.59,7.59,0,0,0,2.43.46C8.94,22,9.28,22,12,22s3.06,0,4.12-.06a7.59,7.59,0,0,0,2.43-.46,5.19,5.19,0,0,0,2.93-2.93,7.59,7.59,0,0,0,.46-2.43c0-1.06.06-1.4.06-4.12S22,8.94,21.94,7.88ZM20.14,16a5.61,5.61,0,0,1-.34,1.86,3.33,3.33,0,0,1-1.9,1.9,5.61,5.61,0,0,1-1.86.34c-1,.05-1.37.06-4,.06s-3,0-4-.06A5.61,5.61,0,0,1,6.1,19.8a3.33,3.33,0,0,1-1.9-1.9A5.61,5.61,0,0,1,3.86,16c0-1-.06-1.37-.06-4s0-3,.06-4A5.61,5.61,0,0,1,4.2,6.1,3.33,3.33,0,0,1,6.1,4.2,5.61,5.61,0,0,1,8,3.86c1,0,1.37-.06,4-.06s3,0,4,.06a5.61,5.61,0,0,1,1.86.34,3.33,3.33,0,0,1,1.9,1.9A5.61,5.61,0,0,1,20.14,8c.05,1,.06,1.37.06,4S20.19,15,20.14,16Z" />
                        <path d="M12,6.86A5.14,5.14,0,1,0,17.14,12,5.14,5.14,0,0,0,12,6.86Zm0,8.47A3.33,3.33,0,1,1,15.33,12,3.33,3.33,0,0,1,12,15.33Z" />
                        <path d="M17.34,5.46a1.2,1.2,0,1,0,1.2,1.2A1.2,1.2,0,0,0,17.34,5.46Z" />
                        </svg>{" "}
                    </div>
                    <div className="social-link-icon duplicate">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M21.94,7.88a7.59,7.59,0,0,0-.46-2.43,4.85,4.85,0,0,0-1.16-1.77,4.85,4.85,0,0,0-1.77-1.16,7.59,7.59,0,0,0-2.43-.46C15.06,2,14.72,2,12,2s-3.06,0-4.12.06a7.59,7.59,0,0,0-2.43.46A4.85,4.85,0,0,0,3.68,3.68,4.7,4.7,0,0,0,2.53,5.45a7.3,7.3,0,0,0-.47,2.43C2,8.94,2,9.28,2,12s0,3.06.06,4.12a7.3,7.3,0,0,0,.47,2.43,4.7,4.7,0,0,0,1.15,1.77,4.85,4.85,0,0,0,1.77,1.16,7.59,7.59,0,0,0,2.43.46C8.94,22,9.28,22,12,22s3.06,0,4.12-.06a7.59,7.59,0,0,0,2.43-.46,5.19,5.19,0,0,0,2.93-2.93,7.59,7.59,0,0,0,.46-2.43c0-1.06.06-1.4.06-4.12S22,8.94,21.94,7.88ZM20.14,16a5.61,5.61,0,0,1-.34,1.86,3.33,3.33,0,0,1-1.9,1.9,5.61,5.61,0,0,1-1.86.34c-1,.05-1.37.06-4,.06s-3,0-4-.06A5.61,5.61,0,0,1,6.1,19.8a3.33,3.33,0,0,1-1.9-1.9A5.61,5.61,0,0,1,3.86,16c0-1-.06-1.37-.06-4s0-3,.06-4A5.61,5.61,0,0,1,4.2,6.1,3.33,3.33,0,0,1,6.1,4.2,5.61,5.61,0,0,1,8,3.86c1,0,1.37-.06,4-.06s3,0,4,.06a5.61,5.61,0,0,1,1.86.34,3.33,3.33,0,0,1,1.9,1.9A5.61,5.61,0,0,1,20.14,8c.05,1,.06,1.37.06,4S20.19,15,20.14,16Z" />
                        <path d="M12,6.86A5.14,5.14,0,1,0,17.14,12,5.14,5.14,0,0,0,12,6.86Zm0,8.47A3.33,3.33,0,1,1,15.33,12,3.33,3.33,0,0,1,12,15.33Z" />
                        <path d="M17.34,5.46a1.2,1.2,0,1,0,1.2,1.2A1.2,1.2,0,0,0,17.34,5.46Z" />
                        </svg>{" "}
                    </div>
                    </div>
                </a>
                </li>
                <li className="social-link">
                <a
                    href="#"
                    target="_blank"
                    className="social-link-click"
                >
                    <div className="social-link-content">
                    <div className="social-link-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12.442,2.017C13.534,2,14.617,2.008,15.7,2a5.189,5.189,0,0,0,1.458,3.475,5.878,5.878,0,0,0,3.533,1.492v3.358a8.938,8.938,0,0,1-3.5-.808,10.416,10.416,0,0,1-1.35-.775c-.008,2.433.009,4.866-.016,7.291A6.371,6.371,0,0,1,14.7,19.317a6.212,6.212,0,0,1-4.925,2.675,6.08,6.08,0,0,1-3.4-.859,6.284,6.284,0,0,1-3.042-4.758c-.016-.417-.025-.833-.008-1.242A6.273,6.273,0,0,1,10.6,9.567c.016,1.233-.034,2.466-.034,3.7a2.86,2.86,0,0,0-3.65,1.766A3.3,3.3,0,0,0,6.8,16.375a2.835,2.835,0,0,0,2.916,2.392,2.8,2.8,0,0,0,2.309-1.342,1.92,1.92,0,0,0,.341-.883c.084-1.492.05-2.975.059-4.467C12.434,8.717,12.417,5.367,12.442,2.017Z" />
                        </svg>{" "}
                    </div>
                    <div className="social-link-icon duplicate">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12.442,2.017C13.534,2,14.617,2.008,15.7,2a5.189,5.189,0,0,0,1.458,3.475,5.878,5.878,0,0,0,3.533,1.492v3.358a8.938,8.938,0,0,1-3.5-.808,10.416,10.416,0,0,1-1.35-.775c-.008,2.433.009,4.866-.016,7.291A6.371,6.371,0,0,1,14.7,19.317a6.212,6.212,0,0,1-4.925,2.675,6.08,6.08,0,0,1-3.4-.859,6.284,6.284,0,0,1-3.042-4.758c-.016-.417-.025-.833-.008-1.242A6.273,6.273,0,0,1,10.6,9.567c.016,1.233-.034,2.466-.034,3.7a2.86,2.86,0,0,0-3.65,1.766A3.3,3.3,0,0,0,6.8,16.375a2.835,2.835,0,0,0,2.916,2.392,2.8,2.8,0,0,0,2.309-1.342,1.92,1.92,0,0,0,.341-.883c.084-1.492.05-2.975.059-4.467C12.434,8.717,12.417,5.367,12.442,2.017Z" />
                        </svg>{" "}
                    </div>
                    </div>
                </a>
                </li>
            
               
                <li className="social-link">
                <a
                    href="https://www.linkedin.com/in/reda-haloubi-b41774209/"
                    target="_blank"
                    className="social-link-click"
                >
                    <div className="social-link-content">
                    <div className="social-link-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M19.039,19.043H16.078V14.4c0-1.106-.023-2.53-1.544-2.53-1.544,0-1.78,1.2-1.78,2.449v4.722H9.792V9.5h2.845v1.3h.039a3.12,3.12,0,0,1,2.808-1.542c3,0,3.556,1.975,3.556,4.546v5.238ZM6.447,8.194A1.72,1.72,0,1,1,8.168,6.473,1.719,1.719,0,0,1,6.447,8.194ZM7.932,19.043H4.963V9.5H7.932ZM20.521,2H3.476A1.458,1.458,0,0,0,2,3.441V20.559A1.458,1.458,0,0,0,3.476,22H20.518A1.463,1.463,0,0,0,22,20.559V3.441A1.464,1.464,0,0,0,20.518,2Z" />
                        </svg>{" "}
                    </div>
                    <div className="social-link-icon duplicate">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M19.039,19.043H16.078V14.4c0-1.106-.023-2.53-1.544-2.53-1.544,0-1.78,1.2-1.78,2.449v4.722H9.792V9.5h2.845v1.3h.039a3.12,3.12,0,0,1,2.808-1.542c3,0,3.556,1.975,3.556,4.546v5.238ZM6.447,8.194A1.72,1.72,0,1,1,8.168,6.473,1.719,1.719,0,0,1,6.447,8.194ZM7.932,19.043H4.963V9.5H7.932ZM20.521,2H3.476A1.458,1.458,0,0,0,2,3.441V20.559A1.458,1.458,0,0,0,3.476,22H20.518A1.463,1.463,0,0,0,22,20.559V3.441A1.464,1.464,0,0,0,20.518,2Z" />
                        </svg>{" "}
                    </div>
                    </div>
                </a>
                </li>
            </ul>
            </div>
            <div className="row row-credentials">
            <div className="col col-copyright">
                <div className="copyright-visual">
                <div className="visual">
                <img 
                    src={logo}
                    alt="description of image"
                    width={30} 
                    height={30} 
                    style={{ objectFit: 'contain' }} 
                    />

                </div>
                <div className="text">
                    <div className="top">
                    <h4 className="xxs">2024 © All rights reserved</h4>
                    </div>
                    <div className="bottom">
                    <p>
                    골드 브랜드 in Tangier offers luxury clothing from top global brands 
                    with elegance.
                    </p>
                    </div>
                </div>
                </div>
            </div>
            <div className="col col-legal">
                <div className="col-row">
                <span className="eyebrow inactive">Legal</span>
                </div>
                <ul className="col-row col-row-links">
                <li className="link">
                    <Link to="general-terms" className="link-click">
                    <div className="link-content">
                        <div className="link-text">
                        <span>General Terms</span>
                        <span className="duplicate">General Terms</span>
                        </div>
                    </div>
                    </Link>
                </li>
                </ul>
            </div>
            <div className="col col-credits">
                <div className="col-row">
                <span className="eyebrow inactive">Credits</span>
                </div>
                <div className="col-row col-row-links">
                <li className="link" target="_blank">
                    <a
                    href="https://github.com/rhaloubi"
                    target="_blank"
                    className="link-click"
                    >
                    <div className="link-content">
                        <div className="link-text">
                        <span>Design by Reda</span>
                        <span className="duplicate">Design by Reda</span>
                        </div>
                    </div>
                    </a>
                </li>
                <li className="link" target="_blank">
                    <a
                    href="https://github.com/rhaloubi"
                    target="_blank"
                    className="link-click"
                    >
                    <div className="link-content">
                        <div className="link-text">
                        <span>Code by Reda</span>
                        <span className="duplicate">Code by Reda</span>
                        </div>
                    </div>
                    </a>
                </li>
                </div>
            </div>
            </div>
        </div>
        </footer>

        </>


)

}


export default footer;