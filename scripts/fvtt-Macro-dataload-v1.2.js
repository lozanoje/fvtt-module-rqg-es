//
// Data Load (Generic) v1.2
// by Viriato139ac
//

const macroName = "Data Load";
const macroVersion = "1.2";
const macroImage = "icons/magic/acid/dissolve-arm-flesh.webp";

// data being sent to your players when they load in


const myDialogOptions = {
    width: 480,
    resizable: true,
    //height: 800,
    //top: 500,
    //left: 500
};

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

dataLoad();

function dataLoad() {

let actorsl = Math.round10(JSON.stringify(game.actors).length/1000, -1);
let journall = Math.round10(JSON.stringify(game.journal).length/1000, -1);
let scenesl = Math.round10(JSON.stringify(game.scenes).length/1000, -1);
let itemsl = Math.round10(JSON.stringify(game.items).length/1000, -1);
let playlistsl = Math.round10(JSON.stringify(game.playlists).length/1000, -1);
let chatl = Math.round10(JSON.stringify(ui.chat.collection).length/1000, -1);
let totall = Math.round10(actorsl+journall+scenesl+itemsl+playlistsl+chatl, -1);
//ui.notifications.notify(actorsl+journall+scenesl+itemsl+playlistsl+chatl)


    let contentString = `
  <form>
  <style type="text/css">
  .tg  {border-collapse:collapse;border-color:#ccc;border-spacing:0;}
  .tg td{background-color:#fff;border-color:#ccc;border-style:solid;border-width:1px;color:#333;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:2px 2px;word-break:normal;}
  .tg .tg-bzmm{background-color:#34696d;border-color:#ffffff;font-family:"Courier New", Courier, monospace !important;;text-align:left;vertical-align:middle}
  .tg .tg-d6y8{border-color:#efefef;font-family:"Courier New", Courier, monospace !important;;text-align:right;vertical-align:middle}
  .tg .tg-ly6r{border-color:#efefef;text-align:left;vertical-align:middle}
  .tg .tg-r5a9{background-color:#34696d;border-color:#efefef;color:#ffffff;font-family:"Courier New", Courier, monospace !important;;text-align:left;vertical-align:middle}
  .tg .tg-r5a1{background-color:#d437ac;border-color:#efefef;color:#ffffff;font-family:"Courier New", Courier, monospace !important;;text-align:left;vertical-align:middle}
  .tg .tg-049l{background-color:#f0f0f0;border-color:#efefef;font-family:"Courier New", Courier, monospace !important;;font-size:12px;text-align:left;vertical-align:middle}  
  </style>
  <table class="tg">
      <tbody>
          <tr>
              <td class="tg-r5a9" colspan="1"><span style="color:#FFF"><b>${game.i18n.localize("RQG.scripts.dataLoad.actors")}</b></span></td>
              <td class="tg-d6y8" colspan="3">${actorsl} Kb</td>
          </tr>
          <tr>
              <td class="tg-r5a9" colspan="1"><span style="color:#FFF"><b>${game.i18n.localize("RQG.scripts.dataLoad.journals")}</b></span></td>
              <td class="tg-d6y8" colspan="3">${journall} Kb</td>
          </tr>
          <tr>
              <td class="tg-r5a9" colspan="1"><span style="color:#FFF"><b>${game.i18n.localize("RQG.scripts.dataLoad.scenes")}</b></span></td>
              <td class="tg-d6y8" colspan="3">${scenesl} Kb</td>
          </tr>
          <tr>
              <td class="tg-r5a9" colspan="1"><span style="color:#FFF"><b>${game.i18n.localize("RQG.scripts.dataLoad.items")}</b></span></td>
              <td class="tg-d6y8" colspan="3">${itemsl} Kb</td>
          </tr>
          <tr>
              <td class="tg-r5a9" colspan="1"><span style="color:#FFF"><b>${game.i18n.localize("RQG.scripts.dataLoad.playlists")}</b></span></td>
              <td class="tg-d6y8" colspan="3">${playlistsl} Kb</td>
          </tr>
          <tr>
              <td class="tg-r5a9" colspan="1"><span style="color:#FFF"><b>${game.i18n.localize("RQG.scripts.dataLoad.chat")}</b></span></td>
              <td class="tg-d6y8" colspan="3">${chatl} Kb</td>
          </tr>
          <tr>
              <td class="tg-r5a1" colspan="1"><span style="color:#FFF"><b>${game.i18n.localize("RQG.scripts.dataLoad.total")}</b></span></td>
              <td class="tg-d6y8" colspan="3">${totall} Kb</td>
          </tr>
          <tr>
              <td class="tg-d6y8" colspan="4">${game.i18n.localize("RQG.scripts.dataLoad.comment")}</td>
          </tr>
      </tbody>
  </table>
  </form>`;
	
    new Dialog(
        {
            title: `${game.i18n.localize("RQG.scripts.dataLoad.title")}` + ` v` + macroVersion,
            content: contentString,
            buttons: {
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
