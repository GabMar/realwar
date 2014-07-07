define(["jquery", "underscore", "parse", "handlebars", "text!templates/fight/combatloose.html","text!templates/fight/combatwon.html","text!templates/fight/combatwonlevel.html","text!templates/fight/combattie.html","text!templates/fight/combattielevel.html","text!templates/fight/combatnone.html"],
    function ($, _, Parse, Handlebars, templateloose,templatewon,templatewonlevel,templatetie,templatetielevel,templatenone) {

    var FightView = Parse.View.extend({

      tagName: "div",
      id: "infoResult",
      self:undefined,
      esito:undefined,
      XpEarned:undefined,
      coinsEarned:undefined,
      nick:undefined,
      newlevel:undefined,
      template: undefined,

      initialize: function (esito,XpEarned,coinsEarned,nick,newlevel) {
          self=this;
          self.esito=esito;
          switch(esito){
            case "loose":
              self.XpEarned=XpEarned;
              self.template=Handlebars.compile(templateloose);
              break;
            case "won":
              self.XpEarned=XpEarned;
              self.template=Handlebars.compile(templatewon);
              self.coinsEarned=coinsEarned;
              self.nick=nick;
              break;
            case "wonlevel":
              self.XpEarned=XpEarned;
              self.template=Handlebars.compile(templatewon);
              self.coinsEarned=coinsEarned;
              self.nick=nick;
              self.newlevel=newlevel;
              break;
            case "tie":
              self.XpEarned=XpEarned;
              self.template=Handlebars.compile(templatetie);
              self.coinsEarned=coinsEarned;
              self.nick=nick;
              break;
            case "tielevel":
              self.XpEarned=XpEarned;
              self.template=Handlebars.compile(templatewon);
              self.coinsEarned=coinsEarned;
              self.nick=nick;
              self.newlevel=newlevel;
              break;
            case "none":
              self.template=Handlebars.compile(templatenone);
              break;


          }
         
        },
        

        render: function (eventName) {
        vector=[];
        
        switch(self.esito){
            case "loose":
              vector["XpEarned"]=self.XpEarned;
              break;
            case "won":
              vector["XpEarned"]=self.XpEarned;
              vector["coinsEarned"]=self.coinsEarned;
              vector["nick"]=self.nick;
              break;
            case "wonlevel":
              vector["XpEarned"]=self.XpEarned;
              vector["coinsEarned"]=self.coinsEarned;
              vector["nick"]=self.nick;
              vector["newlevel"]=self.newlevel;
              break;
            case "tie":
              vector["XpEarned"]=self.XpEarned;
              vector["coinsEarned"]=self.coinsEarned;
              vector["nick"]=self.nick;
              break;
            case "tielevel":
              vector["XpEarned"]=self.XpEarned;
              vector["coinsEarned"]=self.coinsEarned;
              vector["nick"]=self.nick;
              vector["newlevel"]=self.newlevel;
              break;
            case "none":
              break;

            }


        $(this.el).html(this.template(vector));
        return this;
        }
      });

    return FightView;

  });