define(["jquery", "underscore", "parse"],
  function ($, _, Parse) {
    var Head = Parse.Object.extend("Head", {
      defaults: {
      	name: undefined,
      	defense: 0,
        cost: 0
      }

      });

    return Head;

  });