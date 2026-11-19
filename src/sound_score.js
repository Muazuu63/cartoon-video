// Foley sound score for Money Borrowing Phone Comedy (DipuToons)
function scoreSound(k) {
  const from = window.SOUND_FROM || 0;

  // Call 1 (0.0 - 4.5)
  if (0.5 >= from) k.play('blip', 0.5, { f: 'A5', dur: 0.1, gain: 0.06 });
  if (2.5 >= from) k.play('click', 2.5, { gain: 0.08 });
  if (3.2 >= from) k.play('pop', 3.2, { f: 440, gain: 0.08 });

  // Call 2 (4.5 - 11.5)
  if (5.2 >= from) k.play('blip', 5.2, { f: 'C5', dur: 0.1, gain: 0.06 });
  if (7.8 >= from) k.play('pop', 7.8, { f: 320, gain: 0.07 });
  if (9.2 >= from) k.play('blip', 9.2, { f: 'E5', dur: 0.12, gain: 0.09 });

  // Call 3 (11.5 - 25.0)
  if (12.2 >= from) k.play('blip', 12.2, { f: 'D5', dur: 0.1, gain: 0.06 });
  if (14.2 >= from) k.play('pop', 14.2, { f: 360, gain: 0.07 });
  if (17.5 >= from) k.play('pop', 17.5, { f: 580, gain: 0.12 });
  if (20.5 >= from) k.play('blip', 20.5, { f: 'G4', dur: 0.15, gain: 0.08 });
  if (23.2 >= from) k.play('pop', 23.2, { f: 260, gain: 0.10 });

  // Call 4 (25.0 - 34.5)
  if (26.0 >= from) k.play('blip', 26.0, { f: 'F5', dur: 0.1, gain: 0.07 });
  if (28.2 >= from) k.play('pop', 28.2, { f: 480, gain: 0.09 });
  if (31.5 >= from) k.play('blip', 31.5, { f: 'C6', dur: 0.2, gain: 0.12 });

  // Outro (34.5 - 38.04)
  if (35.0 >= from) k.play('paper', 35.0, { dur: 0.3, gain: 0.10 });
}
