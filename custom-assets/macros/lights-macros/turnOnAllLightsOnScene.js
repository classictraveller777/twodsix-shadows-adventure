const lights = game.canvas.scene.lights;
for (const l of lights) {
  await l.update({hidden: false});
}