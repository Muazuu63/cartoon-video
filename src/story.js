// ============================================================================
// DipuToons - Premium 2D Cartoon Animation Engine
// Episode: "বউয়ের চরম সন্দেহ ও বেহেশতের হুর" (Wife Suspicion & Houri Twist)
// Characters: আবুল মিয়া (Husband), মন্টু ভাই (Neighbor), জরিনা বেগম (Wife)
// Channel: DipuToons (ছোট্ট কার্টুন, বড় হাসি!)
// ============================================================================

const DURATION = CONFIG.duration;
const BEATS = CONFIG.scenes;

// ----------------------------------------------------------------------------
// Asset Preloading (Official DipuToons Logo)
// ----------------------------------------------------------------------------
const logoImg = new Image();
let logoLoaded = false;
logoImg.onload = () => { logoLoaded = true; };

window.PRELOAD_ASSETS = () => {
  if (CONFIG.logo_data) {
    logoImg.src = CONFIG.logo_data;
    if (logoImg.decode) {
      return logoImg.decode().catch(() => {});
    }
  }
  return Promise.resolve();
};

// ----------------------------------------------------------------------------
// Geometry & Canvas Utilities
// ----------------------------------------------------------------------------
function drawCircle(ctx, x, y, r, fill, stroke, lw = 2) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); }
}

function drawRoundRect(ctx, x, y, w, h, rad, fill, stroke, lw = 2) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, rad);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); }
}

function drawEllipse(ctx, x, y, rx, ry, fill, stroke, lw = 2, rot = 0) {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
}

// ----------------------------------------------------------------------------
// Rural Homestead Verandah Environment (গ্রামের বাড়ির বারান্দা ও উঠোন)
// ----------------------------------------------------------------------------
function drawVillageBackground(ctx, w, h, isPort, t) {
  // 1. Warm morning rural sky
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.7);
  skyGrad.addColorStop(0, '#81d4fa');
  skyGrad.addColorStop(0.4, '#b3e5fc');
  skyGrad.addColorStop(1, '#fff9c4');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  // Distant green village trees
  ctx.fillStyle = '#81c784';
  const treeCount = isPort ? 4 : 7;
  for (let i = 0; i < treeCount; i++) {
    const tx = w * (0.02 + i * 0.16);
    const ty = h * (isPort ? 0.35 : 0.38);
    const tr = isPort ? w * 0.18 : w * 0.12;
    drawCircle(ctx, tx, ty, tr, '#a5d6a7', null);
    drawCircle(ctx, tx + 25, ty - 18, tr * 0.88, '#81c784', null);
    drawCircle(ctx, tx - 15, ty - 12, tr * 0.75, '#66bb6a', null);
  }

  // 2. Mud House Verandah Wall (মাটির ঘর)
  const wallX = isPort ? w * 0.12 : w * 0.18;
  const wallY = isPort ? h * 0.08 : h * 0.06;
  const wallW = w - wallX;
  const wallH = isPort ? h * 0.65 : h * 0.70;

  // Clay / Mud Wall Gradient with warm earthen tones
  const wallGrad = ctx.createLinearGradient(wallX, wallY, wallX, wallY + wallH);
  wallGrad.addColorStop(0, '#f5ebe0');
  wallGrad.addColorStop(0.5, '#e6ccb2');
  wallGrad.addColorStop(1, '#ddb892');
  ctx.fillStyle = wallGrad;
  ctx.fillRect(wallX, wallY, wallW, wallH);

  // Verandah wooden beam overhang
  const beamGrad = ctx.createLinearGradient(0, wallY, 0, wallY + 32);
  beamGrad.addColorStop(0, '#4e342e');
  beamGrad.addColorStop(1, '#3e2723');
  ctx.fillStyle = beamGrad;
  ctx.fillRect(0, wallY - 10, w, 32);

  // Wooden Verandah Pillars
  const pil1X = isPort ? w * 0.14 : w * 0.20;
  const pil2X = isPort ? w * 0.94 : w * 0.96;
  const pilW = isPort ? 28 : 36;
  drawRoundRect(ctx, pil1X, wallY, pilW, wallH, 4, '#5d4037', '#271206', 3);
  drawRoundRect(ctx, pil2X, wallY, pilW, wallH, 4, '#5d4037', '#271206', 3);

  // Traditional Wooden Window placed safely on the left
  const winX = isPort ? w * 0.18 : w * 0.22;
  const winY = isPort ? h * 0.10 : h * 0.09;
  const winW = isPort ? w * 0.16 : w * 0.11;
  const winH = isPort ? h * 0.14 : h * 0.18;

  drawRoundRect(ctx, winX - 4, winY - 4, winW + 8, winH + 8, 5, '#3e2723', null);
  drawRoundRect(ctx, winX, winY, winW, winH, 4, '#271206', '#4e342e', 3);
  ctx.strokeStyle = '#8d6e63'; ctx.lineWidth = 3;
  for (let bx = winX + winW * 0.3; bx < winX + winW; bx += winW * 0.3) {
    ctx.beginPath(); ctx.moveTo(bx, winY); ctx.lineTo(bx, winY + winH); ctx.stroke();
  }
  drawRoundRect(ctx, winX - winW * 0.36, winY + 4, winW * 0.34, winH - 8, 3, '#6d4c41', '#3e2723', 2);
  drawRoundRect(ctx, winX + winW + 2, winY + 4, winW * 0.34, winH - 8, 3, '#6d4c41', '#3e2723', 2);

  // Rolled Bamboo Mat (বাঁশের মাদুর)
  const matX = isPort ? w * 0.40 : w * 0.38;
  const matY = isPort ? h * 0.16 : h * 0.14;
  const matW = isPort ? 28 : 34;
  const matH = isPort ? 150 : 190;

  ctx.save();
  ctx.translate(matX, matY);
  ctx.rotate(0.12);
  drawRoundRect(ctx, 0, 0, matW, matH, 8, '#d7ccc8', '#8d6e63', 2.5);
  ctx.strokeStyle = '#a1887f'; ctx.lineWidth = 2;
  for (let my = 12; my < matH - 10; my += 14) {
    ctx.beginPath(); ctx.moveTo(3, my); ctx.lineTo(matW - 3, my); ctx.stroke();
  }
  ctx.strokeStyle = '#5d4037'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(0, matH * 0.48); ctx.lineTo(matW, matH * 0.48); ctx.stroke();
  ctx.restore();

  // Clay Flower Pot with Fresh Green Plant
  const potX = isPort ? w * 0.16 : w * 0.22;
  const potY = isPort ? h * 0.45 : h * 0.48;
  ctx.fillStyle = '#b7410e';
  ctx.beginPath();
  ctx.moveTo(potX, potY);
  ctx.lineTo(potX + 38, potY);
  ctx.lineTo(potX + 30, potY + 38);
  ctx.lineTo(potX + 8, potY + 38);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#5d2004'; ctx.lineWidth = 2; ctx.stroke();
  drawCircle(ctx, potX + 19, potY - 12, 14, '#43a047', null);
  drawCircle(ctx, potX + 8, potY - 22, 11, '#66bb6a', null);
  drawCircle(ctx, potX + 30, potY - 22, 11, '#66bb6a', null);

  // 3. Ground / Courtyard
  const groundY = isPort ? h * 0.65 : h * 0.70;
  const groundGrad = ctx.createLinearGradient(0, groundY, 0, h);
  groundGrad.addColorStop(0, '#8d6e63');
  groundGrad.addColorStop(0.4, '#795548');
  groundGrad.addColorStop(1, '#5d4037');
  ctx.fillStyle = groundGrad;
  ctx.fillRect(0, groundY, w, h - groundY);

  // Verandah concrete step / bench slab
  const stepGrad = ctx.createLinearGradient(0, groundY - 30, 0, groundY);
  stepGrad.addColorStop(0, '#b0bec5');
  stepGrad.addColorStop(1, '#78909c');
  ctx.fillStyle = stepGrad;
  ctx.fillRect(wallX - 30, groundY - 30, wallW + 30, 30);
  ctx.strokeStyle = '#455a64'; ctx.lineWidth = 2.5;
  ctx.strokeRect(wallX - 30, groundY - 30, wallW + 30, 30);
}

