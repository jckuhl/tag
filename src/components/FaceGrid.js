import React from 'react';
import styled from 'styled-components';
import Emoji from './Emoji';

const Face = styled.div`
    text-align: center;
    width: 20px;
    height: 20px;
    cursor: pointer;

    :hover {
        background: blue;
    }
`

export default function FaceGrid(props) {
    function select(face) {
        props.selectFace(face);
    }
    const faces='😀😃😄😁😆😅😂🤣😊😇🙂🙃😉😌😍🥰😘😗😙😚😋😛😝😜🤪🤨🧐🤓😎🤩🥳😏😒😞😔😟😕🙁😣😖😫😩🥺😢😭😤😠😡🤬🤯😳🥵🥶😱😨😰😥😓🤗🤔🤭🤫🤥😶😐😑😬🙄😯😦😧😮😲😴🤤😪😵🤐🥴🤢🤮🤧😷🤒🤕🤑🤠😈👿👹👺🤡👽🤖🎃';
    const faceDivs = [];
    for(let i = 0; i < faces.length; i += 2) {
        let face = faces[i] + faces[i+1]
        faceDivs.push(
            <Face key={i} onClick={select.bind(null, face)}>
                <Emoji symbol={ face } />
            </Face>
        )
    }
    return (
        <React.Fragment>
            {faceDivs}
        </React.Fragment>
    );
}