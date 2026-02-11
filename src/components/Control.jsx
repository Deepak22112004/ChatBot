import React, { useState } from 'react'

function Sendicon() {
  return (
    <img
      src="./send_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg"
      alt="Send"
      className="w-5 h-5 invert"
    />
  )
}

const Control = ({isDisable =false,  onSend }) => {
  const [content, setContent] = useState("")

  function handleSend() {
    if (content.trim().length > 0) {
      onSend(content.trim())
      setContent("")
    }
  }

  function handleEnterPress(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex items-center gap-2 bg-white/80 border border-gray-200 rounded-2xl px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-400 transition-all">

      <input
        value={content}
        disabled={isDisable}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleEnterPress}
        type="text"
        placeholder="Type your message here..."
        className="flex-1 bg-transparent outline-none px-3 py-1 text-gray-700 text-sm md:text-base placeholder:text-gray-400"
      />

      <button
        onClick={handleSend}
        disabled={isDisable || content.trim().length === 0}
        className="bg-gradient-to-tr from-blue-600 to-indigo-600 disabled:from-gray-400 disabled:to-gray-500 p-2.5 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all"
      >
        <Sendicon />
      </button>

    </div>
  )
}

export default Control
