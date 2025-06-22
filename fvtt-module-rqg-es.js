Hooks.once("init", () => {
  CONFIG.RQG.debug.showActorActiveEffectsTab = true;
  //if (game.settings.get("core", "language") === "es") {
  //	  document.getElementById("logo").src = "/modules/fvtt-module-rqg-es/images/fvtt-rqg-es.webp";
  //}
});

Hooks.once("ready", async function () {

  if (game.user.isGM) {
    let ficherosjs = await foundry.applications.apps.FilePicker.browse(
        "data",
        "/modules/fvtt-module-rqg-es/scripts").then((picker) => picker.files);
    for (var i = 0; i < ficherosjs.length; i++) {
      if (ficherosjs[i].search(/\.js/) > -1)
        updateMacro(ficherosjs[i]);
    }
  }

  /*console.log("language:" + game.settings.get("core", "language"))
  if (game.user.isGM && game.settings.get("core", "language") === "es") {
  document.getElementById("logo").src = "/modules/fvtt-module-rqg-es/images/fvtt-rqg-es.webp";
  }*/

  /* Esto se ha eliminado en la 3.3.0, pero lo dejo porque la macro que asigna rqids para localizaciones todavía usa estos valores */
  if (game.user.isGM && game.settings.get("core", "language") === "es") {
    let hitloc = game.settings.get("rqg", "hitLocations")[
        "hitLocationItemNames"
      ];
    hitloc.push(
      "Cabeza",
      "Abdomen",
      "Pecho",
      "Cuerpo",
      "Cuartos delanteros",
      "Cuartos traseros",
      "Brazo izquierdo",
      "Pierna izquierda",
      "Pata central izquierda",
      "Pata delantera izquierda",
      "Cabeza izquierda",
      "Ala izquierda",
      "Brazo derecho",
      "Pierna derecha",
      "Pata central derecha",
      "Pata delantera derecha",
      "Cabeza derecha",
      "Ala derecha",
      "Cola",
      "Tentáculo 1",
      "Tentáculo 2",
      "Tentáculo 3",
      "Tentáculo 4",
      "Tentáculo 5",
      "Tentáculo 6",
      "Tentáculo 7",
      "Tentáculo 8",
      "Tórax",
      "Tronco");
    let hitlocunique = hitloc.filter(onlyUnique);
    let hitlocuniquearray = {
      hitLocationItemNames: hitlocunique
    };
    game.settings.set("rqg", "hitLocations", hitlocuniquearray);
  }
});

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

function updateMacro(macroFile) {
  fetch(macroFile)
  .then((res) => res.text())
  .then((content) => {
    let macroContents = content.split(`\n`);
    let versionLine = -1;
    for (var i = 0; i < macroContents.length; i++) {
      if (macroContents[i].search(/macroVersion/) > -1) {
        versionLine = i;
        break;
      }
    }
    let macroVersion = parseFloat(
        macroContents[versionLine]
        .split("=")[1]
        .replace(/\;/g, "")
        .replace(/\"/g, ""));
    let nameLine = -1;
    for (var i = 0; i < macroContents.length; i++) {
      if (macroContents[i].search(/macroName/) > -1) {
        nameLine = i;
        break;
      }
    }
    let macroName = macroContents[nameLine]
      .split("=")[1]
      .replace(/\;/g, "")
      .replace(/\"/g, "")
      .trim();
    let imageLine = -1;
    for (var i = 0; i < macroContents.length; i++) {
      if (macroContents[i].search(/macroImage/) > -1) {
        imageLine = i;
        break;
      }
    }
    let macroImage = macroContents[imageLine]
      .split("=")[1]
      .replace(/\;/g, "")
      .replace(/\"/g, "")
      .trim();

    let instMacro = game.macros.getName(macroName);
    let instVersion = instMacro ? parseFloat(instMacro.flags.version.value) : 0;
    console.log("Analizando: " + macroFile + ", Version macro: " + macroVersion + ", Version inst: " + instVersion);

    if (instMacro) {
      if (instVersion === undefined ||
        macroVersion === undefined ||
        instVersion < macroVersion) {
        console.log(
          "Macro: " +
          macroName +
          ", Versión: " +
          macroVersion +
          ", Instalada: ",
          instVersion,
          " --- Actualizamos macro actual");

        instMacro.update({
          name: macroName,
          type: "script",
          img: macroImage,
          command: content,
          flags: {
            'version.value': macroVersion
          },
        });
      } else {
        console.log(
          "Macro: " +
          macroName +
          ", Versión: " +
          macroVersion +
          ", Instalada: ",
          instVersion,
          " --- No hacemos nada");
      }
    } else {
      console.log(
        "Macro: " +
        macroName +
        ", Versión: " +
        macroVersion +
        ", Instalada: ",
        instVersion,
        " --- Creamos macro");

      Macro.create({
        name: macroName,
        type: "script",
        img: macroImage,
        command: content,
        flags: {
          'version.value': macroVersion
        },
      });
    }

  });
}
