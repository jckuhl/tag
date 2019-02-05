import React, { Component } from 'react';
import Field from './components/Field';
import Players from './components/Players';
import Dice from './components/Dice';

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
        moves: 0,
        currentIt: '',
        oldIt: '',
        tagAnim: false,
    }

    setPlayers(updatedPlayers, filterFn) {
        const players = [
            ...this.state.players.filter(filterFn),
            ...updatedPlayers
        ].sort((playerA, playerB) => playerA.id - playerB.id);
        this.setState({ players });
    }

    setIt = (id)=> {
        const itPlayer = this.state.players.find(player => player.id === id);
        itPlayer.it = true;
        this.setState({ currentIt : itPlayer.name });
        const players = [
            ...this.state.players.filter(player => player.id !== itPlayer.id).map(player => {
                player.it = false;
                return player;
            }),
            itPlayer
        ].sort((playerA, playerB) => playerA.id - playerB.id);
        this.setState({ players })
    }

    transitionEnd = (event)=> {
        const currentIt = this.state.currentIt;
        const oldIt = this.state.oldIt;
        const positions = [0, 10, 90, 99];
        currentIt.pos = positions[currentIt.id];
        oldIt.pos = positions[oldIt.id];
        // const players = [
        //     ...this.state.players.filter(player => player.id !== currentIt.id && player.id !== oldIt.id),
        //     currentIt,
        //     oldIt
        // ].sort((playerA, playerB) => playerA.id - playerB.id);
        // this.setState({ players });
        this.setPlayers([currentIt, oldIt], player => player.id !== currentIt.id && player.id !== oldIt.id);
        this.setState({ tagAnim: false });
    };

    componentDidMount() {
        
        this.setIt(Math.floor(Math.random() * this.state.players.length));

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
                    // const players = [
                    //     ...this.state.players.filter(player => player.id !== currentPlayer.id),
                    //     currentPlayer
                    // ].sort((playerA, playerB) => playerA.id - playerB.id);
                    // this.setState({ players });
                    this.setPlayers([currentPlayer], player => player.id !== currentPlayer.id)
                    this.setState({ tagAnim: true});
                    return;
                }
                currentPlayer.moves -= 1;
                // const players = [
                //     ...this.state.players.filter(player => player.id !== currentPlayer.id),
                //     currentPlayer
                // ].sort((playerA, playerB) => playerA.id - playerB.id);
                // this.setState({ players });
                this.setPlayers([currentPlayer], player => player.id !== currentPlayer.id)
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
                <Field players={this.state.players} 
                    it={this.state.currentIt} 
                    tagAnim={this.state.tagAnim}
                    transitionEnd={this.transitionEnd}/>
                <Players players={this.state.players} />
                <Dice setTurn={this.setTurn} moves={this.state.moves} />
            </div>
        );
    }
}

export default App;