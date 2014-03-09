define(["jquery", "underscore", "parse", "handlebars", "collections/WeaponsListCollection","views/HeadQuarterStatsView", "text!templates/headquarter-stats.html"],
function ($, _, Parse, Handlebars, WeaponsListCollection, HeadQuarterStatsView, template) {
    
    var HeadQuarterStatsView = Parse.View.extend({

        tagName: "div",
        id: "warriorStats",

        template: Handlebars.compile(template),

        initialize: function () {
            this.render();
        },

        render: function (eventName) {
            var context={
                    localWarrior:JSON.parse(window.localStorage.getItem("warrior")),  
                };
                $(this.el).html(this.template(context));
            return this;
        }
    });

    return HeadQuarterStatsView;
    
});