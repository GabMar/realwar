define(["jquery", "underscore", "parse", "handlebars", "text!templates/weapons-equipment-item-details.html"],
    function ($, _, Parse, Handlebars, template) {

    var WeaponsEquipmentItemDetailsView = Parse.View.extend({

      tagName: "div",
      id: "equipmentDetail",
      weaponId: undefined,
      self:undefined,

        events: {
          "touchend #equips": "equips",
          "touchend #equipBack": "goBack"
        },

        initialize: function (weaponId) {
          self=this;
          self.weaponId=weaponId;
          localweaponsequip= JSON.parse(window.localStorage.getItem("equipmentWeapons"));
          for (i=0;i<localweaponsequip.length;i++)
          {
            if(localweaponsequip[i].objectId==self.weaponId)
              {
                self.model=localweaponsequip[i];
                break;
              }
          }
        },

        equips: function () {
        var Weapon = Parse.Object.extend("Weapon");
        var weapon = new Weapon();
        weapon.equipThis(self, self.model.objectId);
     },


        goBack: function () { //non possiamo mettere direttamente "market" perchè quando stiamo vedendo i dettagli di un'arma in "market" ci siamo già, perciò non farebbe niente
          //Parse.history.navigate("", {trigger: true});
          Parse.history.navigate("equipment/weapons", {trigger: true});
        },

        template: Handlebars.compile(template),

        render: function (eventName) {
        vector=[];
        localweapon=JSON.parse(window.localStorage.getItem("weapon"));
        if(localweapon.objectId==self.model.objectId)
          vector["equipped"]=true;
          var z =this.model;// JSON.parse(a);
          vector["model"]=z;
          $(this.el).html(this.template(vector));
          return this;
        }
      });

    return WeaponsEquipmentItemDetailsView;

  });