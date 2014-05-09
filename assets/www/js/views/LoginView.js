define(["jquery", "jqueryparse", "underscore", "parse", "handlebars", "leaflet", "text!templates/login.html"],
    function ($, $p, _, Parse, Handlebars, L, template) {
	
	var LoginView = Parse.View.extend({

		events: {
		      "submit form.login-form": "login",
		      "touchend #regButton": "goReg",
		    },
		
		    
		    initialize: function() {
		        _.bindAll(this, "login");
		        this.render();
		      },
		      
	      	goReg: function () {
	          Parse.history.navigate("reg", {trigger: true});
	        },
		
		    login: function(e) {
		    	$("#principal").hide();
		    	$(".ball").show();
		    	$(".ball1").show();
		        var username = this.$("#login-username").val();
		        var password = this.$("#login-password").val();
		        
		        Parse.User.logIn(username, password, {
		        	 
		             success: function(user) {
	            	 	window.localStorage.setItem("local_user_id", user.id);
	            	 	
	            	 	$(".ball").hide();
	    				$(".ball1").hide();
	            	 	Parse.history.navigate("structure", {trigger:true});

		            	
		          },
		          	error: function(user, error) {
    					navigator.notification.alert('bella');
    					//window.localStorage.clear();
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