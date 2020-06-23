import * as types from './mutation-types'

export const setBaseParams = function({commit}, data) {
    commit(types.SET_BASEPARAMS,data)
}

export const setFilter = function({commit}, data) {
    commit(types.SET_FILTER,data)
}

export const setCashData = function({commit}, data) {
    commit(types.SET_CASHDATA,data)
}