// Foley sound score for Father & Son Marriage Joke (DipuToons)
function scoreSound(k) {
  const from = window.SOUND_FROM || 0;
  for (const s of BEATS) {
    if (s.start + 0.1 >= from) {
      k.play('paper', s.start + 0.1, { dur: 0.25, gain: 0.08 });
    }
  }

  // Scene 1: Kid questioning blip
  if (0.8 >= from) k.play('blip', 0.8, { f: 'A4', dur: 0.1, gain: 0.06 });

  // Scene 2: Dad answer
  if (2.8 >= from) k.play('blip', 2.8, { f: 'D4', dur: 0.12, gain: 0.05 });

  // Scene 3: Kid second question
  if (5.2 >= from) k.play('blip', 5.2, { f: 'C5', dur: 0.1, gain: 0.07 });

  // Scene 4: Dad proud "আমাকে"
  if (7.2 >= from) k.play('pop', 7.2, { f: 320, gain: 0.08 });

  // Scene 5: Kid cheeky punchline "নিজেরাই নিজেরায়..."
  if (8.8 >= from) k.play('blip', 8.8, { f: 'G5', dur: 0.2, gain: 0.10 });
  if (9.8 >= from) k.play('pop', 9.8, { f: 480, gain: 0.12 });

  // Scene 6: Laughter & Outro snap
  if (11.0 >= from) k.play('paper', 11.0, { dur: 0.3, gain: 0.08 });
}
