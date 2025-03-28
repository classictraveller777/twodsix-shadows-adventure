//1st the large tile on exterior platform that shows the section of pyramid stairs that has moved fwd
//2nd the smaller tile overlayed the 1st tile with shadows and corner detail to the entrance to corridor on lvl1

const tileUuids = [
    "Scene.apzucuiBkgiwrbTO.Tile.RnTFFyIxpOyQsxEl",
    "Scene.apzucuiBkgiwrbTO.Tile.cU3JkVnijM5URpiG"
];

for (const tileUuid of tileUuids) {
    console.log(tileUuid);
    const tile = fromUuidSync(tileUuid);
    await tile.update({hidden: !tile.hidden});
    ui.notifications.info(tile.hidden ? "Tile is hidden" : "Tile is visible");
}


