import * as monaco from "monaco-editor";
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

    const [theme, setTheme] = useState("dark");


    monaco.editor.setTheme(theme === "dark" ? "vs-dark" : "vs");


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
                setProject_name(response.data.project_title);
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

        const newName = renameValue.trim();
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

        setFiles(prev =>
            prev.map(f =>
                f._id === fileId
                    ? { ...f, fileName: newName, language: newLanguage }
                    : f
            )
        );

        setOpenTabs(prev =>
            prev.map(f =>
                f._id === fileId
                    ? { ...f, fileName: newName, language: newLanguage }
                    : f
            )
        );

        setActiveFile(prev =>
            prev && prev._id === fileId
                ? { ...prev, fileName: newName, language: newLanguage }
                : prev
        );

        setRenamingFileId(null);
        setRenameValue("");

        axios.put(
            `https://peerinsync-backend-server.onrender.com/projects/rename/${id}/file/${fileId}`,
            { fileName: newName, language: newLanguage },
            { withCredentials: true }
        )
            .then(() => {
                socketRef.current?.emit("file-renamed", {
                    projectId: id,
                    fileId,
                    fileName: newName,
                    language: newLanguage
                });
            })
            .catch(err => console.log(err?.response?.data || err));
    };


    const handleCreateFile = () => {
        if (!newFileName.trim() || creating) return;

        setCreating(true);

        let folder = "root";
        let fileName = newFileName.trim();

        if (fileName.includes("/")) {
            const parts = fileName.split("/");
            folder = parts[0] || "root";
            fileName = parts[1] || fileName;
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
            { fileName, folder, language },
            { withCredentials: true }
        )
            .then(res => {
                const updatedFiles = res.data.files;
                const newFile = updatedFiles[updatedFiles.length - 1];

                setFiles(updatedFiles);
                setNewFileName("");
                setShowInput(false);

                setOpenTabs(prev => {
                    const exists = prev.some(f => f._id === newFile._id);
                    return exists ? prev : [...prev, newFile];
                });

                setActiveFile(newFile);

                socketRef.current?.emit("file-created", {
                    projectId: id,
                    file: newFile
                });
            })
            .catch(err => console.log(err))
            .finally(() => setCreating(false));
    };


    const deleteFile = (fileId) => {
        axios.delete(
            `https://peerinsync-backend-server.onrender.com/projects/deleteFile/${id}/${fileId}`,
            { withCredentials: true }
        )
            .then(res => {
                const updatedFiles = res.data.files;

                setFiles(updatedFiles);
                setOpenTabs(prev => prev.filter(f => f._id !== fileId));

                setActiveFile(prev => {
                    if (prev && prev._id === fileId) {
                        return updatedFiles[0] || null;
                    }
                    return prev;
                });

                socketRef.current?.emit("file-deleted", {
                    projectId: id,
                    fileId
                });
            })
            .catch(err => console.log(err));
    };


    const closeTab = (fileId) => {
        setOpenTabs(prev => {
            const updated = prev.filter(f => f._id !== fileId);

            setActiveFile(prevActive => {
                if (prevActive && prevActive._id === fileId) {
                    return updated[updated.length - 1] || null;
                }
                return prevActive;
            });

            return updated;
        });
    };

    useEffect(() => {

        if (!socketRef.current) return;

        const handler = ({ fileId, fileName, language }) => {

            setFiles(prev =>
                prev.map(f =>
                    f._id === fileId
                        ? { ...f, fileName, language }
                        : f
                )
            );

            setOpenTabs(prev =>
                prev.map(f =>
                    f._id === fileId
                        ? { ...f, fileName, language }
                        : f
                )
            );

            if (activeFile?._id === fileId) {
                setActiveFile(prev => ({
                    ...prev,
                    fileName,
                    language
                }));
            }

        };

        socketRef.current.on("file-renamed", handler);

        return () => {
            socketRef.current.off("file-renamed", handler);
        };

    }, [activeFile]);

    useEffect(() => {

        if (!socketRef.current) return;

        const handler = ({ fileId }) => {

            setFiles(prev => prev.filter(f => f._id !== fileId));

            setOpenTabs(prev => prev.filter(f => f._id !== fileId));

            if (activeFile?._id === fileId) {
                setActiveFile(null);
            }

        };

        socketRef.current.on("file-deleted", handler);

        return () => {
            socketRef.current.off("file-deleted", handler);
        };

    }, [activeFile]);

    useEffect(() => {
        if (theme === "dark") {
            monaco.editor.setTheme("vs-dark");
        } else {
            monaco.editor.setTheme("vs");
        }
    }, [theme]);

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (saved) setTheme(saved);
    }, []);

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);


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


    const openFile = (file) => {
        setActiveFile(file);

        setOpenTabs(prev => {
            const exists = prev.some(f => f._id === file._id);
            return exists ? prev : [...prev, file];
        });
    };


    useEffect(() => {
        const socket = io("https://peerinsync-backend-server.onrender.com", {
            withCredentials: true
        });

        socketRef.current = socket;
        socket.emit("join-project", id);

        const onFileCreated = ({ file }) => {
            setFiles(prev => {
                if (prev.some(f => f._id === file._id)) return prev;
                return [...prev, file];
            });
        };

        const onFileDeleted = ({ fileId }) => {
            setFiles(prev => prev.filter(f => f._id !== fileId));
            setOpenTabs(prev => prev.filter(f => f._id !== fileId));

            setActiveFile(prev => {
                if (prev && prev._id === fileId) return null;
                return prev;
            });
        };

        const onFileRenamed = ({ fileId, fileName, language }) => {
            setFiles(prev =>
                prev.map(f =>
                    f._id === fileId
                        ? { ...f, fileName, language }
                        : f
                )
            );

            setOpenTabs(prev =>
                prev.map(f =>
                    f._id === fileId
                        ? { ...f, fileName, language }
                        : f
                )
            );

            setActiveFile(prev =>
                prev && prev._id === fileId
                    ? { ...prev, fileName, language }
                    : prev
            );
        };

        const onCodeChange = ({ fileId, content }) => {
            setFiles(prev =>
                prev.map(f =>
                    f._id === fileId
                        ? { ...f, content }
                        : f
                )
            );

            setActiveFile(prev =>
                prev && prev._id === fileId
                    ? { ...prev, content }
                    : prev
            );
        };

        const onCursorMove = ({ fileId, position, userId }) => {
            setRemoteCursors(prev => ({
                ...prev,
                [userId]: { fileId, position, userId }
            }));
        };

        socket.on("file-created", onFileCreated);
        socket.on("file-deleted", onFileDeleted);
        socket.on("file-renamed", onFileRenamed);
        socket.on("code-change", onCodeChange);
        socket.on("cursor-move", onCursorMove);

        return () => {
            socket.off("file-created", onFileCreated);
            socket.off("file-deleted", onFileDeleted);
            socket.off("file-renamed", onFileRenamed);
            socket.off("code-change", onCodeChange);
            socket.off("cursor-move", onCursorMove);
            socket.disconnect();
        };
    }, [id]);


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


    useEffect(() => {
        if (!editorRef.current || !activeFile) return;

        const decorations = [];

        Object.values(remoteCursors).forEach(cursor => {
            if (cursor.fileId !== activeFile._id) return;

            decorations.push({
                range: new monaco.Range(
                    cursor.position.lineNumber,
                    cursor.position.column,
                    cursor.position.lineNumber,
                    cursor.position.column
                ),
                options: {
                    className: "remote-cursor"
                }
            });
        });

        decorationsRef.current = editorRef.current.deltaDecorations(
            decorationsRef.current,
            decorations
        );
    }, [remoteCursors, activeFile]);


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

    const grouped = files.reduce((acc, file) => {
        const folder = file.folder || "root";
        if (!acc[folder]) acc[folder] = [];
        acc[folder].push(file);
        return acc;
    }, {});



    return (
        <>
            <div className={`editor-layout ${theme}`}>
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

                    <button
                        className="theme-btn"
                        onClick={() => setTheme(prev => prev === "dark" ? "light" : "dark")}
                    >
                        {theme === "dark" ? <i class="ri-moon-line"></i> : <i class="ri-sun-line"></i>}
                    </button>

                </div>

                <div className="d-flex">

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
                                    theme={theme === "dark" ? "vs-dark" : "vs"}
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
            </div>
        </>
    );
}

export default Project;