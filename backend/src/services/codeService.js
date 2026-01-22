import axios from "axios";

export const executeCode = async (code, language, version, stdin) => {
    try {
        const response = await axios.post(
            "https://emkc.org/api/v2/piston/execute",
            {
                language,
                version,
                files: [{ content: code }],
                stdin: stdin ? (stdin.endsWith('\n') ? stdin : stdin + '\n') : "",
            }
        );
        return response.data;
    } catch (err) {
        console.error("Code execution failed:", err.message);
        throw err;
    }
};
