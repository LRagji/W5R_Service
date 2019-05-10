let chai = require('chai');
let utils = require('../src/utilities');

let should = chai.should();

describe('Unit Tests', () => {

    describe('CityParser ', () => {
        it('should parse input file and return list of matching cities', (done) => {
            const outputArray = utils.CityParser("test\\resources\\citynames1.txt");
        });


    });


});