
export function GetQueryString (name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  
    var r = window.location.search.substr(1).match(reg);
  
    if(r!=null)return  unescape(r[2]); return null;
}

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