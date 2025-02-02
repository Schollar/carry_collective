import { createStore } from 'vuex'; // Import createStore from 'vuex'
import bags from './modules/bags';
import orders from './modules/orders';
import user from './modules/user';

// Create the Vuex store
const store = createStore({
    state() {
        return {
            isDark: true, // Example state
        };
    },
    mutations: {
        toggleTheme(state) {
            state.isDark = !state.isDark;
        },
    },
    getters: {
        theme(state) {
            return state.isDark ? 'dark' : 'light';
        },
    },
    modules: {
        // Import modules here
        bags,
        orders,
        user
    },
});

export default store; // Export the store