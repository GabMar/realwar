define(["jquery", "underscore", "parse", "handlebars", "text!templates/ad-details.html"],
    function ($, _, Parse, Handlebars, template) {

    var UsView = Parse.View.extend({

        events: {
          "touchend #addImage": "takeImage",
          "touchend #back": "goBack"
        },

        takeImage: function () {
          var options = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URL,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            mediaType: Camera.MediaType.PICTURE,
            cameraDirection: Camera.Direction.BACK,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 400,
            targetHeight: 400,
            saveToPhotoAlbum: false
          };
          var self = this;
          var cameraSuccess = function (imageURI) {
            self.model.set("figure", imageURI);
            self.render();
          };
          var cameraError = function (error) {
            console.log(error);
          };
          navigator.camera.getPicture(cameraSuccess, cameraError, options);
        },

        goBack: function () { //se metto market non va, se metto showMap si -.-
          Parse.history.navigate("market", {trigger: true});
        },

        template: Handlebars.compile(template),

        render: function (eventName) {
          $(this.el).html(this.template(this.model.toJSON()));
          return this;
        }
      });

    return UsView;

  });