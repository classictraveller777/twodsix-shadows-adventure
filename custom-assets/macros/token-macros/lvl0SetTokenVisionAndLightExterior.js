//https://foundryvtt.com/api/v12/classes/client.DetectionModeLightPerception.html


//let tokens = game.canvas.tokens.controlled;
//let tokens = game.canvas.scene.tokens;

//const 
// tokens=canvas.scene.tokens.filter(i=>i.actor.hasPlayerOwner) // not using this as it does not take into account tokens which are players but not owned by a player i.e. the GM runs these as NPC's


// there are no significant NPC's and only monsters so this filer is ok
// in the context of this adventure
const tokens=canvas.scene.tokens.filter(token=>token.actorLink===true)

// TODO filter scene to lvl0 and run it only on tokens on that level 
// otherwise will have a problem if tokens on lvl1.5 and only some teleport to lvl0 if macro runs as part of a tile trigger it will detect player 
// tokens on lvl1.5

const scene = game.scenes.filter(scene => scene.name==="lvl0");
const tokens=canvas.scene.tokens.filter(token=>token.actorLink===true)

console.log(tokens);
console.log("tokens.length" + tokens.length);

tokens.forEach(token => {
    console.log(token)
    console.log("token.name " + token.name);
    console.log("token.actorLink " + token.actorLink);
        
    detectionModes = token.detectionModes;
    console.log("detectionModes" + detectionModes);

    detectionModes.forEach(function (item, index) {
      console.log(item, index);
    });

    const modifiedDetectionModes = detectionModes.map(obj => { 
      if (obj.id === "lightPerception") {
          return { ...obj, range: null }; // null corresponds to infinity
      }
      return obj;
    });
    console.log(modifiedDetectionModes);
    token.update({"detectionModes":modifiedDetectionModes})
    //By default tokens have light perception with an infinite range if light perception isn't explicitely configured.
          
});

