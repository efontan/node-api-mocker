# Node-Api-Mocker

[![Dependencies](https://david-dm.org/Templum/node-api-mocker.svg)]
[![npm downloads](https://img.shields.io/npm/dm/node-api-mocker.svg?style=flat-square)](https://www.npmjs.com/package/node-api-mocker)
[![Inline docs](http://inch-ci.org/github/Templum/node-api-mocker.svg?branch=master&style=shields)](http://inch-ci.org/github/Templum/node-api-mocker)
[![Code Climate](https://codeclimate.com/github/Templum/node-api-mocker/badges/gpa.svg)](https://codeclimate.com/github/Templum/node-api-mocker)
[![Issue Count](https://codeclimate.com/github/Templum/node-api-mocker/badges/issue_count.svg)](https://codeclimate.com/github/Templum/node-api-mocker)
[![Test Coverage](https://codeclimate.com/github/Templum/node-api-mocker/badges/coverage.svg)](https://codeclimate.com/github/Templum/node-api-mocker/coverage)

You can include this module either in your application usuing ``` require('node-api-mocker); ``` or as comand line tool. Further information on the usages can be found in the usages section.
#### Version
0.0.7  [@NPM](https://www.npmjs.com/package/node-api-mocker)
#### Constributor
[Templum](https://github.com/Templum/)
#### Tech
Node-Api-Mocker uses a number of open source projects to work:
* [Express](http://expressjs.com/) - fast node.js network app framework
* [Scribe.js](https://github.com/bluejamesbond/Scribe.js) - log framework for node.js, which also feature webpanel
* [Mocha](https://mochajs.org/) - well established node.js test framework
* [Should](https://github.com/shouldjs/should.js) - BDD style assertion libary for node.js
* [Supertest](https://github.com/visionmedia/supertest) - Super-agent driven library for testing node.js HTTP servers


## Installation
For installation you can use ```$ npm install node-api-mocker``` or you can clone this repository. But if you do so, please keep in mind that you have to install the depedencys using ```$ npm install```.

## Usages

You have the following two options to use the application. Both uses the same config.json for the configuration of the server.
#### As Command Line Tool:
``` $node node-api-mocker path_to_config_file ```
#### As Require:
```javascript
var mockServer = require('node-api-mocker');

mockServer('path_to_config_file', function(err, server){
if(err) //Server was not started
else //Server was started
});
```
The mock server will log all incomming requests. You can view them in terminal or in an webpanel. To visit the webpanel just browse to http://youraddress.domain:port/logs.
Following two gifs which shows both options.

####WebPanel
![webPanel](https://github.com/bluejamesbond/Scribe.js/blob/master/__misc/webPanelDemo.gif)  

####Terminal
![terminal](https://github.com/bluejamesbond/Scribe.js/blob/master/__misc/terminalDemo.png)  


----

#### Example for config.json
```json
{
  "port": 3001,
  "responsePath": "C:\\Users\\simon\\Source\\Repos\\node-api-mocker\\configuration_test\\responses\\",
  "requestFailQuote": 50,

  "paths": [
    {
      "method": "GET",
      "path": "/user/:variable/find",
      "successResponse": {
        "filename": "success.json",
        "status": 200
      },
      "errorResponses": [
        {
          "filename": "error.json",
          "status": 400
        },
        {
          "filename": "extraError.json",
          "status": 400
        }
      ]
    },
    {
      "method": "POST",
      "path": "/user/:variable/find",
      "successResponse": {
        "filename": "success.json",
        "status": 200
      },
      "errorResponses": [
        {
          "filename": "error.json",
          "status": 400
        },
        {
          "filename": "extraError.json",
          "status": 400
        }

      ]
    },
    {
      "method": "PUT",
      "path": "/user/:variable/find",
      "successResponse": {
        "filename": "",
        "status": 201
      },
      "errorResponses": [
        {
          "filename": "error.json",
          "status": 400
        },
        {
          "filename": "extraError.json",
          "status": 400
        }
      ]
    },
    {
      "method": "DELETE",
      "path": "/user/:variable/find",
      "successResponse": {
        "filename": "success.json",
        "status": 200
      },
      "errorResponses": [
        {
          "filename": "error.json",
          "status": 400
        },
        {
          "filename": "extraError.json",
          "status": 400
        }

      ]
    }
  ]
}
```






## Development
Want to contribute? Great!

Feel free to clone and set up pull request. Or send issue reports.

### Todos

 - Test for schemaValidator
 - Test for failquote
 - Create standalone tool which generates config.json
 - Logging of used parameter and body
 - See what comes up

License
----

MIT