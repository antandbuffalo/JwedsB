(function() {
  angular.module("starter").controller("HomeBoardController", function($scope, $interval, $location, $timeout) {

    var marriageDate = new Date(1496539800000).getTime();
    $scope.description = function() {
      $location.path("/home");
    };

    var ONE_DAY = 24 * 60 * 60 * 1000;
    var ONE_HOUR = 60 * 60 * 1000;
    var ONE_SEC = 60 * 1000;

    function makeItTwoDigit(input) {
      if(input < 10) {
        return "0" + input;
      }
      return input;
    };

    function calculateRemaining() {
      var today = new Date().getTime();
      var remaining = marriageDate - today;

      if(remaining < 0) {
        $scope.days = 0;
        $scope.hours = 0;
        $scope.minutes = 0;
        $scope.seconds = 0;
        $scope.remaining = "0 days to go";
        return;
      }
      var days = parseInt(remaining / ONE_DAY);

      var daysRemainder = remaining % ONE_DAY;
      var hours = makeItTwoDigit(parseInt(daysRemainder / ONE_HOUR));

      var hoursRemaining = daysRemainder % ONE_HOUR;
      var minutes = makeItTwoDigit(parseInt(hoursRemaining / ONE_SEC));

      var minutesRemaining = hoursRemaining % ONE_SEC;
      var seconds = makeItTwoDigit(parseInt(minutesRemaining / 1000));

      $scope.remaining = days + "days " + hours +":" + minutes +":" + seconds;
      $scope.days = days;
      $scope.hours = hours;
      $scope.minutes = minutes;
      $scope.seconds = seconds;
    };
    $interval(calculateRemaining, 1000);

    function setLocalNotification() {
      //https://ionicframework.com/docs/native/local-notifications/
      $timeout(function() {

        cordova.plugins.notification.local.schedule({
          id: 1,
          title: "Jeyabalaji weds Bavani",
          text: "04 June 2017, 9:30 am to 10:30 am",
          at: new Date().getTime() + 6000,
          icon: 'res://ic_stat_onesignal_default',
          color: "866048"
        });
      }, 5000);
    };
    setLocalNotification();

  });
})();
