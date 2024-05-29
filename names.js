const adjectives = [
    "Großer",
    "Kleiner",
    "Langer",
    "Kurzer",
    "Roter",
    "Blauer",
    "Grüner",
    "Pinker",
]

const subjectives = [
    "Hase",
    "Igel",
    "Bär",
]

function choose(values) {
    return values[Math.floor(Math.random() * values.length)]
}

export function name() {
    return `${choose(adjectives)} ${choose(subjectives)}`
}
