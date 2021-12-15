import React from 'react';

const Players = (props) => {
	return (
		<div className = "game__section room__players">
			{props.players.map((player, index) => {
				const classes = props.currentPlayerIndex === index ? "player active" : "player";
				const uno = props.playersCards.get(index) === 1 ? " uno" : "";
				const isPrevious = props.previousPlayer.get("index") === index;
				const previousValue = props.previousPlayer.get("value");
				const positive = previousValue > 0 ? "ani player__stats positive" : "ani player__stats negative";
				return (
					<div key = {index}>
						<div className = {classes.concat(uno)}>
							{player.get("name").substr(0, 1).toLocaleUpperCase()}
						</div>
						{isPrevious && (<div className = {positive}>{previousValue > 0 ? "+" : ""}{previousValue}</div>)}
					</div>
				);
			})}
		</div>
	);
	
	clickEvent = (event) => {
		const {ok, text} = this.props.checkTurn();
		if(!ok)
		{
			this.props.openStandardModal(text);
		}
		else if(this.time === -1)
		{
			this.time = setTimeout(this.sendCard, 200);
		}
		else if(this.time !== -1)
		{
			clearTimeout(this.time);
			this.time = -1;
			if((this.props.name === "buy-four" || 
				this.props.name === "change-color") && !this.props.isSelected)
				this.props.chooseColor(this.props.key_, !this.props.isSelected);
			else
				this.props.selectCard(this.props.key_, !this.props.isSelected);
		}
	}

	function submitNewColor(props) {
		const obj = Array.from(document.getElementsByName("color"));
		const color = obj.find(a => a.checked).value;
		if(props.chooseColor.get("id") === -1)
		{
			const k = props.chooseColor.get("dt");
			k.card[0].color = color;
			props.sendCard(k);
		}
		else
		{
			props.selectCard(props.chooseColor.get("id"), 
				props.chooseColor.get("state"), color);	
		}
		props.onCloseChooseColor();
	}
}

export default Players;