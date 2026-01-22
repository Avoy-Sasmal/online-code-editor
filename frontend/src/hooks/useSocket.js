import { useEffect, useState } from "react";
import socket from "../socket/socket";

export const useSocket = (setUsers, setCode, setLanguage, setOutput, setTyping) => {
    useEffect(() => {
        socket.on("userJoined", (users) => {
            setUsers(users);
        });

        socket.on("code-update", (newCode) => {
            setCode(newCode);
        });

        socket.on("typing", ({ userName }) => {
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
    }, [setUsers, setCode, setLanguage, setOutput, setTyping]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            socket.emit("leaveRoom");
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    return socket;
};
