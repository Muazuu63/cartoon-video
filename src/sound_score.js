// DipuToons Sound Score - Father Son 3D Comedy
function scoreSound(score, t, scene) {
  if (Math.abs(t - 0.2) < 0.05) {
    score.play('pop', { gain: 0.25 });
  }
  if (Math.abs(t - 2.5) < 0.05) {
    score.play('blip', { gain: 0.3 });
  }
  if (Math.abs(t - 4.5) < 0.05) {
    score.play('pop', { gain: 0.25 });
  }
  if (Math.abs(t - 6.5) < 0.05) {
    score.play('blip', { gain: 0.3 });
  }
  if (Math.abs(t - 8.0) < 0.05) {
    score.play('paper', { gain: 0.4 });
    score.play('pop', { gain: 0.35 });
  }
  if (Math.abs(t - 10.0) < 0.05) {
    score.play('blip', { gain: 0.4 });
  }
}
