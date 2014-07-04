define(["jquery", "jqueryparse", "underscore", "parse", "handlebars", "leaflet", "text!templates/headquarter.html", "models/Warrior", "models/Weapon", "models/Head", "models/Armor", "views/HeadQuarterStatsView", "views/HeadQuarterScoreView", "views/HeadQuarterEquipView",],
    function ($, $p,  _, Parse, Handlebars, L, template, Warrior, Weapon, Head, Armor, HeadQuarterStatsView, HeadQuarterScoreView, HeadQuarterEquipView) {

var HeadQuarterView = Parse.View.extend({
       //className: "page",
	   tagName: "div",
	   id: "headQuarter",
	   //el: 'div',
	   self:undefined,
	   template: Handlebars.compile(template),

	    events: {
	    	"touchend #Stats": "showStats",
          	"touchend #Equip": "showEquip",
          	"touchend #Score": "showScore"
        },
	   
	   initialize: function () {
		self=this;
		self.model = new Warrior();
		var id = window.localStorage.getItem('local_user_id');
		var Warrior_life = Parse.Object.extend("Warrior");
		var warrior = new Warrior_life();
		setInterval(function(){warrior.updateLife(id);}, 300000);
		setTimeout(function(){$('.progress').attr('value', JSON.parse(window.localStorage.getItem("warrior")).life);}, 4000);
	   },



	   showStats: function() {
		$('#Stats').css("background-color", "#20A715");
		$('#Stats').css("color","#051E07");
		$('#Score').css("background-color", "rgb(5, 31, 7)");
		$('#Score').css("color","white");
		$('#Equip').css("background-color", "rgb(5, 31, 7)");
		$('#Equip').css("color","white");
		var page = new HeadQuarterStatsView();
		this.contents = $("#hqContent");
		this.contents.empty();
		this.contents.append($(page.el));

	   },

	   showEquip: function () {
		$('#Equip').css("background-color", "#20A715");
		$('#Equip').css("color","#051E07");
		$('#Stats').css("background-color", "rgb(5, 31, 7)");
		$('#Stats').css("color","white");
		$('#Score').css("background-color", "rgb(5, 31, 7)");
		$('#Score').css("color","white");
		var page = new HeadQuarterEquipView();
		this.contents = $("#hqContent");
		this.contents.empty();
		this.contents.append($(page.el));
        },

        showScore: function() {
    	$('#spinner_equip').show();
		$('#Score').css("background-color", "#20A715");
		$('#Score').css("color","#051E07");
		$('#Stats').css("background-color", "rgb(5, 31, 7)");
		$('#Stats').css("color","white");
		$('#Equip').css("background-color", "rgb(5, 31, 7)");
		$('#Equip').css("color","white");
		var page = new HeadQuarterScoreView();
		this.contents = $("#hqContent");
		this.contents.empty();
		this.contents.append($(page.el));

        },

	   render: function(eventName) {
				$(self.el).empty();
				var context={
					localWarrior:JSON.parse(window.localStorage.getItem("warrior")),
					localWeapon:JSON.parse(window.localStorage.getItem("weapon")),
					localHead:JSON.parse(window.localStorage.getItem("head")),
					localArmor:JSON.parse(window.localStorage.getItem("armor")),
					toXP: JSON.parse(window.localStorage.getItem("warrior")).level * 150,
					attack: JSON.parse(window.localStorage.getItem("weapon")).attack,
					range: JSON.parse(window.localStorage.getItem("weapon")).range+JSON.parse(window.localStorage.getItem("head")).range,
					armor: JSON.parse(window.localStorage.getItem("head")).defense+JSON.parse(window.localStorage.getItem("armor")).defense
				}
				$(self.el).html(self.template(context));
				$("#spinner").hide();
            return self;
        
		   
        }
	
	});

 return HeadQuarterView;
       
});