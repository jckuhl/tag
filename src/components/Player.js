import React from 'react';

//💔️❤️

export default function Player(props) {
    const player = props.player;
    return (
        <div className={`player ${ player.turn ? 'active' : ''}`}>
            <p><strong>{player.name}</strong></p>
            <p>{'❤️'.repeat(player.lives) + '💔'.repeat(3 - player.lives) }</p>
            {player.turn ? <p>{player.moves}</p> : null}
        </div>
    );
}