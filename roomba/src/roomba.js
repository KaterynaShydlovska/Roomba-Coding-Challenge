// REQUIREMENTS
// - Must be a react web application
// - Upload a JSON file with room dimensions, dirt coordinates, roomba starting coordinates, and roomba driving instructions
// - For each step show the current step, current location of the roomba, current driving instruction that was processed, total amount of dirt collected, and did the roomba run into a wall.
// - After all steps are completed, show the roomba’s final position, total dirt collected, total unique dirt locations, total distance the roomba traveled, and the total amount of walls hit.

// import React from 'react';
// import json from '../src/app.json'
   
   export default function Roomba(props){
     let dirts =0;
     let roombaLocation;
     let wallHit =0;
   
   
     let dirtMap ={};
   
     for(let i = 0; i< props.dirtLocations.length; i++){
       dirtMap[props.dirtLocations[i]] = true;
     }
     console.log(dirtMap, 'map')
   
     // console.log(j, 'jjjjjjjjjjjjjjjjjjjj')
     let k =0;
     let i =props.initialRoombaLocation[0];
     let j =props.initialRoombaLocation[1];
     let distanse;
   
   
   while(k < props.drivingInstructions.length) {
     
        console.log(props.drivingInstructions[k], 'k')
   
        if(dirtMap[i+","+j]){
          console.log(dirts, i+","+j)
           dirts+=1;
        }
   
         if (props.drivingInstructions[k] === 'N' && j === props.roomDimensions[1] || props.drivingInstructions[k] === 'E'&& i === props.roomDimensions[0] || props.drivingInstructions[k] === 'S' && j === 0 || props.drivingInstructions[k] === 'W' && i === 0){
           wallHit +=1;
         }else{
           if(props.drivingInstructions[k] === 'N'){
             j++;
           }
           if(props.drivingInstructions[k] === 'E'){
             i++;
           }
           if(props.drivingInstructions[k] === 'S'){
             j--
           }
           if(props.drivingInstructions[k] === 'W'){
             i--
           }
         }
         k++;
          roombaLocation = [i,j]
          distanse = props.drivingInstructions.length - wallHit;
   
         console.log(wallHit, 'wallhit here')
      
     }
   return{
    'Total Distance Traveled:': distanse,
    'Roomba Location': roombaLocation, 
    'Total Dirt Collacted': dirts,
    'Total WAll Hit':wallHit,
}
   }

   
//    console.log(json[0], '--------------------------------------')
//   console.log(Roomba(json[0]));