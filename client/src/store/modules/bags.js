import apiService from '../../services/apiService'; // Import the centralized API service

const state = {
    bags: [], // Initialize bags as an empty array
};

const mutations = {
    SET_BAGS(state, bags) {
        state.bags = bags;
    },
    ADD_BAG(state, bag) {
        state.bags.push(bag);
    },
    REMOVE_BAG(state, bagId) {
        state.bags = state.bags.filter((bag) => bag.id !== bagId);
    },
};

const actions = {
    async fetchBags({ commit }) {
        try {
            const bags = await apiService.fetchBags(); // Use the centralized API service
            commit('SET_BAGS', bags);
        } catch (error) {
            console.error('Error fetching bags:', error);
        }
    },
    async addBag({ commit }, bag) {
        try {
            const newBag = await apiService.addBag(bag); // Use the centralized API service
            commit('ADD_BAG', newBag);
        } catch (error) {
            console.error('Error adding bag:', error);
        }
    },
    async removeBag({ commit }, bagId) {
        try {
            await apiService.removeBag(bagId); // Use the centralized API service
            commit('REMOVE_BAG', bagId);
        } catch (error) {
            console.error('Error removing bag:', error);
        }
    }

};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};