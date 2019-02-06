import React, { Component } from 'react';
import Field from './components/Field';
import Players from './components/Players';
import Dice from './components/Dice';
import random from './scripts/random';
import getMax from './scripts/maxobject';

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
                cookies: 0,
            },
            {
                name: 'Barry',
                face: '🥳',
                lives: 3,
                it: false,
                turn: false,
                moves: 0,
                pos: 9,
                id: 1,
                cookies: 0,
            },
            {
                name: 'Reginald',
                face: '🤓',
                lives: 3,
                it: false,
                turn: false,
                moves: 0,
                pos: 90,
                id: 2,
                cookies: 0,
            },
            {
                name: 'Aragorn',
                face: '😘',
                lives: 3,
                it: false,
                turn: false,
                moves: 0,
                pos: 99,
                id: 3,
                cookies: 0,
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

    /**
     * Creates upto 3 cookies randomly anywhere on the field
     *
     * @returns undefined only if there are already three cookies
     * @memberof App
     */
    setCookie() {
        const numCookies = this.state.cookies.positions.length
        if(numCookies >= 3) {
            return;
        }
        const exclude = this.state.players.map(player => player.pos)
                                        .concat(this.state.cookies.positions)
                                        .concat([0, 9, 90, 99]);
        const cookieAmt = random(4 - numCookies,1);
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
            positions: cookiePositions.concat(this.state.cookies.positions)
        }});
    }

    /**
     * Sets the players into state, updating them while maintaining order
     *
     * @param {Player} updatedPlayers Either a Player or an array of Players
     * @param {Function} [filterFn=undefined] Function that filters out players not to be updated
     * @param {Function} [mapFn=undefined] Function that is mapped over all the players,
     * @memberof App
     */
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

    /**
     * Triggered by the end of the tagged animation, teleports it and victim to starting points
     *
     * @memberof App
     */
    transitionEnd = (event)=> {
        const currentIt = this.state.currentIt;
        const oldIt = this.state.oldIt;
        const positions = [0, 9, 90, 99];
        currentIt.pos = positions[currentIt.id];
        oldIt.pos = positions[oldIt.id];
        this.setPlayers([currentIt, oldIt]);
        this.setState({ tagAnim: false });
    };

    /**
     * Lifecycle hook, sets the It character, sets the first cookies, and builds the keyup event listener
     *
     * @memberof App
     */
    componentDidMount() {
        
        this.setIt(Math.floor(Math.random() * this.state.players.length));
        this.setCookie();

        window.addEventListener('keyup', async (event)=> {
            const currentPlayer = this.state.players.find(player => player.turn);
            const arrows = {
                'ArrowUp': (player)=> {
                    return player.pos - 10 >= 0 ? player.pos - 10 : -1;
                },
                'ArrowDown': (player)=> { 
                    return player.pos + 10 <= 99 ? player.pos + 10  : -1;
                },
                'ArrowLeft': (player) => { 
                    return player.pos % 10 !== 0 ? player.pos - 1 : -1;
                },
                'ArrowRight': (player) => { 
                    return (player.pos + 1) % 10 !== 0 ? player.pos + 1 : -1;
                }
            }
            const key = event.code;
            if(Object.getOwnPropertyNames(arrows).includes(key) && currentPlayer && currentPlayer.moves) {
                const newPos = arrows[key](currentPlayer);
                // if given a value of zero, return and don't move the player and don't reduce move count
                if(newPos === -1) {
                    return;
                }
                currentPlayer.pos = newPos;
                if(this.state.cookies.positions.includes(currentPlayer.pos) && !currentPlayer.it) {
                    currentPlayer.cookies += 1;
                    const currentCookies = this.state.cookies.positions.filter(pos => pos !== currentPlayer.pos);
                    this.setState({ cookies: {
                        ...this.state.cookies,
                        positions: currentCookies
                    }});
                    this.setCookie();
                }
                const touchedPlayers = this.state.players.filter(player => player.pos === currentPlayer.pos);
                if(touchedPlayers.length > 1 && touchedPlayers.some(player => player.it)) {
                    const it = touchedPlayers.find(player => player.it);
                    const notIt = touchedPlayers.find(player => !player.it);
                    notIt.lives -= 1;

                    // only switch It if player still has lives
                    if(notIt.lives !== 0) {
                        notIt.it = true;
                        it.it = false;
                    }

                    //take a cookie from the player if he has one
                    if(notIt.cookies > 0) {
                        notIt.cookies -= 1;
                        it.cookies += 1;
                    }
                    currentPlayer.moves = 0;
                    this.setState({ currentIt : notIt, oldIt: it });
                    this.setPlayers(currentPlayer)
                    this.setState({ tagAnim: true });
                    this.setTurn();
                    if(this.state.players.filter(player => player.lives > 0).length <= 1) {
                        // TODO: declare victory
                        let winners = getMax(this.state.players, 'cookies');
                        console.log(winners);
                        if(winners.length === 1) {
                            console.log(`${winners[0].name} won with ${winners[0].cookies}`)
                        } else {
                            winners.forEach(winner => {
                                console.log(`${winner.name} won with ${winner.cookies}`)
                            });
                        }
                        this.state.players.forEach(player => {
                            console.log(`${player.name} had ${player.cookies}`)
                        })
                    }
                    return;
                }
                currentPlayer.moves -= 1;
                this.setPlayers(currentPlayer)
            }
        });
    }

    /**
     * Cycles through the turns for each player
     *
     * @memberof App
     */
    setTurn = ()=> {
        let turn = this.state.turn;
        const livingPlayers = this.state.players
                                    .filter(player => player.lives > 0)
                                    .sort((playerA, playerB) => playerA.id - playerB.id);
        const currentPlayer = livingPlayers.find((player, index) => index === turn % livingPlayers.length);
        currentPlayer.turn = true;
        const moves = currentPlayer.moves = random(5, 1);
        this.setPlayers(currentPlayer, null, player => {
            player.turn = false;
            return player;
        });
        this.setState({ moves })
        turn += 1;
        this.setState({ turn })
    }

    /**
     * Renders the game, containing the field, the players and the dice
     *
     * @returns
     * @memberof App
     */
    render() {
        return ( 
            <div className="game-board">
                <Field players={this.state.players} 
                    it={this.state.currentIt} 
                    tagAnim={this.state.tagAnim}
                    transitionEnd={this.transitionEnd}
                    cookies={this.state.cookies}/>
                <Players players={this.state.players} cookieface={this.state.cookies.face} />
                <Dice setTurn={this.setTurn} 
                    moves={this.state.moves}
                    disabled={this.state.players.every(player => player.moves !== 0)} />
            </div>
        );
    }
}

export default App;