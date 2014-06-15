define(["jquery", "underscore", "parse", "handlebars", "collections/WeaponsListCollection","views/EquipmentListView", "text!templates/headquarter-equip.html"],
function ($, _, Parse, Handlebars, WeaponsListCollection, EquipmentListView, template) {
	
	var HeadQuarterEquipView = Parse.View.extend({

        tagName: "div", //si aggiunge un div con id, non cambia molto
        id: "HeadQuarterEquipList",

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
            $('#headQuarter').empty();
            alert("prova! tocco registrato weapon");
            var page = new EquipmentListView();
            $('#headQuarter').append(page.render().el);
            },

        goToHeadEquip: function () {
            $('#headQuarter').empty();
            alert("prova! tocco registrato head");
            var page = new EquipmentListView();
            $('#headQuarter').append(page.render().el);
            },

        goToArmorEquip: function () {
            $('#headQuarter').empty();
            alert("prova! tocco registrato armor");
            var page = new WeaponsListView();
            var page = new EquipmentListView();
            $('#headQuarter').append(page.render().el);
            }
    });

    return HeadQuarterEquipView;
	
});