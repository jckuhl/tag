/*eslint no-loop-func: 0*/
import React from 'react';

export default function Field(props) {
    let count = 0;
    const field = [];
    while(count < 100) {
        let color;
        if(Math.floor(count / 10) % 2 === 0) {
            color = count % 2 === 0 ? 'forestgreen' : 'greenyellow';
        } else {
            color = count % 2 === 1 ? 'forestgreen' : 'greenyellow';
        }
        
        const player = props.players.find(player => player.pos === count);
        field.push(
            <div className={`square ${color}`} key={count}>
                {player ? player.face : ''}
            </div>
        );
        count += 1;
    }
    return (
        <div className="field">
            {field}
        </div>
    )
}
