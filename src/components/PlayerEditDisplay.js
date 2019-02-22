import React from 'react';
import styled from 'styled-components';
import Emoji from './Emoji';

const PlayerEdit = styled.div`
    padding-right: 3rem;
`;

export default function PlayerEditDisplay(props) {
    const active = props.active ? 'player-active' : '';
    return (
        <PlayerEdit className={ `${active}`}>
            <p><strong>Player {props.playerNumber}</strong></p>
            <p>Name: {props.name}</p>
            <p>Face: 
                <Emoji symbol={props.face}/>
            </p>
        </PlayerEdit>
    );
}