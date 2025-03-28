https://foundryvtt.com/api/v12/classes/client.WallDocument.html    
https://foundryvtt.com/api/v12/interfaces/foundry.types.WallData.html
https://foundryvtt.com/api/v12/interfaces/foundry.types.WallData.html#door <- the door states use the values defined in the CONST 
https://foundryvtt.com/api/v12/enums/foundry.CONST.WALL_DOOR_TYPES.html
https://foundryvtt.com/api/v12/enums/foundry.CONST.WALL_DOOR_STATES.html 
https://foundryvtt.com/api/v12/interfaces/foundry.types.TileData.html ( note the tile has property flags - object of optional key/value flags)


const scenes = game.scenes.filter(scene => scene.name==="lvl1" || scene.name==="lvl2"); // only 2 scenes with doors that we need to check 
const min = 2;
const max = 12;

const scene = game.canvas.scene;
const tiles = game.canvas.scene.tiles;
const walls = game.canvas.scene.walls;

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

  // filter all open doors on scene 
  const walls_with_open_doors = walls.filter(wall => wall.door===CONST.WALL_DOOR_TYPES.DOOR && wall.ds===CONST.WALL_DOOR_STATES.OPEN);
  console.log("num of open doors on scene", walls_with_open_doors.length); // note length vs size
  console.log(walls_with_open_doors); // now you can expand and browse the array in the Foundry console  

  const under_door_tiles = tiles.filter(tile => tile.getFlag("monks-active-tiles", "name").includes("door-tile-loc"));
  console.log("total num of under door tiles ", under_door_tiles.length);

  // NOW iterate through the open doors and check if 7+ on 2d12 to change state to closed  
  for (const wall of walls_with_open_doors) { 
    console.log("door state " + wall.door); // TODO use assertion to check CONST.WALL_DOOR_STATES.OPEN (1)   
      
    // NOTE. Foundry core a wall/door has no name property. ( expand a WallDocument obj console OR click on a door to open UI dialog )
    console.log("door id " + wall._id); // yes the door has an id - but this doesn't help to identify the door 
    // so for each of the ( non secret ) doors on the level a custom flag, doorName, has been set using a macro to be able to identify the door e.g. door-loc20
    
    const doorName = wall.getFlag("world", "doorName"); 
    console.log("doorName ", doorName); // the doorName set on tile in UI dialog e.g. door-tile-loc20
    const locationNumber = getLocation(doorName); // need only the last token loc##
    console.log("locationNumber "+ locationNumber);

    // a 2nd custom flag, doorPoppedOpen, can be set by the referee using a macro, to mark doors which players have proppedOpen and so cannot be 
    // be closed by a 7+ on a seismic tremor 
    // TODO consider moving this check to the walls_with_open_doors filter
    const doorProppedOpen = wall.getFlag("world", "doorProppedOpen"); 
    console.log("doorProppedOpen ", doorProppedOpen); 
    if(doorProppedOpen !== undefined) {      
      continue; 
    } 

    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log("randomNum " + randomNum);
    if(randomNum >= 7 ) {
      await wall.update({ds: CONST.WALL_DOOR_STATES.CLOSED})  
      console.log("closing door " + locationNumber);       
      // check the doorName location# to find the matching tileName with the same location#

      for (const tile of under_door_tiles) {  
        const tileId = tile._id;
        console.log("tile id " + tile._id); // NOTE the id doesn't give you the full uuid e.g. Scene.FA0ytKbddMfQLWb1.Tile.PowshIo6CLiWqpNI               
        const underDoorTileName = tile.getFlag("monks-active-tiles", "name") 
        console.log("underDoorTileName ", underDoorTileName); // the name set on tile in UI dialog e.g. door-tile-loc20
        if(underDoorTileName.includes(locationNumber)){
          // now fire trigger the tile under the door that we changed ds on 
          console.log("matched "+ underDoorTileName + " with " + locationNumber);
          // TODO need to get the scene name 
          const sceneId = scene._id;
          console.log("scene id " + sceneId);

          const tileUuid = "Scene."+sceneId+".Tile."+ tileId;
          console.log("tileUuid " + tileUuid);
          // need to triggerTile because the change in ds is not a click event on the door so the doorTrigger isn't firing
          game.MonksActiveTiles.triggerTile(tileUuid);             
        }
      }  
    }   
  }
}
