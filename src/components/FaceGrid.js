import React from 'react';
import Emoji from './Emoji';

export default function FaceGrid(props) {
    function select(face) {
        props.selectFace(face);
    }
    const faces='😀😃😄😁😆😅😂🤣😊😇🙂🙃😉😌😍🥰😘😗😙😚😋😛😝😜🤪🤨🧐🤓😎🤩🥳😏😒😞😔😟😕🙁😣😖😫😩🥺😢😭😤😠😡🤬🤯😳🥵🥶😱😨😰😥😓🤗🤔🤭🤫🤥😶😐😑😬🙄😯😦😧😮😲😴🤤😪😵🤐🥴🤢🤮🤧😷🤒🤕🤑🤠😈👿👹👺🤡👽🤖🎃';
    const faceDivs = [];
    for(let i = 0; i < faces.length; i += 2) {
        let face = faces[i] + faces[i+1]
        faceDivs.push(
            <div className="face" key={i} onClick={select.bind(null, face)}>
                <Emoji symbol={ face } />
            </div>
        )
    }
    return (
        <React.Fragment>
            {faceDivs}
        </React.Fragment>
    );
}