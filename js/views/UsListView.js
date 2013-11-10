define(["jquery", "underscore", "parse", "handlebars", "views/AdListItemView", "text!templates/ad-list.html"],
    function ($, _, Parse, Handlebars, AdListItemView, template) {

    var UsListView = Parse.View.extend({

        tagName: "ul",
        id: "list",

        template: Handlebars.compile(template),

        initialize: function () {
          this.model.bind("reset", this.render, this);
        },

        render: function (eventName) {
          $(this.el).empty();
          _.each(this.model.models, function (users) {
            $(this.el).append(new AdListItemView({
              model: users
            }).render().el);
          }, this);
          return this;
        }
      });

    return UsListView;

  });