import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../header_footer/header.jsx';

import man from '../assets/images/man.png';
import man1 from '../assets/images/man1.png';

import './dashboard.css';

const Dashboard = () => {

    const navigate = useNavigate();

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
    }, []);

    return (
        <>

            <Header />

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
                                        <p className="h1">Welcome, {userData.fName + " " + userData.lName}</p>
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