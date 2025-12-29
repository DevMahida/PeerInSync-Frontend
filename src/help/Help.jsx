// import react from "react;"
import { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import PIS_logo from '../assets/images/PIS-logo.png';
import './Help.css';

const Help = () => {

    const initialFormData = {
        fullName: '',
        email: '',
        message: '', 
    };



    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value 
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('https://peerinsync-backend-server.onrender.com/helpDesk/help', JSON.stringify(formData), {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(() => {
                window.alert("Your Issue Is Recorded");
                console.log("Form submitted:", JSON.stringify(formData));
                setFormData(initialFormData);
            })

            .catch((err) => {
                console.log(err);
                window.alert("Error submiting data." + err.message);
            });
    };


    return (

        <>
            <div id="help"></div>

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
                            <button className="navbar-toggler border-black me-3 text-black" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasHelp" aria-controls="offcanvasRight">
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
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasHelp" aria-labelledby="offcanvasRightLabel">
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
                                <Link className="nav-link text-black" to="/About">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-black" data-bs-dismiss="offcanvas" to="/Help">Help</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            {/* header ends */}

            {/* main starts */}
            <main>
                <section className='help-form-wrapper bg-cs-secondary rounded-3 p-5'>
                    <form onSubmit={handleSubmit}>

                        {/* back button & title  */}

                        <div className='text-cs-heading text-center mb-5'>
                            <h2 className='h1 fw-medium'>Help Desk</h2>
                            <p className='lh-sm fw-medium'>We are here to help</p>
                        </div>

                        {/* form part  */}
                        <div className='row g-4'>

                            {/* Full Name */}
                            <div className='col-12'>
                                <div>
                                    <label className="fs-5" htmlFor="fullName">Full Name:</label>
                                    <input className='form-control' type="text" name="fullName" id="fullName" placeholder="Please enter your full name" value={formData.fullName} onChange={handleChange} required />
                                </div>
                            </div>

                            {/* Email */}
                            <div className='col-12'>
                                <div>
                                    <label className="fs-5" htmlFor="email">Email:</label>
                                    <input className='form-control' type="email" name="email" id="email" placeholder="Please enter your email" value={formData.email} onChange={handleChange} required />
                                </div>
                            </div>

                            {/* Message */}
                            <div className='col-12'>
                                <div>
                                    <label className="fs-5" htmlFor="message">Message:</label>
                                    <textarea className="form-control" name="message" id="message" cols="30" rows="8" placeholder="Write your issue here" value={formData.message} onChange={handleChange} required ></textarea>
                                </div>
                            </div>

                        </div>

                        {/* Submit botton */}
                        <div>
                            <button className='btn btn-dark px-3 mt-4' type='submit'>Submit</button>
                        </div>

                    </form>
                </section>
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
                                            <Link className="nav-link text-success fw-medium" to="/About">About</Link>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link text-success fw-medium" href="#help">Help</a>
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

export default Help;