<template>
	<view class="content">
		<uni-collapse :accordion="true" class="boxbox">
			
			<uni-collapse-item v-for="item in arr" :key="item.ID" :tel="item.CUSTPHONE" :title="item.CUSTNAME" :show-animation="item.animation" :biaoji="item.STATUS" @readMsg="readMsg(item.ID)"
			 class="box">
				<!-- <text class="content">{{ item.content }}</text> -->
				
				<view class="txt-box">
					<text class="txt1">{{item.QITA1}}</text>
					<text class="txt2">投资金额：<text class="txt2-1">{{item.QITA2}}</text><!-- <text class="txt2-1">元</text> --></text>
					<text class="txt2">预约失效时间：<text class="txt2-1">{{item.QITA3}}</text></text>
				</view>
			</uni-collapse-item>
		</uni-collapse>

	</view>
</template>

<script>
	import http from '../../api/http.js'
	import token from '../../api/token.js'
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	export default {
		name: 'shibai',
		props: ['arr'],
		components: {
			uniCollapse,
			uniCollapseItem,
			// uniSection
		},
		mounted() {
			console.log(this.arr)
		},
		data() {
			return {

			}
		},
		methods:{
			readMsg(ID){
				console.log(ID)
				let token = uni.getStorageSync('token')
				uni.request({
					url:http.server_path + http.yueduxiaoxi,
					method:'POST',
					header:{
						'content-type': 'application/x-www-form-urlencoded',
						token: token
					},
					data:{
						ID:ID
					},
					success: (res) => {
						console.log(res)
					}
				})
			}
		}
	}
</script>

<style>
	.boxbox {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: none;
		position: relative;
	}

	.box {
		width: 580rpx;
		padding: 36rpx 55rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2rpx 16rpx 0px rgba(220, 225, 230, 0.6);
		border-radius: 10rpx;
		margin-bottom: 24rpx;
		position: relative;
	}
	.biaoji{
		width: 20rpx;
		height: 20rpx;
		background: #007AFF;
		border-radius: 50%;
		position: absolute;
		left: -0rpx;
		top: -50rpx;
	}
	.txt-box {
		display: flex;
		flex-direction: column;

	}

	.txt1 {
		color: #292929;
		font-size: 30rpx;
		line-height: 30rpx;
		margin-bottom: 29rpx;
	}

	.txt2 {
		color: #666666;
		font-size: 26rpx;
		line-height: 26rpx;
		margin-bottom: 23rpx;
	}

	.txt2-1 {
		color: #292929;
	}
</style>
