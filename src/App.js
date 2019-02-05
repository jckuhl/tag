import React, { Component } from 'react';
import Field from './components/Field';
import Players from './components/Players';
import Dice from './components/Dice';
import random from './scripts/random';

//🤨🥳😵😘🍪🍩

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
                face: '🤓',
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
        moves: 0,
        currentIt: '',
        oldIt: '',
        tagAnim: false,
        cookies: {
            face: '🍩',
            positions: [],
        }
    }

    setCookie() {
        if(this.state.cookies.positions.length >= 3) {
            return;
        }
        const exclude = this.state.players.map(player => player.pos)
                                        .concat(this.state.cookies.positions);
        const cookieAmt = random(4,1);
        const cookiePositions = [];
        let count = 0;
        do {
            const index = random(0,100);
            if(!exclude.includes(index)) {
                cookiePositions.push(index);
                count += 1;
            }
        } while(count < cookieAmt);
        this.setState({ cookies: {
            ...this.state.cookies,
            positions: cookiePositions
        }});
    }

    setPlayers(updatedPlayers, filterFn=undefined, mapFn=undefined) {
        if(!Array.isArray(updatedPlayers)) {
            const updatedPlayer = updatedPlayers;
            updatedPlayers = [];
            updatedPlayers.push(updatedPlayer);
        }
        if(!filterFn) {
            const ids = updatedPlayers.map(player => player.id);
            filterFn = (player) => !ids.includes(player.id);
        }
        let currentPlayers = this.state.players.filter(filterFn);
        if(mapFn) {
            currentPlayers = currentPlayers.map(mapFn);
        }
        const players = [
            ...currentPlayers,
            ...updatedPlayers
        ].sort((playerA, playerB) => playerA.id - playerB.id);
        this.setState({ players });
    }

    setIt = (id)=> {
        const itPlayer = this.state.players.find(player => player.id === id);
        itPlayer.it = true;
        this.setState({ currentIt : itPlayer.name });
        this.setPlayers(itPlayer, null, player => {
            player.it = false;
            return player;
        });
    }

    transitionEnd = (event)=> {
        const currentIt = this.state.currentIt;
        const oldIt = this.state.oldIt;
        const positions = [0, 10, 90, 99];
        currentIt.pos = positions[currentIt.id];
        oldIt.pos = positions[oldIt.id];
        this.setPlayers([currentIt, oldIt]);
        this.setState({ tagAnim: false });
    };

    componentDidMount() {
        
        this.setIt(Math.floor(Math.random() * this.state.players.length));
        this.setCookie();

        window.addEventListener('keyup', async (event)=> {
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
                const touchedPlayers = this.state.players.filter(player => player.pos === currentPlayer.pos);
                if(touchedPlayers.length > 1 && touchedPlayers.some(player => player.it)) {
                    const it = touchedPlayers.find(player => player.it);
                    const notIt = touchedPlayers.find(player => !player.it);
                    notIt.lives -= 1;
                    notIt.it = true;
                    it.it = false;
                    currentPlayer.moves = 0;
                    this.setState({ currentIt : notIt, oldIt: it });
                    this.setPlayers(currentPlayer)
                    this.setState({ tagAnim: true});
                    return;
                }
                currentPlayer.moves -= 1;
                this.setPlayers(currentPlayer)
            }
        });
    }

    setTurn = ()=> {
        let turn = this.state.turn;
        const livingPlayers = this.state.players
                                    .filter(player => player.lives > 0)
                                    .sort((playerA, playerB) => playerA.id - playerB.id);
        const currentPlayer = livingPlayers.find((player, index) => index === turn % livingPlayers.length);
        currentPlayer.turn = true;
        const moves = currentPlayer.moves = Math.floor(Math.random() * 5 + 1);
        this.setPlayers(currentPlayer, null, player => {
            player.turn = false;
            return player;
        });
        this.setState({ moves })
        turn += 1;
        this.setState({ turn })
    }

    render() {
        return ( 
            <div className="game-board">
                <Field players={this.state.players} 
                    it={this.state.currentIt} 
                    tagAnim={this.state.tagAnim}
                    transitionEnd={this.transitionEnd}
                    cookies={this.state.cookies}/>
                <Players players={this.state.players} />
                <Dice setTurn={this.setTurn} 
                    moves={this.state.moves}
                    disabled={this.state.players.every(player => player.moves !== 0)} />
            </div>
        );
    }
}

export default App;