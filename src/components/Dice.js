import React from 'react';
import setPips from '../scripts/setPips';

export default function Dice(props) {
    if(!props.currentPlayer) return null;
    let position = 0;
    let pips = [];
    do {
        const pip = setPips(props.moves, position);
        pips.push((<div className="dice-square" key={position}>
            {pip ? <div className="pip"></div> : null}
        </div>))
        position += 1;
    } while(position !== 9);
    return (
        <div className="dice">
            <p>{`${props.currentPlayer.name}'s turn!  ${props.disabled ? '' : 'Click to roll!'}`}</p>
            <button onClick={props.setTurn} disabled={props.disabled}>
                {pips}
            </button>
        </div>
    );
}
