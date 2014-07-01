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
      }

      });

    return User;

  });