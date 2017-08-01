var MAIN = require('../main.js');
function run(Request, Response)
{
    var Params = MAIN.getParams(Request)
    if(Request.params && Request.params.name){
        var funs = {
        }
        funs[Request.params.name](Params, Request, Response);
    }else{
       camaraman(Params, Request, Response);
    }
}
/**
 * 摄影师详情
 * @param {Object} Request
 * @param {Object} Response
 */
function camaraman(Params, Request, Response) {
    var fileName = 'man/data/camaraman.json';
    MAIN.responseStub(Response,fileName);
}

exports.index = run;