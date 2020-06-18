<template>
	<view class="content">
		<view class="top-content">
			<uni-nav-bar left-icon="back" title="订单详情" @clickLeft="fanhui"></uni-nav-bar>
		</view>
		
		<view class="tab-content">
			<!-- 已预约 -->
			<view class="tab-content-box" v-if="yuyue">
				<view class="chanpin-box">
					<view class="title-box">
						<image src="../../static/icon/icon_product.png" mode="widthFix" class="icon1"></image>
						<text>产品信息</text>
					</view>
					<view class="mingcheng-box">
						<text>{{info.PRODUCT}}</text>
						<view class="state-box yuyue" v-if="info.REPAYSTATE == -1">已预约</view>
						<view class="state-box shenhe" v-else>待审核</view>
					</view>
					<view class="tongyong">
						<text>预约期限</text>
						<text>{{info.DATELINE}}个月</text>
					</view>
					<view class="tongyong">
						<text>利率</text>
						<text>{{info.NEWRATE}}%</text>
					</view>
					<view class="tongyong">
						<text>还款方式</text>
						<text>{{info.REPAYMODE}}</text>
					</view>
					<view class="tongyong">
						<text>预约有效时间</text>
						<text>{{info.USEFULLDATE}}天</text>
					</view>
				</view>
				<view class="kehu-box">
					<view class="title-box">
						<image src="../../static/icon/icon_customer(1).png" mode="widthFix" class="icon2"></image>
						<text>客户信息</text>
					</view>
					<view class="mingcheng-box">
						<text>{{info.CUSTNAME}}</text>
					</view>
					<view class="tongyong">
						<text>身份证号</text>
						<text>{{info.IDCARD}}</text>
					</view>
					<view class="tongyong">
						<text>手机号</text>
						<text>{{info.PHONE}}</text>
					</view>
					<view class="tongyong">
						<text>预约打款时间</text>
						<text>{{info.DAKUANDATE}}</text>
					</view>
					<view class="tongyong">
						<text>预约金额</text>
						<text>{{info.YEJI}}元</text>
					</view>
					<view class="tongyong">
						<text>卡号</text>
						<text>{{info.BANKNO}}</text>
					</view>
					<view class="tongyong">
						<text>开户行</text>
						<text>{{info.BANK}}</text>
					</view>
				</view>
			</view>
			
			<!-- 已成交-->
			<view class="tab-content-box" v-if="chengjiao">
				<view class="chanpin-box">
					<view class="title-box">
						<image src="../../static/icon/icon_product.png" mode="widthFix" class="icon1"></image>
						<text>产品信息</text>
					</view>
					<view class="mingcheng-box">
						<text>{{info.PRODUCT}}</text>
						<view class="state-box succeeded">已成交</view>
					</view>
					<view class="tongyong">
						<text>产品期限</text>
						<text>{{info.DATELINE}}个月</text>
					</view>
					<view class="tongyong">
						<text>利率</text>
						<text>{{info.RATE*100}}%</text>
					</view>
					<view class="tongyong">
						<text>还款方式</text>
						<text>{{info.REPAYMODE}}</text>
					</view>
				</view>
				<view class="kehu-box">
					<view class="title-box">
						<image src="../../static/icon/icon_customer(1).png" mode="widthFix" class="icon2"></image>
						<text>客户信息</text>
					</view>
					<view class="mingcheng-box">
						<text>{{info.CUSTNAME}}</text>
					</view>
					<view class="tongyong">
						<text>成交日期</text>
						<text>{{info.IMPORTDATE}}</text>
					</view>
					<view class="tongyong">
						<text>计息日期</text>
						<text>{{info.STARTDATE}}</text>
					</view>
					<view class="tongyong">
						<text>成交金额</text>
						<text>{{info.ENDMONEY}}元</text>
					</view>
					<view class="tongyong">
						<text>预约金额</text>
						<text>{{info.YEJI}}元</text>
					</view>
					<view class="tongyong">
						<text>到期日期</text>
						<text>{{info.ENDDATE}}</text>
					</view>
				</view>
			</view>
			
			
			<!-- 已失效-->
			<view class="tab-content-box" v-if="shixiao">
				<view class="chanpin-box">
					<view class="title-box">
						<image src="../../static/icon/icon_product.png" mode="widthFix" class="icon1"></image>
						<text>产品信息</text>
					</view>
					<view class="mingcheng-box">
						<text>{{info.CUSTNAME}}</text>
						<view class="state-box failed">已失效</view>
					</view>
					<view class="tongyong">
						<text>产品期限</text>
						<text>{{info.DATELINE}}个月</text>
					</view>
					<view class="tongyong">
						<text>利率</text>
						<text>{{info.RATE*100}}%</text>
					</view>
					<view class="tongyong">
						<text>还款方式</text>
						<text>{{info.REPAYMODE}}</text>
					</view>
					<view class="tongyong">
						<text>失效时间</text>
						<text>{{info.STARTDATE}}</text>
					</view>
					<view class="tongyong">
						<text>失效原因</text>
						<text>已过有效期</text>
					</view>
				</view>
				<view class="kehu-box">
					<view class="title-box">
						<image src="../../static/icon/icon_customer(1).png" mode="widthFix" class="icon2"></image>
						<text>客户信息</text>
					</view>
					<view class="mingcheng-box">
						<text>{{info.CUSTNAME}}</text>
					</view>
					<view class="tongyong">
						<text>预约金额</text>
						<text>{{info.ENDMONEY}}元</text>
					</view>
				</view>
			</view>
			
			
		</view>
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
				yuyue:false,
				chengjiao:false,
				shixiao:false,
				info:[]
			}
		},
		components:{
			uniNavBar
		},
		onLoad(obj) {
			uni.showLoading({
				
			})
			let token = uni.getStorageSync('token')
			console.log(obj.id)
			console.log(obj.state)
			switch (obj.state){
				/* case 'yuyue':
					this.yuyue = true
					this.chengjiao = false
					this.shixiao = false
					break; */
				case '2': //已成交
					this.yuyue = false
					this.chengjiao = true
					this.shixiao = false
					break;
				case '-2': //已失效
					this.yuyue = false
					this.chengjiao = false
					this.shixiao = true
					break;
				default: //其他都是已预约状态
					this.yuyue = true
					this.chengjiao = false
					this.shixiao = false
					break;
			}
			
			/* 获取 */
			uni.request({
				url:http.server_path + http.kehufuwuxiangqing,
				method:'POST',
				data:{ID:obj.id},
				header:{
					token:token,
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					
					console.log(JSON.parse(res.data.data))
					if(res.data.success){
						uni.hideLoading()
						this.info = JSON.parse(res.data.data)[0]
					}
					
				},
				fail: (res) => {
					console.log(res)
				}
			})
			
		},
		methods: {
			//返回
			fanhui(){
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
		height: 120rpx;
		justify-content: flex-start;
	}
	.tab-content {
		width: 100%;
		border-top-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
		margin-top: -30rpx;
		background: #FAFCFF;
		z-index: 10;
		padding-top: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.tab-content-box{
		width:690rpx;
		display: flex;
		flex-direction: column;
		
	}
	.chanpin-box{
		display: flex;
		flex-direction: column;
		border-bottom: 1px dashed rgba(212,214,217,1);
		padding-bottom: 40rpx;
		padding-top: 20rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
	}
	.kehu-box{
		display: flex;
		flex-direction: column;
		padding-bottom: 40rpx;
		padding-top: 40rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
	}
	.title-box{
		display: flex;flex-direction: row;
		align-items: center;
		margin-bottom: 41rpx;
	}
	.icon1{width: 32rpx;height: 34rpx;}
	.icon2{width: 32rpx;height: 30rpx;}
	
	.title-box>text{
		font-size: 32rpx;
		color: #337DFF;
		line-height: 32rpx;
		font-weight: 700;
		margin-left: 13rpx;
	}
	
	.mingcheng-box{
		display: flex;flex-direction: row;align-items: center;
	}
	.mingcheng-box>text{
		color: #292929;
		font-size: 34rpx;
		font-weight: 700;
	}
	.state-box{
		width: 106rpx;
		height: 44rpx;
		font-size: 25rpx;
		line-height: 44rpx;
		border-radius: 22rpx;
		text-align: center;
		margin-left: 24rpx;
		
	}
	.failed{
		background: #f3f3f5;
		color: #939295;
	}
	.succeeded{
		background: #f2f6fe;
		color: #417adf;
	}
	.yuyue{
		background: #fff8ed;
		color: #dab053;
	}
	.shenhe{
		background: #fff2d2;
		color: #da7546;
	}
	.tongyong{
		display: flex;flex-direction: row;margin-top: 30rpx;
	}
	.tongyong>text{
		font-size: 30rpx;
		line-height: 30rpx;
	}
	.tongyong>text:nth-of-type(1){
		color: #808080;
		width: 210rpx;
	}
	.tongyong>text:nth-of-type(2){
		color: #3D3D3D;
	}
</style>
