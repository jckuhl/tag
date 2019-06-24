import React from 'react';
import styled from 'styled-components';
import setPips from '../scripts/setPips';

const DiceStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;

    .die {
        padding: 5px 5px;
        display: grid;
        grid-template-columns: repeat(3, 10px);
        grid-template-rows: repeat(3, 10px);
        align-items: center;
        border: 2px solid black;
        border-radius: 10px;
        background: white;
        cursor: pointer;
        margin-left: auto;
    }

    button:disabled {
        border: 2px solid lightgrey;
        cursor: not-allowed;
    }

    button:disabled .pip {
        background: lightgray;
    }
`;

const DiceSquare = styled.div`
    width: 10px;
    height: 10px;
`;

const Pip = styled.div`
    width: 8px;
    height: 8px;
    background: black;
    border-radius: 50%;
    margin: 0 auto;
`;

export default function Dice(props) {
    function getCurrentPlayer(props) {
        if(!props.disabled) {
            return props.nextPlayer.name;
        } else {
            return props.currentPlayer.name;
        }
    }
    if(!props.currentPlayer) return null;
    let position = 0;
    let pips = [];
    do {
        const pip = setPips(props.moves, position);
        pips.push((<DiceSquare key={position}>
            {pip ? <Pip/> : null}
        </DiceSquare>))
        position += 1;
    } while(position !== 9);
    return (
        <DiceStyle>
            <p>{`${getCurrentPlayer(props)}'s turn!  ${props.disabled ? '' : 'Click to roll!'}`}</p>
            <div className="die" role="button" tabIndex="0" onClick={props.setTurn} disabled={props.disabled}>
                {pips}
            </div>
        </DiceStyle>
    );
}
