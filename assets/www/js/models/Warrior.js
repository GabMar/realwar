define(["jquery", "underscore", "parse"],
  function ($, _, Parse) {
    var Warrior = Parse.Object.extend("Warrior", {
      defaults: {
        nick: undefined,
        password: undefined,
        email: undefined,
        coins: 10,
        life: 100,
        image: undefined,
        position: undefined,
        level: 1,
        xp: 0,
        kills:0,
        deaths:0,
        weapon: undefined,
        weapons: undefined,
        head: undefined,
        heads: undefined,
        armor: undefined,
        armors: undefined,
        gpsId: undefined,   // andrebbero inseriti e utilizzati, salvando il model
        watchId: undefined
      },

      signupWarrior: function(id, username, password, image) {
        this.set("nick", username);
        this.set("image", image);
        this.set("userId", {__type: "Pointer", className: "_User",objectId: id});
        var point = new Parse.GeoPoint({latitude: 40.0, longitude: -30.0});
        this.set("position", point);
        var id_wep = "NolqCh0kmx";
        var id_he = "Z87hfdZpQb";
        var id_ar = "TkEbud8xlf";
        this.set("weapon", {__type: "Pointer", className: "Weapon",objectId: id_wep});
        this.set("head", {__type: "Pointer", className: "Head", objectId: id_he});
        this.set("armor", {__type: "Pointer", className: "Armor", objectId: id_ar});

         
        this.save(null, {
          success: function(warrior) {
            window.localStorage.setItem("local_warrior_id", warrior.id);
            $.ajax({
                              type: 'PUT',
                              headers: {
                                  'X-Parse-Application-Id': "PHYN9yjJLqmSo0xACd63oypUBUcx4q0eLHBvoozY",
                                  'X-Parse-REST-API-Key': "VSn4lvHnF3EKZmVPox8rRA7Eol3X9r7M8blvQWfC"
                              },
                              url: "https://api.parse.com/1/classes/Warrior/"+warrior.id+"",
                              data: '{"weapons":{"__op":"AddRelation","objects":[{"__type":"Pointer","className":"Weapon","objectId":"'+id_wep+'"}]}}',
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
                              data: '{"heads":{"__op":"AddRelation","objects":[{"__type":"Pointer","className":"Head","objectId":"'+id_he+'"}]}}',
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
                              data: '{"armors":{"__op":"AddRelation","objects":[{"__type":"Pointer","className":"Armor","objectId":"'+id_ar+'"}]}}',
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
              //alert(JSON.stringify(object.updatedAt));
              queryWeapon.get(object.get("weapon").id, {
              success: function(weapon) {
                  window.localStorage.setItem("weapon",JSON.stringify(weapon)); 
                  //self.model.set("coins", warrior.get("coins"));
                  //self.model.save();             
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
        queryWeapon.get("NolqCh0kmx", {
              success: function(weapon) {
                  window.localStorage.setItem("weapon",JSON.stringify(weapon));
                  self.model.set("coins", warrior.get("coins"));
                  self.model.save();
              },
              error:function(object,error){
                alert("Errore1: "+error);
              }
              });

        queryHead.get("Z87hfdZpQb", {
              success: function(head) {
                window.localStorage.setItem("head",JSON.stringify(head));
              },
              error:function(object,error){
                alert("Errore2: "+error);
              }
               });
            
        queryArmor.get("TkEbud8xlf", {
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
      },

      setWarriorAfterFight: function (user_id, life, level, xp, coins, kills, deaths, esito){

        var query = new Parse.Query(Warrior);
        query.equalTo("userId", {__type: "Pointer", className: "_User",objectId: user_id});

        query.find({

          success: function(results){
            var object = results[0];
            object.set("life", life);
            object.set("level", level);
            object.set("xp", xp);
            object.set("coins", coins);
            object.set("kills", kills);
            object.set("deaths",deaths);
            object.save();

            if(user_id == window.localStorage.getItem("local_user_id")){
              window.localStorage.setItem("warrior",JSON.stringify(object));
            }
            else{
              var pushQuery = new Parse.Query(Parse.Installation);
              //pushQuery.equalTo('channels', '[Salx]');
              pushQuery.equalTo('owner', {__type: "Pointer", className: "_User",objectId: user_id});
               
              //Send push notification to query
              Parse.Push.send({
                where: pushQuery,
                data: {
                  alert: esito
                }
              });
            }
          },

          error: function(error){
            alert("Failed to save warrior after fighting.");
          }
        });
      },

      updateLife: function(user_id) {

        var query = new Parse.Query(Warrior);
        query.equalTo("userId", {__type: "Pointer", className: "_User",objectId: user_id});

        query.find({

          success: function(results){
            var object = results[0];
            var life = object.get('life');
            if(life < 100){
            object.set("life", life + 5);
            $('.progress').attr('value', life + 5);
            object.save();
            window.localStorage.setItem("warrior",JSON.stringify(object));
          }
          },

          error: function(error){
            alert("Failed to update warrior life.");
          }
        });
        
        

      }

      });

    return Warrior;

  });
  