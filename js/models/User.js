define(["jquery", "underscore", "parse"],
  function ($, _, Parse) {
    var User = Parse.Object.extend("User", {
      defaults: {
      	name: undefined,
      	surname: undefined,
      	figure: undefined,
      	position: undefined,
      }

      });

    return User;

  });