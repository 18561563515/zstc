<template>
	<view class="content">
		<uni-nav-bar left-icon="back" title="" @clickLeft="fanhui" class="wenzhangfanhui"></uni-nav-bar>
		<view class="wenzhangrongqi">
			<image :src="pic_http+'/'+pic" mode="aspectFill" class="pic"></image>
		</view>
		<view class="yuanjiaokuang">
			
		</view>
		<view class="wenzhangxiangqing">
			<view class="biaoqian" v-if="biaoqian==1">技巧类</view>
			<view class="biaoqian" v-else-if="biaoqian==2">产品类</view>
			<view class="biaoqian" v-else-if="biaoqian==3">其他</view>
			<text class="wenzhangbiaoti">{{biaoti}}</text>
			<text class="riqi">{{riqi}}</text>
			<view class="xuxian"></view>
			<view class="zhengwen">
				<text v-html="zhengwen" class="zhengwenneirong"></text>
			</view>
		</view>
		<view class="fanhui-box">
			<view class="fanhui-btn" @click="fanhui">
				
			</view>
			<text>返回</text>
		</view>
	</view>
</template>

<script>
	import http from '../../api/http.js'
	import token from '../../api/token.js'
	import pageback from '../../api/pageback.js'
	export default {
		data() {
			return {
				biaoqian:'3',
				biaoti:'',
				zhengwen:'',
				pic:'',
				pic_http:'',
				riqi:''
			}
		},
		onLoad(res) {
			this.pic_http = http.server_path
			uni.showLoading({
				
			})
			console.log(res.ID)
			let token = uni.getStorageSync('token')
			uni.request({
				url:http.server_path + http.newsdetail,
				method:'POST',
				header:{
					token:token,
					'content-type': 'application/x-www-form-urlencoded'
				},
				data:{ID:res.ID},
				success: (res) => {
					if (res.data.success) {
						console.log(JSON.parse(res.data.data))
						let arr = JSON.parse(res.data.data)[0]
						this.biaoqian = arr.TYPE2
						this.biaoti = arr.TITLE
						this.riqi = arr.MODIFYDATE
						// this.toppic = arr.HREF
						this.zhengwen = arr.CONTEXT
						this.pic = arr.IMGLOAD
						uni.hideLoading()
					} else{
						
					}
				},
				fail: (res) => {
					console.log(res)
				}
			})
		},
		mounted() {
			setTimeout(()=>{
				let imgs = document.querySelectorAll('img')
			console.log(imgs)
			for (let s of imgs) {
				console.log(s)
				s.style.display = 'display'
				s.style.width = '100%'
			}
			},200)
			
		},
		methods: {
			fanhui() {
				pageback()
			},
		}
	}
</script>

<style scoped>
.fanhui-box{
	margin-top: 80rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
}
.fanhui-box>text{
	font-size: 28rpx;
	color: #337DFF;
	line-height: 28rpx;
	margin-left: 22rpx;
}
.fanhui-btn{
	width: 80rpx;
	height: 80rpx;
	background: url(../../static/icon/btn_back.png) no-repeat center center;
	background-size: cover;
	margin-left: 40rpx;
}
.wenzhangrongqi{
	height: 600rpx;
	/* background: #006600; */
	width: 100%;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
}
.wenzhangfanhui{
	position: absolute;
	top: 0;
	z-index: 10;
}
.pic{width: 100%;height: 100%;}
.wenzhangxiangqing{
	width: 668rpx;
	display: flex;
	flex-direction: column;
}
.yuanjiaokuang{
	width: 100%;
	border-top-right-radius: 10rpx;
	border-top-left-radius: 10rpx;
	margin-top: -10rpx;
	height: 35rpx;
	background: #fff;
	z-index: 1;
}
.biaoqian{
	width:120rpx;
	height:44rpx;
	background:rgba(255,170,0,1);
	border-radius:22rpx;
	text-align: center;
	line-height: 44rpx;
	color: #fff;
	font-size: 24rpx;
}
.wenzhangbiaoti{
	font-size: 40rpx;
	line-height: 56rpx;
	color: #292929;
	font-weight: bold;
	margin-top: 30rpx;
}
.xuxian{
	width:100%;
	height:1px;
	border-bottom:1px dashed rgba(200,202,204,1);
	margin-top: 39rpx;
}
.zhengwen{
	margin-top: 36rpx;
}
.zhengwen>text{
	color: #3D3D3D;
	font-size: 32rpx;
	line-height: 48rpx;
}
.riqi{
	color: #B3B3B3;
	font-size: 26rpx;
	margin-top: 23rpx;
	/* margin-bottom: 39rpx; */
}
.zhengwenneirong{
	width: 100% ;
	word-wrap: break-word;
}
.zhengwenneirong img{
	width: 100% !important;
	display: block !important;
	height: auto;
}
</style>
