<template>
	<view class="content">
		<view v-for="(item,index) in arr" :key="index" class="all-content" @click="dianji(item.ID,item.REPAYSTATE)">
			<view class="detail-top">
				<text>{{item.PRODUCT}}</text>
				<view class="state-box" :class="{yuyue}" v-if="item.REPAYSTATE == -1">
					已预约
				</view>
				<view class="state-box" :class="{shenhe}" v-else>
					待审核
				</view>
			</view>
			<text>预约金额：<text>{{item.YEJI}}</text></text>
			<text>预约有效时间：<text>{{item.USEFULLDATE}}</text></text>
			<text>客户姓名：<text>{{item.CUSTNAME}}</text></text>
		</view>
	</view>
</template>

<script>
	export default {
		name:'yuyue',
		props:['arr'],
		data(){
			return{
				yuyue:'yuyue',
				shenhe:'shenhe',
				failed:'failed',
				succeeded:'succeeded',
				allList:[
					{
						id:12,
						name:'A型资产',
						gold:'50万元',
						youxiao:'3天',
						state:'yuyue', //状态：预约
						text:'王小明',
						text1:'已预约'
					},
					{
						id:13,
						name:'B型资产',
						gold:'50万元',
						youxiao:'3天',
						state:'yuyue', //状态：预约
						text:'王小明',
						text1:'已预约'
					},
					{
						id:14,
						name:'D型资产',
						gold:'50万元',
						youxiao:'3天',
						state:'yuyue', //状态：预约
						text:'王小明',
						text1:'已预约'
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
		flex-direction: column;
		justify-content: space-between;
		/* align-items: center; */
		width:630rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 2rpx 16rpx 0px rgba(220,225,230,0.6);
		border-radius:10rpx;
		padding: 36rpx 30rpx;
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
		/* margin-right: 30rpx; */
		
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
	.detail-top{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 29rpx;
	}
	.detail-top>text{
		line-height: 34rpx;
		color: #292929;
		font-weight: bold;
	}
	
	.all-content>text{
		line-height: 26rpx;
		color: #808080;
		font-size: 26rpx;
		margin-bottom: 20rpx;
	}
</style>
