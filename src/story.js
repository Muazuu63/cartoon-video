// ============================================================================
// DipuToons - Premium 2D Cartoon Animation Engine
// Episode: "নিজেরাই নিজেরায় বিয়ে!" (Father & Son Marriage Joke)
// Characters: বাবা (Young modern dad) & ছেলে (Cute toddler/kid)
// Style: High-Quality 2D Animated Cartoon matching 3D Reference Photo
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
// Core Vector Utilities
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
// Modern Living Room Environment
// ----------------------------------------------------------------------------
function drawLivingRoomBackground(ctx, w, h, isPort, t) {
  // 1. Warm Contemporary Wall
  const wallGrad = ctx.createLinearGradient(0, 0, 0, h * 0.72);
  wallGrad.addColorStop(0, '#f8fafc');
  wallGrad.addColorStop(0.5, '#f1f5f9');
  wallGrad.addColorStop(1, '#e2e8f0');
  ctx.fillStyle = wallGrad;
  ctx.fillRect(0, 0, w, h);

  // Soft wall molding
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(w * 0.04, h * 0.05, w * 0.92, h * 0.63);

  // 2. Large Sunlit Window (Left)
  const winX = isPort ? w * 0.08 : w * 0.07;
  const winY = isPort ? h * 0.08 : h * 0.09;
  const winW = isPort ? w * 0.38 : w * 0.22;
  const winH = isPort ? h * 0.26 : h * 0.36;

  // Outer Window Frame
  drawRoundRect(ctx, winX - 8, winY - 8, winW + 16, winH + 16, 14, '#ffffff', '#94a3b8', 3);
  drawRoundRect(ctx, winX, winY, winW, winH, 10, '#e0f2fe', '#64748b', 4);

  // Outdoor Garden View
  ctx.save();
  ctx.beginPath();
  ctx.rect(winX, winY, winW, winH);
  ctx.clip();

  const skyGrad = ctx.createLinearGradient(winX, winY, winX, winY + winH);
  skyGrad.addColorStop(0, '#38bdf8');
  skyGrad.addColorStop(1, '#bae6fd');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(winX, winY, winW, winH);

  // Soft sun ray
  ctx.fillStyle = 'rgba(255, 255, 255, 0.30)';
  ctx.beginPath();
  ctx.moveTo(winX, winY);
  ctx.lineTo(winX + winW * 0.45, winY);
  ctx.lineTo(winX, winY + winH * 0.75);
  ctx.closePath();
  ctx.fill();

  // Green foliage
  drawCircle(ctx, winX + winW * 0.30, winY + winH * 0.85, winW * 0.40, '#86efac', null);
  drawCircle(ctx, winX + winW * 0.75, winY + winH * 0.70, winW * 0.35, '#4ade80', null);
  drawCircle(ctx, winX + winW * 0.50, winY + winH * 0.95, winW * 0.32, '#22c55e', null);

  // Window Panes
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(winX + winW / 2, winY); ctx.lineTo(winX + winW / 2, winY + winH); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(winX, winY + winH * 0.45); ctx.lineTo(winX + winW, winY + winH * 0.45); ctx.stroke();

  ctx.restore();

  // Pastel Pink Curtains
  const curtainW = winW * 0.16;
  drawRoundRect(ctx, winX - 4, winY - 4, curtainW, winH + 12, 6, '#fbcfe8', '#f472b6', 2);
  drawRoundRect(ctx, winX + winW - curtainW + 4, winY - 4, curtainW, winH + 12, 6, '#fbcfe8', '#f472b6', 2);

  // 3. Wall Art Frame (Right)
  const picX = isPort ? w * 0.62 : w * 0.76;
  const picY = isPort ? h * 0.09 : h * 0.09;
  const picW = isPort ? w * 0.30 : w * 0.17;
  const picH = isPort ? h * 0.18 : h * 0.24;

  drawRoundRect(ctx, picX - 6, picY - 6, picW + 12, picH + 12, 10, '#475569', '#1e293b', 3);
  drawRoundRect(ctx, picX, picY, picW, picH, 6, '#fffbeb', '#cbd5e1', 2);

  drawCircle(ctx, picX + picW * 0.32, picY + picH * 0.40, picW * 0.14, '#0284c7', null);
  drawCircle(ctx, picX + picW * 0.68, picY + picH * 0.42, picW * 0.13, '#ec4899', null);
  drawCircle(ctx, picX + picW * 0.50, picY + picH * 0.64, picW * 0.11, '#eab308', null);
  ctx.fillStyle = '#b45309';
  ctx.font = `bold ${Math.max(11, Math.floor(picW * 0.085))}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText('FAMILY ❤️', picX + picW / 2, picY + picH * 0.90);

  // 4. Background Sofa
  const sofaW = isPort ? w * 0.74 : w * 0.44;
  const sofaH = isPort ? h * 0.16 : h * 0.22;
  const sofaX = (w - sofaW) / 2;
  const sofaY = (isPort ? h * 0.70 : h * 0.70) - sofaH * 0.84;

  drawRoundRect(ctx, sofaX, sofaY, sofaW, sofaH * 0.75, 20, '#64748b', '#334155', 3);
  const cushW = (sofaW - 24) / 3;
  for (let c = 0; c < 3; c++) {
    drawRoundRect(ctx, sofaX + 12 + c * cushW, sofaY + sofaH * 0.35, cushW - 6, sofaH * 0.45, 12, '#94a3b8', '#475569', 2);
  }
  drawRoundRect(ctx, sofaX + 20, sofaY + sofaH * 0.25, 45, 40, 10, '#fef08a', '#eab308', 2);
  drawRoundRect(ctx, sofaX + sofaW - 65, sofaY + sofaH * 0.25, 45, 40, 10, '#fbcfe8', '#f472b6', 2);

  // 5. Polished Hardwood Floor
  const floorY = isPort ? h * 0.70 : h * 0.70;
  const floorGrad = ctx.createLinearGradient(0, floorY, 0, h);
  floorGrad.addColorStop(0, '#a16207');
  floorGrad.addColorStop(0.3, '#854d0e');
  floorGrad.addColorStop(1, '#713f12');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, floorY, w, h - floorY);

  ctx.strokeStyle = '#451a032b';
  ctx.lineWidth = 2.5;
  for (let y = floorY + 30; y < h; y += 42) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }

  // Baseboard Trim
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, floorY - 14, w, 14);
  ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2;
  ctx.strokeRect(0, floorY - 14, w, 14);

  // 6. Indoor Plant (Bottom Left)
  const potX = isPort ? w * 0.05 : w * 0.04;
  const potY = floorY - 55;
  drawRoundRect(ctx, potX, potY, 52, 58, 8, '#ffffff', '#94a3b8', 2.5);
  drawEllipse(ctx, potX + 26, potY - 32, 22, 38, '#16a34a', '#14532d', 2.5, -0.3);
  drawEllipse(ctx, potX + 12, potY - 56, 25, 42, '#22c55e', '#15803d', 2.5, -0.6);
  drawEllipse(ctx, potX + 42, potY - 48, 24, 38, '#4ade80', '#15803d', 2.5, 0.4);
}

// ----------------------------------------------------------------------------
// Character 1: Father ("বাবা")
// Exactly matching user 3D photo (media_1795111775615_28792646.jpg)
// ----------------------------------------------------------------------------
function drawFather(ctx, fx, fy, scale, t, isTalking, expr) {
  ctx.save();
  ctx.translate(fx, fy);
  ctx.scale(scale, scale);

  const bob = Math.sin(t * 3.8) * 3;
  const talkMouth = isTalking ? Math.abs(Math.sin(t * 15)) : 0;

  // Soft Floor Shadow
  drawEllipse(ctx, 0, 134 + bob, 46, 11, 'rgba(0, 0, 0, 0.28)', null);

  // ==================== 1. JEANS & LEGS ====================
  // Blue Straight-Leg Denim Jeans
  const denimGrad = ctx.createLinearGradient(-30, 0, 30, 0);
  denimGrad.addColorStop(0, '#365d8c');
  denimGrad.addColorStop(0.3, '#456b9c');
  denimGrad.addColorStop(0.7, '#456b9c');
  denimGrad.addColorStop(1, '#365d8c');

  // Left Leg
  ctx.fillStyle = denimGrad;
  ctx.beginPath();
  ctx.moveTo(-24, 0 + bob);
  ctx.lineTo(-26, 65 + bob);
  ctx.lineTo(-28, 124 + bob);
  ctx.lineTo(-6, 124 + bob);
  ctx.lineTo(-4, 65 + bob);
  ctx.lineTo(-6, 0 + bob);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#28466e'; ctx.lineWidth = 2.2; ctx.stroke();

  // Right Leg
  ctx.fillStyle = denimGrad;
  ctx.beginPath();
  ctx.moveTo(6, 0 + bob);
  ctx.lineTo(4, 65 + bob);
  ctx.lineTo(6, 124 + bob);
  ctx.lineTo(28, 124 + bob);
  ctx.lineTo(26, 65 + bob);
  ctx.lineTo(24, 0 + bob);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#28466e'; ctx.lineWidth = 2.2; ctx.stroke();

  // Denim Fly & Crotch Seams
  ctx.strokeStyle = '#203654'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(-6, 0 + bob); ctx.lineTo(0, 18 + bob); ctx.lineTo(6, 0 + bob); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, 18 + bob); ctx.lineTo(0, 34 + bob); ctx.stroke();

  // Knee Crease Folds
  ctx.beginPath(); ctx.moveTo(-22, 68 + bob); ctx.quadraticCurveTo(-15, 72 + bob, -8, 68 + bob); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(8, 68 + bob); ctx.quadraticCurveTo(15, 72 + bob, 22, 68 + bob); ctx.stroke();

  // Ankle Folds
  ctx.beginPath(); ctx.moveTo(-27, 118 + bob); ctx.lineTo(-7, 118 + bob); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(7, 118 + bob); ctx.lineTo(27, 118 + bob); ctx.stroke();

  // Slide Sandals (Dark with comfortable wide strap)
  // Left Sandal
  drawRoundRect(ctx, -30, 124 + bob, 26, 9, 3.5, '#232a35', '#0f141c', 1.8);
  drawRoundRect(ctx, -27, 121 + bob, 20, 6, 2.5, '#394454', null);
  // Visible Toes
  drawCircle(ctx, -9, 125 + bob, 3, '#c68b59', null);

  // Right Sandal
  drawRoundRect(ctx, 4, 124 + bob, 26, 9, 3.5, '#232a35', '#0f141c', 1.8);
  drawRoundRect(ctx, 7, 121 + bob, 20, 6, 2.5, '#394454', null);
  // Visible Toes
  drawCircle(ctx, 25, 125 + bob, 3, '#c68b59', null);

  // ==================== 2. YELLOW CREWNECK T-SHIRT ====================
  // Bright cheerful sunny yellow
  const yellowGrad = ctx.createLinearGradient(-35, 0, 35, 0);
  yellowGrad.addColorStop(0, '#eab308');
  yellowGrad.addColorStop(0.25, '#facc15');
  yellowGrad.addColorStop(0.75, '#facc15');
  yellowGrad.addColorStop(1, '#eab308');
  ctx.fillStyle = yellowGrad;

  // Athletic Torso
  ctx.beginPath();
  ctx.moveTo(-28, 2 + bob);
  ctx.quadraticCurveTo(-30, -38 + bob, -29, -68 + bob);
  ctx.lineTo(-38, -82 + bob); // left shoulder slope
  ctx.quadraticCurveTo(-18, -92 + bob, 0, -90 + bob);
  ctx.quadraticCurveTo(18, -92 + bob, 38, -82 + bob); // right shoulder slope
  ctx.lineTo(29, -68 + bob);
  ctx.quadraticCurveTo(30, -38 + bob, 28, 2 + bob);
  ctx.quadraticCurveTo(0, 5 + bob, -28, 2 + bob);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#ca8a04'; ctx.lineWidth = 2.2; ctx.stroke();

  // Crewneck Collar
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(0, -90 + bob, 12, 0.2, Math.PI - 0.2);
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = '#ca8a04';
  ctx.stroke();

  // Sleeves
  // Left Sleeve
  ctx.fillStyle = '#eab308';
  ctx.beginPath();
  ctx.moveTo(-38, -82 + bob);
  ctx.lineTo(-50, -56 + bob);
  ctx.lineTo(-38, -50 + bob);
  ctx.lineTo(-29, -68 + bob);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#ca8a04'; ctx.lineWidth = 2; ctx.stroke();

  // Right Sleeve
  ctx.fillStyle = '#eab308';
  ctx.beginPath();
  ctx.moveTo(38, -82 + bob);
  ctx.lineTo(50, -56 + bob);
  ctx.lineTo(38, -50 + bob);
  ctx.lineTo(29, -68 + bob);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#ca8a04'; ctx.lineWidth = 2; ctx.stroke();

  // ==================== 3. ARMS & HANDS ====================
  ctx.fillStyle = '#c68b59';
  ctx.strokeStyle = '#a66838';

  if (expr === 'laughing') {
    // Both arms bent holding belly laughing
    ctx.lineWidth = 11; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-44, -54 + bob); ctx.quadraticCurveTo(-38, -25 + bob, -16, -12 + bob); ctx.stroke();
    drawCircle(ctx, -14, -10 + bob, 8.5, '#c68b59', '#a66838', 1.8);

    ctx.beginPath(); ctx.moveTo(44, -54 + bob); ctx.quadraticCurveTo(38, -25 + bob, 16, -12 + bob); ctx.stroke();
    drawCircle(ctx, 14, -10 + bob, 8.5, '#c68b59', '#a66838', 1.8);
  } else if (expr === 'proud_me') {
    // Left arm resting at side
    ctx.lineWidth = 11; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-44, -54 + bob); ctx.lineTo(-38, -8 + bob); ctx.stroke();
    drawCircle(ctx, -36, -5 + bob, 8.5, '#c68b59', '#a66838', 1.8);

    // Right arm bent up pointing thumb proudly at chest! ("আমাকে!")
    ctx.beginPath(); ctx.moveTo(44, -54 + bob); ctx.lineTo(28, -28 + bob); ctx.lineTo(10, -42 + bob); ctx.stroke();
    drawCircle(ctx, 8, -45 + bob, 9, '#c68b59', '#a66838', 1.8);
    // Pointing thumb
    ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(8, -45 + bob); ctx.lineTo(-2, -50 + bob); ctx.stroke();
  } else {
    // Natural standing pose, arms hanging loosely at sides
    ctx.lineWidth = 11; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-44, -54 + bob); ctx.lineTo(-38, -4 + bob); ctx.stroke();
    drawCircle(ctx, -36, -1 + bob, 8.5, '#c68b59', '#a66838', 1.8);

    ctx.beginPath(); ctx.moveTo(44, -54 + bob); ctx.lineTo(38, -4 + bob); ctx.stroke();
    drawCircle(ctx, 36, -1 + bob, 8.5, '#c68b59', '#a66838', 1.8);
  }

  // ==================== 4. NECK ====================
  ctx.fillStyle = '#c68b59';
  ctx.fillRect(-9, -106 + bob, 18, 18);
  ctx.strokeStyle = '#a66838'; ctx.lineWidth = 1.8;
  ctx.strokeRect(-9, -106 + bob, 18, 18);

  // ==================== 5. HEAD & CHARMING FACE ====================
  const headY = -146 + bob;

  // Face Oval with Defined Handsome Jawline
  ctx.fillStyle = '#c68b59';
  ctx.beginPath();
  ctx.moveTo(-18, headY + 8);
  ctx.lineTo(-17, headY + 32);
  ctx.quadraticCurveTo(-14, headY + 50, 0, headY + 52);
  ctx.quadraticCurveTo(14, headY + 50, 17, headY + 32);
  ctx.lineTo(18, headY + 8);
  ctx.quadraticCurveTo(0, headY - 8, -18, headY + 8);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#a66838'; ctx.lineWidth = 2; ctx.stroke();

  // Natural Ears (Properly proportioned, flush against head)
  drawEllipse(ctx, -19, headY + 24, 3.5, 7.5, '#c68b59', '#a66838', 1.6);
  drawEllipse(ctx, 19, headY + 24, 3.5, 7.5, '#c68b59', '#a66838', 1.6);

  // Trimmed Short Beard & Stubble (Soft modern fade, exactly like 3D photo)
  ctx.save();
  ctx.fillStyle = 'rgba(35, 41, 50, 0.42)';
  ctx.beginPath();
  ctx.moveTo(-17, headY + 28);
  ctx.lineTo(-16, headY + 36);
  ctx.quadraticCurveTo(-12, headY + 50, 0, headY + 52);
  ctx.quadraticCurveTo(12, headY + 50, 16, headY + 36);
  ctx.lineTo(17, headY + 28);
  ctx.quadraticCurveTo(11, headY + 34, 0, headY + 36);
  ctx.quadraticCurveTo(-11, headY + 34, -17, headY + 28);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Chin Stubble Accent
  drawEllipse(ctx, 0, headY + 46, 4.5, 3, '#1f2937', null);

  // Trimmed Neat Mustache
  ctx.fillStyle = '#1f2937';
  ctx.beginPath();
  ctx.moveTo(-11, headY + 35);
  ctx.quadraticCurveTo(0, headY + 32, 11, headY + 35);
  ctx.quadraticCurveTo(0, headY + 39, -11, headY + 35);
  ctx.fill();

  // Modern Styled Quiff Hair (Voluminous sweep on top, cropped sides)
  ctx.fillStyle = '#111827';
  ctx.beginPath();
  ctx.moveTo(-20, headY + 16);
  ctx.lineTo(-20, headY + 2);
  ctx.quadraticCurveTo(-18, headY - 18, -8, headY - 22);
  ctx.lineTo(2, headY - 24);
  ctx.quadraticCurveTo(16, headY - 20, 21, headY - 6);
  ctx.lineTo(20, headY + 16);
  ctx.lineTo(17, headY + 6);
  ctx.quadraticCurveTo(8, headY + 2, 0, headY + 10);
  ctx.quadraticCurveTo(-8, headY + 2, -15, headY + 8);
  ctx.lineTo(-18, headY + 6);
  ctx.closePath();
  ctx.fill();

  // Subtle Hair Highlight
  ctx.strokeStyle = '#374151'; ctx.lineWidth = 1.8;
  ctx.beginPath(); ctx.moveTo(-10, headY - 16); ctx.quadraticCurveTo(0, headY - 10, 10, headY - 14); ctx.stroke();

  // Eyebrows
  ctx.strokeStyle = '#111827'; ctx.lineWidth = 2.8; ctx.lineCap = 'round';
  if (expr === 'laughing') {
    ctx.beginPath(); ctx.moveTo(-14, headY + 16); ctx.lineTo(-4, headY + 19); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(14, headY + 16); ctx.lineTo(4, headY + 19); ctx.stroke();
  } else if (expr === 'proud_me') {
    ctx.beginPath(); ctx.moveTo(-14, headY + 15); ctx.lineTo(-4, headY + 14); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(14, headY + 11); ctx.lineTo(4, headY + 14); ctx.stroke();
  } else {
    ctx.beginPath(); ctx.moveTo(-14, headY + 15); ctx.lineTo(-4, headY + 14); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(14, headY + 15); ctx.lineTo(4, headY + 14); ctx.stroke();
  }

  // Eyes (Expressive, warm almond eyes)
  if (expr === 'laughing') {
    ctx.strokeStyle = '#111827'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(-9, headY + 22, 5.5, Math.PI, 0); ctx.stroke();
    ctx.beginPath(); ctx.arc(9, headY + 22, 5.5, Math.PI, 0); ctx.stroke();
  } else {
    const blink = (t % 3.6 < 0.16);
    if (blink) {
      ctx.strokeStyle = '#111827'; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(-14, headY + 22); ctx.lineTo(-4, headY + 22); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(4, headY + 22); ctx.lineTo(14, headY + 22); ctx.stroke();
    } else {
      // Eye whites
      drawEllipse(ctx, -9, headY + 22, 6, 5, '#ffffff', '#111827', 1.5);
      drawEllipse(ctx, 9, headY + 22, 6, 5, '#ffffff', '#111827', 1.5);

      // Warm Brown Irises
      drawCircle(ctx, -8.5, headY + 22, 3.2, '#542d13', null);
      drawCircle(ctx, 9.5, headY + 22, 3.2, '#542d13', null);

      // Pupil
      drawCircle(ctx, -8.2, headY + 22, 1.8, '#111827', null);
      drawCircle(ctx, 9.8, headY + 22, 1.8, '#111827', null);

      // Catchlight
      drawCircle(ctx, -9.8, headY + 20.8, 1, '#ffffff', null);
      drawCircle(ctx, 8.2, headY + 20.8, 1, '#ffffff', null);
    }
  }

  // Refined Nose
  ctx.strokeStyle = '#a66838'; ctx.lineWidth = 1.8;
  ctx.beginPath(); ctx.moveTo(0, headY + 22); ctx.lineTo(-1.5, headY + 30); ctx.lineTo(1.5, headY + 30); ctx.stroke();

  // Mouth
  if (expr === 'laughing') {
    // Big hearty dad laugh
    drawEllipse(ctx, 0, headY + 41, 7, 8.5, '#b91c1c', '#111827', 1.8);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-4.5, headY + 34, 9, 2.5);
    ctx.fillStyle = '#f87171';
    drawCircle(ctx, 0, headY + 45, 3.5, '#f87171', null);
  } else if (isTalking) {
    const mh = 2.5 + talkMouth * 7;
    drawEllipse(ctx, 0, headY + 40, 5.5, mh, '#b91c1c', '#111827', 1.6);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-3.5, headY + 40 - mh * 0.4, 7, 1.8);
  } else if (expr === 'proud_me') {
    // Proud smirk
    ctx.strokeStyle = '#b91c1c'; ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.arc(1, headY + 39, 5.5, 0.1, Math.PI - 0.4); ctx.stroke();
  } else {
    // Warm gentle smile
    ctx.strokeStyle = '#b91c1c'; ctx.lineWidth = 1.8;
    ctx.beginPath(); ctx.arc(0, headY + 40, 5, 0.2, Math.PI - 0.2); ctx.stroke();
  }

  ctx.restore();
}

// ----------------------------------------------------------------------------
// Character 2: Son ("ছেলে")
// Exactly matching user 3D photo (media_1795111775615_28792646.jpg)
// ----------------------------------------------------------------------------
function drawSon(ctx, sx, sy, scale, t, isTalking, expr) {
  ctx.save();
  ctx.translate(sx, sy);
  ctx.scale(scale, scale);

  const bob = Math.sin(t * 4.2) * 3.5;
  const talkMouth = isTalking ? Math.abs(Math.sin(t * 16)) : 0;

  // Soft Floor Shadow
  drawEllipse(ctx, 0, 92 + bob, 34, 9, 'rgba(0, 0, 0, 0.25)', null);

  // ==================== 1. CHARCOAL SHORTS & KID LEGS ====================
  // Relaxed Charcoal Shorts
  ctx.fillStyle = '#262626';
  drawRoundRect(ctx, -18, 14 + bob, 15, 28, 3.5, '#262626', '#141414', 1.8);
  drawRoundRect(ctx, 3, 14 + bob, 15, 28, 3.5, '#262626', '#141414', 1.8);

  // White drawstring detail
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(-3, 16 + bob); ctx.lineTo(0, 19 + bob); ctx.lineTo(3, 16 + bob); ctx.stroke();

  // Cute toddler legs
  ctx.fillStyle = '#dba372';
  drawRoundRect(ctx, -15, 40 + bob, 10, 34, 3.5, '#dba372', '#b87d4d', 1.8);
  drawRoundRect(ctx, 5, 40 + bob, 10, 34, 3.5, '#dba372', '#b87d4d', 1.8);

  // Slide Sandals
  drawRoundRect(ctx, -18, 74 + bob, 18, 8, 3, '#262626', '#141414', 1.5);
  drawRoundRect(ctx, -15, 71 + bob, 12, 4.5, 1.8, '#404040', null);

  drawRoundRect(ctx, 2, 74 + bob, 18, 8, 3, '#262626', '#141414', 1.5);
  drawRoundRect(ctx, 5, 71 + bob, 12, 4.5, 1.8, '#404040', null);

  // ==================== 2. PINK TANK TOP / SLEEVELESS VEST ====================
  const pinkGrad = ctx.createLinearGradient(-20, 0, 20, 0);
  pinkGrad.addColorStop(0, '#f5b5cd');
  pinkGrad.addColorStop(0.5, '#fce7f3');
  pinkGrad.addColorStop(1, '#f5b5cd');
  ctx.fillStyle = pinkGrad;

  ctx.beginPath();
  ctx.moveTo(-20, 16 + bob);
  ctx.quadraticCurveTo(-22, -15 + bob, -19, -48 + bob);
  ctx.lineTo(-9, -48 + bob);
  ctx.quadraticCurveTo(0, -42 + bob, 9, -48 + bob);
  ctx.lineTo(19, -48 + bob);
  ctx.quadraticCurveTo(22, -15 + bob, 20, 16 + bob);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#e89bb8'; ctx.lineWidth = 2; ctx.stroke();

  // White hem at bottom
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-19, 12 + bob, 38, 4.5);
  ctx.strokeStyle = '#e89bb8'; ctx.lineWidth = 1;
  ctx.strokeRect(-19, 12 + bob, 38, 4.5);

  // White trim at neck
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2.2;
  ctx.beginPath(); ctx.arc(0, -48 + bob, 9, 0.2, Math.PI - 0.2); ctx.stroke();

  // ==================== 3. CUTE KID ARMS & GESTURES ====================
  ctx.strokeStyle = '#dba372'; ctx.lineWidth = 8.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (expr === 'giggling') {
    // Hands near mouth giggling
    ctx.beginPath(); ctx.moveTo(-18, -36 + bob); ctx.lineTo(-6, -58 + bob); ctx.stroke();
    drawCircle(ctx, -4, -60 + bob, 6.5, '#dba372', '#b87d4d', 1.6);

    ctx.beginPath(); ctx.moveTo(18, -36 + bob); ctx.lineTo(6, -58 + bob); ctx.stroke();
    drawCircle(ctx, 4, -60 + bob, 6.5, '#dba372', '#b87d4d', 1.6);
  } else if (expr === 'pointing_punchline') {
    // Left hand on hip
    ctx.beginPath(); ctx.moveTo(-18, -36 + bob); ctx.lineTo(-24, -12 + bob); ctx.stroke();
    drawCircle(ctx, -24, -9 + bob, 6.5, '#dba372', '#b87d4d', 1.6);

    // Right arm raised high with index finger pointing up! ("নিজেরাই নিজেরায়...")
    ctx.beginPath(); ctx.moveTo(18, -36 + bob); ctx.lineTo(28, -60 + bob); ctx.stroke();
    drawCircle(ctx, 28, -62 + bob, 7, '#dba372', '#b87d4d', 1.6);
    // Pointing finger
    ctx.strokeStyle = '#dba372'; ctx.lineWidth = 3.5;
    ctx.beginPath(); ctx.moveTo(28, -63 + bob); ctx.lineTo(30, -75 + bob); ctx.stroke();
  } else if (isTalking) {
    // Asking curiously: one hand raised inquisitively
    ctx.beginPath(); ctx.moveTo(-18, -36 + bob); ctx.lineTo(-14, -8 + bob); ctx.stroke();
    drawCircle(ctx, -13, -5 + bob, 6.5, '#dba372', '#b87d4d', 1.6);

    ctx.beginPath(); ctx.moveTo(18, -36 + bob); ctx.lineTo(24, -32 + bob); ctx.stroke();
    drawCircle(ctx, 25, -34 + bob, 7, '#dba372', '#b87d4d', 1.6);
  } else {
    // Natural relaxed standing arms
    ctx.beginPath(); ctx.moveTo(-18, -36 + bob); ctx.lineTo(-14, -4 + bob); ctx.stroke();
    drawCircle(ctx, -13, -1 + bob, 6.5, '#dba372', '#b87d4d', 1.6);

    ctx.beginPath(); ctx.moveTo(18, -36 + bob); ctx.lineTo(14, -4 + bob); ctx.stroke();
    drawCircle(ctx, 13, -1 + bob, 6.5, '#dba372', '#b87d4d', 1.6);
  }

  // ==================== 4. NECK ====================
  ctx.fillStyle = '#dba372';
  ctx.fillRect(-6, -58 + bob, 12, 12);
  ctx.strokeStyle = '#b87d4d'; ctx.lineWidth = 1.6;
  ctx.strokeRect(-6, -58 + bob, 12, 12);

  // ==================== 5. ADORABLE CHUBBY HEAD & BIG EYES ====================
  const headY = -92 + bob;

  // Chubby Cute Round Face
  ctx.fillStyle = '#dba372';
  ctx.beginPath();
  ctx.moveTo(-19, headY + 6);
  ctx.lineTo(-19, headY + 26);
  ctx.quadraticCurveTo(-14, headY + 42, 0, headY + 44);
  ctx.quadraticCurveTo(14, headY + 42, 19, headY + 26);
  ctx.lineTo(19, headY + 6);
  ctx.quadraticCurveTo(0, headY - 4, -19, headY + 6);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#b87d4d'; ctx.lineWidth = 2; ctx.stroke();

  // Rosy Cheeks
  ctx.fillStyle = 'rgba(244, 114, 182, 0.40)';
  drawCircle(ctx, -12, headY + 26, 4.5, null, null);
  drawCircle(ctx, 12, headY + 26, 4.5, null, null);

  // Ears
  drawEllipse(ctx, -20, headY + 20, 3, 6, '#dba372', '#b87d4d', 1.5);
  drawEllipse(ctx, 20, headY + 20, 3, 6, '#dba372', '#b87d4d', 1.5);

  // Spiky Fluffy Black Hair (Tousled dynamic locks & bangs)
  ctx.fillStyle = '#111827';
  ctx.beginPath();
  ctx.moveTo(-21, headY + 16);
  ctx.lineTo(-24, headY + 4);
  ctx.lineTo(-20, headY - 6);
  ctx.lineTo(-14, headY - 14);
  ctx.lineTo(-18, headY - 22);
  ctx.lineTo(-8, headY - 18);
  ctx.lineTo(-6, headY - 28); // left spike
  ctx.lineTo(0, headY - 18);
  ctx.lineTo(7, headY - 30);  // center spike
  ctx.lineTo(12, headY - 18);
  ctx.lineTo(20, headY - 22); // right spike
  ctx.lineTo(18, headY - 8);
  ctx.lineTo(24, headY - 2);
  ctx.lineTo(21, headY + 6);
  ctx.lineTo(21, headY + 16);
  // Bangs draping naturally over forehead
  ctx.lineTo(16, headY + 8);
  ctx.quadraticCurveTo(6, headY + 2, 0, headY + 10);
  ctx.quadraticCurveTo(-6, headY + 2, -14, headY + 10);
  ctx.lineTo(-18, headY + 8);
  ctx.closePath();
  ctx.fill();

  // Eyebrows
  ctx.strokeStyle = '#111827'; ctx.lineWidth = 2.4; ctx.lineCap = 'round';
  if (expr === 'pointing_punchline') {
    ctx.beginPath(); ctx.moveTo(-12, headY + 13); ctx.lineTo(-3, headY + 11); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(12, headY + 8); ctx.lineTo(3, headY + 11); ctx.stroke();
  } else {
    ctx.beginPath(); ctx.moveTo(-12, headY + 12); ctx.lineTo(-3, headY + 12); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(12, headY + 12); ctx.lineTo(3, headY + 12); ctx.stroke();
  }

  // Giant Sparkling Brown Disney/Pixar Anime Eyes
  if (expr === 'giggling') {
    ctx.strokeStyle = '#111827'; ctx.lineWidth = 2.8;
    ctx.beginPath(); ctx.arc(-8, headY + 19, 5.5, Math.PI, 0); ctx.stroke();
    ctx.beginPath(); ctx.arc(8, headY + 19, 5.5, Math.PI, 0); ctx.stroke();
  } else {
    // Sclera (Eye whites)
    drawEllipse(ctx, -8, headY + 19, 6.5, 7.5, '#ffffff', '#111827', 1.8);
    drawEllipse(ctx, 8, headY + 19, 6.5, 7.5, '#ffffff', '#111827', 1.8);

    // Warm Chocolate Brown Irises (Looking up at Dad!)
    drawCircle(ctx, -9, headY + 18, 4.8, '#542d13', null);
    drawCircle(ctx, 7, headY + 18, 4.8, '#542d13', null);

    // Dark Pupil
    drawCircle(ctx, -9.5, headY + 18, 3, '#111827', null);
    drawCircle(ctx, 6.5, headY + 18, 3, '#111827', null);

    // Double Catchlights (Gives life, innocence & cuteness!)
    drawCircle(ctx, -11, headY + 16, 1.8, '#ffffff', null);
    drawCircle(ctx, 5, headY + 16, 1.8, '#ffffff', null);
    drawCircle(ctx, -7.5, headY + 20, 1, '#ffffff', null);
    drawCircle(ctx, 8.5, headY + 20, 1, '#ffffff', null);
  }

  // Cute Button Nose
  drawCircle(ctx, 0, headY + 25, 1.6, '#b87d4d', null);

  // Mouth
  if (expr === 'pointing_punchline') {
    // Cheeky triumphant kid grin
    ctx.fillStyle = '#b91c1c';
    ctx.beginPath();
    ctx.arc(0, headY + 32, 4.8, 0, Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#111827'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-3, headY + 32, 6, 1.6);
  } else if (isTalking) {
    const mh = 2.5 + talkMouth * 6;
    drawEllipse(ctx, 0, headY + 33, 4.8, mh, '#b91c1c', '#111827', 1.6);
    ctx.fillStyle = '#f87171';
    drawCircle(ctx, 0, headY + 33 + mh * 0.35, 1.8, '#f87171', null);
  } else {
    // Cheerful kid smile
    ctx.strokeStyle = '#b91c1c'; ctx.lineWidth = 1.8;
    ctx.beginPath(); ctx.arc(0, headY + 32, 4.2, 0.2, Math.PI - 0.2); ctx.stroke();
  }

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

// Grand Outro Card (11.0s - 14.0s)
function drawOutroCard(ctx, w, h, isPort, t) {
  const p = Math.max(0, Math.min(1, (t - 11.0) / 0.8));
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
// Comic Speech Balloon & Subtitle System
// ----------------------------------------------------------------------------
function drawSpeechBalloon(ctx, w, h, targetX, targetY, speaker, text, pointLeft, isPort) {
  ctx.save();
  const fontSize = isPort ? 28 : 24;
  ctx.font = `bold ${fontSize}px "Noto Sans Bengali", sans-serif`;
  const tm = ctx.measureText(text);
  const bw = Math.min(w - 60, Math.max(isPort ? 260 : 220, tm.width + (isPort ? 64 : 56)));
  const bh = isPort ? 82 : 70;

  let bx = pointLeft ? targetX - 40 : targetX - bw + 40;
  bx = Math.max(28, Math.min(w - bw - 28, bx));

  const by = isPort ? Math.floor(h * 0.44) : Math.max(24, targetY - bh - 30);

  // Drop shadow
  drawRoundRect(ctx, bx + 5, by + 5, bw, bh, 18, 'rgba(0,0,0,0.22)', null);
  // Bubble body
  drawRoundRect(ctx, bx, by, bw, bh, 18, '#ffffff', '#0f172a', 3.5);

  // Tail pointing to speaker
  const tailX = Math.max(bx + 32, Math.min(bx + bw - 32, targetX));
  const tipY = isPort ? Math.min(by + bh + 48, targetY) : targetY;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(tailX - 18, by + bh);
  ctx.lineTo(targetX, tipY);
  ctx.lineTo(tailX + 18, by + bh);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 3.5; ctx.stroke();

  // Speaker Badge
  const isDad = speaker.includes('বাবা');
  const badgeBg = isDad ? '#0284c7' : '#db2777';
  const badgeW = isPort ? 180 : 160;
  const badgeH = isPort ? 32 : 28;
  drawRoundRect(ctx, bx + 16, by - (isPort ? 18 : 16), badgeW, badgeH, 8, badgeBg, '#ffffff', 2);
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${isPort ? 17 : 15}px "Noto Sans Bengali", sans-serif`;
  ctx.textAlign = 'left';
  ctx.fillText(speaker, bx + 24, by + (isPort ? 4 : 3));

  // Dialogue Text
  ctx.fillStyle = '#0f172a';
  ctx.font = `bold ${fontSize}px "Noto Sans Bengali", sans-serif`;
  ctx.fillText(text, bx + 24, by + (isPort ? 52 : 45));

  ctx.restore();
}

