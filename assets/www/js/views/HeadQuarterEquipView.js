define(["jquery", "underscore", "parse", "handlebars", "collections/WeaponsListCollection","views/WeaponsListItemView", "text!templates/headquarter-equip.html"],
function ($, _, Parse, Handlebars, WeaponsListCollection, WeaponsListItemView, template) {
	
	var HeadQuarterEquipView = Parse.View.extend({

        //tagName: "ul",
        //id: "HeadQuarterEquipList",

        template: Handlebars.compile(template),

        events: {
                "touchend": "goToDetails"
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

        goToDetails: function () {
            alert("prova! tocco registrato");
                //Parse.history.navigate("weaponslist/" + this.model.cid, {trigger: true});
            }
    });

    return HeadQuarterEquipView;
	
});