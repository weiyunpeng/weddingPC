 var MAIN = require('./main');
// 路由注册
function router_reg(app){
    //
    app.all('/store/:name', require('./index/index').index);
    app.all('/package/:name', require('./index/package').index);
    app.all('/cameraman', require('./man/cameraman').index);
    app.all('/makeup', require('./man/makeup').index);
}



module.exports=function(app){
    router_reg(app);
};