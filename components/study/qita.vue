<template>
	<view class="content">
		
		
		
		<view v-for="(item,index) in arr" :key="index" :class="item.ISVIDEO=='1'?shipin:xinwen" class="common" @click="xiangqing(item.ID,item.ISVIDEO)">
			<view class="title-content">
				<text>{{item.TITLE}}</text>
				<text>{{item.CREATEDATE}}</text>
			</view>
			<view class="thumb">
				<view class="thumb-pic">
					<image :src="httpsrc+item.IMGLOAD" mode="aspectFill" class="thumb-pic-pic"></image>
				</view>
				<view class="tip">
					技巧类
				</view>
				<image src="../../static/icon/btn_play.png" mode="widthFix" class="playVideo" v-if="item.ISVIDEO=='1'" @click="playVideo(item.VIDEOLOAD)"></image>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		name: 'qita',
		props:['arr','httpsrc'],
		mounted() {
			console.log(this.arr)
		},
		data() {
			return {
				shipin:'shipin',
				xinwen:'xinwen',
				videoSrc:'',
				videoShow:false,
				current:0,
				jiqiaoList: [{
						type: 'video',
						title: '视频标题-视频标题上传',
						date: '2020.05.12 15:23',
						img:'https://v2code.cn/app/yeji/thumb.jpg',
						video:'https://v2code.cn/app/jianli/works/video/HC_chilun.mp4'
					},
					{
						type: 'news',
						title: '文章标题-文章标题上传',
						date: '2022.08.12 11:13',
						img:'https://v2code.cn/app/yeji/thumb.jpg'
					},
					{
						type: 'news',
						title: '文章标题-文章标题上传',
						date: '2022.08.12 11:13',
						img:'https://v2code.cn/app/yeji/thumb.jpg'
					},
					{
						type: 'news',
						title: '文章标题-文章标题上传',
						date: '2022.08.12 11:13',
						img:'https://v2code.cn/app/yeji/thumb.jpg'
					},
					{
						type: 'news',
						title: '文章标题-文章标题上传',
						date: '2022.08.12 11:13',
						img:'https://v2code.cn/app/yeji/thumb.jpg'
					},
					{
						type: 'news',
						title: '文章标题-文章标题上传',
						date: '2022.08.12 11:13',
						img:'https://v2code.cn/app/yeji/thumb.jpg'
					},
				]
			}
		},
		methods:{
			playVideo(src){
				this.$emit('playshipin',src)
			},
			xiangqing(ID,type){
				console.log(ID)
				if(type == 1){
					return false
				}else{
					uni.navigateTo({
						url:'../../pages/news/news?ID='+ID
					})
				}
			}
		}
	}
</script>

<style>
	.common {
		width: 690rpx;
		height: 430rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2rpx 16rpx 0px rgba(220, 225, 230, 0.6);
		border-radius: 10rpx;
		margin-bottom: 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 0;
	}
	
	.xinwen{
		flex-direction: column;
	}
	
	.shipin{
		flex-direction:  column-reverse;
	}
	
	.playVideo{
		width: 80rpx;
		height: 80rpx;
		position: absolute;
		right: 24rpx;
		top: 280rpx;
	}
	
	.thumb{
		width:650rpx;
		height:320rpx;
		border-radius:10rpx;
		/* background: #006600; */
		position: relative;
	}
	
	.title-content{
		display: flex;
		flex-direction: column;
		align-items: initial;
		width: 100%;
	}
	.title-content>text{padding: 0 29rpx;}
	.title-content>text:nth-of-type(1){
		line-height: 30rpx;
		color: #292929;
		font-size: 30rpx;
		font-weight: 600;
	}
	.title-content>text:nth-of-type(2){
		line-height: 24rpx;
		color: #B3B3B3;
		font-size: 24rpx;
		margin-top: 24rpx;
	}
	.thumb-pic{
		width: 100%;
		height: 100%;
		border-radius:10rpx;
		overflow: hidden;
	}
	.thumb-pic-pic{
		width: 100%;
	}
	.tip{
		width:106rpx;
		height:40rpx;
		background:rgba(255,255,255,0.2);
		border-radius:20rpx;
		position: absolute;
		top: 20rpx;
		left: 20rpx;
		text-align: center;
		line-height: 40rpx;
		font-size: 22rpx;
		color: #FFFFFF;
	}
	.video-content{
		position: absolute;
		z-index: 1000;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		width: 100%;
		height: 400rpx;
		display: block;
	}
	image{will-change: transform}
</style>
