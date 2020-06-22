import React from 'react';

function TextCell({data}) {

    return(
        <div className="featureTxt">
            <h2>{data.title}</h2>
            <p> {data.item}</p>
        </div>
    )
}

export default TextCell;