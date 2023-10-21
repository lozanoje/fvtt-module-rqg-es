//
// Augmenting Abilities (RQG) v1.8
// by Viriato139ac
// thanks to Freeze#2689 for the conditional selection code
//

const macroName = "Augmenting Abilities";
const macroVersion = "1.8";
const macroImage = "icons/skills/social/diplomacy-peace-alliance.webp";

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

const augChances = [50, 30, 20, -20, -50];
const lvlColours = ["goldenrod", "blue", "green", "red", "darkred"];
//const lvlNames = ["Critical", "Special", "Success", "Failure", "Fumble"];
const lvlNames = [
  `${game.i18n.localize("RQG.Game.ResultEnum.2")}`,
  `${game.i18n.localize("RQG.Game.ResultEnum.3")}`,
  `${game.i18n.localize("RQG.Game.ResultEnum.4")}`,
  `${game.i18n.localize("RQG.Game.ResultEnum.5")}`,
  `${game.i18n.localize("RQG.Game.ResultEnum.6")}`,
];

const typeArray = [
  { name: "rune", desc: `${game.i18n.localize("TYPES.Item.rune")}` },
  { name: "skill", desc: `${game.i18n.localize("TYPES.Item.skill")}` },
  { name: "passion", desc: `${game.i18n.localize("TYPES.Item.passion")}` },
];
const typeOptions = typeArray.reduce(
  (a, b) => (a += `<option value="${b.name}">${b.desc}</option>`),
  ``
);

