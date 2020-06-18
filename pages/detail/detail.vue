<template>
	<view class="content">
		<view class="top-box">
			<!-- <view class="top-content">
				<text class="top-title-text">{{productName}}</text>
			</view> -->
			<uni-nav-bar left-icon="back" :title="CHANPIN" @clickLeft="fanhui"></uni-nav-bar>
			<view class="product-list">
				<view class="product-list-detail teshu">
					<text class="a3">{{RATE}}<text class="a4">%</text></text>
					<text class="a5">{{DATELINE}}<text class="a6">个月</text></text>
				</view>
				
				<view class="product-list-detail">
					<text>年化利率</text>
					<text>预约期限</text>
				</view>
				
				<view class="product-list-detail">
					<view class="pre-line"></view>
				</view>
				
				<view class="product-list-detail">
					<text>剩余金额<text class="a7">{{LEFTMONEY/10000}}万元</text></text>
					<text>预约有效时间<text class="a7">{{USEFULLDATE}}天</text></text>
				</view>
			</view>
		</view>
		
		<view class="product-detail">
			<view class="product-detail-box">
				<view class="product-detail-box-title">
					<text>还款方式</text>
				</view>
				<text class="product-detail-box-txt">{{REPAYMODE}}</text>
			</view>
			
			<view class="product-detail-box">
				<view class="product-detail-box-title">
					<text>对接金额</text>
				</view>
				<text class="product-detail-box-txt">最低预约金额为5万元</text>
			</view>
			
			<view class="product-detail-box">
				<view class="product-detail-box-title">
					<text>其他内容</text>
				</view>
				<text class="product-detail-box-txt">无</text>
			</view>
		</view>
		
		<button type="default" class="apply-btn" @click="yuyue">立即预约</button>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import http from '../../api/http.js'
	import token from '../../api/token.js'
	import pageback from '../../api/pageback.js'
	export default {
		data() {
			return {
				CHANPIN: "",
				DATELINE: 12,
				ID: 10,
				ISTUIJIAN: 1,
				LEFTMONEY: 5000000,
				PINGTAI: "",
				RATE: 10.5,
				REPAYMODE: "",
				STATUS: 2,
				USEFULLDATE: 4
			}
		},
		onLoad(option) {
			console.log(option.uid)
			let token = uni.getStorageSync('token')
			uni.request({
				url:http.server_path+http.xiangqing,
				method:'POST',
				data:{ID:option.uid},
				header:{
					token:token,
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					let arr = JSON.parse(res.data.data)
					this.CHANPIN=arr[0].CHANPIN
					this.DATELINE= arr[0].DATELINE
					this.ID= arr[0].ID
					this.ISTUIJIAN=arr[0].ISTUIJIAN
					this.LEFTMONEY= arr[0].LEFTMONEY
					this.PINGTAI= arr[0].PINGTAI
					this.RATE=arr[0].RATE
					this.REPAYMODE= arr[0].REPAYMODE
					this.STATUS=arr[0].STATUS
					this.USEFULLDATE= arr[0].USEFULLDATE
				},
				fail: (res) => {
					console.log(res)
				}
			})
		},
		components:{uniNavBar},
		methods: {
			yuyue(){
				uni.navigateTo({
					url:'../appointment/appointment?CHANPIN='+this.CHANPIN+'&LEFTMONEY='+this.LEFTMONEY+'&USEFULLDATE='+this.USEFULLDATE+'&REPAYMODE='+this.REPAYMODE+'&ID='+this.ID
				})
			},
			fanhui(){
				pageback()
			}
		}
	}
</script>

<style scoped>
	page{width: 100%;background: #FAFCFF;position: relative;}
	.top-box{width: 100%;display: flex;flex-direction: column;align-items: center;background: url(../../static/img/bg_top.png) no-repeat center top;background-size: 100% auto;}
	.top-content::before{display: none;}
	.product-list{height: 224rpx;}
	
	.product-detail{width: 690rpx;background: #fff;
background:rgba(255,255,255,1);
box-shadow:0px 2rpx 16rpx 0px rgba(220,225,230,0.6);
border-radius:10rpx;
display: flex;flex-direction: column;align-items: center;padding-top: 60rpx;}
	
	.apply-btn{position: fixed;width: 100%;bottom: 0;left: 0;
height:98rpx;border-radius: 0;
background:linear-gradient(90deg,rgba(255,170,0,1),rgba(255,196,0,1));
box-shadow:0px -6rpx 24rpx 0px rgba(255,170,0,0.2);color: #fff;font-weight: bold;font-size: 32rpx;line-height: 98rpx;}

.apply-btn::after{border-radius: 0;}

.product-detail-box{
	width:630rpx;
	border-bottom:1px dashed  rgba(212,214,217,1);
	display: flex;flex-direction: column;align-items: center;margin-bottom: 49rpx;
}
.product-detail-box:nth-last-of-type(1){border-bottom: none;}
.product-detail-box-txt{margin-top: 34rpx;margin-bottom: 50rpx;font-size: 26rpx;color: #292929;}
.product-detail-box-title{position: relative;width: 160rpx;display: flex;justify-content: center;flex-direction: row;}
.product-detail-box-title text{z-index: 10;display: block;font-size: 32rpx;font-weight: bold;}
.product-detail-box-title::before{content: '';position: absolute;width: 100%;
height:10rpx;
background:rgba(255,237,163,1);bottom: 0;left: 0;z-index: 0;}
</style>
