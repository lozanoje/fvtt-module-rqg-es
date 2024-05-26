//
// StrikeRanks Helper (RQG) v1.16
// by Viriato139ac
// thanks to wake for reformatting the weaponsOption code to show only equipped gear
//

const macroName = "StrikeRanks Helper";
const macroVersion = "1.16";
const macroImage = "icons/weapons/swords/swords-short.webp";

(function () {
  /**
   * Ajuste decimal de un número.
   *
   * @param	{String}	type	El tipo de ajuste.
   * @param	{Number}	value	El número.
   * @param	{Integer}	exp		El exponente(el logaritmo en base 10 del ajuste).
   * @returns	{Number}			El valor ajustado.
   */
  function decimalAdjust(type, value, exp) {
    // Si el exp es indefinido o cero...
    if (typeof exp === "undefined" || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Si el valor no es un número o el exp no es un entero...
    if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
      return NaN;
    }
    // Cambio
    value = value.toString().split("e");
    value = Math[type](+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp)));
    // Volver a cambiar
    value = value.toString().split("e");
    return +(value[0] + "e" + (value[1] ? +value[1] + exp : exp));
  }

  // Redondeo decimal
  if (!Math.round10) {
    Math.round10 = function (value, exp) {
      return decimalAdjust("round", value, exp);
    };
  }
  // Redondeo hacia abajo
  if (!Math.floor10) {
    Math.floor10 = function (value, exp) {
      return decimalAdjust("floor", value, exp);
    };
  }
  // Redondeo hacia arriba
  if (!Math.ceil10) {
    Math.ceil10 = function (value, exp) {
      return decimalAdjust("ceil", value, exp);
    };
  }
})();

const myDialogOptions = {
  width: 640,
  resizable: true,
  //height: 800,
  //top: 500,
  //left: 500
};

let movementArray = [];
Array(12)
  .fill()
  .map((element, index) => index + 1)
  .forEach((a) =>
    movementArray.push({ move: a, desc: a * 3 + `m (SR: ` + a + `)` })
  );

const movementOptions = movementArray.reduce(
  (a, b) => (a += `<option value="${b.move}">${b.desc}</option>`),
  ``
);

const mergeById = (a1, a2) =>
  a1.map((itm) => ({
    ...a2.find((item) => item.actor === itm.actor && item),
    ...itm,
  }));

function uniqueArray4(a) {
  return [...new Set(a)];
}

strikeRanks();

