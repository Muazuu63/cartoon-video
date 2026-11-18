
// Full-Color 2D Cartoon Animation Engine - The Cursed Bed (Two Ducks vs Black Cat)
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
// Living Room Background (Directly Inspired by Reference)
// ----------------------------------------------------
function drawLivingRoomBG(ctx, W, H, t, floorY, isSpooky, spookyProgress) {
  // 1. Off-white / light cream Wall
  const wallGrad = ctx.createLinearGradient(0, 0, 0, floorY);
  if (isSpooky) {
    const s = Math.min(1, spookyProgress);
    wallGrad.addColorStop(0, `rgb(${Math.round(245 - s * 55)}, ${Math.round(242 - s * 65)}, ${Math.round(235 - s * 45)})`);
    wallGrad.addColorStop(1, `rgb(${Math.round(235 - s * 70)}, ${Math.round(230 - s * 80)}, ${Math.round(220 - s * 60)})`);
  } else {
    wallGrad.addColorStop(0, '#faf8f5');
    wallGrad.addColorStop(1, '#f0eae1');
  }
  ctx.fillStyle = wallGrad;
  ctx.fillRect(0, 0, W, floorY);

  // 2. Light Wooden Plank Flooring
  const floorGrad = ctx.createLinearGradient(0, floorY, 0, H);
  floorGrad.addColorStop(0, '#e8d7c3');
  floorGrad.addColorStop(1, '#d1bc9f');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, floorY, W, H - floorY);

  // Baseboard
  drawRoundRect(ctx, 0, floorY - 14, W, 14, 0, '#ffffff', '#b0a495', 2);

  // Floor plank lines (perspective)
  ctx.strokeStyle = 'rgba(168, 142, 114, 0.45)';
  ctx.lineWidth = 2;
  const plankSpacing = W / 9;
  for (let px = 0; px <= W; px += plankSpacing) {
    ctx.beginPath();
    ctx.moveTo(px, floorY);
    ctx.lineTo(px - W * 0.08, H);
    ctx.stroke();
  }

  // 3. Fiddle Leaf Fig Plant in Woven Basket (Corner Background)
  const plantX = W > H ? W * 0.38 : W * 0.32;
  const plantY = floorY - 15;

  // Basket Planter
  drawRoundRect(ctx, plantX - 42, plantY - 70, 84, 70, 8, '#c89666', '#8d5b2d', 3.5);
  // Basket texture weave lines
  ctx.strokeStyle = '#a6723e'; ctx.lineWidth = 2;
  for (let by = plantY - 60; by < plantY - 10; by += 12) {
    ctx.beginPath(); ctx.moveTo(plantX - 38, by); ctx.lineTo(plantX + 38, by); ctx.stroke();
  }

  // Tall Plant Trunk
  ctx.strokeStyle = '#5d4037'; ctx.lineWidth = 14; ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(plantX, plantY - 70);
  ctx.quadraticCurveTo(plantX - 10, plantY - 260, plantX + 5, plantY - 440);
  ctx.stroke();

  // Lush Fiddle Leaves (Layered)
  const leaves = [
    { dx: -35, dy: -140, r: 42, rot: -0.3 },
    { dx: 38, dy: -180, r: 46, rot: 0.35 },
    { dx: -45, dy: -240, r: 52, rot: -0.4 },
    { dx: 42, dy: -290, r: 54, rot: 0.3 },
    { dx: -30, dy: -350, r: 58, rot: -0.25 },
    { dx: 35, dy: -390, r: 52, rot: 0.28 },
    { dx: 0, dy: -450, r: 62, rot: 0 }
  ];

  leaves.forEach(l => {
    ctx.save();
    ctx.translate(plantX + l.dx, plantY + l.dy);
    ctx.rotate(l.rot);
    // Leaf shape
    ctx.beginPath();
    ctx.ellipse(0, 0, l.r, l.r * 0.65, 0, 0, Math.PI * 2);
    strokeFill(ctx, '#2d6a4f', '#1b4332', 3);
    // Leaf center vein
    ctx.strokeStyle = '#52b788'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(-l.r * 0.8, 0); ctx.lineTo(l.r * 0.8, 0); ctx.stroke();
    ctx.restore();
  });

  // 4. Modern Armchair (Left Side)
  const chairX = W > H ? W * 0.08 : W * -0.05;
  const chairY = floorY;
  // Seat cushion
  drawRoundRect(ctx, chairX - 20, chairY - 180, 160, 150, 24, '#c7bca9', '#8a7d6b', 4);
  // Armrest
  drawRoundRect(ctx, chairX + 70, chairY - 230, 75, 200, 28, '#b8ab97', '#7d705f', 4);
  // Backrest
  drawRoundRect(ctx, chairX - 40, chairY - 380, 120, 240, 30, '#b0a28e', '#756958', 4);

  // 5. Side Table with Lamp (Right Side)
  const tableX = W > H ? W * 0.92 : W * 0.98;
  const tableY = floorY;
  // Table top
  drawRoundRect(ctx, tableX - 70, tableY - 140, 140, 24, 6, '#8d6e63', '#4e342e', 3.5);
  // Table legs
  drawRoundRect(ctx, tableX - 55, tableY - 116, 14, 116, 4, '#6d4c41', '#3e2723', 3);
  drawRoundRect(ctx, tableX + 41, tableY - 116, 14, 116, 4, '#6d4c41', '#3e2723', 3);

  // Table Lamp
  drawCircle(ctx, tableX, tableY - 140, 14, '#2c3e50', '#1a252f', 3);
  ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.moveTo(tableX, tableY - 140); ctx.lineTo(tableX, tableY - 260); ctx.stroke();
  // Lampshade
  ctx.fillStyle = '#fff3e0'; ctx.strokeStyle = '#d7ccc8'; ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(tableX - 28, tableY - 260);
  ctx.lineTo(tableX + 28, tableY - 260);
  ctx.lineTo(tableX + 48, tableY - 330);
  ctx.lineTo(tableX - 48, tableY - 330);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Spooky / Dramatic Vignette during storytelling
  if (isSpooky && spookyProgress > 0) {
    const mist = Math.min(0.4, spookyProgress * 0.4);
    ctx.fillStyle = `rgba(35, 15, 45, ${mist})`;
    ctx.fillRect(0, 0, W, H);
  }
}

