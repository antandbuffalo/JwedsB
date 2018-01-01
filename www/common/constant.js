(function() {
    angular.module("starter").constant("constant", function() {
        var constant = {
            MARRIAGE_DATE: new Date("04-june-2018 09:30:00 GMT+0530").getTime(),
            WEDDING_DAY_12AM: new Date("04-june-2017 00:00:00").getTime()
        };
        return constant;
    }());
  })();
  