/*eslint no-loop-func: 0*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YourIt from './YourIt';
import { Exclamation } from './Exclamation';

export default class Field extends Component {

    state = {
        fieldDivs: [],
        fieldCoord: null
    }

    getFace = (position) => {
        const player = this.props.players.find(player => player.pos === position);
        if(player) {
            return player.lives > 0 ? player.face : '👻';
        } else if(this.props.cookies.positions.includes(position)) {
            return this.props.cookies.face;
        } else if(position === this.props.bonus.position) {
            const bonusType = {
                health: '❤️',
                immunity: '💎',
                moneybag: '💰',
                teleport: '🚀'
            }
            return bonusType[this.props.bonus.type];
        } else {
            return '';
        }
    }

    componentDidMount() {
        let field = ReactDOM.findDOMNode(this);
        const fieldCoord = field.getBoundingClientRect();
        let divs = field.children;
        divs = Array.from(divs).filter(element => element.classList.contains('square'));
        const fieldDivs = divs.map((div, index) => ({
            pos: index,
            coord: {
                top: div.getBoundingClientRect().top,
                left: div.getBoundingClientRect().left
            }
        }));
        this.setState({ fieldDivs, fieldCoord })
    }

    getCurrentCoords = ()=> {
        if(this.state.fieldDivs && this.state.fieldDivs.length) {
            return this.state.fieldDivs.find(div => div.pos === this.props.currentPlayer.pos).coord;
        } else {
            return { top: 0, left: 0 }
        }
    }

    render() {
        let position = 0;
        const field = [];
        while(position < 100) {
            let color;
            if(Math.floor(position / 10) % 2 === 0) {
                color = position % 2 === 0 ? 'forestgreen' : 'greenyellow';
            } else {
                color = position % 2 === 1 ? 'forestgreen' : 'greenyellow';
            }
            field.push(
                <div className={`square ${color}`} key={position}>
                    {this.getFace(position)}
                </div>
            );
            position += 1;
        }

       const { top, left } = this.getCurrentCoords();

        return (
            <div className="field">
                <YourIt pos={ this.state.fieldCoord ?
                                 { top: this.state.fieldCoord.top, left: this.state.fieldCoord.left}
                                  : { top: 0, left: 0 }} 
                    it={this.props.it} 
                    tagAnim={this.props.tagAnim}
                    transitionEnd={this.props.transitionEnd}/>
                <Exclamation 
                    pos={ {top, left} }
                    message={this.props.alert}/>
                {field}
            </div>
        )
    }
}
