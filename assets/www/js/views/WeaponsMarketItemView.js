define(["jquery", "underscore", "parse", "handlebars", "views/WeaponsMarketItemDetailsView", "text!templates/weapons-market-item.html"],
    function ($, _, Parse, Handlebars, WeaponsMarketItemDetailsView, template) {

        var WeaponsMarketItemView = Parse.View.extend({

            tagName: "li",
           //className: "topcoat-list__item", non serve più: mi attribuiva la classe per sfruttare i css di topcoat

            events: {
                "touchend": "goToDetails"
            },

            template: Handlebars.compile(template),

            initialize: function () {
                this.model.bind("change", this.render, this);
                this.model.bind("destroy", this.close, this);
            },

            render: function (eventName) {
                var weapons = this.model.toJSON();
                weapons.cid = this.model.cid;
                $(this.el).html(this.template(weapons));
                return this;
            },

            goToDetails: function () {
                var us = new WeaponsMarketItemDetailsView({
                    model: this.model
                 });
                $('#weaponsmarketcontainer').empty();
                $('#weaponsmarketcontainer').append(us.render().el);
            }
        });

        return WeaponsMarketItemView;

    });