define(["jquery", "underscore", "parse", "handlebars", "text!templates/weapons-equipment-item-details.html"],
    function ($, _, Parse, Handlebars, template) {

    var WeaponsEquipmentItemDetailsView = Parse.View.extend({

      tagName: "div",
      id: "adDetails",
      self:undefined,

        events: {
          "touchend #equips": "equips",
          "touchend #back": "goBack"
        },

        initialize: function () {
          self=this;
                
        },

        equips: function () {
        var warrior = Parse.Object.extend("Warrior");
        var weaponClass = Parse.Object.extend("Weapon");
        var query = new Parse.Query(warrior);
        var queryWeapon = new Parse.Query(weaponClass);
         query.equalTo("objectId", window.localStorage.getItem("local_warrior_id"));
         query.find({
           success: function  (results) {
             var warrior = results[0];
                         
             queryWeapon.get(self.model.id, {
              success: function(weapon) {
                  warrior.set("weapon",weapon);
                  warrior.save();
                  self.goBack();
              },
              error:function(object,error){
                alert("Errore1: "+error);
              }
            });
             },
        
          error:function(object,error){
          alert(error);
          }
        
         });
     },


        goBack: function () { //non possiamo mettere direttamente "market" perchè quando stiamo vedendo i dettagli di un'arma in "market" ci siamo già, perciò non farebbe niente
          Parse.history.navigate("", {trigger: true});
          Parse.history.navigate("headQuarter", {trigger: true});
        },

        template: Handlebars.compile(template),

        render: function (eventName) {
        vector=[];
        localweapon=JSON.parse(window.localStorage.getItem("weapon"));
        if(localweapon.objectId==self.model.id)
          vector["equipped"]=true;

          var json = this.model.toJSON();
          var a = JSON.stringify(json);  //mi serve per recuperare i dati del warrior
          var z = JSON.parse(a);
          vector["model"]=z;
          $(this.el).html(this.template(vector));
          return this;
        }
      });

    return WeaponsEquipmentItemDetailsView;

  });