//
// Deck Creator (Generic) v1.5
// by Viriato139ac
// based on previous code by @Skimble#8601

const macroName = "Deck Creator";
const macroVersion = "1.5";
const macroImage = "icons/sundries/gaming/playing-cards.webp";

// Texts of the form

// const labeltitle = "Deck Creator";
// const labelapply = "Import";
// const labelcancel = "Cancel";
// const labelcardsDefinition = "Deck definition";
// const labelfacespath = "Face images directory";
// const labelbackspath = "Back images directory";
// const labeldeckback = "Deck's back image";
// const labeldeckname = "Deck name";
// const labelnameback = "Back card name";
// const labelcardtype = "Card type";
// const labelfacespathHint = "Path where the images for faces are stored";
// const labelbackspathHint = "Path where back images are stored. The images are cycled to the length of the faces images. If you specify a directory where there is only one image, the image is used for al faces, if there are as many as faces, backs will match each face in the same order";
// const labeldeckbackHint = "Back image of the deck (it will change current back image of the deck)";
// const labeldecknameHint = "Name of the deck to insert the cards. Must be created in advance";
// const labelnamebackHint = "Text that is used for back of the card. It is not generally used";
// const labelcardtypeHint = "Type of the cards in the deck";
// const labelnamebackexample = "Back card";
// const TypeBase = "Base";
// const TypeDestiny = "Destiny";
// const TypeDrama = "Drama";
// const TypeCosm = "Cosm";

const labeltitle = `${game.i18n.localize("scripts.deckCreator.title")}`;
const labelapply = `${game.i18n.localize("scripts.deckCreator.apply")}`;
const labelcancel = `${game.i18n.localize("scripts.deckCreator.cancel")}`;
const labelcardsDefinition = `${game.i18n.localize("scripts.deckCreator.cardsDefinition")}`;
const labelfacespath = `${game.i18n.localize("scripts.deckCreator.facespath")}`;
const labelfacespathHint = `${game.i18n.localize("scripts.deckCreator.facespathHint")}`;
const labelbackspath = `${game.i18n.localize("scripts.deckCreator.backspath")}`;
const labelbackspathHint = `${game.i18n.localize("scripts.deckCreator.backspathHint")}`;
const labeldeckback = `${game.i18n.localize("scripts.deckCreator.deckback")}`;
const labeldeckbackHint = `${game.i18n.localize("scripts.deckCreator.deckbackHint")}`;
const labeldeckname = `${game.i18n.localize("scripts.deckCreator.deckname")}`;
const labeldecknameHint = `${game.i18n.localize("scripts.deckCreator.decknameHint")}`;
const labelnameback = `${game.i18n.localize("scripts.deckCreator.nameback")}`;
const labelnamebackHint = `${game.i18n.localize("scripts.deckCreator.namebackHint")}`;
const labelnamebackexample = `${game.i18n.localize("scripts.deckCreator.namebackexample")}`;
const labelcardtype = `${game.i18n.localize("scripts.deckCreator.cardtype")}`;
const labelcardtypeHint = `${game.i18n.localize("scripts.deckCreator.cardtypeHint")}`;
const TypeBase = `${game.i18n.localize("scripts.deckCreator.TypeBase")}`;
const TypeDestiny = `${game.i18n.localize("torgeternity.cardTypes.destiny")}`;
const TypeDrama = `${game.i18n.localize("torgeternity.cardTypes.drama")}`;
const TypeCosm = `${game.i18n.localize("torgeternity.cardTypes.cosm")}`;

// functions

function repeat(arr, toLength) {
  let output = [...arr];
  while (output.length < toLength) output = [...output, ...arr];
  return output.slice(0, toLength);
}

async function getFiles(target, extensions = ``, source = `user`) {
  extensions = extensions instanceof Array ? extensions : [extensions];
  let filePicker = await FilePicker.browse(source, target, { extensions });
  if (filePicker.files) return [...filePicker.files];
  return [];
}

function basename(str, sep) {
  return str.substr(str.lastIndexOf(sep) + 1);
}

function strip_extension(str) {
  return str.substr(0, str.lastIndexOf("."));
}

// constants

let applyChanges = false;

const myDialogOptions = {
  width: 640,
  //height: 800,
  //top: 500,
  //left: 500
};

let myCards = game.cards;
const cardsList = myCards.map((t) => ({
  _id: t.id,
  name: t.data.name,
  type: t.data.type,
  select: `<option value="` + t.data.name + `">` + t.data.name + `</option>`,
}));
//console.log(cardsList);
let decksList = cardsList.filter((t) => t.type === "deck");
let optionsdecksList = decksList
  .map(function (elem) {
    return elem.select;
  })
  .join();
//console.log(optionsdecksList);

let myTypes = [`<option value="base">` + TypeBase + `</option>`];
if (game.system.id === "torgeternity") {
  myTypes.push(`<option value="destiny">` + TypeDestiny + `</option>`);
  myTypes.push(`<option value="drama">` + TypeDrama + `</option>`);
  myTypes.push(`<option value="cosm">` + TypeCosm + `</option>`);
}
let optionstypesList = myTypes.join();
//console.log(optionstypesList);

// form definition

