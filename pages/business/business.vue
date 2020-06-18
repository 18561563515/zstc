<template>
	<view class="content">
		<view class="top-box">
			<uni-nav-bar left-icon="back" title="展业工具" @clickLeft="fanhui"></uni-nav-bar>
			
			<!-- 名片 -->
			<view class="mingpian">
				<view class="details">
					<text class="gerenmingpian">个人名片</text>
					<view class="line">
						
					</view>
					<text class="yijian">一键生成专属名片 转发客户更便利</text>
					<view class="make-btn" @click="makecard">
						去制作
					</view>
				</view>
				<image src="../../static/img/img_card.png" mode="widthFix" class="img-card"></image>
			</view>
			
			<!-- 海报 -->
			<view class="haibao">
				<view class="details">
					<text class="gerenmingpian">海报</text>
					<view class="line1">
						
					</view>
					<text class="yijian">根据业务需求定制海报</br>推荐产品更简单</text>
					<view class="make-btn" @click="makeposter">
						去制作
					</view>
				</view>
				<image src="../../static/img/img_poster.png" mode="widthFix" class="img-poster"></image>
			</view>
		</view>
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
				
			}
		},
		components:{uniNavBar},
		methods: {
			fanhui(){
				pageback()
			},
			makecard(){
				uni.navigateTo({
					url:'../makecard/makecard'
				})
			},
			makeposter(){
				uni.navigateTo({
					url:'../makeposter/makeposter'
				})
			}
		}
	}
</script>

<style>
	page{width: 100%;background: #FAFCFF;position: relative;}
	.top-box{width: 100%;display: flex;flex-direction: column;align-items: center;background: url(../../static/img/bg_top.png) no-repeat center top;background-size: 100% auto;}
	.top-content::before{display: none;}
	.mingpian,.haibao{
		width:690rpx;
		height:460rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 2px 16rpx 0px rgba(220,225,230,0.6);
		border-radius:10rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.haibao{
		margin-top: 30rpx;
	}
	
	.img-card{
		width: 400rpx;
		height: 290rpx;
		margin-top: 100rpx;
	}
	.img-poster{
		width: 334rpx;
		height: 290rpx;
		margin-top: 100rpx;
	}
	.details{
		display: flex;
		flex-direction: column;
		margin-left: 60rpx;
		flex: 1;
	}
	.gerenmingpian{
		/* width:164rpx;
		text-align: center; */
		font-size: 40rpx;
		color: #3D3D3D;
		line-height: 40rpx;
		z-index: 1;
		font-weight: bold;
		margin-top: 90rpx;
	}
	.line{
		width:164rpx;
		height:10rpx;
		background:rgba(255,237,163,1);
		margin-top: -5rpx;
		margin-bottom: 28rpx;
	}
	.line1{
		width:84rpx;
		height:10rpx;
		background:rgba(255,237,163,1);
		margin-top: -5rpx;
		margin-bottom: 28rpx;
	}
	.yijian{
		/* width: 205rpx; */
		font-size: 26rpx;
		color: #666666;
		line-height: 40rpx;
	}
	.make-btn{
		width:200rpx;
		height:70rpx;
		background:linear-gradient(135deg,rgba(81,140,255,1),rgba(30,119,254,1));
		box-shadow:0px 4rpx 10rpx 0px rgba(51,125,255,0.4);
		border-radius:35rpx;
		text-align: center;
		line-height: 70rpx;
		color: #fff;
		font-size: 30rpx;
		margin-top: 104rpx;
	}
</style>
