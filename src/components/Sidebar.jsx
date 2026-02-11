import React from "react"

const Sidebar = ({
  chat,
  activechatid,
  onActivechatidChange,
  onhandlecreatechat,
  onDeleteChat,
  onClose
}) => {

  function handleChatClick(chatId) {
    onActivechatidChange(chatId)
  }

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 shadow-2xl">

      {/* Top Section */}
      <div className="p-5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-xl font-bold">🤖</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">ChatBot</h1>
        </div>

        <button
          onClick={onClose}
          className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          ✕
        </button>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button
          onClick={onhandlecreatechat}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 p-3 rounded-xl font-semibold shadow-md transition-all active:scale-95"
        >
          + New Chat
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 custom-scrollbar">
        <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
          Recent Chats
        </p>

        {chat
          .filter(c => c.messages && c.messages.length > 0)
          .map((item) => (
            <div key={item.id}>
              <button
                onClick={() => handleChatClick(item.id)}
                className={`w-full text-left p-3 rounded-xl transition-all duration-200 group
                ${item.id === activechatid
                    ? "bg-slate-800 ring-1 ring-slate-700 shadow-inner"
                    : "hover:bg-slate-800/50"
                  }`}
              >
                <div className="flex items-center justify-between gap-3">

                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`text-sm font-medium truncate
                      ${item.id === activechatid
                        ? "text-white"
                        : "text-slate-400 group-hover:text-slate-200"}`}>
                      {item.title || "New Conversation"}
                    </span>
                  </div>

                  <span
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteChat(item.id)
                    }}
                    className="text-slate-500 hover:text-red-400 cursor-pointer text-xs"
                  >
                    🗑
                  </span>

                </div>
              </button>
            </div>
          ))}
      </div>

      {/* Bottom */}
      <div className="p-5 border-t border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs">
            👤
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Deepak Bot</p>
            <p className="text-[10px] text-slate-500">Free Version</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Sidebar
