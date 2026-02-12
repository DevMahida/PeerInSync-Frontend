import { useState } from "react";
import { useLocation } from "react-router-dom";
import MonacoEditor from "../components/MonacoEditor";

const Project = () => {

    const location = useLocation();
    const { project_title, file_name, language } = location.state || {};
    
    const [code, setCode] = useState("//Start Coding Here");

    return (
        <>
            <span className="bg">
            <div className="container" style={{padding: "1rem"}}>
                <h2 align="center">{project_title}</h2>

                <MonacoEditor value={code} onChange={setCode} language={language}/>

                <button onClick={() => console.log(code)}>Log Code</button>

            </div>
            </span>
        </>
    );
}

export default Project;