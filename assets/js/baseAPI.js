//发出ajax之前会触动  ajaxPrefilter 方法
//可以通过 options 配置 ajax 各种参数

$.ajaxPrefilter(function (options) {
    //拼接对应环境的服务器地址
    options.url = "http://ajax.frontend.itheima.net" + options.url;

  
})