import React from 'react';

export default function YourIt(props) {
    return (
        <div onTransitionEnd={props.transitionEnd} 
            className={`your-it ${props.tagAnim ? 'your-it-anim' : '' }`} 
            style={{ 
                top: props.pos.top, 
                left: props.pos.left,
                visibility: props.tagAnim ? 'visible' : 'hidden'
            }}>
            <h1>Tag!</h1>
            <p>{props.it.name} is it!</p>
        </div>
    );
}