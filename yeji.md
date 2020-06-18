登录接口
http://192.168.1.221:8020/Ctrl_H5/LoginHandler.ashx?action=Login

推荐产品列表
http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Producttuijianlist

产品中心列表
http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Productlist

产品详情
http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Productinfo

客户列表：http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Custlist


客户详情：http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Custinfo

预约：http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Order

1、首页轮播图
http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Bannerlist

2、学习成长：技巧类 产品类 其他 视频、图文接口（需要type注明是视频还是图文类）
http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Studylist
格式：data:{
	技巧类：[
		{id:20,type:video,video_src:xxxxx,thumb:xxxx},
		{id:20,type:text,thumb_src:xxxxx},
	],
	产品类：[
		{id:20,type:video,video_src:xxxxx,thumb:xxxx},
		{id:20,type:text,thumb_src:xxxxx},
	],
	其他：[
		{id:20,type:video,video_src:xxxxx,thumb:xxxx},
		{id:20,type:text,thumb_src:xxxxx},
	]
}

3、站内消息：
站内信列表：
http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Sitemail
生日提醒：今天 明天 后天  其他
还款提醒：距离到期时间多久提醒
预约失效：距离预约到期时间多久提醒
预约成功：

4、我的客户：[](http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Mycustlist)
全部 意向客户 已预约客户 已成交客户     附带type注明客户哪一类型

5、新增意向客户：
姓名 手机号 备注（300字）

6、意向客户编辑提交
通过ID获取意向客户资料 提交时附带ID update

7、客户服务：
全部  已预约 已成交  已失效   注明type何种类型

8、个人信息：
只读

9、设置：
提交新旧密码 update

10、新闻文章
提交ID获取


11、上传合同


登录：http://192.168.1.221:8020/Ctrl_H5/LoginHandler.ashx?action=Login
验证token：http://192.168.1.221:8020/Ctrl_H5/LoginHandler.ashx?action=Verifytoken
全部产品：http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Productlist
推荐产品：http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Producttuijianlist
产品详情：http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Productinfo
客户列表：http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Custlist
客户详情：http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Custinfo
我的客户：http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Mycustlist
单客户业绩【参数：CUSTTYPE（yixiang），CUSTID】：http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Mycustinfolist
客户服务：http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Custservicelist
客户服务详情：http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Custserviceinfo
预约：http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Order
banner列表：http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Bannerlist
学习成长列表：http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Studylist
文章详情：http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Studyinfo
站内信列表：http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Sitemail
意向客户新增：http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Custadd
意向客户修改：http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Custupdate
修改密码：http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Passwordupdate
生成名片：http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Creditcreate
上传合同：http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Fileupload
上传微信二维码：http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Weixinupload
生成海报：http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Haibaocreate
海报列表：http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Haibaolist

接口是这个Mycustinfolist，参数是：CUSTTYPE（all，yixiang，yiyuyue，yichengjiao）；CUSTID
客户新增：CUSTNAME，CUSTPHONE，REMARK
客户修改：ID，CUSTNAME，CUSTPHONE，REMARK
密码修改：OLDPASSWORD，NEWPASSWORD        账号：ZS201048   密码：111111
isvideo是视频文章       0：文章      1：视频


站内信详情：http://192.168.1.221:8020/Ctrl_H5/UserHandler.ashx?action=Sitemailinfo
有个status默认1是未读   已读变成0