// ----------------------------------------------------------------------------
// Character 1: Abul Mia - The Pious Husband ("আবুল মিয়া")
// ----------------------------------------------------------------------------
function drawAbulMia(ctx, ax, ay, scale, t, isTalking, expr) {
  ctx.save();
  ctx.translate(ax, ay);
  ctx.scale(scale, scale);

  const bob = Math.sin(t * 3.6) * 3.5;
  const talkMouth = isTalking ? Math.abs(Math.sin(t * 15)) : 0;

  // 1. Torso: White Panjabi / Kurta
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(-54, 25 + bob);
  ctx.lineTo(-46, -100 + bob);
  ctx.lineTo(46, -100 + bob);
  ctx.lineTo(54, 25 + bob);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#b0bec5'; ctx.lineWidth = 3.5; ctx.stroke();

  // Collar & Buttons
  ctx.strokeStyle = '#90a4ae'; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(0, -100 + bob); ctx.lineTo(0, -40 + bob); ctx.stroke();
  drawCircle(ctx, 0, -85 + bob, 3, '#546e7a', null);
  drawCircle(ctx, 0, -68 + bob, 3, '#546e7a', null);
  drawCircle(ctx, 0, -50 + bob, 3, '#546e7a', null);

  // 2. Arms & Gestures
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 20; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-42, -90 + bob); ctx.lineTo(-28, -20 + bob); ctx.stroke();
  ctx.strokeStyle = '#cfd8dc'; ctx.lineWidth = 3; ctx.stroke();
  drawCircle(ctx, -26, -14 + bob, 14, '#f5cba7', '#b37d45', 2.5);

  const armMove = isTalking ? Math.sin(t * 7) * 10 : 0;
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 20; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(42, -90 + bob); ctx.lineTo(68 + armMove, -40 + bob); ctx.stroke();
  ctx.strokeStyle = '#cfd8dc'; ctx.lineWidth = 3; ctx.stroke();
  drawCircle(ctx, 74 + armMove, -36 + bob, 14, '#f5cba7', '#b37d45', 2.5);

  // 3. Neck
  drawRoundRect(ctx, -16, -120 + bob, 32, 24, 6, '#f5cba7', '#b37d45', 2.5);

  // 4. Head & Face
  const headY = -160 + bob;

  // Face Oval
  ctx.fillStyle = '#f5cba7';
  ctx.beginPath();
  ctx.ellipse(0, headY + 30, 36, 42, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#b37d45'; ctx.lineWidth = 3; ctx.stroke();

  // Hair peek around ears
  ctx.fillStyle = '#212121';
  ctx.beginPath();
  ctx.ellipse(-36, headY + 28, 8, 14, -0.2, 0, Math.PI * 2);
  ctx.ellipse(36, headY + 28, 8, 14, 0.2, 0, Math.PI * 2);
  ctx.fill();

  // Ears
  drawCircle(ctx, -38, headY + 34, 10, '#f5cba7', '#b37d45', 2.5);
  drawCircle(ctx, 38, headY + 34, 10, '#f5cba7', '#b37d45', 2.5);

  // White Islamic Prayer Cap (সাদা টুপি)
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, headY + 10, 40, Math.PI, 0);
  ctx.lineTo(40, headY + 16);
  ctx.lineTo(-40, headY + 16);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#90a4ae'; ctx.lineWidth = 3.5; ctx.stroke();

  ctx.strokeStyle = '#cfd8dc'; ctx.lineWidth = 2;
  for (let cx = -30; cx <= 30; cx += 12) {
    ctx.beginPath(); ctx.moveTo(cx, headY + 16); ctx.lineTo(cx * 0.7, headY - 26); ctx.stroke();
  }

  // 5. Eyebrows & Eyes
  ctx.strokeStyle = '#212121'; ctx.lineWidth = 4.5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-28, headY + 20); ctx.lineTo(-8, headY + 14); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(28, headY + 20); ctx.lineTo(8, headY + 14); ctx.stroke();

  const blink = (t % 3.6 < 0.16);
  if (blink) {
    ctx.strokeStyle = '#212121'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(-26, headY + 30); ctx.lineTo(-10, headY + 30); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(10, headY + 30); ctx.lineTo(26, headY + 30); ctx.stroke();
  } else {
    drawEllipse(ctx, -18, headY + 30, 10, 8, '#ffffff', '#212121', 2.5);
    drawEllipse(ctx, 18, headY + 30, 10, 8, '#ffffff', '#212121', 2.5);
    drawCircle(ctx, -17, headY + 30, 5, '#3e2723', null);
    drawCircle(ctx, 19, headY + 30, 5, '#3e2723', null);
    drawCircle(ctx, -16.5, headY + 30, 3, '#111111', null);
    drawCircle(ctx, 19.5, headY + 30, 3, '#111111', null);
    drawCircle(ctx, -18, headY + 28, 1.8, '#ffffff', null);
    drawCircle(ctx, 18, headY + 28, 1.8, '#ffffff', null);
  }

  // Nose
  ctx.strokeStyle = '#b37d45'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(0, headY + 34); ctx.lineTo(-4, headY + 46); ctx.lineTo(3, headY + 46); ctx.stroke();

  // 6. Mustache & Beard
  ctx.fillStyle = '#212121';
  ctx.beginPath();
  ctx.moveTo(-22, headY + 48);
  ctx.quadraticCurveTo(-10, headY + 42, 0, headY + 48);
  ctx.quadraticCurveTo(10, headY + 42, 22, headY + 48);
  ctx.quadraticCurveTo(12, headY + 58, 0, headY + 54);
  ctx.quadraticCurveTo(-12, headY + 58, -22, headY + 48);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(-36, headY + 40);
  ctx.lineTo(-32, headY + 65);
  ctx.quadraticCurveTo(-16, headY + 88, 0, headY + 90);
  ctx.quadraticCurveTo(16, headY + 88, 32, headY + 65);
  ctx.lineTo(36, headY + 40);
  ctx.lineTo(26, headY + 44);
  ctx.quadraticCurveTo(0, headY + 66, -26, headY + 44);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#111111'; ctx.lineWidth = 2; ctx.stroke();

  if (isTalking) {
    const mh = 5 + talkMouth * 12;
    drawEllipse(ctx, 0, headY + 58, 8, mh, '#b71c1c', '#212121', 2);
    ctx.fillStyle = '#ff80ab';
    drawCircle(ctx, 0, headY + 58 + mh * 0.35, 3.5, '#ff80ab', null);
  }

  ctx.restore();
}

