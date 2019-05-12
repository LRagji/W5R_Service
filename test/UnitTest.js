let chai = require('chai');
let parserType = require('../src/inputFileparser');
let parser= new parserType();

let should = chai.should();

describe('Unit Tests', () => {

    describe('Input Fileparser', () => {
        it('should return correct city ids', async () => {
            let compareArr = new Map([["A", 1], ["B", 2], ["C", 3], ["D", 4]]);
            let cityIds = await parser.mapCitiesToIds(process.cwd() + '\\test\\resources\\A.txt', compareArr);
            cityIds.length.should.be.equal(compareArr.size);
            cityIds.indexOf(compareArr.get("A")).should.not.be.equal(-1);
            cityIds.indexOf(compareArr.get("B")).should.not.be.equal(-1);
            cityIds.indexOf(compareArr.get("C")).should.not.be.equal(-1);
            cityIds.indexOf(compareArr.get("D")).should.not.be.equal(-1);
        });

        it('should return correct city ids even when file contains duplicate', async () => {
            let compareArr = new Map([["A", 1], ["B", 2], ["C", 3], ["D", 4]]);
            let cityIds = await parser.mapCitiesToIds(process.cwd() + '\\test\\resources\\B.txt', compareArr);
            cityIds.length.should.be.equal(compareArr.size);
            cityIds.indexOf(compareArr.get("A")).should.not.be.equal(-1);
            cityIds.indexOf(compareArr.get("B")).should.not.be.equal(-1);
            cityIds.indexOf(compareArr.get("C")).should.not.be.equal(-1);
            cityIds.indexOf(compareArr.get("D")).should.not.be.equal(-1);
        });

        // it('should return empty array when blank file', async () => {
        //     let compareArr = new Map([["A", 1], ["B", 2], ["C", 3], ["D", 4]]);
        //     let cityIds = await parser.mapCitiesToIds(process.cwd() + '\\test\\resources\\C.txt', compareArr);
        //     cityIds.length.should.be.equal(0);
        // });
    });

});