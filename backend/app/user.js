function User (wallet = "", username = "", isPart = false, isJudge = false, room = "", isApprove = false) {
    this.wallet = wallet;
    this.username = username;
    this.isPart = isPart;
    this.isJudge = isJudge;
    this.room = room;
    this.isApprove = isApprove;
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
    this.isApprove = false;
}

module.exports = User;