// ----------------------------------------------------
// The Pink Pet Bed (Inspired by Reference)
// ----------------------------------------------------
function drawPinkPetBed(ctx, bedX, bedY, bedW, bedH) {
  ctx.save();
  // Soft drop shadow
  ctx.fillStyle = 'rgba(60, 40, 30, 0.22)';
  ctx.beginPath();
  ctx.ellipse(bedX, bedY + 8, bedW * 0.54, bedH * 0.32, 0, 0, Math.PI * 2);
  ctx.fill();

  // Outer Bolster Ring (Cozy Dusty Pink)
  ctx.beginPath();
  ctx.ellipse(bedX, bedY, bedW * 0.52, bedH * 0.48, 0, 0, Math.PI * 2);
  strokeFill(ctx, '#e899aa', '#b85d73', 4.5);

  // Rim Highlight
  ctx.strokeStyle = '#f5b5c4';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.ellipse(bedX, bedY - 14, bedW * 0.46, bedH * 0.38, 0, Math.PI * 0.8, Math.PI * 2.2);
  ctx.stroke();

  // Inner Soft Cushion (Ivory / Warm Cream)
  ctx.beginPath();
  ctx.ellipse(bedX, bedY + 5, bedW * 0.38, bedH * 0.32, 0, 0, Math.PI * 2);
  strokeFill(ctx, '#fff6ed', '#e3a896', 3.5);

  // Soft Tufting Quilt Dimples
  ctx.fillStyle = '#dab5a5';
  [-bedW * 0.16, 0, bedW * 0.16].forEach(dx => {
    drawCircle(ctx, bedX + dx, bedY + 6, 3, '#dab5a5', null);
  });

  ctx.restore();
}

