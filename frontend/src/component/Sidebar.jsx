import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from './SidebarSkeleton'
import { Users } from "lucide-react";
import { useAuthStore } from '../store/useAuthStore';

const Sidebar = () => {

 const [showonlineonly, setshowonlineonly] = useState(false)
  const { getUsers, users, selecteduser, setSelectedUser, isUserloading } = useChatStore()

     const{onlineUser}=useAuthStore()
  
  useEffect(() => {
    getUsers()
  }, [getUsers])

const filterUsers= showonlineonly ? users.filter((user) => onlineUser.includes(user._id)) : users;


  if (isUserloading) return <SidebarSkeleton />

  return (
    <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200' >
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
            {/* Todo-onlinetoggle*/}
            <div className="mt-3 hidden lg:flex items-center gap-2">
                 <label className='cursor-pointer flex items-center gap-2' >
                     <input type="checkbox" 
                     className="checkbox checkbox-sm"
                      checked={showonlineonly}
                      onChange={(e) => setshowonlineonly(e.target.checked)} /> 
                      <span className="text-sm text-zinc-400">Show online only</span>
                     
                 </label>
                 <span className='text-xs text-zinc-500' >({onlineUser.length-1})</span>

            </div>
      </div>
        <div className="overflow-y-auto w-full py-3">
        {filterUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${ selecteduser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilepic || "/vite.svg"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUser.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullname}</div>
              <div className="text-sm text-zinc-400">
                {onlineUser.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
        {
         filterUsers.length ===0 && (
          <div className="text-center text-zinc-500">No online users</div>
         )
        }
        </div>

    </aside>
  )
}

export default Sidebar