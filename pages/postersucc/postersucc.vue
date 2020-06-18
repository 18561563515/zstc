<template>
	<view class="content">
		<view class="top-content">
			<uni-nav-bar left-icon="back" title="个人海报" @clickLeft="fanhui"></uni-nav-bar>
		</view>
		<view class="tab-content">
			<view class="mingpian">
				<image :src="httpsrc+mingpian" mode="widthFix" class="pic"></image>
			</view>
			
		</view>
		<view class="shou">
			
		</view>
		<text class="tip">长按海报保存至相册</text>
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
				mingpian:'',
				httpsrc:''
			}
		},
		components: {
			uniNavBar
		},
		onLoad(res) {
			uni.showLoading({
				
			})
			let ID = res.ID
			let token = uni.getStorageSync('token')
			this.httpsrc = http.server_path + '/'
			uni.request({
				url:http.server_path + http.Haibaocreate,
				method:'POST',
				header:{
					token:token,
					'content-type': 'application/x-www-form-urlencoded'
				},
				data:{
					ID:ID
				},
				success: (res) => {
					console.log(res)
					if (res.data.success) {
						uni.hideLoading()
						let haibaoArr = JSON.parse(res.data.data)
						console.log(haibaoArr)
						this.mingpian = haibaoArr.imgurl
					} else{
						uni.hideLoading()
						uni.showModal({
							title:'警告',
							content:'网络错误，返回重试',
							showCancel:false,
							success: (res) => {
								if(res.confirm){
									uni.switchTab({
										url:'../home/home'
									})
								}
							}
						})
					}
				}
			})
		},
		methods: {
			//返回
			fanhui() {
				pageback()
			},
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
	
	.mingpian{
		width: 650rpx;
		/* height: 900rpx; */
		margin-bottom: 40rpx;
		/* box-shadow:0px 2px 16rpx 0px rgba(220,225,230,0.6); */
		overflow: hidden;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.shou{
		width: 32rpx;
		height: 50rpx;
		background: url(../../static/img/icon_longpress.png) no-repeat center center;
		background-size: cover;
		margin-bottom: 24rpx;
	}
	.tip{
		line-height: 30rpx;
		font-size: 30rpx;
		color: #666666;
	}
	.pic{
		width: 100%;
		/* margin-bottom: 40rpx; */
		/* box-shadow:0px 2px 16rpx 0px rgba(220,225,230,0.6); */
		border-radius: 10rpx;
	}
</style>
