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
        },

        render: function(eventName) {
            $(this.el).empty();
            $(this.el).html(this.template({}));
            return this;
        },


        addMap: function() {
           
            var map = new L.map('map', {center: new L.LatLng(42.350711, 13.399961),zoom: 17,zoomControl: false} );

            var marker;
            var markers = new Array();

            navigator.geolocation.getCurrentPosition(function (position) {
                var coord = new L.LatLng(position.coords.latitude, position.coords.longitude);
                map.setView(coord, 17);
                marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
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
                            console.log(nearWarriors.length);
                            for (i = 1; i < nearWarriors.length; i++) {
                                console.log(nearWarriors[i].id); 
                                if (markers[nearWarriors[i].id] == undefined)   {
                                    markers[nearWarriors[i].id] = L.marker([nearWarriors[i].get("position").latitude, nearWarriors[i].get("position").longitude])
                                                                    .bindPopup("Marotta Merda!").openPopup().addTo(map);
                                }
                                 
                                else {
                                    var b = new L.LatLng(nearWarriors[i].get("position").latitude, nearWarriors[i].get("position").longitude);
                                    markers[nearWarriors[i].id].setLatLng(b).update();
                                }
                            }
                        }
                    });
                }, function() {});
            };

            L.tileLayer('http://{s}.tiles.mapbox.com/v3/tarabor.ii291l53/{z}/{x}/{y}.png', {
                
                maxZoom: 20
            }).addTo(map);

            setInterval(function(){mapUpdate();}, 1000);
        },

        

    });

    return MapView;
});
