<template>
	<view class="content">
		<view v-for="(item,index) in arr" :key="index" class="all-content" @click="dianji(item.ID,'all',item.TYPE)">
			<view class="neirong-box">
				<text>{{item.CUSTNAME}}</text>
				<text>{{item.CUSTPHONE}}</text>
			</view>
			<!-- 备份用的  万一需要各个类型都要标记 -->
			<!-- <view class="state-box" :class="{intention:item.state=='intention'?true:false,succeeded:item.TYPE=='succeeded'?true:false,reserved:item.state=='reserved'?true:false}"> -->
			<view class="state-box" :class="{intention}" v-if="item.TYPE==-1">
				意向
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'all',
		props:['arr'],
		
		data(){
			return {
				intention:'intention',
				reserved:'reserved',
				succeeded:'succeeded',
				allList:[]
			}
		},
		methods:{
			dianji(id,state,type){
				this.$emit('chakan',id,state,type)
			}
		}
	}
</script>

<style>
	.all-content{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width:690rpx;
		height:156rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 2rpx 16rpx 0px rgba(220,225,230,0.6);
		border-radius:10rpx;
		margin-bottom: 24rpx;
	}
	.neirong-box{
		display: flex;
		flex-direction: column;
		margin-left: 32rpx;
	}
	.neirong-box>text:nth-of-type(1){
		line-height: 34rpx;
		font-size: 34rpx;
		color: #292929;
		margin-bottom: 26rpx;
		font-weight: 600;
	}
	.neirong-box>text:nth-of-type(2){
		line-height: 30rpx;
		font-size: 30rpx;
		color: ##808080;
	}
	.state-box{
		width: 106rpx;
		height: 44rpx;
		font-size: 25rpx;
		line-height: 44rpx;
		border-radius: 22rpx;
		text-align: center;
		margin-right: 30rpx;
		
	}
	.intention{
		background: #ffeff2;
		color: #ce6282;
	}
	.succeeded{
		background: #f2f6fe;
		color: #417adf;
	}
	.reserved{
		background: #fff8ed;
		color: #dab053;
	}
</style>
