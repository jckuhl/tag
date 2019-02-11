import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Game from './views/Game';
import Intro from './views/Intro';
import Player from './models/player';

export default function App(props){

    const createPlayers = (cookieType, faces, names, navigate)=> {
        const cookies = {
            "donut":'🍩',
            "cookie":'🍪',
            "hotdog":'🌭',
            "bacon":'🥓',
            "hamburger":'🍔',
            "brocolli":'🥦',
        }
        const pos = [0, 9, 90, 99];
        const cookieFace = cookies[cookieType];
        const players = faces.map((face, index) => {
            return new Player(names[index], face, pos[index], index);
        });
        const state = {
            cookieFace,
            cookieType,
            players
        }
        this.setState({ cookieType, cookieFace, players }, ()=> {
            navigate('/game', state);
        });
    }


    return (
        <BrowserRouter>
            <div>
                <Route exact path="/" render={(props)=> <Intro createPlayers={createPlayers} router={props} />} />
                <Route path="/game" render={(props)=> <Game router={props}/>} />
            </div>
        </BrowserRouter>
    );

}