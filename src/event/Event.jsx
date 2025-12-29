import { Link, NavLink } from 'react-router-dom';
import pis_logo1 from '../assets/images/PIS-logo.png';
import profile from '../assets/images/profile.png';

const Event = () => {
    return (
        <>
            {/* header starts */}
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
                                        <span className="h5">User</span><br />
                                        <span>example@gmail.com</span>
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
                                    <Link className="text-decoration-none" to='/'>
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
                                    <div className="dropdown-item log-del pointer rounded-1 transition-2 d-flex gap-2 align-items-center px-3 py-2">
                                        <span className="fs-5 text-danger">
                                            <i className="ri-delete-bin-6-line"></i>
                                        </span>
                                        <span className="">Delete Account</span>
                                    </div>
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
            {/* header ends */}

            {/* main starts */}
            <main>

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