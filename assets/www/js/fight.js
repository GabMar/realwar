function fight(enemy){

    var weaponClass = Parse.Object.extend("Weapon");
    var headClass = Parse.Object.extend("Head");
    var armorClass = Parse.Object.extend("Armor");
   
    var queryWeapon = new Parse.Query(weaponClass);
    var queryHead = new Parse.Query(headClass);
    var queryArmor = new Parse.Query(armorClass);

    queryWeapon.get(enemy.get("weapon").id, {
        success: function(weapon) {
           window.localStorage.setItem("enemyWeapon",JSON.stringify(weapon));
        }
    });

    queryHead.get(enemy.get("head").id, {
        success: function(head) {
           window.localStorage.setItem("enemyHead",JSON.stringify(head));
        }
    });

    queryArmor.get(enemy.get("armor").id, {
        success: function(armor) {
           window.localStorage.setItem("enemyArmor",JSON.stringify(armor));
        }
    });


    var enemyWeapon = JSON.parse(window.localStorage.getItem("enemyWeapon"));
    var enemyHead = JSON.parse(window.localStorage.getItem("enemyHead"));
    var enemyArmor = JSON.parse(window.localStorage.getItem("enemyArmor"));

    /*window.localStorage.removeItem("enemyWeapon");
    window.localStorage.removeItem("enemyHead");
    window.localStorage.removeItem("enemyArmor");*/


    var myWeapon = JSON.parse(window.localStorage.getItem("weapon"));
    var myHead = JSON.parse(window.localStorage.getItem("head"));
    var myArmor = JSON.parse(window.localStorage.getItem("armor"));

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

    var round = 1;
    var firstShooter;
    var roundResults = new Array();
    var result = "Prova";

  
    while(myLife>0 || enemyLife>0){

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

                myDamage = myAttack - Math.floor(enemyDefense/10);

                if(myDamage > 0){
                    enemyLife = enemyLife - myDamage;
                }

                //L'avversario risponde al fuoco solamente se rimane in vita
                if(enemyLife > 0){

                    eDamage = enemyAttack - Math.floor(myDefense/10);

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

                eDamage = enemyAttack - Math.floor(myDefense/10);

                if(eDamage > 0){
                    myLife = myLife - eDamage;
                }

                if(myLife > 0){
                    
                    myDamage = myAttack - Math.floor(enemyDefense/10);

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

                myDamage = myAttack - Math.floor(enemyDefense/10);

                if(myDamage > 0){
                    enemyLife = enemyLife - myDamage;
                }

                //L'avversario risponde al fuoco solamente se rimane in vita
                if(enemyLife > 0){

                    eDamage = enemyAttack - Math.floor(myDefense/10);

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

                eDamage = enemyAttack - Math.floor(myDefense/10);

                if(eDamage > 0){
                    myLife = myLife - eDamage;
                }

                if(myLife > 0){
                    
                    myDamage = myAttack - Math.floor(enemyDefense/10);

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

        result = "You Kill "+enemy.get("nick")+"!";
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
    }

    // --------------------------------------
    //Vince l'avversario, guadagna exp
    // --------------------------------------
    else{

        result = "You Are Death!";
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