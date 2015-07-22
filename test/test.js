var request = require('request');
var bitcoin = require('bitcoinjs-lib');


var testJson = [
{
  address: "msLoJikUfxbc2U5UhRSjc2svusBSqMdqxZ",
  signature: "HJLQlDWLyb1Ef8bQKEISzFbDAKctIlaqOpGbrk3YVtRsjmC61lpE5ErkPRUFtDKtx98vHFGUWlFhsh3DiW6N0rE",
  json: {
    hey: "yo dawg",
    test: "testing 123"
  }
},
{
  address: "mghg74ZBppLfhEUmzxK4Cwt1FCqiEtYbXS",
  signature: "H/fLF99RaiQ2kA4MMFYNUBAI3sJzq7xKjsHRFv17od1LBUzo4PymbWowv2yHBVtkxZExC4NpNWohCbyG8JR7B08=",
  json: {
    hey: "yo dawg",
    test: "testing 123"
  }
}
];

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



