<template>
	<view class="dot-main">
		<view :class="['dot-item',current==index?'active':'']" v-for="(item,index) in list" :key="index"></view>
	</view>
</template>
<style>
	.dot-main {
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.dot-item {
		width: 14rpx;
		height: 14rpx;
		background: rgba(51,125,255,0.5);
		margin: 0 8rpx;
		box-sizing: border-box;
		border-radius: 50%;
	}
	.active {
		background: rgba(51,125,255,1);
	}
</style>
<script>
	export default {
		props: [ 'list','current'],
		data() {
			return {
				
			};
		}
	}
</script>