import React from 'react';
import PopUp from './PopUpStyle';

export const Exclamation = props => (
    <PopUp className={ props.anim } 
        style={{ top: props.pos.top, left: props.pos.left, /*visibility: 'hidden'*/}}>
        {props.message}
    </PopUp>
);