import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './update.css';

const Update = () => {

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

    const handleChange = (e) => {
        setFormData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

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



    return (
        <>

            <main>
                <div className="update-wrapper bg-cs-tertory1 p-4 p-sm-5 my-5 mx-2 mt-sm-5 m-sm-auto rounded-4">

                    {/* back-arrow & title */}
                    <div>

                        {/* back arrow */}
                        <div>
                            <Link className="text-decoration-none d-inline-block text-dark fs-2 transition-02" to="/Dashboard"><i class="ri-arrow-left-line"></i></Link>
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
                                    <input className='form-control' type="text" name='fName' id='fName' autoComplete='given-name' value={userData.fName} onChange={handleChange} required disabled/>
                                </div>
                            </div>
                            
                            {/* Last Name */}
                            <div className="col-xl-6">
                                <div className="update-card mb-3">
                                    <label className='fs-5 mb-1' htmlFor="lName">Last Name:</label>
                                    <input className='form-control' type="text" name='lName' id='lName' autoComplete='given-name' value={userData.lName} onChange={handleChange} required disabled />
                                </div>
                            </div>

                            {/* email */}
                            <div className='col-xl-6'>
                                <div className="update-card mb-3">
                                    <label className='fs-5 mb-1' htmlFor="email">Email:</label>
                                    <input className='form-control' type="email" name='email' id='email' autoComplete="email" value={userData.email} onChange={handleChange} required />
                                </div>
                            </div>

                            {/* mobile_no */}
                            <div className='col-xl-6'>
                                <div className="update-card mb-3">
                                    <label className='fs-5 mb-1' htmlFor="mobile_no">Mobile No.:</label><br />
                                    <input className='form-control' type="tel" name='mobile_no' id='mobile_no' maxLength={10} pattern="[0-9]{10}" inputMode='numeric' autoComplete='tel-national' value={userData.mobile_no} onChange={handleChange} required />
                                </div>
                            </div>

                            {/* college name */}
                            <div className='col-xl-6'>
                                <div className="update-card mb-3">
                                    <label className='fs-5 mb-1' htmlFor="college_name">College Name:</label>
                                    <input className='form-control' type="text" name='college_name' id='college_name' value={userData.college_name} onChange={handleChange} required disabled/>
                                </div>
                            </div>

                            {/* Course*/}
                            <div className='col-xl-6'>
                                <div className="update-card mb-3">
                                    <label className='fs-5 mb-1' htmlFor="course">Course:</label>
                                    <input className='form-control' type="text" name='course' id='course' autoComplete='course' value={userData.course_name} onChange={handleChange} required disabled/>
                                </div>
                            </div>

                            {/* branch*/}
                            <div className='col-xl-6'>
                                <div className="update-card mb-3">
                                    <label className='fs-5 mb-1' htmlFor="branch">Branch:</label>
                                    <input className='form-control' type="text" name='branch' id='branch' autoComplete='branch' value={userData.branch} onChange={handleChange} required disabled/>
                                </div>
                            </div>

                            {/* current year studying
                            <div className='col-xl-6'>
                                <div className="update-card mb-3">
                                    <label className='fs-5 mb-1' htmlFor="current_year_of_study">Current Year of Studying:</label>
                                    <input className='form-control' type="text" name='current_year_of_study' id='current_year_of_study' autoComplete='current_year_of_study' value={userData.current_year_of_study} onChange={handleChange} required/>
                                </div>
                            </div> */}

                            {/* Year of studying */}
                            <div className='col-xl-6'>
                                <div className="register-card mb-3">
                                    <label className='fs-5 mb-1' htmlFor="current_year_of_study">Current Year of Studying:</label><br />
                                    <select className="form-select" name="current_year_of_study" id="current_year_of_study" value={userData.current_year_of_study} onChange={handleChange} required>
                                        <option >Year of Studying</option>
                                        <option value="1">1st Year</option>
                                        <option value="2">2nd Year</option>
                                        <option value="3">3rd Year</option>
                                        <option value="4">4th Year</option>
                                        <option value="grad">Graduated</option>
                                    </select>
                                </div>
                            </div>

                            {/* gender */}
                            <div className='col-xl-6'>
                                <div className="update-card mb-3">
                                    <label className='fs-5 mb-1' htmlFor="gender">Gender:</label>
                                    <input className='form-control' type="text" name='gender' id='gender' autoComplete='gender' value={userData.gender} onChange={handleChange} required/>
                                </div>
                            </div>

                            {/* role */}
                            <div className='col-xl-6'>
                                <div className="update-card mb-3">
                                    <label className='fs-5 mb-1' htmlFor="role">Role:</label>
                                    <input className='form-control' type="text" name='role' id='role' autoComplete='role' value={userData.role} onChange={handleChange} required/>
                                </div>
                            </div>

                        </div>

                        <div className="mt-2">
                            <button type="submit" className="btn btn-success">Update</button>
                        </div>

                    </form>

                </div>
            </main>

        </>
    );
}

export default Update;