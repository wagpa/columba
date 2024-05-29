const names = [
    "Großer Hund",
    "Kleine Katze",
    "Starker Löwe",
    "Schneller Tiger",
    "Großer Elefant",
    "Schnelles Pferd",
    "Fleissige Kuh",
    "Schlaues Schwein",
    "Weißes Schaf",
    "Braunes Huhn",
    "Lauter Hahn",
    "Ruhige Ente",
    "Fliegende Gans",
    "Majestätischer Adler",
    "Scharfer Falke",
    "Eifriger Pinguin",
    "Springendes Känguru",
    "Gemütlicher Panda",
    "Hohes Giraffe",
    "Kräftiges Nashorn",
    "Gestreiftes Zebra",
    "Schlauer Fuchs",
    "Ruhiger Wolf",
    "Starker Bär",
    "Witziger Affe",
    "Kluger Delfin",
    "Sanfter Wal",
    "Gefährlicher Hai",
    "Grünes Krokodil",
    "Lange Schlange",
    "Bunter Papagei",
    "Silberner Fisch",
    "Wilder Frosch",
    "Blaues Chamäleon",
    "Flinker Hase",
    "Ruhiges Meerschweinchen",
    "Freundlicher Hamster",
    "Weißer Schwan",
    "Flinker Igel",
    "Geschickter Otter",
    "Listige Eule",
    "Freundlicher Dachs",
    "Fleißige Biene",
    "Ruhiger Marienkäfer",
    "Bunter Schmetterling",
    "Wachsame Fledermaus",
    "Kräftiger Bison",
    "Gemütlicher Koala",
    "Weißer Eisbär",
    "Roter Panda",
    "Gelber Kanarienvogel",
    "Starkes Kamel",
    "Schneller Gepard",
    "Ruhiger Schwan",
    "Flinker Gecko",
    "Sanfte Taube",
    "Weißer Wal",
    "Schwarzer Rabe",
    "Grauer Wolf",
    "Goldener Fisch",
    "Kleiner Spatz",
    "Große Robbe",
    "Mächtiger Elch",
    "Schlanker Leopard",
    "Flinkes Wiesel",
    "Lauter Specht",
    "Leiser Luchs",
    "Brauner Bär",
    "Ruhiger Dachs",
    "Schneller Ozelot",
    "Sanfter Lemming",
    "Listiger Kojote",
    "Wachsame Wildkatze",
    "Freundlicher Waschbär",
    "Geschickter Biber",
    "Weiser Uhu",
    "Ruhige Taube",
    "Bunter Fink",
    "Grüner Leguan",
    "Flinker Marder",
    "Kleiner Dingo",
    "Schwarzer Panther",
    "Eifrige Ameise",
    "Wachsamer Mungo",
    "Fleißiger Termite",
    "Sanfter Koi",
    "Geschickter Schwertwal",
    "Lauter Kakadu",
    "Freundlicher Aras"
]

function choose(values) {
    return values[Math.floor(Math.random() * values.length)]
}

export function name() {
    return choose(names)
}
