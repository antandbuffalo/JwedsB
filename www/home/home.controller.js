(function() {
  angular.module("starter").controller("HomeController", function($scope, constant) {
    $scope.mainTitle = constant.MAIN_TITLE;
    $scope.phrase1 = constant.PHRASE_1;
    $scope.groomName = constant.GROOM_NAME;
    $scope.brideName = constant.BRIDE_NAME;    
    $scope.nameConjunction = constant.NAME_CONJUNCTION;
    $scope.dateTimePhrase = constant.DATE_TIME_PHRASE;
    $scope.marriageDisplayDate = constant.MARRIAGE_DISPLAY_DATE;
    $scope.marriageDisplayTime = constant.MARRIAGE_DISPLAY_TIME;
    $scope.engagementDisplayDate = constant.ENGAGEMENT_DISPLAY_DATE;
    $scope.engagementDisplayTime = constant.ENGAGEMENT_DISPLAY_TIME;


    $scope.goBack = function() {
      alert("sadf");
      window.history.back();
    };
    $scope.navigateToMap = function(type) {
      //https://github.com/dpa99c/phonegap-launch-navigator
      var location = [];
      if(type === "groom") {
        location = [9.5395581,78.592895];
      }
      else if(type === "bride") {
        location = [9.543527,78.596746];
      }
      if(location.length === 2) {
        launchnavigator.isAppAvailable(launchnavigator.APP.GOOGLE_MAPS, function(isAvailable){
            var app;
            if(isAvailable){
                app = launchnavigator.APP.GOOGLE_MAPS;
            }else{
                console.warn("Google Maps not available - falling back to user selection");
                app = launchnavigator.APP.USER_SELECT;
            }
            launchnavigator.navigate(location, {
                app: app
            });
        });
      }
    };
  });
})();
