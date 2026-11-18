// Subtle foley sound score: paper transitions, phone taps, comedic accents
function scoreSound(k) {
  const from = window.SOUND_FROM || 0;
  for (const s of BEATS) {
    if (s.start + 0.1 >= from) {
      k.play('paper', s.start + 0.1, { dur: 0.25, gain: 0.08 });
    }
  }

  // Phone typing clicks in Scene 1 & 2
  if (1.5 >= from) k.play('key', 1.5, { gain: 0.05 });
  if (3.0 >= from) k.play('key', 3.0, { gain: 0.05 });
  if (9.5 >= from) k.play('key', 9.5, { gain: 0.05 });

  // Call incoming / answer sound at 20.6s
  if (20.6 >= from) k.play('blip', 20.6, { f: 'A5', dur: 0.1, gain: 0.08 });

  // The Twist surprise accent at 24.5s
  if (24.5 >= from) {
    k.play('pop', 24.5, { f: 380, gain: 0.12 });
  }

  // Hug snap / rustle at 28.0s
  if (28.0 >= from) {
    k.play('paper', 28.0, { dur: 0.3, gain: 0.1 });
  }

  // Running steps in chase scene 35.0 to 42.0
  for (let t = 35.0; t < 42.0; t += 0.5) {
    if (t >= from) {
      k.play('tock', t, { f: 160, gain: 0.05 });
    }
  }
}
