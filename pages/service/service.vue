<template>
	<view class="content">
		<view class="top-content">
			<uni-nav-bar left-icon="back" title="客户服务" @clickLeft="fanhui"></uni-nav-bar>
			<view class="oul">
				<view v-for="(item,index) in dataList" :key="index" @click="tabChange(index)" :class="{font:index==current}" class="animated">
					{{item}}
					<view class="active animated bounceIn" v-if="index==current"></view>
				</view>
			</view>
		</view>
		
		<scroll-view scroll-y="true" class="tab-content" :style="{height:vh+'px'}">
			<all v-if="is_all" :arr="all" @chakan="chakan"></all>
			<yuyue v-if="is_yuyue" :arr="yiyuyue" @chakan="chakan"></yuyue>
			<chengjiao v-if="is_chengjiao" :arr="yichengjiao" @chakan="chakan"></chengjiao>
			<shixiao v-if="is_shixiao" :arr="yishixiao" @chakan="chakan"></shixiao>
		</scroll-view>
	</view>
</template>

<script>
	import http from '../../api/http.js'
	import token from '../../api/token.js'
	import pageback from '../../api/pageback.js'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import all from "@/components/service/all.vue"
	import yuyue from "@/components/service/yuyue.vue"
	import chengjiao from "@/components/service/chengjiao.vue"
	import shixiao from "@/components/service/shixiao.vue"
	export default {
		data() {
			return {
				current:0,
				dataList:['全部', '已预约', '已成交', '已失效'],
				vh:0,
				is_all: true,
				is_yuyue: false,
				is_chengjiao: false,
				is_shixiao: false,
				all:[],
				yichengjiao:[],
				yishixiao:[],
				yiyuyue:[]
			}
		},
		components:{
			uniNavBar,
			all,
			yuyue,
			chengjiao,
			shixiao
		},
		onLoad() {
			uni.showLoading({
				
			})
			let token = uni.getStorageSync('token')
			//客户服务
			uni.request({
				url:http.server_path + http.kehufuwu,
				method:'POST',
				header:{
					token:token
				},
				success: (res) => {
					if(res.data.success){
						uni.hideLoading()
						console.log(JSON.parse(res.data.data))
						this.all = JSON.parse(res.data.data).all
						this.yichengjiao = JSON.parse(res.data.data).yichengjiao
						this.yishixiao = JSON.parse(res.data.data).yishixiao
						this.yiyuyue = JSON.parse(res.data.data).yiyuyue
						
					}
					
				},
				fail: (res) => {
					console.log(res)
				}
			})
			
			//客户服务详情===需要参数
			/* uni.request({
				url:http.server_path + http.kehufuwuxiangqing,
				method:'POST',
				header:{
					token:token
				},
				success: (res) => {
					console.log(res)
					if(res.data.success){
						console.log(JSON.parse(res.data.data))
						
					}
					
				},
				fail: (res) => {
					console.log(res)
				}
			
			}) */
			
			
		},
		mounted() {
			let that = this
			uni.getSystemInfo({
				success: (res) => {
					let wh = res.windowHeight
					let info = uni.createSelectorQuery().select(".top-content");
					info.boundingClientRect(data1=> { //data - 各种参数
					　console.log(data1.height)  // 获取元素宽度
						that.vh = wh - data1.height
					}).exec()
				}
			})
		},
		methods: {
			tabChange(index) {
				this.current = index
				// console.log(this.current)
				switch (index) {
					case 0:
						this.is_all = true
						this.is_yuyue = false
						this.is_chengjiao = false
						this.is_shixiao = false
						break;
					case 1:
						this.is_all = false
						this.is_yuyue = true
						this.is_chengjiao = false
						this.is_shixiao = false
						break;
					case 2:
						this.is_all = false
						this.is_yuyue = false
						this.is_chengjiao = true
						this.is_shixiao = false
						break;
					case 3:
						this.is_all = false
						this.is_yuyue = false
						this.is_chengjiao = false
						this.is_shixiao = true
						break;
					default:
						break;
				}
			},
			chakan(id,state){
				console.log(id)
				console.log(state)
				uni.navigateTo({
					url:'../dingdan/dingdan?id='+id+'&state='+state
				})
			},
			fanhui(){
				pageback()
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
		margin: 0 40rpx;
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
		min-height: 200rpx;
		padding-top: 30rpx;
	}
	
	
</style>
