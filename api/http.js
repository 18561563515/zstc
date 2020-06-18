//1服务器地址
const server_path = 'http://192.168.1.221:8020'
//const server_path = 'http://58.56.184.202:8020' //外网地址

// const server_path = 'http://192.168.1.13:8020'

//2登录接口
const denglu = '/Ctrl_H5/LoginHandler.ashx?action=Login'

//3推荐列表
const tuijian = '/Ctrl_H5/UserHandler.ashx?action=Producttuijianlist'

//4产品列表
const chanpin = '/Ctrl_H5/UserHandler.ashx?action=Productlist'

//5token验证
const token = '/Ctrl_H5/LoginHandler.ashx?action=Verifytoken'

//6产品详情
const xiangqing = '/Ctrl_H5/UserHandler.ashx?action=Productinfo'

//7客户列表
const kehuliebiao = '/Ctrl_H5/UserHandler.ashx?action=Custlist'

//8客户详情
const kehuxiangqing = '/Ctrl_H5/UserHandler.ashx?action=Custinfo'

//9预约提交表单
const yuyue = '/Ctrl_H5/UserHandler.ashx?action=Order'

//10首页轮播
const lunbo = '/Ctrl_H5/UserHandler.ashx?action=Bannerlist'

//11学习成长
const xuexichengzhang = '/Ctrl_H5/UserHandler.ashx?action=Studylist'

//12站内消息
const zhanneixiaoxi = '/Ctrl_H5/UserHandler.ashx?action=Sitemail'

//13我的客户
const wodekehu = '/Ctrl_H5/UserHandler.ashx?action=Mycustlist'

//14客户服务：
const kehufuwu = '/Ctrl_H5/UserHandler.ashx?action=Custservicelist' 

//15客户服务详情
const kehufuwuxiangqing = '/Ctrl_H5/UserHandler.ashx?action=Custserviceinfo' 

//16单客户业绩
const dankehuyeji = '/Ctrl_H5/UserHandler.ashx?action=Mycustinfolist'

//17密码修改
const mimaxiugai = '/Ctrl_H5/UserHandler.ashx?action=Passwordupdate'

//18新增意向客户
const xinzengyixiang = '/Ctrl_H5/UserHandler.ashx?action=Custadd'

//19修改意向客户
const xiugaiyixiang = '/Ctrl_H5/UserHandler.ashx?action=Custupdate'

//20文章详情
const newsdetail = '/Ctrl_H5/UserHandler.ashx?action=Studyinfo'

//21生成名片
const shengchengmingpian = '/Ctrl_H5/UserHandler.ashx?action=Creditcreate'

//22上传合同
const shangchuanhetong = '/Ctrl_H5/UserHandler.ashx?action=Fileupload'

//23上传微信二维码
const erweima = '/Ctrl_H5/UserHandler.ashx?action=Weixinupload'

//24海报列表
const Haibaolist = '/Ctrl_H5/UserHandler.ashx?action=Haibaolist'

//25海报生成
const Haibaocreate = '/Ctrl_H5/UserHandler.ashx?action=Haibaocreate'

//阅读消息
const yueduxiaoxi = '/Ctrl_H5/UserHandler.ashx?action=Sitemailinfo'

const http = {
	server_path,
	denglu,
	tuijian,
	chanpin,
	token,
	xiangqing,
	kehuliebiao,
	kehuxiangqing,
	yuyue,
	lunbo,
	xuexichengzhang,
	zhanneixiaoxi,
	wodekehu,
	kehufuwu,
	kehufuwuxiangqing,
	dankehuyeji,
	mimaxiugai,
	xinzengyixiang,
	xiugaiyixiang,
	newsdetail,
	shengchengmingpian,
	shangchuanhetong,
	erweima,
	Haibaolist,
	Haibaocreate,
	yueduxiaoxi
}
export default http;