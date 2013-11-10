define(["jquery", "underscore", "parse"],
  function ($, _, Parse) {
    var Warrior = Parse.Object.extend("Warrior", {
      defaults: {
      	nick: undefined,
      	password: undefined,
      	email: undefined,
		coins: undefined,
      	life: 100,
      	figure: undefined,
        position: undefined,
        level: 0,
        xp: 0,
		kills:0,
		deaths:0,
        weapon: undefined,
        weapons: undefined
      }

      });

    return Warrior;

  });