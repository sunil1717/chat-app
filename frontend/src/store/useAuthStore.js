import {create} from 'zustand';

import {axiosInstance} from "../lib/axios.js"
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';


const BASE_URL = "http://localhost:5001";


export const useAuthStore = create((set,get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUser:[],
    socket: null,
    checkAuth:async () => {
        try {
            const res =await axiosInstance.get('/auth/check')
            set({authUser: res.data})
            get().connectSocket()
        } catch (error) {
            console.log("error in checkAuth in authstore",error);
            
            set({authUser: null})
        }finally {
            set({isCheckingAuth: false})
        }


    },
    Signup: async (data) => {
        set({isSigningUp: true})
        try {
            const res = await axiosInstance.post('/auth/signup',data)
            toast.success("Account created successfully")
            set({authUser: res.data})
            get().connectSocket()
        } catch (error) {
            console.log("error in signup in authstore",error);
            
            toast.error(error.response.data.message)
        } finally {
            set({isSigningUp: false})
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout')
            set({authUser: null})
            toast.success("Logged out successfully")
            get().disconnectSocket()
        } catch (error) {
            console.log("error in logout in authstore",error);
            toast.error(error.response.data.message)
        }
    },
    login: async (data) => {
        set({isLoggingIn: true})
        try {
            const res = await axiosInstance.post('/auth/login',data)
            set({authUser: res.data})
            toast.success("Logged in successfully")
            get().connectSocket()
        } catch (error) {
            console.log("error in login in authstore",error);
            
            toast.error(error.response.data.message)
        } finally {
            set({isLoggingIn: false})
        }
    },
    updateProfile: async (data) => {
        set({isUpdatingProfile: true})
        try {
            const res = await axiosInstance.put('/auth/update-profile',data)
            set({authUser: res.data})
            toast.success("Profile updated successfully")
        } catch (error) {
            console.log("error in updateProfile in authstore",error);
            
            toast.error(error.response.data.message)
        } finally {
            set({isUpdatingProfile: false})
        }
    },
    connectSocket: () => {
        const {authUser} = get()
        if (!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL,{
            query: {
                userId: authUser._id,
            },
            transports: ['websocket'],
            autoConnect: false,
        });
       socket.connect()
       set({socket: socket})
       socket.on("onlineUsers", (userIds) => {
            set({onlineUser: userIds})
        }
         )
    },
    disconnectSocket: () => {
        if (get().socket) {
            get().socket.disconnect();
            set({socket: null});
        }
    },
    
}));