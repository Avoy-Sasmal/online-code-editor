import React, { useState } from "react";
import LandingPage from "./pages/LandingPage.jsx";
import JoinRoom from "./pages/JoinRoom.jsx";
import EditorRoom from "./pages/EditorRoom.jsx";
import { useSocket } from "./hooks/useSocket";

const App = () => {
  const [view, setView] = useState("landing"); // 'landing', 'join', 'editor'
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// Welcome to Code Room");
  const [copySuccess, setCopySuccess] = useState("");
  const [users, setUsers] = useState([]);
  const [typing, setTyping] = useState("");
  const [output, setOutput] = useState("");
  const [version, setVersion] = useState("*");
  const [userInput, setUserInput] = useState("");

  const socket = useSocket(setUsers, setCode, setLanguage, setOutput, setTyping);

  const joinRoom = () => {
    if (roomId && userName) {
      socket.emit("join", { roomId, userName });
      setView("editor");
    }
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom");
    setView("join");
    setRoomId("");
    setUserName("");
    setUsers([]);
    setCode("// Welcome to Code Room");
    setLanguage("javascript");
  };

  const copyRoomId = async () => {
    navigator.clipboard.writeText(roomId);
    setCopySuccess("Room Id Copied");
    setTimeout(() => {
      setCopySuccess("");
    }, 2000);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit("code-change", { roomId, code: newCode });
    socket.emit("typing", { roomId, userName });
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    socket.emit("language-change", { roomId, language: newLanguage });
  };

  const runCode = () => {
    socket.emit("compileCode", { code, roomId, language, version, stdin: userInput });
  };

  if (view === "landing") {
    return <LandingPage onStart={() => setView("join")} />;
  }

  if (view === "join") {
    return (
      <JoinRoom
        roomId={roomId}
        setRoomId={setRoomId}
        userName={userName}
        setUserName={setUserName}
        joinRoom={joinRoom}
      />
    );
  }

  return (
    <EditorRoom
      roomId={roomId}
      userName={userName}
      users={users}
      typing={typing}
      language={language}
      code={code}
      output={output}
      copySuccess={copySuccess}
      userInput={userInput}
      setUserInput={setUserInput}
      handleCodeChange={handleCodeChange}
      handleLanguageChange={handleLanguageChange}
      copyRoomId={copyRoomId}
      leaveRoom={leaveRoom}
      runCode={runCode}
    />
  );
};

export default App;
