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


function Main($scope, $location, Email, $rootScope, Intro, $http){
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
    $scope.recipient = "";
    $scope.sendEmail = function(){
        setTimeout(function(){
            Email.send([$scope.recipient.trim()], function(resp){
                $scope.recipient = "";
            });
        }, 1000);
    };
    $rootScope.Intro = Intro;

    $http.jsonp('https://api.stackexchange.com/2.2/users/1313904?site=stackoverflow&callback=JSON_CALLBACK').success(function(data){
        data = data.items[0];
        $scope.so = {
            badgeCounts: data.badge_counts,
            reputation: data.reputation,
            photo: data.profile_image,
            link: data.link,
            username: data.display_name
        };
    });
}
Main.$inject = ['$scope','$location','Email','$rootScope','Intro','$http'];

function Home($scope, $rootScope, Email) {
    $scope.languages = [
        "JavaScript/HTML/CSS",
        "Java",
        "C# and ASP.NET",
        "Python"
    ];
    $scope.social = social;

    var Intro = $rootScope.Intro;

    $rootScope.takeTour = function(override){
        Intro.start = function(){
            if(!override && !Intro.okToStart()) return false;
            window.scrollTo(0,0);
            Intro.addCanvas();
            Intro.textBox(
                "Welcome!",
                "My name is Zack Boman and this website is my online resume. Let me show you around!",
                "",
                "Take a Tour!"
            );
            Intro.next = function(){
                var visible = $("#header-resume").is(":visible");
                if(visible){
                    Intro.clearArc('#header-resume');
                }
                Intro.textBox(
                    "The PDF Shortcut",
                    (visible ? 'By tapping this button, you' : 'You ') + " can view the PDF version of my resume or I'll even email you a copy.",
                    "",
                    "Next"
                );
                Intro.next = function(){
                    Intro.clearRect('#sidebar');
                    Intro.textBox(
                        "Browse Around",
                        "Use this menu to navigate your way around the site.  There's lots to see so feel free to take your time.",
                        "",
                        "Next"
                    );
                    Intro.next = function(){
                        Intro.addCanvas();
                        Intro.textBox(
                            "Thank You!",
                            "I sincerely appreciate your time and consideration and look forward to meeting you and working with you in the future.  I know I'll be a helpful addition to your team.",
                            "",
                            "Start Browsing"
                        );
                        Intro.next = Intro.end;
                    };
                };
            };
        };

        window.onorientationchange = function(){
            if(Intro.active) Intro.start();
        };
        window.onresize = function(){
            if(Intro.active) Intro.centerBox('#intro-textbox', 130);
        };

        Intro.start();
    };

    setTimeout(function(){
        $rootScope.takeTour();
    }, 1000);

    $scope.recipient = "";
    $scope.sendEmail = function(){
        Email.send([$scope.recipient.trim()], function(resp){
            $scope.recipient = "";
        });
    };

}
Home.$inject = ['$scope','$rootScope','Email'];

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
            text: "I attended UVU for four and really enjoyed it.  My classes were very interesting and I learned a lot.  I have a love for learning new things because I have a firm belief that everything I learn will eventually benefit me at some point in my career.  A brief list of some of the classes I have completed are listed to the left.  I recently graduated in April of 2014.",
            grad: "April 2014",
            remaining: 0,
            courses: ["Compilers","Advanced Computer Architecture","Internet Software Development","Advanced Software Engineering","Introduction to Python","Database Theory","Analysis of Programming Languages","Discrete Structures","and more"],
            progress: 100}
    ];
}
Education.$inject = ['$scope'];

function WorkExperience($scope) {
    $scope.experience = [
        {
            name: "Xactware, Inc",
            position: "Front End Web Developer",
            time: "April 2013 to Present",
            place: "Lehi, Utah",
            link: "http://test.xactcredentials.com",
            duties: [
                "Architect a full-scale, enterprise web application",
                "100% Responsive design with CSS3 animations",
                "80% front-end javascript unit test coverage",
                "Focus on simple, maintainable implemenations",
                "Design, write, maintain Grunt/Gulp build scripts",
                "Created AngularJS-Protractor Reporting framework"
            ]
        },
        {
            name: "AboutOne LLC",
            position: "Client-side/Mobile App Developer",
            time: "March 2012 to April 2013",
            place: "Lehi, Utah",
            link: "http://www.aboutone.com",
            duties: [
                "Design/create mobile iOS/Android apps using PhoneGap",
                "Create statistics gathering service via Node.js web server",
                "Add new functionality to AboutOne.com web app",
                "Restyle existing AboutOne.com web pages using CSS"
            ]
        },
        {
            name: "Neovest, Inc",
            position: "Quality Assurance Intern",
            time: "April 2011 to March 2012",
            place: "Orem, Utah",
            link: "http://www.neovest.com",
            duties: [
                "Designed and wrote automated regression tests in Java",
                "Manually tested software each day before nightly build release",
                "Worked with lead developers to ensure that issues were fixed",
                "Worked with the QA team to find and fix software bugs"
            ]
        },
        {
            name: "Utah County 4H Mentoring",
            position: "Site Coordinator",
            time: "July 2009 to April 2011",
            place: "Provo, Utah",
            link: "http://utahcounty4-h.org/",
            duties: [
                "Recruit college-age mentors to work with youth",
                "Planned and executed monthly activities for youth and families"
            ]
        }
    ];
}
WorkExperience.$inject = ['$scope'];

