var should = require('should')
var request = require('supertest')
var start = require('../index')

var app = undefined


describe('Test Server with 0% Failure Configuration', function () {
    before(function (done) {
        start('configuration_test/config.json', function (err, server) {
            if (err) throw err;
            else {
                app = server;
                done();
            }
        });
    });
    
    it('should simply pass', function () {
        true.should.equal(true);
    });
    
    it('should start the server at 0.0.0.0:3001', function () {
        app.address().port.should.equal(3001);
        app.address().address.should.equal('0.0.0.0');
    });
    
    describe('GET /user/5003/find', function () {
        
        it('should respond with json', function (done) {
            request(app)
            .get('/user/5003/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                
                res.body.should.be.ok();
                done();
            });
        });
        
        it('should return {"success": true,"errors": [ ],"result": "Hello World"}', function (done) {
            request(app)
            .get('/user/5003/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                
                res.body.success.should.equal(true);
                (typeof res.body.errors).should.equal(typeof ([]));
                res.body.result.should.equal('Hello World');
                done()
            });

        });

    });
    
    describe('POST /user/5003/find', function () {
        
        it('should respond with JSON', function (done) {
            request(app)
            .post('/user/5003/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                
                res.body.should.be.ok();
                done();
            });

        });
        
        it('should return {"success": true,"errors": [ ],"result": "Hello World"}', function (done) {
            
            request(app)
            .post('/user/5003/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                
                res.body.success.should.equal(true);
                (typeof res.body.errors).should.equal(typeof ([]));
                res.body.result.should.equal('Hello World');
                done()
            });

        });

    });
    
    describe('PUT /user/5003/find', function () {
        
        it('should just send status 201', function (done) {
            request(app)
            .put('/user/5003/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, res) {
                if (err) throw err;
                else done();
            });
        });
        
    });
    
    describe('DELETE /user/5003/find', function () {
        
        it('should respond with JSON', function (done) {
            request(app)
            .put('/user/5003/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                
                res.body.should.be.ok();
                done();
            });

        })
        
        it('should return {"success": true,"errors": [ ],"result": "Hello World"}', function (done) {
            request(app)
            .delete('/user/5003/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                
                res.body.success.should.equal(true);
                (typeof res.body.errors).should.equal(typeof ([]));
                res.body.result.should.equal('Hello World');
                done()

            })

        })

    });

});


