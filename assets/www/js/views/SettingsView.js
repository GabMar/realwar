define(["jquery", "jqueryparse", "underscore", "parse", "handlebars", "leaflet", "text!templates/settings.html"],
    function ($, $p, _, Parse, Handlebars, L, template) {
	
	var SettingsView = Parse.View.extend({

		events: {
			"touchend #logout": "logout"
		    },
		
		    
		initialize: function() {
		  },

	  	logout: function() {
	  		Parse.User.logOut();
	  		window.localStorage.clear();
	  		location.replace("index.html");
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