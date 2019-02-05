/*eslint no-loop-func: 0*/
import React from 'react';
import YourIt from './YourIt';

export default function Field(props) {
    let position = 0;
    const field = [];
    while(position < 100) {
        let color;
        if(Math.floor(position / 10) % 2 === 0) {
            color = position % 2 === 0 ? 'forestgreen' : 'greenyellow';
        } else {
            color = position % 2 === 1 ? 'forestgreen' : 'greenyellow';
        }
        
        const player = props.players.find(player => player.pos === position);
        let face = player && player.lives > 0 ? player.face : '👻';
        field.push(
            <div className={`square ${color}`} key={position}>
                {player ? face : props.cookies.positions.includes(position) ? props.cookies.face : ''}
            </div>
        );
        position += 1;
    }

    return (
        <div className="field">
            <YourIt pos={{ top: 0, left: 0 }} 
                it={props.it} 
                tagAnim={props.tagAnim}
                transitionEnd={props.transitionEnd}/>
            {field}
        </div>
    )
}
