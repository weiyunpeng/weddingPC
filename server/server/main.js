function responseStub(Response,fileName){
    var path = require("path");
    var fs = require("fs");
    var dir = path.join(__dirname, fileName);
    Response.setHeader("Content-Type","text/html; charset=utf-8");
    fs.readFile(dir, function(err, data){
        if (err)
            throw err;
        Response.end(data);
    });
}
exports.responseStub = responseStub;