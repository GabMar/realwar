define(["jquery", "underscore", "parse", "handlebars", "collections/WeaponsEquipmentCollection","views/WeaponsEquipmentItemDetailsView", "text!templates/weapons-equipment-item.html"],
    function ($, _, Parse, Handlebars, WeaponsEquipmentCollection,WeaponsEquipmentItemDetailsView, template) {

        var WeaponsEquipmentItemView = Parse.View.extend({

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
                var weapon_equipped = JSON.parse(window.localStorage.getItem("weapon"));
                var equipped=false;
                var context=[];
                context['weapon']=weapons;
                if(weapon_equipped.objectId==weapons.objectId)
                    {
                        equipped=true;
                        context['equipped']=equipped;
                    }
                $(this.el).html(this.template(context));
                return this;
            },

            goToDetails: function ()  {
                dest="equipment/weapons/"+this.model.id;
                Parse.history.navigate(dest, {trigger: true});
            }
        });

        return WeaponsEquipmentItemView;

    });