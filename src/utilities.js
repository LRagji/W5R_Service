const fs = require('fs');
const readline = require('readline');

function GenerateErrorObject(message) {
    return { "Status": "Error", "error_description": message };
}

module.exports = {
    GenerateErrorObject: GenerateErrorObject
}