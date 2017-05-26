(function() {
  angular.module("starter").controller("WishesController", function($scope, $ionicLoading, $timeout, $http, wishesService) {
    $scope.wish = {};
    $scope.disableSend = false;
    $scope.showStatus = false;
    $scope.statusMessage = "Successfully Sent";
    $scope.isLoading = false;

    function showStatus(time) {
      if(!time) {
        time = 2000;
      }
      $scope.showStatus = true;
      $timeout(function() {
        $scope.showStatus = false;
      }, time);
    };

    function saveMessageId(id) {
      var messageIds = JSON.parse(localStorage.getItem("messageIds"));
      if(messageIds) {
        messageIds.push(id);
      }
      else {
        messageIds = [];
        messageIds.push(id);
      }
      localStorage.setItem("messageIds", JSON.stringify(messageIds));
    };

    $scope.sendWish = function() {
      var wish = {
        "chat_dialog_id": "5928073aa28f9a0a5d6087a1",
        "message": $scope.wish.content,
        "senderName": $scope.wish.sender,
        "wish": $scope.wish.content
      };
      if(wishesService.qbToken) {
        $scope.isLoading = true;
        $scope.disableSend = true;
        wishesService.sendMessage(wish).then(function(success) {
          console.log(success);
          saveMessageId(succ.data._id);
          $scope.isLoading = false;
          $scope.statusMessage = "Successfully Sent";
          $scope.wish = {};
          $scope.disableSend = false;
          showStatus(2000);
        }, function(error) {
          $scope.isLoading = false;
          $scope.disableSend = false;
          $scope.statusMessage = "Session expired. Please close and open the app";
          showStatus(5000);
        })
      }
      else {
        $scope.isLoading = true;
        $scope.disableSend = true;
        wishesService.createSession().then(function(success) {
          wishesService.sendMessage(wish).then(function(succ) {
            console.log(succ.data._id);
            saveMessageId(succ.data._id);
            $scope.isLoading = false;
            $scope.statusMessage = "Successfully Sent";
            $scope.wish = {};
            $scope.disableSend = false;
            showStatus(2000);
          }, function(error) {
            $scope.isLoading = false;
            $scope.disableSend = false;
            console.error(error);
            $scope.statusMessage = "Session expired. Please close and open the app";
            showStatus(5000);
          });
        }, function(error) {
          $scope.isLoading = false;
          $scope.disableSend = false;
          console.error(error);
          $scope.statusMessage = "Session expired. Please close and open the app";
          showStatus(5000);
        });
      }
    };

  });
})();
