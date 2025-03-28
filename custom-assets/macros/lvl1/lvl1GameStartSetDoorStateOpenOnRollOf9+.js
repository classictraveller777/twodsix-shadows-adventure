const scenes = game.scenes.filter(scene => scene.name==="lvl1");
const min = 2;
const max = 12;


// NOTE a custom flag e.g. doorName:door-loc20 has been set on the door using the macro setFlag
function getLocation(input) {

  const wordRegex = /\w+/g;

  const tokens = input
      .match(wordRegex);
  console.log(tokens);    
  console.log("number of tokens " + tokens.length);
  return tokens[tokens.length-1]; // returns e.g. loc20
}


for (const scene of scenes) { 
  const tiles = scene.tiles;
  const walls = scene.walls;  
  const sceneId = scene._id;
  console.log("scene id " + sceneId);
  
  const walls_with_doors = walls.filter(wall => wall.door===CONST.WALL_DOOR_TYPES.DOOR);
  console.log("num of doors on scene " + scene.name + " " + walls_with_doors.length); // note length vs size
  console.log(walls_with_doors); // now you can expand and browse the array in the Foundry console 

  // filter all under door tiles 
  const under_door_tiles = tiles.filter(tile => tile.getFlag("monks-active-tiles", "name").includes("door-tile-loc"));
  console.log("total num of under door tiles ", under_door_tiles.length);

  // close all doors 1st 
  for (const wall of walls_with_doors) { 
    doorState = wall.ds
    console.log("door state " + doorState); 
            
    if(doorState === CONST.WALL_DOOR_STATES.OPEN) {
      await wall.update({ds: CONST.WALL_DOOR_STATES.CLOSED}); // close the door 

      const doorName = wall.getFlag("world", "doorName"); 
      console.log("doorName ", doorName); // the doorName set on tile in UI dialog e.g. door-tile-loc20
      const locationNumber = getLocation(doorName); // need only the last token loc##
      console.log("locationNumber "+ locationNumber);

      for (const tile of under_door_tiles) {  
        const tileId = tile._id;
        console.log("tile id " + tile._id); // NOTE the id doesn't give you the full uuid e.g. Scene.FA0ytKbddMfQLWb1.Tile.PowshIo6CLiWqpNI               
        const underDoorTileName = tile.getFlag("monks-active-tiles", "name") 
        console.log("underDoorTileName ", underDoorTileName); // the name set on tile in UI dialog e.g. door-tile-loc20
        if(underDoorTileName.includes(locationNumber)){
          // now fire trigger the tile under the door that we changed ds on 
          console.log("matched "+ underDoorTileName + " with " + locationNumber);
          const tileUuid = "Scene."+sceneId+".Tile."+ tileId;
          console.log("tileUuid " + tileUuid);
          // need to triggerTile because the change in ds is not a click event on the door so the doorTrigger isn't firing
          // this throws an error in console when the macro is run to close doors on a scene when a different scene is loaded .
          // e.g.if run on lvl2 closes doors no error. if run when view level 1, throws error. ( vice versa if view lvl2 and run macro it throws
          // errors for doors on lvl1. the doors close and the tiles under the door update correctly.)
          // also note the error seems to cause the sounds not to play 
          game.MonksActiveTiles.triggerTile(tileUuid);          
          //console.log(scene.tiles.get(tileId));// works 
          //scene.tiles.get(tileId).document.trigger({});//does not work 
          //game.canvas.tiles.get(tileId).document.trigger({}); // does not work unlike direct call to triggertile 
          
          break; // no need to iterate the rest of the tiles as have found the match              
        }
      }  
    } 
  }
  
  await new Promise(r => setTimeout(r, 5000));

  // ok all doors are now closed. now roll 9+ to set ds to open   
  for (const wall of walls_with_doors) { 
    //doorState = wall.ds
    //console.log("door state " + doorState); 
    
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log("randomNum " + randomNum);
    if(randomNum >= 9 ) {
      await wall.update({ds: CONST.WALL_DOOR_STATES.OPEN}); 

      const doorName = wall.getFlag("world", "doorName"); 
      console.log("doorName ", doorName); // the doorName set on tile in UI dialog e.g. door-tile-loc20
      const locationNumber = getLocation(doorName); // need only the last token loc##
      console.log("locationNumber "+ locationNumber);

      for (const tile of under_door_tiles) {  
        const tileId = tile._id;
        console.log("tile id " + tile._id); // NOTE the id doesn't give you the full uuid e.g. Scene.FA0ytKbddMfQLWb1.Tile.PowshIo6CLiWqpNI               
        const underDoorTileName = tile.getFlag("monks-active-tiles", "name") 
        console.log("underDoorTileName ", underDoorTileName); // the name set on tile in UI dialog e.g. door-tile-loc20
        if(underDoorTileName.includes(locationNumber)){
          // now fire trigger the tile under the door that we changed ds on 
          console.log("matched "+ underDoorTileName + " with " + locationNumber);
          const tileUuid = "Scene."+sceneId+".Tile."+ tileId;
          console.log("tileUuid " + tileUuid);
          // need to triggerTile because the change in ds is not a click event on the door so the doorTrigger isn't firing
          // this throws an error in console when the macro is run to close doors on a scene when a different scene is loaded .
          // e.g.if run on lvl2 closes doors no error. if run when view level 1, throws error. ( vice versa if view lvl2 and run macro it throws
          // errors for doors on lvl1. the doors close and the tiles under the door update correctly.)
          // also note the error seems to cause the sounds not to play 
          game.MonksActiveTiles.triggerTile(tileUuid);          
          //console.log(scene.tiles.get(tileId));// works 
          //scene.tiles.get(tileId).document.trigger({});//does not work 
          //game.canvas.tiles.get(tileId).document.trigger({}); // does not work unlike direct call to triggertile 
          
          break; // no need to iterate the rest of the tiles as have found the match              
        }
      }  
    } 
  }        
}