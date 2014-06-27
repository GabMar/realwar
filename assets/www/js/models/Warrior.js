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