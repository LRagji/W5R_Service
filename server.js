var express = require('express');
const { fileParser } = require('express-multipart-file-parser')
const utils = require('./src/utilities');
const app = express();
const port = process.env.PORT || 3000;

app.use(fileParser({
    rawBodyOptions: {
        limit: '1mb',
    }
}))

app.post('/v1/weather', function (req, res) {
    if (req.files === undefined) {
        res.status(400).send(utils.GenerateErrorObject("No file found."));
        return;
    }
    if (req.files[0].fieldname !== "citylist") {
        res.status(400).send(utils.GenerateErrorObject("No file found or improper argument name."));
        return;
    }
    res.status(202).send('Hello World');
})

app.get('/v1/results', function (req, res) {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log("Weather service listening on " + port);
})

module.exports = app;