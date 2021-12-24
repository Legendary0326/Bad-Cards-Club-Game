// create Express listener instance
const app = require('connect')()
            .use(require("morgan")("dev"))
            .use(require("compression")())
            .use(require("serve-static")("public"));

const http = require('http');   
const server = http.createServer(app);
// create socket.io server and bind it to the existing http server
const io = require('socket.io')(server);
const User = require('./app/user');
const Room = require('./app/room');
const contents = require('./contents/card.json')

// start the http server

// const Game = require("./game");
// const game = new Game();

server.listen(process.env.PORT || 8000);

let rooms = []
let users = []
let chats = []

const createRoom = (wallet, roomname) => {
    const user = users.find(e => e.wallet === wallet)
    if(user) {
        const id = Date.now()
        const newRoom =  new Room(
            id, 
            roomname, 
            [user], 
            user,
            0
        )
        rooms.push(newRoom)
        user.setRoom(id);

        return {newRoom: newRoom, user: user}
    } else {
        return false;
    }
}

const addUser = (username, wallet) => {
    const user = users.find((user) => user.wallet == wallet);
    if(user) {
        user.wallet = wallet;
        user.username = username
        return user
    } else {
        const newOne = new User(
            wallet, 'User' + (users.length + 1), 
        )
        users.push(newOne)
        return newOne
    }
}

const addChats = (username, content) => {
    chats.push({
        username: username,
        content : content
    })
}

io.sockets.on("connection", function (socket) {

    socket.on("rooms", () => {
        socket.emit("rooms", rooms)
    })

    socket.on("room", (data) => {
        const room =  rooms.find(e => e.id == data.id)
        const players = room.users.map(e => users.find(u => u.wallet === e.wallet));
        socket.emit("room", {room: room, users: players})
    })
    
    socket.on("createRoom", (data) => {
        const info = createRoom(data.wallet, data.roomname)
        if(info) {
            socket.join(info.newRoom.id)
        }
        socket.emit("userInfo", info.user)
        io.emit("rooms", rooms)
    })

    socket.on("addUser", (data) => {
        const newUser = addUser(data.username, data.wallet)
        socket.emit("userInfo", newUser)
    }) 

    socket.on("addChats", (data) => {
        addChats(data.username, data.content)
        io.emit("chats", chats)
    })

    socket.on("chats", () => {
        socket.emit("chats", chats);
    })

    socket.on("userInfo", (data) => {
        const user = users.find( e => e.wallet === data.wallet)
        socket.emit("userInfo", user)
    })

    socket.on("join", (data) => {
        const room = rooms.find(e => e.id == data.roomID)
        const user = users.find(e => e.wallet == data.wallet)
        room.accept(user)
        user.setRoom(room.id)
        socket.emit("userInfo", user)
        io.emit("rooms", rooms)
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
