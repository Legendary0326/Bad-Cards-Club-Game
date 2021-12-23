// create Express listener instance
const app = require('connect')()
            .use(require("morgan")("dev"))
            .use(require("compression")())
            .use(require("serve-static")("public"));

const http = require('http');
const server = http.createServer(app);
// create socket.io server and bind it to the existing http server
const io = require('socket.io')(server);

// start the http server

// const Game = require("./game");
// const game = new Game();

server.listen(process.env.PORT || 8000);

io.sockets.on("connection", function (socket) {
    let rooms = [{
        username: 'hi',
        roomname: 'yes'
    }]
    const createRoom = (username, roomname) => {
        rooms.push({
            username : username,
            roomname :  roomname
        })
    }
    socket.emit("rooms", rooms);
    
    socket.on("createRoom", (data) => {
        console.log(rooms)
        createRoom(data.username, data.roomname)
        socket.emit("rooms", rooms)
    })

    // const me = game.createPlayer(socket.id);

    // socket.emit("game", game.pickle(), me.name);
    // socket.emit("hand", me.hand);

    // socket.on("disconnect", function () {
    //     me.quit();
    // });

    // socket.on("play", function (card) {
    //     me.play(card);
    // });

    // socket.on("pick", function (card) {
    //     me.pick(card);
    // });

    // socket.on("name", function (name) {
    //     me.name = name;
    //     me.emit("update");
    // });

    // me.on("update", function () {
    //     socket.emit("me", me.pickle());
    // });

    // me.on("hand", function () {
    //     socket.emit("hand", me.hand);
    // });

    // game.on("update", function () {
    //     socket.emit("game", game.pickle(), me.id);
    // });
});

// game.on("judge", function (cards) {
//   io.sockets.emit("judge", cards);
// });
