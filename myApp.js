var express = require('express');
var app = express();
var bodyParser = require("body-parser");

console.log('__dirname', __dirname);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/public", express.static(__dirname + "/public"));

app.get('/', function(req, res) {
  const absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath);
});

app.get('/json', (req, res) => {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE == 'uppercase') {
    message = message.toUpperCase();
  }
  res.json({"message": message});
})

app.get(
  '/now', 
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  ({time}, res) => {
    res.send({
      time
    })
  }
)

app.get('/:word/echo', (req, res) => {
  res.json({"echo": req.params.word});
});

app.get('/name', (req, res) => {
  var {first: firstName, last: lastName } = req.query;

  res.json({
    name: `${firstName} ${lastName}`
  });
})

app.post("/name", (req, res) => {
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
})





















 module.exports = app;
