import React, { Component } from 'react';
import Field from './components/Field';
import Players from './components/Players';
import Dice from './components/Dice';

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
                turn: false,
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
        ],
        turn: 0,
        moves: 0
    }

    setIt = (id)=> {
        const itPlayer = this.state.players.find(player => player.id === id);
        itPlayer.it = true;
        const players = [
            ...this.state.players.filter(player => player.id !== itPlayer.id).map(player => {
                player.it = false;
                return player;
            }),
            itPlayer
        ].sort((playerA, playerB) => playerA.id - playerB.id);
        this.setState({ players })
    }

    componentDidMount() {
        
        this.setIt(Math.floor(Math.random() * this.state.players.length));

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
            if(Object.getOwnPropertyNames(arrows).includes(key) && currentPlayer && currentPlayer.moves) {
                const newPos = arrows[key](currentPlayer);
                if(newPos === 0) {
                    return;
                }
                currentPlayer.pos = newPos;
                currentPlayer.moves -= 1;
                const players = [
                    ...this.state.players.filter(player => player.id !== currentPlayer.id),
                    currentPlayer
                ].sort((playerA, playerB) => playerA.id - playerB.id);
                this.setState({ players });
            }
        });
    }

    setTurn = ()=> {
        let turn = this.state.turn;
        const currentPlayer = this.state.players.find(player => player.id === turn % 4);
        currentPlayer.turn = true;
        const moves = currentPlayer.moves = Math.floor(Math.random() * 5 + 1);
        const players = [
            ...this.state.players.filter(player => player.id !== currentPlayer.id).map(player => {
                player.turn = false;
                return player;
            }),
            currentPlayer
        ].sort((playerA, playerB) => playerA.id - playerB.id);
        this.setState({ players });
        this.setState({ moves })
        turn += 1;
        this.setState({ turn })
    }

    render() {
        return ( 
            <div className="game-board">
                <Field players={this.state.players} />
                <Players players={this.state.players} />
                <Dice setTurn={this.setTurn} moves={this.state.moves} />
            </div>
        );
    }
}

export default App;