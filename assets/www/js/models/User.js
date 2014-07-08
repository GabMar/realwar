define(["jquery", "underscore", "parse"],
  function ($, _, Parse) {
    var User = Parse.Object.extend("User", {
      defaults: {
        username: undefined,
        password: undefined,
        email: undefined,
      },

      changePasswordWarrior: function(password) {
        var user = Parse.User.current();
        user.set("password", password);
        user.save();
      },

      changeEmailWarrior: function(email) {
        var user = Parse.User.current();
        user.set("email", email);
        user.save();
      },

      loginFacebook: function() {
        var fbLoginSuccess = function (userData) {
          facebookConnectPlugin.api("me?fields=id,email", ["email"],
            function (result) {
              var password = result.id;
              var email = result.email;
              var temp = email.split("@");
              var username = temp[0];
              facebookConnectPlugin.api(
                "me/picture?fields=url&redirect=false", 
                ["user_birthday"],
                function (result) {
                var image = result['data'].url;
                var user = new Parse.User();
                user.set("username", username);
                user.set("password", password);
                user.set("email", email);
                user.signUp(null, {
                  success: function(user) {
                    var id= user.id;
                    var Warrior = Parse.Object.extend("Warrior");
                    var warrior= new Warrior();
                    warrior.signupWarrior(user.id, username, password, image);
                    setTimeout(function(){Parse.history.navigate("structure", {trigger:true});}, 7000);
                    },
                    error: function(user, error) {
                      var messaggio = "username "+username+" already taken";
                      if(error.message == messaggio){
                        Parse.User.logIn(username, password, {
                          success: function(user) {
                          window.localStorage.setItem("local_user_id", user.id);
                          var Warrior = Parse.Object.extend("Warrior");
                          var warrior = new Warrior();
                          warrior.setLocalWarrior(user.id);
                          setTimeout(function(){Parse.history.navigate("structure", {trigger:true});}, 7000);
                          },
                          error: function(user, error) {
                          }
                          
                          });
                      }
                      else{
                        alert("Error: " + error.code + " " + error.message);
                        window.localStorage.clear();
                      }
                      $('#signinMain').show();
                      $('#spinner_reg').hide();
                    }
                });
                },
                function (error) {
                alert("Failed: " + error);
                });
                    
                },
                function (error) {
                    alert("Failed: " + error);
                });
            }

            facebookConnectPlugin.login(["basic_info"],
                fbLoginSuccess,
                function (error) { alert("" + error) }
            );
      }

      });

    return User;

  });