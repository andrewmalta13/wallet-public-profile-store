var request = require('request');

var testJson = [
{
  address: "msLoJikUfxbc2U5UhRSjc2svusBSqMdqxZ",
  json: {
    hey: "yo dawg",
    test: "testing 123"
  }
},
{
  address: "mjf6CRReqGSyvbgryjE3fbGjptRRfAL7cg",
  json: {
    dkdsf: "sfdsf",
    dfk: 1235,
    yodawg: "I heard you liked json, so I put json in your json so you could parse while you parse"
  }
},
{
  address: "mjf6CRReqGSyvbgryjE3fbGjptRRfAL7cg",
  json: {
    df123: true,
    dfk: .01,
    yodawg: "wassup"
  }
}];

request({
  url: "http://localhost:5000/insert", //URL to hit
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(testJson)
}, function(error, response, body){
  if(error) {
    console.log("error posting: " + error);
  } 
});
