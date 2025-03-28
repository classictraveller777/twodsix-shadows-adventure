// Flags set by the core software use the "core" scope. 
// Flags set by game systems or modules should use the canonical name attribute for the module 
// Flags set by an individual world should "world" as the scope.
// name door-tile-locXX ( these are unique across all levels )
// https://foundryvtt.com/api/v12/classes/client.WallDocument.html#setFlag

const {DialogV2} = foundry.applications.api;
const {StringField} = foundry.data.fields;

const uuidInput = new StringField({
  label: "UUID",
  hint: "e.g. open door dialog and copy the UUID",
  required: true,
}).toFormGroup({},{name: "uuid"}).outerHTML;

const keyInput = new StringField({
  label: "key",
  hint: "e.g. doorName",
  required: true,
}).toFormGroup({},{name: "key"}).outerHTML;

const valueInput = new StringField({
  label: "value",
  hint: "e.g. door-loc20. Set the value to blank to delete the flag.",
}).toFormGroup({},{name: "value"}).outerHTML;

const data = await DialogV2.prompt({
  window: {title: "Set Flag"},
  content: uuidInput+keyInput+valueInput, 
  ok: {
    callback: (event, button) => new FormDataExtended(button.form).object
  }
});

console.log("uuid" + data.uuid); 
console.log("key" + data.key); 
console.log("value [" + data.value + "]"); // StingField always returns a string ( empty if no input ? )

const type = fromUuidSync(data.uuid); // can be anything token, wall, tile etc 

if(data.value.trim() === "") {
  await type.unsetFlag("world", data.key); // scope, key
} else {
  await type.setFlag("world", data.key, data.value); // scope, key, value 
}

const keyValue = type.getFlag("world", data.key); 
console.log("key value set to  ", keyValue); // the value set on tile in UI dialog e.g. door-tile-loc20
// TODO if key has been deleted - what is value - returns undefined ?

if(keyValue === undefined) {
  ui.notifications.notify(`uuid: ${data.uuid} flag key ${data.key} deleted`);
} else if (keyValue === data.value){
  ui.notifications.notify(`uuid: ${data.uuid} flag key ${data.key} value set to:${keyValue}`);
} else {
  ui.notifications.notify(`uuid: ${data.uuid} flag key ${data.key} error setting value to:${data.value}`);
}