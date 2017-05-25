(function() {
  angular.module("starter").controller("HomeBoardController", function($scope, $interval, $location, $timeout, $firebase, $firebaseObject, $firebaseArray) {


    function initFirebase() {
      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyBLoErbpgD8_T4Fsw9u9GiyvdVCZ_sPg6I",
        authDomain: "sample-cc949.firebaseapp.com",
        databaseURL: "https://sample-cc949.firebaseio.com",
        projectId: "sample-cc949",
        storageBucket: "sample-cc949.appspot.com",
        messagingSenderId: "435146691345"
      };
      firebase.initializeApp(config);

      var database = firebase.database();
      var userId = "3RZIkmLkIDhLT7vddZZZ4EqQFU12";
      var name = "Jeyabalaji"
      var email = "jwedsb@gmail.com";
      //writeUserData();
      //addData();
      readData();

    };
    initFirebase();

    function addData() {
      var ref = firebase.database().ref();
      var list = $firebaseArray(ref);
      list.$add({ name: "Jeyabalaji1", "message": "Happy married Life" }).then(function(ref) {
        console.log(ref);
        //var id = ref.key();
        //console.log("added record with id " + id);
        //list.$indexFor(id); // returns location in the array
      });
    }

    function readData() {
      var ref = firebase.database().ref();
      // download the data into a local object
      $scope.data = $firebaseObject(ref);
      $scope.data.$loaded()
      .then(function() {
        console.log($scope.data);
      })
      .catch(function(err) {
        console.error(err);
      });
    };

    function writeUserData(userId, name, email) {
      firebase.database().ref().set({
        username: name,
        email: email,
      });
    };

    //var marriageDate = new Date(1496539800000).getTime();
    var marriageDate = new Date("04-june-2017 09:30:00 GMT+0530").getTime();
    var weddingDay12am = new Date("04-june-2017 00:00:00").getTime();
    var previousDay = new Date("03-june-2017 09:30:00").getTime();
    var previousWeek = new Date("28-may-2017 09:30:00").getTime();
    var engagement = new Date("03-june-2017 10:00:00").getTime();
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
      today = new Date().getTime();
      var remaining = marriageDate - today;
      if(remaining < 0) {
        $scope.days = 0;
        $scope.hours = 0;
        $scope.minutes = 0;
        $scope.seconds = 0;
        $scope.remaining = "0 day to go";
        $scope.daysSubtitle = "day";
        return;
      }
      var days = parseInt(remaining / ONE_DAY);

      var daysRemainder = remaining % ONE_DAY;
      var hours = makeItTwoDigit(parseInt(daysRemainder / ONE_HOUR));

      var hoursRemaining = daysRemainder % ONE_HOUR;
      var minutes = makeItTwoDigit(parseInt(hoursRemaining / ONE_SEC));

      var minutesRemaining = hoursRemaining % ONE_SEC;
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
    setLocalNotification(new Date().getTime(), "Sunday, June 4th 2017", 105);

  });
})();
