import React, { useEffect, useMemo, useRef } from 'react'
import Markdown from "react-markdown"

const welcome_group = [
  {
    role: "assistant",
    content: "Hello 👋 How can I help you today?"
  }
]

const Chatmessage = ({ message }) => {
  const messageref = useRef(null)

  const messagegroup = useMemo(() => {
    return message.reduce((group, msg) => {
      if (msg.role === "user") group.push([])
      if (group.length === 0) group.push([])
      group[group.length - 1].push(msg)
      return group
    }, [])
  }, [message])

  useEffect(() => {
    messageref.current?.scrollIntoView({ behavior: "smooth" })
  }, [message])

  return (
    <div className="flex flex-col gap-3">
      {[welcome_group, ...messagegroup].map((group, idx) => (
        <div key={idx} className="flex flex-col gap-2 min-h-[calc(100%-8px)]">
          {group.map(({ role, content }, index) => (
            <div
              key={index}
              className={`flex items-end gap-2 ${
                role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {role !== "user" && (
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  AI
                </div>
              )}

              <div
                className={`px-4 py-2 rounded-2xl max-w-[70%] shadow-sm
                ${
                  role === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                <Markdown>{content}</Markdown>
              </div>
            </div>
          ))}
        </div>
      ))}

      <div ref={messageref} />
    </div>
  )
}

export default Chatmessage
