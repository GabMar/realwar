define(["jquery", "underscore", "parse"],
  function ($, _, Parse) {
    var Weapon = Parse.Object.extend("Weapon", {
      defaults: {
        name: undefined,
        range: undefined,
        attack: 0,
        figure: undefined,
        cost: 0
      },

      buyThis: function(itemName){

        var query = new Parse.Query(Weapon);
        query.equalTo("name", itemName);
        query.find({
          success: function(results) {
            for (var i = 0; i < results.length; i++) { 
              var object = results[i];
              window.localStorage.setItem("variabile", object.id);
              window.localStorage.setItem("item_coins", object.get("cost"));
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
                    if(object.get("coins") >= window.localStorage.getItem("item_coins")){
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

                                  window.localStorage.removeItem("variabile");
                                  $("#buyItem").hide();
                                  $("#sellItem").show();
                                },

                                error: function (jqXHR, status) {
                                   // error handler
                                   console.log(jqXHR);
                                }
                      });
                      object.set("coins", object.get("coins")-window.localStorage.getItem("item_coins"));
                      object.save();
                      window.localStorage.removeItem("item_coins");
                    } 
                    else {
                      alert("non hai abbastanza soldi, pezzente!");
                    }

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

      sellThis: function(itemName){
        var query = new Parse.Query(Weapon);
        query.equalTo("name", itemName);
        query.find({
          success: function(results) {
            for (var i = 0; i < results.length; i++) { 
              var object = results[i];
              window.localStorage.setItem("variabile", object.id);
              window.localStorage.setItem("item_coins", object.get("cost"));
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
                            data: '{"'+item_r+'":{"__op":"RemoveRelation","objects":[{"__type":"Pointer","className":"'+item+'","objectId":"'+c+'"}]}}',
                            contentType: "application/json",
                            success: function (data, status, jqXHR) {

                                window.localStorage.removeItem("variabile");
                                $("#sellItem").hide();
                                $("#buyItem").show();
                              },

                              error: function (jqXHR, status) {
                                 // error handler
                                 console.log(jqXHR);
                              }
                    });
                    var gettoni = window.localStorage.getItem("item_coins")/2;
                    object.set("coins", object.get("coins")+gettoni);
                    object.save();
                    window.localStorage.removeItem("item_coins");

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
      }

      });

    return Weapon;

  });