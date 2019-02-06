/*eslint no-loop-func: 0*/
import React from 'react';
import YourIt from './YourIt';

export default function Field(props) {
    function getFace(position, props) {
        const player = props.players.find(player => player.pos === position);
        if(player) {
            return player.lives > 0 ? player.face : '👻';
        } else if(props.cookies.positions.includes(position)) {
            return props.cookies.face;
        } else if(position === props.bonus.position) {
            const bonusType = {
                health: '❤️',
                immunity: '💎',
                moneybag: '💰',
                teleport: '🚀'
            }
            return bonusType[props.bonus.type];
        } else {
            return '';
        }
    }

    let position = 0;
    const field = [];
    while(position < 100) {
        let color;
        if(Math.floor(position / 10) % 2 === 0) {
            color = position % 2 === 0 ? 'forestgreen' : 'greenyellow';
        } else {
            color = position % 2 === 1 ? 'forestgreen' : 'greenyellow';
        }
        field.push(
            <div className={`square ${color}`} key={position}>
                {getFace(position, props)}
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
