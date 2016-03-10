var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var mailer = require('nodemailer');
var app = express();
var PORT = 80;

//var env = JSON.parse(process.env.VCAP_SERVICES);
var mongourl = ['mongodb-1.8'][0]['credentials'];

mongoose.connect(mongourl || 'mongodb://localhost/visitors');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('database open...');
});

var visitorSchema = mongoose.Schema({
    ip: String,
    count: {type: Number, default: 1},
    emails: {type: [String], default: []}
});

var Visitor = mongoose.model('Visitor', visitorSchema);

// Mail Settings
var email = mailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "zack.boman@gmail.com",
        pass: "bandz4ever"
    }
});

app.use(express.bodyParser());
app.use(express.methodOverride());

app.use('/js', express.static(__dirname + '/app/js'));
app.use('/stylesheets', express.static(__dirname + '/app/stylesheets'));
app.use('/scripts', express.static(__dirname + '/app/scripts'));
app.use('/css', express.static(__dirname + '/app/css'));
app.use('/lib', express.static(__dirname + '/app/lib'));
app.use('/img', express.static(__dirname + '/app/img'));
app.use('/images', express.static(__dirname + '/app/images'));
app.use('/glyphs', express.static(__dirname + '/app/glyphs'));
app.use('/partials', express.static(__dirname + '/app/partials'));
app.use('/misc', express.static(__dirname + '/app/misc'));


