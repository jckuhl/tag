import React from 'react';

export default function Dice(props) {
    return (
        <div className="dice">
            <p>{props.moves}</p>
            <button onClick={props.setTurn} disabled={props.disabled}>Roll</button>
        </div>
    );
}