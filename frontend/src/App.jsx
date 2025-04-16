import React, { useEffect } from 'react'
import Navbar from './component/Navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Setting from './pages/Setting'
import Profile from './pages/Profile'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'




const App = () => {


  const { authUser, checkAuth, isCheckingAuth,onlineUser } = useAuthStore()

 
 

  useEffect(() => {
    checkAuth()
  }, [checkAuth])




  if (isCheckingAuth && !authUser) {
    return <div className='flex justify-center items-center h-screen'>
      <Loader className="size-10 animate-spin" />
    </div>
  }




  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />


      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default App