<template>
	<view class="content">
		<!-- <view class="top-content">
			<text class="top-title-text">预约产品</text>
		</view> -->
		<uni-nav-bar left-icon="back" title="预约产品" @clickLeft="fanhui" backgroundColor="#337dff"></uni-nav-bar>
		<view class="main-content">

			<text class="product-name">{{CHANPIN}}</text>

			<view class="product-attributes">
				<text class="attributes">剩余金额</text>
				<text class="val">{{LEFTMONEY/10000}}万元</text>
			</view>

			<view class="product-attributes">
				<text class="attributes">预约有效时间</text>
				<text class="val">{{USEFULLDATE}}天</text>
			</view>

			<view class="product-attributes">
				<text class="attributes">还款方式</text>
				<text class="val">{{REPAYMODE}}</text>
			</view>

			<!-- 虚线 -->
			<view class="pre-line"></view>

			<view class="input-content-group">
				<text class="input-title">客户姓名</text>
				<view class="input-content">
					<!-- <input type="text" value="" placeholder="请输入客户姓名" placeholder-class="placeholder-color" v-model="customerName" @focus="onFocus" @blur="onBlur"/> -->
					<uni-combox label="" :candidates="candidates" placeholder="请输入客户姓名" v-model="CUSTNAME" @input="input"></uni-combox>
					<!-- <view class="uni-combox__selector" v-if="showSelector">
						<scroll-view scroll-y="true" class="uni-combox__selector-scroll">
							<view class="uni-combox__selector-empty" v-if="filterCandidatesLength === 0">
								<text>{{emptyTips}}</text>
							</view>
							<view class="uni-combox__selector-item" v-for="(item,index) in xunishuju" :key="index" @click="onSelectorClick(item.name)" v-else>
								<text>{{item.name}}</text>
							</view>
						</scroll-view>
					</view> -->

				</view>
			</view>

			<view class="input-content-group">
				<text class="input-title">身份证号码</text>
				<view class="input-content" :class="{idWarning}">
					<input type="number" value="" placeholder="请输入客户身份证号码" placeholder-class="placeholder-color" v-model="CUSTIDCARD"
					 @blur="idcard" />
				</view>
			</view>

			<view class="input-content-group">
				<text class="input-title">手机号</text>
				<view class="input-content" :class="{phoneWarning}">
					<input type="number" value="" placeholder="请输入客户手机号" placeholder-class="placeholder-color" maxlength="11" v-model="CUSTPHONE"
					 @blur="checkPhone" />
				</view>
			</view>

			<view class="input-content-group">
				<text class="input-title">预约打款时间</text>
				<view class="input-content input-content-between" @click="open">
					<text class="placeholder-color" :class="{changeColor}">{{DAKUANTIME}}</text>
					<image src="../../static/icon/icon_calendar.png" mode="widthFix" class="small-icon"></image>
				</view>
			</view>

			<view class="input-content-group">
				<text class="input-title">预约金额</text>
				<view class="input-content" :class="{amountWarning}">
					<text>￥</text>
					<input type="number" value="" placeholder="请输入金额" placeholder-class="placeholder-color" v-model="AMOUNT" @blur="checkAmount" />
					<!-- <text>万元</text> -->
				</view>
			</view>

			<view class="input-content-group">
				<text class="input-title">卡号</text>
				<view class="input-content">
					<input type="number" value="" placeholder="请输入客户银行卡号" placeholder-class="placeholder-color" v-model="CUSTBANKNO" />
				</view>
				<text class="tips">*出入金账户保证一致</text>
			</view>

			<view class="input-content-group">
				<text class="input-title">开户行</text>
				<view class="input-content">
					<input type="text" value="" placeholder="请输入银行卡开户行" placeholder-class="placeholder-color" v-model="CUSTBANK" />
				</view>
			</view>

			<button type="default" class="sub-btn" @click="subList">提 交</button>
		</view>

		<uni-calendar :insert="false" :lunar="true" :range="false" :start-date="startDate" :end-date="'2025-12-31'" @confirm="change"
		 ref="calendar"></uni-calendar>

	</view>
</template>

