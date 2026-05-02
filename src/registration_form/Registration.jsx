import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FormControl, Select, MenuItem, Autocomplete, TextField, createFilterOptions } from "@mui/material";

// CODE BY DARSH
import axios from 'axios';

import '../registration_form/Registration.css';
import * as React from 'react';
import colleges from '../javaScript/Colleges.js';
import Courses from '../javaScript/courses.js';
import BranchesByCourse from '../javaScript/BranchByCourse.js';
import ExpertiseDomains from '../javaScript/ExpertiseDomains.js';



const Registration = () => {
    const navigate = useNavigate();

    const initialFormData = {
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
        areas_of_expertise_interest: [],
        company_organization: '',
        designation: '',
    };

    const filterOptions = createFilterOptions({ limit: 50 });

    const [showPassword, setShowPassword] = useState(false);

    const [passwordErrors, setPasswordErrors] = useState([]);

    const handleCollegeChange = (event, newValue) => {
        setFormData(prev => ({
            ...prev,
            college_name: newValue ? newValue.label : '',
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
            areas_of_expertise_interest: value
        });
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            password: value
        });

        const condition = {
            length: value.length >= 8 && value.length <= 16,
            upper: /[A-Z]/.test(value),
            lower: /[a-z]/.test(value),
            number: /\d/.test(value),
            special: /[!@#$%^&*]/.test(value),
        };

        const unmetRules = [];
        if (!condition.length) unmetRules.push("Minimun 8 and Maximum 16 characters");
        if (!condition.upper) unmetRules.push("At least 1 uppercase latter");
        if (!condition.lower) unmetRules.push("At least 1 lowercase latter");
        if (!condition.number) unmetRules.push("At least 1 number");
        if (!condition.special) unmetRules.push("At least 1 special character");

        setPasswordErrors(unmetRules);
    };

    const [formData, setFormData] = useState(initialFormData);

    // disable , enable submit button
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            formData.role === "alumni" &&
            (!formData.areas_of_expertise_interest || formData.areas_of_expertise_interest.length === 0)
        ) {
            toast.error("Please select at least one expertise");
            return;
        }

        try {
            setIsSubmitting(true);

            await axios.post(
                'https://peerinsync-backend-server.onrender.com/loginRegisterRoutes/signup',
                JSON.stringify(formData),
                {
                    headers: { "Content-Type": "application/json" }
                }
            );

            toast.success("Registered successfully");
            navigate('/Login');

            setFormData(initialFormData);

        } catch (err) {
            if (err.status == 400) {
                toast.error("Account with this email already exists. ");
                return;
            }

            toast.error("Error submitting data. " + err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
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

            <main className='p-2 p-sm-4'>
                <section className='register-wrapper bg-cs-secondary rounded-3 p-3 p-md-5 mx-auto'>
                    <form onSubmit={handleSubmit}>

                        {/* back button & title  */}
                        <div className='mb-5'>
                            <Link className='text-cs-heading text-decoration-none fs-3' to="/"><i className="ri-arrow-left-line"></i></Link>

                            <div className='text-cs-heading text-center'>
                                <h2 className='display-6 fw-medium '>Registration Form</h2>
                                <p className='lh-sm fw-medium'>Register To Level Up</p>
                            </div>

                        </div>

                        {/* form part  */}
                        <div className='row'>

                            {/* fname */}
                            <div className='col-12'>
                                <div className="register-card mb-3">
                                    <label className='fs-5 mb-1' htmlFor="fName">First Name:</label><br />
                                    <input className='form-control bg-white mx-1' type="text" name='fName' id='fName' autoComplete='given-name' value={formData.fName} onChange={handleChange} required />
                                </div>
                            </div>

                            {/* Lname */}
                            <div className='col-12'>
                                <div className="register-card mb-3">
                                    <label className='fs-5 mb-1' htmlFor="lName">Last Name:</label><br />
                                    <input className='form-control mx-1' type="text" name='lName' id='lName' autoComplete='given-name' value={formData.lName} onChange={handleChange} required />
                                </div>
                            </div>

                            {/* email */}
                            <div className='col-12'>
                                <div className="register-card mb-3">
                                    <label className='fs-5 mb-1' htmlFor="email">Email:</label><br />
                                    <input className='form-control mx-1' type="email" name='email' id='email' autoComplete="email" value={formData.email} onChange={handleChange} required />
                                </div>
                            </div>

                            {/* password */}
                            <div className='col-12'>
                                <div className="register-card mb-3">

                                    <label className='mb-1 fs-5' htmlFor="password">Password:</label><br />
                                    <div className="register-password mx-1 form-control d-flex justify-content-between align-items-center">
                                        <input className='border-0 m-0' type={showPassword ? "text" : "password"} name="password" id='password' autoComplete="new-password" value={formData.password} onChange={handlePasswordChange} required />
                                        <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"} onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}></i>
                                    </div>

                                    {
                                        passwordErrors.length > 0 && (
                                            <ul className='instruction'>
                                                {passwordErrors.map((error, index) => (
                                                    <li key={index}>{error}</li>
                                                ))}
                                            </ul>
                                        )
                                    }

                                </div>
                            </div>

                            {/* mobile_no */}
                            <div className='col-12'>
                                <div className="register-card mb-3">
                                    <label className='fs-5 mb-1' htmlFor="mobile_no">Mobile No.:</label><br />
                                    <input className='form-control mx-1' type="tel" name='mobile_no' id='mobile_no' maxLength={10} pattern="[0-9]{10}" inputMode='numeric' autoComplete='tel-national' value={formData.mobile_no} onChange={handleChange} required />
                                </div>
                            </div>

                            {/* college name */}
                            <div className='col-12'>
                                <div className="register-card mb-3 w-100">
                                    <label className='fs-5 mb-1' htmlFor="college_name">College Name</label>
                                    <Autocomplete
                                        className='form-control p-0 rounded-1 mx-1'
                                        disablePortal
                                        id="college_name"
                                        options={colleges}
                                        filterOptions={filterOptions}
                                        sx={{ width: '100%' }}
                                        value={colleges.find(option => option.label === formData.college_name) || null}
                                        onChange={handleCollegeChange}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder="Select College"
                                                required
                                                autoComplete="off"
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Year of studying */}
                            <div className='col-12'>
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

                            {/* Course */}
                            <div className='col-12'>
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
                            <div className='col-12'>
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

                            {/* gender */}
                            <div className='col-12'>
                                <div className="register-card mb-3">
                                    <FormControl fullWidth className="mx-1">
                                        <label className="mb-1" htmlFor="gender">Gender:</label>

                                        <Select
                                            className='p-0 bg-white'
                                            size='small'
                                            name="gender"
                                            id="gender"
                                            value={formData.gender || ""}
                                            onChange={handleChange}
                                            displayEmpty
                                            required
                                            renderValue={(selected) => {
                                                if (!selected) {
                                                    return <span style={{ color: "#9e9e9e" }}>Select Gender</span>; // placeholder color
                                                }
                                                return selected.charAt(0).toUpperCase() + selected.slice(1);
                                            }}>
                                            <MenuItem value="male">Male</MenuItem>
                                            <MenuItem value="female">Female</MenuItem>
                                            <MenuItem value="other">Others</MenuItem>
                                        </Select>
                                    </FormControl>

                                </div>
                            </div>

                            {/* join as */}
                            <div className='col-12'>
                                <div className="register-card mb-3 d-flex align-items-center gap-2">
                                    <span className='mb-1 fs-5 '>Join As : </span>
                                    <div className='d-flex gap-1 align-items-center'>
                                        <input type="radio" name='role' value="alumni" id='Alumni' required checked={formData.role === "alumni"} onChange={handleChange} />
                                        <label htmlFor="Alumni">Alumni</label>
                                    </div>
                                    <div className='d-flex gap-1 align-items-center'>
                                        <input type="radio" name='role' value="student" id='Student' checked={formData.role === "student"} onChange={handleChange} />
                                        <label htmlFor="Student">Student</label>
                                    </div>

                                </div>
                            </div>

                            {/* designation-expertices-work at*/}
                            {formData.role === "alumni" ?
                                (
                                    <div className='row'>

                                        {/* expertise */}
                                        <div className='col-12'>
                                            <div className="register-card mb-3">
                                                <label className='fs-5 mb-1' htmlFor="expertise">Areas of Expertise :</label><br />
                                                <Autocomplete
                                                    className='form-control p-0 rounded-1 mx-1'
                                                    multiple
                                                    options={ExpertiseDomains}
                                                    value={formData.areas_of_expertise_interest}
                                                    onChange={handleExpertiseChange}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            placeholder="Select expertise"
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        {/* Company / Organization */}
                                        <div className='col-12'>
                                            <div className="register-card mb-3">
                                                <label className='fs-5 mb-1' htmlFor="company_organization">Company / Organization :</label><br />
                                                <input className='form-control bg-white mx-1' type="text" name='company_organization' id='company_organization' value={formData.company_organization} onChange={handleChange} required />
                                            </div>
                                        </div>

                                        {/* Designation */}
                                        <div className='col-12'>
                                            <div className="register-card mb-3">
                                                <label className='fs-5 mb-1' htmlFor="designation">Designation :</label><br />
                                                <input className='form-control bg-white mx-1' type="text" name='designation' id='designation' value={formData.designation} onChange={handleChange} required />
                                            </div>
                                        </div>

                                    </div>
                                ) : (
                                    <div className="row">
                                        {/* expertise */}
                                        <div className='col-12'>
                                            <div className="register-card mb-3">
                                                <label className='fs-5 mb-1' htmlFor="expertise">Areas of Interest :</label><br />
                                                <Autocomplete
                                                    className='form-control p-0 rounded-1 mx-1'
                                                    multiple
                                                    options={ExpertiseDomains}
                                                    value={formData.areas_of_expertise_interest}
                                                    onChange={handleExpertiseChange}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            placeholder="Select Interest"
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                        </div>

                        {/* Register botton */}
                        <div>
                            <div className='mt-3 d-flex gap-3'>
                                <button className='btn btn-success px-3' type='submit' disabled={isSubmitting}>Register</button>
                            </div>
                        </div>

                    </form>
                </section>
            </main>

        </>
    );

}
export default Registration;