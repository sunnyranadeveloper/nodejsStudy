const http  = require('http');
const fs    = require('fs');

http.createServer((req,res)=>{
    const url = req.url;
    if(url=='/') {
        res.write('<body><h2>Welcome Sunny Rana!</h2><form action="/create-user" method="post"><input type="text" name="name"> <button>Ok</button> </form></body>');
        return res.end();
    }
    if(url=='/users') {
        res.write('<body><h2>Welcome !</h2><ul><li>user 1</li><li>user 2</li><li>user 3</li></ul></body>');
        return res.end();
    }
    if(url == '/create-user' && req.method === 'POST') {
        const data=[];
        req.on('data', (chunk) => {
            data.push(chunk);
            console.log(chunk);
        });
        req.on('end', () => {
            const formData = Buffer.concat(data).toString();
            console.log(`Data : ${formData}`);
            //fs.writeFileSync('res.txt',formData.split('=')[1]);
            console.log(formData.split('=')[1]);
            res.statusCode=302
            res.setHeader('Location','/');
            return res.end();
        });
    }
    res.setHeader('Content-Type','text/html');
}).listen(3000);