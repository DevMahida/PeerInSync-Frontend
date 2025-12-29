import { useEffect, useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import pis_logo1 from '../assets/images/PIS-logo.png';
import profile from '../assets/images/profile.png';
import axios from 'axios';


import './Event.css';

const Event = () => {

    const [userData, setUserData] = useState({

        uniqid: '',
        name: '',
        email: ''
    });

    useEffect(() => {
        const scrollSpy = new window.bootstrap.ScrollSpy(
            document.body,
            {
                target: "#navbar",
                offset: 50,
            }
        );

        let userinfo = localStorage.getItem('userinfo');
        //console.log(userinfo);

        if (userinfo) {
            try {
                setUserData(JSON.parse(userinfo));
            }
            catch (err) {
                console.error("Error parsing localStorage data:", err.message);
                setUserData({ name: '[Invalid data]' });
            }
        }

        return () => scrollSpy.dispose();
    }, []);

    const logout = (e) => {

        localStorage.removeItem('userinfo');
        window.location.href = '/';
    }

    const deleteAccount = async (e) => {

        await axios.delete('https://peerinsync-backend-server.onrender.com/loginRegisterRoutes/delete/' + userData.uniqid)
            .then(() => {
                window.alert("Account Deleted Successfully");
            })
            .catch((err) => {
                console.log(err);
                window.alert("Unexpected Error" + err.message);
            });
    }

    return (
        <>
            {/* Header starts  */}
            <header className="header-dash sticky-top">

                <div className="container d-flex justify-content-between align-items-center" id="navbar">

                    {/* logo nav */}
                    <div className="d-flex align-items-center gap-3 gap-lg-5">

                        {/* logo part */}
                        <div>
                            <p className="h3 text-dark mt-3">
                                <Link className="text-dark text-decoration-none" to="/">
                                    <img src={pis_logo1} alt="" width="100px" />
                                    {/* <span>PeerInSync</span> */}
                                </Link>
                            </p>
                        </div>

                        {/* nav links */}
                        <nav className="ms-3 d-none d-lg-block">
                            <ul className="nav gap-4 align-items-center">
                                <li className="nav-item d-flex">
                                    <NavLink to="/dashboard" className={({ isActive }) => `nav-link fs-6 fw-medium px-0 ${isActive ? "active" : ""}`}>
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li className="nav-item d-flex">
                                    <NavLink to="/alumni" className={({ isActive }) => `nav-link fs-6 fw-medium text-dark px-0 ${isActive ? "active" : ""}`}>
                                        Alumni List
                                    </NavLink>
                                </li>
                                <li className="nav-item d-flex">
                                    <NavLink to="/Event" className={({ isActive }) => `nav-link fs-6 fw-medium text-dark px-0 ${isActive ? "active" : ""}`}>
                                        Events
                                    </NavLink>
                                </li>
                                <li className="nav-item d-flex">
                                    <NavLink to="/alumni" className={({ isActive }) => `nav-link fs-6 fw-medium text-dark px-0 ${isActive ? "active" : ""}`}>
                                        Discussion
                                    </NavLink>
                                </li>
                                <li className="nav-item d-flex">
                                    <NavLink to="/alumni" className={({ isActive }) => `nav-link fs-6 fw-medium text-dark px-0 ${isActive ? "active" : ""}`}>
                                        Collaboration
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>

                    </div>

                    {/* off-btn profile */}
                    <div className="d-flex align-items-center gap-3">

                        {/* offcanvas btn */}
                        <div className="d-lg-none">
                            <button className="btn p-0 fs-4 rounded-5" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                <i className="ri-menu-line"></i>
                            </button>
                        </div>

                        {/* user */}
                        <div className="dropdown">
                            <button className=" bg-cs-profile  border-1 rounded-5 d-flex align-items-center" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                                <img className="d-inline-block my-1" src={profile} alt="" />
                                <span className="fs-3">
                                    <i className="ri-arrow-drop-down-line"></i>
                                </span>
                            </button>

                            <ul className="dropdown-menu rounded-4 px-3 profile-ul">

                                {/* name email */}
                                <li className="d-flex align-items-center gap-2">
                                    <div>
                                        <img className="d-inline-blockn" src={profile} alt="" width="40px" />
                                    </div>
                                    <div>
                                        <span className="h5">{userData.name}</span><br />
                                        <span>{userData.email}</span>
                                    </div>
                                </li>

                                <li><hr className="dropdown-divider" /></li>

                                {/* update */}
                                <li>
                                    <div className="dropdown-item update rounded-1 transition-2 px-3 py-2 d-flex gap-2 align-items-center pointer">
                                        <span className="fs-5 text-success">
                                            <i className="ri-edit-box-line"></i>
                                        </span>
                                        <span>Update</span>
                                    </div>
                                </li>

                                <li><hr className="dropdown-divider" /></li>

                                {/* LogOut */}
                                <li>
                                    <Link className="text-decoration-none" to='/' onClick={logout}>
                                        <div className="dropdown-item log-del pointer rounded-1 transition-2 d-flex gap-2 align-items-center px-3 py-2">
                                            <span className="fs-5 text-danger">
                                                <i className="ri-logout-box-r-line"></i>
                                            </span>
                                            <span>Log Out</span>
                                        </div>
                                    </Link>


                                </li>

                                {/* Delete */}
                                <li>
                                    <Link className="text-decoration-none" to='/' onClick={deleteAccount}>
                                        <div className="dropdown-item log-del pointer rounded-1 transition-2 d-flex gap-2 align-items-center px-3 py-2">
                                            <span className="fs-5 text-danger">
                                                <i className="ri-delete-bin-6-line"></i>
                                            </span>
                                            <span className="">Delete Account</span>
                                        </div>
                                    </Link>

                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

                {/* offcanvas */}
                <div className="offcanvas offcanvas-end header-dash" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">

                    {/* offcanvas header */}
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasRightLabel">PeerInSync Menu</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>

                    {/* offcanvas body */}
                    <div className="offcanvas-body" id="navbar">
                        <ul className="nav flex-column gap-4">
                            <li className="nav-item d-flex">
                                <NavLink to="/dashboard" className={({ isActive }) => `nav-link fs-6 fw-medium px-0 ${isActive ? "active" : ""}`}>
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className="nav-item d-flex">
                                <NavLink to="/alumni" className={({ isActive }) => `nav-link fs-6 fw-medium text-dark px-0 ${isActive ? "active" : ""}`}>
                                    Alumni List
                                </NavLink>
                            </li>
                            <li className="nav-item d-flex">
                                <NavLink to="/alumni" className={({ isActive }) => `nav-link fs-6 fw-medium text-dark px-0 ${isActive ? "active" : ""}`}>
                                    Events
                                </NavLink>
                            </li>
                            <li className="nav-item d-flex">
                                <NavLink to="/alumni" className={({ isActive }) => `nav-link fs-6 fw-medium text-dark px-0 ${isActive ? "active" : ""}`}>
                                    Forums
                                </NavLink>
                            </li>
                            <li className="nav-item d-flex">
                                <NavLink to="/alumni" className={({ isActive }) => `nav-link fs-6 fw-medium text-dark px-0 ${isActive ? "active" : ""}`}>
                                    Discussion
                                </NavLink>
                            </li>
                            <li className="nav-item d-flex">
                                <NavLink to="/alumni" className={({ isActive }) => `nav-link fs-6 fw-medium text-dark px-0 ${isActive ? "active" : ""}`}>
                                    Collaboration
                                </NavLink>
                            </li>
                            <li className="nav-item d-flex">
                                <NavLink to="/alumni" className={({ isActive }) => `nav-link fs-6 fw-medium text-dark px-0 ${isActive ? "active" : ""}`}>
                                    Help
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            {/* Header ends */}

            {/* main starts */}
            <main>

                {/* banner starts */}
                <section>
                    <div className="container">

                        {/* banner - participated events */}
                        <div className="row mt-4 g-3">

                            {/* banner */}
                            <div className="col-lg-8">
                                <div className="event-banner rounded-3 transition-02 d-flex align-items-center">
                                    <div className='text-cs-primary px-5'>

                                        <h1>Events & Webinars</h1>
                                        <p>Learn from Alumni through seminars and webinars</p>

                                    </div>
                                </div>
                            </div>

                            {/* Events */}
                            <div className="col-lg-4 ">
                                <div className="border-brown hight-275px bg-cs-secondary1 p-3 rounded-4 text-brown">
                                    <span className="h4 ">Participated Events</span>

                                    <div className="row mt-3">
                                        <div className="col-12">
                                            <div className='bg-cs-primary1 p-2 rounded-3 transition-02'>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <p className='h5'>Resume Building Workshop</p>
                                                    <button className="border-1 rounded-3 p-2 bg-cs-tertory1">Details</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
                {/* banner ends */}

                {/* Event list starts */}
                <section className="my-3">
                    <div className="container">
                        <div className="border-brown bg-cs-secondary1 p-3 rounded-4 text-brown">

                            <span className="h4 text-brown">Event List</span>

                            {/* recommend cards */}
                            <div className="row mt-2 g-3">

                                <div className="col-lg-6">

                                    <div className="bg-cs-primary1 p-3 rounded-3 transition-02">

                                        {/* card body */}
                                        <div className="d-flex justify-content-between">

                                            {/* detail */}
                                            <div className="d-flex gap-2">


                                                {/* detail */}
                                                <div>
                                                    <h4 className="pb-0 mb-1">Resume Building Workshop</h4>
                                                    <p className="mb-0"><strong>Workshop by</strong> Rahul Mehta (Alumni – HR Specialist)</p>
                                                    <span><strong>Platform</strong> : Google Meet</span><br />
                                                    <span><i class="ri-time-fill"></i> 25 Sept, 4:00 PM</span>
                                                </div>
                                            </div>

                                            {/* btn */}
                                            <div className="d-flex align-items-center gap-3">
                                                <span class="badge text-bg-success">3 days left</span>
                                                <button className="border-1 rounded-3 p-2 bg-cs-tertory1">Register</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="bg-cs-primary1 p-3 rounded-3 transition-02">

                                        {/* card body */}
                                        <div className="d-flex justify-content-between">

                                            {/* detail */}
                                            <div className="d-flex gap-2">

                                                {/* detail */}
                                                <div>
                                                    <h4 className="pb-0 mb-1">Higher Studies & Abroad Guidance</h4>
                                                    <p className="mb-0"><strong>Webinar by:</strong> Alumni Panel (MS & MBA Graduates)</p>
                                                    <span><strong>Platform</strong> : Google Meet</span><br />
                                                    <span><i class="ri-time-fill"></i> 28 Sept, 5:00 PM</span>
                                                </div>
                                            </div>

                                            {/* btn */}
                                            <div className="d-flex align-items-center gap-3">
                                                <span class="badge text-bg-success">5 days left</span>
                                                <button className="border-1 rounded-3 p-2 bg-cs-tertory1">Register</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="bg-cs-primary1 p-3 rounded-3 transition-02">

                                        {/* card body */}
                                        <div className="d-flex justify-content-between">

                                            {/* detail */}
                                            <div className="d-flex gap-2">


                                                {/* detail */}
                                                <div>
                                                    <h4 className="pb-0 mb-1">Data Science Career Talk</h4>
                                                    <p className="mb-0"><strong>Talk by:</strong> Kunal Patel (Data Scientist, Amazon)</p>
                                                    <span><strong>Platform</strong> : Google Meet</span><br />
                                                    <span><i class="ri-time-fill"></i> 7 Oct, 5:00 PM</span>
                                                </div>
                                            </div>

                                            {/* btn */}
                                            <div className="d-flex align-items-center gap-3">
                                                <span class="badge text-bg-warning">Upcoming</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="bg-cs-primary1 p-3 rounded-3 transition-02">

                                        {/* card body */}
                                        <div className="d-flex justify-content-between">

                                            {/* detail */}
                                            <div className="d-flex gap-2">


                                                {/* detail */}
                                                <div>
                                                    <h4 className="pb-0 mb-1">Cybersecurity Trends Seminar</h4>
                                                    <p className="mb-0"><strong>Seminar by: </strong> Dr. Neha Kulkarni (Cybersecurity Consultant)</p>
                                                    <span><strong>Auditorium</strong></span><br />
                                                    <span><i class="ri-time-fill"></i> 8 Oct, 3:30 PM</span>
                                                </div>
                                            </div>

                                            {/* btn */}
                                            <div className="d-flex align-items-center gap-3">
                                                <span class="badge text-bg-warning">Upcoming</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </section>
                {/* event list ends */}


            </main>
            {/* main ends */}


            {/* footer starts */}
            <footer className="bg-cs-footer01 p-4">
                <div className="container">
                    <p className='text-white text-center m-0'><i className="ri-copyright-line"></i>2025 PeerInSync. Built by Student for Students</p>
                </div>
            </footer>
            {/* footer ends */}

        </>
    );
}

export default Event;