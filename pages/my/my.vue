<template>
	<view class="content">
		<view class="user-top">
			<view class="user-info">
				<!-- <view class="head-pic"></view> -->
				<view class="info-content">
					<text class="txt1">{{User_Info.USER_NAME}} <text class="txt1-1">NO.{{User_Info.USER_CODE}}</text> </text>
					<text class="txt2">{{User_Info.ORGANIZATION_NAME}}</text>
				</view>
			</view>
		</view>
		
		<view class="mycustomer">
			<view class="all" @click="allCustomer(0)">
				全部
			</view>
			<text class="mycustomer-title">我的客户</text>
			<view class="mycustomer-data">
				<view class="mycustomer-data-unit" @click="yixiang(1)">
					<text class="txt3">{{wodekehu_yixiang.length}}</text>
					<text class="txt4">意向客户</text>
				</view>
				<view class="mycustomer-data-unit" @click="yixiang(2)">
					<text class="txt3">{{wodekehu_yiyuyue.length}}</text>
					<text class="txt4">已预约客户</text>
				</view>
				<view class="mycustomer-data-unit" @click="yixiang(3)">
					<text class="txt3">{{wodekehu_yichengjiao.length}}</text>
					<text class="txt4">已成交客户</text>
				</view>
			</view>
		</view>
		
		<view class="function-list">
			<view class="function-list-unit">
				<view class="info-box">
					<image src="../../static/icon/icon_customer.png" mode="widthFix" class="icon-pic"></image>
					<view class="info-detail">
						<view>客户服务</view>
						<view>所有客户预约订单</view>
					</view>
				</view>
				<view class="see-btn" @click="service">查看</view>
			</view>
			<view class="function-list-unit">
				<view class="info-box">
					<image src="../../static/icon/icon_message.png" mode="widthFix" class="icon-pic"></image>
					<view class="info-detail">
						<view class="zhannei">站内消息 <view class="message-info" v-if="xiaoxi > 0">{{xiaoxi}}</view></view>
						<view>预约详情的消息列表</view>
					</view>
				</view>
				<view class="see-btn" @click="msg">查看</view>
			</view>
			<view class="function-list-unit">
				<view class="info-box">
					<image src="../../static/icon/icon_userinfo.png" mode="widthFix" class="icon-pic"></image>
					<view class="info-detail">
						<view>个人信息</view>
						<view>客户经理基础信息</view>
					</view>
				</view>
				<view class="see-btn" @click="info">查看</view>
			</view>
			<view class="function-list-unit mar-bottom">
				<view class="info-box">
					<image src="../../static/icon/icon_setting.png" mode="widthFix" class="icon-pic"></image>
					<view class="info-detail">
						<view>设置</view>
						<view>修改账户登录密码</view>
					</view>
				</view>
				<view class="see-btn" @click="set">查看</view>
			</view>
		</view>
		
		<view class="quit-btn" @click="sysQuit">
			退出登录
		</view>
	</view>
</template>

