import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormControl, Select, MenuItem, Autocomplete, TextField, createFilterOptions } from "@mui/material";

import axios from 'axios';

import Header from '../header_footer/header.jsx';
import Footer from '../header_footer/footer.jsx';
import './discussion.css';

const Discussion = () => {

    const initialFormData = {
        postTitle: '',
        postCategory: '',
        postRole: '',
        postBody: ''
    }

    const [formData, setFormData] = useState(initialFormData);
    const [discussionList, setDiscussionList] = useState([]);

    // for select year
    const categoryOptions = {
        "1": "General",
        "2": "Project",
        "3": "Internship",
        "4": "Resume",
        "5": "Career"
    };

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
        role: '',
        areas_of_expertise_interest: [],
        company_organization: '',
        designation: '',
    });


    const makePost = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                'https://peerinsync-backend-server.onrender.com/discussion/create',
                JSON.stringify(formData),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                },
            );

            toast.success("Post Created successfully");

            setFormData(initialFormData);
            fetchPosts();

        } catch (err) {
            console.log(err.message);
            toast.error("Error submitting data. " + err.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // fetch user data and if not available then redirect to login page
    const fetchInfo = async () => {
        try {
            const res = await axios.get('https://peerinsync-backend-server.onrender.com/me/me', { withCredentials: true });
            const data = res.data;
            setUserData(data);
            console.log(res.data);
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


    const fetchPosts = async () => {
        try {
            const res = await axios.get('https://peerinsync-backend-server.onrender.com/discussion/getPosts', { withCredentials: true });
            const data = res.data;
            setDiscussionList(data);
            console.log(res.data);
        }
        catch (err) {
            console.error(err);
        }
    }

    // fetch user data and post data
    useEffect(() => {

        fetchInfo();
        fetchPosts();

    }, []);

    // showing 3 hours ago and etc...
    const getTimeAgo = (dateString) => {
        if (!dateString) return "";

        const postDate = new Date(dateString);
        if (isNaN(postDate.getTime())) return "";

        const now = new Date();
        const diffMs = now - postDate;

        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffSeconds < 60) return "just now";
        if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

        const diffWeeks = Math.floor(diffDays / 7);
        if (diffWeeks < 5) return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;

        const diffMonths = Math.floor(diffDays / 30);
        if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;

        const diffYears = Math.floor(diffDays / 365);
        return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
    };

    // post filter variables
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortType, setSortType] = useState("latest");

    const latestOnClick = () => {
        setSortType("latest");
    };

    const oldestOnClick = () => {
        setSortType("oldest");
    };



    // filter part
    const processedList = discussionList
        .filter(post => {
            if (selectedCategory === "all") return true;
            return post.postCategory === selectedCategory;
        })
        .sort((a, b) => {
            const timeA = new Date(a.time);
            const timeB = new Date(b.time);

            if (sortType === "latest") {
                return timeB - timeA; // newest first
            } else {
                return timeA - timeB; // oldest first
            }
        });

    return (
        <>
            <Header />

            <main>
                <section>
                    <div className="container">
                        <div className="border-3 rounded-3 my-4 py-3 px-3 bg-cs-secondary1 border-brown">


                            <h1 className="h2 m-0 text-brown">Discussion Forum</h1>

                            <div className="row">

                                {/* discussions */}
                                <div className="col-8">
                                    <div className=" bg-cs-primary1 rounded-3 my-3 border-brown border-1">

                                        {/* title filter sorting */}
                                        <div className="d-flex justify-content-between ps-3 pt-3 pe-3">
                                            <h3 className="text-brown">Community Discussions</h3>

                                            {/* filter and sorting */}
                                            <div className="d-flex gap-2">

                                                {/* time based sorting */}
                                                <div className="dropdown">
                                                    <button className="btn dropdown-toggle border-1 filter-option" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i className="ri-filter-2-fill"></i>
                                                    </button>

                                                    <ul className="dropdown-menu mt-1 width-250px">

                                                        <li className="dropdown-item pointer" onClick={latestOnClick}>
                                                            <div className="row">
                                                                <div className="col-2">
                                                                    {sortType === "latest" && <i className="ri-check-line"></i>}
                                                                </div>
                                                                <div className="col-10">
                                                                    Sort By : Latest
                                                                </div>
                                                            </div>
                                                        </li>

                                                        <li className="dropdown-item pointer" onClick={oldestOnClick}>
                                                            <div className="row">
                                                                <div className="col-2">
                                                                    {sortType === "oldest" && <i className="ri-check-line"></i>}
                                                                </div>
                                                                <div className="col-10">
                                                                    Sort By : Oldest
                                                                </div>
                                                            </div>
                                                        </li>

                                                    </ul>
                                                </div>

                                                <div className="dropdown">
                                                    <button className="btn dropdown-toggle filter-option" data-bs-toggle="dropdown">
                                                        Category: {selectedCategory === "all" ? "All" : categoryOptions[selectedCategory]}
                                                    </button>

                                                    <ul className="dropdown-menu">

                                                        <li className="dropdown-item pointer" onClick={() => setSelectedCategory("all")}>
                                                            <div className="row">
                                                                <div className="col-2">
                                                                    <div>
                                                                        {selectedCategory === "all" && <i className="ri-check-line me-2"></i>}
                                                                    </div>
                                                                </div>
                                                                <div className="col-10">
                                                                    All
                                                                </div>
                                                            </div>


                                                        </li>

                                                        {Object.entries(categoryOptions).map(([key, value]) => (
                                                            <li key={key} className="dropdown-item pointer" onClick={() => setSelectedCategory(key)}>
                                                                <div className="row">
                                                                    <div className="col-2">
                                                                        <div>
                                                                        {selectedCategory === key && <i className="ri-check-line me-2"></i>}
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-10">
                                                                        <div>
                                                                            {value}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}

                                                    </ul>
                                                </div>

                                            </div>
                                        </div>

                                        <hr className="mb-2" />

                                        {/* discussions */}
                                        <div className="p-1">{/* wrpper class to split border and scroll bar */}
                                            <div className="discussion-wrapper p-2">
                                                <div className="row">
                                                    <div className="col-12">
                                                        {
                                                            processedList.length === 0 ? (
                                                                <p className="text-center text-muted mt-3">
                                                                    {
                                                                        selectedCategory === "all"
                                                                            ? "No discussions yet"
                                                                            : `No posts available in "${categoryOptions[selectedCategory]}" category`
                                                                    }
                                                                </p>
                                                            ) : (
                                                                processedList
                                                                    .map((post, index) => (
                                                                        <div key={index} className="border rounded p-3 mb-3 bg-cs-secondary1">

                                                                            <div className="d-flex justify-content-between align-items-center">
                                                                                <div className="d-flex align-items-center gap-3">
                                                                                    <h5 className="m-0 text-brown">{post.postTitle}</h5>
                                                                                    <span className="cs-badge-category px-2 rounded-5">{categoryOptions[post.postCategory]}</span>
                                                                                </div>
                                                                                <div>
                                                                                    <span className="cs-badge-role p-2 rounded-5 text-capitalize">{post.postRole}</span>
                                                                                </div>
                                                                            </div>

                                                                            <div>
                                                                                <small className="text-secondary">Posted By: {userData.fName + " " + userData.lName} • {getTimeAgo(post.time)}</small>

                                                                            </div>


                                                                            <p className="my-2 text-dark">{post.postBody}</p>

                                                                        </div>
                                                                    ))
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* start discussion */}
                                <div className="col-4">
                                    <div className="st-dis bg-cs-primary1 p-3 rounded-3 my-3 border-brown border-1">

                                        {/* title */}
                                        <div className="mb-3">
                                            <h5>Start Discussion</h5>
                                        </div>

                                        {/* discuss form */}
                                        <form onSubmit={makePost}>

                                            {/* title */}
                                            <div className="col-12">
                                                <input className="form-control bg-cs-secondary1 m-0 border-brown border-1 mb-2" type="text" name="postTitle" value={formData.postTitle} onChange={handleChange} placeholder="Discussion Title" />
                                            </div>

                                            {/* category */}
                                            <div className="col-12">
                                                <div className="register-card mb-3 ">
                                                    <FormControl fullWidth className="mt-2">

                                                        <Select className='p-0 m-0 bg-cs-secondary1 border-brown border-1'
                                                            size='small'
                                                            name="postCategory"
                                                            value={formData.postCategory || ''}
                                                            onChange={handleChange}
                                                            displayEmpty
                                                            required
                                                            renderValue={(selected) => {
                                                                if (!selected) {
                                                                    return <span style={{ color: "#9e9e9e" }}>Categories</span>;
                                                                }
                                                                return categoryOptions[selected] || selected;
                                                            }}
                                                        >
                                                            <MenuItem value="1">General</MenuItem>
                                                            <MenuItem value="2">Project</MenuItem>
                                                            <MenuItem value="3">Internship</MenuItem>
                                                            <MenuItem value="4">Resume</MenuItem>
                                                            <MenuItem value="5">Career</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            </div>

                                            {/* role */}
                                            <div className="col-12">
                                                <input className="form-control bg-cs-secondary1 text-capitalize m-0 mt-2" type="text" name="postRole" value={userData.role} onChange={handleChange} disabled />
                                                <input className="form-control m-0 mt-2" type="text" name="postRole" value={userData.role} hidden />
                                            </div>

                                            {/* Message */}
                                            <div className="col-12">
                                                <textarea className="form-control bg-cs-secondary1 border-brown border-1 mt-3" name="postBody" value={formData.postBody} onChange={handleChange} cols="30" rows="5" placeholder="Write Your Discussion...."></textarea>
                                            </div>

                                            {/* button */}
                                            <div className="text-center">
                                                <button type="submit" className="btn btn-success mt-3 mb-3">Post Discussion</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Discussion;