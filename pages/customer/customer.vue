<template>
	<view class="content">
		<view class="top-content">
			<uni-nav-bar left-icon="back" title="我的客户" @clickLeft="fanhui" class="toubu">
				<image src="../../static/img/btn_edit.png" mode="widthFix" class="add-btn" @click="addBtn"></image>
			</uni-nav-bar>
			<view class="oul">
				<view v-for="(item,index) in dataList" :key="index" @click="tabChange(index)" :class="{font:index==current}" class="animated">
					{{item}}
					<view class="active animated bounceIn" v-if="index==current"></view>
				</view>
			</view>
		</view>

		<scroll-view scroll-y="true" class="tab-content" :style="{height:vh+'px'}">
			<all v-if="is_all" :arr="wodekehu_all" @chakan="chakan"></all>
			<yixiang v-if="is_yixiang" :arr="wodekehu_yixiang" @chakan="chakan"></yixiang>
			<yuyue v-if="is_yuyue" :arr="wodekehu_yiyuyue" @chakan="chakan"></yuyue>
			<chenggong v-if="is_chengjiao" :arr="wodekehu_yichengjiao" @chakan="chakan"></chenggong>
		</scroll-view>
	</view>
</template>

<script>
	import http from '../../api/http.js'
	import token from '../../api/token.js'
	import pageback from '../../api/pageback.js'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import all from "@/components/customer/all.vue"
	import yixiang from "@/components/customer/yixiang.vue"
	import yuyue from "@/components/customer/yuyue.vue"
	import chenggong from "@/components/customer/chenggong.vue"
	export default {
		data() {
			return {
				current: 0,
				dataList: ['全部', '意向客户', '已预约', '已成交'],
				is_all: true,
				is_yixiang: false,
				is_yuyue: false,
				is_chengjiao: false,
				vh: 0,
				wodekehu_all: [],
				wodekehu_yixiang: [],
				wodekehu_yiyuyue: [],
				wodekehu_yichengjiao: []
			}
		},
		components: {
			uniNavBar,
			all,
			yixiang,
			yuyue,
			chenggong
		},
		// computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		onLoad(option) {
			//获取数据
			uni.showLoading({

			})
			let token = uni.getStorageSync('token')
			uni.request({
				url: http.server_path + http.wodekehu,
				method: 'POST',
				header: {
					token: token
				},
				success: (res) => {
					if(res.data.success){
						uni.hideLoading()
					}
					console.log(JSON.parse(res.data.data))
					this.wodekehu_all = JSON.parse(res.data.data).all
					this.wodekehu_yixiang = JSON.parse(res.data.data).yixiang
					this.wodekehu_yiyuyue = JSON.parse(res.data.data).yiyuyue
					this.wodekehu_yichengjiao = JSON.parse(res.data.data).yichengjiao
				},
				fail: (res) => {
					console.log(res)
				}
			})

			//判断标签位置
			this.current = option.current
			if (option.current == 1) {
				this.is_all = false
				this.is_yixiang = true
				this.is_yuyue = false
				this.is_chengjiao = false
			} else if (option.current == 0) {
				this.is_all = true
				this.is_yixiang = false
				this.is_yuyue = false
				this.is_chengjiao = false
			}else if (option.current == 2) {
				this.is_all = false
				this.is_yixiang = false
				this.is_yuyue = true
				this.is_chengjiao = false
			}else if (option.current == 3) {
				this.is_all = false
				this.is_yixiang = false
				this.is_yuyue = false
				this.is_chengjiao = true
			}
		},
		mounted() {
			let that = this
			uni.getSystemInfo({
				success: (res) => {
					let wh = res.windowHeight
					let info = uni.createSelectorQuery().select(".top-content");
					info.boundingClientRect(data1 => { //data - 各种参数
						console.log(data1.height) // 获取元素宽度
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
						this.is_yixiang = false
						this.is_yuyue = false
						this.is_chengjiao = false
						break;
					case 1:
						this.is_all = false
						this.is_yixiang = true
						this.is_yuyue = false
						this.is_chengjiao = false
						break;
					case 2:
						this.is_all = false
						this.is_yixiang = false
						this.is_yuyue = true
						this.is_chengjiao = false
						break;
					case 3:
						this.is_all = false
						this.is_yixiang = false
						this.is_yuyue = false
						this.is_chengjiao = true
						break;
					default:
						break;
				}
			},

			//新增
			addBtn() {
				uni.navigateTo({
					url: '../edit/edit'
				})
			},

			//返回
			fanhui() {
				pageback()
			},

			//查看列表详情
			chakan(id, state,type) {
				console.log(id)
				console.log(state)
				console.log(type)
				if(type == -1){
					uni.navigateTo({
						url: '../yixiang/yixiang?id=' + id
					})
				}else{
					switch (state) {
					case -1:
						uni.navigateTo({
							url: '../yixiang/yixiang?id=' + id
						})
						break;
						
					default:
						uni.navigateTo({
							url: '../customerdetail/customerdetail?state='+state+'&id='+id
						})
						break;
				}
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
		min-height: 200rpx;
		padding-top: 30rpx;
	}

	.toubu {
		position: relative;
	}

	.add-btn {
		width: 144rpx;
		height: 60rpx;
		position: absolute;
		right: 20rpx;
		top: 50%;
		transform: translateY(-50%);
	}
</style>