function References($scope, $rootScope, Util, Email) {
    var Intro = $rootScope.Intro;
    $scope.references = [
        {
            name: "Robert Rollins",
            company: "Xactware Inc",
            position: "XactCredentials Development Team Lead",
            email: "rollinsgi@gmail.com",
            phone: "(801) 602-8216",
            realPhone: "8016028216",
            web: "http://test.xactcredentials.com/",
            text: "He is my current supervisor at Xactware. He will testify to my hard work, my ability to lead and guide others, as well as my technical and programming skills. He is a great guy and has taught me a lot about leadership and team management.",
            vcard: "misc/RobertRollins_vCard.vcf"
        },
        {
            name: "Jesse Harding",
            company: "AboutOne LLC",
            position: "UI Team Manager",
            email: "jharding@aboutone.com",
            phone: "(801) 910-0724",
            realPhone: "8019100724",
            web: "http://www.aboutone.com/",
            text: "Direct supervisor while working at AboutOne. He can verify my ability to learn new technologies quickly and how I am able to be flexible to changing priorities and working conditions. He will also verify my visual design skills while working on his front-end design team. He would always give me the most challenging assignments because he knew I could not only handle the work load but that the finished product would exceed his expectations.",
            vcard: "misc/JesseHarding_vCard.vcf"
        },
        {
            name: "Phil McDonald",
            company: "Neovest, Inc.",
            position: "QA Supervisor",
            email: "philsmcdonald@gmail.com",
            phone: "(801) 432-0560",
            realPhone: "8014320560",
            vcard: "misc/PhilMcDonald_vCard.vcf",
            web: "http://www.neovest.com/",
            text: "Supervisor while working for Neovest Inc. He will give a great reference for technical skills, coding/programming ability and interpersonal/people skills."
        }
    ];
    $scope.downloadVCF = function(ref){

        Intro.start = function(){
            Intro.addCanvas();
            Intro.showBox(
                "#vcard-textbox",
                {"#vcard-description": "To protect my references, I have hidden their phone numbers.  If you'd like " + ref.name + "'s complete contact information, please download his/her electronic vCard"}
            );
            Intro.next = function(){
                $("#intro-textbox").fadeOut();
                if(Util.isApple()){
                    Intro.showBox("#vcard-textbox2");
                    Intro.next = function(){
                        var email = $("#vcard-email").val().trim();
                        Email.vcard(email, ref.vcard, function(resp){
                            Intro.end();
                        });
                    };
                }else{
                    Intro.end();
                    window.location = ref.vcard;
                }
            };
            var temp = Intro.end;
            Intro.end = function(){
                $("#vcard-textbox, #vcard-textbox2, #intro-canvas").fadeOut();
                Intro.active = false;
                Intro.end = temp;
            };
        };

        window.onorientationchange = function(){
            if(Intro.active) Intro.start();
        };
        window.onresize = function(){
            if(Intro.active){
                Intro.centerBox('#vcard-textbox');
                Intro.centerBox('#vcard-textbox2');
            }
        };

        Intro.start();
    };
}
References.$inject = ['$scope','$rootScope','Util','Email'];

function Contact($scope, Intro, Util, Email) {
    $scope.social = social;
    $scope.text = "I am available 24 hours a day by phone or email. \
            You are welcome to call, text or email any time. \
            I appreciate your sincere consideration for this position \
            and look forward to meeting you and working with you in the \
            future.";
    $scope.info = {
        name: "Zackary L. Boman",
        email: "zack.boman@gmail.com",
        phone: "(801) 589-0692",
        address1: "2528 N Elm Dr",
        address2: "Lehi, UT 84043",
        vcard: 'misc/ZackBoman_vCard.vcf'
    };
    $scope.downloadVCF = function(ref){
        if(Util.isApple()){
            Intro.start = function(){
                Intro.addCanvas();
                Intro.showBox("#vcard-textbox2");
                Intro.next = function(){
                    var email = $("#vcard-email").val().trim();
                    Email.vcard(email, ref.vcard, function(resp){
                        Intro.end();
                    });
                };
                var temp = Intro.end;
                Intro.end = function(){
                    $("#vcard-textbox2, #intro-canvas").fadeOut();
                    Intro.active = false;
                    Intro.end = temp;
                };
            };
            window.onorientationchange = function(){
                if(Intro.active) Intro.start();
            };
            window.onresize = function(){
                if(Intro.active){
                    Intro.centerBox('#vcard-textbox2');
                }
            };
            Intro.start();
        }else{
            window.location = ref.vcard;
        }
    };
}
Contact.$inject = ['$scope','Intro','Util','Email'];

function Resume($scope, Email) {
    $scope.recipient = "";
    $scope.sendEmail = function(){
        Email.send([$scope.recipient.trim()], function(resp){
            $scope.recipient = "";
        });
    };
}
Resume.$inject = ['$scope','Email'];