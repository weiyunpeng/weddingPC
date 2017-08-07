var MAIN = require('../main.js');
function run(Request, Response)
{
    var Params = MAIN.getParams(Request)
    if(Request.params && Request.params.name){
        var funs = {
            'index':index,
            'view_photo':view_photo
        }
        funs[Request.params.name](Params, Request, Response);
    }else{
       Response.end('this is stub')
    }
}
/**
 * 首页
 * @param {Object} Request
 * @param {Object} Response
 */
function index(Params, Request, Response) {
    var fileName = 'site/data/index.json';
    MAIN.responseStub(Response,fileName);
}

/**
 * 查看图组详情
 * @param {Object} Request
 * @param {Object} Response
 */
function view_photo(Params, Request, Response) {
    var fileName = 'site/data/view_photo.json';
    MAIN.responseStub(Response,fileName);
}

exports.index = run;