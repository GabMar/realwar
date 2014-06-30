define(["jquery", "underscore", "parse"],
  function ($, _, Parse) {
    var Warrior = Parse.Object.extend("Warrior", {
      defaults: {
        nick: undefined,
        password: undefined,
        email: undefined,
        coins: undefined,
        life: 100,
        image: undefined,
        position: undefined,
        level: 0,
        xp: 0,
        kills:0,
        deaths:0,
        weapon: undefined,
        weapons: undefined,
        gpsId: undefined,   // andrebbero inseriti e utilizzati, salvando il model
        watchId: undefined
      },

      signupWarrior: function(id, username, password, image) {
        this.set("nick", username);
        this.set("coins", 50);
        this.set("image", image);
        this.set("userId", {__type: "Pointer", className: "_User",objectId: id});
        var point = new Parse.GeoPoint({latitude: 40.0, longitude: -30.0});
        this.set("position", point);
        var id_wep = "Ykli9gHMmg";
        var id_he = "rBYFAiiooM";
        var id_ar = "COXNCJlA7x";
        this.set("weapon", {__type: "Pointer", className: "Weapon",objectId: id_wep});
        this.set("head", {__type: "Pointer", className: "Head", objectId: id_he});
        this.set("armor", {__type: "Pointer", className: "Armor", objectId: id_ar});

         
        this.save(null, {
          success: function(warrior) {
            // Execute any logic that should take place after the object is saved.
            alert('New object created with objectId: ' + warrior.id);
            window.localStorage.setItem("local_warrior_id", warrior.id);
            $.ajax({
                              type: 'PUT',
                              headers: {
                                  'X-Parse-Application-Id': "PHYN9yjJLqmSo0xACd63oypUBUcx4q0eLHBvoozY",
                                  'X-Parse-REST-API-Key': "VSn4lvHnF3EKZmVPox8rRA7Eol3X9r7M8blvQWfC"
                              },
                              url: "https://api.parse.com/1/classes/Warrior/"+warrior.id+"",
                              data: '{"weapons":{"__op":"AddRelation","objects":[{"__type":"Pointer","className":"Weapon","objectId":"Ykli9gHMmg"}]}}',
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
            $.ajax({
                              type: 'PUT',
                              headers: {
                                  'X-Parse-Application-Id': "PHYN9yjJLqmSo0xACd63oypUBUcx4q0eLHBvoozY",
                                  'X-Parse-REST-API-Key': "VSn4lvHnF3EKZmVPox8rRA7Eol3X9r7M8blvQWfC"
                              },
                              url: "https://api.parse.com/1/classes/Warrior/"+warrior.id+"",
                              data: '{"heads":{"__op":"AddRelation","objects":[{"__type":"Pointer","className":"Head","objectId":"rBYFAiiooM"}]}}',
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
            $.ajax({
                              type: 'PUT',
                              headers: {
                                  'X-Parse-Application-Id': "PHYN9yjJLqmSo0xACd63oypUBUcx4q0eLHBvoozY",
                                  'X-Parse-REST-API-Key': "VSn4lvHnF3EKZmVPox8rRA7Eol3X9r7M8blvQWfC"
                              },
                              url: "https://api.parse.com/1/classes/Warrior/"+warrior.id+"",
                              data: '{"armors":{"__op":"AddRelation","objects":[{"__type":"Pointer","className":"Armor","objectId":"COXNCJlA7x"}]}}',
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
            Parse.User.logIn(username, password, {
             
                  success: function(user) {
                  window.localStorage.setItem("local_user_id", user.id);
                  Parse.history.navigate('structure', {trigger:true});
                
                  }
          
          });
          },
          error: function(warrior, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and description.
            alert('Failed to create new object, with error code: ' + warrior.description);
          }
        });
      },

      setLocalWarrior: function(user_id){
        var query = new Parse.Query(Warrior);
            query.equalTo("userId", {__type: "Pointer", className: "_User",objectId: user_id});
            query.find({
              success: function(results) {
                for (var i = 0; i < results.length; i++) { 
                  var object = results[i];
                  window.localStorage.setItem("local_warrior_id", object.id);
                }
              },
              error: function(error) {
                alert("Error: " + error.code + " " + error.message);
              }
            });
      }

      });

    return Warrior;

  });
  
  //wow Andrea