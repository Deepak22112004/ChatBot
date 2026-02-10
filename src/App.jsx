import React, { useEffect, useMemo, useState } from 'react'
import Header from './Header'
import Container from './Container'
import { GoogleGenerativeAI } from "@google/generative-ai"
import Loader from './Loader'
import Sidebar from './Sidebar'

const CHATS = [
  { id: 2, title: "How to use AI tools API in React Application",
    messages:[
      {role:"user",content:"what is better chatgpt or gemini"},
      {role:"assistant",content:"Hi! can you explain for what type of tasks you will use it?"}
    ]
  },
  { id: 4, title: "How to use AI tools API in React Application",
    messages:[
      {role:"user",content:"Hey! how to use ai in my life?"},
      {role:"assistant",content:"Hi! would you like to use it for work for hobbies?"}
    ]
  },
]

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
  const [chat, setChats] = useState(CHATS)
  const [activechatid, setActivechatid] = useState(2)

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
    <div className="h-screen flex overflow-hidden">

      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <Sidebar chat={chat}
          activechatid={activechatid}
          onActivechatidChange={handleActivechat}
          onhandlecreatechat={handlecreatenewchat}
          onActivechat={activeChanges}
          

        />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {isloading && <Loader />}
        <Header />
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
