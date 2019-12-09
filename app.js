if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const bodyParser = require('body-parser');



const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const indexRouter = require('./routes/index')
const payments = require('./routes/payments')

//set up engine 
app.set('view engine', 'ejs');
app.set('views', __dirname, '/views');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connect to Mongoose'))

app.use('/', indexRouter)
app.use('/payments', payments)


app.listen(3000,() => {
    console.log('Listenning to requests on port 3000');
});