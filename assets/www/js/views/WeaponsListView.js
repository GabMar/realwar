define(["jquery", "underscore", "parse", "handlebars", "collections/WeaponsListCollection","views/WeaponsListItemView", "text!templates/weapons-list.html"],
    function ($, _, Parse, Handlebars, WeaponsListCollection, WeaponsListItemView, template) {

        var WeaponsListView = Parse.View.extend({

            tagName: "ul",
            id: "weaponslist",

            template: Handlebars.compile(template),

            initialize: function () {
                this.model= new WeaponsListCollection();
                this.model.bind("fetched", this.render, this);

            },

            render: function (eventName) {
                $(this.el).empty();
                _.each(this.model.models, function (weapon) {
                    $(this.el).append(new WeaponsListItemView({
                        model: weapon
                    }).render().el);
                }, this);
                return this;
            }
        });

        return WeaponsListView;

    });