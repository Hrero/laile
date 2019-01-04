/**
* 日期格式化
* 
* @param {Date} date 指定日期
* @param {String} format
* @returns {String}
* @summary 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
* 年(y)可以用 1-4个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
* @example (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02
* 08:09:04.423 (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
*/
export function formatDate(date, format) {
    var o = {
        'M+': date.getMonth() + 1, //month
        'd+': date.getDate(), //day
        'h+': date.getHours(), //hour
        'm+': date.getMinutes(), //minute
        's+': date.getSeconds(), //second
        'q+': Math.floor((date.getMonth() + 3) / 3), //quarter
        'S': date.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for ( var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return format;
}

// 获取过去的n天
export function getBeforeDay(date, days) {
    var date = date || new Date();
    return new Date(Date.parse(date.toString()) - 86400000 * days);
}

// 查询url字符串
export function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg); // 获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null) {
    context = r[2];
    }
    reg = null;
    r = null;
    return (context == null || context == "" || context == "undefined") ? "" : context;
}

// 删除空白字符串
export function delBlankSpace(str) {
    var str = str.replace(/<\/?[^>]*>/gim, "");// 去掉所有的html标记
    var result = str.replace(/(^\s+)|(\s+$)/g, "");// 去掉前后空格
    return result.replace(/\s/g, "");// 去除文章中间空格
}
    
// 判断参数非空
export function validateBlank(tmp) {
    if (!tmp && typeof (tmp) != "undefined" && tmp != 0) {
    // null
    return;
    } else if (typeof (tmp) == "undefined") {
    // undefined
    return;
    } else if (Array.isArray(tmp) && tmp.length === 0) {
    // 空数组
    return;
    } else if ($.trim(tmp) == "") {
    // 空串
    return;
    } else if (Object.prototype.isPrototypeOf(tmp) && Object.keys(tmp).length === 0) {
    // 空对象
    return;
    } else {
    return tmp;
    }
}
    
// 检测段落里空格和换行,转换成html输出
export function blankRegExp(str) {
    if (typeof str != "string")
    return "";
    
    return this.htmlEncode(str).replace(/\r{0,}\n/g, '<br/>');
}
    
// 转义html为安全文本
export function htmlEncode(str) {
    //多个replace会有bug
    //return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&#39;").replace(/ /g, "&nbsp;");
    var html_encodes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": "&#39;",
    ' ': '&nbsp;'
    };
    return str.replace(/(&|<|>|\"|\'| )/g, function(str, item) {
    return html_encodes[item];
    });
}

//正则解码
export function htmlDecode(str) {
    var html_decodes = {
    '&amp;':'&',
    '&lt;':'<',
    '&gt;':'>',
    '&quot;':'"',
    "&#39;":"'",
    '&nbsp;':' '
    };
    return str.replace(/(&amp;|&lt;|&gt;|&quot;|&#39;|&nbsp;)/g, function(str, item) {
    return html_decodes[item];
    });
}

/*用浏览器内部转换器实现html转码*/
export function HTMLEncode(html){
    //1.首先动态创建一个容器标签元素，如DIV
    var temp = document.createElement ("div");
    //2.然后将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
    (temp.textContent != undefined ) ? (temp.textContent = html) : (temp.innerText = html);
    //3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
    var output = temp.innerHTML;
    temp = null;
    return output;
}
    
/*用浏览器内部转换器实现html解码*/
export function HTMLDecode(input) {
    var converter = document.createElement("DIV");
    converter.innerHTML = input;
    var output = converter.innerText;
    converter = null;
    return output;
}
    
// 裁剪文字，显示...
export function cutText(str, maxLength, showEllipsis) {
    if (str.length > maxLength) {
    str = str.substr(0, maxLength);
    if (showEllipsis) {
    str += "...";
    }
    }
    return str;
}
    
// 判断微信内置浏览器
export function isWeixin() {
    var ua = navigator.userAgent.toLowerCase();
    return (ua.match(/MicroMessenger/i) == "micromessenger");
}
    
// [Hack]修改iOS微信浏览器的title
export function setTitle(t) {
    document.title = t;
    var i = document.createElement('iframe');
    i.src = '//m.baidu.com/favicon.ico';
    i.style.display = 'none';
    i.onload = function() {
    setTimeout(function() {
    i.remove();
    }, 9);
    }
    document.body.appendChild(i);
}

// 获取前一个页面的url
export function getReferrer() {
    var referrer = '';
    try {
    referrer = window.top.document.referrer;
    } catch (e) {
    if (window.parent) {
    try {
    referrer = window.parent.document.referrer;
    } catch (e2) {
    referrer = '';
    }
    }
    }
    if (referrer === '') {
    referrer = document.referrer;
    }
    return referrer;
}
    
//屏蔽alert 弹框
export function noAlert(){
    //if(true) return
    window.alert = function(str) {
    return;
    };
}

