function fight(enemy, enemyWeapon, enemyHead, enemyArmor, myWeapon, myHead, myArmor){

    var myLife = self.model.life;
    var myLevel = self.model.level;
    var myExp = self.model.xp;
    var myCoins = self.model.coins;
    var myKills = self.model.kills;
    var myDeaths = self.model.deaths;
    var myAttack = myWeapon.attack;
    var myDefense = myHead.defense+myArmor.defense;
    var myRange = myHead.range;
    var XPEarned = 0;
    var coinsEarned = 0;

    var enemyLife = enemy.get("life");
    var enemyLevel = enemy.get("level");
    var enemyExp = enemy.get("xp");
    var enemyKills = enemy.get("kills");
    var enemyDeaths = enemy.get("deaths");
    var enemyAttack = enemyWeapon.attack;
    var enemyDefense = enemyHead.defense+enemyArmor.defense;
    var enemyRange = enemyHead.range;

    window.localStorage.removeItem("enemyWeapon");
    window.localStorage.removeItem("enemyHead");
    window.localStorage.removeItem("enemyArmor");

    var round = 1;
    var firstShooter = 0;
    var roundResults = new Array();
    var result = "";
  
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

                //L'avversario risponde al fuoco solamente se rimane in vita
                if(enemyLife > 0){

                    var eDamage = enemyAttack - Math.floor(myDefense/10);

                    if(eDamage > 0){
                        myLife = myLife - eDamage;
                    }

                    roundResults[round] = "<h1>Round 1</h1><p>You shoots "+enemy.get("nick")+" for "+myDamage+" damage.<p>"+
                                          "<p>"+enemy.get("nick")+" responds to fire and causes to you "+eDamage+" damage.</p>";
                    round++;
                }

                else{
                    roundResults[round] = "<h1>Round 1</h1><p>Headshot on "+enemy.get("nick")+" for "+myDamage+" damage.<p>";
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

                if(myLife > 0){
                    
                    var myDamage = myAttack - Math.floor(enemyDefense/10);

                    if(myDamage > 0){
                        enemyLife = enemyLife - myDamage;
                    }

                    roundResults[round] = "<h1>Round 1</h1><p>"+enemy.get("nick")+" shoots you for "+eDamage+" damage.<p>"+
                                          "<p>You respond to fire and cause to "+enemy.get("nick")+" "+myDamage+" damage.</p>";
                    round++;

                }

                else{
                    roundResults[round] = "<h1>Round 1</h1><p>Headshot on you for "+myDamage+" damage.<p>";
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

                var myDamage = myAttack - Math.floor(enemyDefense/10);

                if(myDamage > 0){
                    enemyLife = enemyLife - myDamage;
                }

                //L'avversario risponde al fuoco solamente se rimane in vita
                if(enemyLife > 0){

                    var eDamage = enemyAttack - Math.floor(myDefense/10);

                    if(eDamage > 0){
                        myLife = myLife - eDamage;
                    }

                    if(myLife > 0){
                        roundResults[round] = "<h1>Round "+round+"</h1><p>You runs to te right and shoots "+enemy.get("nick")+"'s leg for "+myDamage+" damage.<p>"+
                                              "<p>"+enemy.get("nick")+" covered himself behind a wall and with a rapid fire causes to you "+eDamage+" damage.</p>"; 
                    }
                    else{
                        roundResults[round] = "<h1>Round "+round+"</h1><p>You runs to te right and shoots "+enemy.get("nick")+"'s heart for "+myDamage+" damage.<p>"+
                                          "<p>"+enemy.get("nick")+" covered himself behind a wall and with a rapid fire causes to you "+eDamage+" damage.</p>";
                    }
                    round++;
                }

                else{
                    roundResults[round] = "<h1>Round "+round+"</h1><p>You runs to te right and shoots "+enemy.get("nick")+"'s heart for "+myDamage+" damage.<p>";
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

                if(myLife > 0){
                    
                    var myDamage = myAttack - Math.floor(enemyDefense/10);

                    if(myDamage > 0){
                        enemyLife = enemyLife - myDamage;
                    }
                    roundResults[round] = "<h1>Round "+round+"</h1><p>"+enemy.get("nick")+" shoots you for "+eDamage+" damage.<p>"+
                                          "<p>You respond to fire and cause to "+enemy.get("nick")+" "+myDamage+" damage.</p>";
                    round++;

                }

                else{
                    roundResults[round] = "<h1>Round "+round+"</h1><p>Headshot on you for "+myDamage+" damage.<p>";
                    round++;
                }
            }
        }

    }
    //Fine combattimento


    // --------------------------------------
    //Vince il giocatore, guadagna exp e coins
    // --------------------------------------
    if(myLife > 0){

        myKills++;
        enemyDeaths++;
        coinsEarned = Math.floor(enemyLevel/2);
        myCoins = myCoins + coinsEarned;

        if(myLevel > enemyLevel){

            XPEarned = enemyLevel*myLevel;

        }
        else if(myLevel == enemyLevel){

            XPEarned = 50*myLevel;
        }

        else{

            XPEarned = 50*myLevel*enemyLevel;
        }

        myExp = myExp + XPEarned;

        var newLevel = myLevel;

        while(myExp >= newLevel*150){
            newLevel++;
        }

        result = "<h1>You Kill "+enemy.get("nick")+"</h1><p>XP earned: "+XPEarned+"</p><p>Coins earned: "+coinsEarned+"</p>";
        if(newLevel>myLevel){
            result = result+"<h2>Level "+newLevel+"</h2>";
        }
    }

    // --------------------------------------
    //Vince l'avversario, il giocatore non guadagna nulla
    // --------------------------------------
    else if (enemyLife>0){
        enemyKills++;
        myDeaths++;
        result = "<h1>You Are Death</h1><p>You earned no XP and no coins</p>";
    }

    // --------------------------------------
    //Parità, il giocatore guadagna una parte di XP
    // --------------------------------------
    else {
        if(myLevel > enemyLevel){
            XPEarned = Math.floor((enemyLevel*myLevel)/2);
        }
        myExp = myExp + XPEarned;

        coinsEarned = 0;
        
        var newLevel = myLevel;
        while(myExp >= newLevel*150){
            newLevel++;
        }

        result="<h1>Parità</h1><p>XP earned: "+XPEarned+"</p><p>Coins earned: "+coinsEarned+"</p>";
        if(newLevel>myLevel){
            result = result+"<h2>Level "+newLevel+"!</h2>";
        }
    }

    // --------------------------------------
    //Aggiorniamo il database
    // --------------------------------------

    // --------------------------------------
    //Presentiamo i risultati
    // --------------------------------------

    var currentRound = 1;

    $('#previousRound').hide();

    $('#infoFight').show(100);
    $('#popupWarrior').hide(100);
    $('#infoResult').empty();
    $('#showRound').empty();
    $('#infoResult').append("<h1>"+result+"</h1>");
    $('#showRound').append(roundResults[1]);

    $('#nextRound').on('mousedown', function() {
        $('#showRound').empty();
        $('#showRound').append(roundResults[currentRound+1]);
        currentRound++;
        if(currentRound == 1){
            $('#previousRound').hide();
        }
        else if(currentRound == (round-1)){
            $('#nextRound').hide();
        }
        else if(currentRound > 1){
            $('#previousRound').show();
        }
    });

    $('#previousRound').on('mousedown', function() {
        $('#showRound').empty();
        $('#showRound').append(roundResults[currentRound-1]);
        currentRound--;
        if(currentRound == 1){
            $('#previousRound').hide();
        }
        else if(currentRound == (round-1)){
            $('#nextRound').hide();
        }

        else if(currentRound < (round-1)){
            $('#nextRound').show();
        }
    });


};

function checkLevel(exp, level){

    var newLevel = level;

    while(exp >= newLevel*150){
        newLevel++;
    }


    return newLevel;
};