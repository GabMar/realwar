define(["jquery", "underscore", "parse", "handlebars", "collections/WeaponsEquipmentCollection","views/WeaponsEquipmentItemView", "text!templates/weapons-equipment.html"],
    function ($, _, Parse, Handlebars, WeaponsEquipmentCollection, WeaponsEquipmentItemView, template) {

        var WeaponsEquipmentView = Parse.View.extend({

            //tagName: "ul",
            id: "weaponslist",

            template: Handlebars.compile(template),

            initialize: function () {
                this.model= new WeaponsEquipmentCollection();
                this.model.bind("fetched", this.render, this);

            },

            render: function (eventName) {
                $(this.el).empty();
                var ul = $(this.el).html(this.template);
                _.each(this.model.models, function (weapon) {
                $(ul).find('#weaponslist').append(new WeaponsEquipmentItemView({ //mi appende dentro this.el un elemento della lista
                        model: weapon
                        }).render().el);
                    }, this);

                return this;
                }

            });

        return WeaponsEquipmentView;

    });