<template>
	<view class="content">
		<view class="top-content">
			<uni-nav-bar left-icon="back" title="个人信息" @clickLeft="fanhui"></uni-nav-bar>
		</view>


		<view class="tab-content">
			<view class="neirong">
				<text class="xiugaimima">修改账户密码</text>
				<view class="xiangqing">
					<view>
						<image src="../../static/icon/icon_key.png" mode="widthFix" class="icon1"></image>
						<text>原登陆密码</text>
					</view>
					<view>
						<input type="password" value="" placeholder="请输入原登陆密码" placeholder-class="tips" class="shurumima" v-model="oldpassword" />
					</view>
				</view>

				<view class="xiangqing" >
					<view>
						<image src="../../static/icon/icon_key.png" mode="widthFix" class="icon1"></image>
						<text>设置新密码</text>
					</view>
					<view class="animated" :class="{shake:zhen1}">
						<input type="password" value="" placeholder="请输入新登陆密码" placeholder-class="tips" class="shurumima" v-model="newpassword1" @blur="changdujiance1"/>
					</view>
				</view>

				<view class="xiangqing">
					<view>
						<image src="../../static/icon/icon_key.png" mode="widthFix" class="icon1"></image>
						<text>确认新密码</text>
					</view>
					<view class="animated" :class="{shake:zhen2}">
						<input type="password" value="" placeholder="请再次输入新登陆密码" placeholder-class="tips" class="shurumima" v-model="newpassword2" @blur="changdujiance2"/>
					</view>
				</view>
			</view>
		</view>

		<view class="fix-btn" @click="xiugaimima">
			提交
		</view>

	</view>
</template>

<script>
	import http from '../../api/http.js'
	import token from '../../api/token.js'
	import pageback from '../../api/pageback.js'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				oldpassword: '',
				newpassword1: '',
				newpassword2: '',
				zhen1:false,
				zhen2:false,
				
			}
		},
		components: {
			uniNavBar
		},
		methods: {
			//返回
			fanhui() {
				pageback()
			},
			
			//密码长度检测
			changdujiance1(){
				if (this.newpassword1.length<10 && this.newpassword1.length>=6) {
					this.zhen1 = false
					setTimeout(()=>{
						this.zhen1 = false
					},1000)
				} else{
					this.zhen1 = true
					uni.showToast({
						title:'密码长度需6-10位',
						icon:'none',
						duration:800
					})
					setTimeout(()=>{
						this.zhen1 = false
					},1000)
				}
			},
			changdujiance2(){
				if (this.newpassword2.length<10 && this.newpassword2.length>=6) {
					this.zhen2 = false
					setTimeout(()=>{
						this.zhen2 = false
					},1000)
				} else{
					this.zhen2 = true
					uni.showToast({
						title:'密码长度需6-10位',
						icon:'none',
						duration:800
					})
					setTimeout(()=>{
						this.zhen2 = false
					},1000)
				}
			},
			
			
			//修改密码请求
			xiugaimima() {
				let token = uni.getStorageSync('token')
				if (this.oldpassword && this.newpassword1 && this.newpassword2) {
					if (this.newpassword1 == this.newpassword2) {
						if (this.newpassword1.length>=6 && this.newpassword1.length<10) {
							//提交修改
						uni.request({
							url:http.server_path + http.mimaxiugai,
							method:'POST',
							header:{
								token: token,
								'content-type': 'application/x-www-form-urlencoded'
							},
							data:{
								OLDPASSWORD:this.oldpassword,
								NEWPASSWORD:this.newpassword1
							},
							success: (res) => {
								console.log(res)
								if (res.data.success) {
									uni.showModal({
										title:'提示',
										content:'密码修改成功，请重新登录',
										showCancel:false,
										success: (res) => {
											if(res.confirm){
												uni.setStorageSync('token','')
												uni.reLaunch({
													url:'../login/login'
												})
											}
										}
									})
								} else{
									uni.showToast({
										title: '原登录密码错误',
										icon: 'none',
										mask: true
									})
								}
							},
							fail: (res) => {
								console.log(res)
							}
						})
						} else{
							uni.showToast({
								title: '密码长度需6-10位',
								icon: 'none',
								mask: true
							})
						}
						
						
						
						
					} else {
						uni.showToast({
							title: '两次输入的密码不相同',
							icon: 'none',
							mask: true
						})
					}
				} else {
					uni.showToast({
						title: '请输入密码',
						icon: 'none',
						mask: true
					})
				}
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		background: #FAFCFF;
	}

	.top-content {
		background: linear-gradient(135deg, rgba(81, 140, 255, 1), rgba(30, 119, 254, 1));
		display: flex;
		flex-direction: column;
		height: 160rpx;
		justify-content: flex-start;
	}

	.top-content::before {
		display: none;
	}

	.top-title-text {
		margin-top: 24rpx;
	}

	.tab-content {
		width: 100%;
		border-top-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
		margin-top: -70rpx;
		background: #FAFCFF;
		z-index: 10;
		min-height: 200rpx;
		padding-top: 30rpx;
		display: flex;
		justify-content: center;
	}

	.neirong {
		width: 690rpx;
		display: flex;
		flex-direction: column;
	}



	.icon1 {
		width: 26rpx;
		height: 30rpx;
		margin-right: 12rpx;
	}

	.xiangqing {
		display: flex;
		flex-direction: column;
		margin-bottom: 40rpx;
	}

	.xiangqing>view:nth-of-type(1) {
		display: flex;
		flex-direction: row;
		margin-bottom: 24rpx;
	}

	.xiangqing>view:nth-of-type(1)>text {
		color: #3D3D3D;
		font-size: 30rpx;
		line-height: 30rpx;
	}

	.xiangqing>view:nth-of-type(2) {
		display: flex;
		align-items: center;
		padding: 20rpx 30rpx;
		flex: 1;
		height: 24rpx;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(225, 227, 230, 1);
		border-radius: 10rpx;
		display: flex;
	}

	.tips {
		color: #B3B3B3;
		font-size: 28rpx;
		line-height: 28rpx;
	}

	.shurumima {
		line-height: 28rpx;
		flex: 1;
	}

	.xiugaimima {
		color: #292929;
		font-size: 40rpx;
		line-height: 40rpx;
		margin-bottom: 49rpx;
		font-weight: 700;
		margin-top: 20rpx;
	}

	.fix-btn {
		width: 260rpx;
		height: 80rpx;
		background: linear-gradient(135deg, rgba(81, 140, 255, 1), rgba(30, 119, 254, 1));
		box-shadow: 0px 4rpx 10rpx 0px rgba(51, 125, 255, 0.4);
		border-radius: 40rpx;
		font-size: 32rpx;
		line-height: 80rpx;
		color: #FFFFFF;
		text-align: center;
		margin-top: 460rpx;
	}
</style>
