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
                    "failing-rate": {
                        "type": "integer"
                    }
                },
                "required": [
                    "port",
                    "failing-rate"
                ]
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
                        "sucess": {
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
                        "sucess",
                        "error"
                    ]
                }
            }
        },
        "required": [
            "global-conf",
            "routes"
        ]
    };
    this.FILE_ENCODING = 'utf8';
    this.ERROR_MESSAGES = new ErrorMessages();
}

function ErrorMessages() {
    this.INVALID_CONF = "Given config does not match the schema. Please make sure your config does match the needed schema";
    this.MISSING_CONF = "No path to config was passed, please pass a config path.";
}

module.exports = new Constants();



