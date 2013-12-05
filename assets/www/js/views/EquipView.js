define(["jquery", "underscore", "parse", "handlebars", "collections/WeaponsListCollection","views/WeaponsListItemView", "views/EquipItemView", "text!templates/equip.html"],
function ($, _, Parse, Handlebars, WeaponsListCollection, WeaponsListItemView, EquipItemView, template) {
	
	var EquipView = Parse.View.extend({

        tagName: "ul",
        id: "equipList",

        template: Handlebars.compile(template),

        initialize: function () {
        	this.render();
        },

        render: function (eventName) {
        	var context={
					localWeapon:JSON.parse(window.localStorage.getItem("weapon")),
					range:JSON.parse(window.localStorage.getItem("weapon")).range,
					localHead:JSON.parse(window.localStorage.getItem("head")),
					localArmor:JSON.parse(window.localStorage.getItem("armor")),	
				};
        	
        	$(this.el).append(new EquipItemView().render().el);
        	//$(this.el).html(this.template(context));
        	return this;
        }
    });

    return EquipView;
	
});