(function() {
    angular.module("starter").constant("constant", function() {
        var marriageDate = "04-june-2018";
        var marriageTime = "09:30:00";
        var marriageDateTime = new Date(marriageDate + " " + marriageTime + " GMT+0530").getTime();
        var oneMin = 60 * 1000;
        var oneHour = 60 * oneMin;
        var oneDay = 24 * oneHour;
        var oneWeek = 7 * oneDay;

        var constant = {
            MARRIAGE_DATE: marriageDateTime,
            WEDDING_DAY_12AM: new Date(marriageDate + " 00:00:00").getTime(),
            PREVIOUS_DAY: marriageDateTime - oneDay,
            PREVIOUS_WEEK: marriageDateTime - oneWeek,
            ENGAGEMENT: new Date("03-june-2017 10:00:00").getTime(),
            TODAY: new Date().getTime(),
            NEXT_DAY: marriageDateTime + oneDay,
            VOTE_OF_THANKS: marriageDateTime + oneHour,
            ONE_DAY: oneDay,
            ONE_HOUR: oneHour,
            ONE_MIN: oneMin,

            //detail page
            MAIN_TITLE: "J weds B",
            PHRASE_1: "I have never seen her till then. Never knew she was right there in my neighborhood. But when I met her, I knew this is for life. Request the pleasure of your company at the celebration of our wedding",
            GROOM_NAME: "T M Jeyabalaji",
            NAME_CONJUNCTION: "with",
            BRIDE_NAME: "M L Bavani",
            DATE_TIME_PHRASE: "With our parents' blessings we are stepping into our new life, together, on",
            MARRIAGE_DISPLAY_DATE: "Sunday, 4th June 2017",
            MARRIAGE_DISPLAY_TIME: "9.30 AM to 10.30 AM",
            ENGAGEMENT_DISPLAY_DATE: "Saturday, 3rd June 2017,",
            ENGAGEMENT_DISPLAY_TIME: "7 PM to 8 PM",

        };
        return constant;
    }());
  })();
  