const myDialogOptions = {
  width: 640,
  resizable: true,
  //height: 800,
  //top: 500,
  //left: 500
};

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
  <td class="tg-r5a9" colspan="2">${game.i18n.localize("RQG.scripts.general.select")}</td>
  <td class="tg-r5a9" colspan="2">${game.i18n.localize("RQG.scripts.general.type")}</td>
  <td class="tg-r5a9" colspan="5">${game.i18n.localize("RQG.scripts.general.ability")}</td>
  <td class="tg-r5a9" colspan="1">${game.i18n.localize("RQG.scripts.general.modifier")}</td>
  </tr>
  <tr>
  <td class="tg-d6y8" colspan="2" style="font-weight: bold;">${game.i18n.localize("RQG.scripts.augmentingAbilities.augmenting")}:</td>
  <td class="tg-d6y8" colspan="2" style="font-weight: bold;"><select name="augType">${typeOptions}</select></td>
  <td class="tg-d6y8" colspan="5"><select name="augName"></select></td>
  <td class="tg-d6y8" colspan="1"><input type="number" id="augMod" name="augMod" value=0></td>
  </tr>
  <tr>
  <td class="tg-d6y8" colspan="2" style="font-weight: bold;">${game.i18n.localize("RQG.scripts.augmentingAbilities.augmented")}:</td>
  <td class="tg-d6y8" colspan="2" style="font-weight: bold;"><select name="skillType">${typeOptions}</select></td>
  <td class="tg-d6y8" colspan="5"><select name="skillName"></select></td>
  <td class="tg-d6y8" colspan="1"><input type="number" id="skillMod" name="skillMod" value=0></td>
  </tr>
  </table>
  </form>`;

augmentingAbilities();

function augmentingAbilities() {
  if (canvas.tokens.controlled.length === 0) {
    ui.notifications.error(
      `${game.i18n.localize("RQG.scripts.general.errorselect")}`
    );
    return;
  }

  new Dialog(
    {
      title: `${game.i18n.localize("RQG.scripts.augmentingAbilities.title")}` + ` v` + macroVersion,
      content,
      buttons: {
        roll: {
          label: `${game.i18n.localize("RQG.scripts.general.roll")}`,
          callback: async (html) => {
            const augName = html.find(`[name="augName"]`).val();
            const augToRoll = canvas.tokens.controlled[0].actor.items.find((i) => i.name === augName);
            const augMod = html.find(`[name="augMod"]`).val();
            let augBase;
            augToRoll.data.type === "skill"
              ? (augBase =
                  augToRoll.data.data.baseChance +
                  augToRoll.data.data.gainedChance +
                  canvas.tokens.controlled[0].actor.data.data.skillCategoryModifiers[
                    augToRoll.data.data.category
                  ])
              : (augBase = augToRoll.data.data.chance);
            let augValue = Math.max(1, augBase * 1 + augMod * 1);
            console.log(augBase);
            let augRoll = new Roll("1d100");
            augRoll.roll();
            let augResult = nivelexito(augRoll.result, augValue);
            console.log(
              "Aug: Rolled " +
                augRoll.result +
                " on " +
                augValue +
                " Result: " +
                lvlNames[augResult] +
                ": " +
                augChances[augResult]
            );

            const skillName = html.find(`[name="skillName"]`).val();
            const skillToRoll = canvas.tokens.controlled[0].actor.items.find(
              (i) => i.name === skillName
            );
            const skillMod = html.find(`[name="skillMod"]`).val();

            let skillBase;
            skillToRoll.data.type === "skill"
              ? (skillBase =
                  skillToRoll.data.data.baseChance +
                  skillToRoll.data.data.gainedChance +
                  canvas.tokens.controlled[0].actor.data.data.skillCategoryModifiers[
                    skillToRoll.data.data.category
                  ])
              : (skillBase = skillToRoll.data.data.chance);
            let skillValue = Math.max(
              1,
              skillBase * 1 + augChances[augResult] * 1 + skillMod * 1
            );
            let skillRoll = new Roll("1d100");
            skillRoll.roll();
            let skillResult = nivelexito(skillRoll.result, skillValue);
            console.log(
              "Ski: Rolled " +
                skillRoll.result +
                " on " +
                skillValue +
                " Result: " +
                lvlNames[skillResult]
            );

            //let augLabel = `<span style="font-weight: bold; color:` + lvlColours[augResult] + `;">` + lvlNames[augResult] + ` (` + augChances[augResult] + `)</span>`;
            let augLabel =
              `<span style="font-weight: bold; color:` +
              lvlColours[augResult] +
              `;">` +
              lvlNames[augResult] +
              `</span>`;
            let skillLabel =
              `<span style="font-weight: bold; color:` +
              lvlColours[skillResult] +
              `;">` +
              lvlNames[skillResult] +
              `</span>`;

            let augFlavour = `${game.i18n.format(
              "RQG.scripts.augmentingAbilities.augFlavour",
              {
                augName: augName,
                augBase: augBase,
                augRoll: augRoll.result,
                augValue: augValue,
                augLabel: augLabel,
              }
            )}`;
            //let augFlavour = `Using <span style="font-weight: bold;color: brown">${augName} (${augBase}%)</span> for augmentation. Rolled ${augRoll.result}% on a modified skill of ${augValue}%, a ${augLabel}`;
            let augString = `<table>
            <tr>
                <th></th>
                <th>${game.i18n.localize(
                  "RQG.scripts.general.base"
                )}</th>
                <th>${game.i18n.localize("RQG.scripts.general.mod")}</th>
                <th>${game.i18n.localize("RQG.scripts.general.rollp")}</th>
                <th>${game.i18n.localize("RQG.scripts.general.result")}</th> 
            </tr>
            <tr>
            <td style="font-weight: bold;">${game.i18n.localize(
              "RQG.scripts.augmentingAbilities.augmenting"
            )}</td>
            <td style="text-align: center; vertical-align: middle;">${augBase}</td>
            <td style="text-align: center; vertical-align: middle;">${augMod}</td>
            <td style="text-align: center; vertical-align: middle; font-weight: bold;">${
              augRoll.result
            } (${augValue})</td>
            <td style="text-align: center; vertical-align: middle; font-weight: bold;">${augLabel}</td>
            </tr>
            </table>`;
            augRoll.toMessage({
              user: game.user.id,
              speaker: ChatMessage.getSpeaker(),
              //flavor: `Augmenting ${skillName} (${skillBase}%) with ${augName} (${augBase}%). Rolled ${skillRoll.result}% on a modified skill of ${skillValue}%, a ${lvlNames[skillResult]}`,
              flavor: augFlavour,
              content: augString,
            });

            let skillFlavour = `${game.i18n.format(
              "RQG.scripts.augmentingAbilities.skillFlavour",
              {
                skillName: skillName,
                skillBase: skillBase,
                augName: augName,
                skillRoll: skillRoll.result,
                skillValue: skillValue,
                skillLabel: skillLabel,
              }
            )}`;
            //let skillFlavour = `Rolling <span style="font-weight: bold;color: brown">${skillName} (${skillBase}%)</span> augmented with ${augName}. Rolled ${skillRoll.result}% on a modified skill of ${skillValue}%, a ${skillLabel}`;
            let skillString = `<table>
            <tr>
                <th></th>
                <th>${game.i18n.localize(
                  "RQG.scripts.general.base"
                )}</th>
                <th>${game.i18n.localize("RQG.scripts.general.mod")}</th>
                <th>${game.i18n.localize(
                  "RQG.scripts.augmentingAbilities.aug"
                )}</th>
                <th>${game.i18n.localize("RQG.scripts.general.rollp")}</th>
                <th>${game.i18n.localize("RQG.scripts.general.result")}</th> 
            </tr>
            <tr>
            <td style="font-weight: bold;">${game.i18n.localize(
              "RQG.scripts.general.ability"
            )}</td>
            <td style="text-align: center; vertical-align: middle;">${skillBase}</td>
            <td style="text-align: center; vertical-align: middle;">${skillMod}</td>
            <td style="text-align: center; vertical-align: middle;">${
              augChances[augResult]
            }</td>
            <td style="text-align: center; vertical-align: middle; font-weight: bold;">${
              skillRoll.result
            } (${skillValue})</td>
            <td style="text-align: center; vertical-align: middle; font-weight: bold;">${skillLabel}</td>
            </tr>
            </table>`;

            skillRoll.toMessage({
              user: game.user.id,
              speaker: ChatMessage.getSpeaker(),
              //flavor: `Augmenting ${skillName} (${skillBase}%) with ${augName} (${augBase}%). Rolled ${skillRoll.result}% on a modified skill of ${skillValue}%, a ${lvlNames[skillResult]}`,
              flavor: skillFlavour,
              content: skillString,
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
}

await new Promise((resolve) => setTimeout(resolve, 250));
$(document).ready(function () {
  const firstaugOptions = canvas.tokens.controlled[0].actor.items
    .filter((skill) => skill.type === $("select[name=augType]")[0].value)
    .reduce(
      (acc, e) => (acc += `<option value="${e.name}">${e.name}</option>`),
      ``
    );
  $("select[name=augName]").append(firstaugOptions);
  $("select[name=augType]").change(function () {
    const newaugOptions = canvas.tokens.controlled[0].actor.items
      .filter((skill) => skill.type === $("select[name=augType]")[0].value)
      .reduce(
        (acc, e) => (acc += `<option value="${e.name}">${e.name}</option>`),
        ``
      );
    $("select[name=augName]").empty();
    $("select[name=augName]").append(newaugOptions);
  });
  const firstskillOptions = canvas.tokens.controlled[0].actor.items
    .filter((skill) => skill.type === $("select[name=skillType]")[0].value)
    .reduce(
      (acc, e) => (acc += `<option value="${e.name}">${e.name}</option>`),
      ``
    );
  $("select[name=skillName]").append(firstskillOptions);
  $("select[name=skillType]").change(function () {
    const newskillOptions = canvas.tokens.controlled[0].actor.items
      .filter((skill) => skill.type === $("select[name=skillType]")[0].value)
      .reduce(
        (acc, e) => (acc += `<option value="${e.name}">${e.name}</option>`),
        ``
      );
    $("select[name=skillName]").empty();
    $("select[name=skillName]").append(newskillOptions);
  });
});
