define(["jquery", "underscore", "parse", "handlebars", "views/WeaponsMarketItemDetailsView", "text!templates/weapons-market-item.html"],
    function ($, _, Parse, Handlebars, WeaponsMarketItemDetailsView, template) {

        var WeaponsMarketItemView = Parse.View.extend({

            tagName: "li",

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
                var view = new WeaponsMarketItemDetailsView({
                    model: this.model
                 });
                $('#weaponsmarketcontainer').empty();
                $('#weaponsmarketcontainer').append(view.render().el);
            }
        });

        return WeaponsMarketItemView;

    });