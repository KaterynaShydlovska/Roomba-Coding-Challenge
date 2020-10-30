import React, { useState } from 'react';
import Blank from './blank.png';
import Roomba from './roomba.jpg';
import Table from 'react-bootstrap/Table'



const RoombaBoard = () => {
    let initialRows = [];
    let res= {}


    function kickOff (json){
        let newState = []

        for(let i =0; i<json[0].roomDimensions[0]; i++){
            newState.push([]);
            for(let k=0; k<json[0].roomDimensions[1]; k++){
                if(i === json[0].initialRoombaLocation[0] && k === json[0].initialRoombaLocation[1]) {
                    newState[i].push('roomba')
                } else {
                    newState[i].push('blank')
                }
            }
        }

        setRows(newState);
        let r = roomba(json[0], newState);
        moveRoomba(newState, r.roombaSteps);
    }
    
    
    
    const parseFile  = (files, callBack) => {
        var reader = new FileReader();
        reader.readAsText(files[0]);
        reader.onload = function(e) {
            callBack(JSON.parse(reader.result), 'json');
      }
      
    }

    function moveRoomba (initial, arr) {
           for(let i = 0; i< arr.length; i++) {
            setTimeout(function() {
                let temp = initial
                temp[arr[i][0]][arr[i][1]]="roomba";
                setRows(temp);
                console.log("moving", i, temp)
            }, 10);
           }
    }
    

const [rows, setRows] = useState(initialRows);
const [result, setResult] = useState(res);


const displayRows = rows.map(row => 
    <li style={{listStyleType: "none"}}>
        
        {row.map(e => {
            switch(e) {
                case 'blank':
                    return<img src={Blank} style={{width: 70, height: 70, padding:0}}/>
                case 'roomba':
                return <img src={Roomba} style={{width: 70, height: 70, padding:0}}/>
            }
        })
    }
    </li>

)
 function roomba(json, newState){
     console.log()
    let dirts =0;
    let roombaLocation;
    let wallHit =0;
  
  
    let dirtMap ={};
  
    for(let i = 0; i< json.dirtLocations.length; i++){
      dirtMap[json.dirtLocations[i]] = true;
    }

    let k =0;
    let i =json.initialRoombaLocation[0];
    let j =json.initialRoombaLocation[1];
    let distanse;
    let roombaSteps = [];
  
  
  while(k < json.drivingInstructions.length) {
    
       console.log(json.drivingInstructions[k], 'k')
  
       if(dirtMap[i+","+j]){
         console.log(dirts, i+","+j)
          dirts+=1;
       }
  
        if (json.drivingInstructions[k] === 'N' && j === json.roomDimensions[1] || json.drivingInstructions[k] === 'E'&& i === json.roomDimensions[0] || json.drivingInstructions[k] === 'S' && j === 0 || json.drivingInstructions[k] === 'W' && i === 0){
          wallHit +=1;
        }else{
          if(json.drivingInstructions[k] === 'N'){
            j++;
          }
          if(json.drivingInstructions[k] === 'E'){
            i++;
          }
          if(json.drivingInstructions[k] === 'S'){
            j--
          }
          if(json.drivingInstructions[k] === 'W'){
            i--
          }
        }
        k++;
        roombaSteps.push([i,j])
         roombaLocation = [i,j]
         distanse = json.drivingInstructions.length - wallHit;
  
        console.log(wallHit, 'wallhit here')
     
    }
    let lastResult =   {
        'Total Distance Traveled:': distanse,
        'Roomba Location': roombaLocation, 
        'Total Dirt Collacted': dirts,
        'Total WAll Hit':wallHit,
        "roombaSteps" : roombaSteps
    }

    console.log(lastResult, 'res')
    setResult(lastResult);
  return lastResult;
}


return (
    <>
    <div>
        <input type="file" accept=".json" onChange={e => {
          parseFile([...e.target.files], kickOff);
        }}/>
        { displayRows}  
    </div>
    <div>
    {Object.keys(result).length > 0 ? Object.entries(result).map((t,k) => <li style={{listStyleType: "none"}}  key={k} value={t[0]}>{t[1]}</li>) : "NOTHING"}

    
    {/* <Table striped bordered hover size="sm">         
  <tbody>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>

</Table> */}
    </div>

    </>
)

}


export default RoombaBoard;