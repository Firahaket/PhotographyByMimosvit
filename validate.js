const { check, validationResult } = require('express-validator');

const bodyparser = require('body-parser')
const express = require("express")
const path = require('path')
const app = express()

var PORT = process.env.port || 3000
app.set("view engine", "ejs")
app.use(express.static('public'));

app.get('/', function(req, res){
  res.render('index');
});
app.get('/contact', function(req,res){
  res.render('contact',{qs: req.query});
});

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.post('/contact', [
	check('fname', 'Name length should be 10 to 20 characters')
					.isLength({ min: 3, max: 20 }),
  check('lname', 'Last name length should be 10 to 20 characters')
					.isLength({ min: 3, max: 20 }),
  check('email', 'Email length should be 10 to 30 characters')
					.isEmail().isLength({ min: 7, max: 30 }),
	check('phone', 'Mobile number should contains 10 digits')
					.isLength({ min: 6, max: 10 }),
	check('date', 'Date should be in format DD/MM/YYYY')
					.isDate()
], (req, res) => {

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log(errors)
    res.render('thank',{qs:req.query});
	}
	else {
		res.render('thank',{qs:req.query});
	}
});

app.listen(PORT, function (error) {
	if (error) throw error
	console.log("Server created Successfully on PORT ", PORT)
})