app.get('/', function(req, res) {

    if(req.connection && req.connection.remoteAddress){
        var ipAddress = req.connection.remoteAddress;
    }

    fs.readFile(__dirname + '/app/index.html', function(error, content) {
        if (error) {
            res.writeHead(500);
            res.end();
        }else{
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
    });

    if(ipAddress){
        console.log("Visitor: " + ipAddress);
        Visitor.findOne({'ip': ipAddress}, function(err, visitor){
            if(err || !visitor){
                visitor = new Visitor({
                    'ip': ipAddress
                });
                visitor.save(function(err){
                    if(err){
                        return console.log('error saving visitor: ' + ipAddress);
                    }
                    console.log('saved new visitor: ' + ipAddress);
                });
            }else{
                visitor.count++;
                visitor.save(function(err){
                    if(err){
                        return console.log('error updating visitor: ' + ipAddress);
                    }
                });
            }
        });
    }
});

app.get('/work-samples', function(req, res) {
    res.writeHead(302, {location: "/#/work-samples"});
    res.end();
});

app.get('/visitors', function(req, res) {
    Visitor.find(function(err, visitors){
        if(err || !visitors){
            return res.send(error("no visitors found"));
        }
        var resp = {};
        for(var i=0; i<visitors.length; i++){
            var ipCounts = {};
            for(var j=0; j<visitors[i].emails.length; j++){
                var email = visitors[i].emails[j];
                var count = ipCounts[email];
                ipCounts[email] = count ? count + 1 : 1;
            }
            ipCounts.VisitCount = visitors[i].count;
            resp[visitors[i].ip] = ipCounts;
        }
        res.send(resp);
    });
});

app.post('/email', function(req, res) {
    console.log(JSON.stringify(req.body));
    var recipients = req.body.recipients.join(", ") || "";
    if(recipients){
        var html = 'Hello,<br><br>My name is Zack Boman. I appreciate your sincere consideration \
            and look forward to meeting you and working with you in the future. \
            I love working with people, creating inventive solutions to complex tasks, \
            and working hard to accomplish a collective goal. I am a great team player \
            and will be an excellent addition to your staff.<br><br> \
            A brief summary of my qualifications can be found below:<br>\
            <ul><li><strong>Web Languages:</strong> AngularJS, JavaScript, HTML5, CSS3 with some Java, Python, C# and SQL</li>\
            <li><strong>Server Side:</strong> Node.js and MongoDB</li></ul><br>\
            You can contact me anytime, day or night, on my cell at (801) 589-0692 or at my email at \
            <a href="mailto:zack.boman@gmail.com">zack.boman@gmail.com</a>.  I have attached a copy of my resum&eacute; and references.  \
            You can also find out a lot more about me and even view \
            actual samples of my work by visiting my website at <a href="http://www.zackboman.com">www.zackboman.com</a>.<br><br>\
            Sincerely,<br><strong>Zack Boman</strong><br>Software Developer<br><em>Code Enthusiast</em><br>';
        var plaintext = 'Hello, \n\nMy name is Zack Boman. I appreciate your sincere consideration \
            and look forward to meeting you and working with you in the future. \
            I love working with people, creating inventive solutions to complex tasks, \
            and working hard to accomplish a collective goal. I am a great team player \
            and will be an excellent addition to your staff.\n\n \
            You can contact me anytime, day or night, on my cell at (801) 589-0692 or at my email at \
            zack.boman@gmail.com.  I have attached a copy of my resume and references. You can also find out a lot more about me and even view \
            actual samples of my work by visiting my website at www.zackboman.com.\n\n \
            Sincerely,\n\nZack Boman\nSoftware Developer\nCode Enthusiast';
        var mailOptions = {
            from: "Zack Boman <zack.boman@gmail.com>", // sender address
            to: recipients, // list of receivers
            bcc: 'tennisgent@gmail.com',
            subject: "Resume from Zack Boman", // Subject line
            text: plaintext, // plaintext body
            html: html, // html body
            attachments: [
                {fileName: "ZackBomanResume.pdf",
                    filePath: __dirname + '/app/misc/ZackBomanResume.pdf',
                    contentType: "application/pdf"},
                {fileName: "ZackBomanReferences.pdf",
                    filePath: __dirname + '/app/misc/ZackBomanReferences.pdf',
                    contentType: "application/pdf"},
                {fileName: "ZackBoman_vCard.vcf",
                    filePath: __dirname + '/app/misc/ZackBoman_vCard.vcf',
                    contentType: "text/x-vcard"}
            ]
        };

        email.sendMail(mailOptions);

        res.send(success("An email was successfully sent to: " + recipients));

//        if(req.connection && req.connection.remoteAddress){
//            Visitor.findOne({'ip': req.connection.remoteAddress}, function(err, visitor){
//                if(err || !visitor){
//                    console.log(err || "cannot save email address because there was no such record for this visitor")
//                }else{
//                    for(var i=0; i<req.body.recipients.length; i++){
//                        visitor.emails.push(req.body.recipients[i]);
//                    }
//                    visitor.save(function(err, vis){
//                        if(err){
//                            return console.log('error updating visitor: ' + req.connection.remoteAddress + ' because: ' + err);
//                        }
//                        var tempOptions = {
//                            from: "Zack Boman <zack.boman@gmail.com>", // sender address
//                            to: "tennisgent@gmail.com", // list of receivers
//                            subject: "Resume Email Sent", // Subject line
//                            html: "A resume email has been sent to the following: " + recipients + "<br><ul>" +
//                                "<li>Visited: " + vis.count + "</li>" +
//                                "<li>IP Address: " + vis.ip + "</li></ul>"
//                        };
//                        email.sendMail(tempOptions);
//                    });
//                }
//            });
//        }

    }else{
        res.send(error("No email was specified"));
    }


});


app.post('/vcard', function(req, res) {
    var recipients = req.body.recipients.join(", ") || "";
    var filePath = req.body.filePath;
    if(recipients){
        var html = 'Hello,<br><br>My name is Zack Boman. I appreciate your sincere consideration \
            and look forward to meeting you and working with you in the future. \
            The vCard file you requested is attached to this email.<br><br> \
            If you have any further questions, please visit my website at <a href="http://www.zackboman.com">www.zackboman.com</a> \
            or you can contact me on my cell at (801) 589-0692.<br><br>\
            Sincerely,<br><br><strong>Zack Boman</strong><br>Software Developer<br><em>Code Enthusiast</em><br>';
        var plaintext = 'Hello, \n\nMy name is Zack Boman. I appreciate your sincere consideration \
            and look forward to meeting you and working with you in the future. \
            The vCard file you requested is attached to this email.\n\n \
            If you have any further questions, please visit my website at www.zackboman.com \
            or you can contact me on my cell at (801) 589-0692.\n\n \
            Sincerely,\n\nZack Boman\nFront End Web Developer\nCode Enthusiast';
        var fileName = filePath.substr(filePath.lastIndexOf('/')+1, filePath.length);
        var mailOptions = {
            from: "Zack Boman <zack.boman@gmail.com>", // sender address
            to: recipients, // list of receivers
            subject: "vCard Contact Information", // Subject line
            text: plaintext, // plaintext body
            html: html, // html body
            attachments: [
                {fileName: fileName,
                    filePath: __dirname + '/app/' + filePath,
                    contentType: "text/x-vcard"}
            ]
        };

        email.sendMail(mailOptions);

        res.send(success("An email was successfully sent to: " + recipients));

    }else{
        res.send(error("No email was specified"));
    }


});






function success(text, data){
    var resp = {
        code: 0,
        message: text
    };
    if(data){
        resp.data = data;
    }
    return JSON.stringify(resp);
}

function error(text, data){
    var resp = {
        code: 100,
        message: text
    };
    if(data){
        resp.data = data;
    }
    return JSON.stringify(resp);
}

console.log("Running on port " + (process.env.VCAP_APP_PORT || PORT) + "...");
app.listen(process.env.VCAP_APP_PORT || PORT);



