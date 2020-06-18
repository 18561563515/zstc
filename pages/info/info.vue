<template>
	<view class="content">
		<view class="top-content">
			<uni-nav-bar left-icon="back" title="个人信息" @clickLeft="fanhui" ></uni-nav-bar>
		</view>
		
		
		<view class="tab-content">
			<view class="neirong">
				<view class="name-box">
					<text>{{User_Info.USER_NAME}}</text>
					<text>NO.{{User_Info.USER_CODE}}</text>
				</view>
				<view class="xiangqing">
					<image src="../../static/icon/icon_department.png" mode="widthFix" class="icon1"></image>
					<view>
						<text>所在营业部门</text>
						<text>{{User_Info.ORGANIZATION_NAME}}</text>
					</view>
				</view>
				<!-- <view class="xiangqing">
					<image src="../../static/icon/icon_city.png" mode="widthFix" class="icon1"></image>
					<view>
						<text>城市</text>
						<text>青岛</text>
					</view>
				</view> -->
				<view class="xiangqing">
					<image src="../../static/icon/icon_superior.png" mode="widthFix" class="icon1"></image>
					<view>
						<text>上级</text>
						<text>{{User_Info.LEADERNAME}}</text>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import pageback from '../../api/pageback.js'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				User_Info:{}
			}
		},
		components:{
			uniNavBar
		},
		onLoad() {
			this.User_Info = uni.getStorageSync('User_Info')
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
			height: 160rpx;
			justify-content: flex-start;
		}
	
		.top-content::before {
			display: none;
		}
	
		.top-title-text {
			margin-top: 24rpx;
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
		display: flex;
		justify-content: center;
	}
	.neirong{
		width:690rpx;
		display: flex;
		flex-direction: column;
	}
	
	.name-box{padding-bottom: 43rpx;border-bottom: 1px dashed rgba(212,214,217,1);display: flex;flex-direction: column;padding-top: 30rpx;margin-bottom: 40rpx;}
	.name-box>text:nth-of-type(1){
		font-size: 40rpx;
		color: #292929;
		line-height: 40rpx;
		margin-bottom: 38rpx;
		font-weight: bold;
	}
	.name-box>text:nth-of-type(2){
		font-size: 32rpx;
		color: #FFAA00;
		line-height: 32rpx;
	}
	
	.icon1{
		width: 30rpx;
		height: 30rpx;
		margin-right: 12rpx;
	}
	.xiangqing{
		display: flex;
		flex-direction: row;
		margin-bottom: 50rpx;
	}
	.xiangqing>view{
		display: flex;
		flex-direction: column;
	}
	.xiangqing>view>text:nth-of-type(1){
		font-size: 32rpx;
		color: #292929;
		line-height: 32rpx;
		font-weight: 700;
		margin-bottom: 33rpx;
	}
	.xiangqing>view>text:nth-of-type(2){
		font-size: 30rpx;
		color: #3D3D3D;
		line-height: 30rpx;
	}
</style>
