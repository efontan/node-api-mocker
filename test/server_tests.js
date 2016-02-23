var should = require('should');
var request = require('supertest');
var start = require('../index');

var app = undefined;

describe('Test Server with 0% Failure Configuration: ', function () {
    before(function (done) {
        start('configuration_test/config_success.json', function (err, server) {
            if (err) done(err);
            else {
                app = server;
                done();
            }
        });
    });
    
    after(function (done) {
        if (app != null && app != undefined) app.close();
        app = null;
        done();
    });
    
    it('should simply pass', function () {
        true.should.equal(true);
    });
    
    it('should have an address of :: and be of type IPv6', function () {
        //At least for my local device
        app.address().address.should.equal('::');
        app.address().family.should.equal('IPv6'); 
    });

    it('should start the server at port 3001', function () {
        app.address().port.should.equal(3001);
    });
    
    describe('GET /user/5003/find', function () {
        it('should respond with json', function (done) {
            request(app)
            .get('/user/5003/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                
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
                if (err) done(err);
                
                res.body.success.should.equal(true);
                (typeof res.body.errors).should.equal(typeof ([]));
                res.body.result.should.equal('Hello World');
                done();
            });

        });

    });
    
    describe('GET /user/string/find', function () {
        it('should respond with json', function (done) {
            request(app)
            .get('/user/string/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                
                res.body.should.be.ok();
                done();
            });
        });
        
        it('should return {"success": true,"errors": [ ],"result": "Hello World"}', function (done) {
            request(app)
            .get('/user/string/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                
                res.body.success.should.equal(true);
                (typeof res.body.errors).should.equal(typeof ([]));
                res.body.result.should.equal('Hello World');
                done();
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
                if (err) done(err);
                
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
                if (err) done(err);
                
                res.body.success.should.equal(true);
                (typeof res.body.errors).should.equal(typeof ([]));
                res.body.result.should.equal('Hello World');
                done();
            });

        });

    });
    
    describe('POST /user/string/find', function () {
        it('should respond with JSON', function (done) {
            request(app)
            .post('/user/string/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                
                res.body.should.be.ok();
                done();
            });

        });
        
        it('should return {"success": true,"errors": [ ],"result": "Hello World"}', function (done) {
            
            request(app)
            .post('/user/string/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                
                res.body.success.should.equal(true);
                (typeof res.body.errors).should.equal(typeof ([]));
                res.body.result.should.equal('Hello World');
                done();
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
                if (err) done(err);
                
                res.body.should.not.have.property('success');
                res.body.should.not.have.property('errors');
                res.body.should.not.have.property('result');
                done();
            });
        });
        
    });
    
    describe('PUT /user/string/find', function () {

        it('should just send status 201', function (done) {
            request(app)
            .put('/user/string/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, res) {
                if (err) done(err);
                
                res.body.should.not.have.property('success');
                res.body.should.not.have.property('errors');
                res.body.should.not.have.property('result');
                done();
            });
        });
        
    });
    
    describe('DELETE /user/5003/find', function () {
        
        it('should respond with JSON', function (done) {
            request(app)
            .delete('/user/5003/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                
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
                if (err) done(err);
                
                res.body.success.should.equal(true);
                (typeof res.body.errors).should.equal(typeof ([]));
                res.body.result.should.equal('Hello World');
                done();

            })

        })

    });

    describe('DELETE /user/string/find', function () {
        it('should respond with JSON', function (done) {
            request(app)
            .delete('/user/string/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                
                res.body.should.be.ok();
                done();
            });

        })
        
        it('should return {"success": true,"errors": [ ],"result": "Hello World"}', function (done) {
            request(app)
            .delete('/user/string/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                
                res.body.success.should.equal(true);
                (typeof res.body.errors).should.equal(typeof ([]));
                res.body.result.should.equal('Hello World');
                done();

            })

        })
    });

});


