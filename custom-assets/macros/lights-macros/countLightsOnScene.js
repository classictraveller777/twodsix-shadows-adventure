const lights = game.canvas.scene.lights;
console.log(lights.size);

for (const l of lights) {
  let uuid = l.uuid
  console.log(uuid) 
}