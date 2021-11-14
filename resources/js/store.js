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
            state.basket.items.push(payload)
        },
        removeFromBasket(state, id) {
            state.basket.items = state.basket.items.filter((item) => item.bookable.id !== id)
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
        },
        inBasketAlready: (state) => (id) => state.basket.items.reduce((result, item) => result || item.bookable.id === id, false)
    }
}
