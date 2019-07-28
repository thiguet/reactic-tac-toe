import React from 'react'
import "./square.css"
import "./csshake.css"

function Square(props) {
    return (
        <button className={(props.shake ?  "shake-constant shake-slow" : "")  + " square btn"} onClick={() => props.onClick()}>
            { props.value }
        </button>
    );
}

export default Square;