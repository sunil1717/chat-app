import {create} from 'zustand';
import {axiosInstance} from "../lib/axios.js"
import toast from 'react-hot-toast';
import { useAuthStore } from './useAuthStore.js';





export const useChatStore = create((set,get) => ({
  messages: [],
  users: [],
  isUserloading: false,
  isMessageloading: false,
  
  selecteduser: null,
  

  getUsers: async () => {
    set({ isUserloading: true });
    try {
      const response = await axiosInstance.get('/message/users');
      set({ users: response.data });
    } catch (error) {
      
      toast.error(error.response.data.message);
    }finally {
      set({ isUserloading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessageloading:  true });
    try {
      const response = await axiosInstance.get(`/message/${userId}`);
        set({ messages: response.data });
      
    } catch (error) {
        toast.error(error.response.data.message);
    }finally {
      set({ isMessageloading: false });
    }
  },
  

  sendMessage: async (data)=>{
    const {selecteduser,messages} =get()
    try {
        const res = await axiosInstance.post(`/message/send/${selecteduser._id}`,data)
        set({messages:[...messages,res.data]})
    } catch (error) {
        toast.error(error.response.data.message);
    }

  },

 subToMessage:()=>{
      const{selecteduser,messages}=get()
      if(!selecteduser) return;
      const socket =useAuthStore.getState().socket


      socket.on("receiveMessage", (newMessage) => {
        if(newMessage.senderId !== selecteduser._id) return;
        set({messages:[...get().messages,newMessage]})
      })
  },

  unsubFromMessage:()=>{
      const socket =useAuthStore.getState().socket
      socket.off("receiveMessage")
  },






  setSelectedUser: (selecteduser) => set({ selecteduser}),




}));