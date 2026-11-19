// Foley sound score for Student & Teacher Comedy (DipuToons)
function scoreSound(k) {
  const from = window.SOUND_FROM || 0;

  // Scene 1: Initial Question (0.0 - 3.4)
  if (0.8 >= from) k.play('blip', 0.8, { f: 'A4', dur: 0.1, gain: 0.06 });
  if (2.6 >= from) k.play('pop', 2.6, { f: 280, gain: 0.05 });

  // Scene 2: Love Question (3.4 - 5.8)
  if (3.8 >= from) k.play('blip', 3.8, { f: 'C5', dur: 0.12, gain: 0.07 });
  if (5.0 >= from) k.play('pop', 5.0, { f: 310, gain: 0.06 });

  // Scene 3: Emne boltesi & Cold No (5.8 - 8.6)
  if (6.6 >= from) k.play('blip', 6.6, { f: 'E5', dur: 0.12, gain: 0.06 });
  if (8.0 >= from) k.play('pop', 8.0, { f: 220, gain: 0.08 });

  // Scene 4: Boyfriend Roast & Giggles (8.6 - 14.0)
  if (9.5 >= from) k.play('blip', 9.5, { f: 'G5', dur: 0.15, gain: 0.09 });
  if (11.0 >= from) k.play('pop', 11.0, { f: 440, gain: 0.08 });
  if (12.8 >= from) k.play('blip', 12.8, { f: 'D5', dur: 0.10, gain: 0.05 });

  // Scene 5: Marriage Question (14.0 - 18.8)
  if (14.8 >= from) k.play('blip', 14.8, { f: 'A4', dur: 0.12, gain: 0.06 });
  if (17.2 >= from) k.play('pop', 17.2, { f: 360, gain: 0.08 });

  // Scene 6: Marriage Invitation (18.8 - 23.2)
  if (19.4 >= from) k.play('pop', 19.4, { f: 290, gain: 0.06 });
  if (21.2 >= from) k.play('blip', 21.2, { f: 'C6', dur: 0.2, gain: 0.10 });

  // Scene 7: Ruler Chase & Climax (23.2 - 26.77)
  if (23.6 >= from) k.play('pop', 23.6, { f: 520, gain: 0.14 });
  if (24.2 >= from) k.play('paper', 24.2, { dur: 0.3, gain: 0.12 });
  if (25.0 >= from) k.play('blip', 25.0, { f: 'G4', dur: 0.3, gain: 0.08 });
}
