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

server.listen(process.env.PORT || 8000);

let rooms = []
let users = []
let chats = []
let gameTimer;
let timer = 60;

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
        room.pick_turn = room.users.find(e => e.wallet != room.judge.wallet)
        room.state = 1

        io.emit("rooms", rooms)
        io.to(room.id).emit("room", room);
        gameTimer = setInterval(() => {
            if(timer < 1) {
                if(room.state == 1) {
                    timer = 60
                } else if(room.state == 2) {
                    timer = 10
                }
            }
            io.to(room.id).emit("timer", timer)
            timer --;
        }, 1000)
    })

    socket.on('content', roomID => {
        const content = getOneCardContent()
        io.to(roomID).emit("content", content);
    })

    socket.on("next", data => {
        const content = getOneCardContent()
        let room = rooms.find(e => e.id == data.room.id)

        data.vote.forEach(e => {
            let user = room.users.find(o => o.wallet ==  e)
            if(user.vote) {
                user.vote = parseInt(user.vote) + 1;
            } else {
                user.vote = 1
            }
        })

        const winner = room.users.find(e => e.vote > 4)
        if(winner) {
            let room = rooms.find(e => e.id == data.room.id)
    
            room.users.forEach(element => {
                let user = users.find(e => e.wallet == element.wallet) 
                user.room = ""
                user.isPart =  false
            });
            room.finish()
            clearInterval(gameTimer)
            io.to(room.id).emit("room", room);

        } else {
            room.state = 2
            gameTimer = setInterval(() => {
                io.to(room.id).emit("timer", timer)
                timer --;
            }, 1000)

            setTimeout( () => {
                timer = 60
                room.state = 1
                room.pick = []
                room.turn = parseInt(room.turn) + 1

                const userCount = room.users.length;
                const judgePos  = room.users.findIndex(e => e.wallet == room.judge.wallet)
                let newJudge  = room.users[(judgePos + 1) % userCount]
                newJudge.isJudge = true;

                room.judge = newJudge;
                room.pick_turn = room.users.find(e => e.wallet != room.judge.wallet)

                io.to(room.id).emit("room", room);
                io.to(room.id).emit('content', content)
            }, 10000)
            timer = 10
            io.to(room.id).emit("result", data.vote)
            io.to(room.id).emit("room", room);
        }
    })

    socket.on("quit", data => {
        const roomIndex = rooms.findIndex(e => e.id ==  data.id);
        const room = rooms[roomIndex]
        room.users.forEach(element => {
            let user = users.find(e => e.wallet == element.wallet)
            user.room = ""
            user.isPart = false
        })

        if(roomIndex !== -1) {
            rooms.splice(roomIndex, 1)
        }

        io.to(data.id).emit("room", null)
        io.emit("rooms", rooms)
    })

    socket.on("next_pick_turn", data => {
        let room = rooms.find(e => e.id == data.id)
        let current_user_index
        if(room.pick_turn) {
            current_user_index = room.users.findIndex(e => room.pick_turn.wallet == e.wallet)
        } else {
            current_user_index = -1
        }
        let next_pick_turn_user = null
        for(let i = 0; i < room.users.length; i ++) {
            if(i < current_user_index) 
                continue;
            if(room.users[i].wallet != room.judge.wallet && room.users[i].wallet != room.pick_turn.wallet) {
                next_pick_turn_user = room.users[i]
                break;
            }
        }
        if(next_pick_turn_user) {
            timer = 60
        } else {
            clearInterval(gameTimer)
            timer = 10
        }
        room.pick_turn = next_pick_turn_user
        io.to(room.id).emit("room", room)
    })

    socket.on("pick", data => {
        let room = rooms.find(e => e.id == data.room.id)
        room.pick.push({
            user : data.user,
            text : data.text
        })

        io.to(room.id).emit("room", room)
    })

    socket.on("leave", data => {
        const room =  rooms.find(e => e.id == data.room.id)
        const userId = room.users.findIndex(e => e.wallet == data.user.wallet)
        if(userId !== -1) {
            room.users.splice(userId, 1)
        }
        const user = users.find(e => e.wallet == data.user.wallet);
        user.room = "";
        user.isPart = false;
        socket.leave(room.id);
        io.to(room.id).emit("room", room);
    })
});
