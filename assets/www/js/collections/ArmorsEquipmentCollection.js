define(["jquery", "underscore", "parse", "models/Armor", "models/Warrior"],
    function ($, _, Parse, Armor, Warrior) {

        var ArmorsEquipmentCollection = Parse.Collection.extend({

            self:undefined,
            model: Armor,


            initialize: function(param){  
            	self=this;
            	
                var queryWarrior= new Parse.Query(Warrior);
                queryWarrior.equalTo("objectId",JSON.parse(window.localStorage.getItem("warrior")).objectId );
                queryWarrior.find().then(function(results) {
                	results[0].relation("armors").query().find({
                        success: function(list) {
                            for(i=0;i<list.length;++i){
                                self.models.push(list[i]);
                            }
                            self.trigger("fetched");
                            a=JSON.stringify(self.models);
                            window.localStorage.setItem("equipmentArmors",a);
                            //window.localStorage.setItem("armi",JSON.stringify(armor));
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

        return ArmorsEquipmentCollection;

    });