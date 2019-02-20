import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Route } from 'react-router-dom';
import Game from './views/Game';
import Intro from './views/Intro';
import Player from './models/player';

const GlobalStyle = createGlobalStyle`
    body {
        @import url('https://fonts.googleapis.com/css?family=Roboto');
        font-family: 'Roboto', sans-serif;
    }
`

const GameHeader = styled.header`
    width: 100%;
    display: flex;
    flex-direction: row;
    h1 {
    }
    a {
    }
`

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
        navigate('/game', state);
    }


    return (
        <BrowserRouter>
            <div>
                <GlobalStyle/>
                <GameHeader>
                    <header>
                        <h1>Tag!</h1>
                        <a href="https://github.com/jckuhl/tag" target="_blank">Github</a>
                    </header>
                </GameHeader>
                <Route exact path="/" render={(props)=> <Intro createPlayers={createPlayers} router={props} />} />
                <Route path="/game" render={(props)=> <Game router={props}/>} />
            </div>
        </BrowserRouter>
    );

}