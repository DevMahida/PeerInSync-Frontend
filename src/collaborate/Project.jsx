import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useRef } from "react";
import { io } from "socket.io-client";
import MonacoEditor from "../components/MonacoEditor";
import axios from "axios";
import "./Project.css";

const Project = () => {

    const { id } = useParams();

    // File System
    const [files, setFiles] = useState([]);
    const [activeFile, setActiveFile] = useState(null);

    const [project_name, setProject_name] = useState("");

    const saveTimeout = useRef(null);
    const [saving, setSaving] = useState(false);

    const [showInput, setShowInput] = useState(false);
    const [newFileName, setNewFileName] = useState("");

    const inputRef = useRef(null);

    const [openFolders, setOpenFolders] = useState({});

    const [creating, setCreating] = useState(false);

    const [openTabs, setOpenTabs] = useState([]);

    const [output, setOutput] = useState("");
    const [running, setRunning] = useState(false);

    const [outputHeight, setOutputHeight] = useState(180);
    const isResizing = useRef(false);

    const [renamingFileId, setRenamingFileId] = useState(null);
    const [renameValue, setRenameValue] = useState("");

    const socketRef = useRef(null);

    const [remoteCursors, setRemoteCursors] = useState({});
    const decorationsRef = useRef([]);

    const editorRef = useRef(null);

    const toggleFolder = (folder) => {
        setOpenFolders(prev => ({
            ...prev,
            [folder]: !prev[folder]
        }));
    };


    const fetchProject = () => {

        axios.get(`https://peerinsync-backend-server.onrender.com/projects/getProject/${id}`, { withCredentials: true })
            .then(response => {
                setFiles(response.data.files);
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
            .then(() => {
                // small delay so user can SEE it
                setTimeout(() => {
                    setSaving(false);
                }, 500);
            })
            .catch(err => console.log(err));
    };


    const renameFile = (fileId) => {

        if (!renameValue.trim()) {
            setRenamingFileId(null);
            return;
        }

        const newName = renameValue;

        const ext = newName.split(".").pop();

        const languageMap = {
            js: "javascript",
            ts: "typescript",
            py: "python",
            java: "java",
            c: "c",
            html: "html",
            css: "css"
        };

        const newLanguage = languageMap[ext] || "plaintext";

        // UI update
        setFiles(prev =>
            prev.map(f =>
                f._id === fileId
                    ? { ...f, fileName: newName, language: newLanguage }
                    : f
            )
        );

        setRenamingFileId(null);
        setRenameValue("");

        // backend
        axios.put(
            `https://peerinsync-backend-server.onrender.com/projects/rename/${id}/file/${fileId}`,
            { fileName: newName, language: newLanguage },
            { withCredentials: true }
        )
            .then(res => {
                setFiles(res.data.files);
                setRenamingFileId(null);
                setRenameValue("");
            })
            .catch(err => {
                console.log(err?.response?.data || err);
            });
    };


    const handleCreateFile = () => {

        if (!newFileName || creating) return;

        setCreating(true);

        let folder = "root";
        let fileName = newFileName;

        if (newFileName.includes("/")) {
            const parts = newFileName.split("/");
            folder = parts[0];
            fileName = parts[1];
        }

        const ext = fileName.split(".").pop();

        const languageMap = {
            js: "javascript",
            ts: "typescript",
            py: "python",
            java: "java",
            c: "c",
            html: "html",
            css: "css"
        };

        const language = languageMap[ext] || "plaintext";

        axios.post(
            `https://peerinsync-backend-server.onrender.com/projects/addFile/${id}`,
            {
                fileName,
                folder,
                language: language.toLowerCase()
            },
            { withCredentials: true }
        )
            .then(res => {
                const updatedFiles = res.data.files;
                const newFile = updatedFiles[updatedFiles.length - 1];

                setFiles(updatedFiles);
                setNewFileName("");
                setShowInput(false);

                setOpenTabs(prev => {
                    const exists = prev.find(f => f._id === newFile._id);
                    return exists ? prev : [...prev, newFile];
                });

                setActiveFile(newFile);
            })
    }


    const deleteFile = (fileId) => {

        axios.delete(
            `https://peerinsync-backend-server.onrender.com/projects/deleteFile/${id}/${fileId}`,
            { withCredentials: true }
        )
            .then(res => {
                setFiles(res.data.files);

                // if deleted file was active → switch file
                if (activeFile._id === fileId) {
                    setActiveFile(res.data.files[0] || null);
                }
            })
            .catch(err => console.log(err));
    };


    const grouped = files.reduce((acc, file) => {
        const folder = file.folder || "root";
        if (!acc[folder]) acc[folder] = [];
        acc[folder].push(file);
        return acc;
    }, {});


    const openFile = (file) => {

        setActiveFile(file);

        setOpenTabs(prev => {
            const exists = prev.find(f => f._id === file._id);
            if (exists) return prev;

            return [...prev, file];
        });
    };


    const closeTab = (fileId) => {

        setOpenTabs(prev => {
            const updated = prev.filter(f => f._id !== fileId);

            if (activeFile?._id === fileId) {
                if (updated.length > 0) {
                    setActiveFile(updated[updated.length - 1]);
                } else {
                    setActiveFile(null); // no tabs left
                }
            }

            return updated;
        });
    };


    useEffect(() => {
        fetchProject();
    }, [id]);


    useEffect(() => {
        return () => {
            if (saveTimeout.current) {
                clearTimeout(saveTimeout.current);
            }
        };

    }, []);


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setShowInput(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    useEffect(() => {
        setOpenFolders({ root: true });
    }, []);


    const startResizing = () => {
        isResizing.current = true;
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isResizing.current) return;

            const newHeight = window.innerHeight - e.clientY;

            // limit min/max height
            if (newHeight > 100 && newHeight < window.innerHeight - 100) {
                setOutputHeight(newHeight);
            }
        };

        const handleMouseUp = () => {
            isResizing.current = false;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);


    useEffect(() => {
        socketRef.current = io("https://peerinsync-backend-server.onrender.com");

        socketRef.current.emit("join-project", id);

        console.log("Joined project:", id);

        return () => {
            socketRef.current.disconnect();
        };
    }, [id]);


    useEffect(() => {

        if (!socketRef.current) return;

        const handler = ({ fileId, content }) => {

            setFiles(prev =>
                prev.map(f =>
                    f._id === fileId
                        ? { ...f, content }
                        : f
                )
            );

            if (activeFile?._id === fileId) {
                setActiveFile(prev => ({
                    ...prev,
                    content
                }));
            }
        };

        socketRef.current.on("code-change", handler);

        return () => {
            socketRef.current.off("code-change", handler);
        };

    }, [activeFile]);


    useEffect(() => {

        if (!socketRef.current) return;

        const handler = ({ fileId, position, user }) => {

            setRemoteCursors(prev => ({
                ...prev,
                [user]: { fileId, position }
            }));

        };

        socketRef.current.on("cursor-move", handler);

        return () => {
            socketRef.current.off("cursor-move", handler);
        };

    }, []);


    useEffect(() => {

        if (!editorRef.current) return;

        const decorations = [];

        Object.values(remoteCursors).forEach(cursor => {

            if (cursor.fileId !== activeFile?._id) return;

            decorations.push({
                range: new window.monaco.Range(
                    cursor.position.lineNumber,
                    cursor.position.column,
                    cursor.position.lineNumber,
                    cursor.position.column
                ),
                options: {
                    stickiness: 1,
                    className: "remote-cursor",
                    hoverMessage: { value: userId }
                }
            });

        });

        decorationsRef.current = editorRef.current.deltaDecorations(
            decorationsRef.current,
            decorations
        );

    }, [remoteCursors, activeFile]);


    const initiateSave = (newCode) => {

        if (newCode === activeFile?.content) return;

        //  PROTECT AGAINST BAD VALUES
        if (typeof newCode !== "string") return;

        const fileId = activeFile._id;

        setFiles(prev =>
            prev.map(f =>
                f._id === fileId
                    ? { ...f, content: newCode }
                    : f
            )
        );

        setActiveFile(prev => ({
            ...prev,
            content: newCode
        }));

        setSaving(true);

        if (socketRef.current) {
            socketRef.current.emit("code-change", {
                projectId: id,
                fileId: fileId,
                content: newCode
            });
        }

        if (saveTimeout.current) {
            clearTimeout(saveTimeout.current);
        }

        saveTimeout.current = setTimeout(() => {
            saveFile(fileId, newCode);
        }, 1000);
    };


    const Judge0LanguageMap = {
        javascript: 63,
        python: 71,
        java: 62,
        c: 50,
        cpp: 54
    };



    const runCode = async () => {

        if (!activeFile) return;

        setRunning(true);
        setOutput("Running...");

        try {
            const languageMap = {
                javascript: 63,
                python: 71,
                java: 62,
                c: 50,
                cpp: 54
            };

            const languageId = languageMap[activeFile.language] || 63;

            const res = await axios.post(
                "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
                {
                    source_code: activeFile.content,
                    language_id: languageId
                }
            );

            console.log("FULL RESPONSE:", res.data);

            console.log("STDOUT:", res.data.stdout);

            setOutput(
                (res.data.stdout ||
                    res.data.stderr ||
                    res.data.compile_output ||
                    "No output").trim()
            );

        } catch (err) {
            console.log(err);
            setOutput("Error running code");
        }

        setRunning(false);
    };


    const handler = ({ fileId, position, userId }) => {

        setRemoteCursors(prev => ({
            ...prev,
            [userId]: { fileId, position }
        }));

    };


    const getColor = (id) => {
        const colors = ["red", "blue", "green", "orange", "purple"];
        return colors[id.charCodeAt(0) % colors.length];
    };


    const getIcon = (lang) => {
        switch (lang) {
            case "javascript": return "ri-javascript-fill";
            case "typescript": return "ri-code-s-slash-line";
            case "html": return "ri-html5-fill";
            case "css": return "ri-css3-fill";
            case "python": return "ri-terminal-box-fill";
            case "java": return "ri-cup-fill";
            case "c": return "ri-braces-line";
            default: return "ri-file-text-line";
        }
    };


    const getMonacoLanguage = (lang) => {
        switch (lang) {
            case "js":
            case "javascript":
                return "javascript";

            case "ts":
            case "typescript":
                return "typescript";

            case "py":
            case "python":
                return "python";

            case "java":
                return "java";

            case "c":
                return "c";

            case "html":
                return "html";

            case "css":
                return "css";

            default:
                return "plaintext";
        }
    };

    return (
        <>
            {/* Top Bar */}
            <div className="top-bar">

                <div className="left">
                    <Link to="/Collaborate">
                        <button className="btn back-btn">← Back</button>
                    </Link>

                    <span className="h4 ms-5">{project_name}</span>
                </div>

                <div className="right">
                    <span className="save-status">
                        {saving ? "Saving..." : "Saved"}
                    </span>

                    <button className="run-btn" onClick={runCode}>
                        ▶ Run Code
                    </button>
                </div>

            </div>

            <div className="editor-layout">

                {/* Sidebar */}
                <div className="sidebar">
                    <h4>FILES</h4>

                    <span
                        className="new-file-btn"
                        onClick={() => setShowInput(prev => !prev)}
                    >
                        <i className="ri-file-add-line"></i>
                    </span>

                    {Object.keys(grouped).map(folder => (
                        <div key={folder} className="folder-block">

                            <div
                                className="folder-name"
                                onClick={() => toggleFolder(folder)}
                            >
                                {openFolders[folder] ? <i className="ri-folder-open-line"></i> : <i className="ri-folder-line"></i>} {folder}
                            </div>

                            {openFolders[folder] && grouped[folder].map(file => (
                                <div
                                    key={file._id}
                                    className={`file-item ${activeFile?._id === file._id ? "active-file" : ""}`}
                                    onClick={() => openFile(file)}
                                >
                                    <i className={getIcon(file.language)} style={{ marginRight: "6px" }}></i>
                                    {renamingFileId === file._id ? (
                                        <input
                                            className="rename-input"
                                            value={renameValue}
                                            autoFocus
                                            onChange={(e) => setRenameValue(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    renameFile(file._id);
                                                }

                                                if (e.key === "Escape") {
                                                    setRenamingFileId(null);
                                                    setRenameValue("");
                                                }
                                            }}
                                        />
                                    ) : (
                                        <>
                                            <span onDoubleClick={() => {
                                                setRenamingFileId(file._id);
                                                setRenameValue(file.fileName);
                                            }}>
                                                {file.fileName}
                                            </span>

                                            <i className="ri-edit-line"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setRenamingFileId(file._id);
                                                    setRenameValue(file.fileName);
                                                }}
                                            ></i>
                                        </>
                                    )}

                                    <i
                                        className="ri-delete-bin-line delete-icon"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteFile(file._id);
                                        }}
                                    ></i>
                                </div>
                            ))}

                        </div>
                    ))}

                    {/* New File Input */}
                    {showInput && (
                        <div ref={inputRef} className="new-file-input">
                            <input
                                type="text"
                                placeholder="file.js"
                                value={newFileName}
                                onChange={(e) => setNewFileName(e.target.value)}
                            />
                            <button onClick={handleCreateFile} disabled={creating}>
                                {creating ? "Creating..." : "Create"}
                            </button>
                            {/* <button onClick={() => {
                            setShowInput(false);
                            setNewFileName("");
                        }}>
                            Cancel
                        </button> */}
                        </div>
                    )}
                </div>


                {/* Main Area */}
                <div className="editor-main">

                    {/* Tabs */}
                    <div className="tabs-bar">
                        {openTabs.map(file => (
                            <div
                                key={file._id}
                                className={`tab ${activeFile?._id === file._id ? "active" : ""}`}
                                onClick={() => setActiveFile(file)}
                            >
                                <i className={getIcon(file.language)} style={{ marginRight: "6px" }}></i>

                                {file.fileName}

                                {/* CLOSE BUTTON */}
                                <span
                                    className="close-tab"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        closeTab(file._id);
                                    }}
                                >
                                    ✖
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Editor */}
                    <div className="editor-container">
                        {activeFile ? (
                            <MonacoEditor
                                theme="vs-dark"
                                value={activeFile.content}
                                language={getMonacoLanguage(activeFile.language)}
                                onChange={(newCode) => initiateSave(newCode)}
                                onMount={(editor) => {
                                    editorRef.current = editor;

                                    editor.onDidChangeCursorPosition((e) => {
                                        socketRef.current.emit("cursor-move", {
                                            projectId: id,
                                            fileId: activeFile._id,
                                            position: e.position,
                                            userId: socketRef.current.id   //  UNIQUE
                                        });
                                    });
                                }}
                            />
                        ) : (
                            <div style={{ color: "#aaa", padding: "20px" }}>
                                No file open
                            </div>
                        )}
                    </div>

                    {/* OUTPUT PANEL */}
                    <div
                        className="resize-bar"
                        onMouseDown={(e) => startResizing(e)}
                    ></div>

                    <div
                        className="output-panel"
                        style={{ height: `${outputHeight}px` }}
                    >

                        <div className="output-header">
                            <span>OUTPUT</span>

                            <button onClick={() => setOutput("")}>
                                Clear
                            </button>
                        </div>

                        <pre className="output-content">
                            {output || "No output yet"}
                        </pre>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Project;