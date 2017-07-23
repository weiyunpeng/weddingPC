var MAIN = require('../main.js');
function run(Request, Response)
{
    var Params = Request.query;
    if(Request.params && Request.params.name){
        var funs = {
            //商家首页
            'qryBusList' : qryBusList,
        }
        funs[Request.params.name](Params, Request, Response);
    }else{
       Response.end('this is 桩接口')
    }
}
/**
 * 商家首页
 * @param {Object} Request
 * @param {Object} Response
 */
function qryBusList(Params, Request, Response) {
    var fileName;
    if(Params.type == 'bus'){
        fileName = 'index/data/index1.json';
    }else if(Params.type == 'meal'){
        fileName = 'index/data/index2.json';
    }else{
        fileName = 'index/data/index3.json';
    }
    
    MAIN.responseStub(Response,fileName);
}

exports.index = run;