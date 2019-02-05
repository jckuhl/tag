import React, { Component } from 'react';
import Field from './components/Field';
import Players from './components/Players';

//🤨🥳😵😘

class App extends Component {
    state = {
        players: [
            {
                name: 'Stephen',
                face: '🤨',
                lives: 3,
                it: false,
                turn: false,
                moves: 0,
                pos: 0,
                id: 0,
            },
            {
                name: 'Barry',
                face: '🥳',
                lives: 3,
                it: false,
                turn: true,
                moves: 0,
                pos: 9,
                id: 1
            },
            {
                name: 'Reginald',
                face: '😵',
                lives: 3,
                it: false,
                turn: false,
                moves: 0,
                pos: 90,
                id: 2
            },
            {
                name: 'Aragorn',
                face: '😘',
                lives: 3,
                it: false,
                turn: false,
                moves: 0,
                pos: 99,
                id: 3
            },
        ]
    }

    componentDidMount() {
        window.addEventListener('keyup', (event)=> {
            const currentPlayer = this.state.players.find(player => player.turn);
            const arrows = {
                'ArrowUp': (player)=> {
                    return player.pos - 10 >= 0 ? player.pos - 10 : 0;
                },
                'ArrowDown': (player)=> { 
                    return player.pos + 10 <= 99 ? player.pos + 10  : 0;
                },
                'ArrowLeft': (player) => { 
                    return player.pos % 10 !== 0 ? player.pos - 1 : 0;
                },
                'ArrowRight': (player) => { 
                    return (player.pos + 1) % 10 !== 0 ? player.pos + 1 : 0;
                }
            }
            const key = event.code;
            if(Object.getOwnPropertyNames(arrows).includes(key) && currentPlayer) {
                const newPos = arrows[key](currentPlayer);
                if(newPos === 0) {
                    return;
                }
                currentPlayer.pos = newPos;
                const players = [
                    ...this.state.players.filter(player => player.id !== currentPlayer.id),
                    currentPlayer
                ].sort((playerA, playerB) => playerA.id - playerB.id);
                this.setState({ players });
            }
        });
    }

    render() {
        return ( 
            <div className="game-board">
                <Field players={this.state.players}/>
                <Players players={this.state.players} />
            </div>
        );
    }
}

export default App;