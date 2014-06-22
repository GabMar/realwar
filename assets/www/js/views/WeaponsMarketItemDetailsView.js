define(["jquery", "underscore", "parse", "handlebars", "text!templates/weapons-market-item-details.html"],
    function ($, _, Parse, Handlebars, template) {

    var UsView = Parse.View.extend({

      tagName: "div",
      id: "adDetails",

        events: {
          "touchend #buyItem": "buyItem",
          "touchend #back": "goBack"
        },

        initialize: function () {
          var itemName= $("#detailsName").html();
          var a=$("#btnHd").css("color");
          var b=$("#btnWpn").css("color");
          var c=$("#btnArm").css("color");
          if(a == "rgb(5, 30, 7)"){
            var item = "Head";
            var item_r = "heads";
            window.localStorage.setItem("item", item);
            window.localStorage.setItem("item_r", item_r);}
            else if (b == "rgb(5, 30, 7)") {
              var item = "Weapon";
              var item_r = "weapons";
              window.localStorage.setItem("item", item);
              window.localStorage.setItem("item_r", item_r);
              }
              else if (c == "rgb(5, 30, 7)") {
                var item = "Armor";
                var item_r = "armors";
                window.localStorage.setItem("item", item);
                window.localStorage.setItem("item_r", item_r);
              };
                var Warrior = Parse.Object.extend("Warrior");
                var query = new Parse.Query(Warrior);
                var war_id=window.localStorage.getItem("local_warrior_id");
                query.equalTo("objectId", war_id);
                query.find({
                  success: function(results) {
                    for (var i = 0; i < results.length; i++) { 
                      var object = results[i];
                      var relation = object.relation(window.localStorage.getItem("item_r"));
                      var query = relation.query();
                      query.equalTo("name", $("#detailsName").html());
                      query.find({
                        success:function(list) {
                          if (list.length == 0) {
                            $("#buyItem").show();
                            //window.localStorage.removeItem("item");
                            //window.localStorage.removeItem("item_r");
                          };
                          for (var i = 0; i < list.length; i++) {
                            var bella = list[i];
                            //$("#buyItem").hide();
                            window.localStorage.removeItem("item");
                            window.localStorage.removeItem("item_r");
                          }
                        }
                      });
                    }
                  },
                  error: function(error) {
                    alert("Error: " + error.code + " " + error.message);
                  }
                });
                
        },

        buyItem: function () {
          var itemName= $("#detailsName").html();
          var Itemtoadd = Parse.Object.extend(window.localStorage.getItem("item"));
          var query = new Parse.Query(Itemtoadd);
          query.equalTo("name", itemName);
          query.find({
            success: function(results) {
              for (var i = 0; i < results.length; i++) { 
                var object = results[i];
                window.localStorage.setItem("variabile", object.id);
                var Warrior = Parse.Object.extend("Warrior");
                var query = new Parse.Query(Warrior);
                var war_id=window.localStorage.getItem("local_warrior_id");
                query.equalTo("objectId", war_id);
                query.find({
                  success: function(results) {
                    for (var i = 0; i < results.length; i++) { 
                      var object = results[i];
                      var c = window.localStorage.getItem("variabile");
                      var item = window.localStorage.getItem("item");
                      var item_r = window.localStorage.getItem("item_r");
                      $.ajax({
                      type: 'PUT',
                      headers: {
                          'X-Parse-Application-Id': "PHYN9yjJLqmSo0xACd63oypUBUcx4q0eLHBvoozY",
                          'X-Parse-REST-API-Key': "VSn4lvHnF3EKZmVPox8rRA7Eol3X9r7M8blvQWfC"
                      },
                      url: "https://api.parse.com/1/classes/Warrior/"+object.id+"",
                      data: '{"'+item_r+'":{"__op":"AddRelation","objects":[{"__type":"Pointer","className":"'+item+'","objectId":"'+c+'"}]}}',
                      contentType: "application/json",
                      success: function (data, status, jqXHR) {

                          window.localStorage.removeItem("item");
                          window.localStorage.removeItem("item_r");
                          window.localStorage.removeItem("variabile");
                          $("#buyItem").hide();
                        },

                        error: function (jqXHR, status) {
                           // error handler
                           console.log(jqXHR);
                        }
                  });
                    }
                  },
                  error: function(error) {
                    alert("Error: " + error.code + " " + error.message);
                  }
                });
              }
            },
            error: function(error) {
              alert("Error: " + error.code + " " + error.message);
            }
          });
          
        },

        goBack: function () { //non possiamo mettere direttamente "market" perchè quando stiamo vedendo i dettagli di un'arma in "market" ci siamo già, perciò non farebbe niente
          Parse.history.navigate("", {trigger: true});
          Parse.history.navigate("market", {trigger: true});
        },

        template: Handlebars.compile(template),

        render: function (eventName) {
          var json = this.model.toJSON();
          var warrior = JSON.parse(window.localStorage.getItem("warrior"));
          var a = JSON.stringify(json);  //mi serve per recuperare i dati del warrior
          var b = JSON.stringify(warrior); //e poi settare i soldi
          var z = JSON.parse(a);
          var x = JSON.parse(b);
          z["coins"] = x["coins"];
          var concatenate = a.concat(b);

          $(this.el).html(this.template(z));
          return this;
        }
      });

    return UsView;

  });