define(["jquery", "underscore", "parse"],
  function ($, _, Parse) {
    var Armor = Parse.Object.extend("Armor", {
      defaults: {
      	name: undefined,
      	defense: 0,
        cost: 0
      }

      });

    return Armor;

  });