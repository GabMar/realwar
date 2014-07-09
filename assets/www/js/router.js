define(["jquery","jqueryparse", "underscore", "parse", "Spinner", "models/Warrior", "models/Weapon","models/Head", "models/Armor","models/User", "views/LoginView", "views/RegView", "views/HeadQuarterView", "views/MapView", "views/StructureView", "views/WeaponsMarketView","views/WeaponsEquipmentView","views/WeaponsEquipmentItemDetailsView","views/HeadsEquipmentView","views/HeadsEquipmentItemDetailsView","views/ArmorsEquipmentView","views/ArmorsEquipmentItemDetailsView", "views/SettingsView" ],
    function ($, $p, _, Parse, Spinner, Warrior,Weapon, Head, Armor, User, LoginView, RegView, HeadQuarterView, MapView, StructureView, WeaponsMarketView,WeaponsEquipmentView,WeaponsEquipmentItemDetailsView,HeadsEquipmentView,HeadsEquipmentItemDetailsView,ArmorsEquipmentView,ArmorsEquipmentItemDetailsView,SettingsView) {

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
      "equipment/:area": "equipment",
      "equipment/:area/:object": "equipment",
      "settings": "settings"
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
          this.structureView = new StructureView(); 
          this.structureView.render();
        }
        this.contents = this.structureView.$el.find("#content #contents");

        this.headQuarter();
      },

    headQuarter: function(){ 
      $('#spinner').show();
      $('#mapButton').removeClass("mapButtonActive");
      $('#headQuarterButton').removeClass("headQuarterButton");
      $('#marketButton').removeClass("marketButtonActive");
      $('#mapButton').addClass("mapButton");
      $('#headQuarterButton').addClass("headQuarterButtonActive");
      $('#marketButton').addClass("marketButton");
      $('#toolbar').css("display","block");
      var page = new HeadQuarterView();
      this.changePage(page);
    },
    
      market: function () {
      $('#spinner').show();
      $('#mapButton').removeClass("mapButtonActive");
      $('#headQuarterButton').removeClass("headQuarterButtonActive");
      $('#marketButton').removeClass("marketButton");
      $('#mapButton').addClass("mapButton");
      $('#headQuarterButton').addClass("headQuarterButton");
      $('#marketButton').addClass("marketButtonActive");
      $('#toolbar').css("display","block");
      var page = new WeaponsMarketView();
      this.changePageNoRender(page);
      },

    
      map: function () {
      $('#spinner').show();
         $('#toolbar').css("display","none");
        var page = new MapView({
          model: this.users
        });
        this.changePage(page);
      },

      equipment: function(area,object){
        if (object==undefined) {
          switch(area){
            case 'weapons':
              var page = new WeaponsEquipmentView();
              this.changePage(page);
              break;
            case 'heads':
              var page = new HeadsEquipmentView();
              this.changePage(page);
              break;
            case 'armors':
              var page = new ArmorsEquipmentView();
              this.changePage(page);
              break;
          } 
        }
        else{
          switch(area){
            case 'weapons':
              var page=new WeaponsEquipmentItemDetailsView(object);
              this.changePage(page);
              break;
            case 'heads':
              var page=new HeadsEquipmentItemDetailsView(object);
              this.changePage(page);
              break;
            case 'armors':
              var page=new ArmorsEquipmentItemDetailsView(object);
              this.changePage(page);
              break;

          }
          
        }


      },

      settings: function(){
        $('#spinner').show();
        var page = new SettingsView();
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
      
      },

      changePageNoRender: function (page) {
        if(this.currentView) {
           this.currentView.remove();
           this.currentView.off();
        }
        this.currentView = page;
        this.contents.append($(page.el));
        this.currentView.trigger("inTheDom");
      
      }

    });

    return AppRouter;

  });