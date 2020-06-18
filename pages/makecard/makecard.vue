<template>
	<view class="content">
		<view class="top-box">
			<uni-nav-bar left-icon="back" title="个人名片" @clickLeft="fanhui"></uni-nav-bar>

			<swiper :indicator-dots="false" :autoplay="false" :interval="3000" :duration="300" class="swiper-box" @change="change">
				<swiper-item v-for="(i,index) in list" :key="index">
					<view class="swiper-item">
						<view class="cardbg">
							<image src="../../static/img/bg_card.png" mode="widthFix" class="pic"></image>
						</view>
						<view class="top">
							<image src="../../static/img/img_logo.png" mode="widthFix" class="img-logo"></image>
							<view class="gongsi">
								<text>证圣天成企业管理(青岛)有限公司</text>
								<!-- <text>证圣天成企业有限公司</text> -->
							</view>
						</view>
						<view class="bottom">
							<view class="info">
								<text>姓名</text>
								<text>岗位</text>
								<view class="tel-box">
									<image src="../../static/img/icon_tel(1).png" mode="widthFix" class="tel-icon"></image>
									<text>18800000000</text>
								</view>
							</view>
							<view class="qrcode">
								微信二维码
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<swiper-dot class="dot" :current="current" :list="list"></swiper-dot>
			<view class="btn-group">
				
				<view class="shengcheng-btn" @click="erweimabox=true">
					更新二维码
				</view>
				<view class="shengcheng-btn" @click="yijian">
					一键生成
				</view>
			</view>

		</view>

		<!-- 上传二维码弹窗 -->
		<view class="erweima-box" v-if="erweimabox">
			<view class="beijing" @click="yincang">

			</view>
			<view class="erweima-box-box animated bounceIn">
				<view class="add-img-item" v-if="zhaopiankuang">
					<image class="add-img" :src="dizhi" mode="aspectFill"></image>
				</view>
				<button type="primary" @click="choosePic" v-if="anniushow">选择二维码</button>
				<button type="primary" @click="shangchaun" v-else>上 传</button>
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
				list: [{
					content: '内容 A',

				}],
				current: 0,
				erweimabox: false,
				imgList: [],
				cloudimgList: [],
				imgCount: 9,
				dizhi: '',
				anniushow: true,
				zhaopiankuang: false
			}
		},
		components: {
			uniNavBar,
			swiperDot
		},
		methods: {
			change(e) {
				this.current = e.detail.current;
			},
			//一键生成
			yijian() {
				uni.showLoading({

				})
				let token = uni.getStorageSync('token')
				uni.request({
					url: http.server_path + http.shengchengmingpian,
					method: 'POST',
					header: {
						token: token,
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						if (res.data.success) {
							uni.hideLoading()
							uni.navigateTo({
								url: '../cardsucc/cardsucc'
							})
						} else {
							uni.hideLoading()
							this.erweimabox = true
						}
					}
				})
			},
			fanhui() {
				pageback()
			},
			yincang(e) {
				this.erweimabox = false
				this.imgList = []
				this.anniushow = true
				this.zhaopiankuang = false
			},
			choosePic() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						this.imgList.push(res.tempFiles)
						this.dizhi = this.imgList[0][0].path
						this.anniushow = false
						this.zhaopiankuang = true
					}
				});
			},
			shangchaun() {
				let token = uni.getStorageSync('token')
				uni.uploadFile({
					url: http.server_path + http.erweima,
					method: 'POST',
					header: {
						token: token
					},
					filePath: this.imgList[0][0].path,
					success: (res) => {
						let arr = JSON.parse(res.data)
						console.log(arr)
						if (arr.success) {
							uni.navigateTo({
								url: '../cardsucc/cardsucc'
							})
						} else {

						}
					},
				})
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		background: #FAFCFF;
		position: relative;
		height: 100%;
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
		height: 400rpx;
		border-radius: 20rpx;
		box-shadow: 0px 2px 16rpx 0px rgba(220, 225, 230, 0.6);
		/* overflow: hidden; */
	}

	.swiper-item {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		position: relative;
	}

	.dot {
		margin-top: 50rpx;
	}

	.cardbg {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}

	.pic {
		width: 100%;
		height: 100%;
	}

	.img-logo {
		width: 160rpx;
		height: 47rpx;
		margin-left: 40rpx;
	}

	.top {
		margin-top: 40rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 53rpx;
		height: 47rpx;
	}

	.gongsi {
		width: 340rpx;
		position: relative;
		height: 47rpx;
		display: flex;
		align-items: center;
	}

	.gongsi::before {
		width: 100%;
		height: 2px;
		content: '';
		position: absolute;
		bottom: 5rpx;
		left: 0;
		background: linear-gradient(90deg, rgba(220, 183, 103, 1), rgba(169, 127, 72, 1));
	}

	.gongsi>text {
		font-size: 10px;
		line-height: 18rpx;
		color: #292929;
	}

	.bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.info {
		display: flex;
		flex-direction: column;
		margin-left: 82rpx;
	}

	.info>text:nth-of-type(1) {
		font-size: 44rpx;
		line-height: 44rpx;
		color: #292929;
		margin-bottom: 25rpx;
	}

	.info>text:nth-of-type(2) {
		font-size: 28rpx;
		line-height: 28rpx;
		color: #A97F48;
		margin-bottom: 39rpx;
	}

	.tel-icon {
		width: 22rpx;
		height: 26rpx;
		margin-right: 10rpx;
	}

	.tel-box {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.tel-box>text {
		font-size: 26rpx;
		line-height: 26rpx;
		color: #3D3D3D;
	}

	.qrcode {
		width: 130rpx;
		height: 130rpx;
		background: rgba(240, 240, 240, 1);
		margin-right: 80rpx;
		line-height: 130rpx;
		text-align: center;
		font-size: 20rpx;
		color: #999999;
	}

	.shengcheng-btn {
		width: 300rpx;
		height: 80rpx;
		background: linear-gradient(135deg, rgba(81, 140, 255, 1), rgba(30, 119, 254, 1));
		box-shadow: 0px 4rpx 10rpx 0px rgba(51, 125, 255, 0.4);
		border-radius: 40rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		text-align: center;
		line-height: 80rpx;
		margin: 0 20rpx;
		margin-top: 76rpx;
		
	}


	.erweima-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}

	.erweima-box-box {
		width: 650rpx;
		height: 400rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: #fff;
		border-radius: 20rpx;
	}

	.beijing {
		position: absolute;
		background: rgba(0, 0, 0, .7);
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}

	.add-img-item {
		/* width:210rpx;
			height:210rpx; */
		width: 210rpx;
		height: 210rpx;
		position: relative;
		padding-bottom: 20rpx;
	}

	.add-img {
		width: 210rpx;
		height: 210rpx;
		border-radius: 24rpx;
	}
	.btn-group{
		display: flex;
		flex-direction: row;
	}
</style>
