$(function () {
    //1.显示隐藏登录注册
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    });

    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    });

    //2.表单验证
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return "两次密码不一致"
            }
        }
        
    });

    //3.注册功能
    var layer = layui.layer
    $('#form_reg').on('submit',function (e) {
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:"http://ajax.frontend.itheima.net/api/reguser",
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password').val(),
            },
            success: function(res){
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("注册成功")
                //手动调用点击事件
                $('#link_login').click()
                //清空注册内容
                $('#form_reg .layui-input').val("")
            }
        });
    })
    
    //登录功能
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:"http://ajax.frontend.itheima.net/api/login",
            data: $(this).serialize(),
            
            success: function(res){
                if (res.status !== 0) {
                    return layer.msg("登录失败")
                }
                layer.msg("登录成功")
                localStorage.setItem('token', res.token)
                location.href = '/index.html';     
            }
        });
   })

})