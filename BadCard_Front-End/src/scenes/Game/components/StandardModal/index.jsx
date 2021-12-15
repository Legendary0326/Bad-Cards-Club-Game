import React from 'react';
import ReactModal from 'react-modal';

const modalStyle = ({
	overlay:{
    	backgroundColor: "#212121bf",
    	zIndex         : "999"
    }
});

const StandardModal = (props) => {
	return (
		<ReactModal
			className = "scene--game__room__unoing"
	    	isOpen = {props.isOpen}
	        style = {modalStyle}
	        onRequestClose = {props.onCloseModal}
	        shouldCloseOnOverlayClick = {true}
	        contentLabel={props.title}>
	        	<div>
	        		<p>{props.text}</p>
	        		<div className = "divider" style = {{marginTop: "10px", marginBottom: "10px"}}></div>
	        		<div>
	        			<button
							className="playerDeatails__buttons__button playerDeatails__buttons__button--close"
							onClick={props.onCloseModal}>
								Fechar
						</button>
	        		</div>
	        	</div>
	    </ReactModal>
	);
}
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

export default StandardModal;