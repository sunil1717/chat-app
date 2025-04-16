import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import Chatheader from "./Chatheader"
import Messageinput from "./Messageinput"
import MessageSkeleton from "./MessageSkeleton"
import { useAuthStore } from '../store/useAuthStore'
import { formatMessageTime } from '../lib/utils'



const ChatBox = () => {
  const { messages, getMessages, isMessageloading, selecteduser,subToMessage,unsubFromMessage} = useChatStore()
  const { authUser } = useAuthStore()
  const messagesEndRef = useRef(null)


  useEffect(() => {
    getMessages(selecteduser._id)
    subToMessage()
    return () => unsubFromMessage()
  }, [getMessages, selecteduser._id,subToMessage,unsubFromMessage])

   useEffect(() => {
      
        if(messagesEndRef.current && messages) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
        
     
   }, [messages])
   

  if (isMessageloading) return (
    <div className='flex flex-1 flex-col overflow-auto' >
      <Chatheader />

      <MessageSkeleton />

      <Messageinput />
    </div>
  )





  return (
    <div className="flex flex-1 flex-col overflow-auto ">
      <Chatheader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message._id} className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"} `} ref={messagesEndRef}>

            <div className="chat-image avatar ">
              <div className="size-10 rounded-full border">
                <img src={message.senderId === authUser._id ? authUser.profilepic || "/vite.svg" : selecteduser.profilepic || "/vite.svg"} alt="" />
              </div>
            </div>
             <div className="chat-header mb-1">
               <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
               </time>

             </div>
             <div className="chat-bubble flex flex-col">
                {message.image &&(
                  <img src={message.image} alt="" className='sm:max-w-[200px] rounded-md mb-2' />
                )}
                {message.text && <p>{message.text}</p>}
             </div>

          </div>
        ))}
      </div>




      <Messageinput />
    </div>
  )
}

export default ChatBox