define(["jquery", "underscore", "parse", "models/Weapon", "models/Warrior"],
    function ($, _, Parse, Weapon, Warrior) {

        var WeaponsEquipmentCollection = Parse.Collection.extend({

            self:undefined,
            model: Weapon,


            initialize: function(param){  
            	self=this;
            	
                var queryWarrior= new Parse.Query(Warrior);
                queryWarrior.equalTo("objectId",JSON.parse(window.localStorage.getItem("warrior")).objectId );
                queryWarrior.find().then(function(results) {
                	results[0].relation("weapons").query().find({
                        success: function(list) {
                            for(i=0;i<list.length;++i){
                                self.models.push(list[i]);
                            }
                            self.trigger("fetched");
                            a=JSON.stringify(self.models);
                            window.localStorage.setItem("equipmentWeapons",a);
                        }
                    });
                });

                
            },



            fetch: function(options) {
                options || (options = {});
                Parse.Collection.prototype.fetch.call(this, options);
            }

        });

        return WeaponsEquipmentCollection;

    });