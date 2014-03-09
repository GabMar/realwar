define(["jquery", "underscore", "parse", "handlebars", "collections/WeaponsListCollection","views/HeadQuarterScoreView", "text!templates/headquarter-score.html"],
function ($, _, Parse, Handlebars, WeaponsListCollection, HeadQuarterScoreView, template) {
    
    var HeadQuarterScoreView = Parse.View.extend({

        tagName: "div",
        id: "scores",

        template: Handlebars.compile(template),

        initialize: function () {
            this.render();
        },

        render: function (eventName) {
            $(this.el).html(this.template({}));
            return this;
        }
    });

    return HeadQuarterScoreView;
    
});