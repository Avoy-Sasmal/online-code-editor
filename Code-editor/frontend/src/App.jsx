import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import JoinRoom from "./pages/JoinRoom.jsx";
import EditorRoom from "./pages/EditorRoom.jsx";
const socket = io("https://coderoom-xr0y.onrender.com");

const App = () => {
  const [joined, setJoined] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// Welcome to Code Room");
  const [copySuccess, setCopySuccess] = useState("");
  const [users, setUsers] = useState([]);
  const [typing, setTyping] = useState("");
  const [output, setOutput] = useState("");
  const [version, setVersion] = useState("*");

  useEffect(() => {
    socket.on("userJoined", (users) => {
      setUsers(users);
    });

    socket.on("code-update", (newCode) => {
      setCode(newCode);
    });

    socket.on("typing", ({ userName }) => {
      console.log(`${userName} is typing...`);
      setTyping(`${userName.slice(0, 8)} is typing...`);
      setTimeout(() => {
        setTyping("");
      }, 3000);
    });

    socket.on("languageUpdate", (newLanguage) => {
      setLanguage(newLanguage);
    });

    socket.on("codeResponse", (data) => {
      setOutput(data.run.output);
    });

    return () => {
      socket.off("userJoined");
      socket.off("code-update");
      socket.off("typing");
      socket.off("languageUpdate");
      socket.off("codeResponse");
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      socket.emit("leaveRoom");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const joinRoom = () => {
    if (roomId && userName) {
      socket.emit("join", { roomId, userName });
      setJoined(true);
    }
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom");
    setJoined(false);
    setRoomId("");
    setUserName("");
    setUsers([]);
    setCode("");
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
    socket.emit("compileCode", { code, roomId, language, version });
  };

  if (!joined) {
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
      handleCodeChange={handleCodeChange}
      handleLanguageChange={handleLanguageChange}
      copyRoomId={copyRoomId}
      leaveRoom={leaveRoom}
      runCode={runCode}
    />
  );
};

export default App;
