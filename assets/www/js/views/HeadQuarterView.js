define(["jquery", "jqueryparse", "underscore", "parse", "handlebars", "leaflet", "text!templates/headquarter.html", "models/Warrior", "models/Weapon", "models/Head", "models/Armor"],
    function ($, $p,  _, Parse, Handlebars, L, template, Warrior, Weapon, Head, Armor) {

var HeadQuarterView = Parse.View.extend({
       //className: "page",
	   //tagName: "div",
	   //id: "warriorInfo",
	   self:undefined,
	   template: Handlebars.compile(template),
	   
	   initialize: function ( ) {	
		   self=this;
		   
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
	   			   self.model.bind("change",this.render,this);
	   			   
	   			   queryWeapon.get(warrior.get("weapon").id, {
	   					success: function(weapon) {
	   							window.localStorage.setItem("weapon",JSON.stringify(weapon));
	   					},
	   					error:function(object,error){
	   						alert(error);
	   					}
	   				});
	   			   
	   			   queryHead.get(warrior.get("head").id, {
						success: function(head) {
							window.localStorage.setItem("head",JSON.stringify(head));
						},
						error:function(object,error){
							alert(error);
						}
	   			   });
	   			
	   			   queryArmor.get(warrior.get("armor").id, {
						success: function(armor) {
							window.localStorage.setItem("armor",JSON.stringify(armor));
						},
						error:function(object,error){
							alert(error);
						}
	   			   });
	   			   
	   			   self.render();
	   			},
	   		
	   			error:function(object,error){
					alert(error);
	   			}
	   		
	       });
	   },

	   render: function(eventName) {
			if (self.model != undefined)
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
					range:JSON.parse(window.localStorage.getItem("weapon")).range + 
							JSON.parse(window.localStorage.getItem("head")).range,
					defense: JSON.parse(window.localStorage.getItem("armor")).defense + 
							JSON.parse(window.localStorage.getItem("head")).defense
				};
				$(self.el).html(self.template(context));
			}
            return self;
		   
        }
	
	});

 return HeadQuarterView;
       
});