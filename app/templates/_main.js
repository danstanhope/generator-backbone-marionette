require.config({ 
	baseUrl: "app",
    paths: {
		'router'				: 'router',
		'app'					: 'app',
		'templates'				: '../build/templates',
		'jquery'				: '../bower_components/jquery/dist/jquery',
		'backbone'				: '../bower_components/backbone/backbone',
		'underscore'			: '../bower_components/lodash/dist/lodash',
		'marionette'			: '../bower_components/marionette/lib/core/backbone.marionette',
		'backbone.babysitter'	: '../bower_components/backbone.babysitter/lib/backbone.babysitter',
		'backbone.wreqr'		: '../bower_components/backbone.wreqr/lib/backbone.wreqr',<% if(bootstrapFormat === 'sass'){ %>
		'bootstrap'				: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap',<% }else if(bootstrapFormat === 'less'){ %>
		'bootstrap'				: '../bower_components/components-bootstrap/js/bootstrap',<% } else { %>
		'bootstrap'				: '../bower_components/bootstrap/dist/js/bootstrap',<% } %><% if (templateFramework === 'mustache') { %>
		'mustache'				: '../bower_components/mustache/mustache',<% } else if (templateFramework === 'handlebars') { %>
		'handlebars'			: '../bower_components/handlebars/handlebars',<% } %>
	},
	shim : {
		jquery : {
			exports : 'jQuery'
		},
		underscore : {
			exports : '_'
		},
		backbone : {
			deps : ['jquery', 'underscore'],
			exports : 'Backbone'
		},
		marionette : {
			deps : ['jquery', 'underscore', 'backbone'],
			exports : 'Marionette'
		},
		bootstrap : {
			deps : ['jquery'],
		},
		app : {
			deps : ['jquery', 'underscore', 'backbone', 'marionette'],
		},
		router : {
			deps : ['app'],
		},
		templates : {<% if (templateFramework === 'mustache') { %>
			deps : ['mustache']<% } else if (templateFramework === 'handlebars') { %>
			deps : ['handlebars']<% }else{ %>
			deps : ['underscore']<% } %>}
		},    
});

require([
	"jquery",
	"backbone",
	"underscore",
	"marionette",
	"app",
	"router",
	"templates",<% if (templateFramework === 'mustache') { %>
	"mustache",<% } else if (templateFramework === 'handlebars') { %>
	"handlebars",<% } %>
	"bootstrap",
],
function(jquery, backbone, underscore, marionette, app, router) {
	app.router = new router();

    Backbone.history.start({ pushState: true });
});
