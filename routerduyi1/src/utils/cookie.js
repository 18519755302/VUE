//登入
function login() {
    //cookie时长
    const expires = 2;
    setCookieTime(expires);
}
//查询是否登入
function isLogin() {
    return document.cookie.includes('login=true');
}

//取消登入
function cancelLogin() {
    //cookie时长
    const expires = -1;
    setCookieTime(expires);
}

//设置cookie保存时间
function setCookieTime(expires) {
    let date = new Date();
    date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
    document.cookie = `login=true;expires=${date.toGMTString()}`
}

export default {
    login,
    isLogin,
    cancelLogin
}