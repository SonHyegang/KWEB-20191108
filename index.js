const calc = require('./calc.js');
const http = require('http');
const url = require('url');
const iquery = require('querystring');

const host = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    var query = iquery.parse(url.parse(req.url).query);

    try{
        if(url.parse(req.url).pathname != "/"){
            throw new Error("Not Found");
        }
        if(query.a == null || query.b == null || query.operator == null){
            throw new Error("Invalid Query")
        }
        else{
            var a = parseInt(query.a);
            var b = parseInt(query.b);
            var operator = query.operator;
            if(operator == "add")
                console.log(a +" + " + b + " = " + calc.plus(a, b));
            if(operator == "sub")
                console.log(a +" - " + b + " = " + calc.sub(a, b));
            if(operator == "mul")
                console.log(a +" * " + b + " = " + calc.mult(a, b));
            if(operator == "div")
                console.log(a +" / " + b + " = " + calc.div(a, b));
        }
    }
    catch (err){
        res.statusCode = 404;
        res.end(Error.message);
    }
});
/*
var a = parseInt(process.argv[2]);
var b = parseInt(process.argv[3]);
*/

server.listen(port, host, ()=>{console.log(`Server running : http://${host}:${port}`)});