'use strict';

/* Controllers */

var social = [
    {name: "LinkedIn",
        icon: "img/social/linkedin.png",
        link: "http://www.linkedin.com/pub/zack-boman/66/965/714/"},
    {name: "Facebook",
        icon: "img/social/facebook.png",
        link: "http://www.facebook.com/zack.boman"},
    {name: "Google+",
        icon: "img/social/googleplus.png",
        link: "https://plus.google.com/u/0/110455321213719344738/"},
    {name: "GitHub",
        link: "https://github.com/zackboman",
        icon: "img/social/github.png"},
//    {name: "Twitter",
//        icon: "img/social/twitter.png"},
//    {name: "Meetup",
//        icon: "img/social/meetup.png"},
//    {name: "Spotify",
//        icon: "img/social/spotify.png"},
//    {name: "DesignersTalk",
//        icon: "img/social/designerstalk.png"},
    {name: "Email",
        link: "mailto:zack.boman@gmail.com",
        icon: "img/social/email.png"}
];

function notify(title, subtitle, autodismiss, type, time){
    $("#notify-title").text(title);
    $("#notify-subtitle").text(subtitle);
    var div = $("#notify-top");
    div.removeClass();
    div.addClass(type || "notify-warning");
    div.slideDown("slow");
    div.children("a").on("click",function(e){
        e.preventDefault();
        $("#notify-top").slideUp("slow");
    });
    if(autodismiss){
        setTimeout(function(){
            $("#notify-top").slideUp("slow");
        }, time || 3000);
    }

}

function Main($scope, $location){
    $scope.isActive = function(route){
        return route == $location.path();
    };
    $scope.workSamples = [
        {text: "Web Projects", link: "#/work-samples/web", icon: ".html", color: "red"},
        {text: "Mobile Projects", link: "#/work-samples/mobile", icon: ".app", color: "dodger"},
        {text: "Node.js Projects", link: "#/work-samples/node", icon: ".js", color: "green"},
        {text: "Java Projects", link: "#/work-samples/java", icon: ".java", color: "purple"}
//        {text: "C# Projects", link: "#/work-samples/cs", icon: ".cs", color: "yellow"}
    ];
}
Main.$inject = ['$scope','$location'];

function Home($scope) {
    $scope.languages = [
        "JavaScript/HTML/CSS",
        "Java",
        "C# and ASP.NET",
        "Python"
    ];
    $scope.social = social;

}
Home.$inject = ['$scope'];

function WorkSamples($scope) {

}
WorkSamples.$inject = ['$scope'];

function Qualifications($scope) {
    $scope.qualifications = [
        {name: "Computing Languages",
            list: [
                {name: "JavaScript", link: "#/work-samples/web"},
                {name: "HTML5", link: "#/work-samples/web"},
                {name: "CSS3", link: "#/work-samples/web"},
                {name: "Java", link: "#/work-samples/java"},
                {name: "Python", link: "#/work-samples/python"},
                {name: "C#", link: "#/work-samples/cs"},
                {name: "SQL", link: "#/work-samples/java"}
            ]
        },
        {name: "Web Design",
            list: [
                {name: "Layout", link: "#/work-samples/web"},
                {name: "User Interface", link: "#/work-samples/java"},
                {name: "User Experience", link: "#/work-samples/web"}
            ]
        },
        {name: "Server Side Environments",
            list: [
                {name: "Node.js", link: "#/work-samples/node"},
                {name: "ASP.NET", link: "#/work-samples/cs"}
            ]
        },
        {name: "Fluent in Spanish",
            list: [
                {name: "Verbal", link: "#/qualifications"},
                {name: "Written", link: "#/qualifications"}
            ]
        }
    ];
}
Qualifications.$inject = ['$scope'];

function Education($scope) {
    $scope.schools = [
        {name: "Utah Valley University",
            text: "I have been attending UVU for four and a half years now and have really enjoyed it.  My classes have been very interesting and I've learned a lot.  I have a love for learning new things because I have a firm belief that everything I learn will eventually benefit me at some point in my career.  A brief list of some of the classes I have completed are listed to the left.  Unfortunately, the three classes I have left are only taught in such a way that I have to wait until Spring of 2014 to graduate.",
            grad: "April 2014",
            remaining: 3,
            courses: ["Internet Software Development","Advanced Software Engineering","Introduction to Python","Database Theory","Analysis of Programming Languages","Discrete Structures","and more"],
            progress: 94}
    ];
}
Education.$inject = ['$scope'];

