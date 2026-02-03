import React, { useState } from 'react'
import Header from './Header'
import Container from './Container'
import {GoogleGenerativeAI} from "@google/generative-ai"
import Loader from './Loader'

const googleai=new GoogleGenerativeAI(import.meta.env.VITE_GOGGLE_AI_API_KEY)
  const gemini=googleai.getGenerativeModel({model:"gemini-3-flash-preview"})
  const chat=gemini.startChat({history:[]})



const App = () => {
  
  
  const [message, setMessage] = useState([])
  const [isloading, setIsloading] = useState(false)
  function AddMessage(message){
        setMessage((prevMessage)=>[...prevMessage,message])


  }
  async function  handleContentChange(content){
    AddMessage({content,role:"user"});
    setIsloading(true)
    try{
      const result = await chat.sendMessage(content)
      AddMessage({content: result.response.text(),role:"assistant"})
    }catch(error){
            AddMessage({content:"Sorry,I could'nt process your request.Please try Again!!",
              role:"System"})

    }finally{
      setIsloading(false)
    }

  }
  return (
    <div>
      {isloading && <Loader/>}
      <div className=''>
      
      <Header/>
<Container isDisable={isloading} message={message} onSend={handleContentChange} />
    </div>
    </div>
  )
}


export default App