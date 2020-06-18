<template>
	<view class="content">
		<view class="top-content">
			<uni-nav-bar left-icon="back" title="编辑" @clickLeft="fanhui"></uni-nav-bar>
			
		</view>
		<view class="tab-content">
			<view class="titlecon">
				<text>客户姓名<text class="seyan">（意向客户）</text></text>
			</view>
			
			<view class="con">
				<input type="text" value="" placeholder="请输入客户姓名" placeholder-class="zi" class="shuruzi" v-model="customerName"/>
			</view>
			<view class="titlecon">
				<text>手机号</text>
			</view>
			
			<view class="con" :class="{phoneWarning}">
				<input value="" placeholder="请输入客户手机号" placeholder-class="zi" class="shuruzi" v-model="tel" type="number" @blur="checkTel" />
			</view>
			<view class="titlecon">
				<text>备注</text>
			</view>
			
			<view class="con">
				<textarea value="" placeholder="最多输入300字" placeholder-class="zi" class="shuruzi duowenben" v-model="beizhu" maxlength="300" :auto-height="true"/>
				<text class="shengyu"><text>{{shiyongzi}}</text>/300</text>
			</view>
			
			<button type="default" class="tijiao-btn" @click="save">保存</button>
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
				customerName:'',
				tel:'',
				beizhu:'',
				phoneWarning:false,
			}
		},
		components:{
			uniNavBar
		},
		computed:{
			shiyongzi(){
				let num = this.beizhu.length
				return num
			}
		},
		onLoad(res) {
			/* 这里参数分两种情况
			 * 1、从用户列表里点击的新增，需要空白新增页面
			 * 2、从意向客户详情里 点击编辑 进入的新增 算编辑 需要读取该客户的资料
			 */
			if (res.id) {
				this.id = res.id
				let obj = uni.getStorageSync('yixiang')
				console.log(this.id)
				console.log(obj)
				this.customerName = obj.CUSTNAME
				this.tel = obj.CUSTPHONE
				if (!obj.REMARK) {
					this.beizhu = ''
				} else{
					this.beizhu= obj.REMARK
				}
				
				
				
				
			} else{
				//发送新增
				// console.log(res.id)
				
			}
		},
		methods: {
			//返回
			fanhui(){
				pageback()
			},
			
			//验证电话
			checkTel(){
				if ((/^1[3456789]\d{9}$/.test(this.tel))) {
					console.log('手机号合法')
					this.phoneWarning = false
				} else{
					uni.showToast({
						title: '手机号错误',
						icon: 'none',
						mask: true
					})
					this.tel = ''
					this.phoneWarning = true
				}
			},
			
			//保存
			save(){
				let token = uni.getStorageSync('token')
				if(this.id){
					console.log('存在ID，进行编辑操作')
					uni.request({
						url:http.server_path + http.xiugaiyixiang,
						method:'POST',
						header:{
							token:token,
							'content-type': 'application/x-www-form-urlencoded'
						},
						data:{
							ID:this.id,
							CUSTNAME:this.customerName,
							CUSTPHONE:this.tel,
							REMARK:this.beizhu
						},
						success: (res) => {
							// console.log(res)
							if(res.data.success){
								uni.showModal({
									title:'提示',
									content:'修改成功',
									showCancel:false,
									success: (res) => {
										if(res.confirm){
											uni.redirectTo({
												url:'../customer/customer?current=0'
											})
										}
									}
								})
							}else{
								uni.showToast({
									title:res.data.msg,
									icon:'none'
								})
							}
							
						},
						fail: (res) => {
							console.log(res)
						}
					})
					
					
					
				}else{
					console.log('ID不存在，进行新增操作')
					uni.request({
						url:http.server_path + http.xinzengyixiang,
						method:'POST',
						header:{
							token:token,
							'content-type': 'application/x-www-form-urlencoded'
						},
						data:{
							CUSTNAME:this.customerName,
							CUSTPHONE:this.tel,
							REMARK:this.beizhu
						},
						success: (res) => {
							// console.log(res)
							if(res.data.success){
								uni.showModal({
									title:'提示',
									content:'新增成功',
									showCancel:false,
									success: (res) => {
										if(res.confirm){
											uni.switchTab({
												url:'../my/my'
											})
										}
									}
								})
							}else{
								uni.showToast({
									title:res.data.msg,
									icon:'none'
								})
							}
							
						},
						fail: (res) => {
							console.log(res)
						}
					})
				}
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

	.top-content::before {
		display: none;
	}

	.top-title-text {
		margin-top: 24rpx;
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
	.titlecon{
		width:670rpx;
		margin-bottom: 24rpx;
	}
	.tab-content>view>text{
		font-size: 30rpx;
		color: #3D3D3D;
		line-height: 30rpx;
		text-align: left;
	}
	.tab-content .seyan{
		color: #337DFF;
	}
	.con{
		width:610rpx;
		background:rgba(255,255,255,1);
		border:1px solid rgba(225,227,230,1);
		border-radius:10rpx;
		padding: 26rpx 30rpx;
		margin-bottom: 35rpx;
		position: relative;
	}
	
	.zi{
		color: #B3B3B3;
		font-size: 28rpx;
	}
	.shuruzi{
		font-size: 28rpx;
	}
	.duowenben{
		padding-bottom: 30rpx;
		word-spacing: 1px;
		letter-spacing: 1px;
	}
	.shengyu{
		position: absolute;
		bottom: 20rpx;
		right: 20rpx;
		line-height: 24rpx;
		font-size: 24rpx;
		color: #4F8FFF !important;
	}
	.tijiao-btn{
		width:260rpx;
		height:80rpx;
		background:linear-gradient(135deg,rgba(81,140,255,1),rgba(30,119,254,1));
		box-shadow:0px 4rpx 10rpx 0px rgba(51,125,255,0.4);
		border-radius:40rpx;
		line-height: 80rpx;
		color: #FFFFFF !important;
		text-align: center;
		font-weight: 500;
		font-size: 32rpx;
		margin-top: 200rpx;
	}
	.phoneWarning,.idWarning,.amountWarning{border-color: #ff0000 !important;}
</style>
