define(["jquery", "jqueryparse", "underscore", "parse", "handlebars", "leaflet", "text!templates/settings.html"],
    function ($, $p, _, Parse, Handlebars, L, template) {
	
	var SettingsView = Parse.View.extend({

		events: {
		    },
		
		    
		    initialize: function() {
		      },
		


		
		template: Handlebars.compile(template),
		
		render: function (eventName) {
	          $(this.el).empty();
	          $(this.el).html(this.template);
	          $("#spinner").hide();
	          return this;
	        }
	});
	
	return SettingsView;
});