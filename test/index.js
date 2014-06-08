var http = require('http');
var express = require('express');
var connect = require('connect');
var request = require('request');
var should = require('should');
var _ = require('underscore');
var connectSetTimeout = require('../index');
var server;
var slowFlag;
var port = 1337;
var baseUrl = "http://localhost:1337";

describe("the middleware", function(){
  describe("with node's HttpServer", function(){
    afterEach(function(done){
      server.close(function(){
        done();
      });
    });
    beforeEach(function(done){
      slowFlag = false;
      server = http.createServer(function (req, res) {
        var middleware = connectSetTimeout(function(req, res){
          slowFlag = true;
        }, 2000);
        middleware(req, res, function(){
          if (/slow/.test(req.url)){
            return setTimeout(function(){
              res.end("slow");
            }, 5000);
          }
          if (/fast/.test(req.url)){
            return res.end("fast");
          }
        });
      }).listen(port, done);
    });
    it("does nothing when requests are fast", function(done){
      request(baseUrl + '/fast', function(err, res, body){
        slowFlag.should.equal(false);
        done(err);
      });
    });
    it("sets the slowFlag when requests are slow", function(done){
      this.timeout(10000);
      request(baseUrl + '/slow', function(err, res, body){
        slowFlag.should.equal(true);
        done(err);
      });
    });
  });
  describe("with a different timeout name", function(){
    afterEach(function(done){
      server.close(function(){
        done();
      });
    });
    it("uses that timeout name", function(done){
      this.timeout(10000);
      server = http.createServer(function (req, res) {
        var middleware = connectSetTimeout(function(req, res){
          slowFlag = true;
        }, 2000, {timeoutName : 'blah'});
        middleware(req, res, function(){
          if (/slow/.test(req.url)){
            return setTimeout(function(){
              _.keys(res.connectSetTimeouts).should.eql(['blah']);
              res.end("slow");
            }, 5000);
          }
        });
      }).listen(port, function(err){
        if (err) throw err;
        request(baseUrl + '/slow', function(err, res, body){
          slowFlag.should.equal(true);
          done(err);
        });
      
      });
    
    });
  });
});
