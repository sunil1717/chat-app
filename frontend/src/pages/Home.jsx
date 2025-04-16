
import React from 'react'
import Sidebar from '../component/Sidebar'
import NoChatSelected from '../component/NoChatSelected'
import ChatBox from '../component/ChatBox'
import { useChatStore } from '../store/useChatStore'

const Home = () => {
    
  const {selecteduser, getUsers, getMessages} = useChatStore()
  return (
    <div className="h-screen bg-base-200">

         <div className="flex items-center justify-center pt-20 px-4">
               <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
                  <div className="flex h-full rounded-lg overflow-hidden">
                       <Sidebar/>
                       {!selecteduser ? <NoChatSelected/> : <ChatBox/>}
                  </div>
               </div>
         </div>



    </div>
  )
}

export default Home