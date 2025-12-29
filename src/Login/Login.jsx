// import react from "react";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Login/Login.css';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);


    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('https://peerinsync-backend-server.onrender.com/loginRegister/login', JSON.stringify(formData), {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            window.alert("Logged in Successfully");
            console.log("Form submitted:", JSON.stringify(formData));

            localStorage.setItem('userinfo', JSON.stringify(response.data));
            
            navigate('/Dashboard');
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

                        {/* forgot password and login button */}
                        <div>
                            <p className='forgot-link mt-4 text-primary link-primary'>Forgot Password</p>

                            <div className='text-center'>
                                <Link to="/Dashboard"><button className='btn btn-dark px-3'  type='submit'>Login</button></Link>
                            </div>
                        </div>

                    </form>
                </section>

            </main>
        </>
    );
}

export default Login;