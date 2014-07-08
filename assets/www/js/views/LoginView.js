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
	        	var fbLoginSuccess = function (userData) {

	        		
					

	        		facebookConnectPlugin.api("me?fields=id,email", ["user_birthday"],
		        		    function (result) {

		        		    	var password = result.id;
		        		    	var email = result.email;
		        		    	var temp = email.split("@");
		        		    	var username = temp[0];
	        					facebookConnectPlugin.api("me/picture?fields=url&redirect=false", ["user_birthday"],
	        		        		    function (result) {
	        		        		        var image = result['data'].url;
	        		        		        var user = new Parse.User();
	        		    					user.set("username", username);
	        		    					user.set("password", password);
	        		    					user.set("email", email);
	        		    					user.signUp(null, {
	        		    					  success: function(user) {
	        		    					  	var id= user.id;
	        		    					    var Warrior = Parse.Object.extend("Warrior");
	        		    						var warrior= new Warrior();
	        		    					 	warrior.signupWarrior(user.id, username, password, image);
	        		    					 	setTimeout(function(){Parse.history.navigate("structure", {trigger:true});}, 7000);
	        		    						
	        		    					    
	        		    					},
	        		    					  error: function(user, error) {
	        		    					    // Show the error message somewhere and let the user try again.
	        		    					    var messaggio = "username "+username+" already taken";
	        		    					    if(error.message == messaggio){
	        		    					    	Parse.User.logIn(username, password, {
		        	 
											             success: function(user) {
										            	 	window.localStorage.setItem("local_user_id", user.id);
										            	 	var Warrior = Parse.Object.extend("Warrior");
										            	 	var warrior = new Warrior();
															warrior.setLocalWarrior(user.id);
															setTimeout(function(){Parse.history.navigate("structure", {trigger:true});}, 7000);
										            	 	


											            	
											          },
											          	error: function(user, error) {
													}
											        
											        });
	        		    					    }else{
	        		    					    alert("Error: " + error.code + " " + error.message);
	        		    					    window.localStorage.clear();}
	        		    					    $('#signinMain').show();
	        		    		    			$('#spinner_reg').hide();
	        		    					  }
	        		    					});
	        		        		    },
	        		        		    function (error) {
	        		        		        alert("Failed: " + error);
	        		        		    });
		        		        
		        		    },
		        		    function (error) {
		        		        alert("Failed: " + error);
		        		    });
	        	}

	        	facebookConnectPlugin.login(["basic_info"],
	        	    fbLoginSuccess,
	        	    function (error) { alert("" + error) }
	        	);

	        	

	        },
	        
		    login: function(e) {
		    	$("#principal").hide();
		    	$("#spinner").show();
		    	
		        var username = this.$("#login-username").val();
		        var password = this.$("#login-password").val();
		        
		        Parse.User.logIn(username, password, {
		        	 
		             success: function(user) {
	            	 	window.localStorage.setItem("local_user_id", user.id);
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