// ----------------------------------------------------------------------------
// Character 2: Montu Bhai - The Neighbor ("মন্টু ভাই")
// ----------------------------------------------------------------------------
function drawMontuBhai(ctx, mx, my, scale, t, isTalking, expr) {
  ctx.save();
  ctx.translate(mx, my);
  ctx.scale(scale, scale);

  const bob = Math.sin(t * 3.8 + 1) * 3.5;
  const talkMouth = isTalking ? Math.abs(Math.sin(t * 15)) : 0;

  // 1. Torso: Warm Orange Kurta
  ctx.fillStyle = '#f57c00';
  ctx.beginPath();
  ctx.moveTo(-52, 25 + bob);
  ctx.lineTo(-44, -100 + bob);
  ctx.lineTo(44, -100 + bob);
  ctx.lineTo(52, 25 + bob);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#e65100'; ctx.lineWidth = 3.5; ctx.stroke();

  drawCircle(ctx, 0, -80 + bob, 3.5, '#212121', null);
  drawCircle(ctx, 0, -62 + bob, 3.5, '#212121', null);
  drawCircle(ctx, 0, -44 + bob, 3.5, '#212121', null);

  // 2. Arms
  ctx.strokeStyle = '#f57c00'; ctx.lineWidth = 20; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-40, -85 + bob); ctx.lineTo(-85, -55 + bob); ctx.stroke();
  ctx.strokeStyle = '#e65100'; ctx.lineWidth = 3; ctx.stroke();
  drawCircle(ctx, -92, -50 + bob, 14, '#e0a96d', '#b37d45', 2.5);

  ctx.strokeStyle = '#f57c00'; ctx.lineWidth = 20; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(40, -85 + bob); ctx.lineTo(58, -25 + bob); ctx.stroke();
  ctx.strokeStyle = '#e65100'; ctx.lineWidth = 3; ctx.stroke();
  drawCircle(ctx, 60, -18 + bob, 14, '#e0a96d', '#b37d45', 2.5);

  // 3. Neck
  drawRoundRect(ctx, -16, -120 + bob, 32, 24, 6, '#e0a96d', '#b37d45', 2.5);

  // 4. Head & Turban
  const headY = -160 + bob;

  ctx.fillStyle = '#e0a96d';
  ctx.beginPath();
  ctx.ellipse(0, headY + 30, 36, 42, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#b37d45'; ctx.lineWidth = 3; ctx.stroke();

  drawCircle(ctx, -38, headY + 34, 10, '#e0a96d', '#b37d45', 2.5);
  drawCircle(ctx, 38, headY + 34, 10, '#e0a96d', '#b37d45', 2.5);

  // Wrapped Turban
  ctx.save();
  ctx.translate(0, headY + 2);
  drawEllipse(ctx, 0, -12, 48, 28, '#c27d78', '#5d2c28', 3.5);
  ctx.strokeStyle = '#5d2c28'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(-12, -8, 44, -1.2, 0.4); ctx.stroke();
  ctx.beginPath(); ctx.arc(12, -12, 42, -2.4, -0.6); ctx.stroke();
  ctx.strokeStyle = '#8c4843'; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(-38, -6); ctx.lineTo(38, -6); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-42, -16); ctx.lineTo(42, -16); ctx.stroke();
  ctx.restore();

  // 5. Eyebrows & Eyes
  ctx.strokeStyle = '#212121'; ctx.lineWidth = 4.5; ctx.lineCap = 'round';
  if (expr === 'shocked') {
    ctx.beginPath(); ctx.moveTo(-28, headY + 14); ctx.lineTo(-8, headY + 8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(28, headY + 14); ctx.lineTo(8, headY + 8); ctx.stroke();

    drawCircle(ctx, -16, headY + 28, 10, '#ffffff', '#212121', 2.5);
    drawCircle(ctx, -16, headY + 28, 4.5, '#212121', null);
    drawCircle(ctx, 16, headY + 28, 10, '#ffffff', '#212121', 2.5);
    drawCircle(ctx, 16, headY + 28, 4.5, '#212121', null);

    drawEllipse(ctx, 0, headY + 58, 12, 16, '#b71c1c', '#212121', 2.5);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-8, headY + 46, 16, 5);
  } else {
    ctx.beginPath(); ctx.moveTo(-26, headY + 20); ctx.lineTo(-8, headY + 18); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(26, headY + 20); ctx.lineTo(8, headY + 18); ctx.stroke();

    drawEllipse(ctx, -16, headY + 28, 10, 8, '#ffffff', '#212121', 2.5);
    drawEllipse(ctx, 16, headY + 28, 10, 8, '#ffffff', '#212121', 2.5);
    drawCircle(ctx, -16, headY + 28, 5, '#3e2723', null);
    drawCircle(ctx, 16, headY + 28, 5, '#3e2723', null);
    drawCircle(ctx, -17.5, headY + 26.5, 1.8, '#ffffff', null);
    drawCircle(ctx, 14.5, headY + 26.5, 1.8, '#ffffff', null);

    ctx.fillStyle = '#212121';
    ctx.beginPath();
    ctx.moveTo(-22, headY + 44);
    ctx.quadraticCurveTo(0, headY + 38, 22, headY + 44);
    ctx.quadraticCurveTo(0, headY + 52, -22, headY + 44);
    ctx.fill();

    if (isTalking) {
      const mh = 5 + talkMouth * 12;
      drawEllipse(ctx, 0, headY + 54, 8, mh, '#b71c1c', '#212121', 2);
    } else {
      ctx.strokeStyle = '#b71c1c'; ctx.lineWidth = 3.5;
      ctx.beginPath(); ctx.arc(0, headY + 52, 8, 0.2, Math.PI - 0.2); ctx.stroke();
    }
  }

  ctx.restore();
}

