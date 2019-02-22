import React from 'react';
import styled from 'styled-components';
import Emoji from './Emoji';

const PlayerEdit = styled.div`
    padding-right: 3rem;
    background: ${ props => props.active ? 'tomato' : ''};
`;

export default function PlayerEditDisplay(props) {
    return (
        <PlayerEdit active={props.active}>
            <p><strong>Player {props.playerNumber}</strong></p>
            <p>Name: {props.name}</p>
            <p>Face: 
                <Emoji symbol={props.face}/>
            </p>
        </PlayerEdit>
    );
}