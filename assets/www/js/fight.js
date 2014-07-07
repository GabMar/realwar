function fight(enemy, enemyWeapon, enemyHead, enemyArmor, myWeapon, myHead, myArmor){

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
    var result = "";
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

                    roundResults[round] = "<h1>Round 1</h1><p>"+enemy.get("nick")+" shoots you for "+eDamage+" damage.<p>"+
                                          "<p>You respond to fire and cause to "+enemy.get("nick")+" "+myDamage+" damage.</p>";
                    round++;

                }

                else{
                    roundResults[round] = "<h1>Round 1</h1><p>Headshot on you for "+eDamage+" damage.<p>";
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

                    if((round%2) == 0){
                        roundResults[round] = "<h1>Round "+round+"</h1><p>You runs to te right and shoots "+enemy.get("nick")+"'s leg for "+myDamage+" damage.<p>"+
                                              "<p>"+enemy.get("nick")+" covered himself behind a wall and with a rapid fire causes to you "+eDamage+" damage.</p>"; 
                    }

                    else{
                        roundResults[round] = "<h1>Round "+round+"</h1><p>You jump on a car and explode three shots to "+enemy.get("nick")+"'s for "+myDamage+" damage.<p>"+
                                      "<p>"+enemy.get("nick")+" gets away from you seen. He's in a near build and with his gun causes to you "+eDamage+" damage.</p>";
                    }
                    
                    round++;
                }

                else{
                    roundResults[round] = "<h1>Round "+round+"</h1><p>With a perfect shots you strike "+enemy.get("nick")+"'s heart for "+myDamage+" damage.<p>";
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

                    if((round%2) == 0){
                        roundResults[round] = "<h1>Round "+round+"</h1><p>"+enemy.get("nick")+" covered himself behind a wall and with a rapid fire causes to you "+eDamage+" damage.</p>"+
                                              "<p>You runs to te right and shoots "+enemy.get("nick")+"'s leg for "+myDamage+" damage.<p>";
                    }
                    else{
                        roundResults[round] = "<h1>Round "+round+"</h1><p>"+enemy.get("nick")+" gets away from you seen. He's in a near build and with his gun causes to you "+eDamage+" damage.</p>"+
                                              "<p>You jump on a car and explode three shots to "+enemy.get("nick")+"'s for "+myDamage+" damage.<p>";
                    }
                    round++;

                }

                else{
                    roundResults[round] = "<h1>Round "+round+"</h1><p>You've been striken on your heart for "+eDamage+" damage.<p>";
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
        XPEarned = 5*enemyLevel;
        myExp = myExp + XPEarned;
        esito = self.model.nick+" attack! You kill him!";
        myLife = 0;
        result = "<h1>You Are Dead</h1><p>XP earned: "+XPEarned+"</p><p>Coins earned: 0</p>";
    }

    else if(enemyLifeBefore == 0){
        esito = self.model.nick+" has found you body on the floor."
        result = "<h1>"+enemy.get("nick")+" Is Already Dead</h1>";
        roundResults[1] = "<p>Your enemy lies on the asphalt in a river of blood.</p>";
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

        result="<h1>"+enemy.get("nick")+" Runs Away</h1><p>XP earned: "+XPEarned+"</p><p>Coins earned: "+coinsEarned+"</p>";
        if(newLevel>myLevel){
            result = result+"<h2>Level "+newLevel+"!</h2>";
        }
    }

    // --------------------------------------
    //Aggiorniamo il database
    // --------------------------------------

    var Warrior = Parse.Object.extend("Warrior");
    var warrior = new Warrior();
    warrior.setWarriorAfterFight(window.localStorage.getItem('local_user_id'), myLife, newLevel, myExp, myCoins, myKills, myDeaths, esito);
    warrior.setWarriorAfterFight(enemy.get("userId").id, enemyLife, enemyLevel, enemyExp, enemyCoins, enemyKills, enemyDeaths, esito); 

    // --------------------------------------
    //Presentiamo i risultati
    // --------------------------------------

    var currentRound = 1;

    var description = new Array();
    description[0] = "<p>You notice an enemy warrior on the left, it's time to fight.</p>";
    description[1] = "<p>You're been uncovered, but thanks to your expertise you succeed to start fire.</p>";
    description[2] = "<p>You are ready to shoot, but your enemy is very fast and opens fire against you.</p>";

    if(round != 1){
    roundResults[1] = description[firstShooter]+roundResults[1];
    }

    $('#previousRound').hide();

    $('#infoFight').show(100);
    $('#popupWarrior').hide(100);
    $('#infoResult').empty();
    $('#showRound').empty();
    $('#infoResult').append("<h1>"+result+"</h1>");
    $('#showRound').append(roundResults[1]);

    if(round == 1){
        $('#nextRound').hide();
    }
    else{
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
    }

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