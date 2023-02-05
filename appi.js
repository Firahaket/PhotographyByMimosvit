const { check, validationResult } = require('express-validator');
var express = require('express');
var bodyparser = require('body-parser');
const upload = require('express-fileupload')
var path = require('path');
const port = process.env.PORT || 3000;

var app = express();
var urlencodedParser = bodyparser.urlencoded({extended: false});
app.set('view engine', 'ejs');
app.use(upload());
app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('index');
});
app.get('/',(req, res)=>{
    res.sendFile(__dirname + '/index.html');
})

app.get('/contact', function(req,res){
    res.render('contact',{qs: req.query});
});

app.use(bodyparser.json())

app.post('/contact', [
	check('fname', 'Name length should be 3 to 20 characters')
					.isLength({ min: 3, max: 20 }),
  check('lname', 'Last name length should be 3 to 20 characters')
					.isLength({ min: 3, max: 20 }),
  check('email', 'Email length should be 7 to 30 characters')
					.isEmail().isLength({ min: 7, max: 30 }),
	check('phone', 'Mobile number should contains max 10 digits')
					.isLength({ min: 6, max: 10 }),
	check('date', 'Date should be in format DD/MM/YYYY')
					.isDate()
], urlencodedParser, function(req,res){
    console.log(req.body);
    const errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log(errors)
    //res.render('thank',{qs:req.query});
	}
	else {
		//res.render('thank',{qs:req.query});
        console.log("Thank you one more time!")
    }
    res.render('thank',{qs:req.query});
});

app.post('/',(req, res)=>{
    if(req.files){
        console.log(req.files)
        var file = req.files.file
        var filename = file.name
        console.log(filename)

        file.mv('./uploads/'+filename, function(err){
            if(err){
                res.send(err)
            }else{
                console.log("Thank you!")
            }
        })
    }
})


app.listen(port,()=>{
    console.log('Server started at http://localhost:3000')
});