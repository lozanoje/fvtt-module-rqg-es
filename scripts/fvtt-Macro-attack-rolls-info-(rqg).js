//
// Attack Rolls Info (RQG) v1.5
// by Viriato139ac
//

const macroName = "AttackRolls Info";
const macroVersion = "1.5";
const macroImage = "icons/weapons/axes/axe-battle-broad-stone.webp";

const myDialogOptions = {
    width: 640,
    resizable: true,
    //height: 800,
    //top: 500,
    //left: 500
};

const attackParry = [
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attacker.1")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.1")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attacker.2")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.2")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attacker.2")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.3")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attacker.3")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.4")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attacker.3")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.5")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attacker.4")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.6")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attacker.1")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.7")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attacker.2")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.8")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attacker.2")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.9")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attacker.2")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.10")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attacker.4")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.11")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attacker.4")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.12")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attacker.1")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.13")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attacker.1")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.9")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attacker.1")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.10")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attacker.4")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.14")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attacker.4")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.15")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attacker.4")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.16")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attacker.5")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.17")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attacker.1")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.10")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attacker.6")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.14")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attacker.6")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.15")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attacker.6")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.16")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attacker.6")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.17")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attacker.6")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.18")}`],
]

const attackDodge = [
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.dodger.1")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.dodger.4")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.dodger.5")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.dodger.6")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.dodger.6")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.18")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.dodger.1")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.dodger.1")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.dodger.4")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.dodger.4")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.dodger.4")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.18")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.dodger.1")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.dodger.1")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.dodger.1")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.dodger.7")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.dodger.7")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.18")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.dodger.2")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.dodger.2")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.dodger.2")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.dodger.2")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.dodger.7")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.18")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.dodger.3")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.dodger.3")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.dodger.3")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.dodger.3")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.dodger.3")}`, `${game.i18n.localize("RQG.scripts.attackrollsInfo.defender.18")}`],
]

