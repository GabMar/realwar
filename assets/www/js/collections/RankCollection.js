define(["jquery", "underscore", "parse", "models/Warrior"],
    function ($, _, Parse, Warrior) {

    var RankCollection = Parse.Collection.extend({
	
        model: Warrior,
        self: undefined,
		
        


        initialize: function () {
            self=this;
            queryRank = new Parse.Query(Warrior);
            queryRank.select("nick", "level", "deaths", "kills");
            queryRank.descending("level");
            queryRank.find().then(function (results) {
                var a=JSON.stringify(results);
                for(i=0;i<results.length;++i){ 
                                self.models.push(results[i]);
                            }
                self.trigger("fetched");
                window.localStorage.setItem("classifica",a);
                });


            Parse.Collection.prototype.fetch.call(this);
        },
		
		fetch: function(options) {
            options || (options = {});
            Parse.Collection.prototype.fetch.call(this, options);
        }
		
      });

    return RankCollection;

  });