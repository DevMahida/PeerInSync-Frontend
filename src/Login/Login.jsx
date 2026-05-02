// import react from "react";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import '../Login/Login.css';

import axios from 'axios';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const initialFormData = {
        email: '',
        password: ''
    };

    // disable , enable submit button
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState(initialFormData);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsSubmitting(true);

            await axios.post(
                'https://peerinsync-backend-server.onrender.com/loginRegisterRoutes/login', JSON.stringify(formData),
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );

            toast.success("Logged in successfully");
            navigate('/Dashboard');

            setFormData(initialFormData);

        } catch (err) {
            console.log(err);
            toast.error("Error submitting data. " + err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (


        <>
            <main>

                <section className='login-form-wrapper bg-cs-secondary rounded-3 px-1 py-3 px-sm-4'>
                    <form onSubmit={handleSubmit}>

                        {/* back button & title  */}
                        <div className='mb-5'>
                            <Link className='text-cs-heading text-decoration-none fs-3' to="/"><i className="ri-arrow-left-line"></i></Link>

                            <div className='text-cs-heading text-center'>
                                <h2 className='display-6 fw-medium'>Login</h2>
                                <p className='lh-sm fw-medium'>Login to connet with <br /> our website</p>
                            </div>

                        </div>

                        {/* form part  */}
                        <div className='row g-4'>

                            {/* email */}
                            <div className='col-12'>
                                <div className="login-card d-flex gap-3 bg-white rounded-3 p-4 align-items-center">
                                    <span className='fs-4'><i className="ri-mail-line"></i></span>
                                    <input className='border-0' type="email" name="email" autoComplete="email" placeholder="Email Id" value={formData.email} onChange={handleChange} required />
                                </div>
                            </div>

                            {/* password */}
                            <div className="col-12">
                                <div className="login-card d-flex gap-3 bg-white rounded-3 p-4 align-items-center">
                                    <i className="ri-lock-password-line"></i>

                                    <input className='border-0' name="password" value={formData.password} autoComplete="current-password" onChange={handleChange} placeholder="Password" type={showPassword ? "text" : "password"} required />

                                    <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"} onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}></i>
                                </div>
                            </div>

                        </div>

                        {/* login button */}

                        <div className='text-center mt-3'>
                            <button className='btn btn-dark px-3' type='submit' disabled={isSubmitting}>Login</button>
                        </div>

                    </form>
                </section>

            </main>
        </>
    );
}

export default Login;