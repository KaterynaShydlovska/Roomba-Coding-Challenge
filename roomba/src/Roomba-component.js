import React from 'react';
import  './roomba.js'


const RoombaMoves = props => {
    console.log(props, 'prooops')

    return (
        <div>
            <ul>
                <li>Total Distance Traveled: </li>
                <li>Roomba Location: </li>
                <li>Total Dirt Collacted: </li>
                <li>Total WAll Hit: </li>
            </ul>
        </div>
    )
}

export default RoombaMoves;