<script>
	// import { mapState } from 'vuex'
	import http from '../../api/http.js'
	import token from '../../api/token.js'
	import pageback from '../../api/pageback.js'
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	import uniCombox from "@/components/uni-combox/uni-combox"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				showSelector: false,
				emptyTips: '暂无绑定客户名单',
				/* 传递来的信息 */
				ID: 0, //产品id
				CHANPIN: '预约产品名称', //产品名称
				LEFTMONEY: 50, //剩余金额
				USEFULLDATE: 3, //预约有效时间
				REPAYMODE: '到期一次性还本付息', //还款方式

				CUSTID: '', //客户ID
				CUSTNAME: '', //客户姓名==1
				CUSTIDCARD: '', //身份证==2
				CUSTPHONE: '', //电话==3
				DAKUANTIME: '预约打款时间', //预约打款时间==4DAKUANTIME
				AMOUNT: '', //预约金额==5
				CUSTBANKNO: '', //银行卡号==6
				CUSTBANK: '', //开户行==7
				changeColor: false,
				startDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
				phoneWarning: false,
				idWarning: false,
				amountWarning: false,
				candidates: [],
				xunishuju: []
			}
		},
		onLoad(res) {
			this.ID = res.ID
			this.CHANPIN = res.CHANPIN
			this.LEFTMONEY = res.LEFTMONEY
			this.USEFULLDATE = res.USEFULLDATE
			this.REPAYMODE = res.REPAYMODE
			let token = uni.getStorageSync('token')
			/* 获取客户经理名下客户名单列表 */
			uni.request({
				url: http.server_path + http.kehuliebiao,
				method: 'POST',
				header: {
					token: token,
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {
					User_Code: uni.getStorageSync('User_Code')
				},
				success: (res) => {
					let arr = JSON.parse(res.data.data)
					this.xunishuju = arr
					console.log(this.xunishuju)

					for (let var1 in this.xunishuju) {
						// console.log(var1)
						this.candidates.push(this.xunishuju[var1].ID + '-' + this.xunishuju[var1].CUSTNAME)
					}

				},
				fail: (res) => {
					console.log(res)
				}
			})




			// console.log(this.candidates)
			/* uni.request({
				
			}) */
		},
		methods: {
			/* 写入所选用户ID */
			saveID(id) {
				uni.setStorageSync('CUSTID', id)
			},

			//日期选择器变色
			change(e) {
				console.log(e.fulldate);
				this.DAKUANTIME = e.fulldate
				this.changeColor = true
			},
			//日期选择触发器
			open() {
				this.$refs.calendar.open();
			},
			//身份证验证
			idcard() {
				let idcardReg =
					/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
				if (idcardReg.test(this.CUSTIDCARD)) {
					console.log('身份证合法')
					this.idWarning = false
					return true
				} else {
					uni.showToast({
						title: '输入的身份证信息错误',
						icon: 'none',
						mask: true
					})
					this.CUSTIDCARD = ''
					this.idWarning = true
					return false
				}
			},

			//手机号验证
			checkPhone() {
				if ((/^1[3456789]\d{9}$/.test(this.CUSTPHONE))) {
					console.log('手机号合法')
					this.phoneWarning = false
					return true
				} else {
					uni.showToast({
						title: '手机号错误',
						icon: 'none',
						mask: true
					})
					this.CUSTPHONE = ''
					this.phoneWarning = true
					return false
				}
			},
			//金额验证
			checkAmount() {
				if (this.AMOUNT != '') {
					if (this.AMOUNT % 10000 == 0) {
						if (this.AMOUNT >= 20000) {
							if (parseInt(this.AMOUNT) <= parseInt(this.LEFTMONEY)) {
								this.amountWarning = false
								return true
							} else {
								uni.showToast({
									title: '预约金额大于剩余金额',
									icon: 'none',
									mask: true
								})
								this.amountWarning = true
								return false
							}
						} else {
							uni.showToast({
								title: '预约金额低于最低预约金额',
								icon: 'none',
								mask: true
							})
							this.amountWarning = true
							return false
						}
					} else {
						uni.showToast({
							title: '金额必须是10000倍数',
							icon: 'none',
							mask: true
						})
						this.amountWarning = true
						return false
					}
				} else {
					uni.showToast({
						title: '金额不能为空',
						icon: 'none',
						mask: true
					})
					this.amountWarning = true
					return false
				}




			},
			//提交
			subList() {
				uni.showLoading({

				})
				let token = uni.getStorageSync('token')
				let tempNAME = ''
				let User_Code = uni.getStorageSync('User_Code')
				let namearr = this.CUSTNAME.split('-')
				if (namearr.length > 1) {
					this.CUSTID = namearr[0]
					tempNAME = namearr[1]
				} else {
					this.CUSTID = ''
					tempNAME = namearr[0]
				}
				if (this.CUSTNAME && this.idcard() && this.checkPhone() && this.DAKUANTIME && this.checkAmount() && this.CUSTBANKNO &&
					this.CUSTBANK) {
					//发送请求
					console.log({
						PRODUCTID: this.ID,
						CUSTNAME: tempNAME,
						CUSTIDCARD: this.CUSTIDCARD,
						CUSTPHONE: this.CUSTPHONE,
						DAKUANTIME: this.DAKUANTIME,
						AMOUNT: this.AMOUNT,
						CUSTBANKNO: this.CUSTBANKNO,
						CUSTBANK: this.CUSTBANK,
						User_Code: User_Code,
						CUSTID: this.CUSTID
					})

					uni.request({
						url: http.server_path + http.yuyue,
						method: 'POST',
						header: {
							token: token,
							'content-type': 'application/x-www-form-urlencoded',
						},
						data: {
							PRODUCTID: this.ID,
							CUSTNAME: tempNAME,
							CUSTIDCARD: this.CUSTIDCARD,
							CUSTPHONE: this.CUSTPHONE,
							DAKUANTIME: this.DAKUANTIME,
							AMOUNT: this.AMOUNT,
							CUSTBANKNO: this.CUSTBANKNO,
							CUSTBANK: this.CUSTBANK,
							User_Code: User_Code,
							CUSTID: this.CUSTID
						},
						success: (res) => {
							uni.hideLoading()
							console.log(res)
							if (res.data.success) {

								if (this.AMOUNT < 50000) {
									uni.showModal({
										title: '提示',
										content: '提交低额特批成功',
										showCancel: false,
										success: (res) => {
											if (res.confirm) {
												uni.switchTab({
													url: '../home/home',

												})
											}
										}
									})
								} else {
									uni.showModal({
										title: '提示',
										content: res.data.msg,
										showCancel: false,
										success: (res) => {
											if (res.confirm) {
												uni.switchTab({
													url: '../home/home',

												})
											}
										}
									})
								}





							} else {
								uni.showToast({
									title: res.data.msg,
									icon: 'none',
									mask: true
								})
							}
						},
						fail: (res) => {
							console.log(res)
						}
					})



				} else {
					uni.showToast({
						title: '请核对资料，重新提交',
						icon: 'none',
						mask: true
					})
				}
			},
			//返回
			fanhui() {
				pageback()
			},
			customerName1() {
				let arr = this.CUSTNAME.split('-')
				if (arr.length >= 2) {
					let obj = []
					for (let i = 0; i < this.xunishuju.length; i++) {
						if (this.xunishuju[i].ID == arr[0]) {
							obj.push(this.xunishuju[i])
						}
					}
					// console.log(obj)
					this.CUSTIDCARD = obj[0].CUSTIDCARD
					this.CUSTPHONE = obj[0].CUSTPHONE
					this.CUSTBANKNO = obj[0].CUSTBANKNO
					this.CUSTBANK = obj[0].CUSTBANK
				} else {
					this.CUSTIDCARD = ''
					this.CUSTPHONE = ''
					this.CUSTBANKNO = ''
					this.CUSTBANK = ''
				}
			},
			input(name, index) {
				this.phoneWarning = false
				this.idWarning = false
				this.customerName1()
			}
		},
		components: {
			uniCalendar,
			uniCombox,
			uniNavBar
		},
		// computed:mapState(['forcedLogin', 'hasLogin', 'userName']),
		watch: {
			CUSTNAME() {
				let arr = this.CUSTNAME.split('-')
				if (arr.length >= 2) {
					let obj = []
					for (let i = 0; i < this.xunishuju.length; i++) {
						if (this.xunishuju[i].ID == arr[0]) {
							obj.push(this.xunishuju[i])
						}
					}
					// console.log(obj)
					this.CUSTIDCARD = obj[0].CUSTIDCARD
					this.CUSTPHONE = obj[0].CUSTPHONE
					this.CUSTBANKNO = obj[0].CUSTBANKNO
					this.CUSTBANK = obj[0].CUSTBANK
				} else {
					this.CUSTIDCARD = ''
					this.CUSTPHONE = ''
					this.CUSTBANKNO = ''
					this.CUSTBANK = ''
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
		background: #FAFCFF;
	}

	.top-content {
		background: linear-gradient(135deg, rgba(81, 140, 255, 1), rgba(30, 119, 254, 1));
	}

	.main-content {
		border-top-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
	}

	.product-name {
		font-size: 34rpx;
		color: #292929;
		line-height: 34rpx;
		margin-bottom: 33rpx;
		font-weight: bold;
	}

	// 产品属性
	.product-attributes {
		display: flex;
		flex-direction: row;
		margin-bottom: 24rpx;

		.attributes {
			font-size: 26rpx;
			color: #808080;
			width: 184rpx;
		}

		.val {
			font-size: 26rpx;
			color: #3D3D3D;
			flex: 1;
		}
	}

	// .pre-line{height:1px;border-top:1px dashed rgba(212,214,217,1);margin-top: 10rpx;margin-bottom: 34rpx;}
	.pre-line {
		margin-top: 10rpx;
		margin-bottom: 34rpx;
	}

	.input-content-group {
		display: flex;
		flex-direction: column;
		margin-bottom: 35rpx;
		color: #3D3D3D;
		font-size: 30rpx;
		position: relative;

		.input-title {
			margin-bottom: 24rpx;
		}

		input {
			flex: 1;
		}

		.input-content {
			position: relative;
			border: 1px solid #E1E3E6;
			border-radius: 10rpx;
			height: 80rpx;
			background: #FFFFFF;
			padding: 0 30rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			font-size: 28rpx;

			text {
				margin-right: 13rpx;
			}
		}

		.placeholder-color {
			color: #B3B3B3;
			font-size: 28rpx;
		}

		.small-icon {
			width: 40rpx;
			height: 40rpx;
		}

		.input-content-between {
			justify-content: space-between;
		}
	}

	.sub-btn {
		width: 260rpx;
		height: 80rpx;
		background: linear-gradient(135deg, rgba(81, 140, 255, 1), rgba(30, 119, 254, 1));
		box-shadow: 0px 4rpx 10rpx 0rpx rgba(51, 125, 255, 0.4);
		border-radius: 40rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
		margin-top: 25rpx;
		margin-bottom: 40rpx;
	}


	.changeColor {
		color: #3D3D3D !important;
	}

	.phoneWarning,
	.idWarning,
	.amountWarning {
		border-color: #ff0000 !important;
	}






	.uni-combox__selector {
		box-sizing: border-box;
		position: absolute;
		top: 100rpx;
		left: 0;
		// transform: translateX(-50%);
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 6rpx;
		box-shadow: #DDDDDD 4rpx 4rpx 8rpx, #DDDDDD -4rpx -4rpx 8rpx;
		z-index: 2;
	}

	.uni-combox__selector-scroll {
		max-height: 200px;
		box-sizing: border-box;
	}

	.uni-combox__selector::before {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		border-bottom: solid 6px #FFFFFF;
		border-right: solid 6px transparent;
		border-left: solid 6px transparent;
		left: 50%;
		top: -6px;
		margin-left: -6px;
	}

	.uni-combox__selector-empty,
	.uni-combox__selector-item {
		/* #ifdef APP-NVUE */
		display: flex;
		/* #endif */
		line-height: 36px;
		font-size: 14px;
		text-align: center;
		border-bottom: solid 1px #DDDDDD;
		margin: 0px 10px;
	}

	.uni-combox__selector-empty:last-child,
	.uni-combox__selector-item:last-child {
		border-bottom: none;
	}
	
	.tips{
		color: #4B8AFF;
		font-size: 24rpx;
		margin-top: 10rpx;
	}
</style>
