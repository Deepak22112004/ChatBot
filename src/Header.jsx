import React from 'react'

const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-6 pb-2">

      <img
        src="./chat.gif"
        alt="Chat Bot"
        className="h-40 drop-shadow-lg"
      />

      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        Smart ChatBot
      </h2>

      <p className="text-gray-500 text-sm mt-1">
        Ask anything, anytime ✨
      </p>

    </div>
  )
}

export default Header
