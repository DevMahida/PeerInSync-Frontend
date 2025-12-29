// import React from "react";
import { Link } from 'react-router-dom';

import PIS_logo from '../assets/images/PIS-logo.png';
import img_banner from '../assets/images/about-banner.png'
import banner_img from '../assets/images/about-banner-img.png'

import './About.css';

const About = () => {
    return (
        
        <>
            <div id='about'></div>
            {/* header starts */}
            <header className='bg-cs-footer1'>
                <nav className="navbar navbar-expand-lg ">
                    <div className="container d-flex justify-content-between ">

                        {/* logo */}
                        <div>
                            <Link to="/" className="navbar-brand">
                                <img src={PIS_logo} alt="" width="125px" />
                            </Link>
                        </div>

                        {/* navbar */}
                        <div>
                            {/* offcanvas Button */}
                            <button className="navbar-toggler border-black me-3 text-black" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAbout" aria-controls="offcanvasRight">
                                <i className="ri-menu-line"></i>
                            </button>

                            {/* navbar */}
                            <div className="collapse navbar-collapse">
                                <ul className="navbar-nav gap-4 me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link fw-medium text-black" to="/">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link fw-medium text-black" to="/About">About</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link fw-medium text-black" to="/Help">Help</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* offcanvas */}
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasAbout" aria-labelledby="offcanvasRightLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasRightLabel">Navbar</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="nav d-block">
                            <li className="nav-item">
                                <Link className="nav-link text-black" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-black" to="/about" data-bs-dismiss="offcanvas">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-black" to="/Help">Help</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            {/* header ends */}

            {/* main starts */}
            <main>

                {/* banner starts */}
                <section className="bg-cs-banner p-2 py-5 p-sm-5 bg-cs-img">
                    <div className="container ">
                        <div className="row align-items-center">
                            <div className='col-sm-8'>
                                <div>
                                    <h1 className='text-cs-heading'>About PeerInSync</h1>
                                    <p className='mb-0 fw-medium text-subheading'>Building lifelong connection between Alumni and Students</p>
                                </div>
                            </div>
                            <div className='col-4 d-none d-sm-block'>
                                <div className='text-end'>
                                    <img className='' src={img_banner} alt="" width="80%" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* banner ends */}

                {/* Who we are starts */}
                <section className='bg-cs-secondary p-5 m-4 rounded-3'>
                    <div className="container">
                        <h2 className='text-center text-heading mb-5'>Who We Are</h2>

                        <div className="row align-items-center">
                            <div className="col-md-8 order-2 order-md-1">
                                <div className='who-data'>
                                    <p>
                                        PeerInSync is a platform designed to bridge the gap between students and alumni by fostering mentorship, collaboration, and lifelong connections. It helps students gain real-world insights, career guidance, and support from experienced alumni. By creating a space for meaningful interactions and shared learning, PeerInSync encourages personal growth and professional development. Our goal is to build a strong, supportive community where experiences are shared, opportunities are created, and learning never stops.
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-4 order-1 order-md-2">
                                <div className='who-data text-center text-md-end mb-4'>
                                    <img src={banner_img} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Who we are ends */}

                {/* our mission starts */}
                <section className='py-5 px-sm-5 m-4'>
                    <div className="container">
                        <h2 className='text-center text-heading mb-5'>Our Mission</h2>

                        <div className="row align-items-center g-4">
                            <div className="col-md-4 col-sm-6">
                                <div className='bg-cs-secondary p-4 rounded-3'>
                                    <h4 className='text-cs-heading text-center mb-3'>Connect</h4>
                                    <p className='text-center lh-sm text-subheading'>
                                        Build meaningfull relationships betweem alumni and students.
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                <div className='bg-cs-secondary p-4 rounded-3'>
                                    <h4 className='text-cs-heading text-center mb-3'>Mentor & Learn</h4>
                                    <p className='text-center lh-sm text-subheading'>
                                        Share real world insights and guidance for career growth.
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 mx-auto">
                                <div className='bg-cs-secondary p-4 rounded-3'>
                                    <h4 className='text-cs-heading text-center mb-3'>Grow Together</h4>
                                    <p className='text-center lh-sm text-subheading'>
                                        Create a lifelong community that envolves with its roles.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* our mission ends */}

                {/* vision starts */}
                <section className='bg-cs-secondary py-5 px-md-4 m-4 rounded-3'>
                    <div className="container">
                        <h2 className='text-center text-heading mb-5'>Our Vision</h2>

                        <div className="row align-items-center justify-content-center">
                            <div className="col-10">
                                <div className='vision-data'>
                                    <p className='text-subheading text-center'>
                                        We envision PeerInSync as a platform that grows with its member - a place where stories are shared, opportunities are created, and collaborations thrive.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Who we are ends */}

            </main>
            {/* main ends */}


            {/* footer starts */}
            <footer>

                {/* footer-1 starts */}
                <section className='bg-cs-footer1 py-4'>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-4">
                                <div className="footer-card d-flex justify-content-center">
                                    <ul className="nav">
                                        <li className="nav-item">
                                            <Link className="nav-link text-success fw-medium" to="/">Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link text-success fw-medium" href="#about">About</a>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-success fw-medium" to="/Help">Help</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                {/* logo */}
                                <div className='footer-card text-center'>
                                    <Link to="/" className="navbar-brand">
                                        <img src={PIS_logo} alt="" width="80px" />
                                    </Link>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="footer-card">
                                    <p className='m-0 text-center text-lg-start text-footer'>Connecting Students and Alumni for Mentorship and Growth</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* footer-1 ends */}

                {/* footer-2 starts */}
                <section className='bg-cs-footer2 p-4'>
                    <div className="container">
                        <p className='text-white text-center m-0'><i className="ri-copyright-line"></i>2025 PeerInSync. Built by Student for Students</p>
                    </div>
                </section>
                {/* footer-2 ends */}

            </footer>
            {/* footer ends */}
        </>

    );
}

export default About;