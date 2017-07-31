 var MAIN = require('./main');
// 路由注册
function router_reg(app){
    //
    app.all('/store/:name', require('./index/index').index);
    app.all('/package/:name', require('./index/package').index);
}



module.exports=function(app){
    router_reg(app);
};