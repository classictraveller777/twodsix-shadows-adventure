const uuid = "Scene.FA0ytKbddMfQLWb1.Wall.LH0L9slAWeQ9fGVz";
const type = fromUuidSync(uuid); // can be anything token, wall, tile etc 
// scope , key
await type.unsetFlag("world", "doorName")