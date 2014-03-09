define(["jquery", "underscore", "parse", "handlebars", "text!templates/headquarter-equip-item.html"],
    function ($, _, Parse, Handlebars, template) {

        var HeadQuarterEquipItemView = Parse.View.extend({

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
                vector['head']=head;
                vector['armor']=armor;
                $(this.el).html(this.template(vector));
                return this;
            },

            goToDetails: function () {
                alert("prova");
                //Parse.history.navigate("weaponslist/" + this.model.cid, {trigger: true});
            }
        });
//L'implementazione di questa vista sarà totalmente diversa
//perchè non ci serve più che carica i dati, ma dovrà dare all'utente
//la possibilità di cambiare equipaggiamento
        return HeadQuarterEquipItemView;

    });