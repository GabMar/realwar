define(["jquery","jqueryparse", "underscore", "parse", "collections/UsCollection", "models/Warrior","models/Weapon", "models/User", "views/UsView", "views/UsListView", "views/LoginView", "views/RegView", "views/HeadQuarterView", "views/MapView", "views/StructureView", "views/WeaponsMarketView","views/WeaponsListView"],
    function ($,$p, _, Parse, UsCollection, Warrior,Weapon, User, UsView, UsListView, LoginView, RegView, HeadQuarterView, MapView, StructureView, WeaponsMarketView, WeaponsListView) {

    var AppRouter = Parse.Router.extend({
		me: undefined,
      routes: {
    	"":"start",
    	"reg": "reg",
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
    
    reg: function(){
  	  var page= new RegView();
  	  this.changePage(page);
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

	  headQuarter: function(){ //al cambio delle pagine spengo e accendo i bottoni
	  $('#mapButton').removeClass("mapButtonActive");
    $('#headQuarterButton').removeClass("headQuarterButton");
    $('#marketButton').removeClass("marketButtonActive");
    $('#mapButton').addClass("mapButton");
    $('#headQuarterButton').addClass("headQuarterButtonActive");
    $('#marketButton').addClass("marketButton");
    $('#toolbar').css("display","block");
    $('#fire').css("display","none");
    var page= new HeadQuarterView();
	  this.changePage(page);
	  },
	  
      market: function () {

        $('#mapButton').removeClass("mapButtonActive");
        $('#headQuarterButton').removeClass("headQuarterButtonActive");
        $('#marketButton').removeClass("marketButton");
        $('#mapButton').addClass("mapButton");
        $('#headQuarterButton').addClass("headQuarterButton");
        $('#marketButton').addClass("marketButtonActive");
        $('#toolbar').css("display","block");
        $('#fire').css("display","none");
        var page = new WeaponsMarketView();
        this.changePage(page);
      },

	  
      map: function () {
         $('#toolbar').css("display","none");
         $('#fire').css("display","block");
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
