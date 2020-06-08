import Vue from 'vue'
import App from './App'
import $api from './common/api/index.js'
import store from './store/index.js'

Vue.config.productionTip = false

Vue.prototype.$api = $api

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
