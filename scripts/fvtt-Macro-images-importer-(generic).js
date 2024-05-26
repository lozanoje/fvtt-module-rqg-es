//
// Images Importer (Generic) v1.5
// by Viriato139ac
//

const macroName = "Images Importer";
const macroVersion = "1.5";
const macroImage = "icons/sundries/books/book-leaves-circle.webp";

// functions

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

let myFolders = game.folders;
const foldersList = myFolders.map((t) => ({
  _id: t.id,
  name: t.data.name,
  select: `<option value="` + t.data.name + `">` + t.data.name + `</option>`,
}));
//console.log(foldersList);
let optionsfoldersList = foldersList
  .map(function (elem) {
    return elem.select;
  })
  .join();
console.log(optionsfoldersList);

// form definition

new Dialog(
  {
    title: `Images Importer (Generic)` + ` v` + macroVersion,
    content: `
  <script>
function selectimagespath() {
  const fp1 = new FilePicker({
    type: "folder",
    button: "image-picker",
    callback: (url) => {
      $("#imagespath").val(url);
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
        <td class="tg-r5a9" colspan="10"><span style="color:#FFF"><b>Select source folder and destination</b></span></td>
      </tr>
      <tr>
        <td class="tg-d6y8" colspan="2">Source image's folder:</td>
        <td class="tg-d6y8" colspan="6"><input type="text" id="imagespath" name="imagespath" value=""></td>
        <td class="tg-d6y8" colspan="2"><button id="buttonimagespath" onclick="selectimagespath()" type="button">${game.i18n.localize(
          "FILES.SelectFolder"
        )}</button></td>
      </tr>
      <tr>
        <td class="tg-d6y8" colspan="2">Destination journal folder:</td>
        <td class="tg-d6y8" colspan="8"><select id="journalfolder" name="journalfolder">${optionsfoldersList}</select></td>
      </tr>
      <tr>
        <td class="tg-049l" colspan="10">
				<b>Source</b>: Folder where the images are stored (png, jpg and webp supported)</br>
				<b>Destination</b>: Journal folder to place images imported
				</td>
      </tr>

    </tbody>
    </table>

  </form>
  `,
    buttons: {
      apply: {
        icon: "<i class='fas fa-check-circle'></i>",
        label: `Go!`,
        callback: () => {
          applyChanges = true;
        },
      },
      cancel: {
        icon: "<i class='fas fa-times-circle'></i>",
        label: `Cancel`,
        callback: () => {
          applyChanges = false;
        },
      },
    },
    default: "apply",
    close: async (html) => {
      if (applyChanges) {
        let imagespath = html.find('[name="imagespath"]')[0].value || "";
        let journalfolder = html.find('[name="journalfolder"]')[0].value || "";

        if (imagespath === "" || journalfolder === "") {
          console.log("Error in paths or deck name");
        } else {
          let imageFiles = await getFiles(
            imagespath,
            (extensions = [`.jpg`, `.jpeg`, `.png`, `.webp`])
          );

          let journalData = [];
          const folder = game.folders.getName(journalfolder).id;

          for (let file of imageFiles) {
            const fileName = decodeURIComponent(
              strip_extension(basename(file, "/"))
            );
            console.log(fileName);
            journalData.push({ name: fileName, img: file, folder });
          }
          JournalEntry.createDocuments(journalData);
        }
      }
    },
  },
  myDialogOptions
).render(true);
