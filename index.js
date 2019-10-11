const express = require('express');
const bodyParser = require('body-parser');
const jsdom = require("jsdom");

//jquery
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;


var $ = jQuery = require('jquery')(window);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//set up engine 
app.set('view engine', 'ejs');

//Create home route
app.get('/' || '', (req,res) => {
    res.render('home');
});

app.post('/process-login', (req,res) => {
    //login 
    console.log('Form: ' + req.query.form);
    console.log('Name: ' + req.body.name);
    console.log('Email: ' + req.body.email);
    console.log('Password: ' + req.body.password);
    res.redirect(303, '/thank-you');
});

app.post('/process-register', (req,res) => {
    //register
    console.log('Email: ' + req.body.email);
    console.log('Password: ' + req.body.password);
    res.redirect(303, '/thank-you');
})

app.listen(3000,() => {
    console.log('Listenning to requests on port 3000');
});