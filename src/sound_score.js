// Foley sound score for Wife Suspicion & Houri Twist (DipuToons)
function scoreSound(k) {
  const from = window.SOUND_FROM || 0;
  for (const s of BEATS) {
    if (s.start + 0.1 >= from) {
      k.play('paper', s.start + 0.1, { dur: 0.25, gain: 0.08 });
    }
  }

  // Scene 1: Friendly question blip
  if (0.8 >= from) k.play('blip', 0.8, { f: 'G4', dur: 0.1, gain: 0.06 });

  // Scene 2: Pious explanation rustle
  if (3.0 >= from) k.play('paper', 3.0, { dur: 0.2, gain: 0.05 });
  if (5.5 >= from) k.play('blip', 5.5, { f: 'C5', dur: 0.15, gain: 0.06 });

  // Scene 3: Imitating wife complaint
  if (8.5 >= from) k.play('pop', 8.5, { f: 420, gain: 0.08 });

  // Scene 4: Punchline shock & accent
  if (11.0 >= from) k.play('blip', 11.0, { f: 'A5', dur: 0.2, gain: 0.12 });
  if (12.5 >= from) k.play('pop', 12.5, { f: 260, gain: 0.15 });

  // Scene 5: Laughter snap
  if (14.0 >= from) k.play('paper', 14.0, { dur: 0.3, gain: 0.08 });
}
