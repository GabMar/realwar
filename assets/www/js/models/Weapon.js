define(["jquery", "underscore", "parse"],
  function ($, _, Parse) {
    var Weapon = Parse.Object.extend("Weapon", {
      defaults: {
      	name: undefined,
      	range: undefined,
      	attack: 0,
      	figure: undefined,
        cost: 0
      }

      });

    return Weapon;

  });