define(["jquery", "jqueryparse", "underscore", "parse", "handlebars", "leaflet", "text!templates/registrati.html"],
    function ($, $p, _, Parse, Handlebars, L, template) {
	
	var RegView = Parse.View.extend({

		events: {
		      "touchend #registra": "reg",
		      "touchend .load_avatar_untouched": "load_avatar_untouched",
		      "touchend .load_avatar_touched": "load_avatar_touched"
		    },
		
		    
		    initialize: function() {
		        _.bindAll(this, "reg");
		        this.render();
		      },
		
		    reg: function(e) {
		        var username = this.$("#reg-username").val();
		        var email = this.$("#reg-email").val();
		        var password = this.$("#reg-password").val();
		        var image = $('.avatar_img_sel').attr('src');
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
				    alert("Error: " + error.code + " " + error.message);
				  }
				});
		        
		    return false;   
			},

			load_avatar_untouched: function() {
				$('.load_avatar_untouched').hide();
				$('.load_avatar_touched').show();
				$('#avatar_scelta').show();
				$(".avatar_img_s").on('click', function(){
		        $('.avatar_img_s').removeClass("avatar_img_sel");
		        $(this).addClass("avatar_img_sel");
		    	});
			},

			load_avatar_touched: function() {
				$('.load_avatar_touched').hide();
				$('.load_avatar_untouched').show();
				$('.avatar_img_s').removeClass("avatar_img_sel");
				$('#avatar_scelta').hide();
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