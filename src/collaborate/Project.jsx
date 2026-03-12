import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MonacoEditor from "../components/MonacoEditor";

const Project = () => {

    const location = useLocation();
    const { project_title, file_name, language } = location.state || {};

    const [code, setCode] = useState("//Start Coding Here");

    return (
        <>
            <div className="prject-bg bg-dark">
                <span className="bg">
                    <div className="container text-white" style={{ padding: "1rem" }}>

                        <Link to="/Collaborate" className="btn text-white fs-4"><i class="ri-arrow-left-line"></i></Link>

                        <h2 align="center">{project_title}</h2>

                        <div className="mb-2">
                            <MonacoEditor className="mb-2" value={code} onChange={setCode} language={language} />
                        </div>

                        <button className="btn btn-outline-light" onClick={() => console.log(code)}>Log Code</button>

                    </div>
                </span>
            </div>

        </>
    );
}

export default Project;