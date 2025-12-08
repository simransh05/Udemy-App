import axios from 'axios'
const base_url = import.meta.env.VITE_BASE_URL;
const api = {
    postSignup: async (data) => {
        return await axios.post(`${base_url}/signup`, data)
    },
    postLogin: async (data) => {
        return await axios.post(`${base_url}/login`, data)
    },
    getCards: async (formatted) => {
        return await axios.get(`${base_url}/${formatted}`)
    },
    postCard: async (entireData) => {
        return await axios.post(`${base_url}`, entireData);
    },
    getAllCards: async () => {
        return await axios.get(`${base_url}`);
    }
}

export default api;