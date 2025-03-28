
//so after i hacked up my own code i log back into discord to see JoaquinP has aanswered my question



// Array of UUIDs of lights that should not be updated
const lightsToSkip = ["uuid1", "uuid2", "uuid3"];

// Filter out lights in the scene that are included in the lightsToSkip array
const lights = game.canvas.scene.lights.filter(light => !lightsToSkip.includes(light.uuid));

// Prepare an array of updates for lights
const updates = lights
  .filter(() => Math.random() < 0.2) // Randomly select ~20% of lights
  .map(light => ({ _id: light._id, hidden: !light.hidden }));

// Update the selected lights
await AmbientLightDocument.updateDocuments(updates, {parent: canvas.scene});



//and another example he provided to Darth Balrog to turn more than 1 light at same time with delay 

/*

const batchSize = 4; //change this number to change the number of lights to be turned on at a time

const lightsToSkip = ["uuid1", "uuid2", "uuid3"];

const lights = game.canvas.scene.lights.filter(light => !lightsToSkip.includes(light.uuid));

for (let i = 0; i < lights.length; i += batchSize) {
  const batch = lights.slice(i, i + batchSize ); 

  const updates = batch.map(l=> ({ _id: l._id, hidden: false }));
  await AmbientLightDocument.updateDocuments(updates, {parent: canvas.scene});

  const delay = (Math.random() * 2 + 1) * 1000; 
  await new Promise(r => setTimeout(r, delay));
}
*/