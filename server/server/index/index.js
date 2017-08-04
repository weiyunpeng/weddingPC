var MAIN = require('../main.js');
function run(Request, Response)
{
    var Params = MAIN.getParams(Request)
    if(Request.params && Request.params.name){
        var funs = {
            //商家首页
            'list' : list,
            //商家筛选条件
            'index':index,
            //商家详情
            'detail':detail,
            //商家官方案例列表
            'sample':sample
        }
        funs[Request.params.name](Params, Request, Response);
    }else{
       Response.end('this is stub')
    }
}
/**
 * 商家首页
 * @param {Object} Request
 * @param {Object} Response
 */
function list(Params, Request, Response) {
    var fileName = 'index/data/busList1.json';
    MAIN.responseStub(Response,fileName);
}

/**
 * 商家筛选条件
 * @param {Object} Request
 * @param {Object} Response
 */
function index(Params, Request, Response) {
    var fileName = 'index/busData/tag1.json';
    MAIN.responseStub(Response,fileName);
}

/**
 * 商家详情
 * @param {Object} Request
 * @param {Object} Response
 */
function detail(Params, Request, Response) {
    var fileName = 'index/busData/busDetails.json';
    MAIN.responseStub(Response,fileName);
}

/**
 * 商家官方案例列表
 * @param {Object} Request
 * @param {Object} Response
 */
function sample(Params, Request, Response) {
    var fileName = 'index/busData/sample.json';
    MAIN.responseStub(Response,fileName);
}



exports.index = run;