export default {
    state: {
        lastSearch: {
            from: null,
            to: null
        }
    },
    mutations: {
        setLastSearch(state, payload) {
            state.lastSearch = payload
        }
    },
    actions: {
        setLastSearch({commit}, payload) {
            localStorage.setItem('lastSearch', JSON.stringify(payload))
            commit('setLastSearch', payload)
        },
        loadStoredState({commit}) {
            const storedState = localStorage.getItem('lastSearch')
            if (storedState !== null) {
                commit('setLastSearch', JSON.parse(storedState))
            }
        }
    }
}
