var app = angular.module('cards', ['btford.socket-io'])

 .factory('$socket', function(socketFactory){
 		return socketFactory();
 })

.controller('mainController', function($scope,$socket){
	///////////////////////////////////////////////////////////////////////////////
	// scope variables 
	///////////////////////////////////////////////////////////////////////////////
	
	$scope.nick = '';
	
	///////////////////////////////////////////////////////////////////////////////
	// view-model stuff
	///////////////////////////////////////////////////////////////////////////////
	
	vm = this;
	vm.player = {
		nick: '',
		score: 0,
		judge: false
	};
	vm.players = [];
	vm.cards = [];
	vm.question = '';
	vm.answers = [];
	vm.judgeReady = false;
	vm.submitted = false;
	vm.winner = '';
	vm.pastWinners = [];
	
	///////////////////////////////////////////////////////////////////////////////
	// socket event handlers
	///////////////////////////////////////////////////////////////////////////////
	
	/* server connected; pseudo-entry point */
	$socket.on('connect', function(){
		console.log('Successfully connected to WebSocket server');
		
		if($scope.nick == '') 
			$('#modal_nick').modal('toggle');
		if(typeof (_nick = Cookies.get('nick')) !== 'undefined')
			$scope.nick = _nick;
	});
	
	/* sync with server and all other clients every 1s */
	$socket.on('poll', function(data) {
		vm.players = data.players;
		vm.question = data.question;
		vm.answers = data.answers;
		vm.winner = data.winner;
		
		// new winner handler:
		console.log('Winners', vm.pastWinners, data.winner);
		if(vm.pastWinners.indexOf(data.winner.card) == -1 && vm.winner != '') {
			$('#modal_winner').modal('toggle');
			vm.pastWinners.push(data.winner.card);
			vm.submitted = false;
		}
		
		console.log('Players', vm.players);
		
		// sync player info
		for(i = 0; i < vm.players.length; i++){
			_player = vm.players[i];
			
			if(_player.nick == $scope.nick)
				vm.player = _player;
		}
	});
	
	$socket.on('draw', function(_card) {
		console.log('Drew', _card);
		vm.cards.push(_card);
		console.log('Cards', vm.cards);
	});
	
	///////////////////////////////////////////////////////////////////////////////
	// utility functions:
	///////////////////////////////////////////////////////////////////////////////
	
	/* submit an answer */
	vm.answer = function(card){
		if(vm.submitted)
			return;
			
		vm.submitted = true;
		var hand = [];
		
		// generate new hand sans the submitted answer
		for(i = 0; i < vm.cards.length; i++){
			_card = vm.cards[i];
			console.log('Comparing "' + _card + '" and "' + card + '"');
			if(_card != card)
				hand.push(_card);
		}
		vm.cards = hand;
		
		$socket.emit('submit', {
			text: card,
			player: vm.player
		});
		$socket.emit('draw');
	};
	
	vm.draw = function() {
		if(vm.cards.length < 9) {
			for(i = vm.cards.length; i < 10; i++) {
				$socket.emit('draw');
			}
		}
	};
	
	vm.first = function(){
		return (vm.players.length < 2)?true:false;
	};
	
	vm.best = function(_card) {
		// can't pick a best card if you can't see it...
		if(!vm.judgeReady)
			return;
		
		$socket.emit('winner',_card);
		
		vm.judgeReady = false;
	};
	
	vm.setReady = function() {
		vm.judgeReady = true;
	};
	
	vm.getAnswers = function() {
		ans = [];
		
		for(i = 0; i < vm.answers.length; i++) {
			if(vm.answers[i].card == vm.winner.card)
				continue;
			ans.push(vm.answers[i].card);
		}
		
		return '"' + ans.join('" ') + '"';
	};
	
	vm.showCards = function() {
		if(!vm.player.judge && !vm.submitted)
			return true;
		return false;
	};
	
	vm.showWait = function() {
		if(!vm.player.judge && vm.submitted)
			return true;
		return false;
	};
	
	/* nickname newly chosen */
	vm.nick = function() {
		console.log('You are now', $scope.nick);
		$('#modal_nick').modal('toggle');
		$socket.emit('join', $scope.nick);
		Cookies.set('nick', $scope.nick);
		vm.draw();
	};
});
