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

                if(myLife > 0){
                    
                    var myDamage = myAttack - Math.floor(enemyDefense/10);

                    if(myDamage > 0){
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

                if(myLife > 0){
                    
                    var myDamage = myAttack - Math.floor(enemyDefense/10);

                    if(myDamage > 0){
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
    if(myLife > 0){

        myKills++;
        enemyDeaths++;
        myCoins = myCoins + Math.floor(enemyLevel/2);

        if(myLevel > enemyLevel){

            myExp = myExp + enemyLevel*myLevel;

        }
        else if(myLevel == enemyLevel){

            myExp = myExp + 100*myLevel;
        }

        else{

            myExp = myExp + 100*myLevel*enemyLevel;
        }

        result = "<h1>You Kill "+enemy.get("nick")+"!</h1><p>XP earned: "+myExp+"</p><p>Coins earned: "+myCoins+"</p>";
    }

    // --------------------------------------
    //Vince l'avversario, guadagna exp
    // --------------------------------------
    else if (enemyLife>0){
        enemyKills++;
        myDeaths++;

        if(enemyLevel > myLevel){

            enemyExp = enemyExp + enemyLevel*myLevel;

        }
        else if(myLevel == enemyLevel){

            enemyExp = enemyExp + 100*enemyLevel;
        }

        else{

            enemyExp = enemyExp + 100*myLevel*enemyLevel;
        }

        result = "<h1>You Are Death!</h1><p>You earned no XP and no coins!</p>";
    }

    else {
        result="<h1>Parità</h1>"+"<p>"+myLife+"</p><p>"+enemyLife+"</p>";
    }

    // --------------------------------------
    //Aggiorniamo il database
    // --------------------------------------

    // --------------------------------------
    //Presentiamo i risultati
    // --------------------------------------
    $('#infoFight').show(100);
    $('#popupWarrior').hide(100);
    $('#infoResult').empty();
    $('#infoResult').append("<h1>"+result+"</h1>");
};