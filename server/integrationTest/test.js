var assert = require('assert');
var app = require('../server.js');
var chai = require('chai');
var chaihttp = require('chai-http');
var http = require('http');
var except = require('chai').expect;
var should = chai.should();
chai.use(chaihttp);

describe('Server test', function() {
    before(function(){
        console.log("before test");
    });
    after(function() {
        console.log("after test");
    });

    describe('/api-getitem', () => {
        it('it should GET all the products', (done) => {
            chai.request(app)
                .post('/api-getitem')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                 });
        });
    });

    describe('/api-add', () => {
        it('it should ADD a product', (done) => {
            chai.request(app)
                .post('/api-add')
                .type('form')
                .send({'id':1,"name":"text",'price':2})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
})