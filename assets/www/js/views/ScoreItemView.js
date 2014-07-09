define(["jquery", "underscore", "parse", "handlebars", "views/HeadQuarterScoreView", "text!templates/score-item.html"],
    function ($, _, Parse, Handlebars, HeadQuarterScoreView, template) {

        var ScoreItemView = Parse.View.extend({

            tagName: "li",

            

            template: Handlebars.compile(template),

            initialize: function () {
                this.model.bind("change", this.render, this);
                this.model.bind("destroy", this.close, this);
            },

            render: function (eventName) {
                $('#spinner_score').hide();
                var weapons = this.model.toJSON();
                weapons.cid = this.model.cid;
                $(this.el).html(this.template(weapons));
                return this;
            },

    
        });

        return ScoreItemView;

    });