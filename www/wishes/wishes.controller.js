(function() {
  angular.module("starter").controller("WishesController", function($scope, $ionicLoading, $timeout, $http) {
    $scope.wish = {};
    $scope.disableSend = false;
    $scope.showStatus = false;
    $scope.statusMessage = "Successfully Sent";
    var qbToken = null;

    // <uses-permission android:name="android.permission.INTERNET" />
    // <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />


    var APP_CONFIG = {
       endpoints: {
           api: "api.quickblox.com", // set custom API endpoint
           chat: "chat.quickblox.com" // set custom Chat endpoint
       },
       chatProtocol: {
           websocket: "wss://chat.quickblox.com:5291",
           bosh: "https://chat.quickblox.com:5281",
           active: 1 // set 1 to use BOSH, set 2 to use WebSockets (default)
       }
       //debug: {mode: 1} // set DEBUG mode
  };
  var CREDENTIALS = {
      appId: 58353,
      authKey: 'uaJSFbMW2JSv6OO',
      authSecret: 'C7EVUGEMy3nJe6a'
  };

  var config = {
      on: {
          //callback function for session expiration
          sessionExpired: function() {
              console.log("session expired");
              qbToken = null;
          }
      }
  };

    var settings = {};
    settings["APP_CONFIG"] = APP_CONFIG;
    settings["CREDENTIALS"] = CREDENTIALS;
    settings.APP_CONFIG.on = config.on;
    QB.init(settings.CREDENTIALS.appId, settings.CREDENTIALS.authKey, settings.CREDENTIALS.authSecret, settings.APP_CONFIG);

    function createSession() {
      var user = {
        id: 28146068,
        name: 'JwedsB',
        login: 'jwedsb',
        pass: 'jwedsbjwedsb'
      };

      QB.createSession({login: user.login, password: user.pass}, function(err, res) {
        if (res) {
          console.log("session created");
          console.log(JSON.stringify(res));
          qbToken = res.token;
        }
        else {
          console.log(JSON.stringify(err));
        }
      });
    };
    createSession();

    function showStatus(time) {
      if(!time) {
        time = 2000;
      }
      $scope.showStatus = true;
      $timeout(function() {
        $scope.showStatus = false;
      }, time);
    }

    function sendMessage(wish) {
      $scope.disableSend = true;
      $http({
        method : "POST",
        url : "https://api.quickblox.com/chat/Message.json",
        headers: {
         'Content-Type': 'application/json',
         'QB-Token': qbToken
       },
       data: wish
      }).then(function mySuccess(response) {
        $scope.statusMessage = "Successfully Sent";
        $scope.wish = {};
        $scope.disableSend = false;
        showStatus(2000);

      }, function myError(response) {
        $scope.statusMessage = "Not able to send your wish. Please try again later";
        $scope.disableSend = false;
      });
    };

    $scope.sendWish = function() {
      if(qbToken) {
        var wish = {
          "chat_dialog_id": "5928073aa28f9a0a5d6087a1",
          "message": $scope.wish.content,
          "senderName": $scope.wish.sender,
          "wish": $scope.wish.content
        };
        sendMessage(wish);
      }
      else {
        $scope.statusMessage = "Session expired. Please close and open the app";
        showStatus(5000);
      }
    };

    function getService() {
      $http({
        method : "GET",
        url : "https://jsonplaceholder.typicode.com/posts/1"
      }).then(function mySuccess(response) {
        console.log(JSON.stringify(response));

      }, function myError(error) {
        console.log(JSON.stringify(error));
      });
    };
    getService();


  });
})();
