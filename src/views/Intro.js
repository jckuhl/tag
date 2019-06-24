import React, { Component } from 'react';
import styled from 'styled-components';
import FaceGrid from '../components/FaceGrid';
import PlayerEditDisplay from '../components/PlayerEditDisplay';

const Title = styled.h1`
    text-align: center;
    color: rebeccapurple;
`;

const SubTitle = styled.h3`
    text-align: center;
`;

const IntroBody = styled.form`
    margin: 0 auto;
    .center {
        text-align: center;
    }
`;

const FaceContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(15, 20px);
    justify-content: center;
`;

const PlayerDisplay = styled.div`
    display: flex;
    justify-content: space-between;
`;

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Button = styled.button`
    font-family: 'Roboto', sans-serif;
    background: lightgoldenrodyellow;
    border: solid 2px black;
    border-radius: 15px;
    font-size: 1rem;

    &:hover {
        background: goldenrod;
    }

    &:disabled {
        background: grey;
    }
`;

const InlineLabel = styled.div`
    margin: 1rem 0;
    display: inline-block;
`;

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
            <FlexColumn>
                <IntroBody onSubmit={this.createGame} ref="form">
                    <Title>
                        Create A Player!
                    </Title>
                    <SubTitle>
                        {`Player ${this.state.currentPlayer + 1}`}
                    </SubTitle>
                    <p className="center">Select a face:</p>
                    <FaceContainer>
                        <FaceGrid selectFace={this.selectFace} />
                    </FaceContainer>
                    <p>Selected Face: {this.state.selectedFace}</p>
                    <InlineLabel>
                        <label htmlFor="name">
                            Name:
                            <input type="text" name="name" id="name" ref={this.state.inputName} maxLength="15"/>
                        </label>
                    </InlineLabel>
                    <Button onClick={this.addPlayer}>Add Player</Button>
                    <Button onClick={(event)=> { event.preventDefault(); this.nextPlayer(1) }}>Next</Button>
                    <Button onClick={(event)=> { event.preventDefault(); this.nextPlayer(-1) }}>Previous</Button>
                    <PlayerDisplay>
                        {this.state.currentFaces.map((face, index) => (
                            <PlayerEditDisplay playerNumber={index + 1} 
                                key={index}
                                face={this.state.currentFaces[index]} 
                                name={this.state.currentNames[index]}
                                active={this.state.currentPlayer === index} />
                        ))}
                    </PlayerDisplay>
                    <InlineLabel>
                        <label htmlFor="goodies">
                            Choose a Goody!
                            <select name="goodies" id="goodies">
                                <option value="donut">{'🍩'}</option>
                                <option value="cookie">{'🍪'}</option>
                                <option value="hotdog">{'🌭'}</option>
                                <option value="bacon">{'🥓'}</option>
                                <option value="hamburger">{'🍔'}</option>
                                <option value="brocolli">{'🥦'}</option>
                            </select>
                        </label>
                    </InlineLabel>
                    <Button type="submit" 
                        disabled={
                            this.state.currentFaces.includes('') 
                            || this.state.currentNames.includes('')
                        }
                        >Play!</Button>
                </IntroBody>
            </FlexColumn>
        );
    }
}