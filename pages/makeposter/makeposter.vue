<template>
	<view class="content">
		<view class="top-box">
			<uni-nav-bar left-icon="back" title="海报" @clickLeft="fanhui"></uni-nav-bar>
		
			<swiper :indicator-dots="false" :autoplay="false" :interval="3000" :duration="300" class="swiper-box" @change="change">
				<swiper-item v-for="(i,index) in list" :key="index">
					<view class="swiper-item">
						<view class="haibaomoban">
							<image :src="httpsrc+i.IMGLOAD" mode="widthFix" class="pic"></image>
						</view>
						
					</view>
				</swiper-item>
			</swiper>
			<swiper-dot class="dot" :current="current" :list="list"></swiper-dot>
		
			<view class="shengcheng-btn" @click="yijian">
				一键生成
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import swiperDot from "@/components/swiperDot/swiperDot.vue"
	import http from '../../api/http.js'
	import token from '../../api/token.js'
	import pageback from '../../api/pageback.js'
	export default {
		data() {
			return {
				list: [],
				current: 0,
				httpsrc:''
			}
		},
		components: {
			uniNavBar,
			swiperDot
		},
		onLoad() {
			uni.showLoading({
				
			})
			let token = uni.getStorageSync('token')
			this.httpsrc = http.server_path + '/'
			uni.request({
				url:http.server_path + http.Haibaolist,
				method:'POST',
				header:{
					token:token
				},
				success: (res) => {
					// console.log(res.data)
					if (res.data.success) {
						this.list = JSON.parse(res.data.data)
						console.log(this.list)
						uni.hideLoading()
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
			change(e) {
				this.current = e.detail.current;
			},
			//一键生成
			yijian() {
				uni.navigateTo({
					url: '../postersucc/postersucc?ID='+this.list[this.current].ID
				})
			},
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
		position: relative;
	}

	.top-box {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: url(../../static/img/bg_top.png) no-repeat center top;
		background-size: 100% auto;
	}

	.top-content::before {
		display: none;
	}

	.swiper-box {
		width: 650rpx;
		height: 900rpx;
		border-radius: 10rpx;
		box-shadow: 0px 2px 16rpx 0px rgba(220, 225, 230, 0.6);
		background: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		/* overflow: hidden; */
	}

	.swiper-item {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		position: relative;
	}

	.dot {
		margin-top: 50rpx;
	}
	.shengcheng-btn {
		width: 400rpx;
		height: 80rpx;
		background: linear-gradient(135deg, rgba(81, 140, 255, 1), rgba(30, 119, 254, 1));
		box-shadow: 0px 4rpx 10rpx 0px rgba(51, 125, 255, 0.4);
		border-radius: 40rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		line-height: 80rpx;
		margin-top: 76rpx;
	}
	
	.haibaomoban{
		width:590rpx;
		height:840rpx;
		background:rgba(239,239,239,1);
		line-height: 840rpx;
		text-align: center;
		font-size: 32rpx;
		color: #999999;
		overflow: hidden;
		display: flex;
		justify-content: center;
		/* align-items: center; */
	}
	.pic{
		/* width: 100%; */
		height: 100%;
	}
</style>
