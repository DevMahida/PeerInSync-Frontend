import { useState } from "react";
import MonacoEditor from "../components/MonacoEditor";
import Header from "../header_footer/header";
import './Collaborate.css';

const Collaborate = () => {

    function showForm() {
        document.getElementById("overlay").style.display = "block";
    }

    function hideForm() {
        document.getElementById("overlay").style.display = "none";
    }

    const initialFormData = {
        project_title: '',
        file_name: '',
        language: ''
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <Header />

            <div className = "container">
                <h2 align="center" className="pageTitle">Collaborate</h2>

                <button onClick={showForm} className="createBtn">Create new project</button>

                <div id="overlay" className="overlay">
                    <div className="overlayContent">

                        <h3 className="createTitle">Create New Project</h3>

                        <span onClick={hideForm} title="close" className="closeBtn">[x]</span>

                        <form>
                            <div className="projTitle">
                                <label htmlFor="project_title">Project Title:</label>
                                <input type="text" name="project_title" id="project_title" onChange={handleChange} required />
                            </div>

                            <div className="fileName">
                                <label htmlFor="project_title">File Name:</label>
                                <input type="text" name="file_name" id="file_name" placeholder="Eg: name.c / name.java" onChange={handleChange} required />
                            </div>

                            <div className="projLang">
                                <label htmlFor="project_title">Language:</label>
                                    <select name="event_type" id="event_type" onChange={handleChange} required>
                                        <option value="">Please Select The Development Language</option>
                                        <option value="seminar">Javascript</option>
                                        <option value="webinar">C</option>
                                        <option value="workshop">Java</option>
                                    </select>
                            </div>

                            <div>
                                <button className="subButton" type="submit" onClick={console.log(formData)}>Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div> 
        </>
    );
}

export default Collaborate;