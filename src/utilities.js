function GenerateErrorObject(message) {
    return { "error_description": message };
}

module.exports = {
    GenerateErrorObject: GenerateErrorObject
}