import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import Header from '../header_footer/header.jsx';
import axios from 'axios';


import './Event.css';

const Event = () => {

    const navigate = useNavigate();

    // formData
    const initialFormData = {
        name: '',
        project_title: '',
        description: '',
        date_time: '',
        event_type: '',
        loc_link: ''
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // for create event
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Text before axois post req');

        axios.post('https://peerinsync-backend-server.onrender.com/events/create', JSON.stringify(formData), {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
            .then(() => {

                window.alert("Event Created Successfully");
                console.log("Form submitted:", JSON.stringify(formData));
                setFormData({
                    ...initialFormData,
                    name: `${userData.fName} ${userData.lName}`
                });

                // CLOSE BOOTSTRAP MODAL
                const modalEl = document.getElementById("createEvents");
                const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
                modalInstance.hide();

            })
            .catch((err) => {
                console.log(err);
                window.alert("Error submiting data." + err.message);
            });
    };

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

    // for fetching details
    useEffect(() => {

        const fetchInfo = async () => {
            try {
                const res = await axios.get('https://peerinsync-backend-server.onrender.com/me/me', { withCredentials: true });
                const data = res.data;
                setUserData(data);
                setFormData(prev => ({
                    ...prev,
                    name: `${data.fName} ${data.lName}`
                }));
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

    return (
        <>

            <Header />

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
                                    <div className='text-brown px-5'>

                                        <h1>Events & Webinars</h1>
                                        <p className="fw-medium">Learn from Alumni through seminars, webinars and workshops</p>
                                        <p className="fw-medium">Discover • Learn • Connect</p>

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
                                                <div className='d-flex justify-content-between align-items-center p-1'>
                                                    <p className='h5 mb-0'>Resume Building Workshop</p>
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

                            {userData.role === "alumni" ? (
                                <div className="d-flex justify-content-between align-items-center mb-0 pb-0">
                                    <span className="h4 text-brown mb-0">Event List</span>
                                    <button className="border-1 rounded-3 p-2 bg-cs-tertory1 transition-02 bx-shadow" data-bs-toggle="modal" data-bs-target="#createEvents"><i className="ri-add-large-line"></i> Create Event</button>
                                </div>
                            ) : (
                                <span className="h4 text-brown">Event List</span>
                            )}

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
                                                    <span><i className="ri-time-fill"></i> 25 Sept, 4:00 PM</span>
                                                </div>
                                            </div>

                                            {/* btn */}
                                            <div className="d-flex align-items-center gap-3">
                                                <span className="badge text-bg-success">3 days left</span>
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
                                                    <span><i className="ri-time-fill"></i> 28 Sept, 5:00 PM</span>
                                                </div>
                                            </div>

                                            {/* btn */}
                                            <div className="d-flex align-items-center gap-3">
                                                <span className="badge text-bg-success">5 days left</span>
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
                                                    <span><i className="ri-time-fill"></i> 7 Oct, 5:00 PM</span>
                                                </div>
                                            </div>

                                            {/* btn */}
                                            <div className="d-flex align-items-center gap-3">
                                                <span className="badge text-bg-warning">Upcoming</span>
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
                                                    <span><i className="ri-time-fill"></i> 8 Oct, 3:30 PM</span>
                                                </div>
                                            </div>

                                            {/* btn */}
                                            <div className="d-flex align-items-center gap-3">
                                                <span className="badge text-bg-warning">Upcoming</span>
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

            {/* create event Modal */}
            <div className="modal fade" id="createEvents" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-cs-primary1">

                        {/* modal header */}
                        <div className="modal-header d-flex justify-content-between">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Create Event</h1>
                            <button type="button" className="btn fs-5" data-bs-dismiss="modal" aria-label="Close"><i className="ri-close-large-line"></i></button>
                        </div>

                        {/* modal body */}
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>

                                {/* project title */}
                                <div>
                                    <label className="mb-1" htmlFor="project_title">Project Title :</label>
                                    <input className="mb-2 form-control" type="text" name="project_title" id="project_title" value={formData.project_title} onChange={handleChange} required />
                                </div>

                                {/* host */}
                                <div>
                                    <label className="mb-1" htmlFor="Host">Conducted By :</label>
                                    <input className="mb-2 form-control" type="text" name="host" id="host" value={userData.fName + " " + userData.lName} disabled />
                                </div>

                                {/* description */}
                                <div>
                                    <label className="mb-1" htmlFor="description">Description :</label>
                                    <textarea className="mb-2 form-control" name="description" id="description" rows={4} value={formData.description} onChange={handleChange} required></textarea>
                                </div>

                                {/* date-time */}
                                <div>
                                    <label className="mb-1" htmlFor="host">Date :</label>
                                    <input className="mb-3 form-control" type="datetime-local" name="date_time" id="date_time" value={formData.date_time} onChange={handleChange} required />
                                </div>

                                {/* event type */}
                                <div className="d-flex align-items-center">
                                    <span className="me-2">Event Type :</span>

                                    <input className="me-1" type="radio" name="event_type" id="seminar" value="seminar" checked={formData.event_type === "seminar"} onChange={handleChange} required />
                                    <label className="me-2" htmlFor="seminar">Seminar</label>

                                    <input className="me-1" type="radio" name="event_type" id="webinar" value="webinar" checked={formData.event_type === "webinar"} onChange={handleChange} />
                                    <label className="me-2" htmlFor="webinar">Webinar</label>

                                    <input className="me-1" type="radio" name="event_type" id="workshop" value="workshop" checked={formData.event_type === "workshop"} onChange={handleChange} />
                                    <label className="me-2" htmlFor="workshop">Workshop</label>
                                </div>

                                {/* location / link */}
                                <div className="mt-2">

                                    {formData.event_type === "webinar" ? (
                                        <div>
                                            <label className="mb-1" htmlFor="loc_link">Link :</label>
                                            <input className="mb-2 form-control" type="text" name="loc_link" id="loc_link" value={formData.loc_link} onChange={handleChange} placeholder="Google Meet link only" required />
                                        </div>
                                    ) : (
                                        <div>
                                            <label className="mb-1" htmlFor="loc_link">Location :</label>
                                            <input className="mb-2 form-control" type="text" name="loc_link" id="loc_link" value={formData.loc_link} onChange={handleChange} required />
                                        </div>
                                    )}

                                </div>

                            </form>
                        </div>

                        {/* modal footer */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-dark" onClick={handleSubmit}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Event;