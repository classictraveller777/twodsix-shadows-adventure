//https://foundryvtt.com/api/v12/classes/client.DetectionModeLightPerception.html


//let tokens = game.canvas.tokens.controlled;
//let tokens = game.canvas.scene.tokens;

//const 
// tokens=canvas.scene.tokens.filter(i=>i.actor.hasPlayerOwner) // not using this as it does not take into account tokens which are players but not owned by a player i.e. the GM runs these as NPC's


// there are no significant NPC's and only monsters so this filer is ok
// in the context of this adventure
const tokens=canvas.scene.tokens.filter(token=>token.actorLink===true)

console.log(tokens);
console.log("tokens.length" + tokens.length);

tokens.forEach(token => {
    console.log(token)
    console.log("token.name " + token.name);
    console.log("token.actorLink " + token.actorLink);
    console.log("token.actorLink " + token.detectionModes[0].range); // works  now how to update it ? 
    console.log("token.dm " + token.detectionModes);
    detectionModes = token.detectionModes;
    console.log("detectionModes" + detectionModes);

    detectionModes.forEach(function (item, index) {
      console.log(item, index);
    });

    const modifiedDetectionModes = detectionModes.map(obj => { 
      if (obj.id === "lightPerception") {
          return { ...obj, range: null };
      }
      return obj;
    });
    console.log(modifiedDetectionModes);
    await token.document.update({"detectionModes":modifiedDetectionModes})
    //By default tokens have light perception with an infinite range if light perception isn't explicitely configured.
    
  

    let change = {"img":"icons/svg/blood.svg"} // Construct our update object
    await token.document.update(change) // call the update to actually change stuff

    /*
    let tokenName = token.name
    if(tokenName == 'navy-player1') {
      ui.notifications.notify(tokenName + " locked");
      token.document.update({
        locked: true 
      });
    }*/
});

// how do you go from the tokenDoc to the actor ? 


// note you can reference the actor 
let wantedActor=game.actors.getName("navy-player1")
//console.log(wantedActor)
let monsterActor=game.actors.getName("chaser")
//console.log(monsterActor)



// https://foundryvtt.com/api/v12/interfaces/foundry.types.TokenData.html
// https://foundryvtt.com/api/v12/interfaces/foundry.types.ActorData.html