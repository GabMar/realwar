define(["jquery", "jqueryparse", "underscore", "parse", "handlebars", "leaflet", "text!templates/login.html"],
    function ($, $p, _, Parse, Handlebars, L, template) {
	
	var LoginView = Parse.View.extend({

		events: {
		      "submit form.login-form": "login"
		    },
		
		    
		    initialize: function() {
		        _.bindAll(this, "login");
		        this.render();
		      },
		
		    login: function(e) {
		        var username = this.$("#login-username").val();
		        var password = this.$("#login-password").val();
		        $.parse.login(username, password, function(user) {
	            	 window.localStorage.setItem("local_user_id", user.id);
	            	 Parse.history.navigate('structure', {trigger:true});
	            	
	          })/*
		        Parse.User.logIn(username, password, {
		        	 
		             success: function(user) {
		            	 window.localStorage.setItem("local_user_id", user.id);
		            	 Parse.history.navigate('structure', {trigger:true});
		            	
		          }
		        
		        })*/;
		        
		    return false;   
		},
		
		
		template: Handlebars.compile(template),
		
		render: function (eventName) {
	          this.title = "Login";
	          $(this.el).html(this.template({"title": this.title}));
	          $('body').append($(this.el));
	          this.delegateEvents();
	          return this;
	        }
	});
	
	return LoginView;
});