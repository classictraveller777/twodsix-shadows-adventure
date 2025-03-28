// Flags set by the core software use the "core" scope. 
// Flags set by game systems or modules should use the canonical name attribute for the module 
// Flags set by an individual world should "world" as the scope.
// name door-tile-locXX ( these are unique across all levels )
// https://foundryvtt.com/api/v12/classes/client.WallDocument.html#setFlag
// Setting a flag value to null will delete that flag <- The API is incorrect see removeFLag.js

// this macro has a UI dialog version see setFlagUsingPopupDialog.js  

// https://foundryvtt.com/api/v12/classes/client.WallDocument.html
const uuid = "Scene.FA0ytKbddMfQLWb1.Wall.LH0L9slAWeQ9fGVz";
const type = fromUuidSync(uuid); // can be anything token, wall, tile etc 
// scope , key, value 
const value = "door-loc20"; 
await type.setFlag("world", "doorName", value); // NOTE setFlag 

/*
NOTES 

await wall.setFlag("world-name", "doorName", "door-tile-loc20"); // set flag returns a promise - use await ?    
// await wall.update(); // redundant ? no need to call update as setFlag() calls update() internally 

*/

