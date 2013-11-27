define(["jquery", "jqueryparse", "underscore", "parse", "handlebars", "leaflet", "text!templates/headquarter.html","models/Warrior", "models/Weapon"],
    function ($, $p,  _, Parse, Handlebars, L, template, Warrior, Weapon) {

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
	       var query = new Parse.Query(warrior);
	       var queryWeapon = new Parse.Query(weaponClass);
		   
	       
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
					warr:warrior,
					weap:JSON.parse(window.localStorage.getItem("weapon"))
				};
				$(self.el).html(self.template(context));
			}
            return self;
		   
        },
	
});

 return HeadQuarterView;
       
});