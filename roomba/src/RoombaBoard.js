import React, { useState } from 'react';
import Blank from './blank.png';
import Roomba from './roomba.jpg';
import Dirt from './dirt.jpg';
import './App.scss';





const RoombaBoard = () => {

  const [rows, setRows] = useState([]);
  const [result, setResult] = useState({});
  const [end, setEnd] = useState(false);
  const [table, setTable] = useState([["Step", "Location", "Action", "Dirt collected", "Wall hits"]]);


    const kickOff = async (json) => {
        let r = roomba(json[0]);
        setResult(r);
        setTimeout(() => moveRoomba(0, r), 1000);
    }

    const initState = (x, y, dirtMap) => {
      let startState = []
      for(let i =0; i<x; i++){
        startState.push([]);
          for(let k=0; k<y; k++){
            if(dirtMap[i+","+k]){
              startState[i].push('dirt')
            } else {
              startState[i].push('blank')
            }
          }
      }
      return startState;
    }
    
    
    
    const parseFile  = (files, callBack) => {
        var reader = new FileReader();
        reader.readAsText(files[0]);
        reader.onload = function(e) {
            callBack(JSON.parse(reader.result), 'json');
      }
      
    }

    const moveRoomba = async (position, res) => {
      if (position === res.roombaSteps.length){
        console.log(res);
        setEnd(true);
        return;
      } else {
        let state = initState(res.roomDimensions[0], res.roomDimensions[1], res.dirtMap)
        let curentSteps = res.roombaSteps[position];
        state[curentSteps[0]][curentSteps[1]] = "roomba";
        if(res.dirtMap[curentSteps[0] + "," + curentSteps[1]]) {
          delete res.dirtMap[curentSteps[0] + "," + curentSteps[1]]
        }
        setRows(state);
        setTimeout(() =>  moveRoomba(position + 1, res), 2000);
      }
    }

function roomba(json){
    let dirts =0;
    let roombaLocation;
    let wallHit =0;
  
  
    let dirtMap ={};
  
    for(let i = 0; i< json.dirtLocations.length; i++){
      dirtMap[json.dirtLocations[i]] = true;
    }
    let step = 1;
    let k =0;
    let i =json.initialRoombaLocation[0];
    let j =json.initialRoombaLocation[1];
    let distanse;
    let roombaSteps = [[i,j]];
    table.push([step, [i + ", "+ j], '', dirts, wallHit])
  
  
  while(k < json.drivingInstructions.length) {

       if(dirtMap[i+","+j]){
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
        step+=1
        table.push([step, [i + ", "+ j], json.drivingInstructions[k], dirts, wallHit])
        setTable(table);
        roombaSteps.push([i,j])
         roombaLocation = [i + ", "+ j]
         distanse = json.drivingInstructions.length - wallHit;     
    }
    let lastResult = {
      dirtMap: dirtMap,
      roomDimensions : json.roomDimensions,
      beg: json.initialRoombaLocation,
      distanse: distanse,
      roombaLocation: roombaLocation, 
      dirts: dirts,
      wallHit:wallHit,
      roombaSteps : roombaSteps
    }

    console.log(lastResult, 'here');
  return lastResult;
}


return (
    <>
    <div>
        <input type="file" accept=".json" onChange={e => {
          parseFile([...e.target.files], kickOff);
        }}/>
        {rows.map(row => 
    <li style={{listStyleType: "none"}}>
        
        {row.map(e => {
            switch(e) {
                case 'blank':
                    return<img src={Blank} style={{width: 70, height: 70, padding:0}}/>
                case 'dirt':
                  return<img src={Dirt} style={{width: 70, height: 70, padding:0}}/>
                case 'roomba':
                return <img src={Roomba} style={{width: 70, height: 70, padding:0}}/>
            }
        })
    }
    </li>

)} 
    </div>
    <div id='table'>
    <table >
    {table.length  && end ? table.map(raw => {
           return (
            
            <tr >
            <td>{raw[0]}</td>
            <td>{raw[1]}</td>
            <td>{raw[2]}</td>
            <td>{raw[3]}</td>
            <td>{raw[4]}</td> 
             </tr> 
           
   
          )
}) : ""}
  </table>
    {end ?
    <div id='result'>
        <p>Final Position: {result.roombaLocation}</p>
        <p>Total Dirt Collected: {result.dirts}</p>
        <p>Total Distance Traveled: {result.distanse}</p>
        <p>Total Walls Hit: {result.wallHit}</p>
    </div>
: ''}


    </div>
   
  
  
   

    </>
)

}


export default RoombaBoard;