//event事件
export var EventUtil={
    addHandler:function(element,type,handler){ //添加事件
        if(element.addEventListener){ 
            element.addEventListener(type,handler,false);  //使用DOM2级方法添加事件
        }else if(element.attachEvent){                    //使用IE方法添加事件
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+type]=handler;          //使用DOM0级方法添加事件
        }
    }, 
    removeHandler:function(element,type,handler){  //取消事件
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){
            element.detachEvent("on"+type,handler);
        }else{
            element["on"+type]=null;
        }
    },
    getEvent:function(event){  //使用这个方法跨浏览器取得event对象
        return event?event:window.event;
    },
    getTarget:function(event){  //返回事件的实际目标
        return event.target||event.srcElement;
    },
    preventDefault:function(event){   //阻止事件的默认行为
        if(event.preventDefault){
            event.preventDefault(); 
        }else{
            event.returnValue=false;
        }
    },
    stopPropagation:function(event){  //立即停止事件在DOM中的传播
                                        //避免触发注册在document.body上面的事件处理程序
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble=true;
        }
    },  
    getRelatedTarget:function(event){  //获取mouseover和mouseout相关元素
        if(event.relatedTarget){
            return event.relatedTarget;
        }else if(event.toElement){      //兼容IE8-
            return event.toElement;
        }else if(event.formElement){
            return event.formElement;
        }else{
            return null;
        }
    },  
    getButton:function(event){    //获取mousedown或mouseup按下或释放的按钮是鼠标中的哪一个
        if(document.implementation.hasFeature("MouseEvents","2.0")){
            return event.button;
        }else{
            switch(event.button){   //将IE模型下的button属性映射为DOM模型下的button属性
            case 0:
            case 1:
            case 3:
            case 5:
            case 7:
                return 0;  //按下的是鼠标主按钮（一般是左键）
            case 2:
            case 6:
                return 2;  //按下的是中间的鼠标按钮
            case 4:
                return 1;  //鼠标次按钮（一般是右键）
            }
        }
    },  
    getWheelDelta:function(event){ //获取表示鼠标滚轮滚动方向的数值
        if(event.wheelDelta){
            return event.wheelDelta;
        }else{
            return -event.detail*40;
        }
    }, 
    getCharCode:function(event){   //以跨浏览器取得相同的字符编码，需在keypress事件中使用
        if(typeof event.charCode=="number"){
            return event.charCode;
        }else{
            return event.keyCode;
        }
    }
}

//url的值
export function GetQueryString (name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  
    var r = window.location.search.substr(1).match(reg);
  
    if(r!=null)return  unescape(r[2]); return null;
}

//年月日 时分秒
export function getTime(time) {
    const date = new Date(time)
    const Y = date.getFullYear() + '-'
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    const D = date.getDate() + ' '
    const h = date.getHours() + ':'
    const m = date.getMinutes() + ':'
    const s = date.getSeconds()
    const T = Y + M + D + h + m + s
    return T
}

//日期
export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if (('' + time).length === 10) time = parseInt(time) * 1000
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return time_str
}

// 改变时间区间 00:00 分钟 符号
export function changeTime(oTime, mInterval, symbol) {
    let nTime = ''
    let m = ''
    let h = ''
    const o = oTime.split(symbol)
    if (o[1] >= mInterval) { // 分钟大于15
      if (Number(o[1]) === mInterval) {
        m = (o[1] - mInterval) + '0'
        h = o[0]
      } else {
        m = o[1] - mInterval
        h = o[0]
      }
    } else { // 小于15
      m = 60 - (mInterval - o[1])
      if (o[0] >= 10) { // 小时处理
        h = o[0] - 1
      } else if (o[0] > 0 && o[0] < 10) {
        h = '0' + (o[0].charAt(o[0].length - 1) - 1)
      } else {
        h = '00'
      }
    }
    nTime = h + symbol + m
    return nTime
}

// 时间格式化
export function formatTime(time, option) {
    time = +time * 1000
    const d = new Date(time)
    const now = Date.now()
  
    const diff = (now - d) / 1000
  
    if (diff < 30) {
      return '刚刚'
    } else if (diff < 3600) { // less 1 hour
      return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
      return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
      return '1天前'
    }
    if (option) {
      return parseTime(time, option)
    } else {
      return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    }
}

// 字符串去空格
export function trim(a) {
  var s = a.replace(/\s+/g, '')
  return s
}

// 获取地址栏的对象值 ： {ie: "UTF-8", wd: "小程序获取本地存储里面的值"}
export function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
      return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 字母数字汉字*/
export function validateCNECNE(str) {
  if (!str) return false
  const strs = (str + '').replace(/(^\s*)|(\s*$)/g, '')
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/
  return reg.test(strs)
}

/* 大写字母*/
export function validateUpperCase(str) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
}

// 数字
export function validateNum(str) {
    const reg = /^[0-9]+$/
    return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
}

/* 获取月初和月末 */
export function monthDay(time, bloo) {
    const date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    if (bloo) { // 月初
      return (new Date(year + '-' + month + '-1')).getTime()
    } else { // 月末
      if (month === 12) {
        year += 1
        month = 1
      } else {
        month += 1
      }
      return (new Date(year + '-' + month + '-1')).getTime() - 1000 * 3600 * 24
    }
}

// js转换时间戳
export function filtertime(time) {
  const date = new Date(time)
  const Y = date.getFullYear() + '-'
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  const D = date.getDate() + ' '
  const h = date.getHours() + ':'
  const m = date.getMinutes() + ':'
  const s = date.getSeconds()
  const T = Y + M + D + h + m + s
  return T
}

// js转换时间戳
export function filterDay(time) {
  const date = new Date(time)
  const h = date.getHours() + ':'
  const m = (date.getMinutes() < 10 ? ('0' + date.getMinutes() + ':') : (date.getMinutes() + ':'))
  const s = (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds())
  const T = h + m + s
  return T
}

// js转换时间戳 yy-mm-dd
export function filtertime1(time) {
  const date = new Date(time)
  const Y = date.getFullYear() + '-'
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const T = Y + M + D
  return T
}

// 百分比转换成小数
export function toPoint(percent) {
    var str = percent.replace('%', '')
    str = str / 100
    return str
}

// 获取当前时间
export function getTimePosition() {
    const hour = new Date().getHours()
    let res = '0'
    if (hour >= 0 && hour < 6) {
      res = 0
    } else if (hour >= 6 && hour < 12) {
      res = 1
    } else if (hour >= 12 && hour < 18) {
      res = 2
    } else if (hour >= 18 && hour < 24) {
      res = 3
    }
    return res
}