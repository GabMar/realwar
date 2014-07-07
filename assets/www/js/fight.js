function fight(enemy, enemyWeapon, enemyHead, enemyArmor, myWeapon, myHead, myArmor,FightView){

    var myLife = self.model.life;
    var myLevel = self.model.level;
    var myExp = self.model.xp;
    var myCoins = self.model.coins;
    var myKills = self.model.kills;
    var myDeaths = self.model.deaths;
    var myAttack = myWeapon.attack;
    var myDefense = myHead.defense+myArmor.defense;
    var myRange = myHead.range+myWeapon.range;
    var XPEarned = 0;
    var coinsEarned = 0;

    var enemyLife = enemy.get("life");
    var enemyLevel = enemy.get("level");
    var enemyExp = enemy.get("xp");
    var enemyCoins = enemy.get("coins");
    var enemyKills = enemy.get("kills");
    var enemyDeaths = enemy.get("deaths");
    var enemyAttack = enemyWeapon.attack;
    var enemyDefense = enemyHead.defense+enemyArmor.defense;
    var enemyRange = enemyHead.range+enemyWeapon.range;
    var enemyLifeBefore = enemyLife;

    window.localStorage.removeItem("enemyWeapon");
    window.localStorage.removeItem("enemyHead");
    window.localStorage.removeItem("enemyArmor");

    var roundResults = new Array();
    var round = 1;
    var firstShooter = 0;
    var esito = "";

    while(myLife>0 && enemyLife>0 && round<50){

        //Primo round del combattimento: si decide chi inizia a sparare e si effettua il primo scontro.
        if(round == 1){

            // --------------------------------------
            //Determino chi comincia a sparare
            // --------------------------------------
            if((myRange+myLevel) < (enemyRange+enemyLevel)){
                firstShooter = 2;
            }

            else if((myRange+myLevel) > (enemyRange+enemyLevel)){
                firstShooter = 1;
            }

            else {
                firstShooter = 0;
            }
            
            // --------------------------------------
            //Comincia a sparare il giocatore
            // --------------------------------------
            if(firstShooter == 0 || firstShooter == 1 ){

                var myDamage = myAttack - Math.floor(enemyDefense/10);

                if(myDamage > 0){
                    enemyLife = enemyLife - myDamage;
                }

                else{
                	myDamage = 1;
                	enemyLife = enemyLife - myDamage;
                }

                //L'avversario risponde al fuoco solamente se rimane in vita
                if(enemyLife > 0){

                    var eDamage = enemyAttack - Math.floor(myDefense/10);

                    if(eDamage > 0){
                        myLife = myLife - eDamage;
                    }

                    else{
	                	eDamage = 1;
	                	myLife = myLife - eDamage;
	                }

                    round++;
                }

                else{

                    round++
                }
            }

            // --------------------------------------
            //Comincia a sparare l'avversario
            // --------------------------------------
            else{

                var eDamage = enemyAttack - Math.floor(myDefense/10);

                if(eDamage > 0){
                    myLife = myLife - eDamage;
                }

                else{
                	eDamage = 1;
                	myLife = myLife - eDamage;
                }

                if(myLife > 0){
                    
                    var myDamage = myAttack - Math.floor(enemyDefense/10);

                    if(myDamage > 0){
                        enemyLife = enemyLife - myDamage;
                    }

                    else{
                    	myDamage = 1;
                    	enemyLife = enemyLife - myDamage;
                    }

                    round++;

                }

                else{

                    round++;
                }
            }

        }

        //Round successivi, il combattimento termina solo quando uno dei due muore
        else {

            // --------------------------------------
            //Comincia a sparare il giocatore
            // --------------------------------------
            if(firstShooter == 0 || firstShooter == 1 ){

                var myDamage = (myAttack - Math.floor(enemyDefense/10)) - Math.floor(myLife/20);

                if(myDamage > 0){
                    enemyLife = enemyLife - myDamage;
                }

                else{
                	myDamage = 1;
                	enemyLife = enemyLife - myDamage;
                }

                //L'avversario risponde al fuoco solamente se rimane in vita
                if(enemyLife > 0){

                    var eDamage = enemyAttack - Math.floor(myDefense/10) - Math.floor(enemyLife/20);

                    if(eDamage > 0){
                        myLife = myLife - eDamage;
                    }

                    else{
                    	eDamage = 1;
                    	myLife = myLife - eDamage;
                    }
                    
                    round++;
                }

                else{
                   
                    round++;
                }
            }

            // --------------------------------------
            //Comincia a sparare l'avversario
            // --------------------------------------
            else{

                var eDamage = enemyAttack - Math.floor(myDefense/10) - Math.floor(enemyLife/20);

                if(eDamage > 0){
                    myLife = myLife - eDamage;
                }

                else{
                    eDamage = 1;
                    myLife = myLife - eDamage;
                }

                if(myLife > 0){
                    
                    var myDamage = myAttack - Math.floor(enemyDefense/10) - Math.floor(myLife/20);

                    if(myDamage > 0){
                        enemyLife = enemyLife - myDamage;
                    }

                    else{
                    	myDamage = 1;
                    	enemyLife = enemyLife - myDamage;
                    }

                    round++;

                }

                else{

                    round++;
                }
            }
        }

    }
    //Fine combattimento

    // --------------------------------------
    //Vince il giocatore, guadagna exp e coins
    // --------------------------------------
    if(myLife > 0 && enemyLifeBefore>0){

        myKills++;
        enemyDeaths++;
        enemyLife = 0;
        coinsEarned = Math.floor(enemyLevel/2);
        esito = "You've been killed by "+self.model.nick+"!";
        
        if(coinsEarned == 0){
            coinsEarned = 1;
        }

        myCoins = myCoins + coinsEarned;

        if(myLevel > enemyLevel){

            XPEarned = 50*enemyLevel;

        }
        else if(myLevel == enemyLevel){

            XPEarned = 50*myLevel;
        }

        else{

            XPEarned = 50*myLevel*enemyLevel;
        }

        myExp = myExp + XPEarned;

        var newLevel = myLevel;

        while(myExp >= (newLevel*150)){
            newLevel++;
        }

        if(newLevel>myLevel){
            fightview=new FightView("won",XPEarned,coinsEarned,enemy.get("nick"),newLevel);
            html= fightview.render().el;
            $('#infoFight').show(100);
            $('#infoResult').empty();
            $('#infoResult').append(html);
        }
        else{
            fightview=new FightView("won",XPEarned,coinsEarned,enemy.get("nick"));
            html= fightview.render().el;
            $('#infoFight').show(100);
            $('#infoResult').empty();
            $('#infoResult').append(html);
        }
    }

    // --------------------------------------
    //Vince l'avversario, il giocatore non guadagna nulla
    // --------------------------------------
    else if (enemyLife>0){
        enemyKills++;
        myDeaths++;
        XPEarned = 5*enemyLevel;
        myExp = myExp + XPEarned;
        esito = self.model.nick+" attack! You kill him!";
        myLife = 0;
        fightview=new FightView("loose",XPEarned);
        html= fightview.render().el;
        $('#infoFight').show(100);
        $('#infoResult').empty();
        $('#infoResult').append(html);
    }

    else if(enemyLifeBefore == 0){
    	fightview=new FightView("none");
        html= fightview.render().el;
        $('#infoFight').show(100);
        $('#infoResult').empty();
        $('#infoResult').append(html);
    }
    // --------------------------------------
    //Parità, il giocatore guadagna una parte di XP
    // --------------------------------------
    else if(enemyLife>0 && myLife>0){

        esito = self.model.nick+" attack! You escape safely.";
        if(myLevel > enemyLevel){
            XPEarned = Math.floor((enemyLevel*myLevel)/2);
        }
        myExp = myExp + XPEarned;

        coinsEarned = 0;
        
        var newLevel = myLevel;
        while(myExp >= newLevel*150){
            newLevel++;
        }

        if(newLevel>myLevel){
            fightview=new FightView("tielevel",XPEarned,coinsEarned,enemy.get("nick"),newLevel);
            html= fightview.render().el;
            $('#infoFight').show(100);
            $('#infoResult').empty();
            $('#infoResult').append(html);
        }
        else{
            fightview=new FightView("tie",XPEarned,coinsEarned,enemy.get("nick"));
            html= fightview.render().el;
            $('#infoFight').show(100);
            $('#infoResult').empty();
            $('#infoResult').append(html);
        }
    }
 
    // --------------------------------------
    //Aggiorniamo il database
    // --------------------------------------
    $('#popupWarrior').hide(100);
    var Warrior = Parse.Object.extend("Warrior");
    var warrior = new Warrior();
    warrior.setWarriorAfterFight(window.localStorage.getItem('local_user_id'), myLife, newLevel, myExp, myCoins, myKills, myDeaths, esito);
    warrior.setWarriorAfterFight(enemy.get("userId").id, enemyLife, enemyLevel, enemyExp, enemyCoins, enemyKills, enemyDeaths, esito); 

};