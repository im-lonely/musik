import { audio } from "./Sound.js";
import { defaults } from "./defaults.js";
import { example } from "./example.js";

let isPlaying = false;

document.getElementById("play").addEventListener(
  "click",
  function () {
    if (example && !isPlaying) playMusic(example);
  },
  { once: false }
);

function playMusic(piece) {
  isPlaying = true;

  const { music } = piece;

  const tempoInMillisecs = 1000 / (piece.tempo / 60);

  let slowFastSignature = 0;

  music.forEach((notes, i) => {
    notes.split("").forEach((note) => {
      setTimeout(function () {
        slowFastSignature = playNote(note, slowFastSignature);
      }, i * tempoInMillisecs + slowFastSignature);
    });
  });

  setTimeout(function () {
    isPlaying = false;
  }, music.length * tempoInMillisecs + tempoInMillisecs);
}

function playNote(note, currentSlowFastSignature) {
  for (const [name, char] of Object.entries(defaults.key)) {
    if (note === ".") return currentSlowFastSignature;
    if (note === char) {
      audio[name].play();
      return currentSlowFastSignature;
    }
  }

  switch (note) {
    case "}":
      return currentSlowFastSignature + 1;
    case "{":
      return currentSlowFastSignature - 1;
    case "<":
      for (const [_, value] of Object.entries(audio))
        if (value.vol >= 0.1) value.changeVolume(value.vol - 0.1);
      return currentSlowFastSignature;
    case ">":
      for (const [_, value] of Object.entries(audio))
        if (value.vol >= 0.1) value.changeVolume(value.vol - 0.1);
      return currentSlowFastSignature;
  }
}
