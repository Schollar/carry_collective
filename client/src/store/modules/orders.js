import apiService from "../../services/apiService";

export default {
    namespaced: true,
    state: {
        orders: [],
    },
    mutations: {
        SET_ORDERS(state, orders) {
            state.orders = orders;
        },
        APPROVE_ORDER(state, orderId) {
            const order = state.orders.find((o) => o.id === orderId);
            if (order) order.status = "approved";
        },
        CANCEL_ORDER(state, orderId) {
            const order = state.orders.find((o) => o.id === orderId);
            if (order) order.status = "cancelled";
        },
        ADD_ORDER(state, order) {
            state.orders.push(order.order);
        }
    },
    actions: {
        async fetchOrders({ commit }) {
            const response = await apiService.fetchOrders();
            commit("SET_ORDERS", response.data);
        },
        async approveOrder({ commit }, orderId) {
            await apiService.approveOrder(orderId);
            commit("APPROVE_ORDER", orderId);
        },
        async cancelOrder({ commit }, orderId) {
            await apiService.cancelOrder(orderId);
            commit("CANCEL_ORDER", orderId);
        },
        async createOrder({ commit }, payload) {
            try {
                const response = await apiService.createOrder(payload); // Pass the payload to the API service
                commit('ADD_ORDER', response.data); // Assuming you have an ADD_ORDER mutation
            } catch (error) {
                console.error('Error requesting bag:', error);
                throw error; // Re-throw the error for handling in the component
            }
        },
    },
};