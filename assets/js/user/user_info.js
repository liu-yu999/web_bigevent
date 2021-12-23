
var form = layui.form
    form.verify({
        email: [
            /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            ,'密码必须是英文字母、数字、下划线、英文句号、以及中划线组成'
          ] 
})



initUserInfo()

var layer = layui.layer
var form = layui.form

function initUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if(res.status !== 0) {
                return layer.msg('用户获取失败！')
            }
            
            form.val("formUserInfo", res.data)
            
        }
    })
}

$('#btnReset').on('click', function(e) {
    e.preventDefault()
    initUserInfo()
})

$('.form_submit').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
        method: 'POST',
        url: '/my/userinfo',
        data: form.val("formUserInfo"),
        success: function(res) {
            if(res.status !== 0) {
                return layer.msg('更新用户信息失败！')
            }
            window.parent.getUserInfo()
            layer.msg('更新用户信息成功！')
        }
    })
})