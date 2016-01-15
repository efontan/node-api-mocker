var should = require('should')
    , request = require('supertest')
    , start = require('../index')
    , config = require('../fixtures/server_conf')

    , configToString = JSON.stringify(config, null, 4)
    , app = undefined


describe('rest_server_mock tests with configuration: ' + configToString, function () {

    before(function (done) {

        start('fixtures/server_conf.json')
            .then(function (server) {
                app = server
                done()
            })

    })

    it('should simply pass', function () {

        true.should.be.true

    })


    it('should start the server at 0.0.0.0:3001', function () {

        app.address().port.should.equal(3001)

        app.address().address.should.equal('0.0.0.0')

    })

    describe('GET /a', function(){

        it('should respond with json', function(done) {

            request(app)
                .get('/a')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {

                    if (err) return done(err)

                    res.body.should.be.ok

                    done()

                })

        })

        it('should return {field_1: " f1 get a ok", field_2: "f2 get ok"}', function(done) {
            request(app)
                .get('/a')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {

                    if (err) return done(err)

                    res.body.field_1.should.equal('f1 get a ok')

                    res.body.field_2.should.equal('f2 get a ok')

                    done()

                })

        })

    })

    describe('POST /a', function() {

        it('should respond with JSON', function(done) {
            request(app)
                .post('/a')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {

                    if (err) return done(err)

                    res.body.should.be.ok

                    done()

                })

        })

        it('should return {field_1: " f1 post a ok", field_2: "f2 post ok"}', function(done) {

            request(app)
                .post('/a')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {

                    if (err) return done(err)

                    res.body.field_1.should.equal('f1 post a ok')

                    res.body.field_2.should.equal('f2 post a ok')

                    done()

                })

        })

    })

    describe('PUT /a', function(){

        it('should respond with JSON', function(done) {

            request(app)
                .put('/a')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {

                    if (err) return done(err)

                    res.body.should.be.ok

                    done()

                })

        })

        it('should return {field_1: " f1 put a ok", field_2: "f2 put ok"}', function(done) {

            request(app)
                .put('/a')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {

                    if (err) return done(err)

                    res.body.field_1.should.equal('f1 put a ok')

                    res.body.field_2.should.equal('f2 put a ok')

                    done()

                })

        })

    })

    describe('DELETE /a', function() {

        it('should respond with JSON', function(done) {

            request(app)
                .put('/a')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {

                    if (err) return done(err)

                    res.body.should.be.ok

                    done()
                })

        })

        it('should return {field_1: " f1 delete a ok", field_2: "f2 delete ok"}', function(done) {

            request(app)
                .delete('/a')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {

                    if (err) return done(err)

                    res.body.field_1.should.equal('f1 delete a ok')

                    res.body.field_2.should.equal('f2 delete a ok')

                    done()

                })

        })

    })

})
