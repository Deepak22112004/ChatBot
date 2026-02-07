import React from "react"


const Sidebar = ({ chat , activechatid,onActivechatidChange }) => {
  function handleChatClick(chatId){
    onActivechatidChange(chatId)

  }
  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">

      {/* Top */}
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-lg font-semibold">🤖 ChatBot</h1>
      </div>

      {/* New Chat */}
      <div className="p-4">
        <button className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded">
          + New Chat
        </button>
      </div>

      {/* Chat List */}
      <ul className="flex-1 overflow-y-auto px-2 space-y-2">
  {chat.map((item) => (
    <li key={item.id} onClick={()=>handleChatClick(item.id)} >
      <button
        className={`w-full text-left p-3 rounded hover:bg-gray-800 transition
        ${item.id === activechatid ? "bg-gray-800" : ""}`}
      >
        <div className="truncate">
          {item.title}
        </div>
      </button>
    </li>
  ))}
</ul>


      {/* Bottom */}
      <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
        Deepak Bot UI
      </div>

    </div>
  )
}

export default Sidebar
