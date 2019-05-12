const lineReader = require('line-reader');

module.exports = class InputFileparser {
    constructor() {
        this.mapCitiesToIds = this.mapCitiesToIds.bind(this);
        this._cloneLowercase = this._cloneLowercase.bind(this);
        this._processCity = this._processCity.bind(this);
        this._mapAndReduceCities = this._mapAndReduceCities.bind(this);
        this._isUnProcessedCity = this._isUnProcessedCity.bind(this);
    }
    mapCitiesToIds(filePath, translationTable) {
        let translationClone = this._cloneLowercase(translationTable);

        return new Promise((accept, reject) => {
            let knownCityIds = [];
            let unknownCities = [];
            let processedCities = [];

            lineReader.eachLine(filePath, (line, last) => {
                let city = line.trim();

                this._processCity(city, knownCityIds, unknownCities, processedCities, translationClone);

                if (last) {
                    unknownCities.length > 0 ? reject(unknownCities) : accept(knownCityIds);
                }
                return true;
            });
        });
    }

    _cloneLowercase(translationTable) {
        let returnMap = new Map();
        for (const entry of translationTable) {
            returnMap.set(entry[0].toLowerCase(), entry[1]);
        }
        return returnMap;
    }

    _processCity(city, knownCityIds, unknownCities, processedCities, translationClone) {

        if (this._isUnProcessedCity(city, processedCities)) {

            let cityId = this._mapAndReduceCities(city, translationClone);

            cityId !== undefined ? knownCityIds.push(cityId) : unknownCities.push(city);

            processedCities.push(city.toLowerCase());
        }
    }

    _mapAndReduceCities(city, translationClone) {
        city = city.toLowerCase();
        let cityId = translationClone.get(city);
        translationClone.delete(city);
        return cityId;
    }

    _isUnProcessedCity(cityToValidate, processedCities) {
        return processedCities.indexOf(cityToValidate.toLowerCase()) === -1;
    }

}