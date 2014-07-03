define(["jquery", "underscore", "parse", "handlebars", "collections/WeaponsListCollection","views/WeaponsEquipmentView", "text!templates/headquarter-equip.html"],
function ($, _, Parse, Handlebars, WeaponsListCollection, WeaponsEquipmentView, template) {
	
	var HeadQuarterEquipView = Parse.View.extend({

        tagName: "div", //si aggiunge un div con id, non cambia molto
        id: "listaEquip",

        template: Handlebars.compile(template),

        events: {
                "tap #hqEquipWeap": "goToWeaponsEquip",
                "tap #hqEquipHead": "goToHeadEquip",
                "tap #hqEquipArm": "goToArmorEquip"
            },

        initialize: function () {
        	this.render();
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

        goToWeaponsEquip: function () {
            Parse.history.navigate("equipment/weapons", {trigger: true});
            },

        goToHeadEquip: function () {
            Parse.history.navigate("equipment/heads", {trigger: true});
            },

        goToArmorEquip: function () {
            Parse.history.navigate("equipment/armors", {trigger: true});
            }
    });

    return HeadQuarterEquipView;
	
});