define(["jquery","jqueryparse", "underscore", "parse", "collections/UsCollection", "models/Warrior", "models/Weapon","models/Head", "models/Armor","models/User", "views/UsView", "views/UsListView", "views/LoginView", "views/RegView", "views/HeadQuarterView", "views/MapView", "views/StructureView", "views/WeaponsMarketView", "views/EquipView", "views/EquipItemView", "views/WeaponsListView"],
    function ($,$p, _, Parse, UsCollection, Warrior,Weapon, Head, Armor, User, UsView, UsListView, LoginView, RegView, HeadQuarterView, MapView, StructureView, WeaponsMarketView, EquipView, EquipItemView, WeaponsListView) {

    var AppRouter = Parse.Router.extend({
		me: undefined,
      routes: {
    	"":"start",
    	"reg": "reg",
	  "structure": "structure",
      "market": "market",
      "showMap": "map",
      "headQuarter": "headQuarter",
      "weaponsmarket": "changePage",
      "showEquip": "showEquip"
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
		  var page = new HeadQuarterView();
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

        showEquip: function () {
         var page = new EquipView();
         this.structureView = new StructureView();
         this.contents = $("#hqContent");
         this.contents.empty();
         this.contents.append($(page.el));
        },

      weapDetails: function (id) { //ma i modelli li deve caricare il router?
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
