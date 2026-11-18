
// Full-Color 2D Cartoon Animation Engine - Seal Love Story (Two Standing Seals in Pool)
const DURATION = CONFIG.duration;
const BEATS = CONFIG.scenes;

// ----------------------------------------------------
// Utility Math & Drawing Functions
// ----------------------------------------------------
function strokeFill(ctx, fill, stroke, lw = 3.5) {
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); }
}

function drawCircle(ctx, x, y, r, fill, stroke, lw = 3) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  strokeFill(ctx, fill, stroke, lw);
}

function drawRoundRect(ctx, x, y, w, h, rad, fill, stroke, lw = 3) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, rad);
  strokeFill(ctx, fill, stroke, lw);
}

function wrap(ctx, text, width) {
  const words = text.split(/\s+/);
  const out = [];
  let s = '';
  for (const w of words) {
    const n = s ? s + ' ' + w : w;
    if (ctx.measureText(n).width > width && s) {
      out.push(s);
      s = w;
    } else {
      s = n;
    }
  }
  if (s) out.push(s);
  return out;
}

// ----------------------------------------------------
// Aquarium Pool Water & Caustics Background
// ----------------------------------------------------
function drawPoolBG(ctx, W, H, t) {
  // Crystal Blue Ocean / Aquarium Pool Gradient
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#48cae4');
  grad.addColorStop(0.35, '#0096c7');
  grad.addColorStop(0.75, '#023e8a');
  grad.addColorStop(1, '#03045e');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Sunlight water caustics / light bands
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.lineWidth = 6;
  for (let i = 0; i < 7; i++) {
    const waveY = (H * 0.12) + i * (H * 0.12);
    const waveOffset = Math.sin(t * 1.5 + i * 1.2) * 25;
    ctx.beginPath();
    ctx.moveTo(0, waveY + waveOffset);
    ctx.bezierCurveTo(W * 0.25, waveY - 20 + waveOffset, W * 0.75, waveY + 20 + waveOffset, W, waveY + waveOffset);
    ctx.stroke();
  }
  ctx.restore();

  // Floating ambient bubbles rising
  ctx.save();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.lineWidth = 1.5;

  const bubbleSeeds = [
    { x: 0.12, spd: 45, r: 8, seed: 1 },
    { x: 0.28, spd: 55, r: 12, seed: 2 },
    { x: 0.45, spd: 40, r: 6, seed: 3 },
    { x: 0.65, spd: 60, r: 10, seed: 4 },
    { x: 0.82, spd: 50, r: 14, seed: 5 },
    { x: 0.92, spd: 38, r: 7, seed: 6 }
  ];

  bubbleSeeds.forEach(b => {
    const by = H - ((t * b.spd + b.seed * 180) % (H + 50));
    const bx = W * b.x + Math.sin(t * 2 + b.seed) * 15;
    ctx.beginPath();
    ctx.arc(bx, by, b.r, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
    // Bubble shine highlight
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(bx - b.r * 0.35, by - b.r * 0.35, b.r * 0.28, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  });
  ctx.restore();
}

// ----------------------------------------------------
// Swimming Background Seal (Gliding through pool)
// ----------------------------------------------------
function drawSwimmingSeal(ctx, x, y, scale, dir, t) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale * dir, scale);

  const wiggle = Math.sin(t * 5) * 6;

  // Streamlined Torpedo Seal Body
  ctx.beginPath();
  ctx.ellipse(0, 0, 75, 26, 0.05, 0, Math.PI * 2);
  strokeFill(ctx, 'rgba(80, 110, 130, 0.4)', 'rgba(40, 70, 90, 0.5)', 3);

  // Rear Flukes / Tail
  ctx.fillStyle = 'rgba(80, 110, 130, 0.4)';
  ctx.strokeStyle = 'rgba(40, 70, 90, 0.5)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(68, 0);
  ctx.quadraticCurveTo(100, -18 + wiggle, 115, -12 + wiggle);
  ctx.lineTo(85, 0);
  ctx.quadraticCurveTo(100, 18 + wiggle, 115, 12 + wiggle);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Side Flipper
  ctx.beginPath();
  ctx.ellipse(-10, 12, 22, 9, 0.4, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();

  // Round Head & Snout
  drawCircle(ctx, -75, -2, 18, 'rgba(80, 110, 130, 0.4)', 'rgba(40, 70, 90, 0.5)', 3);
  drawCircle(ctx, -82, 0, 3, 'rgba(20, 30, 40, 0.6)', null);

  ctx.restore();
}

// ----------------------------------------------------
// The Upright Standing Seal (Hero or Wingman)
// ----------------------------------------------------
function drawStandingSeal(ctx, x, y, s, t, isHero, isSpeaking, mood, p) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Natural Vertical Water Buoyancy Bob
  const bob = Math.sin(t * 3.5 + (isHero ? 0 : 1.2)) * 6;
  const sway = Math.sin(t * 2.0 + (isHero ? 0 : 1.2)) * 0.04;
  ctx.translate(0, bob);
  ctx.rotate(sway);

  // Color Palette
  const bodyColor = isHero ? '#3d3f47' : '#9c8167';
  const bellyColor = isHero ? '#6c6f7a' : '#cbb49d';
  const outline = '#1a1c22';
  const noseColor = '#111215';

  // 1. Rear Underwater Tail Flukes
  const tailSway = Math.sin(t * 4 + (isHero ? 0 : 1.5)) * 10;
  ctx.save();
  ctx.translate(0, 125);
  ctx.fillStyle = bodyColor; ctx.strokeStyle = outline; ctx.lineWidth = 3.5;
  // Left fluke
  ctx.beginPath();
  ctx.moveTo(-10, 0);
  ctx.quadraticCurveTo(-38, 25 + tailSway, -32, 45 + tailSway);
  ctx.lineTo(0, 20);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  // Right fluke
  ctx.beginPath();
  ctx.moveTo(10, 0);
  ctx.quadraticCurveTo(38, 25 - tailSway, 32, 45 - tailSway);
  ctx.lineTo(0, 20);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.restore();

  // 2. Upright Plump Body (Like Standing Person)
  ctx.beginPath();
  ctx.ellipse(0, 35, 48, 105, 0, 0, Math.PI * 2);
  strokeFill(ctx, bodyColor, outline, 4.5);

  // Belly / Chest Highlight
  ctx.beginPath();
  ctx.ellipse(isHero ? 6 : 0, 42, 32, 85, 0, 0, Math.PI * 2);
  strokeFill(ctx, bellyColor, null);

  // 3. Cute Mottled Spots on Hero Seal (Just like in the reference video!)
  if (isHero) {
    ctx.fillStyle = '#222329';
    const spots = [
      { x: -18, y: -25, r: 3.5 }, { x: 5, y: -35, r: 4.5 }, { x: 22, y: -22, r: 3 },
      { x: -12, y: 15, r: 4 }, { x: 14, y: 5, r: 5 }, { x: -4, y: 32, r: 4 },
      { x: 18, y: 45, r: 3.5 }, { x: -15, y: 65, r: 4.5 }, { x: 8, y: 75, r: 4 }
    ];
    spots.forEach(sp => {
      drawCircle(ctx, sp.x, sp.y, sp.r, '#222329', null);
    });
  }

  // 4. Front Flippers
  const isPushing = (!isHero && (mood === 'pushing' || mood === 'final_push'));
  const isShy = (isHero && (mood === 'shy' || mood === 'scared' || mood === 'love'));

  if (isPushing) {
    // Wingman pushing Hero seal playfully!
    const nudge = Math.sin(t * 8) * 8;
    ctx.save();
    ctx.translate(28, 10);
    ctx.rotate(0.35 + nudge * 0.03);
    // Right extended flipper
    ctx.beginPath();
    ctx.ellipse(22 + nudge, 5, 26, 11, 0.25, 0, Math.PI * 2);
    strokeFill(ctx, bodyColor, outline, 3.5);
    ctx.restore();

    // Left resting flipper
    ctx.beginPath();
    ctx.ellipse(-38, 25, 14, 28, 0.25, 0, Math.PI * 2);
    strokeFill(ctx, bodyColor, outline, 3.5);
  } else if (isShy) {
    // Hero clutching flippers shyly against chest
    const tremble = (mood === 'scared') ? (Math.sin(t * 35) * 2) : 0;
    ctx.save();
    ctx.translate(tremble, 0);
    // Left flipper
    ctx.beginPath();
    ctx.ellipse(-14, 25, 15, 24, 0.45, 0, Math.PI * 2);
    strokeFill(ctx, bodyColor, outline, 3.5);
    // Right flipper
    ctx.beginPath();
    ctx.ellipse(14, 25, 15, 24, -0.45, 0, Math.PI * 2);
    strokeFill(ctx, bodyColor, outline, 3.5);
    ctx.restore();
  } else {
    // Normal upright relaxed flippers
    ctx.beginPath();
    ctx.ellipse(-38, 25, 14, 30, 0.2, 0, Math.PI * 2);
    strokeFill(ctx, bodyColor, outline, 3.5);
    ctx.beginPath();
    ctx.ellipse(38, 25, 14, 30, -0.2, 0, Math.PI * 2);
    strokeFill(ctx, bodyColor, outline, 3.5);
  }

  // 5. Cute Round Seal Head
  const headX = isHero ? 4 : 0;
  const headY = -68;
  drawCircle(ctx, headX, headY, 32, bodyColor, outline, 4.5);

  // Snout (Lighter color muzzle)
  ctx.beginPath();
  ctx.ellipse(headX, headY + 14, 18, 12, 0, 0, Math.PI * 2);
  strokeFill(ctx, bellyColor, outline, 3);

  // Shiny Black Nose
  drawCircle(ctx, headX, headY + 8, 5.5, noseColor, null);
  drawCircle(ctx, headX - 1.5, headY + 6.5, 1.8, '#ffffff', null);

  // Mouth & Quivers
  const mouthOpen = isSpeaking ? (Math.abs(Math.sin(t * 16)) * 8 + 2) : 2;
  if (isSpeaking && mouthOpen > 4) {
    ctx.fillStyle = '#ff6b81'; ctx.strokeStyle = outline; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(headX, headY + 18, 6, mouthOpen * 0.7, 0, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
  } else {
    // Cute cat-like seal smile
    ctx.strokeStyle = outline; ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(headX - 5, headY + 16, 5, 0.2, Math.PI * 0.85);
    ctx.arc(headX + 5, headY + 16, 5, 0.15, Math.PI * 0.8);
    ctx.stroke();
  }

  // Whiskers (Signature seal feature!)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)'; ctx.lineWidth = 1.8;
  [-1, 1].forEach(dir => {
    ctx.beginPath(); ctx.moveTo(headX + dir * 6, headY + 14); ctx.lineTo(headX + dir * 32, headY + 8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(headX + dir * 6, headY + 16); ctx.lineTo(headX + dir * 35, headY + 17); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(headX + dir * 6, headY + 18); ctx.lineTo(headX + dir * 30, headY + 25); ctx.stroke();
  });

  // 6. Expressive Big Glossy Puppy Eyes
  const eyeX1 = headX - 12, eyeX2 = headX + 12;
  const eyeY = headY - 4;

  if (mood === 'love') {
    // Love Heart Eyes! 😍
    ctx.font = '24px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('💖', eyeX1, eyeY);
    ctx.fillText('💖', eyeX2, eyeY);
  } else if (mood === 'scared') {
    // Wide panicked shaking eyes with sweat drops
    drawCircle(ctx, eyeX1, eyeY, 8.5, '#ffffff', outline, 2.5);
    drawCircle(ctx, eyeX2, eyeY, 8.5, '#ffffff', outline, 2.5);
    drawCircle(ctx, eyeX1 + (isHero ? 2 : 0), eyeY, 3, '#1a1c22', null);
    drawCircle(ctx, eyeX2 + (isHero ? 2 : 0), eyeY, 3, '#1a1c22', null);

    // Sweat Drop 💧
    ctx.fillStyle = '#48cae4';
    drawCircle(ctx, headX + 24, headY - 14, 4.5, '#48cae4', '#0096c7', 1.5);
  } else {
    // Big dark glossy seal eyes with light sparkles
    drawCircle(ctx, eyeX1, eyeY, 7.5, '#15171c', outline, 2.5);
    drawCircle(ctx, eyeX2, eyeY, 7.5, '#15171c', outline, 2.5);
    // Sparkles
    drawCircle(ctx, eyeX1 - 2, eyeY - 2.5, 2.5, '#ffffff', null);
    drawCircle(ctx, eyeX2 - 2, eyeY - 2.5, 2.5, '#ffffff', null);
    drawCircle(ctx, eyeX1 + 2, eyeY + 1.5, 1.2, '#ffffff', null);
    drawCircle(ctx, eyeX2 + 2, eyeY + 1.5, 1.2, '#ffffff', null);
  }

  // Blushing Rosy Cheeks for Hero Seal 😊
  if (isHero) {
    ctx.fillStyle = 'rgba(255, 107, 129, 0.55)';
    drawCircle(ctx, headX - 20, headY + 8, 6.5, 'rgba(255, 107, 129, 0.55)', null);
    drawCircle(ctx, headX + 20, headY + 8, 6.5, 'rgba(255, 107, 129, 0.55)', null);
  }

  ctx.restore();
}

// ----------------------------------------------------
// The Beautiful Girl Seal (Juliet Seal)
// ----------------------------------------------------
function drawGirlSeal(ctx, x, y, s, t) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  const bob = Math.sin(t * 3.0 + 2.5) * 5;
  ctx.translate(0, bob);

  const bodyColor = '#8a9ba8';
  const bellyColor = '#c8d6e0';
  const outline = '#1f2a33';

  // Tail
  ctx.fillStyle = bodyColor; ctx.strokeStyle = outline; ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 110);
  ctx.quadraticCurveTo(25, 135, 22, 155);
  ctx.lineTo(0, 130);
  ctx.quadraticCurveTo(-25, 135, -22, 155);
  ctx.closePath(); ctx.fill(); ctx.stroke();

  // Upright Graceful Body
  ctx.beginPath();
  ctx.ellipse(0, 35, 42, 95, -0.05, 0, Math.PI * 2);
  strokeFill(ctx, bodyColor, outline, 4);

  // Belly
  ctx.beginPath();
  ctx.ellipse(-4, 38, 28, 75, 0, 0, Math.PI * 2);
  strokeFill(ctx, bellyColor, null);

  // Flippers
  ctx.beginPath();
  ctx.ellipse(-32, 22, 12, 25, 0.2, 0, Math.PI * 2);
  strokeFill(ctx, bodyColor, outline, 3);
  ctx.beginPath();
  ctx.ellipse(32, 22, 12, 25, -0.2, 0, Math.PI * 2);
  strokeFill(ctx, bodyColor, outline, 3);

  // Head
  const headX = 0, headY = -62;
  drawCircle(ctx, headX, headY, 28, bodyColor, outline, 4);

  // Snout
  ctx.beginPath();
  ctx.ellipse(headX, headY + 12, 16, 10, 0, 0, Math.PI * 2);
  strokeFill(ctx, bellyColor, outline, 2.5);
  drawCircle(ctx, headX, headY + 7, 4.5, '#111215', null);

  // Pretty Fluttery Eyes with Long Lashes
  const eyeX1 = headX - 10, eyeX2 = headX + 10;
  const eyeY = headY - 3;
  drawCircle(ctx, eyeX1, eyeY, 6.5, '#15171c', outline, 2);
  drawCircle(ctx, eyeX2, eyeY, 6.5, '#15171c', outline, 2);
  drawCircle(ctx, eyeX1 - 2, eyeY - 2, 2.2, '#ffffff', null);
  drawCircle(ctx, eyeX2 - 2, eyeY - 2, 2.2, '#ffffff', null);

  // Lashes
  ctx.strokeStyle = outline; ctx.lineWidth = 2.2;
  ctx.beginPath(); ctx.moveTo(eyeX1 - 6, eyeY - 4); ctx.lineTo(eyeX1 - 12, eyeY - 8); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(eyeX1 - 4, eyeY - 6); ctx.lineTo(eyeX1 - 8, eyeY - 12); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(eyeX2 + 6, eyeY - 4); ctx.lineTo(eyeX2 + 12, eyeY - 8); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(eyeX2 + 4, eyeY - 6); ctx.lineTo(eyeX2 + 8, eyeY - 12); ctx.stroke();

  // Cute Pink Hair Flower / Bow
  ctx.fillStyle = '#ff4081'; ctx.strokeStyle = '#c2185b'; ctx.lineWidth = 2;
  drawCircle(ctx, headX + 18, headY - 22, 7, '#ff4081', '#c2185b', 2);
  drawCircle(ctx, headX + 18, headY - 22, 3, '#ffeb3b', null);

  // Blushing Pink Cheeks
  ctx.fillStyle = 'rgba(255, 64, 129, 0.45)';
  drawCircle(ctx, headX - 16, headY + 8, 5, 'rgba(255, 64, 129, 0.45)', null);
  drawCircle(ctx, headX + 16, headY + 8, 5, 'rgba(255, 64, 129, 0.45)', null);

  ctx.restore();
}

