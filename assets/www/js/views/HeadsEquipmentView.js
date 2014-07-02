define(["jquery", "underscore", "parse", "handlebars", "collections/HeadsEquipmentCollection","views/HeadsEquipmentItemView", "text!templates/heads-equipment.html"],
    function ($, _, Parse, Handlebars, HeadsEquipmentCollection, HeadsEquipmentItemView, template) {

        var HeadsEquipmentView = Parse.View.extend({

            tagName: "div",
            id: "equipmentContainer",

            template: Handlebars.compile(template),

            initialize: function () {
                this.model= new HeadsEquipmentCollection();
                this.model.bind("fetched", this.render, this);

            },

            render: function (eventName) {
                $(this.el).empty();
                var ul = $(this.el).html(this.template);
                _.each(this.model.models, function (head) {
                $(ul).find('#equipmentList').append(new HeadsEquipmentItemView({ //mi appende dentro this.el un elemento della lista
                        model: head
                        }).render().el);
                    }, this);

                return this;
                }

            });

        return HeadsEquipmentView;

    });