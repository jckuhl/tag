import React, { Component } from 'react';
import Field from '../components/Field';
import Players from '../components/Players';
import Dice from '../components/Dice';
import random from '../scripts/random';
import getMax from '../scripts/maxobject';

class Game extends Component {
    state = {
        players: [],
        turn: 0,
        moves: 0,
        currentIt: '',
        oldIt: '',
        currentPlayer: null,
        nextPlayer: null,
        tagAnim: false,
        cookies: {
            face: '🍩',
            positions: [],
        },
        bonus: {
            type: null,
            position: -1
        },
        started: false
    }

    /**
     * Creates upto 3 cookies randomly anywhere on the field
     *
     * @returns undefined only if there are already three cookies
     * @memberof App
     */
    setCookie(remove=null) {
        const numCookies = this.state.cookies.positions.length
        let exclude = this.state.players.map(player => player.pos)
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
        return cookiePositions.concat(this.state.cookies.positions.filter(pos => pos !== remove));
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
        let nextIndex = this.state.players.findIndex(player => player.id === currentPlayer.id) + 1;
        if(nextIndex >= livingPlayers.length) {
            nextIndex = 0;
        }
        const nextPlayer = this.state.players[nextIndex];
        currentPlayer.turn = true;
        if(currentPlayer.immune !== 0) {
            currentPlayer.immune -= 1;
        }
        const moves = currentPlayer.moves = random(5, 1);
        this.setPlayers(currentPlayer, null, player => {
            player.turn = false;
            return player;
        });
        turn += 1;
        this.setState({ turn, moves, currentPlayer, nextPlayer });
        if(random(10) === 5 && this.state.bonus.type === null) {
            const bonus = this.setBonus();
            this.setState({ bonus })
        }
        if(!this.state.started) {
            this.setState({ started: true })
        }
    }

    setBonus = (clear=false)=> {
        const bonuses = [
            'health',
            'immunity',
            'moneybag',
            'teleport'
        ]
        const bonus = {};
        if(!clear) {
            bonus.type = bonuses[random(bonuses.length)];
            const exclude = this.state.players
                            .map(player => player.pos)
                            .concat(this.state.cookies.positions);
            let position;
            do {
                position = random(100);
            } while(exclude.includes(position));
            bonus.position = position;
        } else {
            bonus.type = null;
            bonus.position = -1;
        }
        return bonus;
    }

    movePlayer = (event)=> {
        event.preventDefault();
        if(this.state.tagAnim) return;
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
        const key = event.key;
        if(Object.getOwnPropertyNames(arrows).includes(key) && currentPlayer && currentPlayer.moves) {
            const newPos = arrows[key](currentPlayer);
            // if given a value of zero, return and don't move the player and don't reduce move count
            if(newPos === -1) {
                return;
            }
            currentPlayer.pos = newPos;
            if(this.state.cookies.positions.includes(currentPlayer.pos) && !currentPlayer.it) {
                currentPlayer.cookies += 1;
                this.setState(prevState => ({ cookies: {
                    ...this.state.cookies,
                    positions: this.setCookie(currentPlayer.pos)
                }}));
            }
            if(this.state.bonus.position === currentPlayer.pos && !currentPlayer.it) {
                // TODO: pick up the bonus
                const bonusType = {
                    'health': (player)=> {
                        if(player.lives !== 3) {
                            player.lives += 1;
                            return this.setBonus(true);
                        }
                        return null;
                    },
                    'immunity': (player)=> {
                        player.immune = 3;
                        return this.setBonus(true);
                    },
                    'moneybag': (player)=> {
                        player.cookies += 3;
                        return this.setBonus(true);
                    },
                    'teleport': (player)=> {
                        const exclude = this.state.players
                                            .map(player => player.pos)
                                            .concat(this.state.cookies.positions);
                        let position;
                        do {
                            position = random(100);
                        } while(exclude.includes(position));
                        player.pos = position;
                        return this.setBonus(true);
                    }
                }
                const bonus = bonusType[this.state.bonus.type](currentPlayer);
                if(bonus) {
                    this.setState({ bonus })
                }
            }
            const touching = this.state.players.filter(player => {
                return player.pos === currentPlayer.pos;
            });
            const it = touching.find(player => player.it);
            let notIt;
            if(it && it.id !== currentPlayer.id) {
                notIt = currentPlayer;
            } else {
                notIt = touching.find(player => !player.it);
            }
            // if current is touching it, it and curren't aren't the same, and current is not immune
            if(it && notIt && notIt.pos === it.pos
                && notIt.id !== it.id 
                && notIt.immune === 0) {

                notIt.lives -= 1;

                // only switch It if player still has lives
                if(notIt.lives !== 0) {
                    notIt.it = true;
                    it.it = false;
                    notIt.moves = 0;
                    this.setState({ currentIt : notIt, oldIt: it });
                    this.setPlayers([it, notIt])
                    this.setState({ tagAnim: true });
                    this.setTurn();
                } else {
                    const livePlayers = this.state.players.filter(player => {
                        return player.lives > 0 && player.immune === 0;
                    });
                    const itid = livePlayers[random(livePlayers.length)].id;
                    const positions = [0, 9, 90, 99];
                    const updatedPlayers = this.state.players.map(player => {
                        player.pos = positions[player.id]
                        player.it = player.id === itid;
                        return player;
                    });
                    const currentIt = updatedPlayers.find(player => player.it);
                    this.setState({ 
                        currentIt, oldIt: it, 
                        players: updatedPlayers, 
                        tagAnim: true
                    }, ()=> { this.setTurn() })
                }

                //take a cookie from the player if he has one
                if(notIt.cookies > 0) {
                    notIt.cookies -= 1;
                    it.cookies += 1;
                }
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
    };

    /**
     * Lifecycle hook, sets the It character, sets the first cookies, and builds the keyup event listener
     *
     * @memberof App
     */
    componentDidMount() {
        let cookieface = this.props.router.location.state.cookieType;
        let players = this.props.router.location.state.players;
        players[random(players.length)].it = true;
        this.setState(prevState => {
            return {
                cookies: {
                    positions: this.setCookie(),
                    face: cookieface
                },
                players,
                currentPlayer: players[0],
                nextPlayer: players[1],
                bonus: this.setBonus()
            }
        });
    }

    /**
     * Renders the game, containing the field, the players and the dice
     *
     * @returns
     * @memberof App
     */
    render() {
        return ( 
            <div className="game-board" onKeyDown={this.movePlayer} tabIndex="0">
                <Field players={this.state.players} 
                    it={this.state.currentIt} 
                    tagAnim={this.state.tagAnim}
                    transitionEnd={this.transitionEnd}
                    cookies={this.state.cookies}
                    bonus={this.state.bonus}/>
                <Players players={this.state.players} cookieface={this.state.cookies.face} />
                <Dice setTurn={this.setTurn} 
                    moves={this.state.moves}
                    currentPlayer={this.state.currentPlayer}
                    nextPlayer={this.state.nextPlayer}
                    disabled={this.state.started && this.state.currentPlayer && this.state.currentPlayer.moves !== 0} />
            </div>
        );
    }
}

export default Game;