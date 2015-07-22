var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var pg = require('pg');

var commonBlockchain = require('blockcypher-unofficial')({
  key: process.env.KEY,
  network: "testnet"
});

var connectionString = process.env.DATABASE_URL;
var dbclient = new pg.Client(connectionString);
dbclient.connect(function(err){
  if (err) {
    console.error("error connecting to database" + err);
  }
});

app.set('port', (process.env.PORT || '3000'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var server = app.listen((process.env.PORT || '3000'), function () {
  console.log('Listening on port %d', server.address().port);
});


function throwError (message, next) {
  var err = new Error(message);
  err.status = 500;
  next(err);
}


app.get('/get/:addressList', function (req, res, next) {
  var sortParam = req.params["addressList"];
  var addresses = sortParam.split(',');
  var response = [];
  var count = 0;
  console.log(addresses);
  if(addresses.length > 250) {
    throwError("number of addresses must be less than or equal to 250", next);
  }
  else {
    addresses.forEach(function (address){
      dbclient.query("select * from objects where address = $1", [address], function (err, result){
        if (err) {
          throwError("error processing db get", next);
        }
        else {
          for (var i = 0; i < result.rows.length; i++) {
            response.push(result.rows[i]);
          }
          if (++count === addresses.length) {
            res.end(JSON.stringify(response));
          }
        }
      });
    });
  }
});


//expects an arry of json objects.
//{address: (wallet's public address),
// json: (some json object)}
app.post('/insert', function (req, res, next) {
  if (req.body) {
    try {
      parsed = req.body;
      console.log(parsed);
      var count = 0;
      parsed.forEach(function (pair){
        commonBlockchain.Addresses.Unspents([pair.address], function (err, resp) {
          if (err) {
            throwError("could not get unspents from commonBlockchain client", next);
          }
          else {
            if (resp[0].length > 0) {
              var address = pair.address;
              var json = pair.json;
              json.timestamp = new Date().getTime();

              dbclient.query("INSERT INTO objects VALUES ($1, $2)", [address, json], function (err, result) {
                if (err) {
                  throwError("could not insert into db", next);
                }
                else {
                  if (++count === parsed.length) {
                    console.log("inserted all object succesfully.")
                    res.end();
                  }
                }
              });
            }
          }
        });
      });
    }
    catch (err) {
      throwError('Could not perform your request', next);
    }
  }
  else {
    throwError('Missing body', next);
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// production error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  next(err);
});

module.exports = app;
