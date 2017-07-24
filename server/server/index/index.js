var MAIN = require('../main.js');
function run(Request, Response)
{
    var Params = MAIN.getParams(Request)
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
        fileName = 'index/data/busList1.json';
    }else if(Params.type == 'meal'){
        fileName = 'index/data/busList2.json';
    }else{
        fileName = 'index/data/none.json';
    }
    
    MAIN.responseStub(Response,fileName);
}

exports.index = run;