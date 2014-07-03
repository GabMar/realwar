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
		   
	       var query = new Parse.Query(warrior);
	       
	       query.equalTo("userId", {
	    	   						__type: "Pointer",
	    	   						className: "_User",
	    	   						objectId: id
	       });
	       
	       query.find({
	    	   success: function  (results) {
	   			   var warrior = results[0];
	   			   self.model = warrior;
	   			   self.model.bind("all",self.render,self);
	   			   
   			   		navigator.geolocation.getCurrentPosition(function (position) {

	   				// aggiorniamo nostra posizione su parse
                    $.ajax({
                        type : 'PUT',
                        headers: {
                        'X-Parse-Application-Id' : "PHYN9yjJLqmSo0xACd63oypUBUcx4q0eLHBvoozY",
                        'X-Parse-REST-API-Key' : "VSn4lvHnF3EKZmVPox8rRA7Eol3X9r7M8blvQWfC"
                        },
                        url: "https://api.parse.com/1/classes/Warrior/"+window.localStorage.getItem("local_warrior_id"),
                        data:  JSON.stringify({"position" : self.model.position}),
                        contentType: "application/json; charset=utf-8",
                        dataType : "json",
                        success: function (data, status, jqXHR) {
                        			self.model.set("position", JSON.stringify(position));
                              		//self.model.save();
                                },

                                error: function (jqXHR, status) {
                                   // error handler
                                   console.log(jqXHR);
                                }
                    });
	                
	            }, function() {});

	   			   
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
					toXP: JSON.parse(window.localStorage.getItem("warrior")).level * 150,
					attack: JSON.parse(window.localStorage.getItem("weapon")).attack,
					range: JSON.parse(window.localStorage.getItem("weapon")).range,
					armor: JSON.parse(window.localStorage.getItem("head")).defense+JSON.parse(window.localStorage.getItem("armor")).defense
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