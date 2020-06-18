import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: true,
		hasLogin: false,
		userName: ""
	},
	mutations:{
		login(state,userName){
			state.userName = userName || '新用户';
			state.hasLogin = true;
			console.log('kkkkkk')
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
		}
	}
})

export default store


/* let data = {
	success:true,
	msg:'标识符',
	data:{
		userInfo:'····',
		sex:'男'
	},
	token:'·········'
} */