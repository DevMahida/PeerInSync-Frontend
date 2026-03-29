import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios from 'axios';

import * as React from 'react';
import Courses from '../javaScript/courses.js';
import BranchesByCourse from '../javaScript/BranchByCourse.js';
import ExpertiseDomains from '../javaScript/ExpertiseDomains.js';
import './update.css';

import { FormControl, Select, MenuItem, Autocomplete, TextField } from "@mui/material";

const Update = () => {

    const navigate = useNavigate();

    // read userInfo
    const [userData, setUserData] = useState(null);

    const [formData, setFormData] = useState({
        fName: '',
        lName: '',
        email: '',
        password: '',
        mobile_no: '',
        college_name: '',
        course_name: '',
        branch: '',
        current_year_of_study: '',
        gender: '',
        role: '',
        areas_of_expertise: [],
        company_organization: '',
        designation: '',
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

    // link data from backend to form
    useEffect(() => {
        if (userData) {
            setFormData({
                fName: userData.fName || "",
                lName: userData.lName || "",
                email: userData.email || "",
                mobile_no: userData.mobile_no || "",
                college_name: userData.college_name || "",
                course_name: userData.course_name || "",
                branch: userData.branch || "",
                current_year_of_study: userData.current_year_of_study || "",
                gender: userData.gender || "",
                role: userData.role || ""
            });
        }
    }, [userData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCourseChange = (event, newValue) => {
        setFormData(prev => ({
            ...prev,
            course_name: newValue ? newValue.value : "",
            branch: ""
        }));
    };

    const handleBranchChange = (event, newValue) => {
        setFormData(prev => ({
            ...prev,
            branch: newValue || ""
        }));
    };

    const handleExpertiseChange = (event, value) => {
        setFormData({
            ...formData,
            areas_of_expertise: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put('https://peerinsync-backend-server.onrender.com/me/update', JSON.stringify(formData), {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
            .then(() => {
                toast.success("Your data have been updated Successfully.");
                setTimeout(() => {
                    navigate('/Dashboard');
                }/*, 1200*/);
                console.log("Form submitted:", JSON.stringify(formData));
            })

            .catch((err) => {
                console.log(err);
                toast.error("Error submiting data. " + err.message);
            });
    };

    // for select year
    const yearOptions = {
        "1": "1st Year",
        "2": "2nd Year",
        "3": "3rd Year",
        "4": "4th Year",
        "grad": "Graduated"
    };

    return (
        <>

            <main>
                <div className="update-wrapper bg-cs-tertory1 p-4 p-sm-5 my-5 mx-2 mt-sm-5 m-sm-auto rounded-4">

                    {/* back-arrow & title */}
                    <div>

                        {/* back arrow */}
                        <div>
                            <Link className="text-decoration-none d-inline-block text-dark fs-2 transition-02" to="/Dashboard"><i className="ri-arrow-left-line"></i></Link>
                        </div>

                        {/* title */}
                        <div>
                            <h1 className="fw-medium text-dark text-center">Update Profile</h1>
                        </div>

                    </div>

                    <form action="">

                        {/* input fields */}
                        <div className="row mt-5">

                            {/* First Name */}
                            <div className="col-xl-6">
                                <div className="update-card mb-3">
                                    <label className='fs-5 mb-1' htmlFor="fName">First Name:</label>
                                    <input className='form-control mx-1' type="text" name='fName' id='fName' autoComplete='given-name' value={formData.fName} onChange={handleChange} required />
                                </div>
                            </div>

                            {/* Last Name */}
                            <div className="col-xl-6">
                                <div className="update-card mb-3">
                                    <label className='fs-5 mb-1' htmlFor="lName">Last Name:</label>
                                    <input className='form-control mx-1' type="text" name='lName' id='lName' autoComplete='given-name' value={formData.lName} onChange={handleChange} required />
                                </div>
                            </div>

                            {/* email */}
                            <div className='col-xl-6'>
                                <div className="update-card mb-3">
                                    <label className='fs-5 mb-1' htmlFor="email">Email:</label>
                                    <input className='form-control mx-1' type="email" name='email' id='email' autoComplete="email" value={formData.email} onChange={handleChange} required />
                                </div>
                            </div>

                            {/* mobile_no */}
                            <div className='col-xl-6'>
                                <div className="update-card mb-3">
                                    <label className='fs-5 mb-1' htmlFor="mobile_no">Mobile No.:</label><br />
                                    <input className='form-control mx-1' type="tel" name='mobile_no' id='mobile_no' maxLength={10} pattern="[0-9]{10}" inputMode='numeric' autoComplete='tel-national' value={formData.mobile_no} onChange={handleChange} required />
                                </div>
                            </div>

                            {/* college name */}
                            <div className='col-xl-6'>
                                <div className="update-card mb-3">
                                    <label className='fs-5 mb-1' htmlFor="college_name">College Name:</label>
                                    <input className='form-control mx-1' type="text" name='college_name' id='college_name' value={formData.college_name} onChange={handleChange} required disabled />
                                    <input className='form-control' type="text" name='college_name' id='college_name' value={formData.college_name} onChange={handleChange} required hidden />
                                </div>
                            </div>

                            {/* Course */}
                            <div className='col-xl-6'>
                                <div className="register-card mb-3">
                                    <label className='fs-5 mb-1' htmlFor="course_name">Course :</label>
                                    <Autocomplete
                                        className='form-control p-0 rounded-1 mx-1'
                                        disablePortal
                                        id="course_name"
                                        options={Courses}
                                        getOptionLabel={(option) => option.label}
                                        sx={{ width: '100%' }}
                                        value={Courses.find(option => option.value === formData.course_name) || null}
                                        onChange={handleCourseChange}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder="Select Course"
                                                required
                                                autoComplete="off"
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            {/* branch */}
                            <div className='col-xl-6'>
                                <div className="register-card mb-3">
                                    <label className='fs-5 mb-1' htmlFor="branch">Branch:</label><br />
                                    <Autocomplete
                                        className='form-control p-0 rounded-1 mx-1'
                                        disablePortal
                                        id="branch"
                                        options={BranchesByCourse[formData.course_name] || []}
                                        getOptionLabel={(option) => option}
                                        isOptionEqualToValue={(option, value) => option === value}
                                        value={formData.branch || null}
                                        onChange={handleBranchChange}
                                        disabled={!formData.course_name}
                                        renderInput={(params) => (
                                            <TextField {...params} placeholder="Select Branch" required autoComplete="off" />
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Year of studying */}
                            <div className='col-xl-6'>
                                <div className="register-card mb-3">
                                    <FormControl fullWidth className="mx-1">
                                        <label className='fs-5 mb-1' htmlFor="current_year_of_study">Current Year of Studying:</label>

                                        <Select className='p-0 bg-white'
                                            size='small'
                                            id="current_year_of_study" name="current_year_of_study"
                                            value={formData.current_year_of_study || ""}
                                            onChange={handleChange}
                                            displayEmpty
                                            required
                                            renderValue={(selected) => {
                                                if (!selected) {
                                                    return <span style={{ color: "#9e9e9e" }}>Select Year</span>;
                                                }
                                                return yearOptions[selected] || selected;
                                            }}
                                        >
                                            {/* <MenuItem disabled value="">Select Year</MenuItem> */}
                                            <MenuItem value="1">1st Year</MenuItem>
                                            <MenuItem value="2">2nd Year</MenuItem>
                                            <MenuItem value="3">3rd Year</MenuItem>
                                            <MenuItem value="4">4th Year</MenuItem>
                                            <MenuItem value="grad">Graduated</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>

                            {/* gender */}
                            <div className='col-xl-6'>
                                <div className="update-card mb-3">
                                    <FormControl fullWidth className="mx-1">
                                        <label className="fs-5 mb-1" htmlFor="gender">Gender:</label>

                                        <Select className='p-0 bg-white rounded-2' size='small' name="gender" id="gender" value={formData.gender || ""} onChange={handleChange} required>
                                            <MenuItem value="male">Male</MenuItem>
                                            <MenuItem value="female">Female</MenuItem>
                                            <MenuItem value="other">Others</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>

                            {/* role */}
                            <div className='col-xl-6'>
                                <div className="update-card mb-3">
                                    <FormControl fullWidth className="mx-1">
                                        <label className='fs-5 mb-1' htmlFor="role">Role:</label>

                                        <Select className='p-0 bg-white rounded-2' size='small' name="role" id="role" value={formData.role || ""} onChange={handleChange} required>
                                            <MenuItem value="alumni">Alumni</MenuItem>
                                            <MenuItem value="student">Student</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>

                        </div>

                        <div className="mt-2">
                            <button type="submit" className="btn btn-success" onClick={handleSubmit}>Update</button>
                        </div>

                    </form>

                </div>
            </main>

        </>
    );
}

export default Update;