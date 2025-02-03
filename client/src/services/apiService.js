import axios from "axios";

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

export default {
    async fetchBags() {
        return axios.get(`${API_BASE_URL}/api/bags`);
    },
    async fetchOrders() {
        return axios.get(`${API_BASE_URL}/api/orders`);
    },
    async addBag(bag) {
        return axios.post(`${API_BASE_URL}/api/bags`, bag);
    },
    async removeBag(bagId) {
        return axios.delete(`${API_BASE_URL}/api/bags/${bagId}`);
    },
    async createOrder(request) {
        return axios.post(`${API_BASE_URL}/api/request-bag`, request);
    },
    async approveOrder(orderId) {
        return axios.put(`${API_BASE_URL}/api/approve-order/${orderId}`);
    },
    async cancelOrder(orderId) {
        return axios.put(`${API_BASE_URL}/api/cancel-order/${orderId}`);
    },
};