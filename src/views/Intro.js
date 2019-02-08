import React, { Component } from 'react';
import FaceGrid from '../components/FaceGrid';

export default class Intro extends Component {

    state = {
        currentPlayer: 1
    }

    selectFace = (face) => {
        console.log(face)
    }

    createGame = (event)=> {
        const router = this.props.router;
        event.preventDefault();
        const cookieType = event.target.goodies.value;
        this.props.createPlayers(cookieType, router.history.push);
        this.refs.form.reset();
    }
    /*eslint-disable*/
    render() {
        return (
            <div>
                <form onSubmit={this.createGame} ref="form">
                    <h1>Create A Player!</h1>
                    <div>
                        <h3>{`Player ${this.state.currentPlayer}`}</h3>
                    </div>
                    <p>Select a face:</p>
                    <div className="facegrid">
                        <FaceGrid selectFace={this.selectFace} />
                    </div>
                    <label htmlFor="goodies">Choose a Goody!</label>
                    <select name="goodies" id="goodies">
                        <option value="donut">🍩</option>
                        <option value="cookie">🍪</option>
                        <option value="hotdog">🌭</option>
                        <option value="bacon">🥓</option>
                        <option value="hamburger">🍔</option>
                        <option value="brocolli">🥦</option>
                    </select>
                    <button type="submit">Play!</button>
                </form>
            </div>
        );
    }
    /*eslint-enable*/
}