describe('Test Server with 100% Failure Configuration: ', function () {
    before(function (done) {
        start('configuration_test/config_failure.json', function (err, server) {
            if (err) done(err);
            else {
                app = server;
                done();
            }
        });
    });
    
    after(function (done) {
        if (app != null && app != undefined) app.close();
        app = null;
        done();
    });

    it('should simply pass', function () {
        true.should.equal(true);
    });

    it('should have an address of :: and be of type IPv6', function () {
        //At least for my local device
        app.address().address.should.equal('::');
        app.address().family.should.equal('IPv6');
    });
    
    it('should start the server at port 3001', function () {
        app.address().port.should.equal(3001);
    });

    describe('GET /user/5003/find', function () {
        it('should respond with json', function (done) {
            request(app)
            .get('/user/5003/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err, res) {
                if (err) done(err);
                
                res.body.should.be.ok();
                done();
            });
        });
        
        it('should return {"success": false,"errors": ["com.templum.error"],"result": ""}', function (done) {
            request(app)
            .get('/user/5003/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err, res) {
                if (err) done(err);
                
                res.body.success.should.equal(false);
                res.body.errors.length.should.be.exactly(1);
                res.body.errors[0].should.containEql('com.templum.error');
                done();
            });

        });

    });
    
    describe('GET /user/string/find', function () {
        it('should respond with json', function (done) {
            request(app)
            .get('/user/string/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err, res) {
                if (err) done(err);
                
                res.body.should.be.ok();
                done();
            });
        });
        
        it('should return {"success": false,"errors": ["com.templum.error"],"result": ""}', function (done) {
            request(app)
            .get('/user/string/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err, res) {
                if (err) done(err);
                
                res.body.success.should.equal(false);
                res.body.errors.length.should.be.exactly(1);
                res.body.errors[0].should.containEql('com.templum.error');
                done();
            });

        });
    });
    
    describe('POST /user/5003/find', function () {
        
        it('should respond with JSON', function (done) {
            request(app)
            .post('/user/5003/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err, res) {
                if (err) done(err);
                
                res.body.should.be.ok();
                done();
            });

        });
        
        it('should return {"success": false,"errors": ["com.templum.error"],"result": ""}', function (done) {
            
            request(app)
            .post('/user/5003/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err, res) {
                if (err) done(err);
                
                res.body.success.should.equal(false);
                res.body.errors.length.should.be.exactly(1);
                res.body.errors[0].should.containEql('com.templum.error');
                done();
            });

        });

    });
    
    describe('POST /user/string/find', function () {
        it('should respond with JSON', function (done) {
            request(app)
            .post('/user/string/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err, res) {
                if (err) done(err);
                
                res.body.should.be.ok();
                done();
            });

        });
        
        it('should return {"success": false,"errors": ["com.templum.error"],"result": ""}', function (done) {
            
            request(app)
            .post('/user/string/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err, res) {
                if (err) done(err);
                
                res.body.success.should.equal(false);
                res.body.errors.length.should.be.exactly(1);
                res.body.errors[0].should.containEql('com.templum.error');
                done();
            });

        });
    });
    
    describe('PUT /user/5003/find', function () {
        
        it('should just send status 400', function (done) {
            request(app)
            .put('/user/5003/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err, res) {
                if (err) done(err);
                
                res.body.should.not.have.property('success');
                res.body.should.not.have.property('errors');
                res.body.should.not.have.property('result');
                done();
            });
        });
        
    });
    
    describe('PUT /user/string/find', function () {
        
        it('should just send status 400', function (done) {
            request(app)
            .put('/user/string/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err, res) {
                if (err) done(err);
                
                res.body.should.not.have.property('success');
                res.body.should.not.have.property('errors');
                res.body.should.not.have.property('result');
                done();
            });
        });
        
    });
    
    describe('DELETE /user/5003/find', function () {
        
        it('should respond with JSON', function (done) {
            request(app)
            .delete('/user/5003/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err, res) {
                if (err) done(err);
                
                res.body.should.be.ok();
                done();
            });

        })
        
        it('should return {"success": false,"errors": ["com.templum.error"],"result": ""}', function (done) {
            request(app)
            .delete('/user/5003/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err, res) {
                if (err) done(err);
                
                res.body.success.should.equal(false);
                res.body.errors.length.should.be.exactly(1);
                res.body.errors[0].should.containEql('com.templum.error');
                done();

            })

        })

    });
    
    describe('DELETE /user/string/find', function () {
        it('should respond with JSON', function (done) {
            request(app)
            .delete('/user/string/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err, res) {
                if (err) done(err);
                
                res.body.should.be.ok();
                done();
            });

        })
        
        it('should return {"success": false,"errors": ["com.templum.error"],"result": ""}', function (done) {
            request(app)
            .delete('/user/string/find')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err, res) {
                if (err) done(err);
                
                res.body.success.should.equal(false);
                res.body.errors.length.should.be.exactly(1);
                res.body.errors[0].should.containEql('com.templum.error');
                done();

            })

        })
    });


});


