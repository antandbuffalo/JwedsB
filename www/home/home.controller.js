(function() {
  angular.module("starter").controller("HomeController", function($scope) {
    $scope.navigateToMap = function(type) {
      var location = [];
      if(type === "groom") {
        location = [9.5395581,78.592895];
      }
      else if(type === "bride") {
        location = [9.543544,78.5961578];
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
