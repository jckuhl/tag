import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Game from './views/Game';
import Intro from './views/Intro';
import Player from './models/player';

export default class App extends Component {

    state = {
        players: [],
        cookieType: ''
    }

    createPlayers = (cookieType, faces, names, navigate)=> {
        const cookies = {
            "donut":'🍩',
            "cookie":'🍪',
            "hotdog":'🌭',
            "bacon":'🥓',
            "hamburger":'🍔',
            "brocolli":'🥦',
        }
        const pos = [0, 9, 90, 99];
        cookieType = cookies[cookieType];
        const players = faces.map((face, index) => {
            return new Player(names[index], face, pos[index], index);
        });
        this.setState({ cookieType, players }, ()=> {
            navigate('/game', this.state);
        });
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" render={(props)=> <Intro createPlayers={this.createPlayers} router={props} />} />
                    <Route path="/game" render={(props)=> <Game router={props}/>} />
                </div>
            </BrowserRouter>
        );
    }

}