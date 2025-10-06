import Sidebar from "../components/Sidebar.jsx";
import CodeEditor from "../components/CodeEditor.jsx";
import OutputConsole from "../components/OutputConsole.jsx";

const EditorRoom = ({
  roomId,
  userName,
  users,
  typing,
  language,
  code,
  output,
  copySuccess,
  handleCodeChange,
  handleLanguageChange,
  copyRoomId,
  leaveRoom,
  runCode,
}) => {
  return (
    <div className="h-screen flex bg-slate-950">
      <Sidebar
        roomId={roomId}
        userName={userName}
        users={users}
        typing={typing}
        language={language}
        copySuccess={copySuccess}
        handleLanguageChange={handleLanguageChange}
        copyRoomId={copyRoomId}
        leaveRoom={leaveRoom}
      />
      <div className="flex-1 flex flex-col">
        <CodeEditor
          language={language}
          code={code}
          handleCodeChange={handleCodeChange}
        />
        <OutputConsole output={output} runCode={runCode} />
      </div>
    </div>
  );
};

export default EditorRoom;
