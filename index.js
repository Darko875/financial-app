const express = require('express');

const app = express();

//set up engine 
app.set('view engine', 'ejs');

//Create home route
app.get('/' || '', (req,res) => {
    res.render('home');
});

app.listen(3000,() => {
    console.log('Listenning to requests on port 3000');
});