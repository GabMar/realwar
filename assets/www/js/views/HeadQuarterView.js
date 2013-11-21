define(["jquery", "underscore", "parse", "handlebars", "leaflet", "text!templates/headquarter.html","models/Warrior"],
    function ($, _, Parse, Handlebars, L, template, Warrior) {

var HeadQuarterView = Parse.View.extend({
       //className: "page",
	   //tagName: "div",
	   //id: "warriorInfo",
	   self:undefined,


	   template: Handlebars.compile(template),
	   initialize: function ( ) {	
		self=this;	   
	    var local_warrior=JSON.parse(window.localStorage.getItem("warrior"));
		var local_weapon=JSON.parse(window.localStorage.getItem("weapon"));
		self.model=local_warrior;
		var warriorClass= Parse.Object.extend("Warrior");
		var query = new Parse.Query(warriorClass);
		var weaponClass = Parse.Object.extend("Weapon");
		var querywep = new Parse.Query(weaponClass);
		query.equalTo("objectId",local_warrior.id);
		query.find().then(function (data){
			warrior=data[0];
			self.model = warrior;
			window.localStorage.setItem("warrior",JSON.stringify(warrior));
			self.model.bind("change",this.render,this);
			
			querywep.get(warrior.get("weapon").id, {
						success: function(weapon) {
							window.localStorage.setItem("weapon",JSON.stringify(weapon));
						},
						error:function(object,error){
							console.debug(error);
						}
				});
		
			//weapons=new WeaponCollection();
			//weapons.fetch();
			//warrior.weapon=weapons.get(warrior.id);
			self.render();
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