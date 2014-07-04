define([],
function() {
	var app = {}, Layout = {}, JST = window.JST = window.JST || {};

	app = new Backbone.Marionette.Application();
	
	Backbone.Marionette.Renderer.render = function(template, data){
		if (!JST[template]) throw "Template '" + template + "' not found!";<% if (templateFramework === 'mustache') { %>
		return JST[template];<% } else { %>
		return JST[template](data);<% } %>
	};
	
	Layout = Backbone.Marionette.LayoutView.extend({
				el : '#main',<% if (templateFramework === 'mustache') { %>
				template: "main-layout",<% } else if (templateFramework === 'handlebars') { %>
				template: "app/templates/main-layout.hbs",<% } else { %>
				template: "app/templates/main-layout.ejs",<% } %>						
			});

	layout = new Layout();
	
	layout.render();
	
	return app;
});
