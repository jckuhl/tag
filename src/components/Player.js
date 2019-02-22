import React from 'react';
import styled from 'styled-components';

const PlayerStyled = styled.div`
    background: goldenrod;
    padding: 0.5rem;

    :nth-child(2n) {
        background: lightgoldenrodyellow;
    }
`;

export default function Player(props) {
    const player = props.player;
    let lives = props.player.lives;
    lives = lives >= 0 ? lives : 0;
    return (
        <PlayerStyled className={`player ${ player.turn ? 'active' : ''}`}>
            <p>
                <strong>{`${player.face} ${player.name}`}</strong>
                <span>{player.it ? ' it!' : ''}</span>
            </p>
            <p>{'❤️'.repeat(lives) + '💔'.repeat(3 - lives) }</p>
            <p>{`${props.cookieface}: ${props.player.cookies}`}</p>
            <p>{player.turn ? `Moves: ${player.moves}` : null}</p>
        </PlayerStyled>
    );
}