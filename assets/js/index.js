$(function() {
    
    getUserInfo()
    signOut()
    
})

var layer = layui.layer
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if(res.status !== 0) {
                return layer.msg('用户不存在！')
            }
            // console.log(res.data);
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(data) {
    var name = data.nickname || data.username

    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)

    if(data.user_pic !== null) {
        $('.layui-nav-img').attr('src', data.user_pic).show()
    }else {
        $('.layui-nav-img').hide()
        var firstname = name[0].toUpperCase()
        $('.u_text').html(firstname).show()
    }
}

function signOut() {
    $('.sign_out').on('click', function() {
        layer.confirm('确定退出登录', {icon: 3, title:'提示'}, function(index){
            //do something
            // 清空本地存储的token
            localStorage.removeItem('token')
            location.href = '../../login.html'
            
            layer.close(index);
          });
    })
}