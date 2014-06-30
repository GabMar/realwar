define(["jquery", "underscore", "parse", "handlebars", "collections/WeaponsMarketCollection","collections/ArmorMarketCollection","collections/HeadMarketCollection","views/WeaponsMarketItemView", "text!templates/weapons-market.html"],
    function ($, _, Parse, Handlebars, WeaponsMarketCollection, ArmorMarketCollection, HeadMarketCollection, WeaponsMarketItemView, template) {

    var WeaponsMarketView = Parse.View.extend({

        //commento così this.el sarà solo un semplice div
        //tagName: "ul",
        //id: "weaponsmarket",

        events: {
                "touchend #btnWpn": "weaponList",
                "touchend #btnHd": "headList",
                "touchend #btnArm": "armorList"
        },

        template: Handlebars.compile(template),
        //secondo me inizialize dovrebbe caricare tutti i modelli
        //e poi realizzare una change page come il router

        initialize: function (params) { //carico i modelli per il market
            this.currentView = undefined;
            this.model= new WeaponsMarketCollection();
            this.head= new HeadMarketCollection();
            this.armor= new ArmorMarketCollection();
            this.model.bind("reset", this.render, this); //che fa?
         },

        weaponList: function () {
            $(this.el).empty();
            var ul = $(this.el).html(this.template);
            $("#spinner").hide();
            _.each(this.model.models, function (weapon) {
                $(ul).find('#weaponsmarket').append(new WeaponsMarketItemView({ //mi appende dentro this.el un elemento della lista
                    model: weapon
                }).render().el);
            }, this);
            return this;
        },

        headList: function () { //funziona ma da sistermare xke aggiorna weapon
            //Non so se sia il metodo giusto per cambiare i colori
            //ma io lo faccio così per ora
            $(this.el).empty();
            var ul = $(this.el).html(this.template);
            $("#spinner").hide();
            $(ul).find('#btnHd').css("background-color", "#20A715");
            $(ul).find('#btnHd').css("color","#051E07");
            $(ul).find('#btnWpn').css("background-color", "rgb(5, 31, 7)");
            $(ul).find('#btnWpn').css("color","white");
            $(ul).find('#btnArm').css("background-color", "rgb(5, 31, 7)");
            $(ul).find('#btnArm').css("color","white");
            //$(ul).find('#weaponsmarket').html('<p>Under construction</p>');
            //$(ul).find('#weaponsmarket').empty();
            _.each(this.head.models, function (head) {
                $(ul).find('#weaponsmarket').append(new WeaponsMarketItemView({ //mi appende dentro this.el un elemento della lista
                    model: head
                }).render().el);
            }, this);
            return this;
        },

        armorList: function () {
            $(this.el).empty();
            var ul = $(this.el).html(this.template);
            $("#spinner").hide();
            $(ul).find('#btnArm').css("background-color", "#20A715");
            $(ul).find('#btnArm').css("color","#051E07");
            $(ul).find('#btnWpn').css("background-color", "rgb(5, 31, 7)");
            $(ul).find('#btnWpn').css("color","white");
            $(ul).find('#btnHd').css("background-color", "rgb(5, 31, 7)");
            $(ul).find('#btnHd').css("color","white");
            //$(ul).find('#weaponsmarket').empty(); non serve più
            _.each(this.armor.models, function (armor) {
                $(ul).find('#weaponsmarket').append(new WeaponsMarketItemView({ //mi appende dentro this.el un elemento della lista
                    model: armor
                }).render().el);
            }, this);
            return this;
        },
         
        render: function (eventName) {
            $(this.el).empty();
            var ul = $(this.el).html(this.template);
            $("#spinner").hide();
            _.each(this.model.models, function (weapon) {
                $(ul).find('#weaponsmarket').append(new WeaponsMarketItemView({ //mi appende dentro this.el un elemento della lista
                    model: weapon
                }).render().el);
            }, this);
            return this;
        },

      });

    return WeaponsMarketView;

  });