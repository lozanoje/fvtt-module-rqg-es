//
// Card to Canvas (Generic) v1.3
// by Viriato139ac
// based on previous code by @Zhell#9201

const macroName = "Card to Canvas";
const macroVersion = "1.3";
const macroImage = "icons/sundries/gaming/playing-cards.webp";

// Texts of the form

const labeltitle = "Card to Canvas";

const labelcardsDefinition = "Deck definition";
const labeldeckname = "Deck name";
const labeldecknameHint =
  "Name of the deck to draw the card. Must be created in advance";
const labelhandname = "Hand name";
const labelhandnameHint =
  "Name of the hand to deal cards to. Must be created in advance";

const labelpositionDefinition = "Card Position";
const labelpositionx = "x";
const labelpositionxHint = "Position of the card (x)";
const labelpositiony = "y";
const labelpositionyHint = "Position of the card (y)";
const labelpositionw = "width";
const labelpositionwHint = "Width of the card";
const labelpositionh = "height";
const labelpositionhHint = "Height of the card";
const labelpositionproportion = "Proportion";
const labelpositionproportionHint =
  "If proportion is 0, the size of the card will be widthxheight. If a percentage(1-100), the card will fit that percentage of the current scene, thus is: 25 means that cards will be, at most, 25% of the scene dimensions";

const labelproptype = "Adjustment";
const labelproptypeHint =
  "How do I adjust proportion, to fit the scene or to be contained in the scene?";

const TypeFit = "Fit";
const TypeContain = "Contain";

const labelMultiple = "Draw multiple cards";
const labelCards = "Number of cards";
const labelRows = "Rows";
const labelCols = "Columns";
const labelCardsHint = "Number of cards to be drawn";
const labelRowsHint = "Number of rows to arrange cards in a grid";
const labelColsHint = "Number of columns to arrange cards in a grid";

const labelapply = "Draw";
const labelcancel = "Cancel";

const errornocards = "Not enough cards remaining in the deck";
const errorpaths = "Error in paths or deck name";

// functions

