var MAIN = require('../main.js');
function run(Request, Response)
{
    var Params = MAIN.getParams(Request)
    if(Request.params && Request.params.name){
        var funs = {
            'get':get,
            'logout':logout,
            'collect_list':collect_list,
            'collect':collect,
            'cancel':cancel,
        }
        funs[Request.params.name](Params, Request, Response);
    }else{
       Response.end('this is stub')
    }
}
/**
 * 获取用户信息
 * @param {Object} Request
 * @param {Object} Response
 */
function get(Params, Request, Response) {
    // var fileName = 'user/data/getF.json';
    var fileName = 'user/data/getSucc.json';
    MAIN.responseStub(Response,fileName);
}

/**
 * 退出登录
 * @param {Object} Request
 * @param {Object} Response
 */
function logout(Params, Request, Response) {
    var fileName = 'user/data/logout.json';
    MAIN.responseStub(Response,fileName);
}

/**
 * 我的收藏
 * @param {Object} Request
 * @param {Object} Response
 */
function collect_list(Params, Request, Response) {
    var fileName = 'user/data/collect_list.json';
    MAIN.responseStub(Response,fileName);
}

/**
 * 收藏图片
 * @param {Object} Request
 * @param {Object} Response
 */
function collect(Params, Request, Response) {
    var fileName = 'user/data/collect.json';
    MAIN.responseStub(Response,fileName);
}

/**
 * 取消收藏
 * @param {Object} Request
 * @param {Object} Response
 */
function cancel(Params, Request, Response) {
    var fileName = 'user/data/cancel.json';
    MAIN.responseStub(Response,fileName);
}

exports.index = run;