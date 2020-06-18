<template>
	<view class="content">
		<view class="top-content">
			<uni-nav-bar left-icon="back" title="客户详情" @clickLeft="fanhui"></uni-nav-bar>
		</view>
		<view class="tab-content">
			<view class="xingming-state">
				<view class="">
					<text>{{info.CUSTNAME}}</text>
					<view class="chengjiao-sign">意向</view>
				</view>
				<image src="../../static/icon/btn_edit_1.png" mode="widthFix" class="bianji" @click="bianji(info.ID)"></image>
			</view>
			<view class="tel">
				<image src="../../static/icon/icon_tel.png" mode="widthFix" class="tel-icon"></image>
				<text>{{info.CUSTPHONE}}</text>
			</view>
			<view class="xiangqing">
				<view class="">
					<image src="../../static/icon/icon_notes.png" mode="widthFix" class="icon-notes"></image>
					<text class="chanpin-name">备注</text>
				</view>
				<text class="tongyong">{{info.REMARK?info.REMARK:'无'}}</text>
				
			</view>
		</view>
	</view>
</template>

<script>
	import http from '../../api/http.js'
	import token from '../../api/token.js'
	import pageback from '../../api/pageback.js'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				id:null,
				info:[]
			}
		},
		components:{
			uniNavBar
		},
		onLoad(res) {
			uni.showLoading({
				
			})
			this.id = res.id
			let token = uni.getStorageSync('token')
			uni.request({
				url:http.server_path + http.dankehuyeji,
				method:'POST',
				data:{
					CUSTTYPE:'yixiang',
					CUSTID:res.id
				},
				header:{
					token:token,
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					// console.log(res)
					if(res.data.success){
						uni.hideLoading()
						this.info = JSON.parse(res.data.data)[0]
						uni.setStorageSync('yixiang',this.info)
						console.log(this.info)
					}
					
				},
				fail: (res) => {
					console.log(res)
				}
			})
			
			
		},
		mounted() {
			
		},
		methods: {
			//返回
			fanhui(){
				pageback()
			},
			
			//编辑
			bianji(id){
				uni.navigateTo({
					url:'../edit/edit?id='+id,
				})
			}
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
		height: 120rpx;
		justify-content: flex-start;
	}
	.tab-content {
		width: 100%;
		border-top-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
		margin-top: -30rpx;
		background: #FAFCFF;
		z-index: 10;
		padding-top: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.xingming-state{
		display: flex;flex-direction: row;
		width: 100%;
		margin-top: 20rpx;
		justify-content: space-between;
		align-items: center;
	}
	.xingming-state>view{display: flex;flex-direction: row;align-items: center;}
	.xingming-state text{line-height: 40rpx;color: #292929;font-weight: bold;margin-left: 40rpx;}
	.chengjiao-sign{
		width: 106rpx;
		height: 44rpx;
		font-size: 25rpx;
		line-height: 44rpx;
		border-radius: 22rpx;
		text-align: center;
		margin-right: 30rpx;
		background: #ffeff2;
		color: #ce6282;
		margin-left: 23rpx;
	}
	
	.tel-icon{
		width: 28rpx;
		height: 32rpx;margin-left: 40rpx;
	}
	.tel{width: 100%;display: flex;flex-direction: row;margin-top: 37rpx;}
	.tel>text{font-size: 32rpx;line-height: 32rpx;color: #3D3D3D;margin-left: 11rpx;}
	
	.xiangqing{
		width:670rpx;
		border-top:1px dashed rgba(212,214,217,1);
		margin-top: 43rpx;
		padding-top: 40rpx;
		display: flex;
		flex-direction: column;
		padding-left: 10rpx;
		padding-right: 10rpx;
	}
	
	.xiangqing>view:nth-of-type(1){
		display: flex;flex-direction: row;align-items: center;margin-bottom: 33rpx;
	}
	
	.chanpin-name{
		line-height: 34rpx;
		font-size: 34rpx;
		color: #292929;
		font-weight: bold;
		
	}
	
	.tongyong{
		font-size: 30rpx;
		line-height: 48rpx;
		color: #3D3D3D;
		margin-bottom: 29rpx;
		display: flex;
		flex-direction: row;
	}
	
	
	.bianji{
		width: 150rpx;
		height: 64rpx;
		margin-right: 40rpx;
	}
	.icon-notes{
		width: 28rpx;
		height: 32rpx;
		margin-right: 13rpx;
	}
</style>
