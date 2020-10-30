import React, { useState } from 'react';
// import json from '../src/app.json'
import roombaFn from './roomba.js'
import Blank from './blank.png';
// import Roomba from './roomba.jpg';
import Green from './green.jpg'

const kickOff = (json) => {
    console.log(typeof(json), "sdfsfsdf");
    console.log(roombaFn(json[0]));
}

const parseFile  = (files, callBack) => {
    var reader = new FileReader();
    reader.readAsText(files[0]);
    reader.onload = function(e) {
        callBack(JSON.parse(reader.result));
  }
  
}



const RoombaBoard = () => {
// const width=10;
// const height=10;
    let initialRows = [];
    for(let i =0; i<10; i++){
        initialRows.push([]);
        for(let k=0; k<10; k++){
            initialRows[i].push('blank')
        }
    }

const [rows, setRows] = useState(initialRows);
const [roomba, setRoomba] = useState([{x:0,y:0}]);

const displayRoomba = () => {

const newRows = rows;

roomba.forEach(cell => {

newRows[cell.x][cell.y]='roomba';
console.log(newRows, 'rows')

})

setRows(newRows);

}
const moveRoomba = () => {
    const newRoomba = [];
    // switch(direction) {
    //     case 'right':
    //         newRoomba.push({x: roomba[0].x, y: (roomba[0].y + 1)%width})
    //         break;
    //     case 'left':
    //         newRoomba.push({x: roomba[0].x, y: (roomba[0].y - 1 + width)%width})
    //         break;
    //     case 'top':
    //         newRoomba.push({x: (roomba[0].x - 1 + height)%height, y: roomba[0].y})
    //         break;
    //     case 'bottom':
    //         newRoomba.push({x: (roomba[0].x + 1)%height, y: roomba[0].y})
    // }
    //     roomba.forEach(cell=> {
    //         newRoomba.push(cell);
    //     })    
    // if(roomba[0].x === food.x && roomba[0].y === food.y) {
    //     setFood(randomPosition);
    // }else {
    //     newRoomba.pop();
    // }
    setRoomba(newRoomba);
    displayRoomba();
}


const displayRows = rows.map(row => 
    <li style={{listStyleType: "none"}}>
        {row.map(e => {
            switch(e) {
                case 'blank':
                    return<img src={Blank} style={{width: 70, height: 70, padding:0}}/>
                case 'roomba':
                return <img src={Green} style={{width: 70, height: 70, padding:0}}/>
            }
        })
    }
    </li>

)

return (
    <div>
        <input type="file" accept=".json" onChange={e => {
          parseFile([...e.target.files], kickOff);
        }}/>
        { displayRows}
        {/* {displayRoomba} */}
    </div>
)
}


export default RoombaBoard;