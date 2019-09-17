var http 	= require('http');
var fs 		= require('fs');
var mysql 	= require('mysql');
var mongo 	= require('mongodb').MongoClient;
/* mysql code
var conn 	= mysql.createConnection({
		host:'localhost',
		user:'root',
		password:'',
		database:'nodejs'
	});
conn.connect(function(err) {
	if(err) throw err
	console.log('connected');
	// sql = "INSERT INTO `users` (`id`, `name`, `email`) VALUES (NULL, 'Sunny', 'sunny@gmail.com')";
	sql = "select * from users";
	conn.query(sql,function(err,result){
		if(err) throw err
		console.log(result);
	});
});
*/
var url = 'mongodb://localhost:27017/nodejs';
mongo.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true },function(err,db) {
	if(err) throw err
	var mdb = db.db('nodejs');
	mdb.createCollection('users',function(err,res){
		if(err) throw err;
		console.log('collection created');
	});
	console.log('Db created');
	db.close();
});
http.createServer(function(req,res) {
	//res.write('<strong>SUNNY RANA</strong>');
	fs.readFile('index.html',function(err,data) {
		res.writeHead(200,{'Content-Type':'text/html'});
		res.write(data);
		res.end('Hello World!');
	});
}).listen(8080);