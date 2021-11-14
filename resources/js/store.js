export default {
    state: {
        lastSearch: {
            from: null,
            to: null
        },
        basket: {
            items: []
        }
    },
    mutations: {
        setLastSearch(state, payload) {
            state.lastSearch = payload
        },
        addToBasket(state, payload) {
            this.state.basket.items.push(payload)
        },
        removeFromBasket(state, id) {
            this.state.basket.items.filter((item) => item.id !== id)
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
    },
    getters: {
        itemsInBasket(state) {
            return state.basket.items.length
        }
    }
}
