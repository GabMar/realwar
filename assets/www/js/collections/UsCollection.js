define(["jquery", "underscore", "parse", "models/User"],
    function ($, _, Parse, User) {

    var UsCollection = Parse.Collection.extend({
        model: User
      });

    return UsCollection;

  });