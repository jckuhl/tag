import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Route } from 'react-router-dom';
import Game from './views/Game';
import Intro from './views/Intro';
import Player from './models/player';

const GlobalStyle = createGlobalStyle`
    box-sizing: border-box;
    body {
        @import url('https://fonts.googleapis.com/css?family=Roboto');
        font-family: 'Roboto', sans-serif;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 16px;
    }
`;

const GameHeader = styled.header`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 1rem;
    a {
        margin-left: auto;
    }
`;

const GameFooter = styled.footer`
    text-align: center;
`;

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
            <React.Fragment>
                <GlobalStyle/>
                <GameHeader>
                    <h1>Tag!</h1>
                    <a href="https://github.com/jckuhl/tag" target="_blank" rel="noopener noreferrer">Github</a>
                </GameHeader>
                <Route exact path="/" render={(props)=> (
                    <Intro createPlayers={createPlayers} router={props} />
                )} />
                <Route path="/game" render={(props)=> (
                    <Game router={props}/>
                )} />
                <GameFooter>
                    <small>&copy; Project Breakpoint 2019</small>
                </GameFooter>
            </React.Fragment>
        </BrowserRouter>
    );
}