import { useState, useEffect } from "react";

const End = ({ socket }) => {
    return (
        <>
            <div className="second">
                <h1>Your card</h1>
            </div>
            {/* {card} */}
            <div className="third">
                <div className="third-data">
                    <div 
                        to
                        className="third-data1 quiz-card" 
                        // onDoubleClick={onPick} 
                        // key={index ++ } 
                        style={{ cursor: 'pointer' }}
                    >
                        <p>Player 1 gets top score.</p>
                    </div>
                </div>
            </div>
            <div className="second">
                <h1>is voted!</h1>
            </div>
        </>
    );
}

export default End;