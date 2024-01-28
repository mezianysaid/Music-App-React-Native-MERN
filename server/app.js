var express = require('express');
var cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
// const passport = require('passport');
var app = express();
app.use(express.json({extended: false}));
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
const corsOptions = {
  origin: '*',
  credentials: true,
  accessControlAllowCredentials: true,
  accessControlAllowOrigin: '*',
  accessControlAllowMethods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// app.use(passport.initialize());
// app.use(morgan('dev'));
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    var valError = [];
    Object.keys(err.errors).forEach(key =>
      valError.push(err.errors[key].message),
    );
    res.status(422).send(valError);
  }
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('the server is listening on port 3000!');
});
