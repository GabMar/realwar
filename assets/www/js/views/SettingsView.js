define(["jquery", "jqueryparse", "underscore", "parse", "handlebars", "leaflet", "text!templates/settings.html"],
    function ($, $p, _, Parse, Handlebars, L, template) {
	
	var SettingsView = Parse.View.extend({

		events: {
			"touchend #logout": "logout",
			"touchend .change_avatar_untouched": "change_avatar_enable",
			"touchend .change_avatar_touched": "change_avatar_disable",
			"touchend .change_avatar": "change_avatar"
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
	  		$('#change_avatar').show();
	  		$('.change_avatar').show();
	  		$(".avatar_img_s").on('click', function(){
	        	$('.avatar_img_s').removeClass("avatar_img_sel");
	        	$(this).addClass("avatar_img_sel");
    		});
    		
	  	},

	  	change_avatar_disable: function() {
	  		$(".change_avatar_touched").hide('fast');
        	$(".change_avatar_untouched").show('fast');
  			$('#change_avatar').hide();
  			$('.change_avatar').hide();
	  	},

	  	change_avatar: function() {
	  		var Warrior = Parse.Object.extend("Warrior");
    		var warrior = new Warrior();
    		var id = window.localStorage.getItem('local_user_id');
    		var image = $('.avatar_img_sel').attr('src');
    		warrior.changeAvatarWarrior(id, image);
    		alert("avatar cambiato");
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