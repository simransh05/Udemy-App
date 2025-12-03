import axios from 'axios'
const base_url = import.meta.env.VITE_BASE_URL;
const api = {
    postSignup : async (data) =>{
        return await axios.post(`${base_url}/signup`,data)
    },
    postLogin : async (data) =>{
        return await axios.post(`${base_url}/login`,data)
    }
}

export default api;