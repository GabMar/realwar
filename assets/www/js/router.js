define(["jquery", "underscore", "parse", "collections/UsCollection", "models/Warrior","models/Weapon", "models/User", "views/UsView", "views/UsListView", "views/LoginView", "views/HeadQuarterView", "views/MapView", "views/StructureView", "views/WeaponsMarketView","views/WeaponsListView"],
    function ($, _, Parse, UsCollection, Warrior,Weapon, User, UsView, UsListView, LoginView, HeadQuarterView, MapView, StructureView, WeaponsMarketView, WeaponsListView) {

    var AppRouter = Parse.Router.extend({
		me: undefined,
      routes: {
    	"":"start",
		"structure": "structure",
        "market": "market",
        "showMap": "map",
        "headQuarter": "headQuarter",
        "users/:id": "usDetails",
        "provalist": "provalist"
      },

      initialize: function () {
	  me=this;
        this.currentView = undefined;
		
        alert('ciaorouter');
		var warriorClass = Parse.Object.extend("Warrior");
		var weaponClass = Parse.Object.extend("Weapon");
        var query = new Parse.Query(warriorClass);
		var querywep = new Parse.Query(weaponClass);
		var weap;
		var weapons;
		var weaptitle;
		query.get("En2VuPv0ob", {
			success: function(warriorClass) {
		window.localStorage.setItem("warrior", JSON.stringify(warriorClass));
		var war= JSON.parse(window.localStorage.getItem("warrior"))
        warriorClass.relation("weapons").query().find({
            success: function(list) {
              for(i=0;i<list.length;++i)
              {
                console.debug(list[i].get("name"));
              }
              console.debug(list)
            }
        });

        querywep.get(warriorClass.get("weapon").id, {
						success: function(Arma) {
							weaptitle = Arma.get("name");
							$('#paragrafo').append(weaptitle);
						},
						error:function(object,error){
							console.debug(error);
						}
				});
		
			},
			error: function(object, error) {
			alert("errore");
			// The object was not retrieved successfully.
			// error is a Parse.Error with an error code and description.
			}
		});
		 
		query.equalTo("objectId", "4Vlf3lqb1K");
		query.find().then(function  (data) {
		warrior = data[0];
		
		});


	  },

	  
	  start: function(){  
		  var currentUser = Parse.User.current();
		  if(currentUser){
			  this.structure();
		  }
		  else{
			 var page = new LoginView();
			 this.changePage(page);
		  }
    },
    
    
	  
      structure: function () {
        if(!this.structureView) {
          this.structureView = new StructureView(); //provare a rendere variabile globale
          this.structureView.render();
          //this.contents = this.structureView.$el.find("#content #contents");
        }
        this.contents = this.structureView.$el.find("#content #contents");
        this.headQuarter();
      },

	  headQuarter: function(){
	  var page= new HeadQuarterView();
	  this.changePage(page);
	  },
	  
      market: function () {
        var page = new WeaponsMarketView();
        this.changePage(page);
      },

	  
      map: function () {
        var page = new MapView({
          model: this.users
        });
        this.changePage(page);
      },

        provalist: function () {
         var page = new WeaponsListView();
         this.contents = this.structureView.$el.find("#hqContent");
         this.contents.empty();
         this.contents.append($(page.el));
         //this.currentView = page;
         //this.currentView.trigger("inTheDom");
         //this.changePage(page);
        },

      usDetails: function (id) {
        var us = this.users.getByCid(id);
        this.changePage(new UsView({
          model: us
        }));
      },

      changePage: function (page) {
        if(this.currentView) {
           this.currentView.remove();
           this.currentView.off();
        }
        this.currentView = page;
        page.render();
        this.contents.append($(page.el));
        this.currentView.trigger("inTheDom");
      }

    });

    return AppRouter;

  });
