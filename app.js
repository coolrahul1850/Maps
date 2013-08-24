var express = require('express');
var app = express();
var mongoose = require('mongoose'),
	listings = require('./routes/listings'),
	path = require('path');


// all environments
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('jade').renderFile);

var mongo;
app.configure('development', function(){
    mongo = {
        "hostname":"localhost",
        "port":27017,
        "username":"",
        "password":"",
        "name":"",
        "db":"db"
    }
});
// app.configure('production', function(){
//     var env = JSON.parse(process.env.VCAP_SERVICES);
//     mongo = env['mongodb-1.8'][0]['credentials'];
// });
// var generate_mongo_url = function(obj){
//     obj.hostname = (obj.hostname || 'localhost');
//     obj.port = (obj.port || 27017);
//     obj.db = (obj.db || 'test');
//     if(obj.username && obj.password){
//         return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
//     }else{
//         return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
//     }
// }
//var mongourl = generate_mongo_url(mongo);
var mongourl = "mongodb://ranger9007:poker101@ds027668.mongolab.com:27668/maps";
process.env.mongourl = mongourl;
mongoose.connect(mongourl);

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/',function(req,res){
	res.sendfile(__dirname+'/public/mapcheck.html');
});

app.get('/listings', listings.listings);
app.get('/addListings', listings.addListings);
app.get('/listings/delete', listings.deleteAllListings);
app.post('/listings/upload', listings.uploadListings);
app.get('/listings/all', listings.getAll);
app.get('/listings/poly', listings.polylistings);

app.listen(process.env.VCAP_APP_PORT || 3000);
