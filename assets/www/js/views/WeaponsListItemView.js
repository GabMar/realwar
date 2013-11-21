define(["jquery", "underscore", "parse", "handlebars", "text!templates/weapons-list-item.html"],
    function ($, _, Parse, Handlebars, template) {

        var WeaponsListItemView = Parse.View.extend({

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
                Parse.history.navigate("weaponslist/" + this.model.cid, {trigger: true});
            }
        });

        return WeaponsListItemView;

    });