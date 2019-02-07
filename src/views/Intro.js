import React, { Component } from 'react';

const face=`😀😃😄😁😆😅😂🤣☺😊😇🙂🙃😉😌😍🥰😘😗😙😚😋😛😝😜🤪🤨🧐🤓😎🤩🥳😏😒😞😔😟😕🙁☹😣😖😫😩🥺😢😭😤😠😡🤬🤯😳🥵🥶😱😨😰😥😓🤗🤔🤭🤫🤥😶😐😑😬🙄😯😦😧😮😲😴🤤😪😵🤐🥴🤢🤮🤧😷🤒🤕🤑🤠😈👿😈👿👹👺🤡👽🤖🎃`

export default class Intro extends Component {

    createPlayers = (event)=> {
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
                <form onSubmit={this.createPlayers} ref="form">
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