// ----------------------------------------------------
// Frame Renderer for 16:9 Landscape & 9:16 Portrait
// ----------------------------------------------------
function frame(ctx, w, h, t) {
  const vertical = h > w;
  const scene = BEATS.find(s => t >= s.start && t < s.end) || BEATS.at(-1);
  const local = t - scene.start;

  // 1. Draw Aquarium Pool Background
  drawPoolBG(ctx, w, h, t);

  // 2. Draw Background Swimming Seals
  const swimScale = vertical ? (w / 1080) * 1.8 : (h / 1080) * 1.2;
  const swimX1 = ((t * 90) % (w + 300)) - 150;
  drawSwimmingSeal(ctx, swimX1, h * 0.78, swimScale, 1, t);

  const swimX2 = w + 150 - ((t * 70) % (w + 300));
  drawSwimmingSeal(ctx, swimX2, h * 0.88, swimScale * 0.85, -1, t + 1);

  // 3. Characters Position & Scales
  const baseScale = vertical ? (w / 1080) * 2.8 : (h / 1080) * 1.7;
  const waterLevel = vertical ? h * 0.46 : h * 0.48;

  // Hero Seal Position (Advances forward in later scenes)
  let heroX, wingmanX, girlX;
  if (scene.action === 'proposal_climax' || scene.action === 'funny_punchline') {
    heroX = vertical ? w * 0.42 : w * 0.46;
    wingmanX = vertical ? w * 0.16 : w * 0.22;
    girlX = vertical ? w * 0.78 : w * 0.74;
  } else if (scene.action === 'moving_forward' || scene.action === 'final_push') {
    const prog = Math.min(1, local / 8.0);
    heroX = (vertical ? w * 0.38 : w * 0.42) + prog * (w * 0.08);
    wingmanX = vertical ? w * 0.18 : w * 0.22;
    girlX = vertical ? w * 0.82 : w * 0.76;
  } else {
    heroX = vertical ? w * 0.46 : w * 0.48;
    wingmanX = vertical ? w * 0.22 : w * 0.26;
    girlX = vertical ? w * 0.85 : w * 0.80;
  }

  // Draw Juliet Seal in scene 3, 4, 5, 6, 7
  if (t >= 14.0) {
    drawGirlSeal(ctx, girlX, waterLevel, baseScale * 0.95, t);
  }

  // Determine Moods & Dialogue
  let heroMood = 'normal';
  let wingmanMood = 'normal';
  let isHeroSpeaking = false;
  let isWingmanSpeaking = false;

  if (scene.action === 'shy_proposal_talk') {
    wingmanMood = 'pushing';
    isWingmanSpeaking = (local < 4.0);
    heroMood = 'shy';
    isHeroSpeaking = (local >= 4.0);
  } else if (scene.action === 'scared_hero_seal') {
    heroMood = 'scared';
    wingmanMood = 'pushing';
    isHeroSpeaking = (local < 4.0);
    isWingmanSpeaking = (local >= 4.0);
  } else if (scene.action === 'friend_pushing') {
    wingmanMood = 'pushing';
    isWingmanSpeaking = true;
    heroMood = 'scared';
  } else if (scene.action === 'moving_forward') {
    heroMood = 'shy';
    wingmanMood = 'pushing';
    isWingmanSpeaking = true;
  } else if (scene.action === 'final_push') {
    wingmanMood = 'final_push';
    isWingmanSpeaking = true;
    heroMood = 'shy';
  } else if (scene.action === 'proposal_climax') {
    heroMood = 'love';
    isHeroSpeaking = true;
  } else if (scene.action === 'funny_punchline') {
    heroMood = 'love';
    wingmanMood = 'pushing';
  }

  // Draw Wingman Seal
  drawStandingSeal(ctx, wingmanX, waterLevel, baseScale * 0.95, t, false, isWingmanSpeaking, wingmanMood);

  // Draw Hero Seal
  drawStandingSeal(ctx, heroX, waterLevel, baseScale * 1.0, t, true, isHeroSpeaking, heroMood);

  // Proposal Climax Banner: "I LOVE YOU! 💖"
  if (scene.action === 'proposal_climax') {
    ctx.save();
    ctx.translate(w / 2, vertical ? h * 0.26 : h * 0.22);
    const pulse = 1 + Math.sin(t * 12) * 0.12;
    ctx.scale(pulse, pulse);
    drawRoundRect(ctx, -180, -42, 360, 84, 22, '#ff1493', '#ffffff', 5);
    ctx.font = 'bold 42px "Nirmala UI", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('I LOVE YOU! 💖', 0, 0);
    ctx.restore();
  }

  // Funny Meme Punchline Celebrations & Laughing Emojis
  if (scene.action === 'funny_punchline') {
    const hY = (t * 55) % 120;
    ctx.font = '48px sans-serif';
    ctx.fillText('😂', w * 0.35, waterLevel - 150 - hY);
    ctx.fillText('🤣', w * 0.55, waterLevel - 180 - (hY * 0.8));
    ctx.fillText('💥', w * 0.70, waterLevel - 140 - (hY * 0.6));
    ctx.fillText('🥦', w * 0.45, waterLevel - 200 - hY);
  }

  // Smooth scene fade transitions
  const fade = Math.min(cl(local / 0.2), cl((scene.end - t) / 0.2));
  if (fade < 1) {
    ctx.fillStyle = `rgba(0, 0, 0, ${(1 - fade) * 0.3})`;
    ctx.fillRect(0, 0, w, h);
  }

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const font = '"Noto Sans Bengali", "Nirmala UI", Arial, sans-serif';

  // Scene Title Banner (Top)
  const titleSize = vertical ? 52 : 36;
  ctx.font = `800 ${titleSize}px ${font}`;
  const titleLines = wrap(ctx, scene.title, w * 0.85);

  titleLines.forEach((lineText, i) => {
    const yPos = (vertical ? 180 : 65) + i * titleSize * 1.35;
    ctx.strokeStyle = '#000000'; ctx.lineWidth = 8;
    ctx.strokeText(lineText, w / 2, yPos);
    ctx.fillStyle = '#ffea00';
    ctx.fillText(lineText, w / 2, yPos);
  });

  // Subtitles (Heavy black stroke, crisp white text)
  if (CONFIG.captions) {
    const cue = CONFIG.cues?.find(c => t >= c.start && t < c.end);
    const caption = cue ? cue.text : (!CONFIG.cues ? scene.narration : '');

    if (caption) {
      const capSize = vertical ? 50 : 34;
      ctx.font = `800 ${capSize}px ${font}`;
      const lines = wrap(ctx, caption, w * 0.88);
      const step = vertical ? 66 : 46;
      const y = vertical ? h - 220 : h - 110;

      lines.forEach((l, i) => {
        const lineY = y + i * step;
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 9;
        ctx.lineJoin = 'round';
        ctx.strokeText(l, w / 2, lineY);

        ctx.fillStyle = '#ffffff';
        ctx.fillText(l, w / 2, lineY);
      });
    }
  }

  // Zero watermark per user instruction!
}

// Global hook
window.frame = frame;
