const rp = require('request-promise-native');
const NodeCache = require("node-cache");
const fs = require("fs");
const requestCache = new NodeCache();
const tenMinuteTimeout = 60 * 8;

module.exports = class Worker {
    constructor(secretKey) {
        this._secretKey = secretKey;
    }

    async collectData(cityIds, batchSize = -1) {
        let taskBatch = [];
        let cityIdsClone = Array.from(cityIds);
        while (cityIdsClone.length > 0) {
            let cityId = cityIdsClone.shift();
            let task = this._queryWeather(cityId).then((payload) => this._persistData(payload));
            taskBatch.push(task);

            if (batchSize === taskBatch.length) {
                await Promise.all(taskBatch);
                taskBatch = [];
            }
        }
        if (taskBatch.length > 0) {
            return Promise.all(taskBatch);
        }
        else
            return Promise.resolve();
    }

    async _queryWeather(cityId) {
        let payload = requestCache.get(cityId);
        if (payload === undefined) {
            payload = await rp("https://api.openweathermap.org/data/2.5/weather?id=" + cityId + "&APPID=" + this._secretKey);
            payload = JSON.parse(payload);
            requestCache.set(cityId, payload, tenMinuteTimeout);
        }
        return payload;
    }

    _persistData(payload) {
        return new Promise(function (resolve, reject) {
            const fileName = process.cwd() + "\\data\\" + payload.id + "-" + Date.now() + ".json";
            fs.writeFile(fileName, JSON.stringify(payload), undefined, function (err) {
                if (err) reject(err);
                else resolve();
            });
        });
    }
}