const damageOutput = [
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.damageOutput.1")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.damageOutput.2")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.damageOutput.3")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.damageOutput.4")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.damageOutput.5")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.damageOutput.6")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.damageOutput.7")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.damageOutput.8")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.damageOutput.9")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.damageOutput.10")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.damageOutput.11")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.damageOutput.12")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.damageOutput.13")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.damageOutput.14")}`],
    [`${game.i18n.localize("RQG.scripts.attackrollsInfo.damageOutput.15")}`],
]

const testResults = [
    {
        result: 0,
        colour: "goldenrod",
        desc: `${game.i18n.localize("RQG.Game.ResultEnum.2")}`,
    },
    {
        result: 1,
        colour: "blue",
        desc: `${game.i18n.localize("RQG.Game.ResultEnum.3")}`,
    },
    {
        result: 2,
        colour: "green",
        desc: `${game.i18n.localize("RQG.Game.ResultEnum.4")}`,
    },
    {
        result: 3,
        colour: "red",
        desc: `${game.i18n.localize("RQG.Game.ResultEnum.5")}`,
    },
    {
        result: 4,
        colour: "darkred",
        desc: `${game.i18n.localize("RQG.Game.ResultEnum.6")}`,
    },
];

const damageResults = [
    {
        result: 0,
        colour: "green",
        desc: `${game.i18n.localize("RQG.scripts.attackrollsInfo.damageEnum.1")}`,
    },
    {
        result: 1,
        colour: "red",
        desc: `${game.i18n.localize("RQG.scripts.attackrollsInfo.damageEnum.2")}`,
    },
    {
        result: 2,
        colour: "darkred",
        desc: `${game.i18n.localize("RQG.scripts.attackrollsInfo.damageEnum.3")}`,
    },
];

const locationResults = [
    {
        result: 0,
        colour: "goldenrod",
        desc: `${game.i18n.localize("RQG.scripts.attackrollsInfo.locationEnum.1")}`,
    },
    {
        result: 1,
        colour: "blue",
        desc: `${game.i18n.localize("RQG.scripts.attackrollsInfo.locationEnum.2")}`,
    },
    {
        result: 2,
        colour: "green",
        desc: `${game.i18n.localize("RQG.scripts.attackrollsInfo.locationEnum.3")}`,
    },
    {
        result: 3,
        colour: "red",
        desc: `${game.i18n.localize("RQG.scripts.attackrollsInfo.locationEnum.4")}`,
    },
    {
        result: 4,
        colour: "darkred",
        desc: `${game.i18n.localize("RQG.scripts.attackrollsInfo.locationEnum.5")}`,
    },
];

attackRollsInfo();

function attackRollsInfo() {

    // const testResults = [
    //     {
    //         result: 0,
    //         colour: "goldenrod",
    //         desc: `${game.i18n.localize("RQG.Game.ResultEnum.2")}`,
    //     },
    //     {
    //         result: 1,
    //         colour: "blue",
    //         desc: `${game.i18n.localize("RQG.Game.ResultEnum.3")}`,
    //     },
    //     {
    //         result: 2,
    //         colour: "green",
    //         desc: `${game.i18n.localize("RQG.Game.ResultEnum.4")}`,
    //     },
    //     {
    //         result: 3,
    //         colour: "red",
    //         desc: `${game.i18n.localize("RQG.Game.ResultEnum.5")}`,
    //     },
    //     {
    //         result: 4,
    //         colour: "darkred",
    //         desc: `${game.i18n.localize("RQG.Game.ResultEnum.6")}`,
    //     },
    // ];

    const testOptions = testResults.reduce(
        (a, b) => (a += `<option value="${b.result}">${b.desc}</option>`),
        ``
    );

    const damageOptions = damageResults.reduce(
        (a, b) => (a += `<option value="${b.result}">${b.desc}</option>`),
        ``
    );

    const locationOptions = locationResults.reduce(
        (a, b) => (a += `<option value="${b.result}">${b.desc}</option>`),
        ``
    );

    let contentString = `
  <form>
  <style type="text/css">
  .tg  {border-collapse:collapse;border-color:#ccc;border-spacing:0;}
  .tg td{background-color:#fff;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:2px 2px;word-break:normal;}
  .tg .tg-bzmm{background-color:#34696d;border-color:#ffffff;font-family:"Courier New", Courier, monospace !important;;text-align:left;vertical-align:middle}
  .tg .tg-d6y8{border-color:#efefef;font-family:"Courier New", Courier, monospace !important;;text-align:left;vertical-align:middle}
  .tg .tg-ly6r{border-color:#efefef;text-align:left;vertical-align:middle}
  .tg .tg-r5a9{background-color:#34696d;border-color:#efefef;color:#ffffff;font-family:"Courier New", Courier, monospace !important;;text-align:left;vertical-align:middle}
  .tg .tg-r5a1{background-color:#d437ac;border-color:#efefef;color:#ffffff;font-family:"Courier New", Courier, monospace !important;;text-align:left;vertical-align:middle}
  .tg .tg-049l{background-color:#f0f0f0;border-color:#efefef;font-family:"Courier New", Courier, monospace !important;;font-size:12px;text-align:left;vertical-align:middle}  
  </style>
  <table class="tg">
      <tbody>
          <tr>
              <td class="tg-r5a9" colspan="10"><span style="color:#FFF"><b>${game.i18n.localize("RQG.scripts.attackrollsInfo.attack")} Vs ${game.i18n.localize("RQG.scripts.attackrollsInfo.defense")}</b></span></td>
          </tr>
          <tr>
              <td class="tg-d6y8" colspan="2">${game.i18n.localize("RQG.scripts.attackrollsInfo.attack")}</td>
              <td class="tg-d6y8" colspan="3"><select id="attackSelect" name="attackSelect">${testOptions}</select></td>
              <td class="tg-d6y8" colspan="2">${game.i18n.localize("RQG.scripts.attackrollsInfo.defense")}:</td>
              <td class="tg-d6y8" colspan="3"><select id="defenseSelect" name="defenseSelect">${testOptions}</select></td>
          </tr>
          </hr>
          <tr>
          <td class="tg-r5a1" colspan="10"><span style="color:#FFF"><b>${game.i18n.localize("RQG.scripts.attackrollsInfo.results")}: ${game.i18n.localize("RQG.scripts.attackrollsInfo.parry")}</b></span></td>
          </tr>
          <tr>
          <td class="tg-d6y8" colspan="10"><div id='parryResult' contenteditable></div></span></td>
          </tr>
          <tr>
          <td class="tg-r5a1" colspan="10"><span style="color:#FFF"><b>${game.i18n.localize("RQG.scripts.attackrollsInfo.results")}: ${game.i18n.localize("RQG.scripts.attackrollsInfo.dodge")}</b></span></td>
          </tr>
          <tr>
          <td class="tg-d6y8" colspan="10"><div id='dodgeResult' contenteditable></div></span></td>
          </tr>
          <tr>
              <td class="tg-r5a9" colspan="10"><span style="color:#FFF"><b>${game.i18n.localize("RQG.scripts.attackrollsInfo.damage")}</b></span></td>
          </tr>
          <tr>
          <td class="tg-d6y8" colspan="2">${game.i18n.localize("RQG.scripts.attackrollsInfo.damageInput")}</td>
          <td class="tg-d6y8" colspan="3"><select id="damageSelect" name="damageSelect">${damageOptions}</select></td>
          <td class="tg-d6y8" colspan="2">${game.i18n.localize("RQG.scripts.attackrollsInfo.location")}:</td>
          <td class="tg-d6y8" colspan="3"><select id="locationSelect" name="locationSelect">${locationOptions}</select></td>
          </tr>
          </hr>
          <tr>
          <td class="tg-r5a1" colspan="10"><span style="color:#FFF"><b>${game.i18n.localize("RQG.scripts.attackrollsInfo.results")}: ${game.i18n.localize("RQG.scripts.attackrollsInfo.damage")}</b></span></td>
          </tr>
          <tr>
          <td class="tg-d6y8" colspan="10"><div id='damageResult' contenteditable></div></span></td>
          </tr>
      </tbody>
  </table>
  </form>`;

    new Dialog(
        {
            title: `${game.i18n.localize("RQG.scripts.attackrollsInfo.title")}` + ` v` + macroVersion,
            content: contentString,
            buttons: {
                parry: {
                    label: `${game.i18n.localize("RQG.scripts.attackrollsInfo.parry")}`,
                    callback: async (html) => {
                        const attackSelect = html.find(`[name="attackSelect"]`).val();
                        const defenseSelect = html.find(`[name="defenseSelect"]`).val();
                        // const tochat = html.find('[name="tochat"]')[0].checked;

                        let resultFinal = attackParry[5 * attackSelect + 1 * defenseSelect]
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
    <table class="tg">
`,
                        ];
                        resultFinal.forEach((a) => {
                            baseString.push([
                                `
      <tr>
      <td class="tg-d6y8" colspan="1" style="text-align: left; vertical-align: middle;">` + a + `</td>
  </tr>
      `,
                            ]);
                        });

                        baseString.push([
                            `</table></form>`
                        ])

                        let flavourString = `${game.i18n.localize("RQG.scripts.attackrollsInfo.attack")}: <span style="font-weight: bold;color: ` + testResults[attackSelect].colour + `">` + testResults[attackSelect].desc + `</span>
Vs ${game.i18n.localize("RQG.scripts.attackrollsInfo.parry")}: <span style="font-weight: bold;color: ` + testResults[defenseSelect].colour + `">` + testResults[defenseSelect].desc + `</span>`

                        new Dialog({
                            title: `${game.i18n.localize("RQG.scripts.attackrollsInfo.attack")} Vs ${game.i18n.localize("RQG.scripts.attackrollsInfo.parry")}`,
                            content: flavourString + `<hr>` + baseString.join(""),
                            buttons: {
                                yes: {
                                    icon: "<i class='fas fa-chevron-circle-left'></i>",
                                    label: `${game.i18n.localize("RQG.scripts.attackrollsInfo.return")}`,
                                },
                            },
                            default:
                                "yes",
                            close: (html) => { },
                        }).render(true);

                        if (true) {
                            ChatMessage.create({
                                user: game.user.id,
                                speaker: ChatMessage.getSpeaker(),
                                flavor: flavourString,
                                content: baseString.join(""),
                            });
                        }

                    },
                },
                dodge: {
                    label: `${game.i18n.localize("RQG.scripts.attackrollsInfo.dodge")}`,
                    callback: async (html) => {
                        const attackSelect = html.find(`[name="attackSelect"]`).val();
                        const defenseSelect = html.find(`[name="defenseSelect"]`).val();
                        // const tochat = html.find('[name="tochat"]')[0].checked;

                        let resultFinal = attackDodge[5 * attackSelect + 1 * defenseSelect]
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
    <table class="tg">
`,
                        ];
                        resultFinal.forEach((a) => {
                            baseString.push([
                                `
      <tr>
      <td class="tg-d6y8" colspan="1" style="text-align: left; vertical-align: middle;">` + a + `</td>
  </tr>
      `,
                            ]);
                        });

                        baseString.push([
                            `</table></form>`
                        ])

                        let flavourString = `${game.i18n.localize("RQG.scripts.attackrollsInfo.attack")}: <span style="font-weight: bold;color: ` + testResults[attackSelect].colour + `">` + testResults[attackSelect].desc + `</span>
Vs ${game.i18n.localize("RQG.scripts.attackrollsInfo.dodge")}: <span style="font-weight: bold;color: ` + testResults[defenseSelect].colour + `">` + testResults[defenseSelect].desc + `</span>`

                        new Dialog({
                            title: `${game.i18n.localize("RQG.scripts.attackrollsInfo.attack")} Vs ${game.i18n.localize("RQG.scripts.attackrollsInfo.dodge")}`,
                            content: flavourString + `<hr>` + baseString.join(""),
                            buttons: {
                                yes: {
                                    icon: "<i class='fas fa-chevron-circle-left'></i>",
                                    label: `${game.i18n.localize("RQG.scripts.attackrollsInfo.return")}`,
                                },
                            },
                            default:
                                "yes",
                            close: (html) => { },
                        }).render(true);

                        if (true) {
                            ChatMessage.create({
                                user: game.user.id,
                                speaker: ChatMessage.getSpeaker(),
                                flavor: flavourString,
                                content: baseString.join(""),
                            });
                        }
                    },
                },
                damage: {
                    label: `${game.i18n.localize("RQG.scripts.attackrollsInfo.damage")}`,
                    callback: async (html) => {
                        const damageSelect = html.find(`[name="damageSelect"]`).val();
                        const locationSelect = html.find(`[name="locationSelect"]`).val();
                        // const tochat = html.find('[name="tochat"]')[0].checked;

                        let resultFinal = damageOutput[5 * damageSelect + 1 * locationSelect]
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
    <table class="tg">
`,
                        ];
                        resultFinal.forEach((a) => {
                            baseString.push([
                                `
      <tr>
      <td class="tg-d6y8" colspan="1" style="text-align: left; vertical-align: middle;">` + a + `</td>
  </tr>
      `,
                            ]);
                        });

                        baseString.push([
                            `</table></form>`
                        ])

                        let flavourString = `${game.i18n.localize("RQG.scripts.attackrollsInfo.damage")}: <span style="font-weight: bold;color: ` + damageResults[damageSelect].colour + `">` + damageResults[damageSelect].desc + `</span>
Vs ${game.i18n.localize("RQG.scripts.attackrollsInfo.location")}: <span style="font-weight: bold;color: ` + locationResults[locationSelect].colour + `">` + locationResults[locationSelect].desc + `</span>`

                        new Dialog({
                            title: `${game.i18n.localize("RQG.scripts.attackrollsInfo.damage")}`,
                            content: flavourString + `<hr>` + baseString.join(""),
                            buttons: {
                                yes: {
                                    icon: "<i class='fas fa-chevron-circle-left'></i>",
                                    label: `${game.i18n.localize("RQG.scripts.attackrollsInfo.return")}`,
                                },
                            },
                            default:
                                "yes",
                            close: (html) => { },
                        }).render(true);

                        if (true) {
                            ChatMessage.create({
                                user: game.user.id,
                                speaker: ChatMessage.getSpeaker(),
                                flavor: flavourString,
                                content: baseString.join(""),
                            });
                        }
                    },
                },
                cancel: {
                    label: `${game.i18n.localize("RQG.scripts.general.cancel")}`,
                    callback: (html) => console.log("Canceled"),
                },
            },
            default: "cancel",
        },
        myDialogOptions
    ).render(true);
}

