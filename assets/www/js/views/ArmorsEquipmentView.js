define(["jquery", "underscore", "parse", "handlebars", "collections/ArmorsEquipmentCollection","views/ArmorsEquipmentItemView", "text!templates/armors-equipment.html"],
    function ($, _, Parse, Handlebars, ArmorsEquipmentCollection, ArmorsEquipmentItemView, template) {

        var ArmorsEquipmentView = Parse.View.extend({

            tagName: "div",
            id: "equipmentContainer",

            template: Handlebars.compile(template),

            initialize: function () {
                this.model= new ArmorsEquipmentCollection();
                this.model.bind("fetched", this.render, this);

            },

            render: function (eventName) {
                $(this.el).empty();
                var ul = $(this.el).html(this.template);
                _.each(this.model.models, function (armor) {
                $(ul).find('#equipmentList').append(new ArmorsEquipmentItemView({ //mi appende dentro this.el un elemento della lista
                        model: armor
                        }).render().el);
                    }, this);

                return this;
                }

            });

        return ArmorsEquipmentView;

    });