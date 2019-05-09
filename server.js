var express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.post('/v1/weather', function (req, res) {
    res.send('Hello World')
})

app.get('/v1/results', function (req, res) {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log("Weather service listening on " + port);
})

module.exports = app;