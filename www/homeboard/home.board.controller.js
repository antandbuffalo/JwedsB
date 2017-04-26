(function() {
  angular.module("starter").controller("HomeBoardController", function($scope, $interval) {

    $scope.description = function() {

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
      var marriageDate = new Date(1496539800000).getTime();
      var remaining = marriageDate - today;
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

  });
})();