await new Promise((resolve) => setTimeout(resolve, 250));
$(document).ready(function () {
    let resultFinalP = attackParry[5 * $("select[name=attackSelect]")[0].value + 1 * $("select[name=defenseSelect]")[0].value]
    let baseStringP = [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attack")}: <span style="font-weight: bold;color: ` + testResults[$("select[name=attackSelect]")[0].value].colour + `">` + testResults[$("select[name=attackSelect]")[0].value].desc + `</span>
Vs ${game.i18n.localize("RQG.scripts.attackrollsInfo.parry")}: <span style="font-weight: bold;color: ` + testResults[$("select[name=defenseSelect]")[0].value].colour + `">` + testResults[$("select[name=defenseSelect]")[0].value].desc + `</span>`];
    resultFinalP.forEach((a) => { baseStringP.push([a]); });
    let resultFinalD = attackDodge[5 * $("select[name=attackSelect]")[0].value + 1 * $("select[name=defenseSelect]")[0].value]
    let baseStringD = [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attack")}: <span style="font-weight: bold;color: ` + testResults[$("select[name=attackSelect]")[0].value].colour + `">` + testResults[$("select[name=attackSelect]")[0].value].desc + `</span>
Vs ${game.i18n.localize("RQG.scripts.attackrollsInfo.dodge")}: <span style="font-weight: bold;color: ` + testResults[$("select[name=defenseSelect]")[0].value].colour + `">` + testResults[$("select[name=defenseSelect]")[0].value].desc + `</span>`];
    resultFinalD.forEach((a) => { baseStringD.push([a]); });
    let resultFinalDa = damageOutput[5 * $("select[name=damageSelect]")[0].value + 1 * $("select[name=locationSelect]")[0].value]
    let baseStringDa = [`${game.i18n.localize("RQG.scripts.attackrollsInfo.damage")}: <span style="font-weight: bold;color: ` + damageResults[$("select[name=damageSelect]")[0].value].colour + `">` + damageResults[$("select[name=damageSelect]")[0].value].desc + `</span>
Vs ${game.i18n.localize("RQG.scripts.attackrollsInfo.location")}: <span style="font-weight: bold;color: ` + locationResults[$("select[name=locationSelect]")[0].value].colour + `">` + locationResults[$("select[name=locationSelect]")[0].value].desc + `</span>`];
    resultFinalDa.forEach((a) => { baseStringDa.push([a]); });

    const firstcharOptionsP = baseStringP.join("</br>");
    const firstcharOptionsD = baseStringD.join("</br>");
    const firstcharOptionsDa = baseStringDa.join("</br>");

    $('#parryResult').html(firstcharOptionsP);
    $("#dodgeResult").html(firstcharOptionsD);
    $("#damageResult").html(firstcharOptionsDa);

    $("select[name=attackSelect]").change(function () {
        let resultFinalP = attackParry[5 * $("select[name=attackSelect]")[0].value + 1 * $("select[name=defenseSelect]")[0].value]
        let baseStringP = [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attack")}: <span style="font-weight: bold;color: ` + testResults[$("select[name=attackSelect]")[0].value].colour + `">` + testResults[$("select[name=attackSelect]")[0].value].desc + `</span>
Vs ${game.i18n.localize("RQG.scripts.attackrollsInfo.parry")}: <span style="font-weight: bold;color: ` + testResults[$("select[name=defenseSelect]")[0].value].colour + `">` + testResults[$("select[name=defenseSelect]")[0].value].desc + `</span>`];
        resultFinalP.forEach((a) => { baseStringP.push([a]); });
        let resultFinalD = attackDodge[5 * $("select[name=attackSelect]")[0].value + 1 * $("select[name=defenseSelect]")[0].value]
        let baseStringD = [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attack")}: <span style="font-weight: bold;color: ` + testResults[$("select[name=attackSelect]")[0].value].colour + `">` + testResults[$("select[name=attackSelect]")[0].value].desc + `</span>
Vs ${game.i18n.localize("RQG.scripts.attackrollsInfo.dodge")}: <span style="font-weight: bold;color: ` + testResults[$("select[name=defenseSelect]")[0].value].colour + `">` + testResults[$("select[name=defenseSelect]")[0].value].desc + `</span>`];
        resultFinalD.forEach((a) => { baseStringD.push([a]); });
        let resultFinalDa = damageOutput[5 * $("select[name=damageSelect]")[0].value + 1 * $("select[name=locationSelect]")[0].value]
        let baseStringDa = [`${game.i18n.localize("RQG.scripts.attackrollsInfo.damage")}: <span style="font-weight: bold;color: ` + damageResults[$("select[name=damageSelect]")[0].value].colour + `">` + damageResults[$("select[name=damageSelect]")[0].value].desc + `</span>
Vs ${game.i18n.localize("RQG.scripts.attackrollsInfo.location")}: <span style="font-weight: bold;color: ` + locationResults[$("select[name=locationSelect]")[0].value].colour + `">` + locationResults[$("select[name=locationSelect]")[0].value].desc + `</span>`];
        resultFinalDa.forEach((a) => { baseStringDa.push([a]); });

        const newcharOptionsP = baseStringP.join("</br>");
        const newcharOptionsD = baseStringD.join("</br>");
        const newcharOptionsDa = baseStringDa.join("</br>");

        $("#parryResult").html(newcharOptionsP);
        $("#dodgeResult").html(newcharOptionsD);
        $("#damageResult").html(newcharOptionsDa);

    });
    $("select[name=defenseSelect]").change(function () {
        let resultFinalP = attackParry[5 * $("select[name=attackSelect]")[0].value + 1 * $("select[name=defenseSelect]")[0].value]
        let baseStringP = [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attack")}: <span style="font-weight: bold;color: ` + testResults[$("select[name=attackSelect]")[0].value].colour + `">` + testResults[$("select[name=attackSelect]")[0].value].desc + `</span>
Vs ${game.i18n.localize("RQG.scripts.attackrollsInfo.parry")}: <span style="font-weight: bold;color: ` + testResults[$("select[name=defenseSelect]")[0].value].colour + `">` + testResults[$("select[name=defenseSelect]")[0].value].desc + `</span>`];
        resultFinalP.forEach((a) => { baseStringP.push([a]); });
        let resultFinalD = attackDodge[5 * $("select[name=attackSelect]")[0].value + 1 * $("select[name=defenseSelect]")[0].value]
        let baseStringD = [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attack")}: <span style="font-weight: bold;color: ` + testResults[$("select[name=attackSelect]")[0].value].colour + `">` + testResults[$("select[name=attackSelect]")[0].value].desc + `</span>
Vs ${game.i18n.localize("RQG.scripts.attackrollsInfo.dodge")}: <span style="font-weight: bold;color: ` + testResults[$("select[name=defenseSelect]")[0].value].colour + `">` + testResults[$("select[name=defenseSelect]")[0].value].desc + `</span>`];
        resultFinalD.forEach((a) => { baseStringD.push([a]); });
        let resultFinalDa = damageOutput[5 * $("select[name=damageSelect]")[0].value + 1 * $("select[name=locationSelect]")[0].value]
        let baseStringDa = [`${game.i18n.localize("RQG.scripts.attackrollsInfo.damage")}: <span style="font-weight: bold;color: ` + damageResults[$("select[name=damageSelect]")[0].value].colour + `">` + damageResults[$("select[name=damageSelect]")[0].value].desc + `</span>
Vs ${game.i18n.localize("RQG.scripts.attackrollsInfo.location")}: <span style="font-weight: bold;color: ` + locationResults[$("select[name=locationSelect]")[0].value].colour + `">` + locationResults[$("select[name=locationSelect]")[0].value].desc + `</span>`];
        resultFinalDa.forEach((a) => { baseStringDa.push([a]); });

        const newcharOptionsP = baseStringP.join("</br>");
        const newcharOptionsD = baseStringD.join("</br>");
        const newcharOptionsDa = baseStringDa.join("</br>");

        $("#parryResult").html(newcharOptionsP);
        $("#dodgeResult").html(newcharOptionsD);
        $("#damageResult").html(newcharOptionsDa);

    });

    $("select[name=damageSelect]").change(function () {
        let resultFinalP = attackParry[5 * $("select[name=attackSelect]")[0].value + 1 * $("select[name=defenseSelect]")[0].value]
        let baseStringP = [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attack")}: <span style="font-weight: bold;color: ` + testResults[$("select[name=attackSelect]")[0].value].colour + `">` + testResults[$("select[name=attackSelect]")[0].value].desc + `</span>
Vs ${game.i18n.localize("RQG.scripts.attackrollsInfo.parry")}: <span style="font-weight: bold;color: ` + testResults[$("select[name=defenseSelect]")[0].value].colour + `">` + testResults[$("select[name=defenseSelect]")[0].value].desc + `</span>`];
        resultFinalP.forEach((a) => { baseStringP.push([a]); });
        let resultFinalD = attackDodge[5 * $("select[name=attackSelect]")[0].value + 1 * $("select[name=defenseSelect]")[0].value]
        let baseStringD = [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attack")}: <span style="font-weight: bold;color: ` + testResults[$("select[name=attackSelect]")[0].value].colour + `">` + testResults[$("select[name=attackSelect]")[0].value].desc + `</span>
Vs ${game.i18n.localize("RQG.scripts.attackrollsInfo.dodge")}: <span style="font-weight: bold;color: ` + testResults[$("select[name=defenseSelect]")[0].value].colour + `">` + testResults[$("select[name=defenseSelect]")[0].value].desc + `</span>`];
        resultFinalD.forEach((a) => { baseStringD.push([a]); });
        let resultFinalDa = damageOutput[5 * $("select[name=damageSelect]")[0].value + 1 * $("select[name=locationSelect]")[0].value]
        let baseStringDa = [`${game.i18n.localize("RQG.scripts.attackrollsInfo.damage")}: <span style="font-weight: bold;color: ` + damageResults[$("select[name=damageSelect]")[0].value].colour + `">` + damageResults[$("select[name=damageSelect]")[0].value].desc + `</span>
Vs ${game.i18n.localize("RQG.scripts.attackrollsInfo.location")}: <span style="font-weight: bold;color: ` + locationResults[$("select[name=locationSelect]")[0].value].colour + `">` + locationResults[$("select[name=locationSelect]")[0].value].desc + `</span>`];
        resultFinalDa.forEach((a) => { baseStringDa.push([a]); });

        const newcharOptionsP = baseStringP.join("</br>");
        const newcharOptionsD = baseStringD.join("</br>");
        const newcharOptionsDa = baseStringDa.join("</br>");

        $("#parryResult").html(newcharOptionsP);
        $("#dodgeResult").html(newcharOptionsD);
        $("#damageResult").html(newcharOptionsDa);

    });

    $("select[name=locationSelect]").change(function () {
        let resultFinalP = attackParry[5 * $("select[name=attackSelect]")[0].value + 1 * $("select[name=defenseSelect]")[0].value]
        let baseStringP = [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attack")}: <span style="font-weight: bold;color: ` + testResults[$("select[name=attackSelect]")[0].value].colour + `">` + testResults[$("select[name=attackSelect]")[0].value].desc + `</span>
Vs ${game.i18n.localize("RQG.scripts.attackrollsInfo.parry")}: <span style="font-weight: bold;color: ` + testResults[$("select[name=defenseSelect]")[0].value].colour + `">` + testResults[$("select[name=defenseSelect]")[0].value].desc + `</span>`];
        resultFinalP.forEach((a) => { baseStringP.push([a]); });
        let resultFinalD = attackDodge[5 * $("select[name=attackSelect]")[0].value + 1 * $("select[name=defenseSelect]")[0].value]
        let baseStringD = [`${game.i18n.localize("RQG.scripts.attackrollsInfo.attack")}: <span style="font-weight: bold;color: ` + testResults[$("select[name=attackSelect]")[0].value].colour + `">` + testResults[$("select[name=attackSelect]")[0].value].desc + `</span>
Vs ${game.i18n.localize("RQG.scripts.attackrollsInfo.dodge")}: <span style="font-weight: bold;color: ` + testResults[$("select[name=defenseSelect]")[0].value].colour + `">` + testResults[$("select[name=defenseSelect]")[0].value].desc + `</span>`];
        resultFinalD.forEach((a) => { baseStringD.push([a]); });
        let resultFinalDa = damageOutput[5 * $("select[name=damageSelect]")[0].value + 1 * $("select[name=locationSelect]")[0].value]
        let baseStringDa = [`${game.i18n.localize("RQG.scripts.attackrollsInfo.damage")}: <span style="font-weight: bold;color: ` + damageResults[$("select[name=damageSelect]")[0].value].colour + `">` + damageResults[$("select[name=damageSelect]")[0].value].desc + `</span>
Vs ${game.i18n.localize("RQG.scripts.attackrollsInfo.location")}: <span style="font-weight: bold;color: ` + locationResults[$("select[name=locationSelect]")[0].value].colour + `">` + locationResults[$("select[name=locationSelect]")[0].value].desc + `</span>`];
        resultFinalDa.forEach((a) => { baseStringDa.push([a]); });

        const newcharOptionsP = baseStringP.join("</br>");
        const newcharOptionsD = baseStringD.join("</br>");
        const newcharOptionsDa = baseStringDa.join("</br>");

        $("#parryResult").html(newcharOptionsP);
        $("#dodgeResult").html(newcharOptionsD);
        $("#damageResult").html(newcharOptionsDa);

    });

});
