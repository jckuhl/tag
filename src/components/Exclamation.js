import React from 'react';

export const Exclamation = props => (
    <p className={ `popup ${props.anim}` } 
        style={{ top: props.pos.top, left: props.pos.left, /*visibility: 'hidden'*/}}>
        {props.message}
    </p>
);