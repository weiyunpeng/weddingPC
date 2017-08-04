var MAIN = require('../main.js');
function run(Request, Response)
{
    var Params = MAIN.getParams(Request)
    if(Request.params && Request.params.name){
        var funs = {
            //套餐首页列表
            'list' : list,
            //商家筛选条件
            'index':index,
            //套餐详情
            'detail':detail,
            //某店铺的套餐列表
            'storelist':storelist
        }
        funs[Request.params.name](Params, Request, Response);
    }else{
       Response.end('this is stub')
    }
}
/**
 * 套餐首页列表
 * @param {Object} Request
 * @param {Object} Response
 */
function list(Params, Request, Response) {
    var fileName = 'index/data/busList2.json';
    MAIN.responseStub(Response,fileName);
}

/**
 * 商家筛选条件
 * @param {Object} Request
 * @param {Object} Response
 */
function index(Params, Request, Response) {
    var fileName = 'index/packageData/tag2.json';
    MAIN.responseStub(Response,fileName);
}

/**
 * 商家详情
 * @param {Object} Request
 * @param {Object} Response
 */
function detail(Params, Request, Response) {
    var fileName = 'index/packageData/detail.json';
    MAIN.responseStub(Response,fileName);
}

/**
 * 某店铺的套餐列表
 * @param {Object} Request
 * @param {Object} Response
 */
function storelist(Params, Request, Response) {
    var fileName = 'index/busData/storeList.json';
    MAIN.responseStub(Response,fileName);
}

exports.index = run;