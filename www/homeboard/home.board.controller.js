(function() {
  angular.module("starter").controller("HomeBoardController", function($scope, $interval, $location, $timeout) {

    //var marriageDate = new Date(1496539800000).getTime();
    var marriageDate = new Date("04-june-2017 09:30:00").getTime();
    var weddingDay12am = new Date("04-june-2017 00:00:00").getTime();
    var previousDay = new Date("03-june-2017 09:30:00").getTime();
    var previousWeek = new Date("28-may-2017 09:30:00").getTime();
    var today = new Date().getTime();

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

    function setLocalNotification(time, desc, id) {
      //https://ionicframework.com/docs/native/local-notifications/
      $timeout(function() {

        cordova.plugins.notification.local.schedule({
          id: id,
          title: "Jeyabalaji weds Bavani",
          text: desc,
          at: time,
          icon: 'res://ic_stat_onesignal_default',
          color: "866048"
        });
      }, 1000);
    };

    if(weddingDay12am >= today) {
      setLocalNotification(weddingDay12am, "Today, 9:30am to 10:30am", 101);
    }
    if(previousDay >= today) {
      setLocalNotification(previousDay, "Tomorrow, 9:30am to 10:30am", 102);
    }
    if(previousWeek >= today) {
      setLocalNotification(previousWeek, "Next week, Sunday, 9:30am to 10:30am", 103);
    }
    if(new Date("17-may-2017 14:10:00").getTime() >= today) {
      setLocalNotification(new Date("17-may-2017 14:10:00").getTime(), "Testing, Sunday, 9:30am to 10:30am", 104);
    }
  });
})();
