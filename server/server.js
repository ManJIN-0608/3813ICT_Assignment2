const express = require('express');
const app = express();
const path = require('path');
const io = require('socket.io')(http);
const sockets = require('./socket.js');

const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, { poolSize: 10, useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {
    if (err) {
        return console.log(err)
    }
    const dbName = 'myapp';
    const db = client.db(dbName);

    let users = db.collection('users');
    await users.insertOne({"username":"test12"});

    // Require all routes
    require("./routes/checkUser.js")(app, db);
    require("./routes/fetchAllUsers.js")(app, db);
    require("./routes/addUser.js")(app, db);
    require("./routes/fetchUser.js")(app, db);
    require("./routes/deleteUser.js")(app, db);
    require("./routes/addGroup.js")(app, db);
    require("./routes/fetchAllGroups.js")(app, db);
    require("./routes/deleteGroup.js")(app, db);
    require("./routes/addUsersToGroup.js")(app, db);
    require("./routes/addChannel.js")(app, db);
    require("./routes/fetchAllChannels.js")(app, db);
    require("./routes/deleteChannel.js")(app, db);
    require("./routes/addUsersToChannel.js")(app, db);
    require("./routes/deleteUsersFromChannel.js")(app, db);
    require("./routes/deleteUsersFromGroup.js")(app, db);
});


const PORT = 3000;

sockets.connect(io, PORT);

// Cross origin resourse sharing to cater for port 4200 to port 3000
const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Point static path to dist if you want use your own server to serve Angular webpage
app.use(express.static('http://localhost:4200'));


var http = require('http').Server(app);
let server = http.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("My First Nodejs Server!");
    console.log("Server listening on: " + host + " port: " + port);
});

