<template>
	<view class="content">
		<view class="top-content-pd">
			<text class="top-title-text">产品中心</text>
			<view class="search_content">
				<image src="../../static/icon/icon_search.png" mode="widthFix" class="search-icon"></image>
				<input type="text" value="" placeholder="请输入产品名称" placeholder-class="placeholder-color" class="search-box" v-model="searchKey" />
			</view>
			<view class="tab-content">
				<view class="tab-content-sign animated" :class="{active:current==index,bounceIn:current==index}" v-for="(i,index) in arr"
				 :key="index" @click="tabChoose(index)">{{i}}</view>
			</view>
		</view>
		<view class="pre-line-box">

		</view>

		<!-- 列表 -->
		<view class="product-list" v-for="(i,index) in tempArr" :key="index" @click="gotoDetail(i.ID)">
		<!-- <view class="product-list" v-for="(i,index) in filterARR(searchKey)" :key="index" @click="gotoDetail(i.ID)"> -->
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
				<text>剩余金额<text class="a7">{{i.LEFTMONEY/10000}}<text>万元</text></text></text>
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
	import pageback from '../../api/pageback.js'
	export default {
		data() {
			return {
				active: false,
				arr: ['全部', '3个月', '6个月', '12个月'],
				current: 0,
				searchKey: '',
				allArr: [],
				tempArr: [],
				sanArr: [],
				liuArr: [],
				shierArr: [],
				souArr: []
			}
		},
		watch: {
			searchKey() {
				this.current = 0
				this.souArr = []
				if (this.searchKey == '') {
					this.tempArr = this.allArr

				}
				for (let i = 0; i < this.allArr.length; i++) {
					if (this.allArr[i].CHANPIN.indexOf(this.searchKey) != -1) {
						this.souArr.push(this.allArr[i])
					}
				}
				this.tempArr = this.souArr
			}
		},
		created() {
			
		},
		onShow() {
			uni.showLoading({
				success: (res) => {
					//所有产品
					let token = uni.getStorageSync('token')
					uni.request({
						url: http.server_path + http.chanpin,
						method: 'POST',
						header: {
							'token': token,
						},
						success: (res) => {
							
							if (res.data.success) {
								uni.hideLoading()
								this.sanArr = []
								this.liuArr = []
								this.shierArr = []
								this.allArr = JSON.parse(res.data.data)
								console.log(this.allArr)
								this.tempArr = this.allArr
								// console.log(this.tempArr)

								//3个月
								for (let i = 0; i < this.allArr.length; i++) {
									if (this.allArr[i].DATELINE == 3) {
										this.sanArr.push(this.allArr[i])
									}
								}
								//6个月
								for (let i = 0; i < this.allArr.length; i++) {
									if (this.allArr[i].DATELINE == 6) {
										this.liuArr.push(this.allArr[i])
									}
								}
								//12个月
								for (let i = 0; i < this.allArr.length; i++) {
									if (this.allArr[i].DATELINE == 12) {
										this.shierArr.push(this.allArr[i])
									}
								}
							} else {

							}
						},
						fail: (res) => {
							console.log(res)
						}
					})
				}
			})


		},
		onPullDownRefresh() {
			console.log('下拉刷新');
			//下拉刷新
			this.current = 0
			//所有产品
			let token = uni.getStorageSync('token')
			uni.request({
				url: http.server_path + http.chanpin,
				method: 'POST',
				header: {
					'token': token,
				},
				success: (res) => {
					console.log(res)
					if (res.data.success) {
						this.sanArr = []
						this.liuArr = []
						this.shierArr = []
						uni.stopPullDownRefresh();
						this.allArr = JSON.parse(res.data.data)
						this.tempArr = this.allArr
						console.log(this.tempArr)

						//3个月
						for (let i = 0; i < this.allArr.length; i++) {
							if (this.allArr[i].DATELINE == 3) {
								this.sanArr.push(this.allArr[i])
							}
						}
						//6个月
						for (let i = 0; i < this.allArr.length; i++) {
							if (this.allArr[i].DATELINE == 6) {
								this.liuArr.push(this.allArr[i])
							}
						}
						//12个月
						for (let i = 0; i < this.allArr.length; i++) {
							if (this.allArr[i].DATELINE == 12) {
								this.shierArr.push(this.allArr[i])
							}
						}
					} else {

					}
				},
				fail: (res) => {
					console.log(res)
				}
			})
		},
		methods: {
			tabChoose(x) {
				// this.searchKey = ''
				this.current = x
				if (x == 0) {
					this.tempArr = this.allArr
				} else if (x == 1) {
					
					this.tempArr = this.sanArr
					setTimeout(()=>{
						this.searchKey = ''
					},50)
				} else if (x == 2) {
					
					this.tempArr = this.liuArr
					setTimeout(()=>{
						this.searchKey = ''
					},50)
				} else if (x == 3) {
					
					this.tempArr = this.shierArr
					setTimeout(()=>{
						this.searchKey = ''
					},50)
					
				}
			},
			
			//搜索过滤
			filterARR(key){
				//先清空
				this.tempArr = []
				if (key == '') {
					return this.allArr
				} else{
					for (let i = 0; i < this.allArr.length; i++) {
						if (this.allArr[i].CHANPIN.indexOf(key) != -1) {
							this.tempArr.push(this.allArr[i])
						}
					}
					return this.tempArr
				}
			},
			
			
			gotoDetail(uid) {
				uni.navigateTo({
					url: '../detail/detail?uid=' + uid
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
		background: #FAFCFF;
	}

	.top-content-pd {
		width: 100%;
		height: 260rpx;
		background: linear-gradient(135deg, rgba(81, 140, 255, 1), rgba(30, 119, 254, 1));
		display: flex;
		flex-direction: column;
		position: relative;
		align-items: center;
		justify-content: space-between;

		.top-title-text {
			margin-top: 20rpx;
		}
	}

	.top-content-pd::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 80rpx;
		border-top-right-radius: 12rpx;
		border-top-left-radius: 12rpx;
		background: #FAFCFF;
		bottom: 0;
		left: 0;
		z-index: 0;
	}

	.search_content {
		width: 690rpx;
		height: 60rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 30rpx;
		margin-bottom: 26rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		position: relative;
	}

	.tab-content {
		height: 54rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		z-index: 10;
	}

	.tab-content-sign {
		width: 138rpx;
		height: 54rpx;
		margin: 0 20rpx;
		text-align: center;
		line-height: 54rpx;
		font-size: 30rpx;
		color: #666666;
	}

	.active {
		background: linear-gradient(135deg, rgba(81, 140, 255, 1), rgba(30, 119, 254, 1));
		box-shadow: 0px 2px 10px 0px rgba(51, 125, 255, 0.3);
		border-radius: 27px;
		z-index: 10;
		color: #fff;
		font-weight: bold;
	}


	.search-icon {
		width: 26rpx;
		height: 26rpx;
		position: absolute;
		left: 36rpx;
		top: 50%;
		transform: translateY(-50%);
	}

	.search-box {
		flex: 1;
		text-align: center;
		font-size: 28rpx;
	}

	.pre-line-box {
		height: 22rpx;
		border-bottom: 1px solid #E1E3E6;
		background: #FAFCFF;
		width: 100%;
	}
</style>