function crearrejilla(x, y, w, h, nrows, ncols) {
  let positiondata = [];
  for (let i = 0; i < nrows; i++) {
    for (let j = 0; j < ncols; j++) {
      positiondata.push({
        f: i,
        c: j,
        x: x + w * j,
        y: y + h * i,
      });
      //console.log(j + "+" + i + "->",nrows,"x",ncols,"->",x+w*i,"x",y+h*j)
    }
  }
  return positiondata;
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
let decksList = cardsList.filter((t) => t.type === "deck");
let optionsdecksList = decksList
  .map(function (elem) {
    return elem.select;
  })
  .join();
let handsList = cardsList.filter((t) => t.type === "hand");
let optionshandsList = handsList
  .map(function (elem) {
    return elem.select;
  })
  .join();

let myTypes = [`<option value="fit">` + TypeFit + `</option>`];
myTypes.push(`<option value="contain">` + TypeContain + `</option>`);
let optionstypesList = myTypes.join();

// form definition

new Dialog(
  {
    title: labeltitle + ` v` + macroVersion,
    content: `
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
        <td class="tg-d6y8" colspan="2">${labeldeckname}:</td>
        <td class="tg-d6y8" colspan="8"><select id="deckname" name="deckname">${optionsdecksList}</select></td>
      </tr>
      <tr>
        <td class="tg-d6y8" colspan="2">${labelhandname}:</td>
        <td class="tg-d6y8" colspan="8"><select id="handname" name="handname">${optionshandsList}</select></td>
      </tr>
      <tr>
        <td class="tg-049l" colspan="10">
				<b>${labeldeckname}</b>: ${labeldecknameHint}</br>
				<b>${labelhandname}</b>: ${labelhandnameHint}
				</td>
      </tr>
      <tr>
        <td class="tg-r5a9" colspan="10"><span style="color:#FFF"><b>${labelpositionDefinition}</b></span></td>
      </tr>
      <tr>
        <td class="tg-d6y8" colspan="2">${labelpositionx}:</td>
        <td class="tg-d6y8" colspan="8"><input type="number" id="positionx" name="positionx" value=0></td>
      </tr>
      <tr>
        <td class="tg-d6y8" colspan="2">${labelpositiony}:</td>
        <td class="tg-d6y8" colspan="8"><input type="number" id="positiony" name="positiony" value=0></td>
      </tr>
      <tr>
        <td class="tg-d6y8" colspan="2">${labelpositionw}:</td>
        <td class="tg-d6y8" colspan="8"><input type="number" id="positionw" name="positionw" value=400></td>
      </tr>
      <tr>
        <td class="tg-d6y8" colspan="2">${labelpositionh}:</td>
        <td class="tg-d6y8" colspan="8"><input type="number" id="positionh" name="positionh" value=700></td>
      </tr>
      <tr>
        <td class="tg-d6y8" colspan="2">${labelpositionproportion}:</td>
        <td class="tg-d6y8" colspan="3"><input type="number" id="positionproportion" name="positionproportion" value=0></td>
        <td class="tg-d6y8" colspan="2">${labelproptype}:</td>
        <td class="tg-d6y8" colspan="3"><select id="proptype" name="proptype">${optionstypesList}</select></td>
      </tr>

      <tr>
        <td class="tg-049l" colspan="10">
				<b>${labelpositionx}</b>: ${labelpositionxHint}</br>
				<b>${labelpositiony}</b>: ${labelpositionyHint}</br>
				<b>${labelpositionw}</b>: ${labelpositionwHint}</br>
				<b>${labelpositionh}</b>: ${labelpositionhHint}</br>
				<b>${labelpositionproportion}</b>: ${labelpositionproportionHint}</br>
				<b>${labelproptype}</b>: ${labelproptypeHint}
				</td>
      </tr>
      <tr>
      <td class="tg-r5a9" colspan="10"><span style="color:#FFF"><b>${labelMultiple}</b></span></td>
    </tr>
    <tr>
      <td class="tg-d6y8" colspan="2">${labelCards}:</td>
      <td class="tg-d6y8" colspan="8"><input type="number" id="cards" name="cards" value=1></td>
    </tr>
    <tr>
      <td class="tg-d6y8" colspan="2">${labelRows}:</td>
      <td class="tg-d6y8" colspan="8"><input type="number" id="rows" name="rows" value=1></td>
    </tr>
    <tr>
      <td class="tg-d6y8" colspan="2">${labelCols}:</td>
      <td class="tg-d6y8" colspan="8"><input type="number" id="cols" name="cols" value=1></td>
    </tr>
    <tr>
      <td class="tg-049l" colspan="10">
      <b>${labelCards}</b>: ${labelCardsHint}</br>
      <b>${labelRows}</b>: ${labelRowsHint}</br>
      <b>${labelCols}</b>: ${labelColsHint}
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
        const SRC_DECK_NAME = html.find('[name="deckname"]')[0].value || "";
        const DST_CARD_PILE_NAME =
          html.find('[name="handname"]')[0].value || "";
        const CARD_WIDTH =
          parseInt(html.find('[name="positionw"]')[0].value) || 400;
        const CARD_HEIGHT =
          parseInt(html.find('[name="positionh"]')[0].value) || 700;
        const CARD_X = parseInt(html.find('[name="positionx"]')[0].value) || 0;
        const CARD_Y = parseInt(html.find('[name="positiony"]')[0].value) || 0;
        const PROPORTION =
          parseInt(html.find('[name="positionproportion"]')[0].value) || 0;
        const TYPEPROPORTION = html.find('[name="proptype"]')[0].value || "fit";

        const NUMBER_CARDS =
          parseInt(html.find('[name="cards"]')[0].value) || 1;
        const NUMBER_ROWS = parseInt(html.find('[name="rows"]')[0].value) || 1;
        const NUMBER_COLS = parseInt(html.find('[name="cols"]')[0].value) || 1;

        //console.log("Faces: " + facespath);
        //console.log("Backs: " + backspath);
        //console.log("Deck: " + deckname);
        //console.log("Name: " + nameback);

        const proportion_selection =
          TYPEPROPORTION === "fit"
            ? Math.min(
                (game.scenes.viewed.dimensions.width * PROPORTION) / 100,
                (((game.scenes.viewed.dimensions.height * PROPORTION) / 100) *
                  CARD_WIDTH) /
                  CARD_HEIGHT
              )
            : Math.max(
                (game.scenes.viewed.dimensions.width * PROPORTION) / 100,
                (((game.scenes.viewed.dimensions.height * PROPORTION) / 100) *
                  CARD_WIDTH) /
                  CARD_HEIGHT
              );

        if (deckname === "" || handname === "") {
          ui.notifications.info(errorpaths);
        } else {
          const cardwidth =
            PROPORTION === 0 ? CARD_WIDTH : proportion_selection;
          const cardheight = (cardwidth * CARD_HEIGHT) / CARD_WIDTH;
          console.log("Position: " + CARD_X + "x" + CARD_Y);
          console.log("Dimensions: " + cardwidth + "x" + cardheight);

          const rejilla = crearrejilla(
            CARD_X,
            CARD_Y,
            cardwidth,
            cardheight,
            NUMBER_ROWS,
            NUMBER_COLS
          );
          const ncards = Math.min(NUMBER_CARDS, NUMBER_ROWS * NUMBER_COLS);

          // get reference to src/dst cards objects
          let src_cards = game.cards.getName(SRC_DECK_NAME);
          let dst_cards = game.cards.getName(DST_CARD_PILE_NAME);

          if (src_cards.availableCards.length < ncards) {
            ui.notifications.info(errornocards);
          } else {
            for (let k = 0; k < ncards; k++) {
              src_cards = game.cards.getName(SRC_DECK_NAME);
              dst_cards = game.cards.getName(DST_CARD_PILE_NAME);
              // deal 1 random card and grab reference to the dealt card
              await src_cards.deal([dst_cards], 1, {
                how: CONST.CARD_DRAW_MODES.RANDOM,
                updateData: { face: 0 },
              });
              let most_recent_drawn =
                dst_cards.cards.contents[dst_cards.cards.size - 1];
              // Create TileDocument object in current scene using the card's face image
              let card_tile_data = {
                x: rejilla[k].x,
                y: rejilla[k].y,
                z: 100 + dst_cards.cards.size,
                width: cardwidth,
                height: cardheight,
                "texture.src":
                  most_recent_drawn.faces[most_recent_drawn.face].img,
              };
              await canvas.scene.createEmbeddedDocuments("Tile", [
                card_tile_data,
              ]);
            }
          }
        }
      }
    },
  },
  myDialogOptions
).render(true);
