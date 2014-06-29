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
				 	warrior.signupWarrior(user.id, username, password);
					
				    
				},
				  error: function(user, error) {
				    // Show the error message somewhere and let the user try again.
				    alert("Error: " + error.code + " " + error.message);
				  }
				});
		        
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