var layer = layui.layer
var form = layui.form

form.verify({
    pwd: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ] ,
    samePwd: function(value) {
      if($('[name=oldPwd]').val() === value) {
        return '新旧密码不能一致！'
      }

    },
    rePwd: function(value) {
      if($('[name=newPwd]').val() !== value) {
        return '确认密码不一致！'
      }
    }
})

$('.form_submit').on('submit', function(e) {
  e.preventDefault()
  updatePwd()
})

function updatePwd() {
  $.ajax({
    method: 'POST',
    url: '/my/updatepwd',
    data: form.val("formUpdatePwd"),
    success: function(res) {
        if(res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
    }
  })
}