define(["jquery", "underscore", "parse", "handlebars", "text!templates/equip-item.html"],
    function ($, _, Parse, Handlebars, template) {

        var EquipItemView = Parse.View.extend({

            tagName: "li",

            events: {
                "touchend": "goToDetails"
            },

            template: Handlebars.compile(template),

            initialize: function () {
                //this.model.bind("change", this.render, this);
                //this.model.bind("destroy", this.close, this);
            },

            render: function (eventName) {
                var weapon = JSON.parse(window.localStorage.getItem("weapon"));
                var head = JSON.parse(window.localStorage.getItem("head"));
                var armor = JSON.parse(window.localStorage.getItem("armor"));
                //weapon.cid = this.model.cid;
                var vector =[];
                vector['weapon']=weapon;
                //vector.push(head);
                //vector.push(armor);
                $(this.el).html(this.template(vector));
                return this;
            },

            goToDetails: function () {
                //Parse.history.navigate("weaponslist/" + this.model.cid, {trigger: true});
            }
        });

        return EquipItemView;

    });