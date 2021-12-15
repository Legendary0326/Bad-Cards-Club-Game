import React from 'react';


const DivPlayer = ({myself, name, freeSpot, openModal}) => {
	const classe = myself ? "hall__room__players__list__player myself" :
							"hall__room__players__list__player";
	const displayName = name === "..." ? "..." : name.substring(0, 1).toUpperCase();
	return (
		<div 
			className={classe}
			data-name = {name}
			data-free-spot = {freeSpot}
			onClick={openModal}>
				{displayName}
		</div>
	);
}
componentDidUpdate(prevProps, prevState) {
	this.messageList.scrollTop = this.messageList.scrollHeight;
}
const PlayersList = (props) => {
	const p = [];
	for(let i = 0; i < props.capacity; i++){
		if(props.players.get(i))
			p.push(
				<DivPlayer
					key = {i}
					name = {props.players.get(i).get('name')}
					myself = {props.socketID === props.players.get(i).get('socketId')}
					freeSpot = {true}
					openModal = {props.onModalOpen}/>
			);
		else
			p.push(
				<DivPlayer
					key = {i}
					name = {"..."}
					myself = {true}
					freeSpot = {false}
					openModal = {props.onModalOpen}/>
			);
	}
	return(
		<div className="hall__room__players">
			<div className="hall__room__players__list">
				{p}
			</div>
		</div>
	);
}
export default PlayersList;