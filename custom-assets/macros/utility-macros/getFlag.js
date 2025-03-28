
const uuid = "Scene.FA0ytKbddMfQLWb1.Wall.LH0L9slAWeQ9fGVz";
const type = fromUuidSync(uuid); // can be anything token, wall, tile etc 
// scope , key, value 
const doorName = type.getFlag("world", "doorName"); 
console.log("doorName ", doorName); // the name set on tile in UI dialog e.g. door-tile-loc20


