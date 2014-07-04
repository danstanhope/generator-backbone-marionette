'use strict';


describe('creates collection', function () { 
  it('without failure', function (done) {
    var collection = new Backbone.Collection();

    expect(typeof collection).toMatch('object');
  });
});

describe('creates model', function () { 
  it('without failure', function (done) {
    var model = new Backbone.Model();

    expect(typeof model).toMatch('object');
  });
});

describe('creates view', function () { 
  it('without failure', function (done) {
    var model = new Backbone.View();

    expect(typeof model).toMatch('object');
  });
});

describe('creates router', function () { 
  it('without failure', function (done) {
    var model = new Backbone.Router();

    expect(typeof model).toMatch('object');
  });
});

describe('creates marionette application', function () { 
  it('without failure', function (done) {
    var app = new Backbone.Marionette.Application();

    expect(typeof app).toMatch('object');
  });
});

describe('creates model set/get attribute', function () { 
  it('without failure', function (done) {
    var model = new Backbone.Model();

    model.set({ 'title' : 'developer' });

    expect(model.get('title')).toEqual('developer');
  });
});
