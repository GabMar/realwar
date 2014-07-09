define(["jquery", "underscore", "parse", "models/Weapon"],
    function ($, _, Parse, Weapon) {

    var WeaponsMarketCollection = Parse.Collection.extend({
	
        model: Weapon,
		
		query: (new Parse.Query(Weapon)),

        initialize: function(param){
            Parse.Collection.prototype.fetch.call(this);
        },
		
		fetch: function(options) {
            options || (options = {});
            Parse.Collection.prototype.fetch.call(this, options);
        }
		
      });

    return WeaponsMarketCollection;

  });