define(["jquery", "underscore", "parse", "handlebars", "collections/WeaponsMarketCollection","collections/ArmorMarketCollection","collections/HeadMarketCollection","views/WeaponsMarketItemView", "text!templates/weapons-market.html"],
    function ($, _, Parse, Handlebars, WeaponsMarketCollection, ArmorMarketCollection, HeadMarketCollection, WeaponsMarketItemView, template) {

    var WeaponsMarketView = Parse.View.extend({

        tagName: "div",
        id: "marketContainer",

        events: {
                "touchend #btnWpn": "weaponList",
                "touchend #btnHd": "headList",
                "touchend #btnArm": "armorList"
        },

        template: Handlebars.compile(template),
        

        initialize: function (params) { 
            this.currentView = undefined;
            this.model= new WeaponsMarketCollection();
            this.head= new HeadMarketCollection();
            this.armor= new ArmorMarketCollection();
            this.model.bind("reset", this.render, this); 
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

        headList: function () { 
            $(this.el).empty();
            var ul = $(this.el).html(this.template);
            $("#spinner").hide();
            $(ul).find('#btnHd').css("background-color", "#20A715");
            $(ul).find('#btnHd').css("color","#051E07");
            $(ul).find('#btnWpn').css("background-color", "rgb(5, 31, 7)");
            $(ul).find('#btnWpn').css("color","white");
            $(ul).find('#btnArm').css("background-color", "rgb(5, 31, 7)");
            $(ul).find('#btnArm').css("color","white");
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