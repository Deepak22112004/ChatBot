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
  <div className="flex flex-col gap-6">
    {[welcome_group, ...messagegroup].map((group, idx) => (
      <div key={idx} className="flex flex-col gap-4">
        {group.map(({ role, content }, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 ${
              role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shadow-md
              ${role === "user" 
                ? "bg-gradient-to-tr from-blue-600 to-indigo-600 text-white" 
                : "bg-white text-purple-600 border border-purple-100"
              }`}
            >
              {role === "user" ? "ME" : "AI"}
            </div>

            {/* Bubble */}
            <div
              className={`px-5 py-3 rounded-2xl max-w-[85%] md:max-w-[75%] shadow-sm leading-relaxed
              ${
                role === "user"
                  ? "bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-tr-none"
                  : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
              }`}
            >
              <div className="prose prose-sm md:prose-base max-w-none prose-p:leading-relaxed prose-pre:bg-gray-800 prose-pre:text-gray-100">
                <Markdown >{content}</Markdown>
              </div>
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
