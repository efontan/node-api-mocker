const Controller = require('../lib/controller');
const SUCCESS_CONFIG = 'spec/test-confs/correct.conf.json';
const FAILING_CONFIG = 'spec/test-confs/failing.conf.json';
const request = require('supertest');

describe("Testing mock server with 0% failing rate", function () {
    var server = undefined;
    beforeAll(function (done) {
        Controller.init(SUCCESS_CONFIG);
        Controller.buildServer((e, s) => { server = s; done() });
    });

    afterAll(function () {
        server.close();
        server = undefined;
    });

    it('server should have started', function () {
        expect(server).not.toBe(undefined);
    });

    it('server should serve the configured content for get requests', function (done) {
        request(server)
            .get('/example/test')
            .set('Accept', 'application/json')
            .expect(200, { success: true, errors: [], message: 'Hello World' }, done);
    });

    it('server should serve the configured content for put requests', function (done) {
        request(server)
            .put('/example/test')
            .set('Accept', 'application/json')
            .expect(201, { success: true, errors: [] }, done);
    });

    it('server should serve the configured content for put requests', function (done) {
        request(server)
            .put('/example/test')
            .set('Accept', 'application/json')
            .expect(201, { success: true, errors: [] }, done);
    });

    it('server should serve the configured content for post requests', function (done) {
        request(server)
            .post('/example/test')
            .set('Accept', 'application/json')
            .expect(200, { success: true, errors: [], message: "Inserted hello world" }, done);
    });

    it('server should serve the configured content for delete requests', function (done) {
        request(server)
            .delete('/example/test')
            .set('Accept', 'application/json')
            .expect(200, { success: true, errors: [] }, done);
    });

});

describe("Testing mock server with 100% failing rate", function () {
    var server = undefined;
    beforeAll(function (done) {
        Controller.init(FAILING_CONFIG);
        Controller.buildServer((e, s) => { server = s; done() });
    });

    afterAll(function () {
        server.close();
        server = undefined;
    });

    it('server should have started', function () {
        expect(server).not.toBe(undefined);
    });

    it('server should serve the configured content for get requests', function (done) {
        request(server)
            .get('/example/test')
            .set('Accept', 'application/json')
            .expect(404, {
                success: false,
                errors: ['com.example.failing'],
                message: 'Failing rate is 100'
            }, done);
    });
});