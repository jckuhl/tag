import React from 'react';
import styled from 'styled-components';
import Player from './Player';

const PlayerList = styled.div`
    p {
        margin: 0 10px;
    }
`;

export default function Players(props) {
    return (
        <PlayerList className="player-list">
            {props.players.map(player => (
                <Player player={player} key={player.id} cookieface={props.cookieface}/>
            ))}
        </PlayerList>
    );
}