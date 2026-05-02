import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MonacoEditor from "../components/MonacoEditor";
import "./Project.css";

const Project = () => {

    const location = useLocation();
    const { project_title, file_name, language } = location.state || {};

    // File System
    const [files, setFiles] = useState([
        { id: 1, name: "index.js", language: "javascript", content: "// index" },
        { id: 2, name: "app.js", language: "javascript", content: "// app" }
    ]);

    const [activeFile, setActiveFile] = useState(files[0]);

    return (
        <>
            <div className="top-bar">
                <Link to="/Collaborate"><button className="btn back-btn">← Back</button></Link>
                <span className="h4">{project_title}</span>
            </div>

            <div className="editor-layout">

                {/* Sidebar */}
                <div className="sidebar">
                    {/* file list */}
                    <h4>FILES</h4>

                    {files.map(file => (
                        <div
                            key={file.id}
                            className="file-item"
                            onClick={() => setActiveFile(file)}
                        >
                            <i class="ri-file-fill"></i>{" " + file.name}
                        </div>
                    ))}
                </div>

                {/* Main area */}
                <div className="editor-main">

                    {/* Tabs */}
                    <div className="tabs-bar">
                        {/* open files */}
                        {files.map(file => (
                            <div
                                key={file.id}
                                className={`tab ${activeFile.id === file.id ? "active" : ""}`}
                                onClick={() => setActiveFile(file)}
                            >
                                {file.name}
                            </div>
                        ))}
                    </div>

                    {/* Monaco */}
                    <div className="editor-container">
                        <MonacoEditor className="mb-2"
                            theme="vs-dark"
                            value={activeFile.content}
                            language={activeFile.language} onChange={(newCode) => {
                                setFiles(prev =>
                                    prev.map(f =>
                                        f.id === activeFile.id ? { ...f, content: newCode } : f
                                    )
                                );
                            }} />
                    </div>

                </div>
            </div>

        </>
    );
}

export default Project;