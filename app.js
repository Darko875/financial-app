if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const router = express.Router;
require('./config/passport')(passport);


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const indexRouter = require('./routes/index.js')
const paymentsRouter = require('./routes/payments.js')
const usersRouter = require('./routes/users.js')

//set up engine 
app.set('view engine', 'ejs');
app.set('/views', __dirname, '/views');

app.use(passport.initialize());
app.use(passport.session());
app.use(
    session({
      secret: process.env.SECRET,
      resave: true,
      saveUninitialized: true
    })
  );

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connect to Mongoose'))

indexRouter(app)
usersRouter(app)
paymentsRouter(app)



app.listen(process.env.APP_URL,() => {
    console.log('Listenning to requests on port 3000');
});