// ----------------------------------------------------------------------------
// Character 3: Jorina Begum - The Suspicious Wife ("জরিনা বেগম")
// ----------------------------------------------------------------------------
function drawJorinaBegum(ctx, jx, jy, scale, t, isAngry) {
  ctx.save();
  ctx.translate(jx, jy);
  ctx.scale(scale, scale);

  const bob = Math.sin(t * 3.2) * 3;

  // 1. Long Dark Hair behind head
  ctx.fillStyle = '#212121';
  ctx.beginPath();
  ctx.ellipse(0, -135 + bob, 38, 48, 0, 0, Math.PI * 2);
  ctx.fill();

  // 2. Torso: Pink Salwar Kameez
  ctx.fillStyle = '#e91e63';
  ctx.beginPath();
  ctx.moveTo(-44, 25 + bob);
  ctx.lineTo(-36, -95 + bob);
  ctx.lineTo(36, -95 + bob);
  ctx.lineTo(44, 25 + bob);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#c2185b'; ctx.lineWidth = 3.5; ctx.stroke();

  // Purple Dupatta (ওড়না)
  ctx.fillStyle = '#7b1fa2';
  ctx.beginPath();
  ctx.moveTo(-38, -95 + bob);
  ctx.lineTo(-14, -20 + bob);
  ctx.lineTo(28, -32 + bob);
  ctx.lineTo(38, -95 + bob);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#4a148c'; ctx.lineWidth = 2.5; ctx.stroke();

  // 3. Arms Crossed Tight
  ctx.strokeStyle = '#e91e63'; ctx.lineWidth = 18; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-36, -85 + bob); ctx.lineTo(18, -50 + bob); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(36, -85 + bob); ctx.lineTo(-18, -50 + bob); ctx.stroke();
  drawCircle(ctx, 20, -50 + bob, 11, '#f5cba7', '#b37d45', 2);
  drawCircle(ctx, -20, -50 + bob, 11, '#f5cba7', '#b37d45', 2);

  // 4. Neck
  drawRoundRect(ctx, -14, -115 + bob, 28, 22, 5, '#f5cba7', '#b37d45', 2);

  // 5. Head & Face
  const headY = -155 + bob;

  ctx.fillStyle = '#f5cba7';
  ctx.beginPath();
  ctx.ellipse(0, headY + 30, 32, 38, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#b37d45'; ctx.lineWidth = 2.5; ctx.stroke();

  // Hair Front Framing
  ctx.fillStyle = '#212121';
  ctx.beginPath();
  ctx.arc(0, headY + 10, 34, Math.PI, 0);
  ctx.lineTo(34, headY + 25);
  ctx.quadraticCurveTo(15, headY + 12, 0, headY + 18);
  ctx.quadraticCurveTo(-15, headY + 12, -34, headY + 25);
  ctx.closePath();
  ctx.fill();

  // Red Bindi
  drawCircle(ctx, 0, headY + 20, 3.5, '#d32f2f', null);

  // 6. Glaring Facial Features
  ctx.strokeStyle = '#212121'; ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-24, headY + 20); ctx.lineTo(-6, headY + 25); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(24, headY + 20); ctx.lineTo(6, headY + 25); ctx.stroke();

  drawEllipse(ctx, -14, headY + 30, 9, 6.5, '#ffffff', '#212121', 2.5);
  drawEllipse(ctx, 14, headY + 30, 9, 6.5, '#ffffff', '#212121', 2.5);
  drawCircle(ctx, -11, headY + 30, 4, '#212121', null);
  drawCircle(ctx, 17, headY + 30, 4, '#212121', null);
  drawCircle(ctx, -12, headY + 28.5, 1.5, '#ffffff', null);
  drawCircle(ctx, 16, headY + 28.5, 1.5, '#ffffff', null);

  // Nose
  ctx.strokeStyle = '#b37d45'; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(0, headY + 34); ctx.lineTo(-3, headY + 44); ctx.lineTo(2, headY + 44); ctx.stroke();

  // Pouting Mouth
  ctx.strokeStyle = '#c2185b'; ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(-10, headY + 52);
  ctx.quadraticCurveTo(0, headY + 47, 10, headY + 52);
  ctx.stroke();

  if (isAngry) {
    ctx.strokeStyle = '#d32f2f'; ctx.lineWidth = 3.5;
    const vx = 28;
    const vy = headY - 10;
    ctx.beginPath(); ctx.arc(vx, vy, 8, 0, Math.PI / 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(vx + 12, vy, 8, Math.PI / 2, Math.PI); ctx.stroke();
    ctx.beginPath(); ctx.arc(vx, vy + 12, 8, -Math.PI / 2, 0); ctx.stroke();
    ctx.beginPath(); ctx.arc(vx + 12, vy + 12, 8, Math.PI, -Math.PI / 2); ctx.stroke();
  }

  ctx.restore();
}

