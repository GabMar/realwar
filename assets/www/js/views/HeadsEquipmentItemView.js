define(["jquery", "underscore", "parse", "handlebars", "collections/HeadsEquipmentCollection","views/HeadsEquipmentItemDetailsView", "text!templates/heads-equipment-item.html"],
    function ($, _, Parse, Handlebars, HeadsEquipmentCollection,HeadsEquipmentItemDetailsView, template) {

        var HeadsEquipmentItemView = Parse.View.extend({

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
                var heads = this.model.toJSON();
                heads.cid = this.model.cid;
                var head_equipped = JSON.parse(window.localStorage.getItem("head"));
                var equipped=false;
                var context=[];
                context['head']=heads;
                if(head_equipped.objectId==heads.objectId)
                    {
                        equipped=true;
                        context['equipped']=equipped;
                    }
                $(this.el).html(this.template(context));
                return this;
            },

            goToDetails: function ()  {
                dest="equipment/heads/"+this.model.id;
                Parse.history.navigate(dest, {trigger: true});
            }
        });

        return HeadsEquipmentItemView;

    });