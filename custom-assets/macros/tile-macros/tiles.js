


let f = 'test macro output to console'
console.log(f)

let tileIds = ["Uk3Fmjf4IF5MZGu8"];

 canvas.tiles.controlled.forEach(i => {
  console.log(i)
})






const tiles = game.canvas.scene.tiles;
console.log("total num of tiles on scene ", tiles.size); // note if using levels module this would also count tiles on other levels 
console.log(tiles); // now you can expand and browse the array in the Foundry console

// filter to find only tiles at elevation 0 
const tiles_at_elevation0 = tiles.filter(tile => tile.elevation===0);
console.log("total num of tiles at elevation 0 ", tiles_at_elevation0.length); 
console.log(tiles_at_elevation0); // now you can expand and browse the array in the Foundry console

 
// images is not on the tileData interface but is on the tileDocument 
//https://foundryvtt.com/api/v12/classes/client.TileDocument.html


for (const tile of tiles_at_elevation0) {  
    console.log("tile id " + tile._id);          
    console.log("tile images " + tile._images);  // NOTE *** 
    // if name is set on the door tile this is because monks active tiles has set a property under flags         
    //console.log("tile flags " + tile.flags["monks-active-tiles"]);   
    const name = tile.getFlag("monks-active-tiles", "name");
    console.log("name ", name);
}

const door_tiles = tiles.filter(tile => tile.getFlag("monks-active-tiles", "name").includes("door-tile-loc"));
console.log("total num of door_tiles ", door_tiles.length);

for (const tile of door_tiles) {  
  console.log("tile id " + tile._id); // NOTE the id doesn't give you the full uuid e.g. Scene.FA0ytKbddMfQLWb1.Tile.PowshIo6CLiWqpNI               
  const name = tile.getFlag("monks-active-tiles", "name"); 
  console.log("name ", name); // the name set on tile in UI dialog e.g. door-tile-loc20
}

// NOTE tile.id does not return the uuid e.g. Scene.FA0ytKbddMfQLWb1.Tile.PowshIo6CLiWqpNI but only the tile id e.g. PowshIo6CLiWqpNI 
// you could manually build this as a string in code but if they ever change the structure it will break 


// *** images property is added by monks tile trigger when the door is 1st clicked on ( after world load ? )
// so cannot use images to filter as if the property is not set results in undefined 



for discord 

```
const name = tile.getFlag("monks-active-tiles", "name");
console.log("name ", name);

```

discord url macro polo - https://discord.com/channels/170995199584108546/699750150674972743