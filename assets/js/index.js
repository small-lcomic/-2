$(function () {
//1.调用getUserInfo  获取用户基本信息
    getUserInfo();

//2.退出
    var layer = layui.layer;
    $('#btnLogout').on('click', function () {
        //框架提供的询问框
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {
            //1.清空本地token
            localStorage.removeItem('token');
            //2.页面跳转
            location.href = '/login.html';
            //3.关闭询问框
            layer.close(index);

        })
    })
})

//获取用户基本信息
function getUserInfo() {
    $.ajax({
        url:'/my/userinfo',
        type:'get',
        //配置请求头信息
        headers: {
            //重新登录,因为token过期事件12小时
            Authorization:localStorage.getItem("token") || ""
        },
        success: function(res){
            if (res.status !== 0) {
                return layui, layer.msg(res.message);
            }
            console.log(res);
            //请求 成功  渲染用户头像信息
            renderAvatar(res.data)
        },
        //无论成功或者失败,都会触发complete方法
        complete: function (res) {
            console.log(res);
            //判断,如果身份认证失败,跳转回登录页面
            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                //1.删除本地token
                localStorage.removeItem('token');
                //2.页面跳转
                location.href = '/login.html';
            }
        }
    });
}

//封装用户头像渲染函数
function renderAvatar(user) {
    //1.用户名(昵称优先,没有用user)
    var name = user.nickname || user.username;
    //设置欢迎语
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //2.用户头像

    if (user.user_pic !== null) {
        //有头像
        $('.layui-nav-img').atter('src', user.user_pic).show()
        $('.user-avatar').hide();
    } else {
        //没有头像
        $('.layui-nav-img').hide()
        //toUpperCase转换为大写
        var text = name[0].toUpperCase();
        $('.user-avatar').show().html(text);
    }
}