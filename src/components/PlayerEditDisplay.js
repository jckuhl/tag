import React from 'react';
import Emoji from './Emoji';

export default function PlayerEditDisplay(props) {
    const active = props.active ? 'player-active' : '';
    return (
        <div className={ `player-edit ${active}`}>
            <p><strong>Player {props.playerNumber}</strong></p>
            <p>Name: {props.name}</p>
            <p>Face: 
                <Emoji symbol={props.face}/>
            </p>
        </div>
    );
}