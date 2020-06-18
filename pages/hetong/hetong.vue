<template>
	<view class="content">
		<view class="top-content">
			<uni-nav-bar left-icon="back" title="上传合同" @clickLeft="fanhui"></uni-nav-bar>
		</view>
		<view class="tab-content">
			<view class="title-box">
				<text>选择合同照片</text>
				<text>最多9张</text>
			</view>

			<view class="add-img-box">
				<view class="add-img-item" v-for="(item, index) in imgList" :key="index">
					<image class="add-img" @click="imgInfo(index)" :src="item.path" mode="aspectFill"></image>
					<image class="add-img-del" @click="delImg(index)" src="../../static/icon/btn_delete.png"></image>
				</view>
				<view v-if="imgList.length < 9 " class="add-img-item" @click="openCamera">
					<image class="add-img" src="../../static/icon/btn_upload_add.png"></image>
				</view>
			</view>
			<view @click="submit" class="address-box submit-box">
				提交
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import http from '../../api/http.js'
	import token from '../../api/token.js'
	import pageback from '../../api/pageback.js'
	export default {
		data() {
			return {
				imgList: [],
				cloudimgList: [],
				imgCount: 9, //最多支持9张上传，可以修改
				ID: 0
			}
		},
		onLoad(res) {
			console.log(res.ID)
			this.ID = res.ID
		},
		components: {
			uniNavBar
		},
		methods: {
			//返回
			fanhui() {
				pageback()
			},


			submit(e) {
				// this.submitData = null;
				// let arr = []
				let token = uni.getStorageSync('token')
				if (this.imgList.length < 1) {
					uni.showToast({
						title: '请添加图片',
						icon: 'none'
					});
					return false;
				}
				uni.showLoading({
					title: '图片上传中',
					mask: false
				});
				// console.log(this.imgList)
				for (let i = 0; i < this.imgList.length; i++) {
					// console.log("test！" + this.imgList[i].path);
					// arr.push(this.imgList[i].path)
					
					/* this.$cloud.uploadFile({
						filePath: this.imgList[i].path,
						success: (res) => {
							//保存图片的路径
							this.cloudimgList.push(res.fileID);
						},
						fail: (err) => {
							console.log(err);
						},
						complete: () => {
							//uni.hideLoading();
							if (this.cloudimgList.length == this.imgList.length) {
								uni.hideLoading();
								uni.showToast({
									title: '全部上传成功！',
									icon: 'none'
								});
							}
						}
					}) */
					
					 uni.uploadFile({
						url: http.server_path + http.shangchuanhetong,
						// files:arr,
						filePath:this.imgList[i].path,
						header: {
							// 'content-type':'multipart/form-data',
							// 'content-type': 'application/x-www-form-urlencoded',
							token: token
						},
						formData: {
							'ID': this.ID
						},
						success: (res) => {
							this.cloudimgList.push(res);
							
						},
						fail: (res) => {
							console.log(res)
					
						},
						complete: () => {
							// uni.hideLoading();
							if (this.cloudimgList.length == this.imgList.length) {
								uni.hideLoading();
								
								uni.showModal({
									title:'提示',
									content:'全部上传成功！',
									showCancel:false,
									success: (res) => {
										if(res.confirm){
											uni.switchTab({
												url:'../my/my'
											})
										}
									}
								})
							}
						}
					})
				/* 	uploadTask.onProgressUpdate((res) => {
						console.log('上传进度' + res.progress);
						console.log('已经上传的数据长度' + res.totalBytesSent);
						console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
					
					
					}); */
				}
				// console.log(arr)
				
			},

			imgInfo(i) {
				let tempList = [];
				this.imgList.forEach(img => {
					tempList.push(img.path);
				});
				console.log(tempList);
				//显示图片
				uni.previewImage({
					current: i,
					loop: false,
					urls: tempList,
					indicator: 'default'
				});
			},
			delImg(i) {
				uni.showModal({
					content: '确定删除这张吗',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(i, 1);
							this.imgCount++;
						} else if (res.cancel) {

						}
					}
				});
			},

			openCamera() {
				uni.chooseImage({
					sourceType: ['album'],
					count: this.imgCount,
					sizeType: ['compressed'],
					success: e => {
						console.log(e)
						this.imgList = [...this.imgList, ...e.tempFiles];

						this.imgCount = 9 - this.imgList.length;
						console.log('imgCount', this.imgList);
					}
				});
			},

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
		height: 160rpx;
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
		margin-top: -70rpx;
		background: #FAFCFF;
		z-index: 10;
		min-height: 200rpx;
		padding-top: 30rpx;
		display: flex;
		/* justify-content: center; */
		flex-direction: column;
		align-items: center;
	}

	.title-box {
		width: 690rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 36rpx;
		align-items: center;
		margin-bottom: 40rpx;
	}

	.title-box>text:nth-of-type(1) {
		color: #3D3D3D;
		font-size: 36rpx;
		line-height: 36rpx;
		font-weight: 600;
	}

	.title-box>text:nth-of-type(2) {
		color: #B3B3B3;
		font-size: 30rpx;
		line-height: 36rpx;
	}


	.add-box {
		padding: 15rpx 0;
		flex-wrap: wrap;
	}

	.add-img-box {
		display: flex;
		width: 690rpx;
		flex-direction: row;
		/* justify-content: space-between; */
		flex-wrap: wrap;
	}

	.add-img-item {
		/* width:210rpx;
			height:210rpx; */
		width: 210rpx;
		height: 210rpx;
		/* border-radius: 24rpx; */
		margin-left: 20rpx;
		margin-bottom: 20rpx;
		position: relative;
		padding: 9rpx 0;
	}

	.add-img-camera {
		flex: 1;
	}

	.add-img {
		width: 200rpx;
		height: 200rpx;
		border-radius: 24rpx;
	}

	.add-img-del {
		position: absolute;
		width: 40rpx;
		height: 40rpx;
		right: -5rpx;
		top: -5rpx;
		//background-color: rgba(238, 0, 0, 1);
		border-radius: 20rpx;
	}

	.address-box {
		width: 260rpx;
		height: 80rpx;
		background: linear-gradient(135deg, rgba(81, 140, 255, 1), rgba(30, 119, 254, 1));
		box-shadow: 0px 4rpx 10rpx 0px rgba(51, 125, 255, 0.4);
		border-radius: 40rpx;
		text-align: center;
		line-height: 80rpx;
		font-size: 32rpx;
		color: #FFFFFF;
		margin-top: 230rpx;
	}
</style>
