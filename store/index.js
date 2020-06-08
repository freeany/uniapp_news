import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		historyLists: uni.getStorageSync('news_history') || []
	},
	mutations: {
		SET_HISTORYLISTS(state, list) {
			state.historyLists = list
		},
		CLEAR_HISTORYLISTS(state) {
			state.historyLists = []
		}
	},
	actions: {
		SET_HISTORYLISTS({commit, state}, history) {
			let list = [...state.historyLists]
			list.unshift(history)
			commit('SET_HISTORYLISTS',list)
			uni.setStorageSync('news_history',list)
		},
		CLEAR_HISTORYLISTS({commit}) {
			commit('CLEAR_HISTORYLISTS')
			uni.removeStorageSync('news_history')
		}
	}
})

export default store