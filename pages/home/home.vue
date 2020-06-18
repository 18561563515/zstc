<template>
	<view class="content">
		<view class="top-box">
			<view class="top-content1">
				<text class="top-title-text">证圣天成</text>
			</view>
			<swiper :indicator-dots="false" :autoplay="true" :interval="5000" :duration="300" class="swiper-banner">
				<swiper-item class="sw" v-for="(i,index) in lunboarr" :key="i.ID">
					<text class="sw-title">{{i.TITLE}}</text>
					<view class="sw-line"></view>
					<text class="sw-content">{{i.CONTEXT}}</text>
					<image :src="httpsrc+i.IMGLOAD" mode="aspectFill" class="swiper-pic"></image>
				</swiper-item>
			</swiper>
		</view>

		<view class="function-list">
			<view class="function-list-unit" @click="business">
				<image src="../../static/icon/icon_1.png" mode="widthFix"></image>
				<text>展业工具</text>
			</view>
			<view class="function-list-unit" @click="study">
				<image src="../../static/icon/icon_2.png" mode="widthFix"></image>
				<text>学习成长</text>
			</view>
			<view class="function-list-unit" @click="apply">
				<image src="../../static/icon/icon_3.png" mode="widthFix"></image>
				<text>产品中心</text>
			</view>
			<view class="function-list-unit" @click="msg">
				<image src="../../static/icon/icon_4.png" mode="widthFix"></image>
				<text>站内消息</text>
				<view class="message" v-if="xiaoxi > 0">
					{{xiaoxi}}
				</view>
			</view>
		</view>

		<text class="recommend">推荐产品</text>
		<!-- 列表 -->
		<view class="product-list" v-for="(i,index) in tuijianarr" :key="index" @click="detail(i.ID)">
			<view class="product-list-detail">
				<text class="a1">{{i.CHANPIN}}</text>
				<text class="a2">{{i.REPAYMODE}}</text>
			</view>

			<view class="product-list-detail teshu">
				<text class="a3">{{i.RATE}}<text class="a4">%</text></text>
				<text class="a5">{{i.DATELINE}}<text class="a6">个月</text></text>
			</view>

			<view class="product-list-detail">
				<text>年化利率</text>
				<text>预约期限</text>
			</view>

			<view class="product-list-detail">
				<view class="pre-line"></view>
			</view>

			<view class="product-list-detail">
				<text>剩余金额<text class="a7">{{i.LEFTMONEY/10000}} <text>万元</text> </text></text>
				<text>预约有效时间<text class="a7">{{i.USEFULLDATE}}<text>天</text></text></text>
			</view>
		</view>

	</view>
</template>

