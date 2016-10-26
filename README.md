# Node-Api-Mocker

[![npm downloads](https://img.shields.io/npm/dm/node-api-mocker.svg?style=flat-square)](https://www.npmjs.com/package/node-api-mocker)
[![Build Status](https://travis-ci.org/Templum/node-api-mocker.svg?branch=master)](https://travis-ci.org/Templum/node-api-mocker)
[![Inline docs](http://inch-ci.org/github/Templum/node-api-mocker.svg?branch=master&style=shields)](http://inch-ci.org/github/Templum/node-api-mocker)
[![Code Climate](https://codeclimate.com/github/Templum/node-api-mocker/badges/gpa.svg)](https://codeclimate.com/github/Templum/node-api-mocker)
[![Test Coverage](https://codeclimate.com/github/Templum/node-api-mocker/badges/coverage.svg)](https://codeclimate.com/github/Templum/node-api-mocker/coverage)

## Description

Node-Api-Mocker is a node module which allow you to simulate a rest service / rest api. You can define the api as you like using a conf.json, sample can be found in `/spec/test-conf/`. You can configure a port on which the server will listen and also an fail rate for request. This feature enables you to test server error which your normally should not receive. Like internal errors or similar things.
Node-Api-Mocker is so designed that you can either use it via command line or require it. Which makes it an ideal tool for testing. And usages during development.


## Constributor
[Templum](https://github.com/Templum/)

## Tech

Node-Api-Mocker is powered by the following node modules:

* [Express](http://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
* [jsonschema](https://www.npmjs.com/package/jsonschema) - [JSON schema](http://json-schema.org/) validator, which is designed to be fast and simple to use. The latest IETF published draft is v4, this library is mostly v4 compatible.

## Installation

Installation from git:

```sh
$ git clone https://github.com/Templum/node-api-mocker.git
$ cd node-api-mocker
$ npm install --production
```
Installation from npm:

```sh
$ npm install node-api-mocker
$ npm install -g node-api-mocker //Recommended when using as command line tool
```

## Usage

Usage via require():

```javascript
var apiMocker = require('node-api-mocker');
apiMocker('path/to/config/file.json', (server) => {
    // Do what ever you want with server
});
```

Usage via command line:

```sh
$ node-api-mocker path/to/config/file.json
```

## Changelog

Starts with upcoming version

## Development
Want to contribute? Great!
Feel free to clone and set up pull request. Or send issue reports.

### Todos

- [ ] Enhance Documentation with code samples
- [ ] Rewrite some Util Modules as class
- [ ] Testing