function drawBottomSubtitleBar(ctx, w, h, speaker, text) {
  const isPort = h > w;
  const barH = isPort ? 130 : 90;
  const barY = h - barH - 24;
  const barW = isPort ? w - 48 : w * 0.86;
  const barX = (w - barW) / 2;

  drawRoundRect(ctx, barX, barY, barW, barH, 20, 'rgba(15, 23, 42, 0.92)', '#ffd54f', 3);

  const isDad = speaker.includes('বাবা');
  const badgeCol = isDad ? '#0284c7' : '#db2777';
  const badgeW = isPort ? 190 : 210;
  drawRoundRect(ctx, barX + 18, barY + (isPort ? 14 : 20), badgeW, 46, 12, badgeCol, '#ffffff', 2);

  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${isPort ? 20 : 21}px "Noto Sans Bengali", sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText(speaker, barX + 18 + badgeW / 2, barY + (isPort ? 44 : 50));

  ctx.textAlign = isPort ? 'center' : 'left';
  ctx.fillStyle = '#ffeb3b';
  ctx.font = `bold ${isPort ? 26 : 28}px "Noto Sans Bengali", sans-serif`;
  if (isPort) {
    ctx.fillText(text, barX + barW / 2, barY + 102);
  } else {
    ctx.fillText(text, barX + badgeW + 36, barY + 54);
  }
}

