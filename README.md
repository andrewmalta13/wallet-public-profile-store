## wallet-public-profile-store

A key-value store where keys are bitcoin wallet addresses and values are signed json objects. 


## GET

send a get request to `/get/(your list of addresses seperated by commas)`

You may request a batch amount of json objects (up to 250).


You will be returned a list of json objects of the form :

```json
  {
    "address" : "some address",
    "json": {
      some: "json object"
    }
  }
```


## INSERT

send a post requst to /insert with an array of json objects of the form:

Note: only json objects with valid signatures will be inserted into the db.

```json
  {
    "address" : "some address",
    "signature" : "a base 64 signature for the string representation of the json object, signed by the private key of the above address"
    "json": {
      some: "json object"
    }
  }
```