function WorkExperience($scope) {
    $scope.experience = [
        {name: "AboutOne LLC",
            position: "Client-side/Mobile App Developer",
            time: "March 2012 to Present",
            place: "Lehi, Utah",
            link: "http://www.aboutone.com",
            duties: [
                "Design/create mobile iOS/Android apps using PhoneGap",
                "Create statistics gathering service via Node.js web server",
                "Add new functionality to AboutOne.com web app",
                "Restyle existing AboutOne.com web pages using CSS"
            ]},
        {name: "Neovest, Inc",
            position: "Quality Assurance Intern",
            time: "April 2011 to March 2012",
            place: "Orem, Utah",
            link: "http://www.neovest.com",
            duties: [
                "Designed and wrote automated regression tests in Java",
                "Manually tested software each day before nightly build release",
                "Worked with lead developers to ensure that issues were fixed",
                "Worked with the QA team to find and fix software bugs"
            ]},
        {name: "Utah County 4H Mentoring",
            position: "Client-side/Mobile App Developer",
            time: "July 2009 to April 2011",
            place: "Provo, Utah",
            link: "http://utahcounty4-h.org/",
            duties: [
                "Recruit college-age mentors to work with youth",
                "Planned and executed monthly activities for youth and families"
            ]}
    ];
}
WorkExperience.$inject = ['$scope'];

function References($scope) {
    $scope.references = [
        {name: "Jesse Harding",
            company: "AboutOne LLC",
            position: "UI Team Manager",
            email: "jharding@aboutone.com",
            phone: "(801) 910-0724",
            web: "http://www.aboutone.com/",
            text: "Direct supervisor while working at AboutOne. He can verify my ability to learn new technologies quickly and how I am able to be flexible to changing priorities and working conditions. He will also verify my visual design skills while working on his front-end design team. He would always give me the most challenging assignments because he knew I could not only handle the work load but that the finished product would exceed his expectations."},
        {name: "Phil McDonald",
            company: "Neovest, Inc.",
            position: "QA Supervisor",
            email: "philsmcdonald@gmail.com",
            phone: "(801) 432-0560",
            web: "http://www.neovest.com/",
            text: "Supervisor while working for Neovest Inc. He will give a great reference for technical skills, coding/programming ability and interpersonal/people skills."},
        {name: "Jolene Bunnell",
            company: "Utah County 4-H",
            position: "USU Extension Agent",
            email: "jolene.bunnell@usu.edu",
            phone: "(801) 318-4603",
            web: "http://utahcounty4-h.org/",
            text: "Jolene is the executive director of the Utah Count 4-H program. I worked closely with her during my 18 months working for the 4-H program. She will attest to my love for hard work and how well I can work with other people, even in tough situations."}
    ];
}
References.$inject = ['$scope'];

function Contact($scope) {
    $scope.social = social;
    $scope.text = "I am available 24 hours a day by phone or email. \
            You are welcome to call, text or email any time. \
            I appreciate your sincere consideration for this position \
            and look forward to meeting you and working with you in the \
            future.";
    $scope.info = {
        name: "Zackary L. Boman",
        email: "zack.boman@gmail.com",
        phone: "(801) 589-0692"
    };
}
Contact.$inject = ['$scope'];

function Resume($scope, $http) {
    $scope.recipient = "";
    $scope.sendEmail = function(){
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test($scope.recipient.trim())){
            var data = {recipients: [$scope.recipient.trim()]};
            $http.post('/email', data)
                .success(function(resp){
                    console.log(JSON.stringify(resp));
                    $scope.recipient = "";
                    notify(
                        "Your email has been sent",
                        "An email has been sent to " + $scope.recipient.trim() + " with an attached copy of my resume and contact info.",
                        true,
                        "notify-success",
                        5000
                    );
                });
        }else{
            notify(
                "Email was invalid",
                "It looks like the email address you entered was invalid. Please try again.",
                true,
                "notify-error",
                5000
            );
        }
    };
}
Resume.$inject = ['$scope','$http'];