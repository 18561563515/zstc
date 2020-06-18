<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import url("./static/css/animate.min.css");
	/*每个页面公共css */
	.content{display: flex;flex-direction: column;align-items: center;justify-content: center;}
	.top-content{height: 114rpx;/* background:linear-gradient(135deg,rgba(81,140,255,1),rgba(30,119,254,1)); */width: 100%;display: flex;flex-direction: row;justify-content: center;align-items: center;position: relative;}
	.top-content::before{content: '';position: absolute;width: 100%;height: 12rpx;border-top-right-radius: 12rpx;border-top-left-radius: 12rpx;background: #FAFCFF;bottom: 0;left: 0;}
	.top-title-text{font-size: 36rpx;letter-spacing: 2px;color: #fff;font-family: '微软雅黑',Arial, Helvetica, sans-serif;}
	text{font-family: '微软雅黑',Arial, Helvetica, sans-serif;}
	.main-content{width: calc(100% - 80rpx);background: #FAFCFF;padding-top: 28rpx;padding-left: 40rpx;padding-right: 40rpx;display: flex;flex-direction: column;}
	
	.placeholder-color{color: #B3B3B3;font-size: 28rpx;}
	
	
	/* 产品列表 */
	.product-list{
		width:610rpx;
		height:248rpx;
		background:rgba(255,255,255,1);
		box-shadow:0rpx 2rpx 16rpx 0rpx rgba(220,225,230,0.6);
		border-radius:10rpx;
		margin-top: 24rpx;
		padding: 30rpx 40rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.product-list:last-child{margin-bottom: 26rpx;}
	.product-list-detail{display: flex;flex-direction: row;justify-content: space-between;font-size: 26rpx;color: #808080;}
	
	.a1{font-size: 30rpx;color: #292929;font-weight: bold;}
	.a2{font-size: 26rpx;color: #333333;}
	.a3{font-size: 70rpx;color: #FFAA00;font-weight: 500;}
	.a4{font-size: 35rpx;}
	.a5{font-size: 70rpx;color: #4B8AFF;font-weight: 500;}
	.a6{font-size: 35rpx;}
	.a7{color: #292929;margin-left: 20rpx;}
	
	.pre-line{border-bottom: 1px dashed   #D4D6D9;height: 1px;width: 100%;}
	
	.teshu{line-height: 70rpx;height: 70rpx;}
	/* 结束 */
</style>
