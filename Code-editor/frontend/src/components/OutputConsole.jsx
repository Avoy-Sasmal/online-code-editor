import { Play } from "lucide-react";

const OutputConsole = ({ output, runCode }) => {
  return (
    <div className="shrink-0 h-64 lg:h-64 md:h-56 sm:h-48 bg-slate-900 border-t border-slate-700 flex flex-col">
      <div className="px-4 py-3 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-300">Output Console</h3>
        <button
          onClick={runCode}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg flex items-center gap-2 transition"
        >
          <Play className="w-4 h-4" />
          Execute
        </button>
      </div>
      <textarea
        value={output}
        readOnly
        placeholder="Output will appear here..."
        className="flex-1 p-4 bg-slate-950 text-slate-300 font-mono text-sm resize-none focus:outline-none"
      />
    </div>
  );
};
export default OutputConsole;
