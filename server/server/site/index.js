var MAIN = require('../main.js');
function run(Request, Response)
{
    var Params = MAIN.getParams(Request)
    if(Request.params && Request.params.name){
        var funs = {
            'index':index,
            'view_photo':view_photo,
            'index_login':index_login,
            'comment':comment,
            'photo_flow':photo_flow,
        }
        funs[Request.params.name](Params, Request, Response);
    }else{
       Response.end('this is stub')
    }
}
/**
 * 首页(未登录)
 * @param {Object} Request
 * @param {Object} Response
 */
function index(Params, Request, Response) {
    var fileName = 'site/data/index.json';
    MAIN.responseStub(Response,fileName);
}

/**
 * 首页(已登录)
 * @param {Object} Request
 * @param {Object} Response
 */
function index_login(Params, Request, Response) {
    var fileName = 'site/data/index_login.json';
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

/**
 * 深度点评
 * @param {Object} Request
 * @param {Object} Response
 */
function comment(Params, Request, Response) {
    var fileName = 'site/data/comment.json';
    MAIN.responseStub(Response,fileName);
}

/**
 * 图片瀑布流
 * @param {Object} Request
 * @param {Object} Response
 */
function photo_flow(Params, Request, Response) {
    var page = Params.page;
    var fileName;
    if(page == 1){
        fileName = 'site/data/photo_flow.json';
    }else if(page == 2){
        fileName = 'site/data/photo_flow2.json';
    }else{
        fileName = 'site/data/none.json'
    }
    MAIN.responseStub(Response,fileName);
}

exports.index = run;