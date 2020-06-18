<template>
	<view class="content">
		<view v-for="(item,index) in arr" :key="index" class="all-content" @click="dianji(item.ID,'yiyuyue')">
			<view class="neirong-box">
				<text>{{item.CUSTNAME}}</text>
				<text>{{item.CUSTPHONE}}</text>
			</view>
			<view class="state-box" :class="{reserved}">
				已预约
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'yuyue',
		props:['arr'],
		data(){
			return {
				intention:'intention',
				reserved:'reserved',
				succeeded:'succeeded',
				allList:[
					{
						id:35,
						name:'黄飞鸿',
						tel:'15165217869',
						state:'reserved', //状态：意向
						text:'已预约'
					},
					{
						id:36,
						name:'王晓明',
						tel:'15165217869',
						state:'reserved' ,//状态：意向
						text:'已预约'
					}
				]
			}
		},
		methods:{
			dianji(id,state){
				this.$emit('chakan',id,state)
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
