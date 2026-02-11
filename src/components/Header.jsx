import React from 'react'

const Header = ({ onMenuClick }) => {
  return (
    <div className="flex flex-col items-center justify-center pt-4 pb-2 px-4 relative">
      
      {/* Mobile Menu Button */}
      <button 
        onClick={onMenuClick}
        className="absolute left-4 top-6 p-2 rounded-lg bg-white shadow-sm border border-gray-100 md:hidden hover:bg-gray-50 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <img
        src="./chat.gif"
        alt="Chat Bot"
        className="h-20 md:h-28 drop-shadow-xl animate-bounce-slow"
      />

      <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text">
        Smart ChatBot
      </h2>

      <p className="text-gray-400 text-xs md:text-sm font-medium mt-1 tracking-wide uppercase">
        Powered by AI ✨
      </p>

    </div>
  )
}

export default Header
