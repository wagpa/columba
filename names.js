const adjectives = [
    "Großer",
    "Kleiner",
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
