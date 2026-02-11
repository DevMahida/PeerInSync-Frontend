import { useState } from "react";
import MonacoEditor from "../components/MonacoEditor";

const Project = ({

    
}) => {
    
    const [code, setCode] = useState("//Start Coding Here");

    return (
        <div style={{padding: "1rem"}}>
            <h2 align="center">Collaborate</h2>

            <MonacoEditor value={code} onChange={setCode} language="javascript"/>

            <button onClick={() => console.log(code)}>Log Code</button>

        </div>
    );
}

export default Project;