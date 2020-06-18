<template>
	<view class="content">
		<view class="top-content">
			<uni-nav-bar left-icon="back" title="客户详情" @clickLeft="fanhui"></uni-nav-bar>
		</view>
		<view class="tab-content">
			<view class="xingming-state">
				<text>{{customerName}}</text>
				<!-- <view class="chengjiao-sign">已预约</view> -->
			</view>
			<view class="tel">
				<image src="../../static/icon/icon_tel.png" mode="widthFix" class="tel-icon"></image>
				<text>{{customerPhone}}</text>
			</view>
			<view class="xiangqing" v-for="(item,index) in customer" :key="item.ID">
				<view class="chanpin-head">
					<text class="chanpin-name">{{item.PRODUCT}}</text>
					<!-- 上传合同 -->
					<view class="shangchuanhetong" @click="shangchuan(item.ID)" v-if="item.ISUPLOAD == 0"></view>
				</view>
				
				<view class="tongyong">
					<text>预约金额</text>
					<text>{{item.YEJI}}元</text>
				</view>
				<view class="tongyong">
					<text>预约期限</text>
					<text>{{item.DATELINE}}个月</text>
				</view>
				<view class="tongyong">
					<text>利率</text>
					<text>{{item.NEWRATE}}%</text>
				</view>
				<view class="tongyong">
					<text>还款方式</text>
					<text>{{item.REPAYMODE}}</text>
				</view>
				<view class="tongyong">
					<text>预约有效时间</text>
					<text>{{item.USEFULLDATE}}天</text>
				</view>
				<view class="tongyong">
					<text>预约时间</text>
					<text>{{item.STARTDATE}}</text>
				</view>
				<view class="tongyong">
					<text>到期时间</text>
					<text>{{item.ENDDATE}}</text>
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
				customer:[],
				customerName:'',
				customerPhone:'',
				arr:[]
			}
		},
		components:{
			uniNavBar
		},
		onLoad(res) {
			console.log(res.id)
			console.log(res.state)
			//这里根据状态和ID获取数据，如果状态是已预约，那么返回数据里肯定带一条判断是否需要上传合同的标识符
			uni.showLoading({
				
			})
			let token = uni.getStorageSync('token')
			uni.request({
				url:http.server_path + http.dankehuyeji,
				method:'POST',
				data:{
					CUSTTYPE:res.state,
					CUSTID:res.id,
				},
				header:{
					'content-type': 'application/x-www-form-urlencoded',
					token:token
				},
				success: (res) => {
					// console.log(res)
					if(res.data.success){
						uni.hideLoading()
						let arr = JSON.parse(res.data.data)
					this.customer = JSON.parse(res.data.data)
					this.customerName = arr[0].CUSTNAME
					this.customerPhone = arr[0].PHONE
					console.log(this.customer)
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
			shangchuan(id){
				uni.navigateTo({
					url:'../hetong/hetong?ID='+id
				})
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
	
	.xingming-state{
		display: flex;flex-direction: row;
		width: 100%;
		margin-top: 20rpx;
	}
	.xingming-state>text{line-height: 40rpx;color: #292929;font-weight: bold;margin-left: 40rpx;}
	.chengjiao-sign{
		width: 106rpx;
		height: 44rpx;
		font-size: 25rpx;
		line-height: 44rpx;
		border-radius: 22rpx;
		text-align: center;
		margin-right: 30rpx;
		background: #fff8ed;
		color: #dab053;
		margin-left: 23rpx;
	}
	
	.tel-icon{
		width: 28rpx;
		height: 32rpx;margin-left: 40rpx;
	}
	.tel{width: 100%;display: flex;flex-direction: row;margin-top: 37rpx;}
	.tel>text{font-size: 32rpx;line-height: 32rpx;color: #3D3D3D;margin-left: 11rpx;}
	
	.xiangqing{
		width:670rpx;
		border-top:1px dashed rgba(212,214,217,1);
		margin-top: 43rpx;
		padding-top: 40rpx;
		display: flex;
		flex-direction: column;
		padding-left: 20rpx;
	}
	
	.chanpin-head{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 33rpx;
		height: 64rpx;
		align-items: center;
	}
	.chanpin-name{
		line-height: 34rpx;
		font-size: 34rpx;
		color: #292929;
		font-weight: bold;
		
	}
	
	.tongyong{
		font-size: 30rpx;
		line-height: 30rpx;
		color: #808080;
		margin-bottom: 29rpx;
		display: flex;
		flex-direction: row;
	}
	.tongyong>text:nth-of-type(1){
		display: block;
		width: 210rpx;
		text-align: left;
	}
	.tongyong>text:nth-of-type(2){
		flex: 1;
		text-align: left;
		color: #3D3D3D;
	}
	
	.shangchuanhetong{
		width: 200rpx;
		height: 64rpx;
		background: url(../../static/icon/btn_edit_2.png) no-repeat center center;
		background-size: cover;
	}
</style>
