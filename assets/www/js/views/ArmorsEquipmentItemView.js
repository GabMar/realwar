define(["jquery", "underscore", "parse", "handlebars", "collections/ArmorsEquipmentCollection","views/ArmorsEquipmentItemDetailsView", "text!templates/armors-equipment-item.html"],
    function ($, _, Parse, Handlebars, ArmorsEquipmentCollection,ArmorsEquipmentItemDetailsView, template) {

        var ArmorsEquipmentItemView = Parse.View.extend({

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
                $('#spinner').hide();
                var armors = this.model.toJSON();
                armors.cid = this.model.cid;
                var armor_equipped = JSON.parse(window.localStorage.getItem("armor"));
                var equipped=false;
                var context=[];
                context['armor']=armors;
                if(armor_equipped.objectId==armors.objectId)
                    {
                        equipped=true;
                        context['equipped']=equipped;
                    }
                $(this.el).html(this.template(context));
                return this;
            },

            goToDetails: function ()  {
                dest="equipment/armors/"+this.model.id;
                Parse.history.navigate(dest, {trigger: true});
            }
        });

        return ArmorsEquipmentItemView;

    });