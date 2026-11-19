// Foley sound score for Cat Job Interview (DipuToons)
function scoreSound(k) {
  const from = window.SOUND_FROM || 0;
  for (const s of BEATS) {
    if (s.start + 0.1 >= from) {
      k.play('paper', s.start + 0.1, { dur: 0.25, gain: 0.08 });
    }
  }

  // Scene 1: Intro Q&A pops
  if (1.5 >= from) k.play('blip', 1.5, { f: 'G4', dur: 0.08, gain: 0.06 });
  if (3.2 >= from) k.play('blip', 3.2, { f: 'C5', dur: 0.1, gain: 0.07 });
  if (4.2 >= from) k.play('pop', 4.2, { f: 520, gain: 0.09 }); // meow pop

  // Scene 2: Fridge & Sleep
  if (6.0 >= from) k.play('paper', 6.0, { dur: 0.2, gain: 0.06 });
  if (8.5 >= from) k.play('blip', 8.5, { f: 'D4', dur: 0.15, gain: 0.05 });

  // Scene 3: Zero stress chill
  if (11.5 >= from) k.play('paper', 11.5, { dur: 0.15, gain: 0.06 });
  if (13.2 >= from) k.play('blip', 13.2, { f: 'F5', dur: 0.2, gain: 0.08 });

  // Scene 4: Glass nudge and knock over
  if (17.5 >= from) k.play('tock', 17.5, { f: 600, gain: 0.08 }); // paw tap on glass
  if (18.2 >= from) k.play('tock', 18.2, { f: 750, gain: 0.10 }); // wobble
  if (18.8 >= from) k.play('pop', 18.8, { f: 300, gain: 0.14 });  // smash splash

  // Scene 5: Salary & Hilsa
  if (22.0 >= from) k.play('paper', 22.0, { dur: 0.18, gain: 0.07 });
  if (25.0 >= from) k.play('blip', 25.0, { f: 'A5', dur: 0.15, gain: 0.09 });

  // Scene 6: Stamp "HIRED!" and Chair twist
  if (31.0 >= from) k.play('pop', 31.0, { f: 220, gain: 0.15 }); // stamp thud
  if (35.5 >= from) k.play('blip', 35.5, { f: 'C6', dur: 0.2, gain: 0.12 }); // twist warning

  // Scene 7: Shock & Boss to the corner!
  if (39.0 >= from) k.play('pop', 39.0, { f: 180, gain: 0.18 }); // dramatic shock!
  if (41.5 >= from) k.play('blip', 41.5, { f: 'G5', dur: 0.15, gain: 0.08 });
  if (44.5 >= from) k.play('pop', 44.5, { f: 450, gain: 0.12 }); // boss relegated to corner!
}
