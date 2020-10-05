import React from 'react'

function Square(props) {
    return (
        <button className="square" onClick={() => props.click()}>
            {props.value}
        </button>
    )
}

export default Square;