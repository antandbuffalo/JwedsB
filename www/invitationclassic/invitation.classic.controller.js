(function() {
  angular.module("starter").controller("InvitationClassicController", function($scope) {

    function getBase64Image(img) {
    // Create an empty canvas element
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      // Copy the image contents to the canvas
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // Get the data-URL formatted image
      // Firefox supports PNG and JPEG. You could check img.src to
      // guess the original format, but be aware the using "image/jpg"
      // will re-encode the image.
      var dataURL = canvas.toDataURL("image/png");

      return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

    $scope.openFile = function() {

      console.log(getBase64Image("../img/invitationclassic1.jpg"));
      return;
      window.cordova.plugins.FileOpener.openFile("../img/invitationclassic1.jpg", function(success) {
        console.log("success ", success);
        alert("success " + JSON.stringify(success));
      }, function(error) {
        console.log("error ", error);
        alert("error " + JSON.stringify(error));

      });
    }
  });
})();
