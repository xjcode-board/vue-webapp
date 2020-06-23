import * as types from './mutation-types'

const mutations = {
    [types.SET_BASEPARAMS](state, params) {
        state.baseParams = params
    },
    [types.SET_FILTER](state, filter) {
        state.filter = filter
    },
    [types.SET_CASHDATA](state, cash) {
        state.cashData = cash
    },
}

export default mutations