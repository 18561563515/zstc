const that = this
const pageback=function(){
	// #ifdef H5
	let canBack = true
	const pages = getCurrentPages()
	// 有可返回的页面则直接返回，uni.navigateBack默认返回失败之后会自动刷新页面 ，无法继续返回  
	if (pages.length > 1) {
		uni.navigateBack(1)
		return;
	}else{
	// vue router 可以返回uni.navigateBack失败的页面 但是会重新加载  
	// let a = that.$router.go(-1)
	// router.go失败之后则重定向到首页  
	// if (a == undefined) {
		uni.reLaunch({
			url: "/pages/home/home"
		})
	}
	return;
	// #endif  
	uni.navigateBack(1)
}
export default pageback 