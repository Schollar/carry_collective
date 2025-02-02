import axios from "axios";

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL

export default {
    async fetchBags() {
        return axios.get(`${API_BASE_URL}/bags`);
    },
    async fetchOrders() {
        return axios.get(`${API_BASE_URL}/orders`);
    },
    async addBag(bag) {
        return axios.post(`${API_BASE_URL}/bags`, bag);
    },
    async removeBag(bagId) {
        return axios.delete(`${API_BASE_URL}/bags/${bagId}`);
    },
    async createOrder(request) {
        return axios.post(`${API_BASE_URL}/request-bag`, request);
    },
    async approveOrder(orderId) {
        return axios.put(`${API_BASE_URL}/approve-order/${orderId}`);
    },
    async cancelOrder(orderId) {
        return axios.put(`${API_BASE_URL}/cancel-order/${orderId}`);
    },
};