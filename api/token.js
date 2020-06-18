//登录验证拦截


import http from './http.js'
let token = uni.getStorageSync('token')
console.log('token：'+token)
if(!token){
	uni.reLaunch({
		url: '../login/login'
	});
}
	uni.request({
	url:http.server_path+http.token,
	method:'POST',
	header:{
		'token':token
	},
	success: (res) => {
		// console.log(res)
		if (res.data.success == false) {
			uni.showModal({
				title: '登录异常',
				content: '您未登录，需要登录后才能继续',
				showCancel: false,
				success: (res) => {
					if (res.confirm) {
						
							uni.reLaunch({
								url: '../login/login'
							});
						
					}
				}
			});
		}
	},
	fail: (res) => {
		uni.reLaunch({
			url: '../login/login'
		});
	}
})

