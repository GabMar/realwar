define(["jquery", "underscore", "parse", "handlebars", "collections/WeaponsListCollection","views/HeadQuarterStatsView", "text!templates/headquarter-stats.html"],
function ($, _, Parse, Handlebars, WeaponsListCollection, HeadQuarterStatsView, template) {
    
    var HeadQuarterStatsView = Parse.View.extend({

        tagName: "div",
        id: "hqStatsContent",

        template: Handlebars.compile(template),

        initialize: function () {
            this.render();
        },

        render: function (eventName) {
				var context={
					localWarrior:JSON.parse(window.localStorage.getItem("warrior")),
					localWeapon:JSON.parse(window.localStorage.getItem("weapon")),
					localHead:JSON.parse(window.localStorage.getItem("head")),
					localArmor:JSON.parse(window.localStorage.getItem("armor")),
					toXP: JSON.parse(window.localStorage.getItem("warrior")).level * 150,
					attack: JSON.parse(window.localStorage.getItem("weapon")).attack,
					range: JSON.parse(window.localStorage.getItem("weapon")).range+JSON.parse(window.localStorage.getItem("head")).range,
					armor: JSON.parse(window.localStorage.getItem("head")).defense+JSON.parse(window.localStorage.getItem("armor")).defense
				}
                $(this.el).html(this.template(context));
            return this;
        }
    });

    return HeadQuarterStatsView;
    
});