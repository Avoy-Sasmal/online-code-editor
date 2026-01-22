import { Copy, LogOut, Users, Code2, X } from "lucide-react";

const Sidebar = ({
  roomId,
  userName,
  users,
  typing,
  language,
  copySuccess,
  handleLanguageChange,
  copyRoomId,
  leaveRoom,
  onClose,
}) => {
  return (
    <div className="w-80 bg-slate-900 border-r border-slate-700 p-6 flex flex-col h-full">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-purple-500" />
              Code Room
            </h2>
            <p className="text-sm text-slate-400 mt-1 font-mono">{roomId}</p>
          </div>
          <button
            onClick={copyRoomId}
            className="p-2 hover:bg-slate-800 rounded-lg transition group relative"
            title="Copy Room ID"
          >
            <Copy className="w-5 h-5 text-slate-400 group-hover:text-purple-400" />
          </button>
        </div>
        {onClose && (
          <button
            aria-label="Close sidebar"
            onClick={onClose}
            className="lg:hidden absolute top-3 right-3 p-2 rounded-lg hover:bg-slate-800 text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        {copySuccess && (
          <span className="text-xs text-green-400 bg-green-400/10 px-3 py-1 rounded-full">
            {copySuccess}
          </span>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-slate-400 mb-3 flex items-center gap-2">
          <Users className="w-4 h-4" />
          Users in Room ({users.length})
        </h3>
        <ul className="space-y-2 max-h-40 overflow-y-auto">
          {users.map((user, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-slate-300 bg-slate-800/50 px-3 py-2 rounded-lg"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              {user}
            </li>
          ))}
        </ul>
        {typing && (
          <p className="text-xs text-purple-400 mt-3 animate-pulse">{typing}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-400 mb-2">
          Language
        </label>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="txt">Text</option>
        </select>
      </div>

      <div className="mt-auto">
        <button
          onClick={leaveRoom}
          className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition"
        >
          <LogOut className="w-4 h-4" />
          Leave Room
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
