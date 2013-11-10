define(["jquery", "underscore", "parse"],
  function ($, _, Parse) {
    var Helmet = Parse.Object.extend("Helmet", {
      defaults: {
      	name: undefined,
      	defense: 0,
      	figure: undefined,
        cost: 0
      }

      });

    return Helmet;

  });