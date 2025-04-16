import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'





const Navbar = () => {
  const { authUser, logout } = useAuthStore()
  return (
    <header className=" bg-gradient-to-l from-blue-950 to-gray-700 text-gray-100 p-3 flex justify-between items-center">

      <h1 className="text- font-bold">Lets chat</h1>


      <nav className="space-x-4">
        {authUser && (
          <Link to="/" className="hover:text-gray-400">Home</Link>
        )}
        {authUser && (
          <Link to="/profile" className="hover:text-gray-400">Profile</Link>
        )}
        <Link to="/settings" className="hover:text-gray-400">Settings</Link>
        {authUser ? (
          <button onClick={() => {
            logout()
            
          }} className="hover:text-gray-400">Logout</button>
        ) : (
          <Link to="/login" className="hover:text-gray-400">Login</Link>
        )}
      </nav>
    </header>

  )
}

export default Navbar