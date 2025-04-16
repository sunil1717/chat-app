import React from 'react'
import {useAuthStore} from '../store/useAuthStore'
import {Camera, Mail, User} from 'lucide-react'
import { useState } from 'react'
import imageCompression from 'browser-image-compression';



const Profile = () => {
    const {authUser,updateProfile,isUpdatingProfile} = useAuthStore()
   const [selectedimage, setselectedimage] = useState(null)
    
    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        if(!file) return
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 800,
          useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);

        reader.onload = async () => {
            const base64Image = reader.result;
            setselectedimage(base64Image);
            await updateProfile({ profilepic: base64Image });
        };
    } catch (err) {
        console.error('Image compression error:', err);
    }
    }




  return (
    <div  className='h-screen pt-20' >
          <div className="max-w-2xl mx-auto p-4 py-8">
              <div className="bg-base-300 rounded-xl p-6 space-y-8">
                   <div className="text-center">
                      <h1 className="text-3xl font-semibold">Profile</h1>
                      <p className=" mt-2 text-gray-500">Update your profile information</p>
                   </div>
                    
                    <div className="flex flex-col items-center gap-4">
                         <div className="relative">
                            <img src={ selectedimage||authUser.profilepic || "/vite.svg"} alt="profile"  className='size-32 rounded-full object-cover border-4' />
                             <label htmlFor="avatar-upload"
                              className={`absolute bottom-0 right-0 bg-base-content p-2 rounded-full cursor-pointer hover:scale-105 transition-all duration-200 ${isUpdatingProfile ? "animate-pulse pointer-events-none":""}`}>

                                <Camera className='w-5 h-5 text-base-200'  />
                                 <input type="file" 
                                 id='avatar-upload'
                                 className='hidden'
                                 accept='image/*'
                                 onChange={handleUpdateProfile}
                                 disabled={isUpdatingProfile}/>
                              </label>
                              
                         </div>
                         <p className="text-sm text-zinc-400">
                           {isUpdatingProfile ? "Updating profile..." : "Click on the camera icon to change your profile picture"}
                         </p>

                    </div>
                     <div className="space-y-6">
                         <div className="space-y-1 5">
                              <div className="text-sm text-zinc-400 flex items-center gap-2">
                                  <User className='w-4 h-4 '/>
                                  Full Name
                              </div>
                              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullname}</p>

                         </div>
                         <div className="space-y-1 5">
                              <div className="text-sm text-zinc-400 flex items-center gap-2">
                                  <Mail className='w-4 h-4 '/>
                                  Email Address
                              </div>
                              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>

                         </div>
                         
                        
                     </div>
                     <div className="mt-6 bg-base-300 rounded-xl p-6">
                        <h2 className='text-lg font-medium mb-4 ' >Account Information</h2>
                        <div className="space-y-3 text-sm">
                           <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                              <span>Member Since</span>
                              <span>{authUser.createdAt?.split("T")[0]}</span>
                           </div>
                           <div className="flex items-center justify-between py-2 ">
                              <span>Account Status</span>
                              <span className='text-green-500' >Active</span>
                           </div>
                        </div>
                     </div>
                    

              </div>


          </div>


    </div>
  )
}

export default Profile