<script>
	/* import {
		mapState,
		mapMutations
	} from 'vuex' */
	import http from '../../api/http.js'
	import token from '../../api/token.js'
	export default {
		data() {
			return {
				User_Info:{},
				User_Code:'',
				ORGANIZATION_NAME:'',
				zhanneixiaoxi:0,
				laquxiaoxi:0,//每次加载或者刷新拉取的新消息数目
				wodekehu_all:[],
				wodekehu_yixiang:[],
				wodekehu_yiyuyue:[],
				wodekehu_yichengjiao:[]
			}
		},
		// computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		onLoad() {
			
			 
		},
		onShow() {
			this.kehushu()
			this.readMessage()
		},
		computed:{
			xiaoxi(){
				if (this.zhanneixiaoxi>0) {
					// uni.setStorageSync('yiyuedu',this.laquxiaoxi)
					return this.zhanneixiaoxi
				} else{
					return 0
				}
			}
		},
		methods: {
			// ...mapMutations(['logout']),
			sysQuit(){
				// this.logout()
				// uni.setStorageSync('token','')
				uni.clearStorageSync()
				uni.reLaunch({
					url:'../login/login'
				})
				// console.log(111111)
			},
			//站内消息
			msg(){
				// uni.setStorageSync('yiyuedu',this.laquxiaoxi)
				uni.navigateTo({
					url:'../msg/msg'
				})
			},
			//全部客户
			allCustomer(n){
				uni.navigateTo({
					url:'../customer/customer?current='+n
				})
			},
			//跳转意向客户
			yixiang(n){
				uni.navigateTo({
					url:'../customer/customer?current='+n
				})
			},
			
			//客户服务
			service(){
				uni.navigateTo({
					url:'../service/service'
				})
			},
			
			//个人信息
			info(){
				uni.navigateTo({
					url:'../info/info'
				})
			},
			
			//修改密码
			set(){
				uni.navigateTo({
					url:'../set/set'
				})
			},
			
			//每次页面加载拉取站内消息条数
			readMessage(){
				let token = uni.getStorageSync('token')
				uni.request({
					url: http.server_path + http.zhanneixiaoxi,
					method: 'POST',
					header: {
						'token': token,
					},
					success: (res) => {
						if (res.data.success) {
							let xiaoxiarr = JSON.parse(res.data.data)
							console.log(xiaoxiarr)
							let tiaoshu = 0
							for (let i = 0; i < xiaoxiarr.huankuan.length; i++) {
								tiaoshu+=xiaoxiarr.huankuan[i].STATUS
							}
							for (let i = 0; i < xiaoxiarr.chenggong.length; i++) {
								tiaoshu+=xiaoxiarr.chenggong[i].STATUS
							}
							for (let i = 0; i < xiaoxiarr.shixiao.length; i++) {
								tiaoshu+=xiaoxiarr.shixiao[i].STATUS
							}
							console.log('本次拉取消息条数:' + tiaoshu)
							uni.stopPullDownRefresh();
							// this.laquxiaoxi = tiaoshu
							// this.zhanneixiaoxi = uni.getStorageSync('yiyuedu')
							this.zhanneixiaoxi = tiaoshu
							uni.setStorageSync('xiaoxiarr', xiaoxiarr)
						}
					},
					fail: (res) => {
						console.log(res)
					}
				})
			},
			
			//读取意向客户数
			kehushu(){
				let token = uni.getStorageSync('token')
				 this.User_Info = uni.getStorageSync('User_Info')
				 uni.request({
				 	url:http.server_path + http.wodekehu,
					method:'POST',
					header:{
						token:token
					},
					success: (res) => {
						console.log(JSON.parse(res.data.data) )
						this.wodekehu_all = JSON.parse(res.data.data).all
						this.wodekehu_yixiang = JSON.parse(res.data.data).yixiang
						this.wodekehu_yiyuyue = JSON.parse(res.data.data).yiyuyue
						this.wodekehu_yichengjiao = JSON.parse(res.data.data).yichengjiao
					},
					fail: (res) => {
						console.log(res)
					}
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

	.user-top {
		width: 100%;
		height: 318rpx;
		background: url(../../static/img/bg_user.png) no-repeat center top;
		background-size: 100% auto;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.user-info {
		width: 690rpx;
		height: 100rpx;
		display: flex;
		flex-direction: row;
	}

	.head-pic {
		width: 100rpx;
		height: 100rpx;
		background: rgba(239, 244, 255, 1);
		border: 4rpx solid rgba(255, 255, 255, 1);
		box-shadow: 0px 4rpx 10rpx 0rpx rgba(51, 125, 255, 0.6);
		border-radius: 50%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.info-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
		/* 有头像时候用的样式 */
		/* margin-left: 29rpx; */
		margin-left: 20rpx;
	}

	.txt1 {
		font-size: 34rpx;
		color: #FFFFFF;
		font-weight: 600;
		line-height: 34rpx;
		margin-bottom: 20rpx;
	}

	.txt1-1 {
		font-size: 26rpx;
		color: #FFE400;
		font-weight: 400;
		margin-left: 22rpx;
	}

	.txt2 {
		font-size: 24rpx;
		font-weight: 400;
		line-height: 24rpx;
		color: rgba(255, 255, 255, 1);
		opacity: 0.6;
	}
	.mycustomer{width:640rpx;
/* height:174rpx; */
background:rgba(255,255,255,1);
box-shadow:0px 2rpx 16rpx 0px rgba(220,225,230,0.6);
border-radius:10rpx;margin-top: -56rpx;overflow: hidden;padding: 25rpx;display: flex;flex-direction: column;position: relative;}
.mycustomer-title{
font-size:30rpx;
font-weight:600;
color:rgba(61,61,61,1);
line-height:30rpx;margin-bottom: 37rpx;}

.mycustomer-data{width: 100%;display: flex;flex-direction: row;justify-content: center;margin-bottom: 25rpx;}
.mycustomer-data-unit{display: flex;flex-direction: column;justify-content: center;align-items: center;}
.mycustomer-data-unit:nth-of-type(2){margin: 0 100rpx;}
.txt3{
font-size:70rpx;
font-weight:600;
color:rgba(255,170,0,1);
line-height:70rpx;margin-bottom: 20rpx;}
.txt4{
font-size:26rpx;
color:rgba(102,102,102,1);line-height: 26rpx;}
.all{width: 100rpx;height: 56rpx;background: linear-gradient(35deg,rgba(255,170,0,1),rgba(255,196,0,1));position: absolute;right: 0;top: 0;text-align: center;line-height: 56rpx;color: #fff;font-size: 26rpx;border-bottom-left-radius: 28rpx;}

.function-list{width:690rpx;
height:552rpx;
background:rgba(255,255,255,1);
box-shadow:0px 2rpx 16rpx 0px rgba(220,225,230,0.6);
border-radius:10rpx;margin-top: 24rpx;display: flex;flex-direction: column;align-items: center;justify-content: space-between;}

.function-list-unit{width: 100%;height: 128rpx;display: flex;flex-direction: row;align-items: center;justify-content: space-between;margin-top: 20rpx;}
.icon-pic{width: 54rpx;height: 60rpx;margin-left: 40rpx;margin-right: 29rpx;}

.info-box{display: flex;flex-direction: row;align-items: center;}
.info-detail>view:nth-of-type(1){font-size: 30rpx;font-weight: 600;color: #333333;line-height: 30rpx;margin-bottom: 13rpx;}
.info-detail>view:nth-of-type(2){font-size: 24rpx;font-weight: 400;color: #999999;line-height: 24rpx;}
.see-btn{width:136rpx;
height:56rpx;
background:rgba(245,246,247,1);
border-radius:28rpx;color: #337DFF;font-size: 24rpx;line-height: 56rpx;text-align: center;margin-right: 40rpx;}

.mar-bottom{margin-bottom: 20rpx;}
.quit-btn{width:160rpx;
height:56rpx;
background:rgba(240,242,245,1);
border-radius:28rpx;color: #AFB0B3;font-size: 24rpx;text-align: center;line-height: 56rpx;margin-top: 40rpx;}

.message-info{width: 44rpx;height: 26rpx;border-radius: 13rpx;background: #ff4677;color: #fff;font-size: 16rpx;text-align: center;line-height: 26rpx;font-weight: 400;margin-left: 16rpx;}
.zhannei{display: flex;flex-direction: row;}
</style>
