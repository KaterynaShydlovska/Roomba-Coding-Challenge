Roomba Coding Challenge

### OVERVIEW

Given a set of driving instructions and dirt locations, track a roomba’s movements and the total
amount of dirt it has collected.

### SPECIFICATIONS

The sample input gives you the room dimensions, initial location of the roomba, the dirt locations,
and the driving instructions. The dimensions and locations are arrays with the first number being
the x coordinate and the second number being the y coordinate. For example, given room
dimensions [5, 10] the room would be 5 units wide and 10 units high.
The driving instructions are given as North, South, East, and West. So, if the roomba’s current
position is (1, 2) and the next driving instruction to process is “N” then the roomba’s final position
for that step would be (1, 3). The roomba can’t navigate outside of the room dimensions.
If the driving instruction results in the roomba hitting a wall the roomba should not move from its
current location and the total wall hits should be incremented by 1. For example, if the roomba’s
current location is (1, 0) and the next driving instruction is “S”, then the roomba’s final position for
that step would still be (1, 0) and the total wall hits would be incremented by 1.
After processing all the driving instructions, print out the final location of the roomba, the total
distance traveled, the total amount of dirt collected, and the total number of times it ran into a
wall.

#### REQUIREMENTS
- Must be a react web application
- Upload a JSON file with room dimensions, dirt coordinates, roomba starting coordinates,
and roomba driving instructions
- For each step show the current step, current location of the roomba, current driving
instruction that was processed, total amount of dirt collected, and did the roomba run into
a wall.
- After all steps are completed, show the roomba’s final position, total dirt collected, total
unique dirt locations, total distance the roomba traveled, and the total amount of walls hit.