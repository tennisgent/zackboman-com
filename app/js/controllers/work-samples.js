'use strict';

/* Controllers */

function Web($scope, $location){
    $scope.projects = [
        {name: "ZackBoman.com",
            link: "http://www.zackboman.com",
            text: "This site has given me a chance to finally learn and utilize several of the amazing web technologies that I have been hearing a lot of buzz about.  Prior to building this site, I had used Node.js for a couple of small projects, but had never been able to test it out completely.  I also really wanted to learn Angular.js and to create a single-page application.",
            techs: ["Node.js","Angular.js","ThemeForest.net CSS Theme","jQuery","Sugar.js"],
            screenshot: "img/web-projects/zackboman.png"},
        {name: "AboutOne.com",
            link: "http://www.aboutone.com/",
            text: "My most recent job was working for AboutOne, which is a web-based application that enables families to keep track of their important information.  I was a part of their UI team and worked strictly on client-side code using the following technologies: ",
            techs: ["Twitter Bootstrap","jQuery","AJAX","jsRender Templates","HTML5 Canvas"],
            screenshot: "img/web-projects/aboutone.png"}
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