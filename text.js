const http  = require('http');
const fs    = require('fs');

http.createServer((req,res)=>{
    const url = req.url;
    if(url=='/') {
        res.write('<body><form action="/msg" method="post"><input type="text" name="name"> <input type="submit" name="submit" value="Ok"> </form></body>');
        return res.end();
    }
    if(url == '/msg' && req.method === 'POST') {
        const data=[];
        req.on('data', (chunk) => {
            data.push(chunk);
            console.log(chunk);
        });
        req.on('end', () => {
            const formData = Buffer.concat(data).toString();
            console.log(`Data : ${formData}`);
            //res.write(`<body><h1>Here it is node. : ${formData}</h1></body>`);
            //res.write('</html>');
            fs.writeFileSync('res.txt',formData.split('=')[1]);
            res.statusCode=302
            res.setHeader('Location','/done');
            return res.end();
        });
    }
    if(url=='/done') {
        res.write('File has been generated.');
        return res.end();
    }
    res.setHeader('Content-Type','text/html');
}).listen(3000);