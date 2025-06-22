//
// Opposed Rolls (RQG) v2.2
// by Viriato139ac
// thanks to Freeze#2689 for the conditional selection code
//

const macroName = "Opposed Rolls";
const macroVersion = "2.2";
const macroImage = "icons/commodities/treasure/puzzle-box-glowing-blue.webp";

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

// const typeArray = [{ name: "rune" }, { name: "skill" }, { name: "passion" }];
// const typeOptions = typeArray.reduce(
//   (a, b) => (a += `<option value="${b.name}">${b.name}</option>`),
//   ``
// );

const typeArray = [
  { name: "rune", desc: `${game.i18n.localize("TYPES.Item.rune")}` },
  { name: "skill", desc: `${game.i18n.localize("TYPES.Item.skill")}` },
  { name: "passion", desc: `${game.i18n.localize("TYPES.Item.passion")}` },
];
const typeOptions = typeArray.reduce(
  (a, b) => (a += `<option value="${b.name}">${b.desc}</option>`),
  ``
);

const activeOptions = Array.from(canvas.tokens.controlled).reduce(
  (a, b) => (a += `<option value="${game.actors.get(b.document.actorId).name}">${game.actors.get(b.document.actorId).name}</option>`),
  ``
);

const pasiveOptions = Array.from(game.user.targets).reduce(
  (a, b) => (a += `<option value="${game.actors.get(b.document.actorId).name}">${game.actors.get(b.document.actorId).name}</option>`),
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
  <td class="tg-r5a9" colspan="2">${game.i18n.localize("RQG.scripts.general.actor")}</td>
  <td class="tg-r5a9" colspan="2">${game.i18n.localize("RQG.scripts.general.type")}</td>
  <td class="tg-r5a9" colspan="5">${game.i18n.localize("RQG.scripts.general.ability")}</td>
  <td class="tg-r5a9" colspan="1">${game.i18n.localize("RQG.scripts.general.modifier")}</td>
  </tr>
  <tr>
  <td class="tg-d6y8" colspan="2" style="font-weight: bold;">${game.i18n.localize(
    "RQG.scripts.opposedRolls.active"
  )}:</td>
  <td class="tg-d6y8" colspan="2" style="font-weight: bold;"><select name="activeActor">${activeOptions}</select></td>
  <td class="tg-d6y8" colspan="2" style="font-weight: bold;"><select name="activeType">${typeOptions}</select></td>
  <td class="tg-d6y8" colspan="5"><select name="activeName"></select></td>
  <td class="tg-d6y8" colspan="1"><input type="number" id="activeMod" name="activeMod" value=0></td>
  </tr>
  <tr>
  <td class="tg-d6y8" colspan="2" style="font-weight: bold;">${game.i18n.localize(
    "RQG.scripts.opposedRolls.pasive"
  )}:</td>
  <td class="tg-d6y8" colspan="2" style="font-weight: bold;"><select name="pasiveActor">${pasiveOptions}</select></td>
  <td class="tg-d6y8" colspan="2" style="font-weight: bold;"><select name="pasiveType">${typeOptions}</select></td>
  <td class="tg-d6y8" colspan="5"><select name="pasiveName"></select></td>
  <td class="tg-d6y8" colspan="1"><input type="number" id="pasiveMod" name="pasiveMod" value=0></td>
  </tr>
  </table>
  </form>`;

opposedRolls();

function opposedRolls() {
  // let noactors = 0;
  // for (var a of game.actors) noactors++;
  // if (noactors < 1) {
  //   ui.notifications.error(`${game.i18n.localize("RQG.scripts.general.erroractor")}`);
  //   return;
  // }
  if (canvas.tokens.controlled.length === 0) {
    ui.notifications.error(
      `${game.i18n.localize("RQG.scripts.general.errorselect")}`
    );
    return;
  }
  const targets = Array.from(game.user.targets);
  if (targets.length === 0) {
    ui.notifications.error(
      `${game.i18n.localize("RQG.scripts.general.errortarget")}`
    );
    return;
  }

  new Dialog(
    {
      title: `${game.i18n.localize("RQG.scripts.opposedRolls.title")}` + ` v` + macroVersion,
      content,
      buttons: {
        roll: {
          label: `${game.i18n.localize("RQG.scripts.general.roll")}`,
          callback: async (html) => {
            const activeName = html.find(`[name="activeName"]`).val();
            const activeActor = html.find(`[name="activeActor"]`).val();
            const activeToRoll = game.actors
              .getName(activeActor)
              .items.find((i) => i.name === activeName);
            const activeMod = html.find(`[name="activeMod"]`).val();

            let activeBase;
            activeToRoll.type === "skill"
              ? (activeBase =
									activeToRoll.system.baseChance +
                  activeToRoll.system.gainedChance +
                  game.actors.getName(activeActor).system
                    .skillCategoryModifiers[activeToRoll.system.category])
              : (activeBase = activeToRoll.system.chance);
            let activeValue = Math.max(1, activeBase * 1 + activeMod * 1);

            const pasiveName = html.find(`[name="pasiveName"]`).val();
            const pasiveActor = html.find(`[name="pasiveActor"]`).val();
            const pasiveToRoll = game.actors
              .getName(pasiveActor)
              .items.find((i) => i.name === pasiveName);
            const pasiveMod = html.find(`[name="pasiveMod"]`).val();

            let pasiveBase;
            pasiveToRoll.type === "skill"
              ? (pasiveBase =
									pasiveToRoll.system.baseChance +
                  pasiveToRoll.system.gainedChance +
                  game.actors.getName(pasiveActor).system
                    .skillCategoryModifiers[pasiveToRoll.system.category])
              : (pasiveBase = pasiveToRoll.system.chance);
            let pasiveValue = Math.max(1, pasiveBase * 1 + pasiveMod * 1);

            let skill100mod = Math.max(activeValue-100, pasiveValue-100,0)
            let activeValueMod = Math.max(1, activeValue - skill100mod);
            let pasiveValueMod = Math.max(1, pasiveValue - skill100mod);
            console.log(activeValueMod);
            console.log(pasiveValueMod);

            let activeRoll = new Roll("1d100");
            //activeRoll.roll();
			await activeRoll.evaluate();
            let activeResult = nivelexito(activeRoll.result, activeValueMod);
            console.log(
              "active: Rolled " +
                activeRoll.result +
                " on " +
                activeValueMod +
                " Result: " +
                lvlNames[activeResult]
            );

            let pasiveRoll = new Roll("1d100");
            //pasiveRoll.roll();
			await pasiveRoll.evaluate();
            let pasiveResult = nivelexito(pasiveRoll.result, pasiveValueMod);
            console.log(
              "pasive: Rolled " +
                pasiveRoll.result +
                " on " +
                pasiveValueMod +
                " Result: " +
                lvlNames[pasiveResult]
            );

            let activeLabel =
              `<span style="font-weight: bold; color:` +
              lvlColours[activeResult] +
              `;">` +
              lvlNames[activeResult] +
              `</span>`;
            let pasiveLabel =
              `<span style="font-weight: bold; color:` +
              lvlColours[pasiveResult] +
              `;">` +
              lvlNames[pasiveResult] +
              `</span>`;

            let activefinalLabel;
            let pasivefinalLabel;
            if (activeResult < 3 && activeResult < pasiveResult) {
              activefinalLabel = `<span style="font-weight: bold; color:green;">${game.i18n.format(
                "RQG.scripts.opposedRolls.winner"
              )}</span>`;
              pasivefinalLabel = `<span style="font-weight: bold; color:darkred;">${game.i18n.format(
                "RQG.scripts.opposedRolls.loser"
              )}</span>`;
            } else if (pasiveResult < 3 && pasiveResult < activeResult) {
              pasivefinalLabel = `<span style="font-weight: bold; color:green;">${game.i18n.format(
                "RQG.scripts.opposedRolls.winner"
              )}</span>`;
              activefinalLabel = `<span style="font-weight: bold; color:darkred;">${game.i18n.format(
                "RQG.scripts.opposedRolls.loser"
              )}</span>`;
            } else if (activeResult >= 3 && pasiveResult >= 3) {
              pasivefinalLabel = `<span style="font-weight: bold; color:orange;">${game.i18n.format(
                "RQG.scripts.opposedRolls.tie"
              )}</span>`;
              activefinalLabel = `<span style="font-weight: bold; color:orange;">${game.i18n.format(
                "RQG.scripts.opposedRolls.tie"
              )}</span>`;
            } else if (activeResult === pasiveResult) {
              if (activeRoll.result < pasiveRoll.result) {
                pasivefinalLabel = `<span style="font-weight: bold; color:green;">${game.i18n.format(
                  "RQG.scripts.opposedRolls.winner"
                )}</span>`;
                activefinalLabel = `<span style="font-weight: bold; color:darkred;">${game.i18n.format(
                  "RQG.scripts.opposedRolls.loser"
                )}</span>`;
              } else if (activeRoll.result > pasiveRoll.result) {
                activefinalLabel = `<span style="font-weight: bold; color:green;">${game.i18n.format(
                  "RQG.scripts.opposedRolls.winner"
                )}</span>`;
                pasivefinalLabel = `<span style="font-weight: bold; color:darkred;">${game.i18n.format(
                  "RQG.scripts.opposedRolls.loser"
                )}</span>`;
              } else {
                pasivefinalLabel = `<span style="font-weight: bold; color:orange;">${game.i18n.format(
                  "RQG.scripts.opposedRolls.tie"
                )}</span>`;
                activefinalLabel = `<span style="font-weight: bold; color:orange;">${game.i18n.format(
                  "RQG.scripts.opposedRolls.tie"
                )}</span>`;
              }
            } else {
              pasivefinalLabel = `<span style="font-weight: bold; color:blue;">ERROR</span>`;
              activefinalLabel = `<span style="font-weight: bold; color:blue;">ERROR</span>`;
            }
            let activeFlavour = `${game.i18n.format(
              "RQG.scripts.opposedRolls.activeFlavour",
              {
                activeName: activeName,
                activeBase: activeBase,
                pasiveName: pasiveName,
                pasiveBase: pasiveBase,
              }
            )}`;
            // let activeFlavour = `Opposed test, active ability: <span style="font-weight: bold;color: brown">${activeName} (${activeBase}%)</span> versus pasive ability <span style="font-weight: bold;color: brown">${pasiveName} (${pasiveBase}%)</span>`;
            let activeString = `<table>
            <tr>
                <th>${game.i18n.localize("RQG.scripts.general.actor")}</th>
                <th>${game.i18n.localize("RQG.scripts.general.base")}</th>
                <th>${game.i18n.localize("RQG.scripts.general.mod")}</th>
                <th>${game.i18n.localize("RQG.scripts.general.rollp")}</th>
                <th>${game.i18n.localize("RQG.scripts.general.result")}</th> 
            </tr>
            <tr>
            <td style="font-weight: bold;">${activeActor}</td>
            <td style="text-align: center; vertical-align: middle;">${activeBase}</td>
            <td style="text-align: center; vertical-align: middle;">${activeMod} (-${skill100mod})</td>
            <td style="text-align: center; vertical-align: middle; font-weight: bold;">${activeRoll.result} (${activeValueMod})</td>
            <td style="text-align: center; vertical-align: middle; font-weight: bold;">${activeLabel}</td>
            </tr>
            <tr>
            <td style="font-weight: bold;">${pasiveActor}</td>
            <td style="text-align: center; vertical-align: middle;">${pasiveBase}</td>
            <td style="text-align: center; vertical-align: middle;">${pasiveMod} (-${skill100mod})</td>
            <td style="text-align: center; vertical-align: middle; font-weight: bold;">${pasiveRoll.result} (${pasiveValueMod})</td>
            <td style="text-align: center; vertical-align: middle; font-weight: bold;">${pasiveLabel}</td>
            </tr>
            </table>`;
            activeRoll.toMessage({
              user: game.user.id,
              speaker: ChatMessage.getSpeaker(),
              flavor: activeFlavour,
              content: activeString,
            });
            let pasiveFlavour = `${game.i18n.format(
              "RQG.scripts.opposedRolls.pasiveFlavour",
              {
                activeName: activeName,
                activeBase: activeBase,
                pasiveName: pasiveName,
                pasiveBase: pasiveBase,
              }
            )}`;
            // let pasiveFlavour = `Results: <span style="font-weight: bold;color: brown">${activeName} (${activeBase}%)</span> versus <span style="font-weight: bold;color: brown">${pasiveName} (${pasiveBase}%)</span>`;
            let pasiveString = `<table>
            <tr>
                <th>${game.i18n.localize("RQG.scripts.general.actor")}</th>
                <th>${game.i18n.localize("RQG.scripts.general.rolled")}</th>
                <th>%</th>
                <th>${game.i18n.localize("RQG.scripts.general.result")}</th> 
            </tr>
            <tr>
            <td style="font-weight: bold;">${activeActor}</td>
            <td style="text-align: center; vertical-align: middle; font-weight: bold;">${activeRoll.result}</td>
            <td style="text-align: center; vertical-align: middle;">${activeValueMod}</td>
            <td style="text-align: center; vertical-align: middle; font-weight: bold;">${activefinalLabel}</td>
            </tr>
            <tr>
            <td style="font-weight: bold;">${pasiveActor}</td>
            <td style="text-align: center; vertical-align: middle; font-weight: bold;">${pasiveRoll.result}</td>
            <td style="text-align: center; vertical-align: middle;">${pasiveValueMod}</td>
            <td style="text-align: center; vertical-align: middle; font-weight: bold;">${pasivefinalLabel}</td>
            </tr>
            </table>`;

            pasiveRoll.toMessage({
              user: game.user.id,
              speaker: ChatMessage.getSpeaker(),
              flavor: pasiveFlavour,
              content: pasiveString,
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
  const firstactiveOptions = game.actors
    .getName($("select[name=activeActor]")[0].value)
    .items.filter(
      (skill) => skill.type === $("select[name=activeType]")[0].value
    )
    .reduce(
      (acc, e) => (acc += `<option value="${e.name}">${e.name}</option>`),
      ``
    );
  $("select[name=activeName]").append(firstactiveOptions);
  $("select[name=activeType]").change(function () {
    const newactiveOptions = game.actors
      .getName($("select[name=activeActor]")[0].value)
      .items.filter(
        (skill) => skill.type === $("select[name=activeType]")[0].value
      )
      .reduce(
        (acc, e) => (acc += `<option value="${e.name}">${e.name}</option>`),
        ``
      );
    $("select[name=activeName]").empty();
    $("select[name=activeName]").append(newactiveOptions);
  });
  const firstpasiveOptions = game.actors
    .getName($("select[name=pasiveActor]")[0].value)
    .items.filter(
      (skill) => skill.type === $("select[name=pasiveType]")[0].value
    )
    .reduce(
      (acc, e) => (acc += `<option value="${e.name}">${e.name}</option>`),
      ``
    );
  $("select[name=pasiveName]").append(firstpasiveOptions);
  $("select[name=pasiveType]").change(function () {
    const newpasiveOptions = game.actors
      .getName($("select[name=pasiveActor]")[0].value)
      .items.filter(
        (skill) => skill.type === $("select[name=pasiveType]")[0].value
      )
      .reduce(
        (acc, e) => (acc += `<option value="${e.name}">${e.name}</option>`),
        ``
      );
    $("select[name=pasiveName]").empty();
    $("select[name=pasiveName]").append(newpasiveOptions);
  });
});
