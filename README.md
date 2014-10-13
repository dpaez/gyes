gyes
====

## Description

Endpoint module for the plusultra platform. It handles everything from connection to modality creation passing through the web app logic. It is made to be used on both sides (server and client if needed).

## Usage example

### Creating a _gyes_ instance

```js
var gyes = require( 'gyes' );

var appkey = 'something crazy';
var plusultraURI = 'http://localhost:6060';
var gyesClient = new gyes( appkey, plusultraURI );

// this is similar to any socket lib
gyesClient.io.on('connect', function(){
  gyesClient.authenticate(token);

  gyesClient.io.on('authenticated', function(){

    // we are in.....
  })

  gyesClient.io.on('message', function(msg){

  })
})

// if you are a modality driver dev and want to develop a modality driver, then ... =D
var Modality = gyes.Modality;

var modalityDriver = new AirGesturesMD(); // maybe the MD should know about the modality type (input=recognizer | output=synthetizer | both )

var options = {};

var leapModality = new Modality( 'leapgestures', 'input', modalityDriver, options );

// another way of add a md:
// var leapModality.addDriver( modalityDriver );


// So then MD dev, should start scanning or recognizing like a daemon...?

// so this does not fit quite well.. Where does ''data'' comes from?
modality.recognized( data );

// another option..
modality.start();
// and you go away, this would send data if its a recog or send if its a synt or both.
// in other words, this starts the modality driver.
```

### _WIP_
