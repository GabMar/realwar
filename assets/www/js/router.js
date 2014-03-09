define(["jquery","jqueryparse", "underscore", "parse", "Spinner", "collections/UsCollection", "models/Warrior", "models/Weapon","models/Head", "models/Armor","models/User", "views/LoginView", "views/RegView", "views/HeadQuarterView", "views/MapView", "views/StructureView", "views/WeaponsMarketView" ],
    function ($,$p, _, Parse, Spinner, UsCollection, Warrior,Weapon, Head, Armor, User, LoginView, RegView, HeadQuarterView, MapView, StructureView, WeaponsMarketView, HeadQuarterEquipView) {

    var AppRouter = Parse.Router.extend({
		me: undefined,
      routes: {
    	"":"start",
    	"reg": "reg",
	  "structure": "structure",
      "market": "market",
      "showMap": "map",
      "headQuarter": "headQuarter",
      "weaponsmarket": "changePage"
      },

      spinner:undefined,

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
        /*inserisco lo spinner
        var opts = {
                    lines: 15, // The number of lines to draw
                    length: 18, // The length of each line
                    width: 6, // The line thickness
                    radius: 18, // The radius of the inner circle
                    corners: 1, // Corner roundness (0..1)
                    rotate: 0, // The rotation offset
                    direction: 1, // 1: clockwise, -1: counterclockwise
                    color: '#2FE43B', // #rgb or #rrggbb or array of colors
                    speed: 1, // Rounds per second
                    trail: 60, // Afterglow percentage
                    shadow: false, // Whether to render a shadow
                    hwaccel: false, // Whether to use hardware acceleration
                    className: 'spinner', // The CSS class to assign to the spinner
                    zIndex: 2e9, // The z-index (defaults to 2000000000)
                    top: '30px', // Top position relative to parent in px
                    left: 'auto' // Left position relative to parent in px
                  };
            var target = document.getElementById('contents');
            spinner = new Spinner(opts).spin(target); 
            qualche problema con lo spinner, è da sistemare */

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


      changePage: function (page) {
        if(this.currentView) {
           this.currentView.remove();
           this.currentView.off();
        }
        this.currentView = page;
        page.render();
        this.contents.append($(page.el));
        this.currentView.trigger("inTheDom");
        if (page.postRender) { //serve per controllare quali viste hanno il metodo
               page.postRender(); //e avviarlo per inserire lo scroll
            }
      }

    });

    return AppRouter;

  });
