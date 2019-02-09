import React, { Component } from 'react';
import FaceGrid from '../components/FaceGrid';
import PlayerEditDisplay from '../components/PlayerEditDisplay';

export default class Intro extends Component {

    state = {
        currentPlayer: 0,
        currentFaces: ['', '', '', ''],
        currentNames: ['', '', '', ''],
        inputName: React.createRef(),
        selectedFace: ''
    }

    nextPlayer = (value) => {
        this.setState(prevState => {
            let currentPlayer = prevState.currentPlayer + value;
            if(currentPlayer >= 4) {
                currentPlayer = 0;
            }
            if(currentPlayer < 0) {
                currentPlayer = 3;
            }
            return { currentPlayer }
        })
    }

    addPlayer = (event) => {
        event.preventDefault();
        const currentNames = this.state.currentNames;
        currentNames[this.state.currentPlayer] = this.state.inputName.current.value;
        const currentFaces = this.state.currentFaces;
        currentFaces[this.state.currentPlayer] = this.state.selectedFace;
        this.setState({ currentNames, currentFaces });
    }

    selectFace = (selectedFace) => {
        this.setState({ selectedFace });
    }

    createGame = (event)=> {
        const router = this.props.router;
        event.preventDefault();
        const cookieType = event.target.goodies.value;
        this.props.createPlayers(
            cookieType,
            this.state.currentFaces,
            this.state.currentNames,
            router.history.push
        );
        this.refs.form.reset();
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.createGame} ref="form">
                    <h1>Create A Player!</h1>
                    <div>
                        <h3>{`Player ${this.state.currentPlayer + 1}`}</h3>
                    </div>
                    <p>Select a face:</p>
                    <div className="facegrid">
                        <FaceGrid selectFace={this.selectFace} />
                    </div>
                    <p>Selected Face: {this.state.selectedFace}</p>
                    <label htmlFor="name">
                        Name:
                        <input type="text" name="name" id="name" ref={this.state.inputName}/>
                    </label>
                    <button onClick={this.addPlayer}>Add Player</button>
                    <button onClick={(event)=> { event.preventDefault(); this.nextPlayer(1) }}>Next</button>
                    <button onClick={(event)=> { event.preventDefault(); this.nextPlayer(-1) }}>Previous</button>
                    <div className="player-display">
                    {this.state.currentFaces.map((face, index) => {
                        return (
                            <PlayerEditDisplay playerNumber={index + 1} key={index}
                                face={this.state.currentFaces[index]} 
                                name={this.state.currentNames[index]} />)
                    })}
                    </div>
                    <label htmlFor="goodies">Choose a Goody!</label>
                    <select name="goodies" id="goodies">
                        <option value="donut">{'🍩'}</option>
                        <option value="cookie">{'🍪'}</option>
                        <option value="hotdog">{'🌭'}</option>
                        <option value="bacon">{'🥓'}</option>
                        <option value="hamburger">{'🍔'}</option>
                        <option value="brocolli">{'🥦'}</option>
                    </select>
                    <button type="submit">Play!</button>
                </form>
            </div>
        );
    }
}