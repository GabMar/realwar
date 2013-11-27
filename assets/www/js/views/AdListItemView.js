define(["jquery", "underscore", "parse", "handlebars", "text!templates/ad-list-item.html"],
    function ($, _, Parse, Handlebars, template) {

    var AdListItemView = Parse.View.extend({

        tagName: "li",

        events: {
          "touchend": "goToDetails"
        },

        template: Handlebars.compile(template),

        initialize: function () {
          this.model.bind("change", this.render, this);
          this.model.bind("destroy", this.close, this);
        },

        render: function (eventName) {
          var users = this.model.toJSON();
          users.cid = this.model.cid;
          $(this.el).html(this.template(users));
          return this;
        },

        goToDetails: function () {
          Parse.history.navigate("users/" + this.model.cid, {trigger: true});
        }
      });

    return AdListItemView;

  });