function strikeRanks() {
  // if game.combat === null){
  //   ui.notifications.error("No hay ningún combate activo");
  //   return;
  // }
  if (canvas.tokens.controlled.length === 0 && !game.user.isGM) {
    ui.notifications.error(`No token selected`);
    return;
  }

  let tokenOptions = ``;
  if (game.combat !== null) {
    /*
        const mycombat = game.combat;
        const cttokens = Array.from(mycombat.data.combatants).map(function (a) {
          return { token: a.data.tokenId, actor: a.data.actorId };
        });
        const actors = Array.from(game.actors).map(function (a) {
          return { name: a.data.name, actor: a.data._id };
        });
        const actortokens = mergeById(cttokens, actors);
        const uniqueTokens = [
          ...new Map(actortokens.map((item) => [item["token"], item])).values(),
        ];
        tokenOptions =
          `<option value="alltokens">${game.i18n.localize("RQG.scripts.strikeranksHelper.removeAllTokens")}</option>` +
          uniqueTokens.reduce(
            (a, b) =>
              (a += `<option value="${b.token}">${b.name} (${b.token})</option>`),
            ``
          );
          */
    const cttokens = Array.from(game.combat.data.combatants).map(function (a) {
      return { tokenid: a.data.tokenId, actorid: a.data.actorId };
    });
    const actors = Array.from(game.actors).map(function (a) {
      return { actorname: a.data.name, actorid: a.data._id };
    });
    const tokens = canvas.tokens.placeables.map(function (a) {
      return { tokenname: a.name, tokenid: a.id };
    });
    const actortokens1 = cttokens.map((t1) => ({
      ...t1,
      ...actors.find((t2) => t2.actorid === t1.actorid),
    }));
    const actortokens = actortokens1.map((t1) => ({
      ...t1,
      ...tokens.find((t2) => t2.tokenid === t1.tokenid),
    }));
    const uniqueTokens = [
      ...new Map(actortokens.map((item) => [item["tokenid"], item])).values(),
    ];
    tokenOptions =
      `<option value="alltokens">${game.i18n.localize(
        "RQG.scripts.strikeranksHelper.removeAllTokens"
      )}</option>` +
      uniqueTokens.reduce(
        (a, b) =>
          (a += `<option value="${b.tokenid}">${b.tokenname} (${b.tokenid})</option>`),
        ``
      );
  }

  let contentString = `<script>
    async function addtoCT(corank, isind, isrea, issr, issrvalue, rankText, dexval) {
      if (game.combat === null && !game.user.isGM){
        ui.notifications.error("Combat has not started yet and you do not have GM role");
      }else{
        let rankTextShortened = rankText.split('(')[0];
        const tokenId = Array.from(canvas.tokens.controlled)[0].id;
        const mycombat = game.combat === null ? await Combat.create({scene: canvas.scene.id, active: true}) : game.combat;
        
          const combatEntries = mycombat.data.combatants
          .filter((a) => a.data.tokenId === tokenId && a.data.initiative > 0)
          .sort((a, b) =>
            a.data.initiative < b.data.initiative
              ? 1
              : b.data.initiative < a.data.initiative
              ? -1
              : 0
          );
    
        let lastSR;
        Array.from(combatEntries).length > 0 && !isind
          ? (lastSR = Math.floor(Array.from(combatEntries)[0].data.initiative))
          : (lastSR = 0);
        let readySR;
        isrea ? readySR = 5 : readySR = 0;
        issr ? readySR = 1*readySR + 1*issrvalue : readySR = 1*readySR;
  
        //to resolve ties
        //const ties1 = Math.max(0,100 - dexval)/100;
        //const ties2 = Math.floor(10*Math.random())/1000;
        //console.log(ties1)
        //console.log(ties2)
        //const newSR = Math.round10(1*corank + 1*lastSR + 1*readySR + ties1 + ties2, -3);
        //const newSR = 1*corank + 1*lastSR + 1*readySR;
        const ties1 = Math.max(0,100 - dexval)/100;
        //const ties2 = Math.floor(10*Math.random())/1000;
        //console.log(ties1)
        //console.log(ties2)
        let newSR = 1*corank + 1*lastSR + 1*readySR;
        newSR = (1*newSR) === 0 ? 1 : newSR
        newSR = Math.round10(newSR + ties1, -2);

        //if (newSR > 0) {
          if (newSR >= 13) {
            ui.notifications.error("SR (" + newSR + ") above 12");
          } else {
            const toCreate = canvas.tokens.controlled.map((t) => ({
              tokenId: t.id,
              hidden: t.data.hidden,
              actorId: t.actor.id,
              name: t.name + "/" + rankTextShortened,
              //name: t.actor.name + "/" + rankTextShortened,
              initiative: newSR,
            }));
            await mycombat.createEmbeddedDocuments("Combatant", toCreate);
          }
        //}
      }
    }
    </script>
    <script>
    async function delfromCT(tokenid, derank) {
      if (game.combat !== null){
        const mycombat = game.combat;
        let combatEntryIds;
        if (tokenid === "alltokens"){
            if (derank === -1) {
                combatEntryIds = mycombat.data.combatants.filter((a) => a.data.initiative === undefined).map(c=>c.id);
              } else if (derank === 0) {
                combatEntryIds = mycombat.data.combatants.map(c=>c.id);
              } else {
                combatEntryIds = mycombat.data.combatants.filter((a) => Math.floor(a.data.initiative) === 1*derank).map(c=>c.id);
              }
        }else{
            if (derank === -1) {
                combatEntryIds = mycombat.data.combatants.filter((a) => a.data.tokenId === tokenid && a.data.initiative === undefined).map(c=>c.id);
              } else if (derank === 0) {
                combatEntryIds = mycombat.data.combatants.filter((a) => a.data.tokenId === tokenid).map(c=>c.id);
              } else {
                combatEntryIds = mycombat.data.combatants.filter((a) => a.data.tokenId === tokenid && Math.floor(a.data.initiative) === 1*derank).map(c=>c.id);
              }
        }
        await mycombat.deleteEmbeddedDocuments("Combatant", combatEntryIds);
      }
    }
    </script>
    <form>    
    <style type="text/css">
    .tg  {border-collapse:collapse;border-color:#ccc;border-spacing:0;}
    .tg td{background-color:#fff;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:2px 2px;word-break:normal;}
    .tg .tg-bzmm{background-color:#34696d;border-color:#ffffff;font-family:"Courier New", Courier, monospace !important;;text-align:left;vertical-align:middle}
    .tg .tg-d6y8{border-color:#efefef;font-family:"Courier New", Courier, monospace !important;;text-align:left;vertical-align:middle}
    .tg .tg-ly6r{border-color:#efefef;text-align:left;vertical-align:middle}
    .tg .tg-r5a9{background-color:#34696d;border-color:#efefef;color:#ffffff;font-family:"Courier New", Courier, monospace !important;;text-align:left;vertical-align:middle}
    .tg .tg-049l{background-color:#f0f0f0;border-color:#efefef;font-family:"Courier New", Courier, monospace !important;;font-size:12px;text-align:left;vertical-align:middle}  
    </style>`;

  if (canvas.tokens.controlled.length !== 0) {
    let select = canvas.tokens.controlled;
    let selected = select[0].actor;

    const tname = selected.data.name;
    const toname = select[0].name;
    const tdex = selected.data.data.attributes.dexStrikeRank;
    const tsiz = selected.data.data.attributes.sizStrikeRank;
    const dexvalue = selected.data.data.characteristics.dexterity.value;

    const runeArray = selected.items.filter((a) => a.type === "runeMagic");
    const runeOptions = runeArray.reduce(
      (a, b) =>
        (a += `<option value="1">${b.name} [${b.data.data.points}] (SR: 1+EMP-1)</option>`),
      ``
    );

    const spiritArray = selected.items.filter((a) => a.type === "spiritMagic");
    const spiritOptions = spiritArray.reduce(
      (a, b) =>
        (a +=
          `<option value="` +
          parseInt(tdex + Math.max(0, 1 * b.data.data.points - 1)) +
          `">${b.name} [${b.data.data.points}] (SR: DEX+MP-1+EMP)</option>`),
      ``
    );
    const sorceryArray = selected.items.filter(
      (a) =>
        a.type === "skill" &&
        a.data.data.category === "magic" &&
        a.data.data.runes.length > 0
    );
    const sorceryOptions = sorceryArray.reduce(
      (a, b) =>
        (a += `<option value="${tdex}">${b.data.data.skillName} [-] (SR: DEX+MP-1+EMP)</option>`),
      ``
    );

    const weaponsArray = selected.items.filter(
      (a) =>
        a.type === "weapon" &&
        (a.data.data.equippedStatus === "equipped" ||
          a.data.data.isNatural === true)
    );
    let weaponsList = [];
    weaponsArray.forEach((a) => {
      const usages = Object.entries(a.data.data.usage)
        .filter((e) => e[1].skillId)
        .map((u) => u[0]);
      for (let i = 0; i < usages.length; i++) {
        let aaa;
        let bbb;
        if (usages[i] === "missile") {
          aaa = tdex;
          bbb = a.name + " - " + usages[i] + " [0] (SR: DEX)";
        } else {
          aaa = a.data.data.usage[`${usages[i]}`].strikeRank + tdex + tsiz;
          bbb =
            a.name +
            " - " +
            usages[i] +
            " [" +
            a.data.data.usage[`${usages[i]}`].strikeRank +
            "] (SR: DEX+SIZ+WEA)";
        }
        weaponsList.push(`<option value="${aaa}">${bbb}</option>`);
      }
    });
    const weaponsOptions = weaponsList.join();

    contentString =
      contentString +
      `<table class="tg">
        <tbody>
            <tr>
                <td class="tg-r5a9" colspan="10"><span style="color:#FFF"><b>${game.i18n.localize(
                  "RQG.scripts.strikeranksHelper.token"
                )}</b></span></td>
            </tr>
            <tr>
            <td class="tg-d6y8" colspan="1">${game.i18n.localize(
              "RQG.scripts.strikeranksHelper.token"
            )}:</td>
            <td class="tg-d6y8" colspan="2"><span style="font-weight: bold;">${toname}</span></td>
            <td class="tg-d6y8" colspan="1">${game.i18n.localize(
              "RQG.scripts.strikeranksHelper.actor"
            )}:</td>
            <td class="tg-d6y8" colspan="2"><span style="font-weight: bold;">${tname}</span></td>
                <td class="tg-d6y8" colspan="1">${game.i18n.localize(
                  "RQG.scripts.strikeranksHelper.dexsr"
                )}:</td>
                <td class="tg-d6y8" colspan="1"><span style="font-weight: bold; color:green;">${tdex}</span></td>
                <td class="tg-d6y8" colspan="1">${game.i18n.localize(
                  "RQG.scripts.strikeranksHelper.sizsr"
                )}:</td>
                <td class="tg-d6y8" colspan="1"><span style="font-weight: bold; color:red;">${tsiz}</span></td>
            </tr>
            <tr>
                <td class="tg-049l" colspan="10"><b>${game.i18n.localize(
                  "RQG.scripts.strikeranksHelper.actor"
                )}</b>: ${game.i18n.localize(
        "RQG.scripts.strikeranksHelper.actorHint"
      )};
            <b>${game.i18n.localize(
              "RQG.scripts.strikeranksHelper.dexsr"
            )}</b>: ${game.i18n.localize(
        "RQG.scripts.strikeranksHelper.dexsrHint"
      )};
            <b>${game.i18n.localize(
              "RQG.scripts.strikeranksHelper.sizsr"
            )}</b>: ${game.i18n.localize(
        "RQG.scripts.strikeranksHelper.sizsrHint"
      )}</td>
            </tr>
            <tr>
                <td class="tg-r5a9" colspan="10"><span style="color:#FFF"><b>${game.i18n.localize(
                  "RQG.scripts.strikeranksHelper.generalTitle"
                )}</b></span></td>
            </tr>
            <tr>
                <td class="tg-d6y8" colspan="2">${game.i18n.localize(
                  "RQG.scripts.strikeranksHelper.generalIndependent"
                )}</td>
                <td class="tg-d6y8" colspan="1"><input type="checkbox" id="generalInd" name="generalInd"></td>
                <td class="tg-d6y8" colspan="2">${game.i18n.localize(
                  "RQG.scripts.strikeranksHelper.generalReadiness"
                )}</td>
                <td class="tg-d6y8" colspan="1"><input type="checkbox" id="generalRea" name="generalRea"></td>
                <td class="tg-d6y8" colspan="2">${game.i18n.localize(
                  "RQG.scripts.strikeranksHelper.generalSR"
                )}</td>
                <td class="tg-d6y8" colspan="1"><input type="number" id="generalSRValue" name="generalSRValue" value=0></td>
                <td class="tg-d6y8" colspan="1"><input type="checkbox" id="generalSR" name="generalSR"></td>

            </tr>
                    <tr>
                        <td class="tg-049l" colspan="10"><b>${game.i18n.localize(
                          "RQG.scripts.strikeranksHelper.generalIndependent"
                        )}</b>: ${game.i18n.localize(
        "RQG.scripts.strikeranksHelper.generalIndependentHint"
      )};
            <b>${game.i18n.localize(
              "RQG.scripts.strikeranksHelper.generalReadiness"
            )}</b>: ${game.i18n.localize(
        "RQG.scripts.strikeranksHelper.generalReadinessHint"
      )};
            <b>${game.i18n.localize(
              "RQG.scripts.strikeranksHelper.generalSR"
            )}</b>: ${game.i18n.localize(
        "RQG.scripts.strikeranksHelper.generalSRHint"
      )}</td>
                    </tr>
                    <tr>
                        <td class="tg-r5a9" colspan="10"><span style="color:#FFF"><b>${game.i18n.localize(
                          "RQG.scripts.strikeranksHelper.combatTitle"
                        )}</b></span></td>
                    </tr>
                    <tr>
                        <td class="tg-d6y8" colspan="2">${game.i18n.localize(
                          "RQG.scripts.strikeranksHelper.combatAttack"
                        )}</td>
                        <td class="tg-d6y8" colspan="6"><select id="attackSelect" name="attackSelect">${weaponsOptions}</select></td>
                        <td class="tg-d6y8" colspan="2"><button id="attackValueAdd" onclick="addtoCT(document.getElementById('attackSelect').value, document.getElementById('generalInd').checked, document.getElementById('generalRea').checked, document.getElementById('generalSR').checked, document.getElementById('generalSRValue').value, document.getElementById('attackSelect').options[document.getElementById('attackSelect').selectedIndex].text,${dexvalue})" type="button"><i class="fas fa-plus-circle"></i></button></td>
                    </tr>
                    <tr>
                        <td class="tg-049l" colspan="10">
            <b>${game.i18n.localize(
              "RQG.scripts.strikeranksHelper.combatAttack"
            )}</b>: ${game.i18n.localize(
        "RQG.scripts.strikeranksHelper.combatAttackHint"
      )}</td>
                    </tr>
                    <tr>
                        <td class="tg-r5a9" colspan="10"><span style="color:#FFF"><b>${game.i18n.localize(
                          "RQG.scripts.strikeranksHelper.magicTitle"
                        )}</b></span></td>
                    </tr>
                    <tr>
                        <td class="tg-d6y8" colspan="2">${game.i18n.localize(
                          "RQG.scripts.strikeranksHelper.magicRune"
                        )}</td>
                        <td class="tg-d6y8" colspan="5"><select id="runeSelect" name="runeSelect">${runeOptions}</select></td>
                        <td class="tg-d6y8" colspan="1">${game.i18n.localize(
                          "RQG.scripts.strikeranksHelper.magicMPs"
                        )}:</td>
                        <td class="tg-d6y8" colspan="1"><input type="number" id="runeValue" name="runeValue" value=0></td>
                        <td class="tg-d6y8" colspan="1"><button id="runeValueAdd" onclick="addtoCT(1*document.getElementById('runeSelect').value + Math.max(0,1*document.getElementById('runeValue').value - 1), document.getElementById('generalInd').checked, document.getElementById('generalRea').checked, document.getElementById('generalSR').checked, document.getElementById('generalSRValue').value, document.getElementById('runeSelect').options[document.getElementById('runeSelect').selectedIndex].text,${dexvalue})" type="button"><i class="fas fa-plus-circle"></i></button></td>
                    </tr>
                    <tr>
                        <td class="tg-d6y8" colspan="2">${game.i18n.localize(
                          "RQG.scripts.strikeranksHelper.magicSpirit"
                        )}</td>
                        <td class="tg-d6y8" colspan="5"><select id="spiritSelect" name="spiritSelect">${spiritOptions}</select></td>
                        <td class="tg-d6y8" colspan="1">${game.i18n.localize(
                          "RQG.scripts.strikeranksHelper.magicMPs"
                        )}:</td>
                        <td class="tg-d6y8" colspan="1"><input type="number" id="spiritValue" name="spiritValue" value=0></td>
                        <td class="tg-d6y8" colspan="1"><button id="spiritValueAdd" onclick="addtoCT(1*document.getElementById('spiritSelect').value + 1*document.getElementById('spiritValue').value, document.getElementById('generalInd').checked, document.getElementById('generalRea').checked, document.getElementById('generalSR').checked, document.getElementById('generalSRValue').value, document.getElementById('spiritSelect').options[document.getElementById('spiritSelect').selectedIndex].text,${dexvalue})" type="button"><i class="fas fa-plus-circle"></i></button></td>
                    </tr>
                    <tr>
                        <td class="tg-d6y8" colspan="2">${game.i18n.localize(
                          "RQG.scripts.strikeranksHelper.magicSorcery"
                        )}</td>
                        <td class="tg-d6y8" colspan="5"><select id="sorcerySelect" name="sorcerySelect">${sorceryOptions}</select></td>
                        <td class="tg-d6y8" colspan="1">${game.i18n.localize(
                          "RQG.scripts.strikeranksHelper.magicMPs"
                        )}:</td>
                        <td class="tg-d6y8" colspan="1"><input type="number" id="sorceryValue" name="sorceryValue" value=0></td>
                        <td class="tg-d6y8" colspan="1"><button id="sorceryValueAdd" onclick="addtoCT(1*document.getElementById('sorcerySelect').value + 1*document.getElementById('sorceryValue').value, document.getElementById('generalInd').checked, document.getElementById('generalRea').checked, document.getElementById('generalSR').checked, document.getElementById('generalSRValue').value, document.getElementById('sorcerySelect').options[document.getElementById('sorcerySelect').selectedIndex].text,${dexvalue})" type="button"><i class="fas fa-plus-circle"></i></button></td>
                    </tr>
                    <tr>
                        <td class="tg-049l" colspan="10">
            <b>${game.i18n.localize(
              "RQG.scripts.strikeranksHelper.magicSpells"
            )}</b>: ${game.i18n.localize(
        "RQG.scripts.strikeranksHelper.magicSpellsHint"
      )};
            <b>${game.i18n.localize(
              "RQG.scripts.strikeranksHelper.magicMPs"
            )}</b>: ${game.i18n.localize(
        "RQG.scripts.strikeranksHelper.magicMPsHint"
      )}</td>
                    </tr>
                    <tr>
                        <td class="tg-r5a9" colspan="10"><span style="color:#FFF"><b>${game.i18n.localize(
                          "RQG.scripts.strikeranksHelper.otherTitle"
                        )}</b></span></td>
                    </tr>
                    <tr>
                        <td class="tg-d6y8" colspan="3">${game.i18n.localize(
                          "RQG.scripts.strikeranksHelper.otherReady"
                        )}</td>
                        <td class="tg-d6y8" colspan="1"><button id="readyAdd" onclick="addtoCT(5, document.getElementById('generalInd').checked, document.getElementById('generalRea').checked, document.getElementById('generalSR').checked, document.getElementById('generalSRValue').value, '${game.i18n.localize(
                          "RQG.scripts.strikeranksHelper.otherReady"
                        )}',${dexvalue})" type="button"><i class="fas fa-plus-circle"></i></button></td>
                        <td class="tg-d6y8" colspan="1">${game.i18n.localize(
                          "RQG.scripts.strikeranksHelper.otherMovement"
                        )}</td>
                        <td class="tg-d6y8" colspan="4"><select id="movementSelect" name="movementSelect">${movementOptions}</select></td>
                        <td class="tg-d6y8" colspan="1"><button id="movementAdd" onclick="addtoCT(document.getElementById('movementSelect').value, document.getElementById('generalInd').checked, document.getElementById('generalRea').checked, document.getElementById('generalSR').checked, document.getElementById('generalSRValue').value, '${game.i18n.localize(
                          "RQG.scripts.strikeranksHelper.otherMovement"
                        )}' + ' ' + document.getElementById('movementSelect').options[document.getElementById('movementSelect').selectedIndex].text,${dexvalue})" type="button"><i class="fas fa-plus-circle"></i></button></td>
                    </tr>
                    <tr>
                        <td class="tg-d6y8" colspan="3">${game.i18n.localize(
                          "RQG.scripts.strikeranksHelper.otherAimed"
                        )}</td>
                        <td class="tg-d6y8" colspan="1"><button id="aimedAdd" onclick="addtoCT(12, true, false, document.getElementById('generalSR').checked, document.getElementById('generalSRValue').value, '${game.i18n.localize(
                          "RQG.scripts.strikeranksHelper.otherAimed"
                        )}',${dexvalue})" type="button"><i class="fas fa-plus-circle"></i></button></td>
                        <td class="tg-d6y8" colspan="1">${game.i18n.localize(
                          "RQG.scripts.strikeranksHelper.otherOther"
                        )}</td>
						<td class="tg-d6y8" colspan="2"><input type="text" id="otherText" name="otherText" value=${game.i18n.localize(
              "RQG.scripts.strikeranksHelper.otherOther"
            )}></td>
                        <td class="tg-d6y8" colspan="1">${game.i18n.localize(
                          "RQG.scripts.strikeranksHelper.otherSR"
                        )}:</td>
                        <td class="tg-d6y8" colspan="1"><input type="number" id="otherValue" name="otherValue" value=0></td>
                        <td class="tg-d6y8" colspan="1"><button id="otherValueAdd" onclick="addtoCT(document.getElementById('otherValue').value, document.getElementById('generalInd').checked, document.getElementById('generalRea').checked, document.getElementById('generalSR').checked, document.getElementById('generalSRValue').value, document.getElementById('otherText').value + ' [' + document.getElementById('otherValue').value + ']',${dexvalue})" type="button"><i class="fas fa-plus-circle"></i></button></td>
                    </tr>
                    <tr>
                        <td class="tg-049l" colspan="10">
            <b>${game.i18n.localize(
              "RQG.scripts.strikeranksHelper.otherReady"
            )}</b>: ${game.i18n.localize(
        "RQG.scripts.strikeranksHelper.otherReadyHint"
      )};
            <b>${game.i18n.localize(
              "RQG.scripts.strikeranksHelper.otherMovement"
            )}</b>: ${game.i18n.localize(
        "RQG.scripts.strikeranksHelper.otherMovementHint"
      )};
            <b>${game.i18n.localize(
              "RQG.scripts.strikeranksHelper.otherAimed"
            )}</b>: ${game.i18n.localize(
        "RQG.scripts.strikeranksHelper.otherAimedHint"
      )};
            <b>${game.i18n.localize(
              "RQG.scripts.strikeranksHelper.otherOther"
            )}</b>: ${game.i18n.localize(
        "RQG.scripts.strikeranksHelper.otherOtherHint"
      )}</td>
                    </tr>
    </tbody>
    </table>`;
  }

  if (game.user.isGM) {
    if (canvas.tokens.controlled.length !== 0) {
      contentString = contentString + `</hr>`;
    }
    contentString =
      contentString +
      `<table class="tg">
                <tbody>
                    <tr>
                        <td class="tg-r5a9" colspan="10"><span style="color:#FFF"><b>${game.i18n.localize(
                          "RQG.scripts.strikeranksHelper.removeTitle"
                        )}</b></span></td>
                    </tr>
                    <tr>
                        <td class="tg-d6y8" colspan="2">${game.i18n.localize(
                          "RQG.scripts.strikeranksHelper.removeTokensCT"
                        )}</td>
                        <td class="tg-d6y8" colspan="5"><select id="tokenSelect" name="tokenSelect">${tokenOptions}</select></td>
                        <td class="tg-d6y8" colspan="2">${game.i18n.localize(
                          "RQG.scripts.strikeranksHelper.removeUpdate"
                        )}</td>
                        <td class="tg-d6y8" colspan="1"><button id="updTokens" type="button"><i class="fas fa-sync-alt"></i></button></td>
                    </tr>
                    <tr>
                        <td class="tg-d6y8" colspan="2">${game.i18n.localize(
                          "RQG.scripts.strikeranksHelper.removeAll"
                        )}</td>
                        <td class="tg-d6y8" colspan="1"><button id="allDel" onclick="delfromCT(document.getElementById('tokenSelect').value, 0)" type="button"><i class="fas fa-minus-circle"></i></button></td>
                        <td class="tg-d6y8" colspan="2">${game.i18n.localize(
                          "RQG.scripts.strikeranksHelper.removeOnly"
                        )}</td>
                        <td class="tg-d6y8" colspan="1"><button id="alluDel" onclick="delfromCT(document.getElementById('tokenSelect').value, -1)" type="button"><i class="fas fa-minus-circle"></i></button></td>
                        <td class="tg-d6y8" colspan="1">${game.i18n.localize(
                          "RQG.scripts.strikeranksHelper.otherSR"
                        )}:</td>
                        <td class="tg-d6y8" colspan="2"><input type="number" id="srDelvalue" name="srDelvalue" value=0></td>
                        <td class="tg-d6y8" colspan="1"><button id="srDel" onclick="delfromCT(document.getElementById('tokenSelect').value, document.getElementById('srDelvalue').value)" type="button"><i class="fas fa-minus-circle"></i></button></td>
                    </tr>
                    <tr>
                        <td class="tg-049l" colspan="10"><b>${game.i18n.localize(
                          "RQG.scripts.strikeranksHelper.removeTokens"
                        )}</b>: ${game.i18n.localize(
        "RQG.scripts.strikeranksHelper.removeTokensHint"
      )};
                <b>${game.i18n.localize(
                  "RQG.scripts.strikeranksHelper.removeDesc"
                )}</b>: ${game.i18n.localize(
        "RQG.scripts.strikeranksHelper.removeDescHint"
      )}
                </td>
                    </tr>
                </tbody>
            </table>`;
  }

  contentString = contentString + `</form>`;

  new Dialog(
    {
      title: `${game.i18n.localize("RQG.scripts.strikeranksHelper.title")}` + ` v` + macroVersion,
      content: contentString,
      buttons: {
        cancel: {
          label: `${game.i18n.localize("RQG.scripts.general.exit")}`,
          callback: (html) => console.log("Cancelled"),
        },
      },
      default: "cancel",
    },
    myDialogOptions
  ).render(true);
}

