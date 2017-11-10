 var MAIN = require('./main');
// 路由注册
function router_reg(app){
    //
    app.all('/api/store/:name', require('./index/index').index);
    app.all('/api/package/:name', require('./index/package').index);
    app.all('/api/cameraman', require('./man/cameraman').index);
    app.all('/api/makeup', require('./man/makeup').index);
    app.all('/api/site/:name', require('./site/index').index);
    app.all('/api/user/:name', require('./user/index').index);
    app.all('/api/guide/:name', require('./guide/index').index);
    app.all('/api/comment/:name', require('./site/index').index);
}



module.exports=function(app){
    router_reg(app);
};