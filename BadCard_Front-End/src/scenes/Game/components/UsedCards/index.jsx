import React from 'react';
import UnoPackMap from '../../map-uno-pack-images';

const UsedCards = (props) => {
	return (
		<div className = "game__throw__cards">
			{props.usedCards.map((card, index) => {
				const x = UnoPackMap.get(card.get("name")).x;
				const y = UnoPackMap.get(card.get("name")).y;
				const classes = card.get("from") === props.socketID ? "card_-wrapper a" : "card_-wrapper e";
				const css = {
					transform : `rotate(${card.get('rotate')}deg)`,
					backgroundPosition : `${x}px ${y}px`
				}
				return (
					<div 
						className = {classes}
						key = {index}>
							<div
								className = "card_" 
								style = {css}
								data-name = {card.get('name')}>
							</div>
					</div>		
				)
			})}
		</div>
	);
}
createObj(){
	const rotate = ((c) => c % 2 === 0 ? c : -c)(Math.floor(Math.random()*6));
	const obj = {
		card: [{
			id: this.props.key_,
			name: this.props.name,
			from: this.props.currentPlayerIndex,
			rotate
		}],
		ctx: {
			currentPlayerIndex: this.props.currentPlayerIndex,
			capacity: this.props.capacity,
			direction: this.props.direction
		}
	}
	return obj;
}
export default UsedCards;