import Vue from 'vue'
import App from './App'

import store from './store'

Vue.config.productionTip = false

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	
    ...App,
		store
})
app.$mount()


/* 目录结构 */
/* 
 *index 首页（tab）
 * login 登录页
 * my 用户中心（tab）
 * apply 预约申请（tab）
 * detail 详情页
 * appointment 预约表单填写
 */