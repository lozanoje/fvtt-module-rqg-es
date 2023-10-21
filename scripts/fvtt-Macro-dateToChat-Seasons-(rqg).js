//
// Date to Chat Seasons (RQG) v3.2
// by Moonpile
// localization by Viriato139ac
//
// Note: requires simple-calendar to work
// Glorantha calendar must be imported from modules/rqg-babele-es/calendars

const macroName = "Date to Chat";
const macroVersion = "3.2";
const macroImage = "icons/tools/navigation/watch-simple-blue.webp";

//const locerrormoon = `Moon image not found`;
//const locholyday = `Holy Day For`;
//const locnotes = `Notes`;
//const loccurrentday = `Current day in`;

//const locerrormoon = `No se ha encontrado el icono de la fase lunar`;
//const locholyday = `Día sagrado para`;
//const locnotes = `Notas`;
//const loccurrentday = `Estamos en`;

const locerrormoon = `${game.i18n.localize("RQG.scripts.dateToChat.errormoon")}`;
const locholyday = `${game.i18n.localize("RQG.scripts.dateToChat.holyday")}`;
const locnotes = `${game.i18n.localize("RQG.scripts.dateToChat.notes")}`;
const loccurrentday = `${game.i18n.localize("RQG.scripts.dateToChat.currentday")}`;

