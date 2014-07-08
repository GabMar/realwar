define(["jquery", "underscore", "parse", "handlebars", "text!templates/fight/combatloose.html","text!templates/fight/combatwon.html","text!templates/fight/combatwonlevel.html","text!templates/fight/combattie.html","text!templates/fight/combattielevel.html","text!templates/fight/combatnone.html"],
    function ($, _, Parse, Handlebars, templateloose,templatewon,templatewonlevel,templatetie,templatetielevel,templatenone) {

    var FightView = Parse.View.extend({

      tagName: "div",
      id: "infoResultBig",
      me:undefined,
      esito:undefined,
      XpEarned:undefined,
      coinsEarned:undefined,
      nick:undefined,
      newlevel:undefined,
      template: undefined,

      initialize: function (esito,XpEarned,coinsEarned,nick,enemyWeapon,newlevel) {
          me=this;
          me.esito=esito;
          switch(esito){
            case "loose":
              me.XpEarned=XpEarned;
              me.template=Handlebars.compile(templateloose);
              break;
            case "looselevel":
              me.XpEarned=XpEarned;
              me.template=Handlebars.compile(templateloose);
              me.newlevel=newlevel;
              break;
            case "won":
              me.XpEarned=XpEarned;
              me.template=Handlebars.compile(templatewon);
              me.coinsEarned=coinsEarned;
              me.nick=nick;
              break;
            case "wonlevel":
              me.XpEarned=XpEarned;
              me.template=Handlebars.compile(templatewon);
              me.coinsEarned=coinsEarned;
              me.nick=nick;
              me.newlevel=newlevel;
              break;
            case "tie":
              me.XpEarned=XpEarned;
              me.template=Handlebars.compile(templatetie);
              me.coinsEarned=coinsEarned;
              me.nick=nick;
              break;
            case "tielevel":
              me.XpEarned=XpEarned;
              me.template=Handlebars.compile(templatewon);
              me.coinsEarned=coinsEarned;
              me.nick=nick;
              me.newlevel=newlevel;
              break;
            case "none":
              me.template=Handlebars.compile(templatenone);
              me.nick=nick;
              break;


          }
         
        },
        

        render: function (eventName) {
        vector=[];
        
        switch(me.esito){
            case "loose":
              vector["XpEarned"]=me.XpEarned;
              break;
            case "looselevel":
              vector["XpEarned"]=me.XpEarned;
              vector["newlevel"]=me.newlevel;
            case "won":
              vector["XpEarned"]=me.XpEarned;
              vector["coinsEarned"]=me.coinsEarned;
              vector["nick"]=me.nick;
              break;
            case "wonlevel":
              vector["XpEarned"]=me.XpEarned;
              vector["coinsEarned"]=me.coinsEarned;
              vector["nick"]=me.nick;
              vector["newlevel"]=me.newlevel;
              break;
            case "tie":
              vector["XpEarned"]=me.XpEarned;
              vector["coinsEarned"]=me.coinsEarned;
              vector["nick"]=me.nick;
              break;
            case "tielevel":
              vector["XpEarned"]=me.XpEarned;
              vector["coinsEarned"]=me.coinsEarned;
              vector["nick"]=me.nick;
              vector["newlevel"]=me.newlevel;
              break;
            case "none":
              vector["nick"]=me.nick;
              break;

            }

        $(this.el).html(this.template(vector));
        $('#toMap').on('click', function(){
                $('#infoFight').hide();
            });
        return this;
        }
      });

    return FightView;

  });