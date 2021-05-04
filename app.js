var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const dbConfig = require('./config/config');
const mongoose = require('mongoose');
const userRouter = require('./controllers/user.controller');
const authRouter = require('./controllers/auth.controller');
const champRouter = require('./controllers/champ.controller');
const entrepriseRouter = require('./controllers/entreprise.controller');
const offreRouter = require('./controllers/offre.controller');
const productRouter = require('./controllers/produit.controller');
const projetRouter = require('./controllers/newProject.controller');
const boutiqueRouter = require('./controllers/boutique.controller');
const markerRouter = require('./controllers/marker.controller');
const actionRouter = require('./controllers/action.controller');



const uploads = require('./controllers/uploads.controller');
const swaggerUi = require("swagger-ui-express");
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

var cors = require('cors');
var app = express();
app.use('/media',
  express.static( path.resolve( __dirname, './media' ) )
);
// Connection to DataBase
mongoose.connect(dbConfig.url, { useNewUrlParser: true })
  .then(() => {
    console.log("Successfully connected to the database");
  }).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Midleware
mongoose.set('useCreateIndex', true) // ?
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//routing
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/champ', champRouter);
app.use('/entreprise', entrepriseRouter);
app.use('/boutique', boutiqueRouter);
app.use('/offre', offreRouter);
app.use('/product', productRouter);
app.use('/projet', projetRouter);
app.use('/uploads', uploads);
app.use('/marker', markerRouter);
app.use('/action', actionRouter);


//Cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Content-Type', 'application/octet-stream');

  next();
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.json({
    message: err.message,
    error: err
  });
  
});

module.exports = app;
