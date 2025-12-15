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
    },
    postCart: async (data) => {
        return await axios.post(`${base_url}/cart`, data)
    },
    postFav: async (data) => {
        return await axios.post(`${base_url}/fav`, data)
    },
    getCart: async (userId) => {
        return await axios.get(`${base_url}/cart/${userId}`)
    },
    getFav: async (userId) => {
        return await axios.get(`${base_url}/fav/${userId}`)
    },
    deleteCartItem: async (data) => {
        return await axios.delete(`${base_url}/cart`, { data })
    },
    deleteFavItem: async (data) => {
        return await axios.delete(`${base_url}/fav`, { data })
    },
    postLearn: async (data) => {
        return await axios.post(`${base_url}/learn`, data)
    },
    getLearn: async (userId) => {
        return await axios.get(`${base_url}/learn/${userId}`)
    },
    getIndividualLearn: async (cardId) => {
        return await axios.get(`${base_url}/individualLearn/${cardId}`)
    },
    deleteCardItem: async (cardId) => {
        return await axios.delete(`${base_url}/${cardId}`)
    },
    getGuestCart: async (ids) => {
        return await axios.post(`${base_url}/guest`, ids);
    },
    addGuestCart: async (ids) => {
        return await axios.post(`${base_url}/login-guest`, ids);
    },
    addRating: async (data) => {
        return await axios.post(`${base_url}/rating`, data);
    }
}

export default api;