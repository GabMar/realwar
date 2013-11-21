define(["jquery", "underscore", "parse", "handlebars", "collections/WeaponsMarketCollection","views/WeaponsMarketItemView", "text!templates/weapons-market.html"],
    function ($, _, Parse, Handlebars, WeaponsMarketCollection, WeaponsMarketItemView, template) {

    var WeaponsMarketView = Parse.View.extend({

        tagName: "ul",
        id: "weaponsmarket",

        template: Handlebars.compile(template),
        

        initialize: function (params) {
			this.model= new WeaponsMarketCollection();
          this.model.bind("reset", this.render, this);
		 },

		 
		 
        render: function (eventName) {
            $(this.el).empty();
            _.each(this.model.models, function (weapon) {
                $(this.el).append(new WeaponsMarketItemView({
                    model: weapon
                }).render().el);
            }, this);
            return this;
        }
      });

    return WeaponsMarketView;

  });