//
// Resistance Table (RQG) v1.8
// by Viriato139ac
// thanks to Freeze#2689 for the conditional selection code

const macroName = "Resistance Table";
const macroVersion = "1.8";
const macroImage = "icons/skills/social/diplomacy-handshake-yellow.webp";

function nivelexito(diceResult, skillLevel) {
  let uc = Math.max(1, Math.round(skillLevel / 20));
  let us = Math.max(1, Math.round(skillLevel / 5));
  let uf = 95 + Math.min(4, Math.max(0, Math.ceil((skillLevel - 10) / 20)));
  let ue = Math.min(skillLevel, uf);
  let niveles = [uc, us, ue, uf];
  //console.log(niveles);
  let levelResult =
    4 - niveles.reduce((a, b) => a + (diceResult <= b ? 1 : 0), 0);
  //console.log(levelResult);
  return levelResult;
}

const lvlColours = ["goldenrod", "blue", "green", "red", "darkred"];
// const lvlNames = ["Critical", "Special", "Success", "Failure", "Fumble"];
const lvlNames = [
  `${game.i18n.localize("RQG.Game.AbilityResultEnum.0")}`,
  `${game.i18n.localize("RQG.Game.AbilityResultEnum.1")}`,
  `${game.i18n.localize("RQG.Game.AbilityResultEnum.2")}`,
  `${game.i18n.localize("RQG.Game.AbilityResultEnum.3")}`,
  `${game.i18n.localize("RQG.Game.AbilityResultEnum.4")}`,
];
const characteristics = {
  strength: `${game.i18n.localize("RQG.Actor.Characteristics.strength-full")}`,
  constitution: `${game.i18n.localize(
    "RQG.Actor.Characteristics.constitution-full"
  )}`,
  size: `${game.i18n.localize("RQG.Actor.Characteristics.size-full")}`,
  dexterity: `${game.i18n.localize(
    "RQG.Actor.Characteristics.dexterity-full"
  )}`,
  intelligence: `${game.i18n.localize(
    "RQG.Actor.Characteristics.intelligence-full"
  )}`,
  power: `${game.i18n.localize("RQG.Actor.Characteristics.power-full")}`,
  charisma: `${game.i18n.localize("RQG.Actor.Characteristics.charisma-full")}`,
};
const myDialogOptions = {
  width: 640,
  resizable: true,
  //height: 800,
  //top: 500,
  //left: 500
};

resistanceTable();

