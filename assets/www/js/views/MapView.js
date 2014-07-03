define(["jquery", "underscore", "parse", "handlebars", "text!templates/map.html", "text!templates/marker-popup.html","models/Warrior", "models/Weapon", "models/Head", "models/Armor",], 
function($, _, Parse, Handlebars, template, popupTemplate,Warrior, Weapon, Head, Armor) {

    var MapView = Parse.View.extend({

        tagName: "div",
        id: "map",
        model: Warrior,
        self:undefined,
        template: Handlebars.compile(template),
        popupTemplate: Handlebars.compile(popupTemplate),


        initialize: function() {
            //this.model.on("reset", this.render, this);
            self=this;
            this.model=JSON.parse(window.localStorage.getItem("warrior"));
            this.on("inTheDom", this.addMap);
            var warriors = new Array();
        },

        render: function(eventName) {
            $(this.el).empty();
            $(this.el).html(this.template({}));
            return this;
        },

        addMap: function() {
           
            var map = L.map('map', {center: new L.LatLng(42.350711, 13.399961),zoom: 17,zoomControl: false} );

            L.tileLayer('http://{s}.tiles.mapbox.com/v3/tarabor.ii291l53/{z}/{x}/{y}.png', {
                maxZoom: 17,
            }).addTo(map);

            var marker;
            var markers = new Array();

            var greenIcon = L.icon({
                iconUrl: './res/greenMarker.png',
                iconSize:     [26, 26], // size of the icon
                iconAnchor:   [13, 13], // point of the icon which will correspond to marker's location
            });

            var redIcon = L.icon({
                iconUrl: './res/redMarker.png',
                iconSize:     [26, 26], // size of the icon
                iconAnchor:   [13, 13], // point of the icon which will correspond to marker's location
            });

            var greyIcon = L.icon({
                iconUrl: './res/greyMarker.png',
                iconSize:     [26, 26], // size of the icon
                iconAnchor:   [13, 13], // point of the icon which will correspond to marker's location
            });

            var circle = undefined;
            var radius = (JSON.parse(window.localStorage.getItem("weapon")).range + JSON.parse(window.localStorage.getItem("head")).range)*2;

            navigator.geolocation.getCurrentPosition(function (position) {
                var coord = new L.LatLng(position.coords.latitude, position.coords.longitude);
                marker = L.marker([position.coords.latitude, position.coords.longitude], {icon: greenIcon}).addTo(map);
                circle = new L.circle([position.coords.latitude, position.coords.longitude], radius, {
                    color: '#63ca3a',
                    fillColor: '#63ca3a',
                    fillOpacity: 0.3,
                    weight: 2,
                    clickable: false
                }).addTo(map);
            }, function() {});

            function mapUpdate(position){
                
                navigator.geolocation.getCurrentPosition(function (position) {

                    marker.setLatLng([position.coords.latitude, position.coords.longitude]).update();
                    self.model.position.latitude=position.coords.latitude;
                    self.model.position.longitude=position.coords.longitude;

                    circle.setLatLng([position.coords.latitude, position.coords.longitude]);
                    // aggiorniamo nostra posizione su parse
                    $.ajax({
                        type : 'PUT',
                        headers: {
                        'X-Parse-Application-Id' : "PHYN9yjJLqmSo0xACd63oypUBUcx4q0eLHBvoozY",
                        'X-Parse-REST-API-Key' : "VSn4lvHnF3EKZmVPox8rRA7Eol3X9r7M8blvQWfC"
                        },
                        url: "https://api.parse.com/1/classes/Warrior/"+self.model.objectId,
                        data:  JSON.stringify({"position" : self.model.position}),
                        contentType: "application/json; charset=utf-8",
                        dataType : "json"
                    });

                    // visualizziamo altri warriors sulla mappa
                    var point = new Parse.GeoPoint({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });

                    var query = new Parse.Query(Warrior);
                    // Interested in locations near user.
                    query.near("position", point);
                    // Limit what could be a lot of points.
                    query.limit(10);
                    // Final list of objects
                    query.find({
                        success: function (nearWarriors) {
                            self.warriors = nearWarriors;
                            
                            for (i = 1; i < self.warriors.length; i++) { 

                                if (markers[self.warriors[i].id] == undefined){
                                    markers[self.warriors[i].id] = new L.marker([self.warriors[i].get("position").latitude, self.warriors[i].get("position").longitude], 
                                                                            {icon: greyIcon});
                                    markers[self.warriors[i].id].addTo(map); 
                                }
                                else {
                                    var a = new L.LatLng(position.coords.latitude, position.coords.longitude);
                                    var b = new L.LatLng(self.warriors[i].get("position").latitude, self.warriors[i].get("position").longitude);

                                    var warPoint = new Parse.GeoPoint({
                                        latitude: self.warriors[i].get("position").latitude,
                                        longitude: self.warriors[i].get("position").longitude
                                    });
                                    
                                    var distance = a.distanceTo(b);
                                    
                                    if(distance>radius){
                                        
                                        markers[self.warriors[i].id].setIcon(greyIcon);
                                        markers[self.warriors[i].id].setLatLng(b).update();
                                        markers[self.warriors[i].id].off('mousedown');
                                    }
                                    
                                    else{
        
                                        markers[self.warriors[i].id].setIcon(redIcon);
                                        markers[self.warriors[i].id].setLatLng(b).update();
                                        markers[self.warriors[i].id].off('mousedown');
                                        markers[self.warriors[i].id].on('mousedown', function(e){
                                            var mark = e.target;
                                            for(var y = 1; y<self.warriors.length; y++){
                                                var locWar = new L.LatLng(self.warriors[y].get("position").latitude, self.warriors[y].get("position").longitude);
                                                if (mark.getLatLng().equals(locWar)){
                                                    
                                                    var enemyWar = self.warriors[y];
                                                    var weaponClass = Parse.Object.extend("Weapon");
                                                    var headClass = Parse.Object.extend("Head");
                                                    var armorClass = Parse.Object.extend("Armor");
                                                   
                                                    var queryWeapon = new Parse.Query(weaponClass);
                                                    var queryHead = new Parse.Query(headClass);
                                                    var queryArmor = new Parse.Query(armorClass);

                                                    queryWeapon.get(enemyWar.get("weapon").id, {
                                                        success: function(weapon) {
                                                           window.localStorage.setItem("enemyWeapon",JSON.stringify(weapon));
                                                        }
                                                    });

                                                    queryHead.get(enemyWar.get("head").id, {
                                                        success: function(head) {
                                                           window.localStorage.setItem("enemyHead",JSON.stringify(head));
                                                        }
                                                    });

                                                    queryArmor.get(enemyWar.get("armor").id, {
                                                        success: function(armor) {
                                                           window.localStorage.setItem("enemyArmor",JSON.stringify(armor));
                                                        }
                                                    });

                                                    $('#fight').off('mousedown');
                                                    
                                                    if(self.model.life>0){

                                                        $('#fight').on("mousedown", function() {

                                                            var enemyWeapon = JSON.parse(window.localStorage.getItem("enemyWeapon"));
                                                            var enemyHead = JSON.parse(window.localStorage.getItem("enemyHead"));
                                                            var enemyArmor = JSON.parse(window.localStorage.getItem("enemyArmor"));

                                                            var myWeapon = JSON.parse(window.localStorage.getItem("weapon"));
                                                            var myHead = JSON.parse(window.localStorage.getItem("head"));
                                                            var myArmor = JSON.parse(window.localStorage.getItem("armor"));
                                                            
                                                            fight(enemyWar, enemyWeapon, enemyHead, enemyArmor, myWeapon, myHead, myArmor);
                                                        });
                                                    }
                                                    else{
                                                        
                                                        $('#fight').on("mousedown", function() {
                                                            alert("You have no life. Rest youself.");
                                                        });
                                                    }
                                                    $('#popupWarrior').show(100);
                                                    $('#infoWarrior').empty();
                                                    $('#avatarWarrior').append("<img class='smallAvatar' src='"+self.warriors[y].get("image")+"'</img>");
                                                    $('#infoWarrior').append("<p>"+self.warriors[y].get("nick")+"</p><p>Level: "+self.warriors[y].get("level")+"</p>");
                                                }
                                            }
                                        });
                                    }
                                } 
                            }
                        }
                    });
                    map.panTo(new L.LatLng(position.coords.latitude, position.coords.longitude));
                }, function() {});
                
            }

            $('#toMap').on('mousedown', function(){
                $('#infoFight').hide(100);
            });

            var interval = setInterval(function(){mapUpdate();}, 3000);
            $('#backButton').on('mousedown', function(){
                window.clearInterval(interval);
            });
        },
    });
    return MapView;
});
