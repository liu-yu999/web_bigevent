$(function() {
    // 点击注册账号
    $('#link_reg').on('click', function() {
        $('.login_box').hide()
        $('.reg_box').show()
    })
    // 点击登录
    $('#link_login').on('click', function() {
        $('.login_box').show()
        $('.reg_box').hide()
    })
    // 从layui中获取form对象
    var form = layui.form

    var layer = layui.layer

    form.verify({
        psw: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repsw: function(value) {
            var psw = $('.reg_box [name = password]').val()
            if(psw != value) {
                return '两次密码不一致！'
            }
        }
    })

    // 注册监听
    $('.form_reg').on('submit',function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.form_reg [name=username]').val(),
                password: $('.form_reg [name=password]').val()
            },
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功！');
                $('#link_login').click()
            }
        })
        
    })

    // 登录监听
    $('.form_login').on('submit',function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: {
                username: $('.form_login [name=username]').val(),
                password: $('.form_login [name=password]').val()
            },
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功！');

                // 登陆成功将token值保存在localStorage
                localStorage.setItem('token',res.token)
                // 跳转到后台主页
                location.href = '../../index.html'
            }
        })
        
    })
})