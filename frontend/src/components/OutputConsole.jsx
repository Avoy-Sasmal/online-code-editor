import { Play } from "lucide-react";

const OutputConsole = ({ output, runCode, userInput, setUserInput }) => {
  return (
    <div className="shrink-0 h-64 lg:h-64 md:h-56 sm:h-48 bg-slate-900 border-t border-slate-700 flex flex-col">
      <div className="px-4 py-3 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-300">Input & Output</h3>
        <button
          onClick={runCode}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg flex items-center gap-2 transition"
        >
          <Play className="w-4 h-4" />
          Execute
        </button>
      </div>
      <div className="flex-1 flex overflow-hidden">
        {/* Input area */}
        <div className="flex-1 border-r border-slate-700 flex flex-col">
          <div className="px-4 py-1 bg-slate-800/50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Standard Input (stdin)
          </div>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter input for your program here..."
            className="flex-1 p-4 bg-slate-950 text-slate-300 font-mono text-sm resize-none focus:outline-none"
          />
        </div>
        {/* Output area */}
        <div className="flex-1 flex flex-col">
          <div className="px-4 py-1 bg-slate-800/50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Standard Output (stdout)
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Output will appear here..."
            className="flex-1 p-4 bg-slate-950 text-slate-300 font-mono text-sm resize-none focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};
export default OutputConsole;
