//
// Hit Location Rolls (RQG) v1.8
// by Viriato139ac
//

const macroName = "Hit Location Rolls";
const macroVersion = "1.8";
const macroImage = "icons/sundries/flags/banner-standard-tattered-red.webp";

const myDialogOptions = {
  width: 640,
  resizable: true,
  //height: 800,
  //top: 500,
  //left: 500
};

hitlocationRolls();

function hitlocationRolls() {
  const targets = Array.from(game.user.targets);

  if (targets.length === 0) {
    ui.notifications.error(
      `${game.i18n.localize("RQG.scripts.general.errortarget")}`
    );
    return;
  }

  targets.forEach((myTarget) => {
    const locItems = game.actors
      .get(myTarget.data.actorId)
      .data.items.filter((skill) => skill.type === "hitLocation");

    let locTable = [];
    locItems.forEach((loc) => {
      locTable.push({
        name: loc.name,
        dieFrom: loc.data.data.dieFrom,
        dieTo: loc.data.data.dieTo,
      });
    });
    locTable.sort((a, b) =>
      a.dieTo > b.dieTo ? 1 : b.dieTo > a.dieTo ? -1 : 0
    );

    let baseString = [
      `<form>
      <style type="text/css">
      .tg  {border-collapse:collapse;border-color:#ccc;border-spacing:0;}
      .tg td{background-color:#fff;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:2px 2px;word-break:normal;}
      .tg .tg-bzmm{background-color:#34696d;border-color:#ffffff;font-family:"Courier New", Courier, monospace !important;;text-align:left;vertical-align:middle}
      .tg .tg-d6y8{border-color:#efefef;font-family:"Courier New", Courier, monospace !important;;text-align:left;vertical-align:middle}
      .tg .tg-ly6r{border-color:#efefef;text-align:left;vertical-align:middle}
      .tg .tg-r5a9{background-color:#34696d;border-color:#efefef;color:#ffffff;font-family:"Courier New", Courier, monospace !important;;text-align:left;vertical-align:middle}
      .tg .tg-049l{background-color:#f0f0f0;border-color:#efefef;font-family:"Courier New", Courier, monospace !important;;font-size:12px;text-align:left;vertical-align:middle}  
      </style>
      ${game.i18n.localize("RQG.scripts.hitlocationRolls.baseString")} <span style="font-weight: bold;color: brown">${game.actors.get(myTarget.data.actorId).name}</span>
      <hr>
      <table class="tg">
      <tr>
      <td class="tg-r5a9" colspan="3" style="text-align: left; vertical-align: middle;">${game.i18n.localize("RQG.scripts.hitlocationRolls.hitlocation")}</td>
      <td class="tg-r5a9" colspan="1" style="text-align: center; vertical-align: middle;">${game.i18n.localize("RQG.scripts.hitlocationRolls.from")}</td>
      <td class="tg-r5a9" colspan="1" style="text-align: center; vertical-align: middle;">${game.i18n.localize("RQG.scripts.hitlocationRolls.to")}</td>
      </tr>`,
    ];
    locTable.forEach((a) => {
      baseString.push([
        `
        <tr>
        <td class="tg-d6y8" colspan="3" style="text-align: left; vertical-align: middle;">` + a.name + `</td>
        <td class="tg-d6y8" colspan="1" style="text-align: center; vertical-align: middle;">` + a.dieFrom + `</td>
        <td class="tg-d6y8" colspan="1" style="text-align: center; vertical-align: middle;">` + a.dieTo + `</td>
    </tr>
        `,
      ]);
    });

    const contentForm = baseString.join("") + `
    </table></hr>
    <table class="tg">
    <tr>
      <td class="tg-d6y8" colspan="4" style="text-align: left; vertical-align: middle;">${game.i18n.localize("RQG.scripts.hitlocationRolls.ontheground")}</td>
      <td class="tg-d6y8" colspan="1" style="text-align: center; vertical-align: middle;"><input type="checkbox" id="ontheGround" name="ontheGround"></td>
      </tr>
    </table></form>
    `;
    const contentChat = baseString.join("") + `</table></form>`;

    new Dialog(
      {
        title: `${game.i18n.localize("RQG.scripts.hitlocationRolls.title")}` + ` v` + macroVersion,
        content: contentForm,
        buttons: {
          roll: {
            label: `${game.i18n.localize("RQG.scripts.general.roll")}`,
            callback: async (html) => {
              const ontheGround = html.find("input[name='ontheGround']:checked").length;
              //let ontheGroundtotal = parseInt(ontheGround[0].dataset.result) + parseInt(ontheGround[1].dataset.result);
              const formRoll =
                "1d" + Math.ceil(Math.max(...locTable.map((o) => o.dieTo), 0)/(ontheGround+1));
              // console.log(formRoll)
              let skillRoll = await new Roll(formRoll);
              skillRoll.roll();
              // console.log(skillRoll.result);
              locResult =
                1 *
                locTable.reduce(
                  (a, b) => a + (skillRoll.result > b.dieTo ? 1 : 0),
                  0
                );

              // console.log(locResult);
              // console.log();
              let contentFlavour = `${game.i18n.format(
                "RQG.scripts.hitlocationRolls.contentFlavour",
                {
                  formRoll: formRoll,
                }
              )}`;
              // let contentFlavour = `Rolling ${formRoll} for localization.`;
              let contentString =
              contentChat +
                `${game.i18n.format(
                  "RQG.scripts.hitlocationRolls.contentString",
                  {
                    skillRoll: skillRoll.result,
                    locTable: locTable[locResult].name,
                  }
                )}`;

              // let contentString =
              //   content +
              //   `<hr>Rolled a <span style="font-weight: bold;color: green">${skillRoll.result}</span>, a hit at the <span style="font-weight: bold;color: brown">${locTable[locResult].name}</span>`;
              skillRoll.toMessage({
                user: game.user.id,
                speaker: ChatMessage.getSpeaker(),
                flavor: contentFlavour,
                content: contentString,
              });
            },
          },
          cancel: {
            label: `${game.i18n.localize("RQG.scripts.general.cancel")}`,
            callback: (html) => console.log("Cancelled"),
          },
        },
        default: "roll",
      },
      myDialogOptions
    ).render(true);
  });
}
