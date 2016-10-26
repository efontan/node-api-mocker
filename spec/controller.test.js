const Controller = require('../lib/controller');
const PATH = 'spec/test-confs/correct.conf.json';
const request = require('supertest');

describe("Testing mock server with zero failing rate", function () {
    var server = undefined;
    beforeAll(function (done) {
        Controller.init(PATH);
        Controller.buildServer((e, s) => { server = s; done() });
    });

    afterAll(function () {
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