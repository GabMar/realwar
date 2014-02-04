define(["jquery", "underscore", "parse", "models/Head"],
    function ($, _, Parse, Head) {

    var HeadMarketCollection = Parse.Collection.extend({
	
        model: Head,
		
		query: (new Parse.Query(Head)),

        initialize: function(param){
            Parse.Collection.prototype.fetch.call(this);
        },
		
		fetch: function(options) {
            options || (options = {});
            //options.dataType="xml";
            Parse.Collection.prototype.fetch.call(this, options);
        }
		
      });

    return HeadMarketCollection;

  });