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
        var warrior = Parse.Object.extend("Warrior");
        var headClass = Parse.Object.extend("Head");
        var query = new Parse.Query(warrior);
        var queryHead = new Parse.Query(headClass);
         query.equalTo("objectId", window.localStorage.getItem("local_warrior_id"));
         query.find({
           success: function  (results) {
             var warrior = results[0];
                         
             queryHead.get(self.model.objectId, {
              success: function(head) {
                  window.localStorage.setItem("head",JSON.stringify(head));
                  warrior.set("head",head);
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