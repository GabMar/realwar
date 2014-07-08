define(["jquery", "jqueryparse", "underscore", "parse", "handlebars", "leaflet", "text!templates/login.html"],
    function ($, $p, _, Parse, Handlebars, L, template) {
	
	var LoginView = Parse.View.extend({

		events: {
		      "touchend #login_input": "login",
		      "touchend #regButton": "goReg",
		      "touchend #fbButton": "fbLog"
		    },
		
		    
		    initialize: function() {
		        _.bindAll(this, "login");
		        this.render();
		      },
		      
	      	goReg: function () {
	          Parse.history.navigate("reg", {trigger: true});
	        },
	        
	        fbLog: function () {
	        	$("#principal").hide();
		    	$("#spinner").show();
	        	var User = Parse.Object.extend("User");
    			var user = new User();
    			user.loginFacebook();
	        },
	        
		    login: function(e) {
		    	$("#principal").hide();
		    	$("#spinner").show();
		    	
		        var username = this.$("#login-username").val();
		        var password = this.$("#login-password").val();
		        
		        Parse.User.logIn(username, password, {
		        	 
		             success: function(user) {
	            	 	window.localStorage.setItem("local_user_id", user.id);
	            	 	window.localStorage.setItem("loggedWithFacebook", false);
	            	 	var Warrior = Parse.Object.extend("Warrior");
	            	 	var warrior = new Warrior();
						warrior.setLocalWarrior(user.id);
						setTimeout(function(){Parse.history.navigate("structure", {trigger:true});}, 7000);
	            	 	


		            	
		          },
		          	error: function(user, error) {
				}
		        
		        });
		        
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