function resistanceTable() {
  if (canvas.tokens.controlled.length === 0) {
    ui.notifications.error(
      `${game.i18n.localize("RQG.scripts.general.errortarget")}`
    );
    return;
  }

  // const charOptions = Object.getOwnPropertyNames(
  //   token.actor.system.characteristics
  // ).reduce((a, b) => (a += `<option value="${b}">${b}</option>`), ``);
  const charOptions = Object.getOwnPropertyNames(
    token.actor.system.characteristics
  ).reduce(
    (a, b) =>
      (a += `<option value="${b}">` + characteristics[`${b}`] + `</option>`),
    ``
  );

  const content = `
  <form>
  <style type="text/css">
  .tg  {border-collapse:collapse;border-color:#ccc;border-spacing:0;}
  .tg td{background-color:#fff;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:2px 2px;word-break:normal;}
  .tg .tg-bzmm{background-color:#34696d;border-color:#ffffff;font-family:"Courier New", Courier, monospace !important;;text-align:left;vertical-align:middle}
  .tg .tg-d6y8{border-color:#efefef;font-family:"Courier New", Courier, monospace !important;;text-align:left;vertical-align:middle}
  .tg .tg-ly6r{border-color:#efefef;text-align:left;vertical-align:middle}
  .tg .tg-r5a9{background-color:#34696d;border-color:#efefef;color:#ffffff;font-family:"Courier New", Courier, monospace !important;;text-align:left;vertical-align:middle}
  .tg .tg-049l{background-color:#f0f0f0;border-color:#efefef;font-family:"Courier New", Courier, monospace !important;;font-size:12px;text-align:left;vertical-align:middle}  
  </style>
  <table class="tg">
  <tr>
  <td class="tg-r5a9" colspan="3">${game.i18n.localize(
    "RQG.scripts.general.characteristic"
  )}</td>
  <td class="tg-r5a9" colspan="1">${game.i18n.localize("RQG.scripts.general.value")}</td>
  <td class="tg-r5a9" colspan="1">${game.i18n.localize(
    "RQG.scripts.resistanceTable.target"
  )}</td>
  <td class="tg-r5a9" colspan="1">${game.i18n.localize("RQG.scripts.general.modifier")}</td>
  </tr>
  <tr>
  <td class="tg-d6y8" colspan="3" style="font-weight: bold;"><select name="charNam">${charOptions}</select></td>
  <td class="tg-d6y8" colspan="1"><input type="number" id="charVal" name="charVal" value=0></td>
  <td class="tg-d6y8" colspan="1"><input type="number" id="charTar" name="charTar" value=10></td>
  <td class="tg-d6y8" colspan="1"><input type="number" id="charMod" name="charMod" value=0></td>
  </tr>
  </table>
  </form>`;

  new Dialog(
    {
      title: `${game.i18n.localize("RQG.scripts.resistanceTable.title")}` + ` v` + macroVersion,
      content,
      buttons: {
        play: {
          label: `${game.i18n.localize("RQG.scripts.general.roll")}`,
          callback: async (html) => {
            const charNam = html.find(`[name="charNam"]`).val();
            const charVal = html.find(`[name="charVal"]`).val();
            const charMod = html.find(`[name="charMod"]`).val();
            const charTar = html.find(`[name="charTar"]`).val();

            let charValue = Math.max(
              1,
              50 + (charVal * 1 - charTar * 1) * 5 + charMod * 1
            );
            let charRoll = new Roll("1d100");
            //charRoll.roll();
			await charRoll.evaluate();
            let charResult = nivelexito(charRoll.result, charValue);

            console.log(
              "char: Rolled " +
                charRoll.result +
                " on " +
                charValue +
                " Result: " +
                lvlNames[charResult]
            );

            let charLabel =
              `<span style="font-weight: bold; color:` +
              lvlColours[charResult] +
              `;">` +
              lvlNames[charResult] +
              `</span>`;

            let flavourString = `${game.i18n.format(
              "RQG.scripts.resistanceTable.flavourString",
              {
                charNam: characteristics[`${charNam}`],
                charVal: charVal,
                charTar: charTar,
                charRoll: charRoll.result,
                charValue: charValue,
                charLabel: charLabel,
              }
            )}`;
            // let flavourString = `Rolling <span style="font-weight: bold;color: brown">${charNam} (${charVal})</span> against a target number of <span style="font-weight: bold;color: brown">${charTar}</span>. Rolled ${charRoll.result}% on a modified probability of ${charValue}%, a ${charLabel}`;
            let contentString = `<table>
            <tr>
                <th>${game.i18n.localize("RQG.scripts.general.value")}</th>
                <th>${game.i18n.localize(
                  "RQG.scripts.resistanceTable.target"
                )}</th>
                <th>${game.i18n.localize("RQG.scripts.general.mod")}</th>
                <th>${game.i18n.localize("RQG.scripts.general.rollp")}</th>
                <th>${game.i18n.localize("RQG.scripts.general.result")}</th> 
            </tr>
            <tr>
            <td style="text-align: center; vertical-align: middle;">${charVal}</td>
            <td style="text-align: center; vertical-align: middle;">${charTar}</td>
            <td style="text-align: center; vertical-align: middle;">${charMod}</td>
            <td style="text-align: center; vertical-align: middle; font-weight: bold;">${
              charRoll.result
            } (${charValue})</td>
            <td style="text-align: center; vertical-align: middle; font-weight: bold;">${charLabel}</td>
            </tr>
            </table>`;

            charRoll.toMessage({
              user: game.user.id,
              speaker: ChatMessage.getSpeaker(),
              //flavor: `Augmenting ${skillName} (${skillBase}%) with ${augName} (${augBase}%). Rolled ${skillRoll.result}% on a modified skill of ${skillValue}%, a ${lvlNames[skillResult]}`,
              flavor: flavourString,
              content: contentString,
            });
          },
        },
        cancel: {
          label: `${game.i18n.localize("RQG.scripts.general.cancel")}`,
          callback: (html) => console.log("Cancelled"),
        },
      },
      default: "one",
    },
    myDialogOptions
  ).render(true);
}

await new Promise((resolve) => setTimeout(resolve, 250));
$(document).ready(function () {
  const firstcharOptions =
    token.actor.system.characteristics[$("select[name=charNam]")[0].value]
      .value;
  console.log(
    "R: " + $("select[name=charNam]")[0].value + ": " + firstcharOptions
  );
  $("input[name=charVal]").val(firstcharOptions);
  $("select[name=charNam]").change(function () {
    const newcharOptions =
      token.actor.system.characteristics[$("select[name=charNam]")[0].value]
        .value;
    console.log(
      "C: " + $("select[name=charNam]")[0].value + ": " + newcharOptions
    );
    $("input[name=charVal]").val(newcharOptions);
  });
});
