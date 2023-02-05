var express = require('express');
var bodyParser = require('body-parser');
//var path = require('path');
const port = process.env.PORT || 3000;

var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('index');
});

app.get('/contact', function(req,res){
    res.render('contact',{qs: req.query});
});
app.post('/contact', urlencodedParser, function(req,res){
    console.log(req.body);
    res.render('thank',{qs:req.query});
});

app.listen(port,()=>{
    console.log('Server started at http://localhost:3000')
});