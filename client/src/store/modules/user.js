export default {
    namespaced: true,
    state: {
        user: null,
        isAdmin: false,
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
            state.isAdmin = user === "schollar"; // Replace with proper role check
        },
    },
    actions: {
        login({ commit }, user) {
            commit("SET_USER", user);
        },
    },
};