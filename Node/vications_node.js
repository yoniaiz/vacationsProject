const http = require("http");
const socketIO = require("socket.io");
const express = require("express");

const vicationsHandler = require("./Handlers/vicationsHandler");
const loginHandler = require("./Handlers/loginHandler");

const cors = require("cors");
var app = express();
var cookieParser = require("cookie-parser");
var session = require("express-session");
var bodyParser = require("body-parser");

const port = 8080;

var corsOptions = {
  optionsSuccessStatus: 200,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  credentials: true,
  origin: ["http://localhost:3000"] // here goes Frontend IP
};
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
  session({
    secret: "somerandonstuffs",
    resave: false
  })
);

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server);

io.on("connection", socket => {
  console.log("New client connected");

  // just like on the client side, we have a socket.on method that takes a callback function
  socket.on("cardsChanged", () => {
    // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
    // we make use of the socket.emit method again with the argument given to use from the callback function above
    io.sockets.emit("cardsChanged");
  });
  socket.on("like", () => {
    // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
    // we make use of the socket.emit method again with the argument given to use from the callback function above
    io.sockets.emit("like");
  });

  // disconnect is fired when a client leaves the server
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// `socket` is the server side of the socket
server.listen(port, () => console.log(`Listening on port ${port}`));

// /const client = require('socket.io-client')('http://localhost:' + port);

app.get("/getVacations", async (req, res) => {
  let vications = await vicationsHandler.getAll();
  res.send(vications);
});

app.get("/loginUser", async (req, res) => {
  let answer = await loginHandler.checkIfExist(req.query);
  let user = await loginHandler.getUser(
    req.query.first_name,
    req.query.password
  );
  user = JSON.stringify(user);
  if (req.query.rememberMe != "false") {
    res.cookie("remember-me", "1", {
      expires: new Date(Date.now() + 90000000),
      httpOnly: true
    });
    res.cookie("user", user, {
      expires: new Date(Date.now() + 90000000),
      httpOnly: true
    });
  } else {
    req.session.user = user;
  }
  res.send(
    answer.exist
      ? answer.role == 2
        ? "found-admin"
        : "found"
      : "User not found"
  );
});
app.get("/insertUser", async (req, res) => {
  let answer = await loginHandler.insertUser(req.query.user);
  res.send(answer ? "inserted" : "User exist");
});

app.get("/getUser", async (req, res) => {
  let user = await loginHandler.getUser(
    req.cookies["user"],
    req.cookies["password"]
  );
  res.send(user);
});

app.get("/likedVic", async (req, res) => {
  let user = await loginHandler.getUser(
    req.query.first_name,
    req.query.password
  );
  let answer = await vicationsHandler.insertLikedVic(
    user[0].id,
    req.query.vicationId
  );
  res.send(answer);
});

app.get("/getLikedVacations", async (req, res) => {
  let user = await loginHandler.getUser(
    req.query.first_name,
    req.query.password
  );
  let vications = await vicationsHandler.getAllLiked(user[0].id);
  res.send(vications);
});

app.get("/rememberd", async (req, res) => {
  log = {
    remembrd: req.cookies["remember-me"],
    user: req.cookies["user"],
    session: req.session.user
  };
  res.send(log);
});

app.get("/updateVic", async (req, res) => {
  let update = await vicationsHandler.updateVic(JSON.parse(req.query.vic));
  res.send(update);
});

app.get("/deleteVic", async (req, res) => {
  let deleted = await vicationsHandler.deleteVic(req.query.vic);
  res.send(deleted);
});

app.get("/addVic", async (req, res) => {
  let added = await vicationsHandler.addVic(JSON.parse(req.query.vic));
  res.send(added);
});

app.get("/clear", function(req, res) {
  res.clearCookie("remember-me", "1");
  res.clearCookie("user", req.query.user);
  req.session.destroy();
  res.send("removed");
});

app.get("/getVacationChart", async (req, res) => {
  let vacations = await vicationsHandler.getVacationChart();
  res.send(vacations);
});
