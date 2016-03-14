'use strict';

/* Controllers */

function Web($scope){
    $scope.projects = [
        {
            name: "Dealfish",
            link: "https://dealfi.sh",
            text: "This is a personal side project I have been working on for the past 18 months with a friend. He does most of the backend work and I do most of the frontend work, but we often mix and match responsibilities. The idea is that users can create on-going, realtime searches for retail products on the web. Then our system goes to work finding deals matching their search criteria and alerting them whenever we find a match in the future. The backend is built on Node with a MongoDB database. The frontend is built entirely using Angular and Angular Material.",
            techs: ["Angular.js","MongoDB","Angular Material","Git","Mongoose.js","Node.js","Express.js"],
            screenshot: "img/web-projects/dealfish.png"
        },
        {
            name: "Workfront",
            link: "http://hub.attask.com",
            text: "As part of the team in charge of document management, I help build a full-scale document asset management systme within Workfront.",
            techs: ["Angular.js","LESS","Jasmine","Karma","Git","Gulp.js","Require.js","lodash.js"],
            screenshot: "img/web-projects/workfront.png"
        },
        {
            name: "XactCredentials",
            link: "http://test.xactcredentials.com",
            text: "I was the first front-end developer on the team and was able to build the site from the ground up.  Its built completely on AngularJS, consuming RESTful web services. The site is also 100% responsive so it can be accessed from any device.",
            techs: ["Angular.js","SASS","Jasmine","Protractor","Git","Grunt.js","Gulp.js","Leaflet.js"],
            screenshot: "img/web-projects/xactcredentials.png"
        },
        {
            name: "ZackBoman.com",
            link: "http://www.zackboman.com",
            text: "This site has given me a chance to finally learn and utilize several of the amazing web technologies that I have been hearing a lot of buzz about.  Prior to building this site, I had used Node.js for a couple of small projects, but had never been able to test it out completely.  I also really wanted to learn Angular.js and to create a single-page application.",
            techs: ["Node.js","Angular.js","ThemeForest.net CSS Theme","jQuery","Sugar.js"],
            screenshot: "img/web-projects/zackboman.png"
        },
        {
            name: "AboutOne.com",
            link: "http://www.aboutone.com/",
            text: "My most recent job was working for AboutOne, which is a web-based application that enables families to keep track of their important information.  I was a part of their UI team and worked strictly on client-side code using the following technologies: ",
            techs: ["Twitter Bootstrap","jQuery","AJAX","jsRender Templates","HTML5 Canvas"],
            screenshot: "img/web-projects/aboutone.png"
        }
    ];
}
Web.$inject = ['$scope','$location'];

function Mobile($scope) {
    $scope.projects = [
        {name: "AboutOne Family Organizer",
            link: "https://itunes.apple.com/ag/app/aboutone-family-organizer/id551448323?mt=8",
            text: "My main responsibility while working for AboutOne was the design and creation of their mobile apps.  When I started, they had no mobile apps and today I've developed a mobile app for both iOS and Android, with over 50,000 total downloads to date.  The apps were developed using a framework called PhoneGap that enabled me to use HTML and JavaScript to develop the apps much more quickly than by writing native code.  Occassionally I would have to write a plugin in one of the two native languages, but my skills in those areas are rather limited.",
            techs: ["PhoneGap","jQuery","AJAX","JavaScript/HTML5/CSS3","Java","Objective C"],
            screenshot: "img/mobile-projects/aboutone.png"}
    ];

}
Mobile.$inject = ['$scope'];

function Node($scope) {
    $scope.projects = [
        {name: "AboutOne CES Demo",
            link: "http://aboutone.aws.af.cm/",
            text: "For CES 2013, AboutOne decided they wanted to do live demos of our web app at our convention booth. The demos would allow potential customers to see AboutOne in action, as well as give the customers a way to give us direct feedback on what they would like to be improved." +
                    " To make that process easier for the customers, I created a 'kiosk' app that would allow the user to chose from a pool of possible tasks, walk the user through the task, as well as give the user a place to enter feedback. All of the data is stored in a MongoDB database hosted " +
                    "in the cloud.  It ended up being a big success and allowed us to easily and quickly see all of the user's feedback.",
            techs: ["Node.js","MongoDB","Express.js","JavaScript/HTML5/CSS3","Twitter Bootstrap","AJAX"],
            screenshot: "img/node-projects/cesdemo.png"}
    ];

}
Node.$inject = ['$scope'];

function Java($scope) {
    $scope.projects = [
        {name: "ClockIn",
            text: "This was a project that I decided to tackle all on my own. I wanted a good program that would allow me to track my hours at work, but I couldn't find any good ones online. So I decided to learn a little SQL and put my Java skills to the test. I'm very happy with the result.",
            text2: "This program does the following:",
            techs: [
                "Tracks the user's hours week by week with a simple clock-in, clock-out user interface",
                "Automatically saves data into a SQLite database file",
                "Calculates the average hours per week, per day and overall progress to a weekly hour goal",
                "Allows the customer to customize time formats, color schemes and AutoSave frequency"
            ],
            screenshot: "img/java-projects/clockin1.jpg"},
        {name: "Breakout",
            text: "This app is a fully functioning 'brick break' game, similar to the other brick breaking games you may have seen and/or played. It asks the user how many rows of bricks they would like, then it creates the entire playing panel, complete with color options, gaming controls and even allows the user to adjust the speed of the ball, the size of the ball and the size of the paddle. The game also plays sound clips when the ball hits the walls, bricks and paddle.",
            screenshot: "img/java-projects/breakout1.jpg"}
    ];
}
Java.$inject = ['$scope'];

//function CSharp($scope) {
//
//}
//CSharp.$inject = ['$scope'];