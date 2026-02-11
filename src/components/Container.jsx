import React from 'react'
import Chatmessage from './Chatmessage'
import Control from './Control'

const Container = ({ message, onSend }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-2 md:p-6 overflow-hidden">

      <div className="
        w-full max-w-4xl
        backdrop-blur-xl bg-white/60
        shadow-[0_20px_50px_rgba(0,0,0,0.1)] 
        rounded-3xl
        border border-white/50
        flex flex-col
        h-full
        max-h-[85vh] md:max-h-[80vh]
        overflow-hidden
        transition-all duration-500
      ">

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 custom-scrollbar">
          <Chatmessage message={message} />
        </div>

        {/* Input Area */}
        <div className="bg-white/40 backdrop-blur-md border-t border-gray-100 p-4 md:p-6">
          <Control onSend={onSend} />
          <p className="text-[10px] text-center text-gray-400 mt-2">
            AI can make mistakes. Verify important info.
          </p>
        </div>

      </div>
    </div>
  )
}

export default Container
