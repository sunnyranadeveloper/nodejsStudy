const http = require('http');
const fs   = require('fs');
var mongo = require('mongodb').MongoClient;

var mongodb 	= {
    insert : (jsonData) => {
                mongo.connect('mongodb://localhost:27017',{ useNewUrlParser: true,useUnifiedTopology:true }, (err, db) => {
                    if(err) throw err;
                    var dbo = db.db('nodejs');
                    var item = {
                        name : "Sunny",
                        email : "sunny@vv.com",
                        contact : "9803329610",
                        status : "1",
                        created_at : "2019-12-09 00:00:00",
                        modifed_at : "2019-12-09 00:00:00"
                    };
                    dbo.collection("users").insertOne(item, (err, res) => {
                        if(err) {return true; }
                        else {return true};
                    });
                });
    }
}
http.createServer((req,res)=> {
    res.setHeader('Content-Type','text/html');
    //res.write('check url' + req.url + ' here');
    const url = req.url;
    var render = {
        htmlFile : function(path) {
                        fs.readFile(path, (err,data) => {
                            res.write(data);
                            return res.end();
                        });
        }
    }
    var getForm = {
        formData : function() {
            const data = [];
            req.on('data', (chunk) => {
                data.push(chunk);
            });
            req.on('end', () => {
                const formData = Buffer.concat(data).toString();
                temp = formData.split('=');
                const jsonData = {};
                jsonData[temp[0]] = temp[1]; 
                jsonData[temp[2]] = temp[3];
                jsonData[temp[4]] = temp[5];
                var result = mongodb.insert(data);
               // res.write(result);
                return result;
            });
        }
    }
    if(url=='/') {
        render.htmlFile('crud/views/index.html');
    }
    else if(url=='/insert'){
        render.htmlFile('crud/views/insert.html');
    } else if(url=='/save' && req.method=="POST"){
        check = getForm.formData();

        if(check) {
            res.write('Operation has been performed');
        } else {
            res.write('Operaton not done.');
        }
        res.end();
    }
}).listen(3000);