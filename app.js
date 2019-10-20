var express = require("express");
var path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
var cookieParser = require("cookie-parser");
const nodemailer = require('nodemailer');

var app = express();

var logger = require("morgan");
var http = require("http");
var server = http.createServer(app);

var io = require("socket.io")(server);

var categoryRoute = require("./routes/api/category");
var usersRoute = require("./routes/api/users");
var vendorsRoute = require("./routes/api/vendors");
var uploadRoute = require("./routes/api/upload");
var surveyRoute = require("./routes/api/survey");
var plansRoute = require("./routes/api/plans");

var ChatController = require("./controller/chatController");

// socket setup
app.use(express.static("client/build"));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

////// firebase storage initialize end
const keyFilename = "./config/firebase.json"; //replace this with api key file
const projectId = "bridal-network-e9867"; //replace with your project id
const bucketName = "bridal-network-e9867.appspot.com";
const gcs = require("@google-cloud/storage");
const stg = new gcs.Storage({
  projectId,
  keyFilename
});
const bucket = stg.bucket(bucketName);
///////////  firebase storage initialize end

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

var usersConnected = [];

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'firebase.bridalnetwork@gmail.com', // generated ethereal user
    pass: 'bridalnetwork89!' // generated ethereal password
  }
});

io.on("connection", socket => {
  usersConnected.push(socket);
  console.log("user connected");

  socket.on("getUsersAndChats", authuser => {
    ChatController.getChatList(io, authuser.userUid);
    // ChatController.getUserList(io, authuser.userUid);
  });

  socket.on("message_send", message => {
    let receiver = message.receiverId;
    let sender = message.senderId;

    if (message.chat) {
      if (message.chat.message) {
        // console.log(message.chat.message);
        User.findOne({ _id: sender }, { first_name: true, last_name: true, email: true }).then(user => {
          if (user) {
            User.findOne({ _id: receiver }, { first_name: true, last_name: true, email: true }).then(user2 => {
              if (user2) {
                // console.log(user2);
                transporter.sendMail({
                  from: '"Bridal Network" firebase.bridalnetwork@gmail.com', // sender address
                  to: user2.email, // list of receivers
                  subject: 'You have received a new message from ' + user.first_name + " " + user.last_name, // Subject line
                  // text: message.chat.message, // plain text body
                  html: '<b>Message at Bridal Network:</b><br/>' + message.chat.message // html body
                });
              }
            });
          }
        });

      }
    }
    ChatController.handleMessageSend(message, io, bucket);
  });

  socket.on("disconnect", function () {
    usersConnected.splice(usersConnected.indexOf(socket), 1);
  });
});

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

app.use("/api/category", categoryRoute);
app.use("/api/vendors", vendorsRoute);
app.use("/api/users", usersRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/survey", surveyRoute);
app.use("/api/plans", plansRoute);

// Server static assets if in production
if (true) {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

mongoose.connection.once("open", () => console.log("database connected"));

const port = 5000;
server.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port}`));

module.exports = app;
