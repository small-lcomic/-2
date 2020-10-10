$(function () {

    getUserInfo()
    function getUserInfo() {

        $.ajax({
            url: '/my/userinfo',
            type: 'get',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                $image.cropper('destory').attr('src', res.data.user_pic).cropper(options)
            }
        });
    }

    // ---------------------------------------------

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // -----------------------------------------------
    //2.选择文件
    $('#btnChooseImage').on('click', function () {
        $('#file').click();
    });

    //3.改图片
    var layer = layui.layer;
    $('#file').on('change', function (e) {
        // 拿到用户选择的文件
        var files = e.target.files[0];
        
        //非空检验
        if (files.length === 0) {
            return layer.msg('请选择用户头像!')
        }
        //根据选择的文件创建一个对应的URl地址
        var newImgURL = URL.createObjectURL(files)

        //先销毁旧的裁剪区域,再重新设置图片路径,之后再创建新的裁剪区域
        $image
            .cropper('destroy')//销毁旧区域
            .attr('src', newImgURL)//重新设置裁剪区域
            .cropper(options)//重新初始化裁剪区域     
    });

    //4. 上传头像
    $('#btnUpload').on('click', function () {
        //获取base64 类型头像(字符串)
        var dataURL = $image
            .cropper('getCroppedCanvas', {//创建一个canvas
                width: 100,
                height:100,
            })
            .toDataURL('image/png')//转换为64格式
            console.log(typeof dataURL)
        $.ajax({
            url:'/my/update/avatar',
            type:'post',
            data: {
                avatar:dataURL
            },
            success: function(res){
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('恭喜您,更换头像成功!')
                window.parent.getUserInfo();
            }
        });
    })

})