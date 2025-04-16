import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://chat-app-b.vercel.app/api",
    withCredentials: true,

});
