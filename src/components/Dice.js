import React from 'react';
import setPips from '../scripts/setPips';

export default function Dice(props) {
    function getCurrentPlayer(props) {
        if(!props.disabled) {
            return props.nextPlayer.name;
        } else {
            return props.currentPlayer.name;
        }
    }
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
            <p>{`${getCurrentPlayer(props)}'s turn!  ${props.disabled ? '' : 'Click to roll!'}`}</p>
            <button onClick={props.setTurn} disabled={props.disabled}>
                {pips}
            </button>
        </div>
    );
}
