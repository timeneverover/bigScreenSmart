export default {
	/**
	 * 日期格式转为时间戳
	 * @param dateString
	 * @returns {Number}
	 */
	DateToUnix: function(dateString) {
		var f = [],
			d = [],
			t = []
		f.length = 2
		d.length = 3
		t.length = 3
		f = dateString.split(' ', 2)
		if(f[0].indexOf('-') > -1) {
			d = (f[0] ? f[0] : '').split('-', 3)
		} else if(f[0].indexOf('/') > -1) {
			d = (f[0] ? f[0] : '').split('/', 3)
		} else if(f[0].indexOf('.') > -1) {
			d = (f[0] ? f[0] : '').split('.', 3)
		} else if(f[0].indexOf(':') > -1) {
			t = (f[0] ? f[0] : '').split(':', 3)
		}
		if(f.length == 2) {
			if(f[1].indexOf(':') > -1) {
				t = (f[1] ? f[1] : '').split(':', 3)
			}
		}
		return(new Date(
			parseInt(d[0], 10) || null,
			(parseInt(d[1], 10) || 1) - 1,
			parseInt(d[2], 10) || null,
			parseInt(t[0], 10) || null,
			parseInt(t[1], 10) || null,
			parseInt(t[2], 10) || null,
			parseInt(t[3], 10) || null
		)).getTime() / 1000
	},
	DataFormatter: function(dateString) {
		var f = dateString.split(' ', 2)
		var d = '',
			t = ''
		if(f[0].indexOf('-') > -1) {
			d = (f[0] ? f[0] : '').split('-', 3)
		} else if(f[0].indexOf('/') > -1) {
			d = (f[0] ? f[0] : '').split('/', 3)
		} else {
			d = (f[0] ? f[0] : '').split('.', 3)
		}
		t = (f[1] ? f[1] : '').split(':', 3)
		var unixTime = (new Date(
			parseInt(d[0], 10) || null,
			(parseInt(d[1], 10) || 1) - 1,
			parseInt(d[2], 10) || null,
			parseInt(t[0], 10) || null,
			parseInt(t[1], 10) || null,
			parseInt(t[2], 10) || null,
			parseInt(t[3], 10) || null
		)).getTime() / 1000

		unixTime = parseInt(unixTime) + 8 * 60 * 60
		var time = new Date(unixTime * 1000)
		var ymdhis = ''
		var year = time.getUTCFullYear()
		var month = isAddZero(time.getUTCMonth() + 1)
		var day = isAddZero(time.getUTCDate())
		var hour = isAddZero(time.getUTCHours())
		var minutes = isAddZero(time.getUTCMinutes())
		var second = isAddZero(time.getUTCSeconds());
		var arr = []
		arr.push(year)
		arr.push(month)
		arr.push(day)
		arr.push(hour)
		arr.push(minutes)
		arr.push(second)
		return arr
	},
	DateToArr: function(dateString, type) {
		var f = [],
			d = [],
			t = []
		f.length = 2
		d.length = 3
		t.length = 3
		f = dateString.split(' ')
		var arr = []
		if(f[0].indexOf('-') > -1) {
			d = (f[0] ? f[0] : '').split('-', 3)
		} else if(f[0].indexOf('/') > -1) {
			d = (f[0] ? f[0] : '').split('/', 3)
		} else {
			d = (f[0] ? f[0] : '').split('.', 3)
		}
		if(type == 'normal') {
			t = (f[1] ? f[1] : '').split(':', 3)
			var len1 = d.length
			var len2 = t.length
			for(var i = len1; i < 3; i++) {
				d.push('00')
			}
			for(var i = len2; i < 3; i++) {
				t.push('00')
			}
			arr = [].concat(d).concat(t)
		} else if(type == 'year') {
			arr[0] = dateString
			for(var j = 1; j < 6; j++) {
				arr.push('00')
			}
		} else if(type == 'month') {
			arr[0] = '1900'
			arr[1] = d[0]
			arr[2] = d[1]
			for(var j = 0; j < 3; j++) {
				arr.push('00')
			}
		} else if(type == 'hour') {
			for(var j = 0; j < 6; j++) {
				arr.push('00')
			}
			arr[3] = dateString
		}
		return arr
	},
	/**
	 * 时间戳转为日期格式
	 * @param unixTime
	 * @returns {String}
	 */
	UnixToDate: function(unixTime) {
		unixTime = parseInt(unixTime) + 8 * 60 * 60
		var time = new Date(unixTime * 1000)
		var ymdhis = ''
		var year = time.getUTCFullYear()
		var month = isAddZero(time.getUTCMonth() + 1)
		var day = isAddZero(time.getUTCDate())
		var hour = isAddZero(time.getUTCHours())
		var minutes = isAddZero(time.getUTCMinutes())
		var second = isAddZero(time.getUTCSeconds());
		let arr = []
		arr.push(year)
		arr.push(month)
		arr.push(day)
		arr.push(hour)
		arr.push(minutes)
		arr.push(second)
		//  ymdhis = year + '/' + month + '/' + day + '\n' + hour + ':' + minutes
		return arr
	},
	addFloat: function(a, b) {
		var c, d, e;
		try {
			c = a.toString().split(".")[1].length;
		} catch(f) {
			c = 0;
		}
		try {
			d = b.toString().split(".")[1].length;
		} catch(f) {
			d = 0;
		}
		return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
	},
	subFloat: function(a, b) {
		var c, d, e;
		try {
			c = a.toString().split(".")[1].length;
		} catch(f) {
			c = 0;
		}
		try {
			d = b.toString().split(".")[1].length;
		} catch(f) {
			d = 0;
		}
		return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;
	},
	mulFloat: function(a, b) {
		var c = 0,
			d = a.toString(),
			e = b.toString();
		try {
			c += d.split(".")[1].length;
		} catch(f) {}
		try {
			c += e.split(".")[1].length;
		} catch(f) {}
		return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
	},
	divFloat: function(a, b) {
		var c, d, e = 0,
			f = 0;
		try {
			e = a.toString().split(".")[1].length;
		} catch(g) {}
		try {
			f = b.toString().split(".")[1].length;
		} catch(g) {}
		return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
	},
	/**
	 * 日期加
	 */
	AddDay: function(date, days) {
		var nd = new Date(date)
		nd = nd.valueOf()
		nd = nd + days * 24 * 60 * 60 * 1000
		nd = new Date(nd)
		var y = nd.getFullYear()
		var m = isAddZero(nd.getMonth() + 1)
		var d = isAddZero(nd.getDate())
		var h = isAddZero(nd.getHours())
		var s = isAddZero(nd.getMinutes())
		var cdate = y + '-' + m + '-' + d + ' ' + h + ':' + s
		return cdate
	},
	/**
	 * 日期分钟
	 */
	AddMinutes: function(date, mins) {
		var nd = new Date(date)
		nd = nd.valueOf()
		nd = nd + mins * 60 * 1000
		nd = new Date(nd)
		var y = nd.getFullYear()
		var m = isAddZero(nd.getMonth() + 1)
		var d = isAddZero(nd.getDate())
		var h = isAddZero(nd.getHours())
		var s = isAddZero(nd.getMinutes())
		var cdate = y + '-' + m + '-' + d + ' ' + h + ':' + s
		return cdate
	},
	/**
	 * 日期减
	 */
	IncreaseDay: function(date, days) {
		var nd = new Date(date)
		nd = nd.valueOf()
		nd = nd - days * 24 * 60 * 60 * 1000
		nd = new Date(nd)
		var y = nd.getFullYear()
		var m = isAddZero(nd.getMonth() + 1)
		var d = isAddZero(nd.getDate())
		var h = isAddZero(nd.getHours())
		var s = isAddZero(nd.getMinutes())
		var cdate = y + '-' + m + '-' + d + ' ' + h + ':' + s
		return cdate
	},
	/**
	 * 获取当前时间
	 */
	currentDate: function() {
		var date = new Date()
		var seperator1 = '-'
		var year = date.getFullYear()
		var month = isAddZero(date.getMonth() + 1)
		var strDate = isAddZero(date.getDate())
		var hour = isAddZero(date.getHours())
		var min = isAddZero(date.getMinutes())
		var currentdate = year + seperator1 + month + seperator1 + strDate + ' ' + hour + ':' + min
		return currentdate
	},
	/**
	 * 获取时间数组
	 */
	currentDates: function(date) {
		var year = date.getFullYear()
		var month = isAddZero(date.getMonth() + 1)
		var strDate = isAddZero(date.getDate())
		var hour = isAddZero(date.getHours())
		var min = isAddZero(date.getMinutes())
		var seconds = isAddZero(date.getSeconds())
		var arr = []
		arr.push(year)
		arr.push(month)
		arr.push(strDate)
		arr.push(hour)
		arr.push(min)
		arr.push(seconds)
		return arr
	},
	dateFtt: function(date, fmt) { //author: meizz   
		var o = {
			"M+": date.getMonth() + 1, //月份   
			"d+": date.getDate(), //日   
			"H+": date.getHours(), //小时   
			"m+": date.getMinutes(), //分   
			"s+": date.getSeconds(), //秒   
			"q+": Math.floor((date.getMonth() + 3) / 3), //季度   
			"S": date.getMilliseconds() //毫秒   
		};
		if(/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for(var k in o)
			if(new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	},
	/**
	 * 时间比较 
	 */
	compareTime: function(x, y) {
		let x1 = this.DateToUnix(x)
		let y1 = this.DateToUnix(y)
		return this.compareValue(x1, y1)
	},

	/**
	 * 数值比较 
	 */
	compareValue: function(x, y) {
		if(x > y) {
			return 1
		} else if(x < y) {
			return -1
		} else {
			return 0
		}
	},
	judgeIsNumber(obj) { // 判断是否是浮点数
		var regPos = /^\d+(\.\d+)?$/; //非负浮点数
		var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
		if(regPos.test(obj) || regNeg.test(obj)) {
			return true;
		} else {
			return false;
		}
	},
	judgeNumber(obj) { //判断是否是整数
		var regPos = / ^\d+$/; // 非负整数
		var regNeg = /^\-[1-9][0-9]*$/; // 负整数
		if(regPos.test(obj) || regNeg.test(obj)) {
			return true;
		} else {
			return false;
		}
	},
	judgeString(str) { //将值变为数值型
		if(typeof(str) == 'string') {
			if(this.judgeNumber(str)) {
				return parseInt(str)
			} else {
				return parseFloat(str)
			}
		}
		return str
	},
	/*包含带小数的数字处理,千位加逗号,分位保留,*/
	formatNum(strNum) {
		var outputmoney = function(number) {
			var num = number.split('.');
			var pointData = '';
			if(num.length == 2) {
				pointData = '.' + num[1];
			}
			number = number.replace(/\,/g, ""); //把所有的逗号，清除
			if(isNaN(number) || number == "") return "";
			number = Math.round(number * 100) / 100;
			console.log('round:'+number)
			if(number < 0)
//				return '-' + outputdollars(Math.floor(Math.abs(number) - 0) + '') + outputcents(Math.abs(number) - 0);
				return '-' + outputdollars(Math.floor(Math.abs(number) - 0) + '') + pointData;
			else
//				              return outputdollars(Math.floor(number - 0) + '') + outputcents(number - 0);
				return outputdollars(Math.floor(number - 0) + '') + pointData;
		}
		//格式化金额
		var outputdollars = function(number) {
			if(number.length <= 3)
				return(number == '' ? '0' : number);
			else {
				var mod = number.length % 3;
				var output = (mod == 0 ? '' : (number.substring(0, mod)));
				for(let i = 0; i < Math.floor(number.length / 3); i++) {
					if((mod == 0) && (i == 0))
						output += number.substring(mod + 3 * i, mod + 3 * i + 3);
					else
						output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
				}
				return(output);
			}
		}
		var outputcents = function(amount) {
			amount = Math.round(((amount) - Math.floor(amount)) * 100);
			if(amount == 0) {
				return '';
			} else {
				return(amount < 10 ? '.0' + amount : '.' + amount);
			}
	
		}
		if(strNum >= 1000) {
			return outputmoney(strNum + "");
		} else {
			return strNum
		}
	
	}
}
/**
 * 当小于10的时候前面加0
 * 适用于时间判断
 */
function isAddZero(time) {
	if(time < 10) {
		return '0' + time
	}
	return time
}

function mul(a, b) {
	var c = 0,
		d = a.toString(),
		e = b.toString();
	try {
		c += d.split(".")[1].length;
	} catch(f) {}
	try {
		c += e.split(".")[1].length;
	} catch(f) {}
	return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}


//格式化时间
function dateFtt(date, fmt) { //author: meizz   
	var o = {
		"M+": date.getMonth() + 1, //月份   
		"d+": date.getDate(), //日   
		"H+": date.getHours(), //小时   
		"m+": date.getMinutes(), //分   
		"s+": date.getSeconds(), //秒   
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度   
		"S": date.getMilliseconds() //毫秒   
	};
	if(/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}