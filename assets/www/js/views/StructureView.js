define(["jquery", "underscore", "parse", "handlebars", "leaflet", "text!templates/structure.html"],
    function ($, _, Parse, Handlebars, L, template) {

    var StructureView = Parse.View.extend({

        id: "mainContainer", 

        events: {
          "touchend #backButton": "goBack",
          "touchend #mapButton": "showMap",
          "touchend #headQuarterButton": "headQuarter",
          "touchend #marketButton": "market"
        },

        showMap: function () { 
          Parse.history.navigate("showMap", {trigger: true});
        },

        headQuarter: function () {
          Parse.history.navigate("", {trigger: true});
        },

        goBack: function () {
          window.history.back();
        },

        market: function () {
          Parse.history.navigate("market", {trigger: true});
        },

        

        template: Handlebars.compile(template),

        render: function (eventName) {
          this.title = "Test Mio";
          $(this.el).html(this.template({"title": this.title}));
          $('body').append($(this.el));
          if(!this.otherButton) {
            this.otherButton = document.getElementById("mapButton");
          }
          return this;
        },

        toggleMenu: function () {//non utilizzata
          this.el.classList.toggle("is-menu-visible");
        }
      });

    return StructureView;

  }); 