import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import pis_logo1 from '../assets/images/PIS-logo.png';
import profile from '../assets/images/profile.png';
import axios from 'axios';

import './header.css';

const Header = () => {

    const navigate = useNavigate();

    // read userInfo
    const [userData, setUserData] = useState({

        _id: '',
        fName: '',
        lName: '',
        email: '',
        mobile_no: '',
        college_name: '',
        course_name: '',
        branch: '',
        current_year_of_study: '',
        gender: '',
        role: ''
    });

    useEffect(() => {

        const fetchInfo = async () => {
            try {
                const res = await axios.get('https://peerinsync-backend-server.onrender.com/me/me', { withCredentials: true });
                const data = res.data;
                setUserData(data);
            }
            catch (err) {
                if (err.response?.status === 401) {
                    alert('You are not logged in.');
                    navigate('/Login', { replace: true });
                }
                else {
                    console.error(err);
                }
            }
        }

        fetchInfo();

    }, [])

    const logout = (e) => {

        axios.post('https://peerinsync-backend-server.onrender.com/loginRegisterRoutes/logout', null, { withCredentials: true })
            .then(() => {
                toast.success("Logged out successfully");

                setTimeout(() => {
                    navigate("/");
                }/*, 1200*/); // enough time for toast to appear
            })
            .catch((err) => {
                console.log(err);
                window.alert("Unexpected Error" + err.message);
            });
    };

    const deleteAccount = (e) => {

        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");

        if (!confirmDelete) return;

        else {
            axios.delete('https://peerinsync-backend-server.onrender.com/loginRegisterRoutes/delete', { withCredentials: true })
                .then(() => {

                    // toast added
                    toast.success("Account deleted successfully");

                    // redirect after toast
                    setTimeout(() => {
                        navigate("/");
                    }/*, 1500*/);
                })
                .catch((err) => {

                    console.log(err);
                    window.alert("Unexpected Error" + err.message);

                    toast.error("Failed to delete account");
                });
        }
    }

    return (
        <>
            {/* Header starts  */}
            <header className="header-dash sticky-top">

                <div className="container scrollpy_nav d-flex justify-content-between align-items-center" id="navbar">

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
                                    <NavLink to="/dashboard" className={({ isActive }) => `nav-link hover-effect fs-6 fw-medium text-dark px-0 ${isActive ? "active" : ""}`}>
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li className="nav-item d-flex">
                                    <NavLink to="/alumni" className={({ isActive }) => `nav-link hover-effect fs-6 fw-medium text-dark px-0 ${isActive ? "active" : ""}`}>
                                        Alumni List
                                    </NavLink>
                                </li>
                                <li className="nav-item d-flex">
                                    <NavLink to="/Event" className={({ isActive }) => `nav-link hover-effect fs-6 fw-medium text-dark px-0 ${isActive ? "active" : ""}`}>
                                        Events
                                    </NavLink>
                                </li>
                                <li className="nav-item d-flex">
                                    <NavLink to="/alumni" className={({ isActive }) => `nav-link hover-effect fs-6 fw-medium text-dark px-0 ${isActive ? "active" : ""}`}>
                                        Discussion
                                    </NavLink>
                                </li>
                                <li className="nav-item d-flex">
                                    <NavLink to="/alumni" className={({ isActive }) => `nav-link hover-effect fs-6 fw-medium text-dark px-0 ${isActive ? "active" : ""}`}>
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
                                        <span className="h5">{userData.fName + " " + userData.lName}</span><br />
                                        <span>{userData.email}</span>
                                    </div>
                                </li>

                                <li><hr className="dropdown-divider" /></li>

                                {/* update */}
                                <li>
                                    <Link className="text-decoration-none" to="/Update">
                                        <div className="dropdown-item update rounded-1 transition-2 px-3 py-2 d-flex gap-2 align-items-center pointer">
                                            <span className="fs-5 text-success">
                                                <i className="ri-edit-box-line"></i>
                                            </span>
                                            <span>Update</span>
                                        </div>
                                    </Link>

                                </li>

                                <li><hr className="dropdown-divider" /></li>

                                {/* LogOut */}
                                <button className="dropdown-item white log-del pointer rounded-1 transition-2 d-flex gap-2 align-items-center px-3 py-2" onClick={logout}>
                                    <span className="fs-5 text-danger">
                                        <i className="ri-logout-box-r-line"></i>
                                    </span>
                                    <span>Logout</span>
                                </button>


                                {/* Delete */}
                                <li>
                                    <button className="dropdown-item white log-del pointer rounded-1 transition-2 d-flex gap-2 align-items-center px-3 py-2 " onClick={deleteAccount} >
                                        <span className="fs-5 text-danger">
                                            <i className="ri-delete-bin-6-line"></i>
                                        </span>
                                        <span>Delete Account</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

                {/* offcanvas */}
                <div className="offcanvas offcanvas-end header-dash" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">

                    {/* offcanvas header */}
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasRightLabel">PeerInSync Menu</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>

                    {/* offcanvas body */}
                    <div className="offcanvas-body scrollpy scrollpy_nav">
                        <ul className="nav flex-column gap-4">
                            <li className="nav-item d-flex">
                                <NavLink to="/dashboard" className={({ isActive }) => `nav-link hover-effect fs-6 fw-medium px-0 ${isActive ? "active" : ""}`}>
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className="nav-item d-flex">
                                <NavLink to="/alumni" className={({ isActive }) => `nav-link hover-effect fs-6 fw-medium text-dark px-0 ${isActive ? "active" : ""}`}>
                                    Alumni List
                                </NavLink>
                            </li>
                            <li className="nav-item d-flex">
                                <NavLink to="/Event" className={({ isActive }) => `nav-link hover-effect fs-6 fw-medium text-dark px-0 ${isActive ? "active" : ""}`}>
                                    Events
                                </NavLink>
                            </li>
                            <li className="nav-item d-flex">
                                <NavLink to="/alumni" className={({ isActive }) => `nav-link hover-effect fs-6 fw-medium text-dark px-0 ${isActive ? "active" : ""}`}>
                                    Discussion
                                </NavLink>
                            </li>
                            <li className="nav-item d-flex">
                                <NavLink to="/alumni" className={({ isActive }) => `nav-link hover-effect fs-6 fw-medium text-dark px-0 ${isActive ? "active" : ""}`}>
                                    Collaboration
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            {/* Header ends */}
        </>
    );


}

export default Header;