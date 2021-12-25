
/*
Room state
    0 : waiting,
    1 : progressing,
    2 : finished
*/

function Room (id = "", name = "", users = [], creator = {}, state = 0, pick = [], judge = "") {
    this.id = id;
    this.name = name;
    this.creator = creator;
    this.state = state;
    this.users = users;
    this.pick =  pick;
    this.judge = judge
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
    this.state = 2;
    this.creator = {};
    this.users = [];
}

module.exports = Room;