<template>
	<view class="content">
		<video :src="httpsrc+video" controls id="shipin" @fullscreenchange="isquanping" :autoplay="true" class="videobox" object-fit="contain" x5-playsinline v-if="videoshow"></video>
		<!-- <view class="box" v-if="ishow">
			<view class="" @click="tuichu">
				
			</view>
			<video :src="httpsrc+video" controls id="shipin" @fullscreen="isquanping" :autoplay="true" class="videobox" object-fit="contain" x5-playsinline></video>
		</view> -->
		<view class="top-content">
			<uni-nav-bar left-icon="back" title="学习成长" @clickLeft="fanhui"></uni-nav-bar>
			<view class="oul">
				<view v-for="(item,index) in dataList" :key="index" @click="tabChange(index)" :class="{font:index==current}" class="animated">
					{{item}}
					<view class="active animated bounceIn" v-if="index==current"></view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" class="tab-content" :style="{height:vh+'px'}">
			<jiqiao v-if="is_jiqiao" :arr="jiqiaoarr" :httpsrc="httpsrc" @playshipin="playshipin"></jiqiao>
			<chanpin v-if="is_chanpin" :arr="chanpinarr" :httpsrc="httpsrc" @playshipin="playshipin"></chanpin>
			<qita v-if="is_qita" :arr="qitaarr" :httpsrc="httpsrc" @playshipin="playshipin"></qita>
		</scroll-view>
	</view>
</template>

<script>
	import http from '../../api/http.js'
	import token from '../../api/token.js'
	import pageback from '../../api/pageback.js'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import jiqiao from '@/components/study/jiqiao.vue'
	import chanpin from '@/components/study/chanpin.vue'
	import qita from '@/components/study/qita.vue'
	export default {
		data() {
			return {
				current: 0,
				video: '',
				ishow: false,
				dataList: ['技巧类', '产品类', '其他'],
				is_jiqiao: true,
				is_chanpin: false,
				is_qita: false,
				allArr: [],
				jiqiaoarr:[],
				chanpinarr:[],
				qitaarr:[],
				vh: 0,
				httpsrc:'',
				videoshow:true
			}
		},
		onLoad() {
			uni.showLoading({
				
			})
			this.httpsrc = http.server_path+'/'
			let token = uni.getStorageSync('token')
			this.videoContext = uni.createVideoContext('shipin')
			// this.videoContext.requestFullScreen();
			
			uni.request({
				url:http.server_path + http.xuexichengzhang,
				method:'POST',
				header:{
					'content-type': 'application/x-www-form-urlencoded',
					token:token
				},
				success: (res) => {
					if(res.data.success){
						uni.hideLoading()
						let allarr = JSON.parse(res.data.data)
					console.log(allarr)
					this.jiqiaoarr = allarr.jiqiao
					this.chanpinarr = allarr.chanpin
					this.qitaarr = allarr.qita
					this.jiqiaoarr.reverse()
					this.chanpinarr.reverse()
					this.qitaarr.reverse()
					}
					
					/* 
					console.log(this.jiqiaoarr)
					console.log(this.chanpinarr)
					console.log(this.qitaarr) */
					
					
				},
				fail: (res) => {
					console.log(res)
				}
			})
			
			
		},
		mounted() {
			let that = this
			
			uni.getSystemInfo({
				success: (res) => {
					let wh = res.windowHeight
					let info = uni.createSelectorQuery().select(".top-content");
					info.boundingClientRect(data1=> { //data - 各种参数
					　//console.log(data1.height)  // 获取元素宽度
						that.vh = wh - data1.height
					}).exec()
				}
			})
		},
		methods: {
			tabChange(index) {
				this.current = index
				switch (index) {
					case 0:
						this.is_jiqiao = true
						this.is_chanpin = false
						this.is_qita = false
						break;
					case 1:
						this.is_jiqiao = false
						this.is_chanpin = true
						this.is_qita = false
						break;
					case 2:
						this.is_jiqiao = false
						this.is_chanpin = false
						this.is_qita = true
						break;
					default:
						break;
				}
			},
			/* fanhui() {
				// #ifdef H5  
				let canBack = true
				const pages = getCurrentPages()
				// 有可返回的页面则直接返回，uni.navigateBack默认返回失败之后会自动刷新页面 ，无法继续返回  
				if (pages.length > 1) {
					uni.navigateBack(1)
					return;
				}
				// vue router 可以返回uni.navigateBack失败的页面 但是会重新加载  
				let a = this.$router.go(-1)
				// router.go失败之后则重定向到首页  
				if (a == undefined) {
					uni.reLaunch({
						url: "/pages/login/login"
					})
				}
				return;
				// #endif  
				uni.navigateBack(1)
			}, */
			fanhui(){
				pageback()
			},
			playshipin(w) {
				console.log(w)
				// this.ishow = !this.ishow
				// this.videoshow = !this.videoshow
				this.video = w
				this.videoContext.requestFullScreen()
				this.videoContext.play()
				/* setTimeout(()=>{
					this.videoContext.requestFullScreen()
					
				},100) */
				
			},
			tuichu() {
				this.videoContext.exitFullScreen()
				// this.ishow = !this.ishow
				this.videoContext.stop()
				setTimeout(()=>{
					// this.videoshow = !this.videoshow
				},100)
			},
			isquanping(e) {
				console.log(e)
				if (e.detail.fullScreen) {
					e.detail.direction = 'horizontal'
					// this.videoContext.play()
				} else{
					// this.videoshow = !this.videoshow
					console.log('退出全屏')
					// this.videoContext.stop()
					this.videoContext.pause()
				}
				
				
			}
		},
		components: {
			uniNavBar,
			jiqiao,
			chanpin,
			qita
		},
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
		height: 260rpx;
		justify-content: flex-start;
	}

	.top-content::before {
		display: none;
	}

	.top-title-text {
		margin-top: 24rpx;
	}

	.oul {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 30rpx;
	}

	.oul>view {
		margin: 0 80rpx;
		font-size: 30rpx;
		color: #fff;
		line-height: 30rpx;
		position: relative;
	}

	.font {
		font-weight: bold;
	}

	.active {
		width: 80rpx;
		height: 4rpx;
		background: rgba(255, 170, 0, 1);
		border-radius: 2rpx;
		position: absolute;
		bottom: -20rpx;
		left: 50%;
		margin-left: -40rpx;
	}

	.tab-content {
		width: 100%;
		border-top-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
		margin-top: -70rpx;
		background: #FAFCFF;
		z-index: 10;
		height: 1500rpx;
		padding-top: 30rpx;
	}


	.box {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		/* background: rgba(0, 0, 0, .8); */
		z-index: 1000;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.box>view{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, .8);
		/* z-index: 1000; */
	}
	
	
	image {
		will-change: transform
	}
	.videobox{
		width: 1px;
		height: 1px;
		display: block;
	}
</style>
