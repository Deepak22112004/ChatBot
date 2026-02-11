import React, { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Container from './components/Container'
import { GoogleGenerativeAI } from "@google/generative-ai"
import Loader from './components/Loader'
import Sidebar from './components/Sidebar'



// ✅ spelling fixed here
const googleai = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY)

const gemini = googleai.getGenerativeModel({
  model: "gemini-3-flash-preview"
})

// ✅ renamed to avoid collision with state
const geminiChat = gemini.startChat({ history: [] })

const App = () => {

  const [message, setMessage] = useState([])
  const [isloading, setIsloading] = useState(false)
  const [chat, setChats] = useState([])
  const [activechatid, setActivechatid] = useState()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const activeChanges = useMemo(
    ()=> chat.find(({id})=>id===activechatid)?.messages ?? [],
    [chat, activechatid]
  )

  useEffect(()=>{
    setMessage(activeChanges)
  },[activechatid])

  useEffect(()=>{
    handleChatmessage(message)
  },[message])
  
  useEffect(()=>{
    handlecreatenewchat();


  },[])
   
  function handleDeleteChat(idToDelete) {
  setChats(prev => {
    const updated = prev.filter(chat => chat.id !== idToDelete)

    // switch active chat if current one was deleted
    if (idToDelete === activechatid) {
      setActivechatid(updated.length ? updated[0].id : null)
    }

    return updated
  })
}


  function handlecreatenewchat(){
    const newid=Date.now();
    setChats(prevChats => [
      ...prevChats,
      { id: newid, messages: [] }
    ]) 
    setActivechatid(newid) 



  }
  function handleActivechat(id) {
  setActivechatid(id)

  setChats(prevChats =>
    prevChats.filter(chat => chat.messages && chat.messages.length > 0)
  )
}


  function handleChatmessage(message) {
    updateMessage(message)
  }

  function updateMessage(message ) {
    const title = message[0]?.content.split(" ").slice(0,7).join(" ")

    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === activechatid
          ? { ...chat, title:chat.title??title,messages: message }
          : chat
      )
    )
  }

  function AddMessage(message) {
    setMessage(prev => [...prev, message])
  }

  async function handleContentChange(content) {
    AddMessage({ content, role: "user" })
    setIsloading(true)

    try {
      // ✅ use geminiChat here
      const result = await geminiChat.sendMessage(content)

      AddMessage({
        content: result.response.text(),
        role: "assistant"
      })

    } catch (error) {
      console.error(error)
      AddMessage({
        content: "Sorry, I couldn't process your request. Please try again!",
        role: "system"
      })
    } finally {
      setIsloading(false)
    }
  }

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden relative">

      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-72 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <Sidebar 
          chat={chat}
          activechatid={activechatid}
          onActivechatidChange={(id) => {
            handleActivechat(id);
            setIsSidebarOpen(false); // Close on selection in mobile
          }}
          onhandlecreatechat={() => {
            handlecreatenewchat();
            setIsSidebarOpen(false); // Close on new chat in mobile
          }}
          onActivechat={activeChanges}
          onClose={() => setIsSidebarOpen(false)}
           onDeleteChat={handleDeleteChat}
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {isloading && <Loader />}
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <Container
          isDisable={isloading}
          message={message}
          onSend={handleContentChange}
        />
      </div>

    </div>
  )
}

export default App