// ----------------------------------------------------------------------------
// MAIN FRAME RENDERER (Called for every frame t: 0 -> 14.00)
// ----------------------------------------------------------------------------
function frame(ctx, w, h, t) {
  ctx.clearRect(0, 0, w, h);
  const isPort = h > w;

  // 1. Draw Living Room Environment
  drawLivingRoomBackground(ctx, w, h, isPort, t);

  // Determine Dialogue Beat & Active Speaker
  let speaker = '';
  let speechText = '';
  let activeSpeaker = 'none'; // 'dad' | 'son'
  let dadExpr = 'normal';
  let sonExpr = 'normal';

  if (t < 2.5) {
    speaker = '👦 ছেলে:';
    speechText = 'বাবা, তুমি কাকে বিয়া করছ?';
    activeSpeaker = 'son';
  } else if (t < 4.5) {
    speaker = '👨 বাবা:';
    speechText = 'তোমার মাকে।';
    activeSpeaker = 'dad';
  } else if (t < 7.0) {
    speaker = '👦 ছেলে:';
    speechText = 'মা কাকে বিয়া করছে?';
    activeSpeaker = 'son';
  } else if (t < 8.5) {
    speaker = '👨 বাবা:';
    speechText = 'আমাকে।';
    activeSpeaker = 'dad';
    dadExpr = 'proud_me';
  } else if (t < 10.5) {
    speaker = '👦 ছেলে:';
    speechText = 'নিজেরাই নিজেরায়...';
    activeSpeaker = 'son';
    sonExpr = 'pointing_punchline';
  } else {
    dadExpr = 'laughing';
    sonExpr = 'giggling';
  }

  // 2. Characters Positions & Layout
  if (!isPort) {
    // ---------------- LANDSCAPE LAYOUT (16:9) ----------------
    // Both characters stand firmly on floor ground level
    const groundY = h * 0.88;
    const fScale = 2.45;
    const sScale = 2.30;
    const fx = w * 0.40;
    const fy = groundY - 124 * fScale;

    const sx = w * 0.68;
    const sy = groundY - 74 * sScale;

    drawFather(ctx, fx, fy, fScale, t, activeSpeaker === 'dad', dadExpr);
    drawSon(ctx, sx, sy, sScale, t, activeSpeaker === 'son', sonExpr);

    // Speech Balloon
    if (activeSpeaker === 'son') {
      drawSpeechBalloon(ctx, w, h, sx, sy - 92 * sScale, speaker, speechText, false, false);
    } else if (activeSpeaker === 'dad') {
      drawSpeechBalloon(ctx, w, h, fx, fy - 146 * fScale, speaker, speechText, true, false);
    }

  } else {
    // ---------------- PORTRAIT LAYOUT (9:16) ----------------
    // Both characters stand firmly on floor ground level in portrait
    const groundY = h * 0.86;
    const fScale = 2.50;
    const sScale = 2.35;
    const fx = w * 0.36;
    const fy = groundY - 124 * fScale;

    const sx = w * 0.72;
    const sy = groundY - 74 * sScale;

    drawFather(ctx, fx, fy, fScale, t, activeSpeaker === 'dad', dadExpr);
    drawSon(ctx, sx, sy, sScale, t, activeSpeaker === 'son', sonExpr);

    // Speech Balloon in Portrait
    if (activeSpeaker === 'son') {
      drawSpeechBalloon(ctx, w, h, sx, sy - 92 * sScale, speaker, speechText, false, true);
    } else if (activeSpeaker === 'dad') {
      drawSpeechBalloon(ctx, w, h, fx, fy - 146 * fScale, speaker, speechText, true, true);
    }
  }

  // 3. Bottom Subtitle Banner
  if (speaker && speechText && t < 11.0) {
    drawBottomSubtitleBar(ctx, w, h, speaker, speechText);
  }

  // 4. Channel Watermark Badge (DipuToons)
  if (t < 11.0) {
    drawChannelWatermark(ctx, w, h, isPort, t);
  }

  // 5. Outro End Card (11.0s - 14.0s)
  if (t >= 11.0) {
    drawOutroCard(ctx, w, h, isPort, t);
  }
}
