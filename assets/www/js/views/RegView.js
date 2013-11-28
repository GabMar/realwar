define(["jquery", "jqueryparse", "underscore", "parse", "handlebars", "leaflet", "text!templates/registrati.html"],
    function ($, $p, _, Parse, Handlebars, L, template) {
	
	var RegView = Parse.View.extend({

		events: {
		      "touchend #registra": "reg"
		    },
		
		    
		    initialize: function() {
		        _.bindAll(this, "reg");
		        this.render();
		      },
		
		    reg: function(e) {
		        var username = this.$("#reg-username").val();
		        var email = this.$("#reg-email").val();
		        var password = this.$("#reg-password").val();
		        var user = new Parse.User();
				user.set("username", username);
				user.set("password", password);
				user.set("email", email);
				user.signUp(null, {
				  success: function(user) {
				  	var id= user.id;
				    var Warrior = Parse.Object.extend("Warrior");
					var warrior= new Warrior();
					 
					warrior.set("nick", username);
					warrior.set("coins", 0);
					warrior.set("userId", {__type: "Pointer", className: "_User",objectId: id});
					var point = new Parse.GeoPoint({latitude: 40.0, longitude: -30.0});
					warrior.set("position", point);
					var id_wep = "weWdWg9jeU";
					warrior.set("weapon", {__type: "Pointer", className: "Weapon",objectId: id_wep});
					 
					warrior.save(null, {
					  success: function(warrior) {
					    // Execute any logic that should take place after the object is saved.
					    alert('New object created with objectId: ' + warrior.id);
					    Parse.User.logIn(username, password, {
		        	 
		             		success: function(user) {
		            	 	window.localStorage.setItem("local_user_id", user.id);
		            	 	Parse.history.navigate('structure', {trigger:true});
		            	
		          			}
		        
		        });
					  },
					  error: function(warrior, error) {
					    // Execute any logic that should take place if the save fails.
					    // error is a Parse.Error with an error code and description.
					    alert('Failed to create new object, with error code: ' + warrior.description);
					  }
					});
				    
				},
				  error: function(user, error) {
				    // Show the error message somewhere and let the user try again.
				    alert("Error: " + error.code + " " + error.message);
				  }
				});
		        /*$.parse.signup({ 
					username : username, 
					password : password, 
					email : email 
				}, function(){alert("Successo");}, function(){alert("Cazzo!!!");});*/
		        
		    return false;   
		},
		
		
		template: Handlebars.compile(template),
		
		render: function (eventName) {
	          this.title = "Registrazione";
	          $(this.el).html(this.template({"title": this.title}));
	          $('body').append($(this.el));
	          this.delegateEvents();
	          return this;
	        }
	});
	
	return RegView;
});