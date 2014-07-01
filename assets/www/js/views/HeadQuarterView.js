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
	   
	   initialize: function () {
		   self=this;
		   self.model = new Warrior();
		   var id = window.localStorage.getItem('local_user_id');
		   var warrior = Parse.Object.extend("Warrior");
		   var weaponClass = Parse.Object.extend("Weapon");
		   var headClass = Parse.Object.extend("Head");
		   var armorClass = Parse.Object.extend("Armor");
		   
	       var query = new Parse.Query(warrior);
	       var queryWeapon = new Parse.Query(weaponClass);
	       var queryHead = new Parse.Query(headClass);
	       var queryArmor = new Parse.Query(armorClass);
	       
	       query.equalTo("userId", {
	    	   						__type: "Pointer",
	    	   						className: "_User",
	    	   						objectId: id
	       });
	       
	       query.find({
	    	   success: function  (results) {
	   			   var warrior = results[0];
	   			   self.model = warrior;
	   			   window.localStorage.setItem("warrior",JSON.stringify(warrior));
	   			   self.model.bind("change",self.render,self);
	   			   
	   			   queryWeapon.get(warrior.get("weapon").id, {
	   					success: function(weapon) {
	   							window.localStorage.setItem("weapon",JSON.stringify(weapon));
	   							self.model.set("coins", warrior.get("coins"));
	   							self.model.save();
	   					},
	   					error:function(object,error){
	   						alert("Errore1: "+error);
	   					}
	   				});

	   			   queryHead.get(warrior.get("head").id, {
						success: function(head) {
							window.localStorage.setItem("head",JSON.stringify(head));
						},
						error:function(object,error){
							alert("Errore2: "+error);
						}
	   			   });
	   			
	   			   queryArmor.get(warrior.get("armor").id, {
						success: function(armor) {
							window.localStorage.setItem("armor",JSON.stringify(armor));
						},
						error:function(object,error){
							alert("Errore3: "+error);
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
		if(window.localStorage.getItem("warrior") != undefined)
			{	 
				
				//var warrior= JSON.parse(JSON.stringify(self.model));
				//warrior.cid = self.model.cid;
				$(self.el).empty();
				var context={
					localWarrior:JSON.parse(window.localStorage.getItem("warrior")),
					localWeapon:JSON.parse(window.localStorage.getItem("weapon")),
					localHead:JSON.parse(window.localStorage.getItem("head")),
					localArmor:JSON.parse(window.localStorage.getItem("armor")),
					toXP: JSON.parse(window.localStorage.getItem("warrior")).level * 150
				}
				$(self.el).html(self.template(context));
				$('.progress').attr('value', JSON.parse(window.localStorage.getItem("warrior")).life);
				$("#spinner").hide();
            return self;
        }
		   
        }
	
	});

 return HeadQuarterView;
       
});