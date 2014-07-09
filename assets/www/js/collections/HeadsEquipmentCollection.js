define(["jquery", "underscore", "parse", "models/Head", "models/Warrior"],
    function ($, _, Parse, Head, Warrior) {

        var HeadsEquipmentCollection = Parse.Collection.extend({

            self:undefined,
            model: Head,


            initialize: function(param){  
            	self=this;
            	
                var queryWarrior= new Parse.Query(Warrior);
                queryWarrior.equalTo("objectId",JSON.parse(window.localStorage.getItem("warrior")).objectId );
                queryWarrior.find().then(function(results) {
                	results[0].relation("heads").query().find({
                        success: function(list) {
                            for(i=0;i<list.length;++i){
                                self.models.push(list[i]);
                            }
                            self.trigger("fetched");
                            a=JSON.stringify(self.models);
                            window.localStorage.setItem("equipmentHeads",a);
                        }
                    });
                });

                
            },



            fetch: function(options) {
                options || (options = {});
                Parse.Collection.prototype.fetch.call(this, options);
            }

        });

        return HeadsEquipmentCollection;

    });