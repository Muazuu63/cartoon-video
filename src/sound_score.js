// DipuToons Sound Score - Beggar vs Bhagwan 3D Comedy
function scoreSound(score, t, scene) {
  if (Math.abs(t - 0.2) < 0.05) {
    score.play('pop', { gain: 0.25 });
  }
  if (Math.abs(t - 2.8) < 0.05) {
    score.play('blip', { gain: 0.3 });
  }
  if (Math.abs(t - 5.5) < 0.05) {
    score.play('pop', { gain: 0.25 });
  }
  if (Math.abs(t - 10.5) < 0.05) {
    score.play('click', { gain: 0.4 });
  }
  if (Math.abs(t - 14.0) < 0.05) {
    score.play('blip', { gain: 0.35 });
  }
  if (Math.abs(t - 22.2) < 0.05) {
    score.play('paper', { gain: 0.4 });
    score.play('pop', { gain: 0.35 });
  }
  if (Math.abs(t - 31.3) < 0.05) {
    score.play('blip', { gain: 0.4 });
  }
}
