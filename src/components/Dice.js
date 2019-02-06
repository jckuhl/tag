import React from 'react';
import setPips from '../scripts/setPips';

export default function Dice(props) {
    let count = 0;
    let pips = [];
    do {
        const pip = setPips(props.moves, count);
        pips.push((<div className="dice-square">
            {pip ? <div className="pip"></div> : null}
        </div>))
        count += 1;
    } while(count !== 9);
    return (
        <div className="dice">
            <button onClick={props.setTurn} disabled={props.disabled}>
                {pips}
            </button>
        </div>
    );
}