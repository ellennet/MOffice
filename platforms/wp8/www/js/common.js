var _Common = function() {};

_Common.HostAddress = "112.124.18.133";
_Common.WebServiceAddress = "114.80.70.58:8078";

//拨号
_Common.Call = function(number) {
	navigator.CustomNativeAccess.call(function onSuccess(result) {}, function onFailure(err) {alert(err);}, number);
}

//短信
_Common.Sms = function(number) {
	navigator.CustomNativeAccess.sms(function onSuccess(result) {}, function onFailure(err) {alert(err);}, number);
}

//添加到本地通讯录
_Common.AddContact = function(name, number) {
	var contact = navigator.contacts.create();
	contact.displayName = name;
	contact.nickname = '';
	contact.phoneNumbers = [{"value":number}];
	contact.save(function(contact){	
		_Common.Alert('添加成功！');									
	},function(contactError){
		_Common.Alert('添加失败！');
	});	
}

//alert
_Common.Alert = function(message) {
	navigator.notification.alert(
		message,  // message
		function(){},         // callback
		'提示',            // title
		'确定'                  // buttonName
	);		
}

//退出程序
_Common.Exit = function() {
	navigator.notification.confirm(
		'是否退出程序？', // message
		 this.onConfirmExit,            // callback to invoke with index of button pressed
		'确认',           // title
		['取消','确定']     // buttonLabels
	);		
}

_Common.Logout = function() {
	navigator.notification.confirm(
		'是否要注销？', // message
		 this.onConfirmLogout,            // callback to invoke with index of button pressed
		'确认',           // title
		['取消','确定']     // buttonLabels
	);		
}

//回退
_Common.Back = function() {
	history.go(-1);
}

_Common.onConfirmExit = function(buttonIndex) {
	if(buttonIndex==2){
		navigator.CustomNativeAccess.sysExit(function onSuccess(result) {}, function onFailure(err) {alert(err);});
	}
}
_Common.onConfirmLogout = function(buttonIndex) {
	if(buttonIndex==2){
		window.localStorage.username = "";
		window.localStorage.password = "";
		window.location.href = "index.html"; 		
	}
}

//得到当期日期及星期
_Common.GetNowDate = function()
{
	var date = new Date();
	this.year = date.getFullYear();
	this.month = date.getMonth() + 1;
	this.date = date.getDate();
	this.day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[date.getDay()];
	this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	var currentTime = this.year + "年" + this.month + "月" + this.date + "日 " + " " + this.day;
	
	return currentTime;	
}

_Common.saveCookie = function(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
		var expires = "; expires=" + date.toGMTString()
	}
	else expires = ""
	document.cookie = name + "=" + value + expires + "; path=/"
}

_Common.readCookie = function(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null
}  

