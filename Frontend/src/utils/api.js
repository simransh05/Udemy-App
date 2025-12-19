import ROUTES from '../Constant/Routes';
import apiInstance from './apiInstance';
const base_url = import.meta.env.VITE_BASE_URL;

const api = {
    postSignup: async (data) => {
        return await apiInstance.post(`${ROUTES.SIGNUP}`, data)
    },
    postLogin: async (data) => {
        return await apiInstance.post(`${ROUTES.LOGIN}`, data)
    },
    getCards: async (formatted) => {
        return await apiInstance.get(`${formatted}`)
    },
    postCard: async (entireData) => {
        return await apiInstance.post(`/`, entireData);
    },
    getAllCards: async () => {
        return await apiInstance.get(`/`);
    },
    postCart: async (data) => {
        return await apiInstance.post(`${ROUTES.CART}`, data)
    },
    postFav: async (data) => {
        return await apiInstance.post(`${ROUTES.FAV}`, data)
    },
    getCart: async (userId) => {
        return await apiInstance.get(`${ROUTES.CART}/${userId}`)
    },
    getFav: async (userId) => {
        return await apiInstance.get(`${ROUTES.FAV}/${userId}`)
    },
    deleteCartItem: async (data) => {
        return await apiInstance.delete(`${ROUTES.CART}`, { data })
    },
    deleteFavItem: async (data) => {
        return await apiInstance.delete(`${ROUTES.FAV}`, { data })
    },
    postLearn: async (data) => {
        return await apiInstance.post(`${ROUTES.LEARN}`, data)
    },
    getLearn: async (userId) => {
        return await apiInstance.get(`${ROUTES.LEARN}/${userId}`)
    },
    getIndividualLearn: async (cardId) => {
        return await apiInstance.get(`${ROUTES.INDIVIDUAL_LEARN}/${cardId}`)
    },
    deleteCardItem: async (cardId) => {
        return await apiInstance.delete(`/${cardId}`)
    },
    getGuestCart: async (ids) => {
        return await apiInstance.post(`${ROUTES.GUEST}`, ids);
    },
    addGuestCart: async (ids) => {
        return await apiInstance.post(`${ROUTES.GUEST}`, ids);
    },
    addRating: async (data) => {
        return await apiInstance.post(`${ROUTES.RATING}`, data);
    },
    logout : async ()=>{
        return await apiInstance.post(`${ROUTES.LOGOUT}`);
    },
    getUser : async ()=>{
        return await apiInstance.get(`${ROUTES.USER}`);
    },
}

export default api;