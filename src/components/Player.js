import React from 'react';

export default function Player(props) {
    const player = props.player;
    let lives = props.player.lives;
    lives = lives >= 0 ? lives : 0;
    return (
        <div className={`player ${ player.turn ? 'active' : ''}`}>
            <p>
                <strong>{`${player.face} ${player.name}`}</strong>
                <span>{player.it ? ' it!' : ''}</span>
            </p>
            <p>{'❤️'.repeat(lives) + '💔'.repeat(3 - lives) }</p>
            <p>{`${props.cookieface}: ${props.player.cookies}`}</p>
            <p>{player.turn ? `Moves: ${player.moves}` : null}</p>
        </div>
    );
}