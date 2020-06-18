<template>
	<view class="content">
		<view class="top-content">
			<!-- <text class="top-title-text">站内消息</text> -->
			<uni-nav-bar left-icon="back" title="站内消息" @clickLeft="fanhui"></uni-nav-bar>
			<view class="oul">
				<view v-for="(item,index) in dataList" :key="index" @click="tabChange(index)" :class="{font:index==current}" class="animated">
					{{item}}
					<view class="active animated bounceIn" v-if="index==current"></view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" class="tab-content" :style="{height:vh+'px'}">
			<shengri v-if="is_shengri" :srarr="shengriarr"></shengri>
			<huankuan v-if="is_huankuan" :arr="huankuanarr" @readMSG="readMessage"></huankuan>
			<shibai v-if="is_shibai" :arr="shixiaoarr" @readMSG="readMessage"></shibai>
			<chenggong v-if="is_chenggong" :arr="chenggongarr" @readMSG="readMessage"></chenggong>
		</scroll-view>

	</view>
</template>

<script>
	import http from '../../api/http.js'
	import token from '../../api/token.js'
	import pageback from '../../api/pageback.js'
	import shengri from '../../components/msg/shengri.vue'
	import huankuan from '../../components/msg/huankuan.vue'
	import chenggong from '../../components/msg/chenggong.vue'
	import shibai from '../../components/msg/shibai.vue'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				current: 0,
				vh:0,
				dataList: ['生日提醒', '还款提醒', '预约失效', '预约成功'],
				xiaoxiarr:[],
				chenggongarr:[],
				huankuanarr:[],
				shengriarr:[],
				shixiaoarr:[],
				
				is_shengri: true,
				is_huankuan: false,
				is_chenggong: false,
				is_shibai: false
			}
		},
		
		
		onPullDownRefresh() {
			// this.shengriarr = []
			this.readMessage()
		},
		onLoad() {
			// this.readMessage()
			this.xiaoxiarr = uni.getStorageSync('xiaoxiarr')
			// this.shengriarr = uni.getStorageSync('xiaoxiarr').shengri
		},
		created() {
			let token = uni.getStorageSync('token')
			uni.request({
				url:http.server_path+http.zhanneixiaoxi,
				method:'POST',
				header:{
					'content-type': 'application/x-www-form-urlencoded',
					token: token
				},
				success: (res) => {
					
					
						let aaa = JSON.parse(res.data.data)
						
						
						this.shengriarr = aaa.shengri
						this.huankuanarr = aaa.huankuan
						this.shixiaoarr = aaa.shixiao
						this.chenggongarr = aaa.chenggong
					
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
				uni.showLoading({
					
				})
				this.current = index
				switch (index) {
					case 0:
						this.is_shengri = true
						this.is_huankuan = false
						this.is_chenggong = false
						this.is_shibai = false
						this.readMessage()
						break;
					case 1:
						this.is_shengri = false
						this.is_huankuan = true
						this.is_chenggong = false
						this.is_shibai = false
						this.readMessage()
						break;
					case 2:
						this.is_shengri = false
						this.is_huankuan = false
						this.is_chenggong = false
						this.is_shibai = true
						this.readMessage()
						break;
					case 3:
						this.is_shengri = false
						this.is_huankuan = false
						this.is_chenggong = true
						this.is_shibai = false
						this.readMessage()
						break;
					default:
						break;
				}
			},
			fanhui(){
				pageback()
			},
			//每次页面加载拉取站内消息条数
			readMessage(){
				let token = uni.getStorageSync('token')
				uni.request({
					url:http.server_path+http.zhanneixiaoxi,
					method:'POST',
					header:{
						'token': token,
					},
					success: (res) => {
						this.xiaoxiarr = JSON.parse(res.data.data)
						if(res.data.success){
							uni.hideLoading()
							this.shengriarr = this.xiaoxiarr.shengri
							this.huankuanarr = this.xiaoxiarr.huankuan
							this.shixiaoarr = this.xiaoxiarr.shixiao
							this.chenggongarr = this.xiaoxiarr.chenggong
							uni.stopPullDownRefresh();
						}
					},
					fail: (res) => {
						console.log(res)
					}
				})
			},
			
			//已读标记方法
			/* readMsg(ID){
				console.log(ID)
			} */
		},
		components: {
			shengri,
			huankuan,
			chenggong,
			shibai,
			uniNavBar
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
		margin: 0 30rpx;
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
		height: 1100rpx;
		padding-top: 30rpx;
	}
</style>
