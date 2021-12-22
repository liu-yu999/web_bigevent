$.ajaxPrefilter( function(options) { 
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    if(options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 无论成功还是失败，只要触发ajax都会执行这个函数
    options.complete = function(res) {
        if(res.responseJSON.status === 1){
            localStorage.removeItem('token')
            location.href = '../../login.html'
        } 
    }
 })