new Dialog(
  {
    title: labeltitle + ` v` + macroVersion,
    content: `
  <script>
function selectfacespath() {
  const fp1 = new FilePicker({
    type: "folder",
    button: "image-picker",
    callback: (url) => {
      $("#facespath").val(url);
    }
  });
  fp1.browse();
}
  </script>
  <script>
function selectbackspath() {
  const fp1 = new FilePicker({
    type: "folder",
    button: "image-picker",
    callback: (url) => {
      $("#backspath").val(url);
    }
  });
  fp1.browse();
}
  </script>
  <script>
function selectdeckback() {
  const fp1 = new FilePicker({
    type: "image",
    button: "image-picker",
    callback: (url) => {
      $("#deckback").val(url);
    }
  });
  fp1.browse();
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
    </style>
    <table class="tg">
    <tbody>
      <tr>
        <td class="tg-r5a9" colspan="10"><span style="color:#FFF"><b>${labelcardsDefinition}</b></span></td>
      </tr>
      <tr>
        <td class="tg-d6y8" colspan="2">${labelfacespath}:</td>
        <td class="tg-d6y8" colspan="6"><input type="text" id="facespath" name="facespath" value=""></td>
        <td class="tg-d6y8" colspan="2"><button id="buttonfacespath" onclick="selectfacespath()" type="button">${game.i18n.localize(
          "FILES.SelectFolder"
        )}</button></td>
      </tr>
      <tr>
        <td class="tg-d6y8" colspan="2">${labelbackspath}:</td>
        <td class="tg-d6y8" colspan="6"><input type="text" id="backspath" name="backspath" value=""></td>
        <td class="tg-d6y8" colspan="2"><button id="buttonbackspath" onclick="selectbackspath()" type="button">${game.i18n.localize(
          "FILES.SelectFolder"
        )}</button></td>
      </tr>
      <tr>
        <td class="tg-d6y8" colspan="2">${labeldeckback}:</td>
        <td class="tg-d6y8" colspan="6"><input type="text" id="deckback" name="deckback" value=""></td>
        <td class="tg-d6y8" colspan="2"><button id="buttondeckback" onclick="selectdeckback()" type="button">${game.i18n.localize(
          "FILES.SelectFile"
        )}</button></td>
      </tr>
      <tr>
        <td class="tg-d6y8" colspan="2">${labeldeckname}:</td>
        <td class="tg-d6y8" colspan="8"><select id="deckname" name="deckname">${optionsdecksList}</select></td>
      </tr>
      <tr>
        <td class="tg-d6y8" colspan="2">${labelcardtype}:</td>
        <td class="tg-d6y8" colspan="8"><select id="cardtype" name="cardtype">${optionstypesList}</select></td>
      </tr>
      <tr>
        <td class="tg-d6y8" colspan="2">${labelnameback}:</td>
        <td class="tg-d6y8" colspan="8"><input type="text" id="nameback" name="nameback" value="${labelnamebackexample}"></td>
      </tr>
      <tr>
        <td class="tg-049l" colspan="10">
				<b>${labelfacespath}</b>: ${labelfacespathHint}</br>
				<b>${labelbackspath}</b>: ${labelbackspathHint}</br>
				<b>${labeldeckback}</b>: ${labeldeckbackHint}</br>
				<b>${labeldeckname}</b>: ${labeldecknameHint}</br>
				<b>${labelcardtype}</b>: ${labelcardtypeHint}</br>
				<b>${labelnameback}</b>: ${labelnamebackHint}
				</td>
      </tr>

    </tbody>
    </table>

  </form>
  `,
    buttons: {
      apply: {
        icon: "<i class='fas fa-check-circle'></i>",
        label: labelapply,
        callback: () => {
          applyChanges = true;
        },
      },
      cancel: {
        icon: "<i class='fas fa-times-circle'></i>",
        label: labelcancel,
        callback: () => {
          applyChanges = false;
        },
      },
    },
    default: "apply",
    close: async (html) => {
      if (applyChanges) {
        let facespath = html.find('[name="facespath"]')[0].value || "";
        let backspath = html.find('[name="backspath"]')[0].value || "";
        let deckname = html.find('[name="deckname"]')[0].value || "";
        let cardtype = html.find('[name="cardtype"]')[0].value || "base";
        let nameback = html.find('[name="nameback"]')[0].value || "Card back";
        let deckback =
          html.find('[name="deckback"]')[0].value || "icons/svg/card-hand.svg";

        //console.log("Faces: " + facespath);
        //console.log("Backs: " + backspath);
        //console.log("Deck: " + deckname);
        //console.log("Name: " + nameback);
        if (facespath === "" || backspath === "" || deckname === "") {
          console.log("Error in paths or deck name");
        } else {
          //console.log(repeat([1, 2, 3], 7));
          //console.log(repeat([1, 2, 3], 2));

          let facecards = await getFiles(
            facespath,
            (extensions = [`.jpg`, `.jpeg`, `.png`, `.webp`])
          );
          let backcards1 = await getFiles(
            backspath,
            (extensions = [`.jpg`, `.jpeg`, `.png`, `.webp`])
          );
          let backcards = repeat(backcards1, facecards.length);
          //console.log(facecards);
          //console.log(backcards);

          let deck = game.cards.getName(deckname);
          deck.update({ img: deckback });

          let newcardsdef = [];
          let cardName;
          let faceName;
          let backName;

          for (let i = 0; i < facecards.length; i++) {
            faceName = facecards[i];
            backName = backcards[i];
            cardName = decodeURIComponent(
              strip_extension(basename(faceName, "/"))
            );
            //console.log(cardName);

            newcardsdef.push({
              name: cardName,
              origin: deck.id,
              description: cardName,
              type: cardtype,
              back: { img: backName, name: nameback },
              faces: [{ img: faceName, name: cardName }],
              face: 0,
            });
          }
          //console.log(newcardsdef);

          deck.createEmbeddedDocuments("Card", newcardsdef);
        }
      }
    },
  },
  myDialogOptions
).render(true);
