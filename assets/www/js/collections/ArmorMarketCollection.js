define(["jquery", "underscore", "parse", "models/Armor"],
    function ($, _, Parse, Armor) {

    var ArmorMarketCollection = Parse.Collection.extend({
	
        model: Armor,
		
		query: (new Parse.Query(Armor)),

        initialize: function(param){
            Parse.Collection.prototype.fetch.call(this);
        },
		
		fetch: function(options) {
            options || (options = {});
            //options.dataType="xml";
            Parse.Collection.prototype.fetch.call(this, options);
        }
		
      });

    return ArmorMarketCollection;

  });