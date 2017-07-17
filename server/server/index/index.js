var MAIN = require('../main.js');
function run(Request, Response)
{
    var Params = Request.query;
    if(Request.params && Request.params.name){
        var funs = {
            //商家首页
            'index' : index,
        }
        funs[Request.params.name](Params, Request, Response);
    }else{
        index(Params, Request, Response);
    }
}
/**
 * 商家首页
 * @param {Object} Request
 * @param {Object} Response
 */
function index(Params, Request, Response) {
    var fileName;
    if(Params.isTag == '1'){
        fileName = 'index/data/index1.json';
    }else if(Params.isTag == '2'){
        fileName = 'index/data/index2.json';
    }else{
        fileName = 'index/data/index3.json';
    }
    
    MAIN.responseStub(Response,fileName);
}

exports.index = run;