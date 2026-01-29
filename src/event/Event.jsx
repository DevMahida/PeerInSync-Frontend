import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import Header from '../header_footer/header.jsx';
import axios from 'axios';


import './Event.css';

const Event = () => {

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

    // formData
    const initialFormData = {
        name: '',
        project_title: '',
        description: '',
        date: '',
        time: '',
        event_type: '',
        loc_link: ''
    };

    // used for viewEvent modal
    const [selectedEvent, setSelectedEvent] = useState(null);

    const [events, setEvents] = useState([]);

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

                // close bootstrap modal
                const modalEl = document.getElementById("createEvents");
                const modalInstance = window.bootstrap.Modal.getInstance(modalEl);

                fetchEvents();

                modalInstance.hide();

            })
            .catch((err) => {
                console.log(err);
                window.alert("Error submiting data." + err.message);
            });
    };

    const fetchEvents = async () => {

        axios.get('https://peerinsync-backend-server.onrender.com/events/getEvents', { withCredentials: true })
            .then(response => {
                setEvents(response.data);
                console.log(response.data);
            })
            .catch(err => console.log(err));
    }

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

    const [myEvents, setMyEvents] = useState([]);

    const getMyEvents = async () => {

        axios.get('https://peerinsync-backend-server.onrender.com/events/myEvents', { withCredentials: true })
            .then(response => {
                setMyEvents(response.data);
                console.log(response.data);
            })
            .catch(err => console.log(err));
    }

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

        getMyEvents();
        fetchInfo();
        fetchEvents();

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
                                <div className="myEvents border-brown hight-275px overflow-auto bg-cs-secondary1 p-3 rounded-4 text-brown">
                                    <span className="h4 ">Participated Events</span>

                                    <div className="row mt-3">
                                        <div className="col-12">
                                            <div>
                                                {myEvents.length === 0 ? (
                                                    <p className="text-muted">No participated events yet</p>
                                                ) : (
                                                    myEvents.map(myEvents => (
                                                        <div key={myEvents._id} className="bg-cs-primary1 p-2 rounded-3 mb-3">
                                                            <p className="h5 mb-0">{myEvents.project_title}</p>

                                                            <button className="border-1 rounded-3 p-2 bg-cs-tertory1 mt-2" data-bs-toggle="modal" data-bs-target="#viewEvents" onClick={() => setSelectedEvent(myEvents)}>View Details</button>
                                                        </div>
                                                    ))
                                                )}
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

                            {/* title */}
                            {userData.role === "alumni" ? (
                                <div className="d-flex justify-content-between align-items-center mb-0 pb-0">
                                    <span className="h4 text-brown mb-0">Event List</span>
                                    <button className="border-1 rounded-3 p-2 bg-cs-tertory1 transition-02 bx-shadow" data-bs-toggle="modal" data-bs-target="#createEvents"><i className="ri-add-large-line"></i> Create Event</button>
                                </div>
                            ) : (
                                <span className="h4 text-brown">Event List</span>
                            )}

                            {/* events cards */}
                            <div className="row mt-2 g-3">

                                {events
                                    .filter(events => events.date >= yesterday) //if date is today - 3 or so then disappear
                                    .map(events => (
                                        <div className="col-lg-6 d-lg-flex" key={events._id}>

                                            <div className="event-card d-flex bg-cs-primary1 p-3 flex-column flex-grow-1 rounded-3 transition-02">

                                                <div className="d-flex flex-grow-1 justify-content-between">

                                                    {/* detail */}
                                                    <div className="d-flex flex-column justify-content-between w-75">
                                                        <h4 className="pb-0 mb-1">{events.project_title}</h4>

                                                        <p className="mb-0"><strong className="text-capitalize">{events.event_type}</strong> by <strong>{events.name}</strong></p>

                                                        {events.event_type === "webinar" ? (
                                                            <div className="d-flex justify-content-between align-items-center mb-0 pb-0">
                                                                <span className="text-capitalize"><strong>Platform :</strong> Google Meet</span>
                                                            </div>
                                                        ) : (
                                                            <span className="text-capitalize"><strong>Location :</strong> {events.loc_link}</span>
                                                        )}

                                                        <span><strong>Date : </strong>{new Date(events.date).toLocaleDateString("en-GB").replaceAll("/", "-")}</span>
                                                        <span><strong>Time : </strong>{new Date(`1970-01-01T${events.time}`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true, })}</span>
                                                    </div>

                                                    {/* btn */}
                                                    <div className="d-flex align-items-center gap-3">
                                                        {events.date === today ? (
                                                            <span class="badge text-bg-warning">On Going</span>
                                                        ) : events.date >= tomorrow ?
                                                            (
                                                                <button className="border-1 rounded-3 mx-1 p-2 bg-cs-tertory1" data-bs-toggle="modal" data-bs-target="#viewEvents" onClick={() => setSelectedEvent(events)}
                                                                >View Details</button>
                                                            ) : (
                                                                <span class="badge text-bg-success">Completed</span>
                                                            )}

                                                    </div>

                                                </div>

                                            </div>

                                        </div>
                                    ))}
                            </div>

                        </div>

                    </div>
                </section>
                {/* event list ends */}

            </main >
            {/* main ends */}

            {/* footer starts */}
            <footer className="bg-cs-footer01 p-4">
                <div className="container">
                    <p className='text-white text-center m-0'><i className="ri-copyright-line"></i>2025 PeerInSync. Built by Student for Students</p>
                </div>
            </footer>
            {/* footer ends */}

            {/* create event Modal */}
            <div className="modal fade my-0 event-modal" id="createEvents" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-cs-primary1">

                        {/* modal header */}
                        <div className="modal-header d-flex justify-content-between py-2">
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
                                    <label className="mb-1" htmlFor="host">Conducted By :</label>
                                    <input className="mb-2 form-control" type="text" name="host" id="host" value={userData.fName + " " + userData.lName} disabled />
                                </div>

                                {/* description */}
                                <div>
                                    <label className="mb-1" htmlFor="description">Description :</label>
                                    <textarea className="mb-2 form-control" name="description" id="description" rows={3} value={formData.description} onChange={handleChange} required></textarea>
                                </div>

                                {/* date */}
                                <div>
                                    <label className="mb-1" htmlFor="date">Date :</label>
                                    <input className="mb-3 form-control" type="date" name="date" id="date" min={tomorrow} value={formData.date} onChange={handleChange} required />
                                </div>

                                {/* time */}
                                <div>
                                    <label className="mb-1" htmlFor="time">Time :</label>
                                    <input className="mb-3 form-control" type="time" name="time" id="time" value={formData.time} onChange={handleChange} required />
                                </div>

                                {/* event type */}
                                <div className="">
                                    <label className="mb-1" htmlFor="event_type">Event Type :</label>
                                    <select className="form-select" name="event_type" id="event_type" value={formData.event_type} onChange={handleChange} required>
                                        <option>Please Select The Event Type</option>
                                        <option value="seminar">Seminar</option>
                                        <option value="webinar">Webinar</option>
                                        <option value="workshop">Workshop</option>
                                    </select>
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
                                    <div className="d-flex justify-content-between align-items-center mb-0 pb-0">
                                        <span className="text-capitalize"><strong>Platform :</strong> Google Meet</span>
                                    </div>
                                ) : (
                                    <span className="text-capitalize"><strong>Location :</strong> {selectedEvent?.loc_link}</span>
                                )}

                            </div>


                        </div>

                        {/* modal footer */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-dark" data-id={selectedEvent?._id} onClick={registerEvent}>Register</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Event;