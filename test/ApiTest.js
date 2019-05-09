let chai = require('chai');
let server = require('../server');
let chaiHttp = require('chai-http');

let should = chai.should();
chai.use(chaiHttp);

describe('API Tests', () => {

    describe('/v1/weather ', () => {
        it('should return a response', (done) => {
          chai.request(server)
              .post('/v1/weather')
              .send()
              .end((err, res) => {
                    res.status.should.not.be.equal(0);
                done();
              });
        });
    });

    describe('/v1/results ', () => {
        it('should return a response', (done) => {
          chai.request(server)
              .post('/v1/results')
              .send()
              .end((err, res) => {
                    res.status.should.not.be.equal(0);
                done();
              });
        });
    });
});