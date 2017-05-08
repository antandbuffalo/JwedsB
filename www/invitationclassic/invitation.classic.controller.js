(function() {
  angular.module("starter").controller("InvitationClassicController", function($scope) {

    function getBase64Image(path) {
    // Create an empty canvas element
      image = document.createElement('img');
      document.body.appendChild(image);
      image.setAttribute('style','display:none');
      image.setAttribute('alt','script div');
      image.setAttribute("src", path);

      var imgCanvas = document.createElement("canvas"),
      imgContext = imgCanvas.getContext("2d");

      // Make sure canvas is as big as the picture
      imgCanvas.width = image.width;
      imgCanvas.height = image.height;

      // Draw image into canvas element
      imgContext.drawImage(image, 0, 0, image.width, image.height);
      // Save image as a data URL
      imgInfom = imgCanvas.toDataURL("image/png");
      document.body.removeChild(image);
      return imgInfom;
  }

  function writeFile(imageName) {

    window.resolveLocalFileSystemURL(cordova.file.applicationDirectory + "www/img/" + imageName, function(imageFile) {
      alert(JSON.stringify(imageFile));
      console.log("got main dir",imageFile);
      cordova.plugins.disusered.open(
          imageFile.nativeURL,
          function(success) {
            console.log(success);
          },
          function(error) {
            console.log(error);
          }
      );
      /*
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
        var documentsPath = fileSystem.root;
        imageFile.copyTo(documentsPath, imageName,
        function(fileCopied){
            console.log('copying was successful', fileCopied)
        },
        function(error){
            console.log('unsuccessful copying', error)
        });
      }, function(error) {
        console.log("Not able to get filesystem - ", error);
      });
      */

    });
  }

    $scope.openFile = function(imageName) {
      return;
      alert("coming " + imageName);
      writeFile(imageName);
    }
  });
})();
