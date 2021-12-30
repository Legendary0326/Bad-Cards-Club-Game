
/*
Room state
    0 : waiting,
    1 : progressing,
    2 : emulating,
    3 : finished
*/

function Room (id = "", name = "", users = [], creator = {}, state = 0, pick = [], judge = "", turn = 1, password, pack) {
    this.id = id;
    this.name = name;
    this.creator = creator;
    this.state = state;
    this.users = users;
    this.pick =  pick;
    this.judge = judge;
    this.turn = turn;
    this.password = password;
    this.pack = pack;
}

Room.prototype.accept = function (user) {
    this.users.push(user)
}

Room.prototype.lose = function (user) {
    const index = this.users.findIndex( e => e.wallet === user.wallet)
    if(index !== -1) {
        return this.users.splice(index, 1)[0];
    }
}

Room.prototype.finish = function () {
    this.state = 3;
}

module.exports = Room;