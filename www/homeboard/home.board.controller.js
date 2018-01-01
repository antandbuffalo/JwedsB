(function() {
  angular.module("starter").controller("HomeBoardController", function($scope, $interval, $location, $timeout, wishesService, constant) {
    var marriageDate = constant.MARRIAGE_DATE;
    var weddingDay12am = constant.WEDDING_DAY_12AM;
    var previousDay = constant.PREVIOUS_DAY;
    var previousWeek = constant.PREVIOUS_WEEK;
    var engagement = constant.ENGAGEMENT;
    var today = constant.TODAY;
    var nextDay = constant.NEXT_DAY;
    var voteOfThanks = constant.VOTE_OF_THANKS;

    $scope.description = function() {
      $location.path("/home");
    };

    var ONE_DAY = constant.ONE_DAY;
    var ONE_HOUR = constant.ONE_HOUR;
    var ONE_MIN = constant.ONE_MIN;

    function makeItTwoDigit(input) {
      if(input < 10) {
        return "0" + input;
      }
      return input;
    };

    function calculateRemaining() {
      today = new Date().getTime();
      var remaining = marriageDate - today;
      if(remaining < 0) {
        if(today > nextDay) {
          $scope.mainContent = "Thanks a lot for your Wishes";
        }
        else {
          $scope.mainContent = "It's Wedding Day";
          $scope.days = 0;
          $scope.hours = 0;
          $scope.minutes = 0;
          $scope.seconds = 0;
          $scope.remaining = "0 day to go";
          $scope.daysSubtitle = "day";
        }
        return;
      }
      $scope.mainContent = null;
      var days = parseInt(remaining / ONE_DAY);

      var daysRemainder = remaining % ONE_DAY;
      var hours = makeItTwoDigit(parseInt(daysRemainder / ONE_HOUR));

      var hoursRemaining = daysRemainder % ONE_HOUR;
      var minutes = makeItTwoDigit(parseInt(hoursRemaining / ONE_MIN));

      var minutesRemaining = hoursRemaining % ONE_MIN;
      var seconds = makeItTwoDigit(parseInt(minutesRemaining / 1000));

      $scope.remaining = hours +":" + minutes +":" + seconds;
      $scope.days = days;
      $scope.hours = hours;
      $scope.minutes = minutes;
      $scope.seconds = seconds;
      if(days <= 1) {
        $scope.daysSubtitle = "day";
      }
      else {
        $scope.daysSubtitle = "days";
      }
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
    //just

    if(weddingDay12am >= today) {
      setLocalNotification(weddingDay12am, "Today, 9:30am to 10:30am", 101);
    }
    if(previousDay >= today) {
      setLocalNotification(previousDay, "Tomorrow, 9:30am to 10:30am", 102);
    }
    if(previousWeek >= today) {
      setLocalNotification(previousWeek, "Next week, Sunday, 9:30am to 10:30am", 103);
    }
    if(engagement >= today) {
      setLocalNotification(engagement, "Engagement, Today evening 7pm to 8pm", 104);
    }
    if(voteOfThanks >= today) {
      setLocalNotification(voteOfThanks, "Thanks a lot for your wishes 😊", 105);
    }
    //setLocalNotification(new Date().getTime(), "Sunday, June 4th 2017", 105);
    wishesService.createSession().then(function(success) {
      console.log("Session created - " + JSON.stringify(success));
    }, function(error) {
      console.log("Error creating session - " + JSON.stringify(error));
    });
  });
})();
