var djanky = require('./djanky');
var views = require('./views');

var routes = [

    // preview server
    ['^/$', views.index, 'index'],
    ['^/blog/(.+)$', views.single_post, 'single_post'],
    ['^/media/(.+)$', views.media, 'media'],

    // admin actions
    ['admin/rank', views.rank, 'rank'],
    ['admin/re-render', views.re_render, 're-render']

];

var previewServer = new djanky.Server(1337, routes);

previewServer.start();