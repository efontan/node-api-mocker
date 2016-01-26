# Node-Api-Mocker

![Dependencies](https://david-dm.org/Templum/node-api-mocker.svg)
![npm downloads](https://img.shields.io/npm/dm/node-api-mocker.svg?style=flat-square)

You can include this module either in your application usuing ``` require('node-api-mocker); ``` or as comand line tool. Further information on the usages can be found in the usages section.
#### Version
0.0.6  [@NPM](https://www.npmjs.com/package/node-api-mocker)
#### Constributor
[Templum](https://github.com/Templum/)
#### Tech
Node-Api-Mocker uses a number of open source projects to work:
* [Express](http://expressjs.com/) - fast node.js network app framework
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

Clone repository and setup a pull request once you added a feature.

### Todos

 - Test for schemaValidator
 - Test for failquote
 - Create standalone tool which generates config.json
 - Logging of the request and used parameter
 - See what comes up

License
----

MIT