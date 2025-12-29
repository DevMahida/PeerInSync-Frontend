import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
// CODE BY DARSH
import axios from 'axios';

import '../registration_form/Registration.css';
// import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import colleges from '../javaScript/Colleges.js';
import { createFilterOptions } from '@mui/material/Autocomplete';

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

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('https://peerinsync-backend-server.onrender.com/loginRegisterRoutes/signup', JSON.stringify(formData), {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(() => {
                window.alert("You have registered successfully.");
                navigate('/Login');
                console.log("Form submitted:", JSON.stringify(formData));
                setFormData(initialFormData);
            })

            .catch((err) => {
                console.log(err);
                window.alert("Error submiting data." + err.message);
            });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
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
                                    <input className='form-control bg-white' type="text" name='fName' id='fName' autoComplete='given-name' value={formData.fName} onChange={handleChange} required />
                                </div>
                            </div>

                            {/* Lname */}
                            <div className='col-12'>
                                <div className="register-card mb-3">
                                    <label className='fs-5 mb-1' htmlFor="lName">Last Name:</label><br />
                                    <input className='form-control' type="text" name='lName' id='lName' autoComplete='given-name' value={formData.lName} onChange={handleChange} required />
                                </div>
                            </div>

                            {/* email */}
                            <div className='col-12'>
                                <div className="register-card mb-3">
                                    <label className='fs-5 mb-1' htmlFor="email">Email:</label><br />
                                    <input className='form-control' type="email" name='email' id='email' autoComplete="email" value={formData.email} onChange={handleChange} required />
                                </div>
                            </div>

                            {/* password */}
                            <div className='col-12'>
                                <div className="register-card mb-3">

                                    <label className='mb-1 fs-5' htmlFor="password">Password:</label><br />
                                    <div className="register-password form-control d-flex justify-content-between align-items-center">
                                        <input className='border-0' type={showPassword ? "text" : "password"} name="password" id='password' autoComplete="new-password" value={formData.password} onChange={handlePasswordChange} required />
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
                                    <input className='form-control' type="tel" name='mobile_no' id='mobile_no' maxLength={10} pattern="[0-9]{10}" inputMode='numeric' autoComplete='tel-national' value={formData.mobile_no} onChange={handleChange} required />
                                </div>
                            </div>

                            {/* college name */}
                            <div className='col-12'>
                                <div className="register-card mb-3">
                                    <label className='fs-5 mb-1' htmlFor="college_name">College Name</label>
                                    <Autocomplete className='form-control p-0 rounded-1'
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
                                                required
                                                inputProps={{
                                                    ...params.inputProps,
                                                    autoComplete: 'off',
                                                }}
                                            />
                                        )}
                                    />


                                </div>
                            </div>

                            {/* Year of studying */}
                            <div className='col-12'>
                                <div className="register-card mb-3">
                                    <label className='fs-5 mb-1' htmlFor="current_year_of_study">Current Year of Studying:</label><br />
                                    <select className="form-select" name="current_year_of_study" id="current_year_of_study" value={formData.current_year_of_study} onChange={handleChange} required>
                                        <option >Year of Studying</option>
                                        <option value="1st year">1st Year</option>
                                        <option value="2nd year">2nd Year</option>
                                        <option value="3rd year">3rd Year</option>
                                        <option value="4th year">4th Year</option>
                                        <option value="graduated">Graduated</option>
                                    </select>
                                </div>
                            </div>

                            {/* Course */}
                            <div className='col-12'>
                                <div className="register-card mb-3">
                                    <label className='fs-5 mb-1' htmlFor="course_name">Course:</label><br />
                                    <input className='form-control' type="text" name='course_name' id='course_name' autoComplete='off' value={formData.course_name} onChange={handleChange} required />
                                </div>
                            </div>

                            {/* branch */}
                            <div className='col-12'>
                                <div className="register-card mb-3">
                                    <label className='fs-5 mb-1' htmlFor="branch">Branch:</label><br />
                                    <input className='form-control' type="text" name='branch' id='branch' autoComplete='off' value={formData.branch} onChange={handleChange} required />
                                </div>
                            </div>

                            {/* gender */}
                            <div className='col-12'>
                                <div className="register-card mb-3 d-flex align-items-center gap-3">
                                    <span className='mb-1 fs-5 '>Gender : </span>
                                    <div className='d-flex gap-1 align-items-center'>
                                        <input type="radio" name='gender' value="male" id='male' required checked={formData.gender == "male"} onChange={handleChange} />
                                        <label htmlFor="male">Male</label>
                                    </div>
                                    <div className='d-flex gap-1 align-items-center'>
                                        <input type="radio" name='gender' value="female" id='female' checked={formData.gender == "female"} onChange={handleChange} />
                                        <label htmlFor="female">Female</label>
                                    </div>
                                    <div className='d-flex gap-1 align-items-center'>
                                        <input type="radio" name='gender' value="others" id='others' checked={formData.gender == "others"} onChange={handleChange} />
                                        <label htmlFor="others">Others</label>
                                    </div>

                                </div>
                            </div>

                            {/* join as */}
                            <div className='col-12'>
                                <div className="register-card mb-3 d-flex align-items-center gap-3">
                                    <span className='mb-1 fs-5 '>Join As : </span>
                                    <div className='d-flex gap-1 align-items-center'>
                                        <input type="radio" name='role' value="alumni" id='Alumni' required checked={formData.role == "alumni"} onChange={handleChange} />
                                        <label htmlFor="Alumni">Alumni</label>
                                    </div>
                                    <div className='d-flex gap-1 align-items-center'>
                                        <input type="radio" name='role' value="student" id='Student' checked={formData.role == "student"} onChange={handleChange} />
                                        <label htmlFor="Student">Student</label>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Register botton */}
                        <div>
                            <div className='mt-3 d-flex gap-3'>
                                <button className='btn btn-success px-3' type='submit'>Register</button>

                            </div>
                        </div>

                    </form>
                </section>
            </main>


        </>
    );

}
export default Registration;