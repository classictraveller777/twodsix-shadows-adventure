const scenes = game.scenes.filter(scene => scene.name==="lvl1" || scene.name==="lvl2" || scene.name==="lvl1.5" ); // only 3 scenes with lights that we need to check 
const min = 2;
const max = 12;

const lvl1LightsToNotUpdateUuids = [
    "Scene.HN4vovMTsV5UA4Ma.AmbientLight.g2j9jrXON4QEYpCo", 
    "Scene.HN4vovMTsV5UA4Ma.AmbientLight.QW7b62aYqbkCwfgL", "Scene.HN4vovMTsV5UA4Ma.AmbientLight.AOje8wcSOOHfPqtg",
    "Scene.HN4vovMTsV5UA4Ma.AmbientLight.TfkM6t5FyU1TGkhO", //light on tile on tile of pyramid exterior
    "Scene.HN4vovMTsV5UA4Ma.AmbientLight.X4PCsOX2ZSPdu1sj", //light on tile on tile of pyramid exterior
    "Scene.HN4vovMTsV5UA4Ma.AmbientLight.XcOalUm6Bi4boDC6"  //light on tile on tile of pyramid exterior
    ];


const lvl15LightsToNotUpdateUuids = [
    "Scene.g3gzlL2DlN8QlZVf.AmbientLight.mTCN1PlcijiHHpc7", // power plant room 
    "Scene.g3gzlL2DlN8QlZVf.AmbientLight.Tr9CCNFv4XuF5Vmm"  // exterior shaft   
    ];

const lvl2LightsToNotUpdateUuids = [
    "Scene.FA0ytKbddMfQLWb1.AmbientLight.npSNmupMA1opNh2w", // large chambers 
    "Scene.FA0ytKbddMfQLWb1.AmbientLight.SSjIiMbJuTr4UdIk",
    "Scene.FA0ytKbddMfQLWb1.AmbientLight.tyZvFXQxo6xSLZyc",
    "Scene.FA0ytKbddMfQLWb1.AmbientLight.i9yc3BBoXpo823cp",
    "Scene.FA0ytKbddMfQLWb1.AmbientLight.np2wWxzLnvM1H0Oy",
    "Scene.FA0ytKbddMfQLWb1.AmbientLight.MEg5mOCo22uS0TIP"
    ];    


for (const scene of scenes) { 
    const tiles = scene.tiles;
    const walls = scene.walls;  
    const sceneId = scene._id;
    console.log("scene id " + sceneId);


    let lightsToNotUpdateUuids;

    if(scene.name==="lvl1") {
        lightsToNotUpdateUuids = lvl1LightsToNotUpdateUuids;
    } else if(scene.name==="lvl1.5") {
        lightsToNotUpdateUuids = lvl15LightsToNotUpdateUuids;
    } else {
        lightsToNotUpdateUuids = lvl2LightsToNotUpdateUuids;
    }
     

    // Array of UUIDs of lights that should not be updated
    const lightsToSkip = ["uuid1", "uuid2", "uuid3"];

    // Filter out lights in the scene that are included in the lightsToSkip array
    const lights = scene.lights.filter(light => !lightsToNotUpdateUuids.includes(light.uuid));

    // Prepare an array of updates for lights
    const updates = lights
    .filter(() => Math.random() < 0.25) // Randomly select ~25% of lights
    .map(light => ({ _id: light._id, hidden: !light.hidden }));

    // Update the selected lights    
    await AmbientLightDocument.updateDocuments(updates, {parent: scene});
      
}