const calendarDays = [
  {
    seasonnumber: 1,
    seasonname: game.settings.get('foundryvtt-simple-calendar','month-config')[0].name,
    days: [
      {
        dayofseason: 1,
        dayofyear: 1,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [
          { cult: "Flamal", high: true, name: "" },
          { cult: "Yelm", high: false, name: "" },
        ],
        Other: ["Spring Equinox"],
      },
      {
        dayofseason: 2,
        dayofyear: 2,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 3,
        dayofyear: 3,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 4,
        dayofyear: 4,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [{ cult: "Valind", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 5,
        dayofyear: 5,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [{ cult: "Oakfed", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 6,
        dayofyear: 6,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 7,
        dayofyear: 7,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 8,
        dayofyear: 8,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [
          { cult: "Argan Argar", high: false, name: "" },
          { cult: "Kyger Litor", high: false, name: "" },
          { cult: "Uleria", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 9,
        dayofyear: 9,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [
          {
            cult: "Ernalda",
            high: false,
            name: "Flower Day (Shearing Day)*",
          },
          { cult: "Uleria", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 10,
        dayofyear: 10,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [{ cult: "Uleria", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 11,
        dayofyear: 11,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [{ cult: "Uleria", high: false, name: "" }],
        Other: ["Plow Blessing Day*"],
      },
      {
        dayofseason: 12,
        dayofyear: 12,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [{ cult: "Uleria", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 13,
        dayofyear: 13,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [{ cult: "Uleria", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 14,
        dayofyear: 14,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [{ cult: "Uleria", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 15,
        dayofyear: 15,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [{ cult: "Zorak Zoran", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 16,
        dayofyear: 16,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [{ cult: "Humakt", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 17,
        dayofyear: 17,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [{ cult: "Maran Gor", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 18,
        dayofyear: 18,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 19,
        dayofyear: 19,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 20,
        dayofyear: 20,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [
          { cult: "Tolat", high: false, name: "" },
          { cult: "Ty Kora Tek", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 21,
        dayofyear: 21,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [{ cult: "Waha", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 22,
        dayofyear: 22,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 23,
        dayofyear: 23,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [
          { cult: "Aldrya", high: true, name: "" },
          { cult: "Dormal", high: true, name: "" },
          { cult: "Flamal", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 24,
        dayofyear: 24,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [
          { cult: "Asrelia", high: false, name: "" },
          { cult: "Babeester Gor", high: false, name: "" },
          { cult: "Ernalda", high: false, name: "Honoring Day*" },
          { cult: "Eiritha", high: false, name: "" },
          { cult: "Lodril", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 25,
        dayofyear: 25,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [{ cult: "Basmol", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 26,
        dayofyear: 26,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [{ cult: "Mahome", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 27,
        dayofyear: 27,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [{ cult: "Chalana Arroy", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 28,
        dayofyear: 28,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 29,
        dayofyear: 29,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [{ cult: "Storm Bull", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 30,
        dayofyear: 30,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 31,
        dayofyear: 31,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 32,
        dayofyear: 32,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [],
        Other: ["Orlanthi Initiation Day*"],
      },
      {
        dayofseason: 33,
        dayofyear: 33,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 34,
        dayofyear: 34,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [{ cult: "Yinkin", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 35,
        dayofyear: 35,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [{ cult: "Gorgorma", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 36,
        dayofyear: 36,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 37,
        dayofyear: 37,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [
          { cult: "Engizi", high: true, name: "" },
          { cult: "Heler", high: true, name: "" },
          { cult: "Donandar", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 38,
        dayofyear: 38,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 39,
        dayofyear: 39,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [
          { cult: "Orlanth", high: false, name: "Sword Day*" },
          { cult: "Odayla", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 40,
        dayofyear: 40,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [
          { cult: "Gustbran", high: false, name: "" },
          { cult: "Lokarnos", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 41,
        dayofyear: 41,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [{ cult: "Issaries", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 42,
        dayofyear: 42,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 43,
        dayofyear: 43,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 44,
        dayofyear: 44,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 45,
        dayofyear: 45,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 46,
        dayofyear: 46,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 47,
        dayofyear: 47,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 48,
        dayofyear: 48,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [
          { cult: "Eurmal", high: false, name: "" },
          { cult: "Seven Mothers", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 49,
        dayofyear: 49,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 50,
        dayofyear: 50,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 51,
        dayofyear: 51,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 52,
        dayofyear: 52,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 53,
        dayofyear: 53,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 54,
        dayofyear: 54,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [{ cult: "Yelmalio", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 55,
        dayofyear: 55,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 56,
        dayofyear: 56,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [
          { cult: "Lhankor Mhy", high: false, name: "" },
          { cult: "Magasta", high: false, name: "" },
        ],
        Other: [],
      },
    ],
  },
  {
    seasonnumber: 2,
    seasonname: game.settings.get('foundryvtt-simple-calendar','month-config')[1].name,
    days: [
      {
        dayofseason: 1,
        dayofyear: 57,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 2,
        dayofyear: 58,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 3,
        dayofyear: 59,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 4,
        dayofyear: 60,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [{ cult: "Valind", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 5,
        dayofyear: 61,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [{ cult: "Oakfed", high: true, name: "" }],
        Other: [],
      },
      {
        dayofseason: 6,
        dayofyear: 62,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [{ cult: "Eurmal", high: true, name: "" }],
        Other: [],
      },
      {
        dayofseason: 7,
        dayofyear: 63,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 8,
        dayofyear: 64,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [
          { cult: "Kyger Litor", high: false, name: "" },
          { cult: "Uleria", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 9,
        dayofyear: 65,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [{ cult: "Uleria", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 10,
        dayofyear: 66,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [
          { cult: "Lodril", high: false, name: "" },
          { cult: "Uleria", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 11,
        dayofyear: 67,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [
          { cult: "Argan Argar", high: false, name: "" },
          { cult: "Uleria", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 12,
        dayofyear: 68,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [
          { cult: "Aldrya", high: true, name: "" },
          { cult: "Yelm", high: true, name: "" },
          { cult: "Yinkin", high: false, name: "" },
          { cult: "Uleria", high: false, name: "" },
        ],
        Other: ["Summer Solstice"],
      },
      {
        dayofseason: 13,
        dayofyear: 69,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [{ cult: "Uleria", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 14,
        dayofyear: 70,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [{ cult: "Uleria", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 15,
        dayofyear: 71,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [{ cult: "Zorak Zoran", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 16,
        dayofyear: 72,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 17,
        dayofyear: 73,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [{ cult: "Maran Gor", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 18,
        dayofyear: 74,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 19,
        dayofyear: 75,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [{ cult: "Humakt", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 20,
        dayofyear: 76,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [
          { cult: "Tolat", high: false, name: "" },
          { cult: "Ty Kora Tek", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 21,
        dayofyear: 77,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [{ cult: "Waha", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 22,
        dayofyear: 78,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 23,
        dayofyear: 79,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [{ cult: "Dormal", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 24,
        dayofyear: 80,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [
          { cult: "Asrelia", high: false, name: "" },
          { cult: "Babeester Gor", high: false, name: "" },
          { cult: "Ernalda", high: false, name: "Hearth Day*" },
          { cult: "Eiritha", high: false, name: "" },
          { cult: "Lodril", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 25,
        dayofyear: 81,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [{ cult: "Basmol", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 26,
        dayofyear: 82,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [{ cult: "Mahome", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 27,
        dayofyear: 83,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [{ cult: "Chalana Arroy", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 28,
        dayofyear: 84,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 29,
        dayofyear: 85,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 30,
        dayofyear: 86,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [{ cult: "Storm Bull", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 31,
        dayofyear: 87,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 32,
        dayofyear: 88,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [{ cult: "Sartar", high: true, name: "Founder Day*" }],
        Other: [],
      },
      {
        dayofseason: 33,
        dayofyear: 89,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 34,
        dayofyear: 90,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 35,
        dayofyear: 91,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [{ cult: "Gorgorma", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 36,
        dayofyear: 92,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 37,
        dayofyear: 93,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [
          { cult: "Engizi", high: false, name: "" },
          { cult: "Heler", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 38,
        dayofyear: 94,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 39,
        dayofyear: 95,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [
          { cult: "Orlanth", high: false, name: "Lawstaff Day*" },
          { cult: "Odayla", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 40,
        dayofyear: 96,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [
          { cult: "Gustbran", high: false, name: "" },
          { cult: "Lokarnos", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 41,
        dayofyear: 97,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [{ cult: "Issaries", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 42,
        dayofyear: 98,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [
          { cult: "Orlanth Rex", high: true, name: "Presentation Day*" },
        ],
        Other: [],
      },
      {
        dayofseason: 43,
        dayofyear: 99,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 44,
        dayofyear: 100,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 45,
        dayofyear: 101,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 46,
        dayofyear: 102,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 47,
        dayofyear: 103,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [{ cult: "Donandar", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 48,
        dayofyear: 104,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [{ cult: "Seven Mothers", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 49,
        dayofyear: 105,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 50,
        dayofyear: 106,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 51,
        dayofyear: 107,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 52,
        dayofyear: 108,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 53,
        dayofyear: 109,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 54,
        dayofyear: 110,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [{ cult: "Yelmalio", high: true, name: "" }],
        Other: [],
      },
      {
        dayofseason: 55,
        dayofyear: 111,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 56,
        dayofyear: 112,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [
          { cult: "Lhankor Mhy", high: false, name: "" },
          { cult: "Magasta", high: false, name: "" },
        ],
        Other: [],
      },
    ],
  },
  {
    seasonnumber: 3,
    seasonname: game.settings.get('foundryvtt-simple-calendar','month-config')[2].name,
    days: [
      {
        dayofseason: 1,
        dayofyear: 113,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 2,
        dayofyear: 114,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 3,
        dayofyear: 115,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 4,
        dayofyear: 116,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [{ cult: "Valind", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 5,
        dayofyear: 117,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [{ cult: "Oakfed", high: true, name: "" }],
        Other: [],
      },
      {
        dayofseason: 6,
        dayofyear: 118,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 7,
        dayofyear: 119,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 8,
        dayofyear: 120,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [
          { cult: "Kyger Litor", high: false, name: "" },
          { cult: "Uleria", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 9,
        dayofyear: 121,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [{ cult: "Uleria", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 10,
        dayofyear: 122,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [{ cult: "Uleria", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 11,
        dayofyear: 123,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [{ cult: "Uleria", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 12,
        dayofyear: 124,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [
          { cult: "Argan Argar", high: false, name: "" },
          { cult: "Uleria", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 13,
        dayofyear: 125,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [
          { cult: "Yinkin", high: false, name: "" },
          { cult: "Uleria", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 14,
        dayofyear: 126,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [{ cult: "Uleria", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 15,
        dayofyear: 127,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [
          { cult: "Babeester Gor", high: true, name: "" },
          { cult: "Zorak Zoran", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 16,
        dayofyear: 128,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 17,
        dayofyear: 129,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [
          { cult: "Humakt", high: false, name: "" },
          { cult: "Maran Gor", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 18,
        dayofyear: 130,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 19,
        dayofyear: 131,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 20,
        dayofyear: 132,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [
          { cult: "Tolat", high: false, name: "" },
          { cult: "Ty Kora Tek", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 21,
        dayofyear: 133,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [{ cult: "Waha", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 22,
        dayofyear: 134,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [
          { cult: "Ernalda", high: true, name: "" },
          { cult: "Asrelia", high: true, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 23,
        dayofyear: 135,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [
          { cult: "Ernalda", high: true, name: "" },
          { cult: "Asrelia", high: true, name: "" },
          { cult: "Dormal", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 24,
        dayofyear: 136,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [
          { cult: "Aldrya", high: true, name: "" },
          { cult: "Asrelia", high: true, name: "" },
          { cult: "Eiritha", high: true, name: "" },
          { cult: "Grain Goddess", high: true, name: "" },
          { cult: "Ernalda", high: true, name: "Great Goddess Day*" },
          { cult: "Babeester Gor", high: false, name: "" },
          { cult: "Flamal", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 25,
        dayofyear: 137,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [
          { cult: "Ernalda", high: true, name: "" },
          { cult: "Asrelia", high: true, name: "" },
          { cult: "Basmol", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 26,
        dayofyear: 138,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [
          { cult: "Ernalda", high: true, name: "" },
          { cult: "Asrelia", high: true, name: "" },
          { cult: "Lodril", high: true, name: "" },
          { cult: "Mahome", high: true, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 27,
        dayofyear: 139,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [
          { cult: "Ernalda", high: true, name: "" },
          { cult: "Asrelia", high: true, name: "" },
          { cult: "Chalana Arroy", high: false, name: "" },
          { cult: "Maran Gor", high: false, name: "Shutting the Door Day*" },
        ],
        Other: [],
      },
      {
        dayofseason: 28,
        dayofyear: 140,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [
          { cult: "Ernalda", high: true, name: "" },
          { cult: "Asrelia", high: true, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 29,
        dayofyear: 141,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 30,
        dayofyear: 142,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [],
        Other: ["Autumn Equinox"],
      },
      {
        dayofseason: 31,
        dayofyear: 143,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [{ cult: "Storm Bull", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 32,
        dayofyear: 144,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [{ cult: "Sartar", high: true, name: "Founder Day*" }],
        Other: [],
      },
      {
        dayofseason: 33,
        dayofyear: 145,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [{ cult: "Yelm", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 34,
        dayofyear: 146,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 35,
        dayofyear: 147,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [{ cult: "Gorgorma", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 36,
        dayofyear: 148,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 37,
        dayofyear: 149,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [
          { cult: "Engizi", high: false, name: "" },
          { cult: "Heler", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 38,
        dayofyear: 150,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 39,
        dayofyear: 151,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [
          { cult: "Orlanth", high: false, name: "Reaping Day*" },
          { cult: "Odayla", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 40,
        dayofyear: 152,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [
          { cult: "Lokarnos", high: true, name: "" },
          { cult: "Gustbran", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 41,
        dayofyear: 153,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [{ cult: "Issaries", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 42,
        dayofyear: 154,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 43,
        dayofyear: 155,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 44,
        dayofyear: 156,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 45,
        dayofyear: 157,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [{ cult: "Donandar", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 46,
        dayofyear: 158,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 47,
        dayofyear: 159,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 48,
        dayofyear: 160,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [
          { cult: "Eurmal", high: false, name: "" },
          { cult: "Seven Mothers", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 49,
        dayofyear: 161,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 50,
        dayofyear: 162,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 51,
        dayofyear: 163,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 52,
        dayofyear: 164,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 53,
        dayofyear: 165,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 54,
        dayofyear: 166,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [{ cult: "Yelmalio", high: true, name: "" }],
        Other: [],
      },
      {
        dayofseason: 55,
        dayofyear: 167,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 56,
        dayofyear: 168,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [
          { cult: "Lhankor Mhy", high: false, name: "" },
          { cult: "Magasta", high: false, name: "" },
        ],
        Other: [],
      },
    ],
  },
  {
    seasonnumber: 4,
    seasonname: game.settings.get('foundryvtt-simple-calendar','month-config')[3].name,
    days: [
      {
        dayofseason: 1,
        dayofyear: 169,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [{ cult: "Yinkin", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 2,
        dayofyear: 170,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 3,
        dayofyear: 171,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 4,
        dayofyear: 172,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [{ cult: "Valind", high: true, name: "" }],
        Other: [],
      },
      {
        dayofseason: 5,
        dayofyear: 173,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [{ cult: "Oakfed", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 6,
        dayofyear: 174,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [
          { cult: "Eurmal", high: false, name: "" },
          {
            cult: "Babeester Gor",
            high: false,
            name: "Axe Day or Blessing Day*",
          },
        ],
        Other: [],
      },
      {
        dayofseason: 7,
        dayofyear: 175,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [
          { cult: "Seven Mother", high: true, name: "" },
          { cult: "Kyger Litor", high: true, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 8,
        dayofyear: 176,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [
          { cult: "Kyger Litor", high: true, name: "" },
          { cult: "Uleria", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 9,
        dayofyear: 177,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [
          { cult: "Argan Argar", high: true, name: "" },
          { cult: "Uleria", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 10,
        dayofyear: 178,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [
          { cult: "Argan Argar", high: true, name: "" },
          { cult: "Uleria", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 11,
        dayofyear: 179,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [{ cult: "Uleria", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 12,
        dayofyear: 180,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [{ cult: "Uleria", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 13,
        dayofyear: 181,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [{ cult: "Uleria", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 14,
        dayofyear: 182,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [{ cult: "Uleria", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 15,
        dayofyear: 183,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [
          { cult: "Zorak Zoran", high: true, name: "" },
          { cult: "Humakt", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 16,
        dayofyear: 184,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [{ cult: "Humakt", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 17,
        dayofyear: 185,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [{ cult: "Maran Gor", high: true, name: "" }],
        Other: [],
      },
      {
        dayofseason: 18,
        dayofyear: 186,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [{ cult: "Lodril", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 19,
        dayofyear: 187,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [{ cult: "Lodril", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 20,
        dayofyear: 188,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [
          { cult: "Tolat", high: false, name: "" },
          { cult: "Ty Kora Tek", high: true, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 21,
        dayofyear: 189,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [{ cult: "Waha", high: true, name: "" }],
        Other: [],
      },
      {
        dayofseason: 22,
        dayofyear: 190,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [{ cult: "Waha", high: true, name: "" }],
        Other: [],
      },
      {
        dayofseason: 23,
        dayofyear: 191,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [{ cult: "Dormal", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 24,
        dayofyear: 192,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [
          { cult: "Asrelia", high: false, name: "" },
          { cult: "Babeester Gor", high: false, name: "" },
          { cult: "Ernalda", high: false, name: "Loom Blessing*" },
          { cult: "Eiritha", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 25,
        dayofyear: 193,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [{ cult: "Basmol", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 26,
        dayofyear: 194,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [{ cult: "Mahome", high: true, name: "" }],
        Other: [],
      },
      {
        dayofseason: 27,
        dayofyear: 195,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [{ cult: "Chalana Arroy", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 28,
        dayofyear: 196,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 29,
        dayofyear: 197,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 30,
        dayofyear: 198,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 31,
        dayofyear: 199,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 32,
        dayofyear: 200,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [{ cult: "Storm Bull", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 33,
        dayofyear: 201,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 34,
        dayofyear: 202,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 35,
        dayofyear: 203,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [{ cult: "Gorgorma", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 36,
        dayofyear: 204,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 37,
        dayofyear: 205,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [
          { cult: "Engizi", high: false, name: "" },
          { cult: "Heler", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 38,
        dayofyear: 206,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [{ cult: "Aldrya", high: true, name: "" }],
        Other: [],
      },
      {
        dayofseason: 39,
        dayofyear: 207,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [
          { cult: "Orlanth", high: false, name: "Protection Day*" },
          { cult: "Odayla", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 40,
        dayofyear: 208,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [
          { cult: "Lokarnos", high: false, name: "" },
          { cult: "Gustbran", high: false, name: "" },
          { cult: "Yelm", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 41,
        dayofyear: 209,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [{ cult: "Issaries", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 42,
        dayofyear: 210,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 43,
        dayofyear: 211,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [
          { cult: "Donandar", high: false, name: "" },
          { cult: "Ernalda", high: false, name: "Shroud Day*" },
        ],
        Other: [],
      },
      {
        dayofseason: 44,
        dayofyear: 212,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 45,
        dayofyear: 213,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 46,
        dayofyear: 214,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 47,
        dayofyear: 215,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [{ cult: "Magasta", high: true, name: "" }],
        Other: ["Winter Solstice"],
      },
      {
        dayofseason: 48,
        dayofyear: 216,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [{ cult: "Seven Mothers", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 49,
        dayofyear: 217,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 50,
        dayofyear: 218,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 51,
        dayofyear: 219,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 52,
        dayofyear: 220,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 53,
        dayofyear: 221,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 54,
        dayofyear: 222,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [{ cult: "Yelmalio", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 55,
        dayofyear: 223,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 56,
        dayofyear: 224,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [
          { cult: "Lhankor Mhy", high: false, name: "" },
          { cult: "Magasta", high: false, name: "" },
        ],
        Other: [],
      },
    ],
  },
  {
    seasonnumber: 5,
    seasonname: game.settings.get('foundryvtt-simple-calendar','month-config')[4].name,
    days: [
      {
        dayofseason: 1,
        dayofyear: 225,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 2,
        dayofyear: 226,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 3,
        dayofyear: 227,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 4,
        dayofyear: 228,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [{ cult: "Valind", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 5,
        dayofyear: 229,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [{ cult: "Oakfed", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 6,
        dayofyear: 230,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 7,
        dayofyear: 231,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 8,
        dayofyear: 232,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [
          { cult: "Argan Argar", high: false, name: "" },
          { cult: "Kyger Litor", high: false, name: "" },
          { cult: "Uleria", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 9,
        dayofyear: 233,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [{ cult: "Uleria", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 10,
        dayofyear: 234,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [{ cult: "Uleria", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 11,
        dayofyear: 235,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [
          { cult: "Donandar", high: true, name: "" },
          { cult: "Uleria", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 12,
        dayofyear: 236,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [{ cult: "Uleria", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 13,
        dayofyear: 237,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [{ cult: "Uleria", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 14,
        dayofyear: 238,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"),
        HolyDays: [{ cult: "Uleria", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 15,
        dayofyear: 239,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [{ cult: "Zorak Zoran", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 16,
        dayofyear: 184,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [{ cult: "Humakt", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 17,
        dayofyear: 185,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [{ cult: "Maran Gor", high: true, name: "" }],
        Other: [],
      },
      {
        dayofseason: 18,
        dayofyear: 186,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [{ cult: "Lodril", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 19,
        dayofyear: 187,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [{ cult: "Lodril", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 20,
        dayofyear: 188,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [
          { cult: "Tolat", high: false, name: "" },
          { cult: "Ty Kora Tek", high: true, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 21,
        dayofyear: 189,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"),
        HolyDays: [{ cult: "Waha", high: true, name: "" }],
        Other: [],
      },
      {
        dayofseason: 22,
        dayofyear: 190,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [{ cult: "Waha", high: true, name: "" }],
        Other: [],
      },
      {
        dayofseason: 23,
        dayofyear: 191,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [{ cult: "Dormal", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 24,
        dayofyear: 192,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [
          { cult: "Asrelia", high: false, name: "" },
          { cult: "Babeester Gor", high: false, name: "" },
          { cult: "Ernalda", high: false, name: "Loom Blessing*" },
          { cult: "Eiritha", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 25,
        dayofyear: 193,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [{ cult: "Basmol", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 26,
        dayofyear: 194,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [{ cult: "Mahome", high: true, name: "" }],
        Other: [],
      },
      {
        dayofseason: 27,
        dayofyear: 195,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [{ cult: "Chalana Arroy", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 28,
        dayofyear: 196,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 29,
        dayofyear: 197,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 30,
        dayofyear: 198,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 31,
        dayofyear: 199,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 32,
        dayofyear: 200,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [{ cult: "Storm Bull", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 33,
        dayofyear: 201,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 34,
        dayofyear: 202,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 35,
        dayofyear: 203,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"),
        HolyDays: [{ cult: "Gorgorma", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 36,
        dayofyear: 204,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 37,
        dayofyear: 205,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [
          { cult: "Engizi", high: false, name: "" },
          { cult: "Heler", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 38,
        dayofyear: 206,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [{ cult: "Aldrya", high: true, name: "" }],
        Other: [],
      },
      {
        dayofseason: 39,
        dayofyear: 207,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [
          { cult: "Orlanth", high: false, name: "Protection Day*" },
          { cult: "Odayla", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 40,
        dayofyear: 208,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [
          { cult: "Lokarnos", high: false, name: "" },
          { cult: "Gustbran", high: false, name: "" },
          { cult: "Yelm", high: false, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 41,
        dayofyear: 209,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [{ cult: "Issaries", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 42,
        dayofyear: 210,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 43,
        dayofyear: 211,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [
          { cult: "Donandar", high: false, name: "" },
          { cult: "Ernalda", high: false, name: "Shroud Day*" },
        ],
        Other: [],
      },
      {
        dayofseason: 44,
        dayofyear: 212,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 45,
        dayofyear: 213,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 46,
        dayofyear: 214,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 47,
        dayofyear: 215,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [{ cult: "Magasta", high: true, name: "" }],
        Other: ["Winter Solstice"],
      },
      {
        dayofseason: 48,
        dayofyear: 216,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [{ cult: "Seven Mothers", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 49,
        dayofyear: 217,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 50,
        dayofyear: 218,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 51,
        dayofyear: 219,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 52,
        dayofyear: 220,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 53,
        dayofyear: 221,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 54,
        dayofyear: 222,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [{ cult: "Yelmalio", high: false, name: "" }],
        Other: [],
      },
      {
        dayofseason: 55,
        dayofyear: 223,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [],
        Other: [],
      },
      {
        dayofseason: 56,
        dayofyear: 224,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"),
        HolyDays: [
          { cult: "Lhankor Mhy", high: false, name: "" },
          { cult: "Magasta", high: false, name: "" },
        ],
        Other: [],
      },
    ],
  },
  {
    seasonnumber: 6,
    seasonname: game.settings.get('foundryvtt-simple-calendar','month-config')[5].name,
    days: [
      {
        dayofseason: 1,
        dayofyear: 225,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.luck"),
        HolyDays: [{ cult: "Daka Fal", high: true, name: "" }],
        Other: [],
      },
      {
        dayofseason: 2,
        dayofyear: 226,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.luck"),
        HolyDays: [{ cult: "Daka Fal", high: true, name: "" }],
        Other: [],
      },
      {
        dayofseason: 3,
        dayofyear: 227,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.luck"),
        HolyDays: [{ cult: "Daka Fal", high: true, name: "" }],
        Other: [],
      },
      {
        dayofseason: 4,
        dayofyear: 228,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.luck"),
        HolyDays: [
          { cult: "Basmol", high: true, name: "" },
          { cult: "Daka Fal", high: true, name: "" },
          { cult: "Lightbringers", high: true, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 5,
        dayofyear: 229,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.luck"),
        HolyDays: [{ cult: "Daka Fal", high: true, name: "" }],
        Other: [],
      },
      {
        dayofseason: 6,
        dayofyear: 230,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.luck"),
        HolyDays: [
          { cult: "Daka Fal", high: true, name: "" },
          { cult: "Issaries", high: true, name: "" },
          { cult: "Red Goddess", high: true, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 7,
        dayofyear: 231,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.luck"),
        HolyDays: [
          { cult: "Daka Fal", high: true, name: "" },
          { cult: "Lhankor Mhy", high: true, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 8,
        dayofyear: 232,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[0].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fate"),
        HolyDays: [
          { cult: "Chalana Arroy", high: true, name: "" },
          { cult: "Daka Fal", high: true, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 9,
        dayofyear: 233,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[1].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fate"),
        HolyDays: [
          { cult: "Chalana Arroy", high: true, name: "" },
          { cult: "Daka Fal", high: true, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 10,
        dayofyear: 234,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[2].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fate"),
        HolyDays: [
          { cult: "Chalana Arroy", high: true, name: "" },
          { cult: "Daka Fal", high: true, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 11,
        dayofyear: 235,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[3].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fate"),
        HolyDays: [
          { cult: "Basmol", high: true, name: "" },
          { cult: "Chalana Arroy", high: true, name: "" },
          { cult: "Daka Fal", high: true, name: "" },
          { cult: "Lightbringers", high: true, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 12,
        dayofyear: 236,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[4].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fate"),
        HolyDays: [
          { cult: "Chalana Arroy", high: true, name: "" },
          { cult: "Daka Fal", high: true, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 13,
        dayofyear: 237,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[5].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fate"),
        HolyDays: [
          { cult: "Chalana Arroy", high: true, name: "" },
          { cult: "Daka Fal", high: true, name: "" },
          { cult: "Issaries", high: true, name: "" },
          { cult: "Red Goddess", high: true, name: "" },
        ],
        Other: [],
      },
      {
        dayofseason: 14,
        dayofyear: 238,
        dayname: game.settings.get('foundryvtt-simple-calendar','weekday-config')[6].name,
        weekname: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fate"),
        HolyDays: [
          { cult: "Chalana Arroy", high: true, name: "" },
          { cult: "Daka Fal", high: true, name: "" },
          { cult: "Lhankor Mhy", high: true, name: "" },
        ],
        Other: [],
      },
    ],
  },
];

const seasonrunes = [
  { name: "Water", img: "systems/rqg/assets/images/runes/water.svg" },
  { name: "Fire", img: "systems/rqg/assets/images/runes/fire_sky.svg" },
  { name: "Earth", img: "systems/rqg/assets/images/runes/earth.svg" },
  { name: "Darkness", img: "systems/rqg/assets/images/runes/darkness.svg" },
  { name: "Air", img: "systems/rqg/assets/images/runes/air.svg" },
  { name: "Gods", img: "systems/rqg/assets/images/runes/god.svg" },
];

const dayrunes = [
  { name: "Darkness", img: "systems/rqg/assets/images/runes/darkness.svg" },
  { name: "Water", img: "systems/rqg/assets/images/runes/water.svg" },
  { name: "Earth", img: "systems/rqg/assets/images/runes/earth.svg" },
  { name: "Air", img: "systems/rqg/assets/images/runes/air.svg" },
  { name: "Fire/Sky", img: "systems/rqg/assets/images/runes/fire_sky.svg" },
  { name: game.i18n.localize("RQG.scripts.dateToChat.weeknames.luck"), img: "systems/rqg/assets/images/runes/luck.svg" },
  { name: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fate"), img: "systems/rqg/assets/images/runes/fate.svg" },
];

const weekrunes = [
  { name: game.i18n.localize("RQG.scripts.dateToChat.weeknames.disorder"), img: "systems/rqg/assets/images/runes/disorder.svg" },
  { name: game.i18n.localize("RQG.scripts.dateToChat.weeknames.harmony"), img: "systems/rqg/assets/images/runes/harmony.svg" },
  { name: game.i18n.localize("RQG.scripts.dateToChat.weeknames.death"), img: "systems/rqg/assets/images/runes/death.svg" },
  { name: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fertility"), img: "systems/rqg/assets/images/runes/fertility.svg" },
  { name: game.i18n.localize("RQG.scripts.dateToChat.weeknames.stasis"), img: "systems/rqg/assets/images/runes/stasis.svg" },
  { name: game.i18n.localize("RQG.scripts.dateToChat.weeknames.movement"), img: "systems/rqg/assets/images/runes/movement_change.svg"},
  { name: game.i18n.localize("RQG.scripts.dateToChat.weeknames.illusion"), img: "systems/rqg/assets/images/runes/illusion.svg" },
  { name: game.i18n.localize("RQG.scripts.dateToChat.weeknames.truth"), img: "systems/rqg/assets/images/runes/truth.svg" },
];

const sacredweekrunes = [
  { name: game.i18n.localize("RQG.scripts.dateToChat.weeknames.luck"), img: "systems/rqg/assets/images/runes/luck.svg" },
  { name: game.i18n.localize("RQG.scripts.dateToChat.weeknames.fate"), img: "systems/rqg/assets/images/runes/fate.svg" },
];

  // Note that "Black" and "Dying" moons have the same svg
const moonimgs = [
  { name: game.settings.get('foundryvtt-simple-calendar','moon-configuration')[0].phases[0].name, img: "systems/rqg/assets/images/runes/moon_full.svg" },
  { name: game.settings.get('foundryvtt-simple-calendar','moon-configuration')[0].phases[1].name, img: "systems/rqg/assets/images/runes/moon_full_half.svg" },
  { name: game.settings.get('foundryvtt-simple-calendar','moon-configuration')[0].phases[2].name, img: "systems/rqg/assets/images/runes/moon_crescent_go.svg" },
  { name: game.settings.get('foundryvtt-simple-calendar','moon-configuration')[0].phases[3].name, img: "systems/rqg/assets/images/runes/moon_black.svg" },
  { name: game.settings.get('foundryvtt-simple-calendar','moon-configuration')[0].phases[4].name, img: "systems/rqg/assets/images/runes/moon_black.svg" },
  { name: game.settings.get('foundryvtt-simple-calendar','moon-configuration')[0].phases[5].name, img: "systems/rqg/assets/images/runes/moon_crescent_come.svg" },
  { name: game.settings.get('foundryvtt-simple-calendar','moon-configuration')[0].phases[6].name, img: "systems/rqg/assets/images/runes/moon_empty_half.svg" },
];


await dateToChatSeasons();

async function dateToChatSeasons(whisper = true, whisperTo = ["gm"]) {
  if (!game.modules.get("foundryvtt-simple-calendar")?.active) {
    ui.notifications?.error("simple-calendar module not installed!");
    return;
  }

  // unless we're whispering, this will make the chat public
  let whisperRecipients = [];

  if (whisper && whisperTo) {
    // whisper to everyone provided in whisperTo
    whisperTo.forEach((name) => {
      whisperRecipients = whisperRecipients.concat(
        ChatMessage.getWhisperRecipients(name).map((r) => r.id)
      );
    });
  } else if (whisper) {
    // only whisper to gm, this is the default behavior when called with no parameters
    whisperRecipients = whisperRecipients.concat(
      ChatMessage.getWhisperRecipients("gm").map((r) => r.id)
    );
  }

  const day = SimpleCalendar.api.getCurrentDay();
  const month = SimpleCalendar.api.getCurrentMonth();
  let dayofweekindex = (day.numericRepresentation % 7) - 1;

  if (dayofweekindex === -1) {
    dayofweekindex = 6;
  }
  console.log("DAY OF WEEK INDEX: ", dayofweekindex)
  const dayofweek = SimpleCalendar.api.getAllWeekdays()[dayofweekindex];

  console.log("DAY OF WEEK NUM", dayofweekindex);
  const dayofweekrune = dayrunes[dayofweekindex];

  const weeknum = ~~(day.numericRepresentation / 7);

  let weekrune;

  if (month.numericRepresentation === 6) {
    // Sacred time
    weekrune = sacredweekrunes[weeknum];
  } else {
    weekrune = weekrunes[weeknum];
  }

  const seasonrune = seasonrunes[month.numericRepresentation - 1];
  const year = SimpleCalendar.api.getCurrentYear();
  const redmoon = SimpleCalendar.api.getAllMoons()[0];

  const moonimg = moonimgs.find((i) => i.name === redmoon.currentPhase.name);

  if (!moonimg) {
    console.log(locerrormoon);
    return;
  }

  const daysinyear = 56 * 5 + 14;
  const dayofyear =
    (Number(month.numericRepresentation) - 1) * 56 +
    Number(day.numericRepresentation);
  const daysleftinyear = daysinyear - dayofyear;

  const calendarseason = calendarDays[Number(month.numericRepresentation) - 1];

  const calendarday = calendarseason.days.find(
    (d) => d.dayofseason === day.numericRepresentation
  );

  const flags = {
    year: year,
    moonimg: moonimg,
    redmoon: redmoon,
    dayofweekrune: dayofweekrune,
    dayofweek: dayofweek,
    weekrune: weekrune,
    seasonrune: seasonrune,
    month: month,
    daysinyear: daysinyear,
    dayofyear: dayofyear,
    daysleftinyear: daysleftinyear,
    calendarday: calendarday,
  };

  console.log("Calendar Chat Flags: ", flags);

  let holyDaysListItems = "";
  flags.calendarday.HolyDays.forEach((cult) => {
    let holyDayName = "";
    if (cult.name) {
      holyDayName = `- ${cult.name}`;
    }
    if (cult.high) {
      holyDaysListItems += `
          <li>
            <span style="color: red;text-transform: uppercase;">${cult.cult}</span> ${holyDayName}
          </li>`;
    } else {
      holyDaysListItems += `
          <li>
            <span>${cult.cult}</span> ${holyDayName}
          </li>`;
    }
  });

  let otherListItems = "";
  flags.calendarday.Other.forEach((other) => {
    otherListItems += `<li>
       <span>${other}</span> 
    </li>`;
  });

  const html = `<form class="card-form" data-chat-card="dateToChatCard">
  <div style="display: grid; grid-template-columns: 3fr 1fr;">
    <div>
      <h1>${loccurrentday} ${game.settings.get("foundryvtt-simple-calendar","year-config").prefix} ${flags.year.numericRepresentation} ${game.settings.get("foundryvtt-simple-calendar","year-config").postfix}</h1>
    </div>
    <div>
      <img
        class="rune"
        style="border: none; margin: 0; padding: 0 2px; position: relative; top: 2px; filter: drop-shadow(0px 0px 20px rgb(168, 0, 0));"
        src="${flags.moonimg.img}"
        title="${flags.redmoon.name}: ${flags.moonimg.name}"
      />
    </div>
  </div>

  <div style="display: grid; grid-template-columns: 1fr 6fr;">
    <div>
      <img
        class="rune"
        style="height: 16px; border: none; margin: 0; padding: 0 2px; position: relative; top: 2px;"
        src="${flags.dayofweekrune.img}"
        title="${flags.dayofweekrune.name}"
      />
    </div>
    <div>
      ${flags.dayofweek.name}
    </div>
    <div>
      <img
        class="rune"
        style="height: 16px; border: none; margin: 0; padding: 0 2px; position: relative; top: 2px;"
        src="${flags.weekrune.img}"
        title="${flags.weekrune.name}"
      />

    </div>
    <div>${game.i18n.format("RQG.scripts.dateToChat.week",
              {
                weekrune: `${flags.weekrune.name}`,
              }
            )}</div>
    <div>
      <img
        class="rune"
        style="height: 16px; border: none; margin: 0; padding: 0 2px; position: relative; top: 2px;"
        src="${flags.seasonrune.img}"
        title="${flags.seasonrune.name}"
      />
    </div>
    <div>
      ${flags.month.name}
    </div>
  </div>
  <div>${game.i18n.format("RQG.scripts.dateToChat.daysremaining",
              {
                dayofyear: `${flags.dayofyear}`,
                daysinyear: `${flags.daysinyear}`,
                daysleftinyear: `${flags.daysleftinyear}`,
              }
            )}</div>
    <div>
      <h2>${locholyday}:</h2>
      <ul>
        ${holyDaysListItems}
      </ul>
    </div>
    <div>
      <h2>${locnotes}:</h2>
      <ul>
        ${otherListItems}
      </ul>
</form>`;

  ChatMessage.create({
    user: game.userId.id,
    speaker: ChatMessage.getSpeaker(),
    whisper: whisperRecipients,
    content: html,
  });
}
