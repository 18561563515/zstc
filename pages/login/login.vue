<template>
	<view class="content">
		<text class="login-title">Welcome</text>
		<view class="login-img-content">
			<image src="../../static/img/login-sigan.png" mode="widthFix" class="login-img"></image>
		</view>
		<view class="login-content">
			<view class="login-input">
				<image src="../../static/icon/username.png" mode="widthFix" class="username-icon"></image>
				<input type="text" value="" placeholder="请输入用户名" class="login-input-txt" placeholder-class="placeholder-input"
				 v-model="user" />
				<icon type="clear" size="18" v-if="isUserClearShow" @click="clearUser" />
			</view>
			<view class="login-input">
				<image src="../../static/icon/password.png" mode="widthFix" class="username-icon"></image>
				<input type="password" value="" placeholder="请输入密码" class="login-input-txt" placeholder-class="placeholder-input"
				 v-model="password" @confirm="loginCheck" />
				<icon type="clear" size="18" v-if="isPasswordClearShow" @click="clearPassword" />
			</view>
			<button type="default" class="login-btn" @click="loginCheck">登 录</button>
		</view>
	</view>
</template>

<script>
	/* import {
		mapState,
		mapMutations
	} from 'vuex' */
	import http from '../../api/http.js'
	export default {
		data() {
			return {
				user: '',
				password: '',
				isUserClearShow: false,
				isPasswordClearShow: false
			}
		},
		onLoad() {
			// console.log(http.server_path)
			/* 站内消息初始化 */
			if (!uni.getStorageSync('yiyuedu')) {
				uni.setStorageSync('yiyuedu',0)
			}
			
		},
		computed: {
			// ...mapState(['hasLogin']),

		},
		methods: {
			// ...mapMutations(['login']),
			clearUser() {
				this.user = ''
			},
			clearPassword() {
				this.password = ''
			},
			loginCheck() {
				let user = this.user.trim()
				if (user && this.password) {
					uni.showLoading({
						title:'正在登录',
						mask: true
					})
					uni.request({
						url: http.server_path + http.denglu,
						method: 'POST',
						data: {
							User_Code: this.user,
							User_Pwd: this.password
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded',
							// 'content-type': 'application/json',
							// 'Authentication-Token':''
						},
						success: (e) => {
							console.log(e)
							// console.log(JSON.parse(e.data.data))
							if (e.data.success) { //密码正确
								uni.hideLoading()
								uni.showToast({
									title:e.data.msg,
									icon:'none',
								})
								setTimeout(()=>{
									/* 跳到home页面 */
								uni.reLaunch({
										url: '../home/home'
								})
								},1000)
								// this.login('kwan')
								uni.setStorageSync('token', JSON.parse(e.data.data).token)
								uni.setStorageSync('User_Info', JSON.parse(e.data.data))
								
								
							} else { //密码错误
								uni.showToast({
									title: e.data.msg,
									icon: 'none'
								})
							}
						},
						fail: (e) => {
							console.log(e)
							uni.showToast({
								title: e.data.msg,
								icon: 'none'
							})
						}
					})
				} else {
					uni.showToast({
						title: '请输入用户名和密码',
						icon: 'none',
						mask: true
					})
				}
			}
		},
		watch: {
			user() {
				if (this.user == '') {
					this.isUserClearShow = false
				} else {
					this.isUserClearShow = true
				}
			},
			password() {
				if (this.password == '') {
					this.isPasswordClearShow = false
				} else {
					this.isPasswordClearShow = true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-title {
		font-size: 68rpx;
		color: #337dff;
		line-height: 50rpx;
		margin-top: 100rpx;
		margin-bottom: 50rpx;
	}

	.login-content {
		width: 500rpx;
		display: flex;
		flex-direction: column;

		.login-input {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 10rpx 30rpx;
			height: 70rpx;
			border: 1px solid #337dff;
			border-radius: 15rpx;
			margin-top: 40rpx;
		}

		.username-icon {
			width: 40rpx;
			height: 40rpx;
			margin-right: 20rpx;
		}

		.login-input-txt {
			flex: 1;
			color: #337dff;
		}

		.placeholder-input {
			color: #B3B3B3;
		}

		.login-btn {
			width: 100%;
			margin-top: 90rpx;
			color: #fff;
			background: #337dff;
		}
	}
</style>
