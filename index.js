const express = require('express');

const app = express();

const server = require("http").createServer(app);
global.io = require("socket.io")(server);

const config = require("./config");
// const mongoDBConnect = require("./mongoDbConnection")
const chat = require("./io")

app.get('/', (req, res) => {
    res.send('Hello from Codedamn');
})


server.listen(config.PORT, () => { 

    console.log("Server Started at PORT: " + config.PORT);

});

global.server = server