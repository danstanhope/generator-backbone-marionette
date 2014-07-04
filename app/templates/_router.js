define([
	'app'
],
function(app) {

  var Router = Backbone.Marionette.AppRouter.extend({
    routes: {
      "*actions"                      : "index",
    },
    index : function(){}
  });
  
  return Router;
});