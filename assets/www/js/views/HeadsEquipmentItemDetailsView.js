define(["jquery", "underscore", "parse", "handlebars", "text!templates/heads-equipment-item-details.html"],
    function ($, _, Parse, Handlebars, template) {

    var HeadsEquipmentItemDetailsView = Parse.View.extend({

      tagName: "div",
      id: "equipmentDetail",
      headId: undefined,
      self:undefined,

        events: {
          "touchend #equips": "equips",
          "touchend #equipBack": "goBack"
        },

        initialize: function (headId) {
          self=this;
          self.headId=headId;
          localheadsequip= JSON.parse(window.localStorage.getItem("equipmentHeads"));
          for (i=0;i<localheadsequip.length;i++)
          {
            if(localheadsequip[i].objectId==self.headId)
              {
                self.model=localheadsequip[i];
                break;
              }
          }
        },

        equips: function () {
        var Head = Parse.Object.extend("Head");
        var head = new Head();
        head.equipThis(self, self.model.objectId);
     },


        goBack: function () { 
          Parse.history.navigate("equipment/heads", {trigger: true});
        },

        template: Handlebars.compile(template),

        render: function (eventName) {
        vector=[];
        localhead=JSON.parse(window.localStorage.getItem("head"));
        if(localhead.objectId==self.model.objectId)
          vector["equipped"]=true;
          var z =this.model;// JSON.parse(a);
          vector["model"]=z;
          $(this.el).html(this.template(vector));
          return this;
        }
      });

    return HeadsEquipmentItemDetailsView;

  });