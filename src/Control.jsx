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
    <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2 shadow-inner">

      <input
        value={content}
        disabled={isDisable}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleEnterPress}
        type="text"
        placeholder="Type your message..."
        className="flex-1 bg-transparent outline-none px-2"
      />

      <button
        onClick={handleSend}
        disabled={isDisable}
        className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full shadow-md hover:scale-110 transition"
      >
        <Sendicon />
      </button>

    </div>
  )
}

export default Control
