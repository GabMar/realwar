define(["jquery", "underscore", "parse", "models/Weapon", "models/Warrior"],
    function ($, _, Parse, Weapon, Warrior) {

        var WeaponsListCollection = Parse.Collection.extend({

            self:undefined,
            model: Weapon,

            query: (new Parse.Query(Weapon)),

            initialize: function(param)
            {  self=this;
                var querywar= new Parse.Query(Warrior);
                querywar.equalTo("objectId",JSON.parse(window.localStorage.getItem("warrior")).id );
                querywar.find().then(function(data) {

                    data[0].relation("weapons").query().find({
                        success: function(list) {
                            for(i=0;i<list.length;++i)
                            {
                                self.models.push(list[i]);
                            }
                            self.trigger("fetched");
                        }
                    });


                });



            },



            fetch: function(options) {
                options || (options = {});
                //options.dataType="xml";
                Parse.Collection.prototype.fetch.call(this, options);
            }

        });

        return WeaponsListCollection;

    });