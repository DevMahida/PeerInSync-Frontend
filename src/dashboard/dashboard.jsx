import { useEffect, useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import pis_logo1 from '../assets/images/PIS-logo.png';
import profile from '../assets/images/profile.png';
import man from '../assets/images/man.png';
import man1 from '../assets/images/man1.png';

import './dashboard.css';

const Dashboard = () => {

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

    // const logout = (e) => { localStorage.removeItem('userinfo'); window.location.href = '/'; }

    const logout = (e) => {

        localStorage.removeItem('userinfo');
        toast.success("Logged out successfully");

        setTimeout(() => {
            navigate("/");
        }, 1200); // enough time for toast to appear
    };

    // const deleteAccount = async (e) => {

    //     await axios.delete('https://peerinsync-backend-server.onrender.com/loginRegisterRoutes/delete/' + userData.uniqid)
    //         .then(() => {
    //             window.alert("Account Deleted Successfully");
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             window.alert("Unexpected Error" + err.message);
    //         });
    // }

    const deleteAccount = async (e) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete your account? This action cannot be undone."
        );

        if (!confirmDelete) return;

        await axios
            .delete(
                'https://peerinsync-backend-server.onrender.com/loginRegisterRoutes/delete/' +
                userData.uniqid
            )
            .then(() => {
                // keep existing behavior
                // window.alert("Account Deleted Successfully");

                // cleanup
                localStorage.removeItem("userinfo");

                // toast added
                toast.success("Account deleted successfully");

                // redirect after toast
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
                window.alert("Unexpected Error " + err.message);

                toast.error("Failed to delete account");
            });
    };

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
                        <nav className="ms-3 d-none d-lg-block  ">
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

                {/* banner-activity starts */}
                <section>
                    <div className="container">
                        <div className="row mt-4 g-3">

                            {/* banner */}
                            <div className="col-lg-8">
                                <div className="dash-banner transition-02 rounded-4 d-flex align-items-center">
                                    <div className="ms-3 text-cs-primary">
                                        <p className="h1">Welcome, {userData.name}</p>
                                        <span className="h5">Every connection opens a new door!</span>
                                    </div>
                                </div>
                            </div>

                            {/* activity */}
                            <div className="col-lg-4 ">
                                <div className="border-brown transition-02 bg-cs-secondary1 p-3 rounded-4 text-brown">
                                    <span className="h4 text-dark">Your Activity</span>

                                    <div className="row my-2 my-sm-5">
                                        <div className="col-4">
                                            <div>
                                                <span className="d-block text-center display-4 fw-medium">12</span>
                                                <span className="d-block text-center fw-medium">Connection</span>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div>
                                                <span className="d-block text-center display-4 fw-medium">3</span>
                                                <span className="d-block text-center lh-sm fw-medium">Unread Messages</span>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div>
                                                <span className="d-block text-center display-4 fw-medium">2</span>
                                                <span className="d-block text-center lh-sm fw-medium">Upcoming Events</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* banner-activity ends */}


                {/* upcoming events stsrts */}
                <section className="mt-3">
                    <div className="container">
                        <div className="border-brown bg-cs-secondary1 p-3 rounded-4 text-brown">

                            <span className="h4 text-brown">Upcoming Events</span>

                            {/* upcoming event cards */}
                            <div className="row mt-2 g-3">
                                <div className="col-lg-6 col-xl-4">
                                    <div className="bg-cs-primary1 p-3 rounded-3 transition-02 h-130px">

                                        {/* event card body */}
                                        <div className="d-flex justify-content-between">

                                            {/* icon - detail */}
                                            <div className="d-flex gap-2">
                                                {/* icon */}
                                                <div>
                                                    <div className="d-flex fs-5 justify-content-center align-items-center icon-span rounded-5 bg-cs-tertory1">
                                                        <i className="ri-video-on-fill"></i>
                                                    </div>
                                                </div>

                                                {/* detail */}
                                                <div>
                                                    <h5 className="pb-0 mb-1">Webinar: Career in Cybersecurity</h5>
                                                    <p className="mb-0">By Alumni - Rahul Shah</p>
                                                    <span><i className="ri-calendar-line"></i> 28 Dec | 6:00 PM</span>
                                                </div>
                                            </div>

                                            {/* btn */}
                                            <div>
                                                <button className="border-1 rounded-3 ms-3 py-1 px-3 bg-cs-tertory1">View <br />Details</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-xl-4">
                                    <div className="bg-cs-primary1 p-3 rounded-3 transition-02 h-130px">

                                        {/* event card body */}
                                        <div className="d-flex justify-content-between">

                                            {/* icon - detail */}
                                            <div className="d-flex gap-2">
                                                {/* icon */}
                                                <div>
                                                    <div className="d-flex fs-4 justify-content-center align-items-center icon-span rounded-5 bg-cs-tertory1">
                                                        <i className="ri-shake-hands-fill"></i>
                                                    </div>
                                                </div>

                                                {/* detail */}
                                                <div>
                                                    <h5 className="pb-0 mb-3">Networking for Students & Alumni</h5>
                                                    <span><i className="ri-calendar-line"></i> 4 Jan | 5:00 PM</span>
                                                </div>
                                            </div>

                                            {/* btn */}
                                            <div>
                                                <button className="border-1 rounded-3 ms-3 py-1 px-3 bg-cs-tertory1">View <br />Details</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-xl-4">
                                    <div className="bg-cs-primary1 p-3 rounded-3 transition-02 h-130px">

                                        {/* event card body */}
                                        <div className="d-flex justify-content-between">

                                            {/* icon - detail */}
                                            <div className="d-flex gap-2">
                                                {/* icon */}
                                                <div>
                                                    <div className="d-flex fs-4 justify-content-center align-items-center icon-span rounded-5 bg-cs-tertory1">
                                                        <i className="ri-briefcase-4-fill"></i>
                                                    </div>
                                                </div>

                                                {/* detail */}
                                                <div>
                                                    <h5 className="pb-0 mb-3">Internship & Career Fair</h5>
                                                    <span><i className="ri-calendar-line"></i> 12 Jan | 12:00 PM</span>
                                                </div>
                                            </div>

                                            {/* btn */}
                                            <div>
                                                <button className="border-1 rounded-3 ms-3 py-1 px-3 bg-cs-tertory1">View <br />Details</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                {/* upcoming events ends */}

                {/* recommmended Alumni */}
                <section className="my-3">
                    <div className="container">
                        <div className="border-brown bg-cs-secondary1 p-3 rounded-4 text-brown">

                            <span className="h4 text-brown">Recommended Alumni</span>

                            {/* recommend cards */}
                            <div className="row mt-2 g-3">
                                <div className="col-md-6">
                                    <div className="bg-cs-primary1 p-3 rounded-3 transition-02">

                                        {/* card body */}
                                        <div className="d-flex justify-content-between">

                                            {/* icon - detail */}
                                            <div className="d-flex gap-2">
                                                {/* icon */}
                                                <div>
                                                    <img className="img-fluid" src={man} alt="" />
                                                </div>

                                                {/* detail */}
                                                <div>
                                                    <h5 className="pb-0 mb-1">Amit Patel</h5>
                                                    <p className="mb-0">Senior Software Engineer @ Google</p>
                                                    <span>Expertise: DSA, System Design</span>
                                                </div>
                                            </div>

                                            {/* btn */}
                                            <div className="d-flex align-items-center">
                                                <button className="border-1 rounded-3 p-2 bg-cs-tertory1">View Details</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="bg-cs-primary1 p-3 rounded-3 transition-02">

                                        {/* card body */}
                                        <div className="d-flex justify-content-between">

                                            {/* icon - detail */}
                                            <div className="d-flex gap-2">
                                                {/* icon */}
                                                <div>
                                                    <img className="img-fluid" src={man1} alt="" />
                                                </div>

                                                {/* detail */}
                                                <div>
                                                    <h5 className="pb-0 mb-1">Vinod Sharma</h5>
                                                    <p className="mb-0">Data Scientist @ Amazon</p>
                                                    <span>Expertise: Machine Learning, AI</span>
                                                </div>
                                            </div>

                                            {/* btn */}
                                            <div className="d-flex align-items-center">
                                                <button className="border-1 rounded-3 mx-2 p-2 bg-cs-tertory1">View Details</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>





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

export default Dashboard; 