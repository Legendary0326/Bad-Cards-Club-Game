/*
 * @name setRoutes
 * @param {Object} app
 * @summary sets all HTTP routes for the Express application
 */

module.exports = function setIO(app,fs,io){
	/* Handle connections */
	io.on('connection', handleConnection);
	
	/* get and shuffle answer deck */
	var deck = fs.readFileSync(app.get('publicPath') + 'deck.html').toString().split("\n");
	shuffle(deck);
	
	/* get and shuffle question deck */
	var questions = fs.readFileSync(app.get('publicPath') + 'questions.html').toString().split("\n");
	shuffle(questions);
	
	var qindex 		= 0, /* index of next question card in deck to be drawn */
		aindex 		= 0, /* index of next answer card in deck to be drawn */
		jindex		= 0, /* player index of current judge */
		question	= questions[qindex], /* current question card */
		answers 	= [], /* current hand's submitted answers */
		players		= [], /* player scores and info */
		hand		= 0, /* current hand being played */
		winner		= ''; /* hand winner */
	
	/*
	 * @name handleConnection
	 * @param {client} http client
	 * @summary used as a callback handler on socket.io message events
	 */
	function handleConnection(client){
		console.log('New Connection');
		client.on('disconnect', handleDisconnection);
		
		/* Draw answer card */
		client.on('draw', function(){
			var card = deck[aindex];
			aindex++;
			client.emit('draw',card);
		});
		
		client.on('submit', function(answer){
			// prevent double-submissions from the same player
			for(i = 0; i < answers.length; i++) {
				if(answers[i].player == answer.player)
					return;
			}
			
			answers.push(answer);
		});
		
		client.on('winner', function(_winner){			
			// locate winner by nickname
			nick = '';
			for(i = 0; i < answers.length; i++) {
				if(answers[i].text == _winner) {
					nick = answers[i].player.nick;
					break;
				}
			}
			console.log('Winner:', nick, ' (', _winner,')');
			
			// set answer for clients
			winner = {
				nick: nick,
				card: _winner
			};
			
			// increment score for winner
			for(i = 0; i < players.length; i++) {
				if(players[i].nick == nick) {
					players[i].score += 1;
					break;
				}
			}
			
			// reset answers for next round and increment hand
			answers = [];
			hand++;
			
			// new question card
			qindex++;
			question = questions[qindex];
			
			// set new judge:
			nextJudge = false;
			for(i = 0; i < players.length; i++) {
				// next player in db is judge
				if(nextJudge) {
					players[i].judge = true;
					nextJudge = false;
					break;
				}
				
				// clear old judge
				if(players[i].judge) {
					players[i].judge = false;
					nextJudge = true;
					continue;
				}
			}
			
			// circle back to the first judge once everyone's had a turn:
			if(nextJudge)
				players[0].judge = true;
		});
		
		client.on('join', function(nick){
			_player = {
				nick: nick,
				score: 0,
				judge: false
			};
			
			// first player's the judge
			if(players.length == 0)
				_player.judge = true;
			
			// prevent dupes (refresh-proofing)
			for(i = 0; i < players.length; i++) {
				if(players[i].nick == _player.nick)
					return;
			}
			
			players.push(_player);
		});
		
		setInterval(function(){
			client.emit('poll',{
				players: players,
				winner: winner,
				hand: hand,
				answers: answers,
				question: question
			});
		}, 1000);
	};
	
	/*
	 * @name handleDisconnect
	 * @param {chunk} data
	 * @summary used as a callback handler on socket.io disconnect events
	 */
	function handleDisconnection(){
		console.log('Disconnected');
	};
	
	/* Don Knuth's shuffle function */
	function shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex ;
	
	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {
	
	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;
	
	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }
	
	  return array;
	}
};