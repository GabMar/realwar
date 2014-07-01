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

                                  console.log(jqXHR);
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

                                  console.log(jqXHR);
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

                                  console.log(jqXHR);
                                },

                                error: function (jqXHR, status) {
                                   // error handler
                                   console.log(jqXHR);
                                }
                    });
            window.localStorage.setItem("warrior",JSON.stringify(warrior));
            warrior.setLocalWarriorReg(warrior.id);

            Parse.User.logIn(username, password, {
             
                  success: function(user) {
                  window.localStorage.setItem("local_user_id", user.id);
                  var Warrior = Parse.Object.extend("Warrior");
                  var warrior = new Warrior();
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
        var weaponClass = Parse.Object.extend("Weapon");
        var headClass = Parse.Object.extend("Head");
        var armorClass = Parse.Object.extend("Armor");
        var queryWeapon = new Parse.Query(weaponClass);
        var queryHead = new Parse.Query(headClass);
        var queryArmor = new Parse.Query(armorClass);
        query.equalTo("userId", {__type: "Pointer", className: "_User",objectId: user_id});
        query.find({
          success: function(results) {
            for (var i = 0; i < results.length; i++) { 
              var object = results[i];
              window.localStorage.setItem("local_warrior_id", object.id);
              window.localStorage.setItem("warrior",JSON.stringify(object));
              queryWeapon.get(object.get("weapon").id, {
              success: function(weapon) {
                  window.localStorage.setItem("weapon",JSON.stringify(weapon));
                  self.model.set("coins", warrior.get("coins"));
                  self.model.save();
              },
              error:function(object,error){
                alert("Errore1: "+error);
              }
              });

               queryHead.get(object.get("head").id, {
              success: function(head) {
                window.localStorage.setItem("head",JSON.stringify(head));
              },
              error:function(object,error){
                alert("Errore2: "+error);
              }
               });
            
               queryArmor.get(object.get("armor").id, {
              success: function(armor) {
                window.localStorage.setItem("armor",JSON.stringify(armor));
              },
              error:function(object,error){
                alert("Errore3: "+error);
              }

               });
            }
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });
      },

      setLocalWarriorReg: function(warrior_id){
        var weaponClass = Parse.Object.extend("Weapon");
        var headClass = Parse.Object.extend("Head");
        var armorClass = Parse.Object.extend("Armor");
        var queryWeapon = new Parse.Query(weaponClass);
        var queryHead = new Parse.Query(headClass);
        var queryArmor = new Parse.Query(armorClass);
        queryWeapon.get("Ykli9gHMmg", {
              success: function(weapon) {
                  window.localStorage.setItem("weapon",JSON.stringify(weapon));
                  self.model.set("coins", warrior.get("coins"));
                  self.model.save();
              },
              error:function(object,error){
                alert("Errore1: "+error);
              }
              });

        queryHead.get("rBYFAiiooM", {
              success: function(head) {
                window.localStorage.setItem("head",JSON.stringify(head));
              },
              error:function(object,error){
                alert("Errore2: "+error);
              }
               });
            
        queryArmor.get("COXNCJlA7x", {
              success: function(armor) {
                window.localStorage.setItem("armor",JSON.stringify(armor));
              },
              error:function(object,error){
                alert("Errore3: "+error);
              }

               });
      },

      changeAvatarWarrior: function(user_id, image_change){
        var query = new Parse.Query(Warrior);
        query.equalTo("userId", {__type: "Pointer", className: "_User",objectId: user_id});
        query.find({
          success: function(results) {
            for (var i = 0; i < results.length; i++) { 
              var object = results[i];
              object.set("image", image_change);
              object.save();
              window.localStorage.setItem("warrior",JSON.stringify(object));
            }
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });
      },

      changeUsernameWarrior: function(user_id, username_change){
        var query = new Parse.Query(Warrior);
        query.equalTo("userId", {__type: "Pointer", className: "_User",objectId: user_id});
        query.find({
          success: function(results) {
            for (var i = 0; i < results.length; i++) { 
              var object = results[i];
              object.set("nick", username_change);
              object.save();
              window.localStorage.setItem("warrior",JSON.stringify(object));
            }
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });
        var user = new Parse.Query("User");
        user.equalTo("objectId", user_id);
        user.find({
          success: function(results) {
            for (var i = 0; i < results.length; i++) { 
              var object = results[i];
              object.set("username", username_change);
              object.save();
            }
          },
          error: function(error) {

          }
        });
      }

      });

    return Warrior;

  });
  