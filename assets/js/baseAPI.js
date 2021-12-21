$.ajaxPrefilter( function( options, originalOptions, jqXHR ) { 
     options.url = 'http://api-breakingnews-web.itheima.net' + options
     console.log(options.url);
  });