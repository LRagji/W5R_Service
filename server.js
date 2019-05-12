var express = require('express');
const multer = require('multer');
const utils = require('./src/utilities');
const NodeCache = require("node-cache");
const shortid = require('shortid');
const workerType = require('./src/worker');
const asyncWorker = new workerType(process.argv[3]);
const OngoingTasks = new NodeCache();
const InputFileparserType = require('./src/inputFileparser');
const CityIdMap = new Map(require('./src/cityMap').Serialized);
const parser = new InputFileparserType();
const app = express();
const port = process.argv[2] || 3000;
const handleUploads = multer({ dest: "uploads/" })
const OneMinuteTimeout = 60;

app.post('/v1/weather', handleUploads.single("citylist"), async function (req, res) {
    try {
        if (req.file === undefined) {
            res.status(400).send(utils.GenerateErrorObject("No file found."));
            return;
        }

        parser.mapCitiesToIds(req.file.path, CityIdMap).then((cityIds) => {
            let requestId = enQueTask(cityIds);
            res.setHeader("Location", "/v1/results/" + requestId);
            res.status(202).send({
                "Status": "Accepted",
                "Total Cities": cityIds.length,
                "Result Location": "/v1/results/" + requestId
            });
        }, (notFoundCities) => {
            res.status(400).send(utils.GenerateErrorObject("Cannot find following cities: ." + notFoundCities.join(",")));
        });
    }
    catch (err) {
        if (!res.headersSent) {
            res.status(500).send(utils.GenerateErrorObject("Unknown error occured."));
        }
        else {
            res.end();
        }
    }
})

function enQueTask(cityIds) {
    let reqId = shortid.generate();
    const batchSize = -1;
    let work = asyncWorker.collectData(cityIds, batchSize)
        .then((r) => { return { "Status": "Completed" }; }, (r) => { return { "Status": "Failed:" + r }; });
    OngoingTasks.set(reqId, work, OneMinuteTimeout);
    return reqId
}

app.get('/v1/results/:reqId', async function (req, res) {
    try {
        let statusObj = OngoingTasks.get(req.params.reqId);

        if (statusObj === undefined) {
            res.sendStatus(404).send(utils.GenerateErrorObject("Cannot find request id:" + req.param.reqId));
            return;
        }

        let waitOnePromise = new Promise((a, r) => setTimeout(() => a({ "Status": "Processing" }), 100));
        let result = await Promise.race([statusObj, waitOnePromise]);
        res.send(result);
    }
    catch (err) {
        if (!res.headersSent) {
            res.status(500).send(utils.GenerateErrorObject("Unknown error occured."));
        }
        else {
            res.end();
        }
    }
})

app.listen(port, () => {
    console.log("Weather service listening on " + port);
})

module.exports = app;