define(["jquery", "underscore", "parse", "handlebars", "views/UsView", "text!templates/weapons-market-item.html"],
    function ($, _, Parse, Handlebars, UsView, template) {

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
                var us = new UsView({
                    model: this.model
                 });
                $('#weaponsmarket').empty();
                $('#weaponsmarket').append(us.render().el);
                //Parse.history.navigate("weaponsmarket", {model: this.us, trigger: true});
            }
        });

        return WeaponsMarketItemView;

    });