import React from 'react'

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex justify-center items-center bg-amber-100/60">
      <div className="loader"></div>
    </div>
  )
}

export default Loader
