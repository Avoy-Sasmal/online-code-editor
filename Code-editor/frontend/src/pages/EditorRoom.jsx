import React, { useState } from "react";
import { Menu } from "lucide-react";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex bg-slate-950">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
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
      </div>

      {/* Mobile drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[80%] bg-slate-900 border-r border-slate-700">
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
              onClose={() => setIsSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-slate-800">
          <button
            aria-label="Open menu"
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-300"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-white font-semibold">Code Room</h1>
          <div className="w-6 h-6" />
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          <CodeEditor
            language={language}
            code={code}
            handleCodeChange={handleCodeChange}
          />
          <OutputConsole output={output} runCode={runCode} />
        </div>
      </div>
    </div>
  );
};

export default EditorRoom;
