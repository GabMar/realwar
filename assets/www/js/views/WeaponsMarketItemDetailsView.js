define(["jquery", "underscore", "parse", "handlebars", "text!templates/weapons-market-item-details.html"],
    function ($, _, Parse, Handlebars, template) {

    var UsView = Parse.View.extend({

      tagName: "div",
      id: "adDetails",

        events: {
          "touchend #buyItem": "buyItem",
          "touchend #back": "goBack"
        },

        buyItem: function () {
          /*Dentro questa funzione va il codice per acquistare un'arma
          che poi dovrà aggiornare il modello in locale e quello sul server*/
        },

        goBack: function () { //non possiamo mettere direttamente "market" perchè quando stiamo vedendo i dettagli di un'arma in "market" ci siamo già, perciò non farebbe niente
          Parse.history.navigate("", {trigger: true});
          Parse.history.navigate("market", {trigger: true});
        },

        template: Handlebars.compile(template),

        render: function (eventName) {
          $(this.el).html(this.template(this.model.toJSON()));
          return this;
        }
      });

    return UsView;

  });