await new Promise((resolve) => setTimeout(resolve, 250));
$(document).ready(function () {
  $("#updTokens").click(function () {
    let newtokenOptions = ``;
    if (game.combat !== null) {
      /*
        const mycombat = game.combat;
        const cttokens = Array.from(mycombat.data.combatants).map(function (a) {
          return { token: a.data.tokenId, actor: a.data.actorId };
        });
        const actors = Array.from(game.actors).map(function (a) {
          return { name: a.data.name, actor: a.data._id };
        });
        const actortokens = mergeById(cttokens, actors);
        const uniqueTokens = [
          ...new Map(actortokens.map((item) => [item["token"], item])).values(),
        ];
        newtokenOptions =
          `<option value="alltokens">All tokens</option>` +
          uniqueTokens.reduce(
            (a, b) =>
              (a += `<option value="${b.token}">${b.name} (${b.token})</option>`),
            ``
          );
          */
      const cttokens = Array.from(game.combat.data.combatants).map(function (
        a
      ) {
        return { tokenid: a.data.tokenId, actorid: a.data.actorId };
      });
      const actors = Array.from(game.actors).map(function (a) {
        return { actorname: a.data.name, actorid: a.data._id };
      });
      const tokens = canvas.tokens.placeables.map(function (a) {
        return { tokenname: a.name, tokenid: a.id };
      });
      const actortokens1 = cttokens.map((t1) => ({
        ...t1,
        ...actors.find((t2) => t2.actorid === t1.actorid),
      }));
      const actortokens = actortokens1.map((t1) => ({
        ...t1,
        ...tokens.find((t2) => t2.tokenid === t1.tokenid),
      }));
      const uniqueTokens = [
        ...new Map(actortokens.map((item) => [item["tokenid"], item])).values(),
      ];
      newtokenOptions =
        `<option value="alltokens">${game.i18n.localize(
          "RQG.scripts.strikeranksHelper.removeAllTokens"
        )}</option>` +
        uniqueTokens.reduce(
          (a, b) =>
            (a += `<option value="${b.tokenid}">${b.tokenname} (${b.tokenid})</option>`),
          ``
        );
    }
    $("select[name=tokenSelect]").empty();
    $("select[name=tokenSelect]").append(newtokenOptions);
  });
});
