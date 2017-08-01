var MAIN = require('../main.js');
function run(Request, Response)
{
    var Params = MAIN.getParams(Request)
    if(Request.params && Request.params.name){
        var funs = {
        }
        funs[Request.params.name](Params, Request, Response);
    }else{
       makeup(Params, Request, Response);
    }
}
/**
 * 化妆师详情
 * @param {Object} Request
 * @param {Object} Response
 */
function makeup(Params, Request, Response) {
    var fileName = 'man/data/makeup.json';
    MAIN.responseStub(Response,fileName);
}

exports.index = run;