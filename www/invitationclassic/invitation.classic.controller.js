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

  function writeFile() {

    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir) {
      alert(dir);
      console.log("got main dir",dir);
        // dir.getFile("log.txt", {create:true}, function(file) {
        //     console.log("got the file", file);
        //     logOb = file;
        //     writeLog("App started");
        // });
    });
    return;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
      var documentsPath = fileSystem.root;
      fileDB.copyTo(documentsPath, 'myDB.db',
      function(){
          console.log('copying was successful')
      },
      function(){
          console.log('unsuccessful copying')
      });
    }, function(error) {
      console.log("Not able to get filesystem - ", error);
    });
  }

    $scope.openFile = function(imageName) {
      alert("coming " + imageName);
      writeFile();
      return;


      var base64String = getBase64Image("img/" + imageName);
      cordova.plugins.fileOpener2.open("img/invitationclassic2.jpg", "application/image", function(success) {
        console.log("success ", success);
        alert("success " + JSON.stringify(success));
      }, function(error) {
        console.log("error ", error);
        alert("error " + JSON.stringify(error));

      });
    }
  });
})();
