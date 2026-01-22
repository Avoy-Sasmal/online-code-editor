import Editor from "@monaco-editor/react";

const CodeEditor = ({ language, code, handleCodeChange }) => {
  return (
    <div className="flex-1 bg-slate-950 min-h-0">
      <Editor
        height="100%"
        defaultLanguage={language}
        language={language}
        value={code}
        onChange={handleCodeChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 16,
          tabSize: 2,
          automaticLayout: true,
          fontFamily: "Fira Code, monospace",
          lineNumbers: "on",
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
};
export default CodeEditor;
