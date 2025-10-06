import axios from "axios";

export const executeCode = async (code, language, version) => {
  try {
    const response = await axios.post(
      "https://emkc.org/api/v2/piston/execute",
      {
        language,
        version,
        files: [{ content: code }],
      }
    );
    return response.data;
  } catch (err) {
    console.error("Code execution failed:", err.message);
    throw err;
  }
};
