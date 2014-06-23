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
	    	"touchend #showStats": "showStats",
          	"touchend #showEquip": "showEquip",
          	"touchend #showScore": "showScore"
        },
	   
	   initialize: function ( ) {	
		   self=this;
		   self.model = new Warrior();
		   //self.model.bind("change", self.render, self); apparentemente non fa niente
		   
		   var id = window.localStorage.getItem('local_user_id');
		   var warrior = Parse.Object.extend("Warrior");
		   var weaponClass = Parse.Object.extend("Weapon");
		   var headClass = Parse.Object.extend("Head");
		   var armorClass = Parse.Object.extend("Armor");
		   
	       var query = new Parse.Query(warrior);
	       var queryWeapon = new Parse.Query(weaponClass);
	       var queryHead = new Parse.Query(headClass);
	       var queryArmor = new Parse.Query(armorClass);
	       
	       query.equalTo("objectId", window.localStorage.getItem("local_warrior_id"));
	       
	       query.find({
	    	   success: function  (results) {
	   			   var warrior = results[0];
	   			   queryWeapon.get(self.model.id, {
	   					success: function(weapon) {
	   							warrior.set("weapon",weapon);
	   							warrior.save();
	   					},
	   					error:function(object,error){
	   						alert("Errore1: "+error);
	   					}
	   				});
	   			},
	   		
	   			error:function(object,error){
					alert(error);
	   			}
	   		
	       });
	   },


	   showStats: function() {
	   	 $('#Equip').removeClass("active");
         $('#Score').removeClass("active");
         $('#Stats').addClass("active");
         var page = new HeadQuarterStatsView();
         //this.structureView = new StructureView();
         this.contents = $("#hqContent");
         this.contents.empty();
         this.contents.append($(page.el));

	   },

	   showEquip: function () {
         $('#Stats').removeClass("active");
         $('#Score').removeClass("active");
         $('#Equip').addClass("active");
         var page = new HeadQuarterEquipView();
         //this.structureView = new StructureView();
         this.contents = $("#hqContent");
         this.contents.empty();
         this.contents.append($(page.el));
        },

        showScore: function() {
         $('#Equip').removeClass("active");
         $('#Stats').removeClass("active");
         $('#Score').addClass("active");
         var page = new HeadQuarterScoreView();
         //this.structureView = new StructureView();
         this.contents = $("#hqContent");
         this.contents.empty();
         this.contents.append($(page.el));

        },

	   render: function(eventName) {
	//	if (self.model != undefined)
			{	 
				
				//var warrior = self.model.toJSON();
				var warrior= JSON.parse(JSON.stringify(self.model));
				warrior.cid = self.model.cid;
				$(self.el).empty();
				var context={
					localWarrior:warrior,
					localWeapon:JSON.parse(window.localStorage.getItem("weapon")),
					localHead:JSON.parse(window.localStorage.getItem("head")),
					localArmor:JSON.parse(window.localStorage.getItem("armor")),
					/*range:JSON.parse(window.localStorage.getItem("weapon")).range + 
							JSON.parse(window.localStorage.getItem("head")).range,
					defense: JSON.parse(window.localStorage.getItem("armor")).defense + 
							JSON.parse(window.localStorage.getItem("head")).defense*/
				}
				$(self.el).html(self.template(context));
			}
            return self;
		   
        }
	
	});

 return HeadQuarterView;
       
});