define(["jquery", "underscore", "parse", "handlebars", "collections/WeaponsListCollection","views/EquipmentListItemView", "text!templates/equipment-list.html"],
    function ($, _, Parse, Handlebars, WeaponsListCollection, EquipmentListItemView, template) {

        var EquipmentListView = Parse.View.extend({

            //tagName: "ul",
            id: "weaponslist",

            template: Handlebars.compile(template),

            initialize: function () {
                this.model= new WeaponsListCollection();
                this.model.bind("fetched", this.render, this);

            },

            render: function (eventName) {
                $(this.el).empty();
                var ul = $(this.el).html(this.template);
                _.each(this.model.models, function (weapon) {
                $(ul).find('#weaponslist').append(new EquipmentListItemView({ //mi appende dentro this.el un elemento della lista
                        model: weapon
                        }).render().el);
                    }, this);

                return this;
                }

            });

        return EquipmentListView;

    });