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
        },
        setBasket(state, payload) {
            state.basket = payload
        }
    },
    actions: {
        setLastSearch({commit}, payload) {
            localStorage.setItem('lastSearch', JSON.stringify(payload))
            commit('setLastSearch', payload)
        },
        loadStoredState({commit}) {
            const lastSearch = localStorage.getItem('lastSearch')
            if (lastSearch !== null) {
                commit('setLastSearch', JSON.parse(lastSearch))
            }

            const basket = localStorage.getItem('basket')
            if (basket !== null) {
                commit('setBasket', JSON.parse(basket))
            }
        },
        addToBasket({state, commit}, payload) {
            commit('addToBasket', payload)
            const basket = state.basket
            localStorage.setItem('basket', JSON.stringify(basket))
        },
        removeFromBasket({state, commit}, id) {
            commit('removeFromBasket', id)
            const basket = state.basket
            localStorage.setItem('basket', JSON.stringify(basket))
        }
    },
    getters: {
        itemsInBasket(state) {
            return state.basket.items.length
        },
        inBasketAlready: (state) => (id) => {
            return state.basket.items.reduce((result, item) => result || item.bookable.id === id, false)
        }
    }
}
