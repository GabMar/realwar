define(["jquery", "underscore", "parse", "handlebars", "collections/RankCollection","views/HeadQuarterScoreView", "views/ScoreItemView", "text!templates/headquarter-score.html"],
function ($, _, Parse, Handlebars, RankCollection, HeadQuarterScoreView, ScoreItemView, template) {
    
    var HeadQuarterScoreView = Parse.View.extend({

        tagName: "div",
        id: "scores",

        template: Handlebars.compile(template),

        initialize: function () {
            this.classifica = new RankCollection();
            this.classifica.comparator = function(object) {
                        return object.get("level");  //ordinamento in base al level
                    };
            this.classifica.bind("reset", this.render, this);
        },

        render: function (eventName) {
            $('#spinner_equip').hide();
            var ul = $(this.el).html(this.template);
            for(i=this.classifica.length;i>0;i--){ //for al contrario per ordinamento decrescente
                $(ul).find('#ScoreList').append(new ScoreItemView({ //mi appende dentro this.el un elemento della lista
                model: this.classifica.models[i-1]
                }).render().el);

            }
            return this;
        }
    });

    return HeadQuarterScoreView;
    
});