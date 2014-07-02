define(["jquery", "underscore", "parse", "handlebars", "text!templates/armors-equipment-item-details.html"],
    function ($, _, Parse, Handlebars, template) {

    var ArmorsEquipmentItemDetailsView = Parse.View.extend({

      tagName: "div",
      id: "equipmentDetail",
      armorId: undefined,
      self:undefined,

        events: {
          "touchend #equips": "equips",
          "touchend #back": "goBack"
        },

        initialize: function (armorId) {
          self=this;
          self.armorId=armorId;
          localarmorsequip= JSON.parse(window.localStorage.getItem("equipmentArmors"));
          for (i=0;i<localarmorsequip.length;i++)
          {
            if(localarmorsequip[i].objectId==self.armorId)
              {
                self.model=localarmorsequip[i];
                break;
              }
          }
        },

        equips: function () {
        var warrior = Parse.Object.extend("Warrior");
        var armorClass = Parse.Object.extend("Armor");
        var query = new Parse.Query(warrior);
        var queryArmor = new Parse.Query(armorClass);
         query.equalTo("objectId", window.localStorage.getItem("local_warrior_id"));
         query.find({
           success: function  (results) {
             var warrior = results[0];
                         
             queryArmor.get(self.model.objectId, {
              success: function(armor) {
                  window.localStorage.setItem("armor",JSON.stringify(armor));
                  warrior.set("armor",armor);
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
          //Parse.history.navigate("", {trigger: true});
          Parse.history.navigate("equipment/armors", {trigger: true});
        },

        template: Handlebars.compile(template),

        render: function (eventName) {
        vector=[];
        localarmor=JSON.parse(window.localStorage.getItem("armor"));
        if(localarmor.objectId==self.model.objectId)
          vector["equipped"]=true;
          var z =this.model;// JSON.parse(a);
          vector["model"]=z;
          $(this.el).html(this.template(vector));
          return this;
        }
      });

    return ArmorsEquipmentItemDetailsView;

  });