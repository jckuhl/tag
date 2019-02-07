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

    createPlayers = (cookieType, navigate)=> {
        const cookies = {
            "donut":'🍩',
            "cookie":'🍪',
            "hotdog":'🌭',
            "bacon":'🥓',
            "hamburger":'🍔',
            "brocolli":'🥦',
        }
        cookieType = cookies[cookieType];
        this.setState({ cookieType }, ()=> {
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