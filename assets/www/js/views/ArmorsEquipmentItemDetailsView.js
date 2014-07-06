define(["jquery", "underscore", "parse", "handlebars", "text!templates/armors-equipment-item-details.html"],
    function ($, _, Parse, Handlebars, template) {

    var ArmorsEquipmentItemDetailsView = Parse.View.extend({

      tagName: "div",
      id: "equipmentDetail",
      armorId: undefined,
      self:undefined,

        events: {
          "touchend #equips": "equips",
          "touchend #equipBack": "goBack"
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
        var Armor = Parse.Object.extend("Armor");
        var armor = new Armor();
        armor.equipThis(self, self.model.objectId);
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