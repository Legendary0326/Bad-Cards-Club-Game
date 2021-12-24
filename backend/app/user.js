function User (wallet = "", username = "", isPart = false, isJudge = false, room = "") {
    this.wallet = wallet;
    this.username = username;
    this.isPart = isPart;
    this.isJudge = isJudge;
    this.room = room;
}

User.prototype.setUsername = function (username) {
    this.username = username;
}

User.prototype.setRoom = function (room) {
    this.room = room;
    this.isPart = true;
} 

User.prototype.leaveRoom = function() {
    this.room = "";
    this.isPart = false;
}

module.exports = User;