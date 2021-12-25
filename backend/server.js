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

const getOneCardContent = () => {
    const quesNo = Math.ceil(Math.random() * contents.blackCards.length - 1)
    const question = contents.blackCards[quesNo]['text']
    let content = []

    for(let i = 0; i < 5; i ++) {
        const contNo = Math.ceil(Math.random() * contents.whiteCards.length - 1);
        const con = contents.whiteCards[contNo]

        content.push(con)
    }

    return { question: question, content: content }
}

const createRoom = (wallet, roomname) => {
    const user = users.find(e => e.wallet === wallet)
    if(user) {
        const id = Date.now()
        const newRoom =  new Room(
            id, 
            roomname, 
            [user], 
            user,
            0,
            [],
            user
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
        socket.emit("room", room)
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
        room.accept(user);
        user.setRoom(room.id);
        socket.join(room.id);
        socket.emit("userInfo", user);
        io.emit("rooms", rooms);
        io.to(room.id).emit("room", room);
    })

    socket.on("start", roomID => {
        const room = rooms.find(e => e.id == roomID)
        room.state = 1

        io.emit("rooms", rooms)
        io.to(room.id).emit("room", room);
    })

    socket.on('content', roomID => {
        const content = getOneCardContent()
        io.to(roomID).emit("content", content);
    })

    socket.on("next", data => {
        const content = getOneCardContent()
        let room = rooms.find(e => e.id == data.room.id)

        room.pick = []
        data.vote.forEach(e => {
            let user = room.users.find(o => o.wallet ==  e)
            if(user.vote) {
                user.vote = parseInt(user.vote) + 1;
            } else {
                user.vote = 1
            }
        })

        const userCount = room.users.length;
        const judgePos  = room.users.findIndex(e => e.wallet == room.judge.wallet)
        const newJudge  = room.users[(judgePos + 1) % userCount]

        room.judge = newJudge;

        io.to(room.id).emit("room", room);
        io.to(room.id).emit('content', content)

        console.log(room)
    })

    socket.on("pick", data => {
        let room = rooms.find(e => e.id == data.room.id)
        room.pick.push({
            user : data.user,
            text : data.text
        })

        io.to(room.id).emit("room", room)
    })

    socket.on("quit", roomID => {
        const room = rooms.find(e => e.id == roomID)

        room.users.forEach(element => {
            const user = users.find(e => e.wallet == element.wallet) 
            user.room = ""
            user.isPart =  false
        });
        io.to(room.id).emit("quit");
        const index = rooms.findIndex( e => e.id === room.id)
        if(index !== -1) {
            return rooms.splice(index, 1)[0];
        }      
        room.finish()
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
