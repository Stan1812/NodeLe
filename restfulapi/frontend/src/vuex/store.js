import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '123214141',
        currentId: 0
    },
    mutations: {
        getdetail(state, payload) {
            this.state.currentId = payload.currentId
        }
    }
})