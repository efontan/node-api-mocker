/**
 * This object enables static access to constants.
 */
function Constants() {
    this.CONF_SCHEMA = {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
            "global_conf": {
                "type": "object",
                "properties": {
                    "port": {
                        "type": "integer"
                    },
                    "failing_rate": {
                        "type": "integer"
                    }
                }
            },
            "routes": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "method": {
                            "type": "string"
                        },
                        "path": {
                            "type": "string"
                        },
                        "success": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "status": {
                                        "type": "integer"
                                    },
                                    "body": {
                                        "type": "object"
                                    }
                                },
                                "required": [
                                    "status",
                                    "body"
                                ]
                            }
                        },
                        "error": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "status": {
                                        "type": "integer"
                                    },
                                    "body": {
                                        "type": "object"
                                    }
                                },
                                "required": [
                                    "status",
                                    "body"
                                ]
                            }
                        }
                    },
                    "required": [
                        "method",
                        "path",
                        "success",
                        "error"
                    ]
                }
            }
        },
        "required": [
            "global_conf",
            "routes"
        ]
    };
    this.FILE_ENCODING = 'utf8';
    this.ERROR_MESSAGES = new ErrorMessages();
}

/**
 * This object contains all the error messages which can be thrown by the server
 */
function ErrorMessages() {
    this.INVALID_CONF = "Given config does not match the schema. Please make sure your config does match the needed schema";
    this.MISSING_CONF = "No path to config was passed, please pass a config path.";
    this.DOES_NOT_EXIST = "The given file does not exist";
    //TODO: Add messages for the new errors from the UTIL package
}

module.exports = new Constants();



