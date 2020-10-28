// REQUIREMENTS
// - Must be a react web application
// - Upload a JSON file with room dimensions, dirt coordinates, roomba starting coordinates, and roomba driving instructions
// - For each step show the current step, current location of the roomba, current driving instruction that was processed, total amount of dirt collected, and did the roomba run into a wall.
// - After all steps are completed, show the roomba’s final position, total dirt collected, total unique dirt locations, total distance the roomba traveled, and the total amount of walls hit.
import json from '../src/app.json'
   
   function roomba(json){
     let dirts =0;
     let roombaLocation;
     let wallHit =0;
   
   
     let dirtMap ={};
   
     for(let i = 0; i< json.dirtLocations.length; i++){
       dirtMap[json.dirtLocations[i]] = true;
     }
     console.log(dirtMap, 'map')
   
     // console.log(j, 'jjjjjjjjjjjjjjjjjjjj')
     let k =0;
     let i =json.initialRoombaLocation[0];
     let j =json.initialRoombaLocation[1];
     let distanse;
   
   
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
          roombaLocation = [i,j]
          distanse = json.drivingInstructions.length - wallHit;
   
         console.log(wallHit, 'wallhit here')
      
     }
   return  'return' + [wallHit, roombaLocation, dirts, distanse];
   }
   
   console.log(json[0], '--------------------------------------')
  roomba(json[0]);