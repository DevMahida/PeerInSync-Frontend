import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

import Header from '../header_footer/header.jsx';

import man from '../assets/images/man.png';
import man1 from '../assets/images/man1.png';

import './dashboard.css';

const Dashboard = () => {

    const navigate = useNavigate();

    // to get tomorrow's date
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrow = tomorrowDate.toISOString().split("T")[0];

    // to get 2 day's back date
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 2);
    const yesterday = yesterdayDate.toISOString().split("T")[0];

    // to get today's date
    const today = new Date().toISOString().split("T")[0];

    // to get tomorrow's date + 1
    const TwoDaysLaterDate = new Date();
    TwoDaysLaterDate.setDate(TwoDaysLaterDate.getDate() + 2);
    const TwoDaysLater = TwoDaysLaterDate.toISOString().split("T")[0];

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

    const [selectedEvent, setSelectedEvent] = useState(null);


    // used for fetching event data inform of array
    const [events, setEvents] = useState([]);

    // fetch events from data base
    const fetchEvents = () => {

        axios.get('https://peerinsync-backend-server.onrender.com/events/getEvents', { withCredentials: true })
            .then(response => {
                setEvents(response.data);
                console.log(response.data);
            })
            .catch(err => console.log(err));
    };

    // used registered events
    const [myEvents, setMyEvents] = useState([]);

    // for fetching user detials, events and enrolled events when page loads
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

        const getMyEvents = async () => {

            axios.get('https://peerinsync-backend-server.onrender.com/events/myEvents', { withCredentials: true })
                .then(response => {
                    setMyEvents(response.data);
                    console.log(response.data);
                })
                .catch(err => console.log(err));
        }

        getMyEvents();
        fetchInfo();
        fetchEvents();

    }, []);

    const registerEvent = (e) => {

        e.preventDefault();

        const eventID = e.target.dataset.id;
        console.log(eventID);

        axios.post('https://peerinsync-backend-server.onrender.com/events/registerEvent/' + eventID, null, { withCredentials: true })
            .then(() => {
                window.alert("Event Registered Successfully");
                fetchEvents();
                getMyEvents();
            })
            .catch(err => {
                console.log(err);
                window.alert("Error registering for event: Event not found, already registered, or event is full | " + err.message);
            })

    }

    const unregisterEvent = (e) => {

        e.preventDefault();

        const eventID = e.target.dataset.id;
        console.log(eventID);

        axios.put('https://peerinsync-backend-server.onrender.com/events/unregister/' + eventID, null, { withCredentials: true })
            .then(() => {
                window.alert("Unregistered Successfully");
                fetchEvents();
                getMyEvents();
            })
            .catch(err => {
                console.log(err);
                window.alert("Error unregistering for event: Event not found or already unregistered | " + err.message);
            })

    }

    // count of enrolled events
    const isParticipated = myEvents.filter(myEv => myEv.date >= today);
    const count = isParticipated.length;

    // if selectedEvent = myEvents then user is registered
    const isRegistered = selectedEvent ? myEvents.some(myEv => myEv._id === selectedEvent._id) : false;

    let footerContent;
    let webinarLink;

    if (selectedEvent?.date >= today && selectedEvent?.date <= TwoDaysLater) {
        if (isRegistered) {
            footerContent = <span className="dis-unregister" title="Unregistering is not allowed within 2 days of the event.">
                <button type="button" className="btn btn-dark" disabled>Unregister</button>
            </span>
            if (selectedEvent?.event_type === "webinar") {
                webinarLink = <span><strong>Link :</strong> {selectedEvent?.loc_link}</span>
            }

        } else {
            footerContent = <button type="button" className="btn btn-dark" data-id={selectedEvent?._id} onClick={registerEvent}>Register</button>
        }
    }
    else {
        if (isRegistered) {
            footerContent = <button type="button" className="btn btn-dark" data-id={selectedEvent?._id} onClick={unregisterEvent}>Unregister</button>
        } else {
            footerContent = <button type="button" className="btn btn-dark" data-id={selectedEvent?._id} onClick={registerEvent}>Register</button>
        }
    }

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
                                                <Link to="/Event" className="text-decoration-none text-brown">
                                                    <span className="d-block text-center display-4 fw-medium">
                                                        {count}
                                                    </span>
                                                    <span className="d-block text-center lh-sm fw-medium">Enrolled<br />Events</span>
                                                </Link>
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

                            {/* title / view all */}
                            <div className="d-flex justify-content-between">
                                <span className="h4 text-brown">Upcoming Events</span>
                                <Link to="/Event" className="text-decoration-none ">
                                    <button className="border-1 rounded-3 p-2 bg-cs-tertory1 transition-02 bx-shadow">View All</button>
                                </Link>
                            </div>

                            {/* upcoming event cards */}
                            <div className="row mt-2 g-3">
                                {[...events]
                                    .filter(events => events.date >= today) //today and future date
                                    .sort((a, b) => new Date(a.date) - new Date(b.date)) // sort by event date(ascending)
                                    .slice(0, 3) // shows 3 elements
                                    .map(events => (
                                        <div className="col-xl-4 col-lg-6" key={events._id}>
                                            <div className="bg-cs-primary1 p-3 rounded-3 transition-02 h-130px">

                                                {/* event card body */}
                                                <div className="row justify-content-between">

                                                    {/* icon - detail */}
                                                    <div className="col-8 col-cm-12 me-0 d-flex gap-2">

                                                        {/* icon */}
                                                        <div>
                                                            <div className="d-flex fs-4 justify-content-center align-items-center icon-span rounded-5 bg-cs-tertory1">
                                                                {events.event_type === "webinar" ? (
                                                                    <i className="ri-video-on-fill"></i>
                                                                ) : events.event_type === "seminar" ? (
                                                                    <i className="ri-shake-hands-fill"></i>
                                                                ) : (
                                                                    <i className="ri-briefcase-4-fill"></i>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* detail */}
                                                        <div className="d-flex flex-column">
                                                            <h4 className="pb-0 mb-2">{events.project_title}</h4>
                                                            <span className="pb-0 mb-1"><strong className="text-capitalize">{events.event_type}</strong> by <strong>{events.name}</strong></span>
                                                            <span><i className="ri-calendar-line"></i> {new Date(events.date).toLocaleDateString("en-GB").replaceAll("/", "-")} | {new Date(`1970-01-01T${events.time}`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true, })}</span>
                                                        </div>
                                                    </div>

                                                    {/* btn */}
                                                    <div className="col-4 col-cm-12">
                                                        <div className="d-flex justify-content-end">
                                                            <button className="view-btn border-1 rounded-3 py-1 px-3 bg-cs-tertory1" data-bs-toggle="modal" data-bs-target="#viewEvents" onClick={() => setSelectedEvent(events)}>View <br />Details</button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    ))}
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

            {/* view event Modal */}
            <div className="modal fade my-0 event-modal" id="viewEvents" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-cs-primary1">

                        {/* modal header */}
                        <div className="modal-header d-flex justify-content-between py-2">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Event Details</h1>
                            <button type="button" className="btn fs-5" data-bs-dismiss="modal" aria-label="Close"><i className="ri-close-large-line"></i></button>
                        </div>

                        {/* modal body */}
                        <div className="modal-body text-brown">

                            {/* project title */}
                            <div className="mb-2">
                                <h4>{selectedEvent?.project_title}</h4>
                            </div>

                            {/* event-type / host */}
                            <div className="mb-2">
                                <p className="mb-0"><strong className="text-capitalize">{selectedEvent?.event_type}</strong> by <strong>{selectedEvent?.name}</strong></p>
                            </div>

                            {/* description */}
                            <div>
                                <span><strong>Description :</strong></span>
                                <p>{selectedEvent?.description}</p>
                            </div>

                            {/* date - time */}
                            <div className="d-flex flex-column">
                                <span><strong>Date : </strong>{new Date(selectedEvent?.date).toLocaleDateString("en-GB").replaceAll("/", "-")}</span>
                                <span><strong>Time : </strong>{new Date(`1970-01-01T${selectedEvent?.time}`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true, })}</span>
                            </div>

                            {/* location / link */}
                            <div className="mt-2">

                                {selectedEvent?.event_type === "webinar" ? (
                                    <div className="d-flex flex-column justify-content-between  mb-0 pb-0">
                                        <span className="text-capitalize"><strong>Platform :</strong> Google Meet</span>
                                        {webinarLink}
                                    </div>
                                ) : (
                                    <span className="text-capitalize"><strong>Location :</strong> {selectedEvent?.loc_link}</span>
                                )}

                            </div>

                        </div>

                        {/* modal footer */}
                        <div className="modal-footer">
                            {footerContent}
                        </div>
                    </div>
                </div>
            </div >

        </>
    );
}

export default Dashboard; 