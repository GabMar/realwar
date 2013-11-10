define(["jquery", "underscore", "parse", "handlebars", "text!templates/map.html", "text!templates/marker-popup.html"], function($, _, Parse, Handlebars, template, popupTemplate) {

    var AdListView = Parse.View.extend({

        tagName: "div",
        id: "map",

        template: Handlebars.compile(template),
        popupTemplate: Handlebars.compile(popupTemplate),

        initialize: function() {
            //this.model.on("reset", this.render, this);
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

            navigator.geolocation.getCurrentPosition(function (position) {
              L.marker([position.coords.latitude, position.coords.longitude], {icon: positionIcon}).addTo(map);
            }, function() {});


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
