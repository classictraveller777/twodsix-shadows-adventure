// cycle through all lights on scene and toggle some ( 20% chance per light ) on / off  
const lights = game.canvas.scene.lights;
console.log("total number of lights on the scene " + lights.size);
// the uuids of the lights that in the large chambers 
const lightsToNotUpdateUuids = [
"Scene.FA0ytKbddMfQLWb1.AmbientLight.npSNmupMA1opNh2w", 
"Scene.FA0ytKbddMfQLWb1.AmbientLight.SSjIiMbJuTr4UdIk",
"Scene.FA0ytKbddMfQLWb1.AmbientLight.tyZvFXQxo6xSLZyc",
"Scene.FA0ytKbddMfQLWb1.AmbientLight.i9yc3BBoXpo823cp",
"Scene.FA0ytKbddMfQLWb1.AmbientLight.np2wWxzLnvM1H0Oy",
"Scene.FA0ytKbddMfQLWb1.AmbientLight.MEg5mOCo22uS0TIP"
];
console.log("lightsToNotUpdateUuids ( should be 3) " + lightsToNotUpdateUuids.length);

let lightsToUpdate = []; // empty array

console.log("lightsToUpdate ( should be 0) " + lightsToUpdate.length);
for (const l of lights) { //iterate all lights on the scene 
  // check if light uuid matches any of the uuids of the lights NOT to update 
  let uuid = l.uuid
  if (lightsToNotUpdateUuids.includes(uuid)) {
    console.log("uuid detected " + uuid)
    continue;
  }
  lightsToUpdate.push(l);
}
console.log("total number of lights to update on the scene " + lightsToUpdate.length);

// now with the shortened list toggle the light at random  
for (const light of lights) {
  lightOnOrOff = light.hidden;
  console.log("dYB4teibvYiFS5r (true = on false = off note checking inverse of light property hidden " + !lightOnOrOff);   
  let randomNum = Math.floor(Math.random() * 100) + 1;
  console.log("randomNum " + randomNum)
  if(randomNum > 75 )// i.e.only a 25% chance  
    await light.update({hidden: !lightOnOrOff}); // update hidden to inverse of current state   
    // hidden as per ?  https://foundryvtt.com/api/v12/interfaces/foundry.types.AmbientLightData.html
}