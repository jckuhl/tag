import React from 'react';
import Player from './Player';

export default function Players(props) {
    return (
        <div className="player-list">
            {props.players.map(player => <Player player={player} key={player.id}/>)}
        </div>
    );
}