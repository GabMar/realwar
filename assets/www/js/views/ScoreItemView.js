define(["jquery", "underscore", "parse", "handlebars", "views/HeadQuarterScoreView", "text!templates/score-item.html"],
    function ($, _, Parse, Handlebars, HeadQuarterScoreView, template) {

        var ScoreItemView = Parse.View.extend({

            tagName: "li",
           //className: "topcoat-list__item", non serve più: mi attribuiva la classe per sfruttare i css di topcoat

            

            template: Handlebars.compile(template),

            initialize: function () {
                this.model.bind("change", this.render, this);
                this.model.bind("destroy", this.close, this);
            },

            render: function (eventName) {
                $('#spinner_equip').hide();
                var weapons = this.model.toJSON();
                weapons.cid = this.model.cid;
                $(this.el).html(this.template(weapons));
                return this;
            },

    
        });

        return ScoreItemView;

    });