// ----------------------------------------------------
// The Black Cat (বিল্লু)
// ----------------------------------------------------
function drawBlackCat(ctx, x, y, s, t, state, progress) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  const furColor = '#1e1e24';
  const furHighlight = '#32323d';
  const outline = '#0a0a0f';

  // State: 'rocket_flee' (17.5s - 20.5s)
  if (state === 'rocket_flee') {
    const jump = Math.min(1.5, progress);
    const flyX = jump * 580;
    const flyY = -Math.sin(jump * Math.PI * 0.8) * 260 + jump * 110;

    // Comic Speed Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 4;
    for (let li = 0; li < 4; li++) {
      ctx.beginPath();
      ctx.moveTo(-60 - li * 25, -20 + li * 15);
      ctx.lineTo(-140 - li * 35, -20 + li * 15);
      ctx.stroke();
    }

    // Comic Smoke Puff at launch site
    if (jump < 0.6) {
      const p = jump / 0.6;
      ctx.fillStyle = `rgba(240, 240, 245, ${1 - p})`;
      drawCircle(ctx, 0, 0, 35 * (1 + p), null, null);
      drawCircle(ctx, -20, -10, 25 * (1 + p), null, null);
      drawCircle(ctx, 20, -5, 22 * (1 + p), null, null);
    }

    ctx.translate(flyX, flyY);
    ctx.rotate(0.45);

    // Stretched Panic Cat Body
    ctx.beginPath();
    ctx.ellipse(0, -25, 45, 18, 0.2, 0, Math.PI * 2);
    strokeFill(ctx, furColor, outline, 4);

    // Head
    drawCircle(ctx, 42, -38, 20, furColor, outline, 4);

    // Ears Pinned Back in Pure Panic
    ctx.fillStyle = furColor; ctx.strokeStyle = outline; ctx.lineWidth = 3.5;
    ctx.beginPath(); ctx.moveTo(35, -55); ctx.lineTo(25, -75); ctx.lineTo(45, -58); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(48, -55); ctx.lineTo(55, -78); ctx.lineTo(58, -52); ctx.closePath(); ctx.fill(); ctx.stroke();

    // Giant Shock Eyes (White Discs with Tiny Black Dots)
    drawCircle(ctx, 40, -42, 9, '#ffffff', outline, 2.5);
    drawCircle(ctx, 54, -40, 9, '#ffffff', outline, 2.5);
    drawCircle(ctx, 42, -42, 2.5, '#000000', null);
    drawCircle(ctx, 56, -40, 2.5, '#000000', null);

    // Open Screaming Mouth
    ctx.fillStyle = '#ff6b81';
    ctx.beginPath(); ctx.arc(48, -26, 7, 0, Math.PI); ctx.fill(); ctx.stroke();

    // Outstretched Paws
    drawRoundRect(ctx, 45, -18, 30, 10, 4, furColor, outline, 3);
    drawRoundRect(ctx, -40, -15, 30, 10, 4, furColor, outline, 3);

    // Puffed Tail
    ctx.strokeStyle = furColor; ctx.lineWidth = 14;
    ctx.beginPath(); ctx.moveTo(-35, -20); ctx.quadraticCurveTo(-75, -55, -60, -85); ctx.stroke();
    ctx.strokeStyle = outline; ctx.lineWidth = 3; ctx.stroke();

    // "মাগো বাঁচাও!" Comic Bubble
    ctx.save();
    ctx.translate(20, -100);
    drawRoundRect(ctx, -60, -32, 120, 36, 12, '#fffa65', '#ff3838', 3);
    ctx.font = 'bold 20px "Noto Sans Bengali", sans-serif';
    ctx.fillStyle = '#c0392b';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('মাগো বাঁচাও!', 0, -14);
    ctx.restore();

    ctx.restore();
    return;
  }

  // Normal / Suspicious / Panicking resting inside bed
  const breathe = Math.sin(t * 3.5) * 2;
  const jitter = (state === 'panicking' || state === 'shivering') ? (Math.sin(t * 40) * 3) : 0;

  ctx.translate(jitter, breathe);

  // Cat Body (Curled Cozy in Bed)
  ctx.beginPath();
  ctx.ellipse(0, -16, 42, 25, 0, 0, Math.PI * 2);
  strokeFill(ctx, furColor, outline, 4);

  // Cat Back Highlight
  ctx.strokeStyle = furHighlight; ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(0, -16, 38, Math.PI * 0.9, Math.PI * 1.5);
  ctx.stroke();

  // Cat Head
  const headX = 26, headY = -34;
  drawCircle(ctx, headX, headY, 22, furColor, outline, 4);

  // Cat Ears
  ctx.fillStyle = furColor; ctx.strokeStyle = outline; ctx.lineWidth = 3.5;
  ctx.beginPath(); ctx.moveTo(headX - 12, headY - 16); ctx.lineTo(headX - 18, headY - 38); ctx.lineTo(headX - 2, headY - 20); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(headX + 4, headY - 20); ctx.lineTo(headX + 18, headY - 36); ctx.lineTo(headX + 16, headY - 14); ctx.closePath(); ctx.fill(); ctx.stroke();
  // Pink Inner Ears
  ctx.fillStyle = '#ffb8c6';
  ctx.beginPath(); ctx.moveTo(headX - 10, headY - 18); ctx.lineTo(headX - 15, headY - 33); ctx.lineTo(headX - 4, headY - 20); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(headX + 6, headY - 20); ctx.lineTo(headX + 15, headY - 32); ctx.lineTo(headX + 13, headY - 16); ctx.closePath(); ctx.fill();

  // Cat Eyes Expressions
  if (state === 'panicking' || state === 'shivering') {
    // Wide Terrified Yellow-Green Eyes with pinpoint pupils!
    drawCircle(ctx, headX - 7, headY - 2, 7.5, '#d4efdf', outline, 2);
    drawCircle(ctx, headX + 9, headY - 2, 7.5, '#d4efdf', outline, 2);
    // Pinpoint pupils
    drawCircle(ctx, headX - 6, headY - 2, 2.5, '#0e1111', null);
    drawCircle(ctx, headX + 10, headY - 2, 2.5, '#0e1111', null);

    // Sweat Drops flying off head! 💦
    const swY = Math.sin(t * 8) * 8;
    ctx.fillStyle = '#48dbfb'; ctx.strokeStyle = '#0abde3'; ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(headX - 22, headY - 22 + swY, 5, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
    ctx.beginPath();
    ctx.arc(headX + 24, headY - 18 - swY, 4, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
  } else if (state === 'suspicious') {
    // Suspicious slant eyes looking towards the ducks!
    drawCircle(ctx, headX - 7, headY - 2, 6, '#c6ef53', outline, 2);
    drawCircle(ctx, headX + 9, headY - 2, 6, '#c6ef53', outline, 2);
    // Slit pupils looking right at ducks
    ctx.strokeStyle = '#000000'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(headX - 5, headY - 6); ctx.lineTo(headX - 5, headY + 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(headX + 11, headY - 6); ctx.lineTo(headX + 11, headY + 2); ctx.stroke();
  } else {
    // Peaceful sleepy eyes
    ctx.strokeStyle = '#c6ef53'; ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(headX - 7, headY - 2, 6, 0.2, Math.PI - 0.2);
    ctx.arc(headX + 9, headY - 2, 6, 0.2, Math.PI - 0.2);
    ctx.stroke();
  }

  // Pink Nose
  drawCircle(ctx, headX + 1, headY + 6, 3, '#ff7675', null);

  // Cute White Whiskers
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)'; ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(headX - 4, headY + 6); ctx.lineTo(headX - 24, headY + 3);
  ctx.moveTo(headX - 4, headY + 8); ctx.lineTo(headX - 24, headY + 11);
  ctx.moveTo(headX + 6, headY + 6); ctx.lineTo(headX + 26, headY + 3);
  ctx.moveTo(headX + 6, headY + 8); ctx.lineTo(headX + 26, headY + 11);
  ctx.stroke();

  // Paws resting over bolster
  drawRoundRect(ctx, headX - 18, -4, 16, 12, 6, furColor, outline, 2.5);
  drawRoundRect(ctx, headX + 2, -4, 16, 12, 6, furColor, outline, 2.5);

  // Swishing Tail
  const tailSway = Math.sin(t * 4) * 8;
  ctx.strokeStyle = furColor; ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(-36, -14);
  ctx.quadraticCurveTo(-65, -28 + tailSway, -55, -50 + tailSway);
  ctx.stroke();
  ctx.strokeStyle = outline; ctx.lineWidth = 2.5; ctx.stroke();

  ctx.restore();
}

// ----------------------------------------------------
// The Ducks (হাঁস ১ ও হাঁস ২ - আঁখি)
// ----------------------------------------------------
function drawDuck(ctx, x, y, s, t, isAkhi, action, isSpeaking, waddlePhase = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  // Waddle Physics
  const isMoving = (action === 'duck_warning' || action === 'ducks_approach_bed');
  const waddleRoll = isMoving ? Math.sin(t * 10 + waddlePhase) * 0.12 : Math.sin(t * 3 + waddlePhase) * 0.03;
  const waddleBob = isMoving ? Math.abs(Math.sin(t * 10 + waddlePhase)) * 8 : Math.sin(t * 3) * 2;

  ctx.translate(0, -waddleBob);
  ctx.rotate(waddleRoll);

  const featherColor = isAkhi ? '#fffbf5' : '#ffffff';
  const shadowColor = isAkhi ? '#f0e6d6' : '#e6edf2';
  const outline = '#2d3436';
  const beakOrange = '#ff793f';
  const footOrange = '#ff5252';

  // 1. Orange Webbed Feet
  const legSwing1 = isMoving ? Math.sin(t * 10 + waddlePhase) * 16 : 0;
  const legSwing2 = isMoving ? -Math.sin(t * 10 + waddlePhase) * 16 : 0;

  // Left foot
  ctx.fillStyle = footOrange; ctx.strokeStyle = outline; ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-16, -20); ctx.lineTo(-16 + legSwing1, 0); ctx.lineTo(-32 + legSwing1, 0);
  ctx.lineTo(-14 + legSwing1, -6); ctx.lineTo(-6 + legSwing1, 0); ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Right foot
  ctx.beginPath();
  ctx.moveTo(12, -20); ctx.lineTo(12 + legSwing2, 0); ctx.lineTo(-4 + legSwing2, 0);
  ctx.lineTo(14 + legSwing2, -6); ctx.lineTo(24 + legSwing2, 0); ctx.closePath();
  ctx.fill(); ctx.stroke();

  // 2. Plump Feathered Body
  ctx.beginPath();
  ctx.ellipse(0, -55, 46, 34, -0.15, 0, Math.PI * 2);
  strokeFill(ctx, featherColor, outline, 4);

  // Body underside shadow
  ctx.fillStyle = shadowColor;
  ctx.beginPath();
  ctx.arc(0, -55, 44, Math.PI * 0.2, Math.PI * 0.85);
  ctx.fill();

  // Upturned Cute Duck Tail Feathers
  ctx.fillStyle = featherColor; ctx.strokeStyle = outline; ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(-38, -62);
  ctx.quadraticCurveTo(-65, -85, -55, -95);
  ctx.quadraticCurveTo(-45, -78, -32, -75);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // 3. SPECIAL ATTIRE: If Akhi Duck (wearing pink ribbon bow & harness diaper!)
  if (isAkhi) {
    // Pink Patterned Harness / Diaper around body (Reference Video!)
    drawRoundRect(ctx, -26, -65, 52, 28, 8, '#ff80bf', '#d63384', 3);
    // Cute diaper white dots pattern
    ctx.fillStyle = '#ffffff';
    drawCircle(ctx, -14, -54, 3, '#ffffff', null);
    drawCircle(ctx, 0, -54, 3, '#ffffff', null);
    drawCircle(ctx, 14, -54, 3, '#ffffff', null);

    // Bright Pink Ribbon Bow on Back
    ctx.save();
    ctx.translate(-12, -78);
    ctx.fillStyle = '#ff1493'; ctx.strokeStyle = '#c71585'; ctx.lineWidth = 2.5;
    // Left loop
    ctx.beginPath(); ctx.ellipse(-12, -6, 12, 7, -0.4, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    // Right loop
    ctx.beginPath(); ctx.ellipse(12, -6, 12, 7, 0.4, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    // Center knot
    drawCircle(ctx, 0, -6, 5, '#ff69b4', '#c71585', 2);
    // Ribbon tails
    ctx.beginPath(); ctx.moveTo(-4, -2); ctx.lineTo(-10, 15); ctx.lineTo(-2, 12); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(4, -2); ctx.lineTo(10, 15); ctx.lineTo(2, 12); ctx.closePath(); ctx.fill();
    ctx.restore();
  }

  // 4. Duck Wing
  const wingFlap = isMoving ? Math.sin(t * 12) * 8 : (action === 'duck_warning' && !isAkhi ? -25 : 0);
  ctx.save();
  ctx.translate(6, -62);
  ctx.rotate(wingFlap * Math.PI / 180);

  ctx.beginPath();
  ctx.ellipse(0, 0, 28, 18, 0.25, 0, Math.PI * 2);
  strokeFill(ctx, featherColor, outline, 3.5);

  // Feather wing detail
  ctx.strokeStyle = shadowColor; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(2, 0, 18, 0.3, Math.PI * 0.9); ctx.stroke();

  ctx.restore();

  // 5. Long Graceful Duck Neck
  ctx.fillStyle = featherColor; ctx.strokeStyle = outline; ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(14, -75);
  ctx.quadraticCurveTo(25, -110, 24, -135);
  ctx.lineTo(38, -135);
  ctx.quadraticCurveTo(42, -100, 32, -70);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // 6. Cute Duck Head
  const headX = 30, headY = -140;
  drawCircle(ctx, headX, headY, 20, featherColor, outline, 4);

  // 7. Beak (Orange) & Talking Quack Action
  const quackGap = isSpeaking ? (Math.abs(Math.sin(t * 18)) * 10 + 2) : 2;

  // Upper Beak
  ctx.fillStyle = beakOrange; ctx.strokeStyle = outline; ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(headX + 12, headY - 6);
  ctx.quadraticCurveTo(headX + 38, headY - 12, headX + 44, headY - 4);
  ctx.lineTo(headX + 14, headY + 3);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Nostril dot
  drawCircle(ctx, headX + 22, headY - 5, 1.5, '#d35400', null);

  // Lower Beak (Opens when speaking)
  ctx.beginPath();
  ctx.moveTo(headX + 14, headY + 3);
  ctx.lineTo(headX + 36, headY + 4 + quackGap);
  ctx.lineTo(headX + 12, headY + 8 + quackGap);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // 8. Expressive Duck Eyes
  if (isAkhi) {
    // Akhi: Big Cute Shiny Eyes with Eyelashes
    drawCircle(ctx, headX + 4, headY - 4, 7, '#2d3436', outline, 2);
    drawCircle(ctx, headX + 2, headY - 6, 2.5, '#ffffff', null);
    drawCircle(ctx, headX + 5, headY - 3, 1.5, '#ffffff', null);
    // Eyelashes
    ctx.strokeStyle = outline; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(headX + 6, headY - 11); ctx.lineTo(headX + 12, headY - 16); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(headX + 2, headY - 11); ctx.lineTo(headX + 4, headY - 17); ctx.stroke();
  } else {
    // Duck 1: Clever Scheming Eyebrows & Confident Eye
    drawCircle(ctx, headX + 4, headY - 4, 6, '#2d3436', outline, 2);
    drawCircle(ctx, headX + 2, headY - 6, 2.5, '#ffffff', null);
    // Clever arched eyebrow
    ctx.strokeStyle = outline; ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(headX - 4, headY - 13);
    ctx.quadraticCurveTo(headX + 4, headY - 18, headX + 12, headY - 12);
    ctx.stroke();
  }

  // Question Marks above Akhi when curious
  if (isAkhi && action === 'akhi_curious') {
    ctx.save();
    ctx.translate(headX - 10, headY - 45);
    ctx.font = 'bold 36px "Noto Sans Bengali", sans-serif';
    ctx.fillStyle = '#ff3838';
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 5;
    ctx.strokeText('?', 0, 0);
    ctx.fillText('?', 0, 0);
    ctx.restore();
  }

  ctx.restore();
}

// ----------------------------------------------------
// The Two Ducks Snuggled in the Pink Bed (Victory Scene)
// ----------------------------------------------------
function drawDucksInBed(ctx, bedX, bedY, s, t, isSiuuu) {
  ctx.save();
  ctx.translate(bedX, bedY - 14);
  ctx.scale(s, s);

  const bob = Math.sin(t * 5) * 3;

  // Duck 1 (Left - Mastermind Duck nestled in bed)
  ctx.save();
  ctx.translate(-35, -12 + bob);

  // Plump body in bed
  ctx.beginPath();
  ctx.ellipse(0, 5, 38, 24, -0.1, 0, Math.PI * 2);
  strokeFill(ctx, '#ffffff', '#2d3436', 3.5);

  // Wing resting on bolster rim
  drawRoundRect(ctx, -20, 2, 36, 18, 8, '#ffffff', '#2d3436', 3);

  // Neck & Head
  drawCircle(ctx, 4, -28, 22, '#ffffff', '#2d3436', 3.5);

  // Smug Happy Eyes ^_^
  ctx.strokeStyle = '#2d3436'; ctx.lineWidth = 3.5;
  ctx.beginPath(); ctx.arc(-4, -30, 6, Math.PI, 0); ctx.stroke();
  ctx.beginPath(); ctx.arc(12, -30, 6, Math.PI, 0); ctx.stroke();

  // Cheerful Orange Beak
  ctx.fillStyle = '#ff793f'; ctx.strokeStyle = '#2d3436'; ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, -24);
  ctx.quadraticCurveTo(18, -28, 26, -22);
  ctx.lineTo(2, -18);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  ctx.restore();

  // Duck 2 (Right - Akhi with pink bow & harness in bed)
  ctx.save();
  ctx.translate(35, -14 + bob);

  // Plump body in bed
  ctx.beginPath();
  ctx.ellipse(0, 5, 36, 24, 0.1, 0, Math.PI * 2);
  strokeFill(ctx, '#fffbf5', '#2d3436', 3.5);

  // Pink Diaper visible
  drawRoundRect(ctx, -14, 6, 28, 16, 6, '#ff80bf', '#d63384', 2.5);

  // Wing resting on bolster rim
  drawRoundRect(ctx, -16, 2, 34, 18, 8, '#fffbf5', '#2d3436', 3);

  // Neck & Head
  drawCircle(ctx, -2, -28, 21, '#fffbf5', '#2d3436', 3.5);

  // Cute Pink Ribbon Bow on top
  ctx.fillStyle = '#ff1493'; ctx.strokeStyle = '#c71585'; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.ellipse(-10, -50, 10, 6, -0.3, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(10, -50, 10, 6, 0.3, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  drawCircle(ctx, 0, -50, 4.5, '#ff69b4', '#c71585', 2);

  // Sweet closed happy eyes with lashes
  ctx.strokeStyle = '#2d3436'; ctx.lineWidth = 3.5;
  ctx.beginPath(); ctx.arc(-10, -30, 5.5, Math.PI, 0); ctx.stroke();
  ctx.beginPath(); ctx.arc(6, -30, 5.5, Math.PI, 0); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(11, -34); ctx.lineTo(16, -38); ctx.stroke();

  // Cute Beak
  ctx.fillStyle = '#ff793f'; ctx.strokeStyle = '#2d3436'; ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-6, -24);
  ctx.quadraticCurveTo(12, -28, 20, -22);
  ctx.lineTo(-4, -18);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  ctx.restore();

  // Floating Love Hearts, Laughing Emojis & SIUUU Celebrations
  const hY = (t * 50) % 110;
  ctx.font = '36px sans-serif';
  ctx.fillText('💖', -30, -60 - hY);
  ctx.fillText('✨', 55, -50 - (hY * 0.8));
  ctx.fillText('😂', 5, -85 - (hY * 0.6));

  if (isSiuuu) {
    // Big SIUUU Meme Flash Banner
    ctx.save();
    ctx.translate(0, -140);
    const pulse = 1 + Math.sin(t * 12) * 0.12;
    ctx.scale(pulse, pulse);
    drawRoundRect(ctx, -110, -30, 220, 60, 16, '#ff4757', '#ffffff', 4);
    ctx.font = 'bold 36px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('SIUUUU! 🔥', 0, 0);
    ctx.restore();
  }

  ctx.restore();
}

// ----------------------------------------------------
// Frame Renderer for 16:9 Landscape & 9:16 Portrait
// ----------------------------------------------------
function frame(ctx, w, h, t) {
  const vertical = h > w;
  const scene = BEATS.find(s => t >= s.start && t < s.end) || BEATS.at(-1);
  const local = t - scene.start;

  // Adaptive Floor & Scales (Fill frame beautifully in both aspect ratios)
  const floorY = vertical ? h * 0.58 : h * 0.78;
  const scale = vertical ? (w / 1080) * 3.0 : (h / 1080) * 1.55;

  // Calculate Spooky Storytelling Progress
  const isSpooky = (t >= 5.0 && t < 22.0);
  const spookyProgress = isSpooky ? Math.min(1, (t - 5.0) / 5.5) : 0;

  // 1. Render Living Room
  drawLivingRoomBG(ctx, w, h, t, floorY, isSpooky, spookyProgress);

  // 2. Pink Pet Bed Coordinates
  const bedW = vertical ? w * 0.68 : w * 0.38;
  const bedH = bedW * 0.58;
  const bedX = vertical ? w * 0.58 : w * 0.42;
  const bedY = floorY - bedH * 0.28;

  // Draw the cozy pink bed
  drawPinkPetBed(ctx, bedX, bedY, bedW, bedH);

  // 3. Render Cat or Occupied Ducks
  if (t < 25.0) {
    // Cat is in bed or fleeing!
    let catState = 'normal';
    let catProgress = 0;
    if (scene.action === 'cat_watching_nervous') {
      catState = 'suspicious';
    } else if (scene.action === 'cat_shivering_scared') {
      catState = 'shivering';
    } else if (scene.action === 'cat_panicking' || scene.action === 'ducks_intimidate') {
      catState = 'panicking';
    } else if (scene.action === 'cat_flees_rocket') {
      catState = 'rocket_flee';
      catProgress = (t - 20.0) / 2.0;
    }

    drawBlackCat(ctx, bedX, bedY - 12, scale * 0.95, t, catState, catProgress);
  }

  // 4. Render Ducks
  const inBed = (scene.action === 'ducks_hop_in_bed' || scene.action === 'ducks_victory_siuuu');

  if (inBed) {
    // Both ducks are snuggled in the pink pet bed!
    drawDucksInBed(ctx, bedX, bedY, scale * 1.1, t, scene.action === 'ducks_victory_siuuu');
  } else {
    // Ducks waddling / standing in the room
    let duck1X, duck1Y, duck2X, duck2Y;

    if (scene.action === 'ducks_intimidate') {
      // Stepping close to the bed in confrontation
      duck1X = bedX - bedW * 0.38;
      duck1Y = floorY;
      duck2X = bedX - bedW * 0.65;
      duck2Y = floorY;
    } else if (scene.action === 'cat_flees_rocket') {
      // Watching the cat zoom away and laughing
      duck1X = bedX - bedW * 0.35;
      duck1Y = floorY;
      duck2X = bedX - bedW * 0.60;
      duck2Y = floorY;
    } else {
      // Approaching or standing
      const p = Math.min(1, t / 8.0);
      const startX1 = vertical ? w * 0.08 : w * 0.05;
      const targetX1 = vertical ? w * 0.26 : w * 0.20;
      duck1X = startX1 + (targetX1 - startX1) * p;
      duck1Y = floorY;

      const startX2 = vertical ? w * -0.05 : w * -0.05;
      const targetX2 = vertical ? w * 0.10 : w * 0.09;
      duck2X = startX2 + (targetX2 - startX2) * p;
      duck2Y = floorY;
    }

    // Who is speaking?
    const isDuck1Speaking = (
      scene.action === 'duck_warning' ||
      scene.action === 'cat_watching_nervous' ||
      scene.action === 'cat_shivering_scared' ||
      scene.action === 'cat_panicking' ||
      scene.action === 'ducks_intimidate' ||
      scene.action === 'cat_flees_rocket'
    );

    // Duck 1 (Leader / Mastermind)
    drawDuck(ctx, duck1X, duck1Y, scale * 0.95, t, false, scene.action, isDuck1Speaking, 0);

    // Duck 2 (Akhi - Pink Bow & Diaper)
    drawDuck(ctx, duck2X, duck2Y, scale * 0.88, t, true, scene.action, false, Math.PI * 0.5);
  }

  // Smooth scene fade transitions
  const fade = Math.min(cl(local / 0.2), cl((scene.end - t) / 0.2));
  if (fade < 1) {
    ctx.fillStyle = `rgba(0, 0, 0, ${(1 - fade) * 0.3})`;
    ctx.fillRect(0, 0, w, h);
  }

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const font = '"Nirmala UI", "Noto Sans Bengali", Arial, sans-serif';

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
