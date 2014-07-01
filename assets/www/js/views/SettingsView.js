define(["jquery", "jqueryparse", "underscore", "parse", "handlebars", "leaflet", "text!templates/settings.html"],
    function ($, $p, _, Parse, Handlebars, L, template) {
	
	var SettingsView = Parse.View.extend({

		events: {
			"touchend #logout": "logout",
			"touchend .change_avatar_untouched": "change_avatar_enable",
			"touchend .change_avatar_touched": "change_avatar_disable",
			"touchend #change_avatar": "change_avatar",
			"touchend .change_username_untouched": "change_username_enable",
			"touchend .change_username_touched": "change_username_disable",
			"touchend #change_username": "change_username",
			"touchend .change_password_untouched": "change_password_enable",
			"touchend .change_password_touched": "change_password_disable",
			"touchend #change_password": "change_password",
			"touchend .change_email_untouched": "change_email_enable",
			"touchend .change_email_touched": "change_email_disable",
			"touchend #change_email": "change_email"
		    },
		
		    
		initialize: function() {
		  },

	  	logout: function() {
	  		Parse.User.logOut();
	  		window.localStorage.clear();
	  		Parse.history.stop();
	  		location.replace("index.html");
	  	},

	  	change_avatar_enable: function() {
	  		$(".change_avatar_untouched").hide('fast');
	        $(".change_avatar_touched").show('fast');
	  		$('#change_avatar_div').show();
	  		$('#change_avatar').show();
	  		$(".avatar_img_s").on('click', function(){
	        	$('.avatar_img_s').removeClass("avatar_img_sel");
	        	$(this).addClass("avatar_img_sel");
    		});
    		
	  	},

	  	change_avatar_disable: function() {
	  		$(".change_avatar_touched").hide('fast');
        	$(".change_avatar_untouched").show('fast');
        	$('.avatar_img_s').removeClass("avatar_img_sel");
  			$('#change_avatar_div').hide();
  			$('#change_avatar').hide();
	  	},

	  	change_avatar: function() {
	  		var Warrior = Parse.Object.extend("Warrior");
    		var warrior = new Warrior();
    		var id = window.localStorage.getItem('local_user_id');
    		var image = $('.avatar_img_sel').attr('src');
    		warrior.changeAvatarWarrior(id, image);
    		alert("avatar cambiato");
    		$(".change_avatar_touched").hide('fast');
        	$(".change_avatar_untouched").show('fast');
        	$('.avatar_img_s').removeClass("avatar_img_sel");
  			$('#change_avatar_div').hide();
  			$('#change_avatar').hide();
	  	},

	  	change_username_enable: function() {
	  		$(".change_username_untouched").hide('fast');
	        $(".change_username_touched").show('fast');
	  		$('#change_username_div').show();
	  		$('#change_username').show();
    		
	  	},

	  	change_username_disable: function() {
	  		$(".change_username_touched").hide('fast');
        	$(".change_username_untouched").show('fast');
  			$('#change_username_div').hide();
  			$('#change_username').hide();
	  	},

	  	change_username: function() {
	  		var Warrior = Parse.Object.extend("Warrior");
    		var warrior = new Warrior();
    		var id = window.localStorage.getItem('local_user_id');
    		var username = $('#change_username_input').val();
    		warrior.changeUsernameWarrior(id, username);
    		alert("username cambiato");
    		$(".change_username_touched").hide('fast');
        	$(".change_username_untouched").show('fast');
  			$('#change_username_div').hide();
  			$('#change_username').hide();
	  	},

	  	change_password_enable: function() {
	  		$(".change_password_untouched").hide('fast');
	        $(".change_password_touched").show('fast');
	  		$('#change_password_div').show();
	  		$('#change_password').show();
    		
	  	},

	  	change_password_disable: function() {
	  		$(".change_password_touched").hide('fast');
        	$(".change_password_untouched").show('fast');
  			$('#change_password_div').hide();
  			$('#change_password').hide();
	  	},

	  	change_password: function() {
	  		var User = Parse.Object.extend("User");
    		var user = new User();
    		var password = $('#change_password_input').val();
    		user.changePasswordWarrior(password);
    		alert("password cambiata");
    		$(".change_password_touched").hide('fast');
        	$(".change_password_untouched").show('fast');
  			$('#change_password_div').hide();
  			$('#change_password').hide();
	  	},

	  	change_email_enable: function() {
	  		$(".change_email_untouched").hide('fast');
	        $(".change_email_touched").show('fast');
	  		$('#change_email_div').show();
	  		$('#change_email').show();
    		
	  	},

	  	change_email_disable: function() {
	  		$(".change_email_touched").hide('fast');
        	$(".change_email_untouched").show('fast');
  			$('#change_email_div').hide();
  			$('#change_email').hide();
	  	},

	  	change_email: function() {
	  		var User = Parse.Object.extend("User");
    		var user = new User();
    		var email = $('#change_email_input').val();
    		user.changeEmailWarrior(email);
    		alert("email cambiata");
    		$(".change_email_touched").hide('fast');
        	$(".change_email_untouched").show('fast');
  			$('#change_email_div').hide();
  			$('#change_email').hide();
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