<script>
	/* import {
		mapState
	} from 'vuex' */
	import http from '../../api/http.js'
	import token from '../../api/token.js'
	export default {
		// computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		data() {
			return {
				title: 'Hello',
				tuijianarr: [],
				lunboarr: [],
				zhanneixiaoxi: 0, //显示到角标的消息数目
				laquxiaoxi: 0, //每次加载或者刷新拉取的新消息数目
				httpsrc:''
			}
		},
		onLoad() {
			//全局loading
			uni.showLoading({
			
			})
			this.httpsrc = http.server_path + '/'
			let token = uni.getStorageSync('token')
			//获取站内消息请求接口
			// this.zhanneixiaoxi = uni.getStorageSync('zhanneixiaoxi')
			this.readMessage()


			//推荐产品

			/* uni.request({
				url: http.server_path + http.tuijian,
				method: 'POST',
				header: {
					'token': token,
				},
				success: (res) => {
					console.log(JSON.parse(res.data.data))
					if (res.data.success) {
						uni.hideLoading()
						this.tuijianarr = JSON.parse(res.data.data)
						// console.log(this.tuijianarr)
					} else {

					}
				},
				fail: (res) => {
					console.log(res)
				}
			}) */

			//轮播
			uni.request({
				url: http.server_path + http.lunbo,
				method: 'POST',
				header: {
					'token': token,
				},
				success: (res) => {
					// console.log(res)
					if (res.data.success) {
						this.lunboarr = JSON.parse(res.data.data)
						console.log(this.lunboarr)
					} else {

					}
				},
				fail: (res) => {
					console.log(res)
				}
			})



		},
		onPullDownRefresh() {
			this.readMessage()

			//推荐产品
			/* let token = uni.getStorageSync('token')
			uni.request({
				url:http.server_path+'/Ctrl_H5/UserHandler.ashx?action=Producttuijianlist',
				method:'POST',
				header: {
					'token': token,
				},
				success: (res) => {
					if (res.data.success) {
						this.tuijianarr = JSON.parse(res.data.data)
					} else{
						
					}
				},
				fail: (res) => {
					console.log(res)
				}
			}) */

		},
		mounted() {

		},
		onShow() {
			this.readMessage()

		},
		computed: {
			xiaoxi() {
				if (this.zhanneixiaoxi>0) {
					return this.zhanneixiaoxi
				} else {
					return 0
				}
			}
		},
		methods: {
			//跳转产品中心
			apply() {
				uni.switchTab({
					url: '../apply/apply'
				})
			},
			//站内消息
			msg() {
				uni.setStorageSync('yiyuedu', this.laquxiaoxi)
				uni.navigateTo({
					url: '../msg/msg'
				})
			},
			//学习成长
			study() {
				uni.navigateTo({
					url: '../study/study'
				})
			},
			detail(uid) {
				uni.navigateTo({
					url: '../detail/detail?uid=' + uid
				})
				// console.log(uid)
			},
			//展业工具
			business() {
				uni.navigateTo({
					url: '../business/business'
				})
			},
			//每次页面加载拉取站内消息条数
			readMessage() {
				let token = uni.getStorageSync('token')
				uni.request({
					url: http.server_path + http.zhanneixiaoxi,
					method: 'POST',
					header: {
						'token': token,
					},
					success: (res) => {
						if (res.data.success) {
							let xiaoxiarr = JSON.parse(res.data.data)
							console.log(xiaoxiarr)
							let tiaoshu = 0
							for (let i = 0; i < xiaoxiarr.huankuan.length; i++) {
								tiaoshu+=xiaoxiarr.huankuan[i].STATUS
							}
							for (let i = 0; i < xiaoxiarr.chenggong.length; i++) {
								tiaoshu+=xiaoxiarr.chenggong[i].STATUS
							}
							for (let i = 0; i < xiaoxiarr.shixiao.length; i++) {
								tiaoshu+=xiaoxiarr.shixiao[i].STATUS
							}
							console.log('本次拉取消息条数:' + tiaoshu)
							uni.stopPullDownRefresh();
							// this.laquxiaoxi = tiaoshu
							// this.zhanneixiaoxi = uni.getStorageSync('yiyuedu')
							this.zhanneixiaoxi = tiaoshu
							uni.setStorageSync('xiaoxiarr', xiaoxiarr)
						}
					},
					fail: (res) => {
						console.log(res)
					}
				})
				
				uni.request({
					url: http.server_path + http.tuijian,
					method: 'POST',
					header: {
						'token': token,
					},
					success: (res) => {
						console.log(JSON.parse(res.data.data))
						if (res.data.success) {
							uni.hideLoading()
							this.tuijianarr = JSON.parse(res.data.data)
							// console.log(this.tuijianarr)
						} else {
				
						}
					},
					fail: (res) => {
						console.log(res)
					}
				})
			},

		}
	}
</script>

<style>
	page {
		width: 100%;
		background: #FAFCFF;
	}


	.top-box {
		height: 370rpx;
		width: 100%;
		background: url(../../static/img/bg_top.png) no-repeat center top;
		background-size: 100% auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.top-content1 {
		height: 90rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.swiper-banner {
		width: 690rpx;
		height: 280rpx;
		overflow: hidden;
		border-radius: 10rpx;
		box-shadow: 0px 2px 16rpx 0px rgba(220, 225, 230, 0.6);
		background: #fff;
	}

	.swiper-pic {
		width: 100%;
	}

	.function-list {
		width: 690rpx;
		padding-top: 30rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 50rpx;
	}

	.function-list-unit {
		width: 156rpx;
		height: 150rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2px 16rpx 0px rgba(220, 225, 230, 0.6);
		border-radius: 10rpx;
		position: relative;
		display: flex;
		flex-direction: column;
	}


	.function-list-unit>image {
		width: 64rpx;
		height: 60rpx;
		margin-top: 25rpx;
		margin-bottom: 21rpx;
		margin-left: 24rpx;
	}

	.function-list-unit>text {
		font-size: 24rpx;
		color: #333333;
		margin-left: 24rpx;
	}

	.recommend {
		color: #292929;
		font-size: 36rpx;
		text-align: left;
		width: calc(100% - 38rpx);
		padding-left: 38rpx;
		font-weight: bold;
	}


	.message {
		width: 40rpx;
		height: 26rpx;
		background: rgba(255, 72, 119, 1);
		border-radius: 13rpx 0px 0px 12rpx;
		position: absolute;
		right: 0;
		top: 24rpx;
		font-size: 18rpx;
		color: #fff;
		line-height: 26rpx;
		text-align: center;
	}


	.sw {
		position: relative;
	}

	.sw-title {
		font-size: 36rpx;
		line-height: 36rpx;
		z-index: 2;
		color: #3D3D3D;
		position: absolute;
		left: 50rpx;
		top: 73rpx;
	}

	.sw-line {
		width: 150rpx;
		height: 10rpx;
		background: rgba(255, 237, 163, 1);
		position: absolute;
		left: 49rpx;
		top: 102rpx;
		z-index: 1;
	}

	.sw-content {
		font-size: 24rpx;
		line-height: 24rpx;
		color: #666666;
		width: 144rpx;
		position: absolute;
		left: 51rpx;
		top: 157rpx;
		z-index: 1;
	}
</style>
