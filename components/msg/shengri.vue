<template>
	<view class="content">
		<view class="commont jintian" v-if="jintian.length != 0">
			<view class="jintian_icon">
				<image src="../../static/img/icon_birthday.png" mode="widthFix" class="shengri-icon"></image>
				<text>今天</text>
			</view>
			<image src="../../static/img/img_celebrate.png" mode="widthFix" class="qingzhu-pic"></image>

			<view v-for="(item,index) in jintian" :key="index" class="people-list">
				<view>
					<text>{{item.CUSTNAME}}</text>
				</view>

				<text>{{item.CUSTPHONE}}</text>
			</view>

			<view class="line"></view>
			<view class="zhufuyu">
				他今天过生日，快去送祝福吧！
			</view>
		</view>

		<view class="commont mingtian" v-if="mingtian.length != 0">
			<view class="jintian_icon">
				<image src="../../static/img/icon_birthday.png" mode="widthFix" class="shengri-icon"></image>
				<text>明天</text>
			</view>
			<view v-for="(item,index) in mingtian" :key="index" class="people-list">
				<view>
					<text>{{item.CUSTNAME}}</text>
				</view>

				<text>{{item.CUSTPHONE}}</text>
			</view>
		</view>

		<view class="commont houtian" v-if="houtian.length != 0">
			<view class="jintian_icon">
				<image src="../../static/img/icon_birthday.png" mode="widthFix" class="shengri-icon"></image>
				<text>后天</text>
			</view>
			<view v-for="(item,index) in houtian" :key="index" class="people-list">
				<view>
					<text>{{item.CUSTNAME}}</text>
				</view>

				<text>{{item.CUSTPHONE}}</text>
			</view>
		</view>

		<view class="yigeyue" v-if="qita.length != 0">
			近一个月内
		</view>


		<view class="commont" v-for="(item,index) in qita" :key="index" v-if="qita.length != 0">
			<view class="people-list">
				<view>
					<text>{{item.CUSTNAME}}</text>
					<text>{{item.BIRTHDAY}}</text>
				</view>

				<text>{{item.CUSTPHONE}}</text>
			</view>
		</view>



	</view>
</template>

<script>
	export default {
		name: 'shengri',
		props: ['srarr'],
		data() {
			return {
				jintian: [],
				mingtian: [],
				houtian: [],
				qita: [],
				chuanarr:[]
			}
		},
		onLoad() {
			
		},
		created() {
			// console.log(this.srarr)
			
		},
		watch:{
			srarr(){
				this.jintian = []
				this.mingtian = []
				this.houtian = []
				this.qita = []
				this.chuanarr = this.srarr
				console.log(this.chuanarr)
				for (let i = 0; i < this.chuanarr.length; i++) {
				
					if (this.chuanarr[i].BIRTHDAY == '今天') {
						this.jintian.push(this.chuanarr[i])
					} else if (this.chuanarr[i].BIRTHDAY == '明天') {
						this.mingtian.push(this.chuanarr[i])
					} else if (this.chuanarr[i].BIRTHDAY == '后天') {
						this.houtian.push(this.chuanarr[i])
					} else {
						this.qita.push(this.chuanarr[i])
					}
				}
			}
		},
		mounted() {
			this.chushihua()
		},
		methods: {
			chushihua() {
				for (let i = 0; i < this.srarr.length; i++) {

					if (this.srarr[i].BIRTHDAY == '今天') {
						this.jintian.push(this.srarr[i])
					} else if (this.srarr[i].BIRTHDAY == '明天') {
						this.mingtian.push(this.srarr[i])
					} else if (this.srarr[i].BIRTHDAY == '后天') {
						this.houtian.push(this.srarr[i])
					} else {
						this.qita.push(this.srarr[i])
					}
				}
			}
		}
	}
</script>

<style>
	.commont {
		width: 630rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 2rpx 16rpx 0px rgba(220, 225, 230, 0.6);
		border-radius: 10rpx;
		padding: 30rpx 30rpx 0rpx 30rpx;
		position: relative;
		overflow: hidden;
		margin-bottom: 24rpx;
	}

	.jintian>.jintian_icon {
		background: rgba(255, 72, 119, 1);
	}

	.mingtian>.jintian_icon {
		background: rgba(255, 170, 0, 1);
	}

	.houtian>.jintian_icon {
		background: rgba(51, 125, 255, 1);
	}

	.jintian_icon {
		display: flex;
		flex-direction: row;
		width: 120rpx;
		height: 48rpx;

		border-radius: 24rpx;
		color: #fff;
		line-height: 48rpx;
		position: absolute;
		right: 30rpx;
		top: 30rpx;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;

	}

	.shengri-icon {
		width: 26rpx;
		height: 22rpx;
		margin-right: 7rpx;
	}

	.qingzhu-pic {
		width: 184rpx;
		height: 150rpx;
		position: absolute;
		bottom: 0;
		right: 0;
	}

	.people-list {
		display: flex;
		flex-direction: column;
		margin-bottom: 39rpx;
	}

	.people-list>view {
		margin-bottom: 27rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.people-list>view>text:nth-of-type(1) {
		font-size: 34rpx;
		color: #292929;
		font-weight: bold;
		line-height: 34rpx;
	}

	.people-list>view>text:nth-of-type(2) {
		font-size: 26rpx;
		color: #337DFF;
		line-height: 34rpx;
	}

	.people-list>text {
		font-size: 30rpx;
		color: #808080;
		line-height: 30rpx;
	}

	.line {
		height: 1px;
		border-bottom: 1px dashed rgba(212, 214, 217, 1);
		margin-bottom: 34rpx;
		width: 70%;
	}

	.zhufuyu {
		font-size: 30rpx;
		color: rgba(51, 125, 255, 1);
		margin-bottom: 36rpx;
	}

	.yigeyue {
		width: 160rpx;
		height: 48rpx;
		background: rgba(240, 242, 245, 1);
		border-radius: 24rpx;
		font-size: 24rpx;
		color: rgba(175, 176, 179, 1);
		line-height: 48rpx;
		text-align: center;
		margin-bottom: 24rpx;
	}
</style>
