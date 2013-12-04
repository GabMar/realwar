define(["jquery", "underscore", "parse", "handlebars", "text!templates/map.html", "text!templates/marker-popup.html","models/Warrior"], function($, _, Parse, Handlebars, template, popupTemplate,Warrior) {

    var AdListView = Parse.View.extend({

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
            //var googleLayer = new L.Google('ROADMAP');

            // add the markers about the ads
           /* for (var i = 0; i < this.model.length; i++) {
              console.log(this.model.at(i));
              var marker = L.marker(this.model.at(i).get("position")).addTo(map);
              var ad = this.model.at(i).toJSON();
              ad.cid = this.model.at(i).cid;
              marker.bindPopup(this.popupTemplate(ad), {closeButton: false});
              //marker.bindPopup('<div class="markerPopup">' + this.model.at(i).get("title") + '</div>' + '<div><a class="markerOpen" href="#ads/' + this.model.at(i).cid + '"> ' + this.model.at(i).get("price") + ' € </a></div>', {closeButton: false});
            } */

            var positionIcon = L.icon({
              iconUrl: './res/hereIcon.png',
              iconSize:     [20, 20], // size of the icon
            });

            var marker;

            navigator.geolocation.getCurrentPosition(function (position) {
              marker = L.marker([position.coords.latitude, position.coords.longitude], {icon: positionIcon}).addTo(map);
            }, function() {});

             var centromappa;
             markers = new Array();

             function OnSuccess(position) {
                 //alert('Latitude: ' + position.coords.latitude + '\n' +
                 //'Longitude: ' + position.coords.longitude + '\n');
                 var a = new L.LatLng(position.coords.latitude, position.coords.longitude);
                 marker.setLatLng(a).update();

                 map.setView(a, 17, {
                     animate: true
                 });
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
                             markers[nearWarriors[i].id] = L.marker([nearWarriors[i].get("position").latitude, nearWarriors[i].get("position").longitude]).addTo(map);
                           }
                             else {
                              var b = new L.LatLng(nearWarriors[i].get("position").latitude, nearWarriors[i].get("position").longitude);
                              markers[nearWarriors[i].id].setLatLng(b).update();
                            }
                         }
                     }
                 });


             };


             function onError(error) {
               alert('code: '    + error.code    + '\n' +
               'message: ' + error.message + '\n');
          };


          var optiosnsGPS = { timeout: 2000,
           enableHighAccuracy: true };


          var GPSid = navigator.geolocation.watchPosition(OnSuccess, onError, optiosnsGPS);

            //var webkit =  document.getElementsByClassName("leaflet-marker-icon  leaflet-clickable leaflet-zoom-animated").style.webkitTransform;

            function onCompassSuccess(heading) {
                //alert( 'Heading: ' + heading.magneticHeading);
                document.getElementById("map").style.webkitTransform = 'rotateZ('+heading.magneticHeading+'deg) rotateX(60deg)';
                //document.getElementsByClassName("leaflet-marker-icon  leaflet-clickable leaflet-zoom-animated").style.webkitTransform = webkit + 'rotateZ('+heading.magneticHeading+'deg)';
            };

            function onCompassError(compassError) {
                    alert('Compass error: ' + compassError.code);
            };

            var options = { frequency: 500 };  // Update every 3 seconds

            var watchID = navigator.compass.watchHeading(onCompassSuccess, onCompassError, options);
           


            //map.addLayer(googleLayer);
            L.tileLayer('http://{s}.tile.cloudmade.com/a6f26d33c61342318355eb8f812ce3ba/17306/256/{z}/{x}/{y}.png', {
                
                maxZoom: 20
            }).addTo(map);

            var circle = L.circle([42.350711,  13.399961], 50, {
            color: 'blue',
            fillColor: '#1F00FF',
             fillOpacity: 0.5
            }).addTo(map);

            
        }
    });
    return AdListView;
});
