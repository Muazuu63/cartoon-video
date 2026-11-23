// DipuToons Sound Score - Strict Guard Dog Comedy (2D)
function scoreSound(score, t, scene) {
  if (Math.abs(t - 0.2) < 0.05) {
    score.play('pop', { gain: 0.2 });
  }
  if (Math.abs(t - 3.1) < 0.05) {
    score.play('blip', { gain: 0.25 });
  }
  if (Math.abs(t - 6.1) < 0.05) {
    score.play('pop', { gain: 0.2 });
  }
  if (Math.abs(t - 8.6) < 0.05) {
    score.play('click', { gain: 0.35 });
    score.play('paper', { gain: 0.25 });
  }
  if (Math.abs(t - 10.6) < 0.05) {
    score.play('blip', { gain: 0.3 });
  }
}
