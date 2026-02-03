import React from 'react'
import Chatmessage from './Chatmessage'
import Control from './Control'

const Container = ({ message, onSend }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">

      <div className="w-full max-w-3xl backdrop-blur-lg bg-white/70 shadow-xl rounded-3xl flex flex-col overflow-hidden border border-white/40">

        {/* Messages */}
        <div className="flex-1 p-5 overflow-y-auto h-[520px]">
          <Chatmessage message={message} />
        </div>

        {/* Input */}
        <div className="bg-white/80 border-t p-4">
          <Control onSend={onSend} />
        </div>

      </div>
    </div>
  )
}

export default Container
