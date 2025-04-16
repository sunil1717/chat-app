import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://chat-app-3-kaob.onrender.com/api",
    withCredentials: true,

});
