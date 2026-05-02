import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MonacoEditor from "../components/MonacoEditor";
import axios from "axios";
import "./Project.css";

const Project = () => {

    const { id } = useParams();

    // File System
    const [files, setFiles] = useState([]);
    const [activeFile, setActiveFile] = useState(null);

    const [project_name, setProject_name] = useState("");


    const fetchProject = () => {

        axios.get(`https://peerinsync-backend-server.onrender.com/projects/getProject/${id}`, { withCredentials: true })
            .then(response => {
                setFiles(response.data.files);
                setActiveFile(response.data.files[0]);
                setProject_name(response.data.name);
                console.log(response.data);
            })
            .catch(err => console.log(err));
    };

    const saveFile = (fileId, content) => {

        axios.put(
            `https://peerinsync-backend-server.onrender.com/projects/update/${id}/file/${fileId}`,
            { content },
            { withCredentials: true }
        )
            .then(res => {
                console.log("Saved");
            })
            .catch(err => console.log(err));
    };


    useEffect(() => {
        fetchProject();
    }, [id]);

    if (!activeFile) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="top-bar">
                <Link to="/Collaborate"><button className="btn back-btn">← Back</button></Link>
                <span className="h4">{project_name}</span>
            </div>


            <div className="editor-layout">

                {/* Sidebar */}
                <div className="sidebar">
                    <h4>FILES</h4>

                    {files.map(file => (
                        <div
                            key={file._id}
                            className={`file-item ${activeFile._id === file._id ? "active-file" : ""}`}
                            onClick={() => setActiveFile(file)}
                        >
                            📄 {file.fileName}
                        </div>
                    ))}
                </div>

                {/* Main area */}
                <div className="editor-main">

                    {/* Tabs */}
                    <div className="tabs-bar">
                        {files.map(file => (
                            <div
                                key={file._id}
                                className={`tab ${activeFile._id === file._id ? "active" : ""}`}
                                onClick={() => setActiveFile(file)}
                            >
                                {file.fileName}
                            </div>
                        ))}
                    </div>

                    {/* Editor */}
                    <div className="editor-container">
                        <MonacoEditor
                            theme="vs-dark"
                            value={activeFile.content}
                            language={activeFile.language}
                            onChange={(newCode) => {
                                const fileId = activeFile._id;

                                setFiles(prev =>
                                    prev.map(f =>
                                        f._id === fileId
                                            ? { ...f, content: newCode }
                                            : f
                                    )
                                );

                                saveFile(fileId, newCode);
                            }}
                        />
                    </div>

                </div>
            </div>
        </>
    );
}

export default Project;