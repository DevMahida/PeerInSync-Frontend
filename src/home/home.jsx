
import { Link } from 'react-router-dom';

import PIS_logo from '../assets/images/PIS-logo.png';
import book from '../assets/images/open-book.png';
import user_group from '../assets/images/user-group.png';
import calender from '../assets/images/reminder.png';
import discuss from '../assets/images/discuss.png';
import user from '../assets/images/user.png';
import user_account from '../assets/images/user-account.png';
import teamwork from '../assets/images/teamwork.png';

import './home.css';

// //CODE BY DARSH
import axios from 'axios';
import { useState, useEffect } from "react";



const Home = () => {

    const [backendGreet, setBackendGreet] = useState("Cannot retrieve data from backend :/");

    useEffect(() => {

        axios.get('https://peerinsync-backend-server.onrender.com/hello')
            .then((res) => {

                const data = res.data;
                setBackendGreet(data);
            })
            .catch((err) => {

                console.log(err);
            })
    }, []);


    return (
        <>

            <div id='home'></div>

            {/* header starts */}
            <header className='position-absolute start-0 end-0 bg-transparent '>
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
                            <button className="navbar-toggler border me-3 text-cs-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasHome" aria-controls="offcanvasRight">
                                <i className="ri-menu-line"></i>
                            </button>

                            {/* navbar */}
                            <div className="collapse navbar-collapse">
                                <ul className="navbar-nav gap-4 me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link text-cs-primary" to="/">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-cs-primary" to="/About">About</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-cs-primary" to="/Help">Help</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* offcanvas */}
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasHome" aria-labelledby="offcanvasRightLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasRightLabel">Navbar</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="nav d-block">
                            <li className="nav-item">
                                <Link className="nav-link text-black" to="/" data-bs-dismiss="offcanvas">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-black" to="/About">About</Link>
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
            <main className='bg-cs-primary pb-3'>

                {/* banner starts */}
                <section className='banner header home-banner py-5 d-flex justify-content-center align-items-center text-cs-primary'>
                    <div className="container z-2">
                        <div className="row">
                            <div className="col-sm-12 col-md-10 col-xl-8">
                                <div className="banner-card">
                                    <h2 className='display-6 fw-medium lh-base mt-5'>Connecting Student and Alumni For Mentorship, Career and Growth</h2>
                                    <p className='fs-4'>A platform to guide, connect and inspire students through Alumni experience and industry insights </p>
                                    <div className='d-flex gap-2'>
                                        <Link className='btn btn-outline-cs-success fs-5 px-3' to="/Register">Join Us</Link>
                                        <Link className='btn btn-outline-cs-success fs-5 px-3' to="/Login">Login</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
                {/* banner ends */}

                {/* Why PeerInSync starts */}
                <section className='bg-cs-secondary rounded-2 m-4 p-3'>
                    <div className="container">
                        <h2 className='text-center text-cs-heading py-4'>Why PeerInSync?</h2>

                        <div className="row g-4">
                            <div className="col-xl-3 col-md-6">
                                <div className="why-card bg-white rounded-3 h-100 py-4">
                                    <div className='text-center mb-3'>
                                        <img src={book} alt="" />
                                    </div>
                                    <h5 className='text-center text-subheading'>Alumni Directory</h5>
                                    <p className='text-center text-body'>Find and Connect with Alumni</p>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="why-card bg-white rounded-3 h-100 p-4">
                                    <div className='text-center mb-3'>
                                        <img src={user_group} alt="" />
                                    </div>
                                    <h5 className='text-center text-subheading'>Membership Program</h5>
                                    <p className='text-center text-body lh-sm'>One-on-one guidance from industry experts</p>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="why-card bg-white rounded-3 h-100 p-4">
                                    <div className='text-center mb-3'>
                                        <img src={calender} alt="" />
                                    </div>
                                    <h5 className='text-center text-subheading'>Event Calender</h5>
                                    <p className='text-center text-body lh-sm'>Stay updated with upcoming webinars, seminars, and alumni talks</p>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="why-card bg-white rounded-3 h-100 p-4">
                                    <div className='text-center mb-3'>
                                        <img src={discuss} alt="" />
                                    </div>
                                    <h5 className='text-center text-subheading'>Discussion Forums</h5>
                                    <p className='text-center text-body lh-sm '>Connect, collaborate, and share industry insights.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Why PeerInSync ends */}

                {/* How-it-wroks starst  */}
                <section>
                    <div className="container">

                        <h2 className='text-center text-cs-heading py-4'>How It Works</h2>

                        <div className="row">
                            <div className="col-lg-4">
                                <div className="how-card text-center bg-cs-secondary rounded-3 p-4 m-3">
                                    <h5 className='text-start text-cs-heading'>Step-1</h5>
                                    <div className='mb-3'>
                                        <img src={user} alt="" />
                                    </div>
                                    <h5 className='text-subheading mb-0'>Sign Up</h5>
                                    <p className='text-body'>as Student or Alumni</p>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="how-card text-center bg-cs-secondary rounded-3 p-4 m-3">
                                    <h5 className='text-start text-cs-heading'>Step-2</h5>
                                    <div className='mb-3'>
                                        <img src={user_account} alt="" />
                                    </div>
                                    <p className='text-body lh-sm'>Build your profile & <br /> interests</p>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="how-card text-center bg-cs-secondary rounded-3 p-4 m-3">
                                    <h5 className='text-start text-cs-heading'>Step-3</h5>
                                    <div className='mb-3'>
                                        <img src={teamwork} alt="" />
                                    </div>
                                    <h5 className='text-subheading mb-0'>Connect - Learn</h5>
                                    <p className='text-body'>& Collaborate</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* How-it-wroks ends */}

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
                                            <a className="nav-link text-success fw-medium" href="#home">Home</a>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-success fw-medium" to="/About">About</Link>
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

export default Home;