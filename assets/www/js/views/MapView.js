define(["jquery", "underscore", "parse", "handlebars", "text!templates/map.html", "text!templates/marker-popup.html","models/Warrior"], function($, _, Parse, Handlebars, template, popupTemplate,Warrior) {

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
           
            var map = new L.map('map', {center: new L.LatLng(42.350711, 13.399961),zoom: 17,zoomControl: false} );
            L.tileLayer('http://{s}.tiles.mapbox.com/v3/tarabor.ii291l53/{z}/{x}/{y}.png', {
                maxZoom: 17,
                continuousWorld: true,
                noWrap: true
            }).addTo(map);

            var marker;

            var markers = new Array();

            var greenIcon = L.icon({
                iconUrl: './res/greenMarker.png',
                iconSize:     [38, 44], // size of the icon
                iconAnchor:   [19, 44], // point of the icon which will correspond to marker's location
            });

            var redIcon = L.icon({
                iconUrl: './res/redMarker.png',
                iconSize:     [38, 44], // size of the icon
                iconAnchor:   [19, 44], // point of the icon which will correspond to marker's location
            });

            navigator.geolocation.getCurrentPosition(function (position) {
                var coord = new L.LatLng(position.coords.latitude, position.coords.longitude);
                marker = L.marker([position.coords.latitude, position.coords.longitude], {icon: greenIcon}).addTo(map);
            }, function() {});

            function mapUpdate(position){
                
                navigator.geolocation.getCurrentPosition(function (position) {

                    marker.setLatLng([position.coords.latitude, position.coords.longitude]).update();
                    self.model.position.latitude=position.coords.latitude;
                    self.model.position.longitude=position.coords.longitude;
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
                                                                            {icon: redIcon})
                                    markers[self.warriors[i].id].addTo(map); 
                                }
                                else {
                                    var b = new L.LatLng(self.warriors[i].get("position").latitude, self.warriors[i].get("position").longitude);
                                    
                                    
                                    markers[self.warriors[i].id].setLatLng(b).update();
                                    markers[self.warriors[i].id].off('mousedown');
                                    markers[self.warriors[i].id].on('mousedown', function(e){
                                        var mark = e.target;
                                        for(y = 1; y<self.warriors.length; y++){
                                            var locWar = new L.LatLng(self.warriors[y].get("position").latitude, self.warriors[y].get("position").longitude);
                                            if (mark.getLatLng().equals(locWar)){
                                                console.log(self.warriors[y].get("nick"));
                                            }
                                        }
                                    });
                                    
                                    //currentMarker.fireEvent('click');
                                } 
                            }
                        }
                    });
                    map.panTo(new L.LatLng(position.coords.latitude, position.coords.longitude));
                }, function() {});
                
            }
            setInterval(function(){mapUpdate();}, 2000);
        },
    });
    return MapView;
});