// ----------------------------------------------------------------------------
// Houri / Fantasy Thought Cloud (Scene 4: বেহেশতের হুর!)
// ----------------------------------------------------------------------------
function drawHouriFantasyCloud(ctx, cx, cy, cw, ch, t) {
  ctx.save();

  // Thought bubbles connecting from Abul Mia's head
  drawCircle(ctx, cx + cw * 0.25, cy + ch * 0.72, 8, '#ffffff', '#ce93d8', 2);
  drawCircle(ctx, cx + cw * 0.15, cy + ch * 0.58, 14, '#ffffff', '#ce93d8', 2);
  drawCircle(ctx, cx + cw * 0.05, cy + ch * 0.44, 20, '#ffffff', '#ce93d8', 2);

  // Cloud backdrop
  drawRoundRect(ctx, cx - cw / 2, cy - ch / 2, cw, ch, 28, '#f3e5f5', '#ab47bc', 4);

  // Golden Glow & Stars
  ctx.fillStyle = '#fbc02d';
  for (let i = 0; i < 5; i++) {
    const sx = cx - cw * 0.35 + i * (cw * 0.18);
    const sy = cy - ch * 0.28 + Math.sin(t * 6 + i) * 8;
    drawCircle(ctx, sx, sy, 4 + Math.sin(t * 8 + i) * 2, '#fff59d', '#fbc02d', 1.5);
  }

  // Heavenly Golden Gate / Arch Motif
  const gx = cx;
  const gy = cy + ch * 0.14;
  ctx.strokeStyle = '#ffd54f'; ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(gx, gy, 38, Math.PI, 0);
  ctx.stroke();
  ctx.fillStyle = '#fff9c4'; ctx.fill();

  // Angelic Light Wings
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(gx - 42, gy - 10, 24, 12, -0.4, 0, Math.PI * 2);
  ctx.ellipse(gx + 42, gy - 10, 24, 12, 0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#ce93d8'; ctx.lineWidth = 2; ctx.stroke();

  // Banner text
  ctx.fillStyle = '#6a1b9a';
  ctx.font = 'bold 22px "Noto Sans Bengali", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('বেহেশতের হুরপরী! ✨👑', cx, cy + ch * 0.38);

  ctx.restore();
}

// ----------------------------------------------------------------------------
// Official Channel Watermark & Outro Screen
// ----------------------------------------------------------------------------
function drawChannelWatermark(ctx, w, h, isPort, t) {
  const badgeX = isPort ? w - 210 : w - 240;
  const badgeY = isPort ? 28 : 28;
  const badgeW = isPort ? 186 : 210;
  const badgeH = 58;

  drawRoundRect(ctx, badgeX, badgeY, badgeW, badgeH, 16, '#000000cc', '#ffd54f', 2.5);

  if (logoLoaded && logoImg.width > 0) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(badgeX + 30, badgeY + 29, 22, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(logoImg, badgeX + 8, badgeY + 7, 44, 44);
    ctx.restore();
    drawCircle(ctx, badgeX + 30, badgeY + 29, 22, null, '#ffd54f', 2);
  }

  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${isPort ? 20 : 22}px "Noto Sans Bengali", sans-serif`;
  ctx.textAlign = 'left';
  ctx.fillText('DipuToons', badgeX + 58, badgeY + 28);
  ctx.font = '12px "Noto Sans Bengali", sans-serif';
  ctx.fillStyle = '#ffe082';
  ctx.fillText('ছোট্ট কার্টুন, বড় হাসি!', badgeX + 58, badgeY + 47);
}

// Grand Outro Card (14.0s - 17.23s)
function drawOutroCard(ctx, w, h, isPort, t) {
  const p = Math.max(0, Math.min(1, (t - 14.0) / 0.8));
  ctx.save();
  ctx.fillStyle = `rgba(15, 23, 42, ${0.94 * p})`;
  ctx.fillRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h / 2;

  const logoSize = isPort ? w * 0.68 : h * 0.54;
  const ly = cy - (isPort ? h * 0.08 : h * 0.06);

  if (logoLoaded && logoImg.width > 0) {
    ctx.save();
    ctx.shadowColor = '#fbc02d';
    ctx.shadowBlur = 30;
    drawCircle(ctx, cx, ly, logoSize / 2 + 8, null, '#fbc02d', 6);
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, ly, logoSize / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(logoImg, cx - logoSize / 2, ly - logoSize / 2, logoSize, logoSize);
    ctx.restore();
    drawCircle(ctx, cx, ly, logoSize / 2, null, '#ffffff', 4);
  }

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffeb3b';
  ctx.font = `bold ${isPort ? 56 : 64}px "Noto Sans Bengali", sans-serif`;
  ctx.fillText('DipuToons', cx, ly + logoSize / 2 + (isPort ? 66 : 60));

  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${isPort ? 32 : 36}px "Noto Sans Bengali", sans-serif`;
  ctx.fillText('ছোট্ট কার্টুন, বড় হাসি! 😂', cx, ly + logoSize / 2 + (isPort ? 118 : 108));

  const btnW = isPort ? 340 : 380;
  const btnH = 62;
  const btnY = ly + logoSize / 2 + (isPort ? 155 : 140);
  drawRoundRect(ctx, cx - btnW / 2, btnY, btnW, btnH, 31, '#d32f2f', '#ffffff', 3.5);
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${isPort ? 24 : 26}px "Noto Sans Bengali", sans-serif`;
  ctx.fillText('🔔 সাবস্ক্রাইব করুন', cx, btnY + 41);

  ctx.restore();
}

// ----------------------------------------------------------------------------
// Comic Speech Balloon & Synchronized Subtitle Bar
// (Clamped so it never overflows off-screen in portrait or landscape!)
// ----------------------------------------------------------------------------
function drawSpeechBalloon(ctx, w, h, x, y, speaker, text, pointLeft) {
  ctx.save();
  ctx.font = 'bold 23px "Noto Sans Bengali", sans-serif';
  const tm = ctx.measureText(text);
  const bw = Math.min(w - 48, Math.max(220, tm.width + 48));
  const bh = 68;

  let bx = pointLeft ? x : x - bw;
  bx = Math.max(24, Math.min(w - bw - 24, bx));
  const by = Math.max(24, y - bh - 24);

  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  drawRoundRect(ctx, bx + 4, by + 4, bw, bh, 18, 'rgba(0,0,0,0.25)', null);
  drawRoundRect(ctx, bx, by, bw, bh, 18, '#ffffff', '#263238', 3.5);

  // Pointer Tail pointing accurately to speaker
  const tailX = Math.max(bx + 25, Math.min(bx + bw - 25, x));
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(tailX - 16, by + bh);
  ctx.lineTo(x, by + bh + 22);
  ctx.lineTo(tailX + 16, by + bh);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#263238'; ctx.lineWidth = 3.5; ctx.stroke();

  // Speaker Badge
  const isAbul = speaker.includes('আবুল');
  const isMontu = speaker.includes('মন্টু');
  const badgeBg = isAbul ? '#2e7d32' : (isMontu ? '#e65100' : '#c2185b');
  drawRoundRect(ctx, bx + 16, by - 16, 175, 28, 8, badgeBg, '#ffffff', 2);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 15px "Noto Sans Bengali", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(speaker, bx + 24, by + 3);

  // Dialogue Text
  ctx.fillStyle = '#102027';
  ctx.font = 'bold 22px "Noto Sans Bengali", sans-serif';
  ctx.fillText(text, bx + 24, by + 45);

  ctx.restore();
}

function drawBottomSubtitleBar(ctx, w, h, speaker, text) {
  const isPort = h > w;
  const barH = isPort ? 130 : 90;
  const barY = h - barH - 24;
  const barW = isPort ? w - 48 : w * 0.86;
  const barX = (w - barW) / 2;

  drawRoundRect(ctx, barX, barY, barW, barH, 20, 'rgba(15, 23, 42, 0.90)', '#ffd54f', 3);

  const isAbul = speaker.includes('আবুল');
  const isMontu = speaker.includes('মন্টু');
  const badgeCol = isAbul ? '#2e7d32' : (isMontu ? '#ef6c00' : '#c2185b');
  const badgeW = isPort ? 210 : 230;
  drawRoundRect(ctx, barX + 18, barY + (isPort ? 14 : 20), badgeW, 46, 12, badgeCol, '#ffffff', 2);

  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${isPort ? 20 : 21}px "Noto Sans Bengali", sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText(speaker, barX + 18 + badgeW / 2, barY + (isPort ? 44 : 50));

  ctx.textAlign = isPort ? 'center' : 'left';
  ctx.fillStyle = '#ffeb3b';
  ctx.font = `bold ${isPort ? 25 : 27}px "Noto Sans Bengali", sans-serif`;
  if (isPort) {
    ctx.fillText(text, barX + barW / 2, barY + 102);
  } else {
    ctx.fillText(text, barX + badgeW + 36, barY + 54);
  }
}

// ----------------------------------------------------------------------------
// MAIN FRAME RENDERER (Called for every frame t: 0 -> 17.23)
// ----------------------------------------------------------------------------
function frame(ctx, w, h, t) {
  ctx.clearRect(0, 0, w, h);
  const isPort = h > w;

  // 1. Draw Rural Environment
  drawVillageBackground(ctx, w, h, isPort, t);

  // Determine Dialogue Beat & Active Speaker
  let speaker = '';
  let speechText = '';
  let activeSpeaker = 'none'; // 'montu' | 'abul'
  let montuExpr = 'normal';
  let showHouri = false;
  let wifeAngry = false;

  if (t < 2.0) {
    speaker = '👳 মন্টু ভাই (প্রতিবেশী)';
    speechText = 'কী হয়েছে ভাই?';
    activeSpeaker = 'montu';
  } else if (t < 7.5) {
    speaker = '🧔 আবুল মিয়া (স্বামী)';
    speechText = 'বউয়ের সন্দেহ দূর করতে পায়জামা-পাঞ্জাবি পইরে, দাঁড়ি রেখে পাঁচ ওয়াক্ত নামাজ শুরু করেছিলাম...';
    activeSpeaker = 'abul';
  } else if (t < 10.5) {
    speaker = '🧔 আবুল মিয়া (স্বামী)';
    speechText = 'এই নামাজ পড়তে দেখে শাকচুন্নীর বেটি কয় কি? কয়...';
    activeSpeaker = 'abul';
    wifeAngry = true;
  } else if (t < 13.8) {
    speaker = '🧔 আবুল মিয়া (স্বামী)';
    speechText = 'এখন দিন-দুনিয়ার খেদমত ছাড়িয়া দিয়ে, বেহেশতের হুরের ওপর নজর দিতেছি!';
    activeSpeaker = 'abul';
    showHouri = true;
    montuExpr = 'shocked';
    wifeAngry = true;
  } else {
    montuExpr = 'shocked';
    wifeAngry = true;
  }

  // 2. Characters Positions & Layout (Bold, prominent, medium close-up framing!)
  if (!isPort) {
    // ---------------- LANDSCAPE LAYOUT (16:9) ----------------
    // Wife on Left (glaring, arms crossed)
    const jx = w * 0.16;
    const jy = h * 0.82;
    drawJorinaBegum(ctx, jx, jy, 2.30, t, wifeAngry);

    // Abul Mia (Husband) seated in the center (prominent, expressive)
    const ax = w * 0.50;
    const ay = h * 0.84;
    drawAbulMia(ctx, ax, ay, 2.40, t, activeSpeaker === 'abul', 'normal');

    // Montu Bhai (Friend/Neighbor) standing right beside Abul, arm around shoulder
    const mx = w * 0.80;
    const my = h * 0.82;
    drawMontuBhai(ctx, mx, my, 2.40, t, activeSpeaker === 'montu', montuExpr);

    // Houri Fantasy Cloud (Punchline Scene)
    if (showHouri) {
      drawHouriFantasyCloud(ctx, w * 0.50, h * 0.22, 420, 210, t);
    }

    // Speech Balloon above talking character
    if (activeSpeaker === 'montu') {
      drawSpeechBalloon(ctx, w, h, w * 0.80, h * 0.28, speaker, speechText, false);
    } else if (activeSpeaker === 'abul') {
      drawSpeechBalloon(ctx, w, h, w * 0.50, h * 0.26, speaker, speechText, true);
    }

  } else {
    // ---------------- PORTRAIT LAYOUT (9:16) ----------------
    // Wife on Left
    const jx = w * 0.16;
    const jy = h * 0.78;
    drawJorinaBegum(ctx, jx, jy, 2.10, t, wifeAngry);

    // Abul Mia (Husband) seated on center-right
    const ax = w * 0.50;
    const ay = h * 0.76;
    drawAbulMia(ctx, ax, ay, 2.20, t, activeSpeaker === 'abul', 'normal');

    // Montu Bhai (Neighbor) standing behind/right of Abul
    const mx = w * 0.84;
    const my = h * 0.76;
    drawMontuBhai(ctx, mx, my, 2.20, t, activeSpeaker === 'montu', montuExpr);

    // Houri Fantasy Cloud in Portrait
    if (showHouri) {
      drawHouriFantasyCloud(ctx, w * 0.50, h * 0.26, 380, 220, t);
    }

    // Speech Balloon
    if (activeSpeaker === 'montu') {
      drawSpeechBalloon(ctx, w, h, w * 0.80, h * 0.32, speaker, speechText, false);
    } else if (activeSpeaker === 'abul') {
      drawSpeechBalloon(ctx, w, h, w * 0.48, h * 0.30, speaker, speechText, true);
    }
  }

  // 3. Bottom Subtitle Banner
  if (speaker && speechText && t < 14.0) {
    drawBottomSubtitleBar(ctx, w, h, speaker, speechText);
  }

  // 4. Channel Watermark Badge (DipuToons)
  if (t < 14.0) {
    drawChannelWatermark(ctx, w, h, isPort, t);
  }

  // 5. Outro End Card (14.0s - 17.23s)
  if (t >= 14.0) {
    drawOutroCard(ctx, w, h, isPort, t);
  }
}
