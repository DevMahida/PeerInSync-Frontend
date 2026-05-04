import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useRouteLoaderData } from 'react-router-dom';
import { Autocomplete, TextField, Chip } from "@mui/material";
import { toast } from 'react-toastify';


import Header from "../header_footer/header";
import Footer from '../header_footer/footer';
import './Collaborate.css'

import axios from "axios";

const Collaborate = () => {

    const navigate = useNavigate();

    const initialFormData = {
        project_title: '',
        collaborators: ''
    };

    const [alumniList, setAlumniList] = useState([]);
    const [projectsList, setProjectsList] = useState([]);

    const [initialCollaborator, setInitialCollaborator] = useState(null);

    const fetchAlumniList = () => {

        axios.get('https://peerinsync-backend-server.onrender.com/alumni/getalumni', { withCredentials: true })
            .then(response => {
                setAlumniList(response.data);
                console.log(response.data);
            })
            .catch(err => console.log(err));
    };

    const fetchProjects = () => {

        axios.get('https://peerinsync-backend-server.onrender.com/projects/myProjects', { withCredentials: true })
            .then(response => {
                setProjectsList(response.data);
                console.log(response.data);
            })
            .catch(err => console.log(err));
    }

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            project_title: formData.project_title,
            collaborators: selectedAlumni
                ? [{
                    id: selectedAlumni.id,
                    name: selectedAlumni.label
                }]
                : []
        };

        console.log(payload);

        axios.post(
            "https://peerinsync-backend-server.onrender.com/projects/create",
            payload,
            { withCredentials: true }
        )
            .then(res => {
                const project = res.data;
                navigate(`/project/${project._id}`);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchAlumniList();
        fetchProjects();
    }, []);

    const alumniOptions = alumniList.map(alumni => ({
        label: `${alumni.fName + " " + alumni.lName}`,
        id: alumni._id
    }));

    const [editProject, setEditProject] = useState(null);

    const handleEditModal = (project) => {
        setEditProject(project);

        setFormData({
            project_title: project.project_title
        });

        const first = project.collaborators?.[0] || null;

        setSelectedAlumni(first);
        setInitialCollaborator(first);
    };

    const handleEditProject = (e) => {
        e.preventDefault();

        const payload = {
            project_title: formData.project_title
        };

        const changed =
            JSON.stringify(selectedAlumni) !== JSON.stringify(initialCollaborator);

        if (changed) {
            payload.collaborators = selectedAlumni
                ? [{
                    id: selectedAlumni.id,
                    name: selectedAlumni.label
                }]
                : [];
        }

        axios.put(
            `https://peerinsync-backend-server.onrender.com/projects/update/${editProject._id}`,
            payload,
            { withCredentials: true }
        )
            .then(() => {
                fetchProjects();
                document.querySelector('#staticBackdrop .btn-close').click();
            })
            .catch(console.log);
    };

    const [selectedAlumni, setSelectedAlumni] = useState(null);

    const deleteProject = (projID) => {

        axios.delete(`https://peerinsync-backend-server.onrender.com/projects/delete/${projID}`, { withCredentials: true })
            .then(() => {

                // toast added
                toast.success("Project deleted successfully");
                fetchProjects();
            })

            .catch((err) => {

                console.log(err);

                toast.error("Failed to delete project" + err.message);
            });

    }

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

    // for fetching user details
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

            <main>

                {
                    userData.role === "student" ? (
                        <section className="mt-4">
                            <div className="container">
                                {/* banner - create projects */}
                                <div className="row mt-4 g-3">

                                    {/* banner */}
                                    <div className="col-lg-8">
                                        <div className="event-banner rounded-3 transition-02 d-flex align-items-center">
                                            <div className='text-brown px-5'>

                                                <h1>Collaborate & Create</h1>
                                                <p className="fw-medium">Work together with alumni on real-world projects and ideas</p>
                                                <p className="fw-medium">Build • Innovate • Grow</p>

                                            </div>
                                        </div>
                                    </div>

                                    {/* create project */}
                                    <div className="col-lg-4 ">
                                        <div className=" border-brown hight-275px bg-cs-secondary1 p-3 rounded-4 text-brown">
                                            <span className="h4 ">Start a New Project</span>

                                            <div className="mt-3">
                                                <form className="" onSubmit={handleSubmit}>
                                                    <div className="">
                                                        <label htmlFor="project_title">Project Title</label>
                                                        <input className="form-control mt-1" type="text" name="project_title" id="project_title" placeholder="eg. Basic of Frontend Development" onChange={handleChange} required />
                                                    </div>

                                                    <div className=" register-card mt-2">
                                                        <label className="fs-6 mb-1">Select Collaborators</label>

                                                        <Autocomplete
                                                            className="form-control p-0 rounded-1"
                                                            options={alumniOptions || []}
                                                            getOptionLabel={(option) => option?.label || ""}
                                                            isOptionEqualToValue={(option, value) => option.id === value.id}
                                                            value={selectedAlumni}
                                                            onChange={(event, newValue) => setSelectedAlumni(newValue)}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    placeholder="Search alumni..."
                                                                    name="collaborators"
                                                                />
                                                            )}
                                                        />
                                                    </div>

                                                    <div className="mt-2">
                                                        <button className="btn btn-success" type="submit" >Create</button>
                                                    </div>
                                                </form>

                                            </div>



                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ) : (
                        <section className="mt-4">
                            <div className="container">
                                {/* banner - create projects */}
                                <div className="row mt-4 g-3">

                                    {/* banner */}
                                    <div className="col-12">
                                        <div className="collabrate-banner rounded-3 transition-02 d-flex align-items-center">
                                            <div className='text-brown px-5'>

                                                <h1>Collaborate & Create</h1>
                                                <p className="fw-medium">Work together with alumni on real-world projects and ideas</p>
                                                <p className="fw-medium">Build • Innovate • Grow</p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )
                }

                {/* banner - create project */}


                {/* Event list starts */}
                <section className="my-3">
                    <div className="container">
                        <div className="border-brown bg-cs-secondary1 p-3 rounded-4 text-brown">

                            {/* title */}
                            <div>
                                <h4>Projects</h4>
                            </div>

                            {/* projets */}
                            <div className="mt-3">
                                <table className="table table-light table-hover">
                                    <thead>
                                        <tr className="">
                                            <th className="text-brown" scope="col">Project Title</th>
                                            {
                                                userData.role === "alumni" ? (
                                                    <th className="text-brown" scope="col">Student</th>
                                                ) : (
                                                    <th className="text-brown" scope="col">Collabrator</th>
                                                )
                                            }
                                            <th className="text-brown" scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody >

                                        {projectsList.length > 0 ? (
                                            projectsList.map((project) => (
                                                <tr key={project._id}>

                                                    {/* Project Title */}
                                                    <td>
                                                        <div className="mt-2 fw-bold text-brown text-capitalize">
                                                            {project.project_title}
                                                        </div>
                                                    </td>

                                                    {/* Collaborators */}
                                                    <td>
                                                        <div className="mt-2 fw-bold text-brown text-capitalize">
                                                            {Array.isArray(project.collaborators) &&
                                                                project.collaborators.filter(c => c && c.id).length > 0
                                                                ? project.collaborators
                                                                    .filter(c => c && c.id)
                                                                    .map((c, index, arr) => (
                                                                        <span key={c.id || index}>
                                                                            {c.name || "No Collaborators"}
                                                                            {index !== arr.length - 1 && ", "}
                                                                        </span>
                                                                    ))
                                                                : "No collaborators"}
                                                        </div>
                                                    </td>

                                                    {/* Actions */}
                                                    <td>
                                                        <div className="d-flex align-items-center gap-2">
                                                            <span
                                                                className="btn btn-outline-success"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#staticBackdrop"
                                                                onClick={() => handleEditModal(project)}
                                                            >
                                                                <i className="ri-pencil-fill"></i>
                                                            </span>

                                                            <span className="btn btn-outline-danger" onClick={() => deleteProject(project._id)}>
                                                                <i className="ri-delete-bin-6-line"></i>
                                                            </span>
                                                        </div>
                                                    </td>

                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="text-center text-muted">
                                                    No projects found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            {/* Edit project Modal */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-cs-secondary1">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Project Detials</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body bg-cs-secondary1">
                            <form className="" onSubmit={handleEditProject}>
                                <div className="">
                                    <label htmlFor="project_title">Project Title</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="project_title"
                                        value={formData.project_title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className=" register-card mt-2">
                                    <label className="fs-6 mb-1">Select Collaborators</label>

                                    <Autocomplete
                                        className="form-control p-0 rounded-1"
                                        options={alumniOptions || []}

                                        // FIX: Handle both 'label' (from search list) and 'name' (from database)
                                        getOptionLabel={(option) => {
                                            if (!option) return "";
                                            return option.label || option.name || "";
                                        }}

                                        // FIX: Compare by ID so MUI knows they are the same person
                                        isOptionEqualToValue={(option, value) => {
                                            const optionId = option.id || option._id;
                                            const valueId = value.id || value._id;
                                            return optionId === valueId;
                                        }}

                                        value={selectedAlumni}
                                        onChange={(event, newValue) => setSelectedAlumni(newValue)}

                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder="Search alumni..."
                                                name="collaborators"
                                            />
                                        )}
                                    />

                                </div>

                                <div className="mt-4">
                                    <button className="btn btn-success" type="submit">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Collaborate;