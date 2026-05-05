import _default from "@monaco-editor/react";
import Editor from "@monaco-editor/react";

const MonacoEditor = ({

    value,
    theme,
    onChange,
    language,
    height = "90vh",
}) => {

    return (

        <Editor
            height={height}
            language={language}
            value={value}
            theme={theme}
            
            onChange={(val) => onChange(val ?? "")}
            options = {{
                fontSize: 14,
                minimap: { enabled: true },
                wordWrap: "on",
                automaticLayout: true,
                scrollBeyondLastLine: false,
            }} />
    );
};

export default MonacoEditor;