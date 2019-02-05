import React from 'react';

//💔️❤️

export default function Player(props) {
    const player = props.player;
    return (
        <div className={`player ${ player.turn ? 'active' : ''}`}>
            <p><strong>{player.name}</strong> <span>{player.it ? 'it!' : ''}</span></p>
            <p>{'❤️'.repeat(player.lives) + '💔'.repeat(3 - player.lives) }</p>
            <p>{player.turn ? player.moves : null}</p>
        </div>
    );
}