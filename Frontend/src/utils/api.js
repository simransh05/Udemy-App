import axios from 'axios'
import ROUTES from '../Constant/Routes';
const base_url = import.meta.env.VITE_BASE_URL;
const api = {
    postSignup: async (data) => {
        return await axios.post(`${base_url}${ROUTES.SIGNUP}`, data)
    },
    postLogin: async (data) => {
        return await axios.post(`${base_url}${ROUTES.LOGIN}`, data)
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
        return await axios.post(`${base_url}${ROUTES.CART}`, data)
    },
    postFav: async (data) => {
        return await axios.post(`${base_url}${ROUTES.FAV}`, data)
    },
    getCart: async (userId) => {
        return await axios.get(`${base_url}${ROUTES.CART}/${userId}`)
    },
    getFav: async (userId) => {
        return await axios.get(`${base_url}${ROUTES.FAV}/${userId}`)
    },
    deleteCartItem: async (data) => {
        return await axios.delete(`${base_url}${ROUTES.CART}`, { data })
    },
    deleteFavItem: async (data) => {
        return await axios.delete(`${base_url}${ROUTES.FAV}`, { data })
    },
    postLearn: async (data) => {
        return await axios.post(`${base_url}${ROUTES.LEARN}`, data)
    },
    getLearn: async (userId) => {
        return await axios.get(`${base_url}${ROUTES.LEARN}/${userId}`)
    },
    getIndividualLearn: async (cardId) => {
        return await axios.get(`${base_url}${ROUTES.INDIVIDUAL_LEARN}/${cardId}`)
    },
    deleteCardItem: async (cardId) => {
        return await axios.delete(`${base_url}/${cardId}`)
    },
    getGuestCart: async (ids) => {
        return await axios.post(`${base_url}${ROUTES.GUEST}`, ids);
    },
    addGuestCart: async (ids) => {
        return await axios.post(`${base_url}${ROUTES.GUEST}`, ids);
    },
    addRating: async (data) => {
        return await axios.post(`${base_url}${ROUTES.RATING}`, data);
    }
}

export default api;