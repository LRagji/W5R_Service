let chai = require('chai');
let server = require('../server');
let chaiHttp = require('chai-http');

let should = chai.should();
chai.use(chaiHttp);

describe('API Tests', () => {

    describe('/v1/weather ', () => {
        it('should return 400 when no file is present in the request', (done) => {
          chai.request(server)
              .post('/v1/weather')
              .send()
              .end((err, res) => {
                    res.status.should.be.equal(400);
                done();
              });
        });

        // it('should return 400 when file is not present with correct form name', (done) => {
        //     chai.request(server)
        //         .post('/v1/weather')
        //         .attach("hello","test\\resources\\citynames1.txt","abc.txt")
        //         .end((err, res) => {
        //               res.status.should.be.equal(400);
        //           done();
        //         });
        //   });

        it('should return 202 for when correct file is presented', (done) => {
            chai.request(server)
                .post('/v1/weather')
                .attach("citylist","test\\resources\\citynames1.txt","abc.txt")
                .end((err, res) => {
                      res.status.should.be.equal(202);
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