// ============================================================================
// DipuToons - Premium 2D Cartoon Animation Engine
// Episode: "টাকা ধারের চরম চক্কর" (Borrowing Money Phone Call Comedy)
// Character: দিপু (Dipu - The unlucky friend trying to borrow 500 Taka)
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
// Vector Utilities
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
// Background 1: Roadside Tea Stall ("টংয়ের দোকান ও কাঠের বেঞ্চ")
// ----------------------------------------------------------------------------
function drawTeaStallBackground(ctx, w, h, t) {
  // 1. Sky & Distant Village
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.6);
  skyGrad.addColorStop(0, '#7dd3fc');
  skyGrad.addColorStop(1, '#e0f2fe');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  // Distant Trees
  drawCircle(ctx, w * 0.15, h * 0.45, 120, '#86efac', null);
  drawCircle(ctx, w * 0.40, h * 0.42, 140, '#4ade80', null);
  drawCircle(ctx, w * 0.75, h * 0.46, 130, '#22c55e', null);

  // Earthen Ground
  const groundY = h * 0.64;
  const groundGrad = ctx.createLinearGradient(0, groundY, 0, h);
  groundGrad.addColorStop(0, '#d97706');
  groundGrad.addColorStop(0.25, '#b45309');
  groundGrad.addColorStop(1, '#78350f');
  ctx.fillStyle = groundGrad;
  ctx.fillRect(0, groundY, w, h - groundY);

  // 2. Corrugated Tin Roof Stall Structure
  // Bamboo Poles
  drawRoundRect(ctx, w * 0.08, h * 0.12, 18, h * 0.60, 4, '#ca8a04', '#713f12', 2.5);
  drawRoundRect(ctx, w * 0.88, h * 0.12, 18, h * 0.60, 4, '#ca8a04', '#713f12', 2.5);

  // Green Canvas Canopy Overhang
  ctx.fillStyle = '#15803d';
  ctx.beginPath();
  ctx.moveTo(w * 0.02, h * 0.16);
  ctx.lineTo(w * 0.98, h * 0.16);
  ctx.lineTo(w * 0.94, h * 0.28);
  ctx.lineTo(w * 0.06, h * 0.28);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#14532d'; ctx.lineWidth = 3; ctx.stroke();

  // Corrugated Tin Roof Above Canopy
  ctx.fillStyle = '#94a3b8';
  ctx.beginPath();
  ctx.moveTo(0, h * 0.04);
  ctx.lineTo(w, h * 0.04);
  ctx.lineTo(w * 0.96, h * 0.16);
  ctx.lineTo(w * 0.04, h * 0.16);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#475569'; ctx.lineWidth = 3; ctx.stroke();

  // Tin Ridge Lines
  ctx.strokeStyle = '#64748b'; ctx.lineWidth = 2.5;
  for (let rx = w * 0.08; rx < w * 0.92; rx += 28) {
    ctx.beginPath(); ctx.moveTo(rx, h * 0.04); ctx.lineTo(rx - 8, h * 0.16); ctx.stroke();
  }

  // 3. Hanging Snack Chips Bags & Glass Jars
  const stallY = h * 0.32;
  // Hanging snacks rack
  const chipColors = ['#ef4444', '#3b82f6', '#f59e0b', '#10b981'];
  for (let c = 0; c < 4; c++) {
    drawRoundRect(ctx, w * 0.46 + c * 28, stallY, 20, 32, 3, chipColors[c], '#1e293b', 1.5);
  }

  // Stall Counter Table
  drawRoundRect(ctx, w * 0.52, h * 0.44, w * 0.45, h * 0.26, 6, '#64748b', '#334155', 3);
  // Glass Jars on counter (Biscuits, Chanachur)
  drawRoundRect(ctx, w * 0.62, h * 0.40, 28, 36, 4, 'rgba(255,255,255,0.6)', '#475569', 2);
  drawRoundRect(ctx, w * 0.74, h * 0.40, 28, 36, 4, 'rgba(255,255,255,0.6)', '#475569', 2);
  // Red Thermos Flask
  drawRoundRect(ctx, w * 0.86, h * 0.38, 24, 44, 4, '#dc2626', '#991b1b', 2);

  // 4. Wooden Bench & Table in Foreground (Where Dipu sits)
  const benchY = h * 0.72;
  // Wooden Bench Top
  drawRoundRect(ctx, w * 0.06, benchY, w * 0.65, 30, 4, '#9a3412', '#451a03', 3);
  // Bench Legs
  drawRoundRect(ctx, w * 0.10, benchY + 30, 22, 110, 3, '#7c2d12', '#451a03', 2.5);
  drawRoundRect(ctx, w * 0.52, benchY + 30, 22, 110, 3, '#7c2d12', '#451a03', 2.5);

  // Tea Glass on Bench
  drawRoundRect(ctx, w * 0.12, benchY - 34, 22, 34, 3, 'rgba(255,255,255,0.7)', '#64748b', 1.8);
  drawRoundRect(ctx, w * 0.14, benchY - 26, 18, 24, 2, '#d97706', null); // Milk Tea
}

// ----------------------------------------------------------------------------
// Background 2: Green Grass Hill Field ("সবুজ ঘাসের মাঠ ও খোলা আকাশ")
// ----------------------------------------------------------------------------
function drawGrassFieldBackground(ctx, w, h, t) {
  // Vibrant Blue Sky
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.3);
  skyGrad.addColorStop(0, '#38bdf8');
  skyGrad.addColorStop(1, '#bae6fd');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  // Fluffy White Clouds
  drawCircle(ctx, w * 0.25, h * 0.10, 48, '#ffffff', null);
  drawCircle(ctx, w * 0.32, h * 0.08, 58, '#ffffff', null);
  drawCircle(ctx, w * 0.40, h * 0.11, 44, '#ffffff', null);

  drawCircle(ctx, w * 0.80, h * 0.09, 52, '#ffffff', null);
  drawCircle(ctx, w * 0.88, h * 0.10, 45, '#ffffff', null);

  // Lush Green Sloping Grass Hill
  const grassGrad = ctx.createLinearGradient(0, h * 0.18, 0, h);
  grassGrad.addColorStop(0, '#4ade80');
  grassGrad.addColorStop(0.35, '#22c55e');
  grassGrad.addColorStop(1, '#15803d');
  ctx.fillStyle = grassGrad;

  ctx.beginPath();
  ctx.moveTo(0, h * 0.16);
  ctx.quadraticCurveTo(w * 0.5, h * 0.14, w, h * 0.19);
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fill();

  // Natural Grass Blades Texture
  ctx.strokeStyle = '#166534';
  ctx.lineWidth = 2.5;
  ctx.lineCap = 'round';
  const bladePoints = [
    [0.12, 0.30], [0.28, 0.24], [0.45, 0.28], [0.65, 0.25], [0.82, 0.32],
    [0.20, 0.52], [0.38, 0.48], [0.72, 0.55], [0.85, 0.46],
    [0.15, 0.75], [0.42, 0.78], [0.60, 0.72], [0.88, 0.80]
  ];
  for (const [bx, by] of bladePoints) {
    const gx = bx * w;
    const gy = by * h;
    ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx - 6, gy - 16); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(gx + 4, gy); ctx.lineTo(gx + 10, gy - 18); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(gx + 8, gy); ctx.lineTo(gx + 14, gy - 12); ctx.stroke();
  }
}

// ----------------------------------------------------------------------------
// Background 3: Park Bench under Trees ("পার্কের কাঠের বেঞ্চ ও গাছপালা")
// ----------------------------------------------------------------------------
function drawParkBackground(ctx, w, h, t) {
  // Sunny Afternoon Sky
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.5);
  skyGrad.addColorStop(0, '#60a5fa');
  skyGrad.addColorStop(1, '#dbeafe');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  // Distant Park Bushes & Trees
  drawCircle(ctx, w * 0.20, h * 0.42, 130, '#86efac', null);
  drawCircle(ctx, w * 0.50, h * 0.38, 160, '#4ade80', null);
  drawCircle(ctx, w * 0.85, h * 0.42, 140, '#22c55e', null);

  // Soft Lawn Ground
  const lawnY = h * 0.60;
  const lawnGrad = ctx.createLinearGradient(0, lawnY, 0, h);
  lawnGrad.addColorStop(0, '#84cc16');
  lawnGrad.addColorStop(0.3, '#65a30d');
  lawnGrad.addColorStop(1, '#4d7c0f');
  ctx.fillStyle = lawnGrad;
  ctx.fillRect(0, lawnY, w, h - lawnY);

  // Classic Park Bench
  const benchY = h * 0.54;
  const benchW = w * 0.90;
  const benchX = (w - benchW) / 2;

  // Bench Backrest Slats
  for (let s = 0; s < 3; s++) {
    drawRoundRect(ctx, benchX, benchY + s * 42, benchW, 30, 4, '#a16207', '#451a03', 2.8);
  }

  // Bench Cast Iron Posts
  drawRoundRect(ctx, benchX + 40, benchY - 10, 20, 180, 5, '#1e293b', '#0f172a', 3);
  drawRoundRect(ctx, benchX + benchW - 60, benchY - 10, 20, 180, 5, '#1e293b', '#0f172a', 3);

  // Bench Seat Slats
  for (let s = 0; s < 2; s++) {
    drawRoundRect(ctx, benchX - 10, benchY + 140 + s * 34, benchW + 20, 26, 4, '#ca8a04', '#451a03', 2.8);
  }
}

// ----------------------------------------------------------------------------
// Character: Dipu ("দিপু" - 2D Animated Guy on Phone)
// ----------------------------------------------------------------------------
function drawDipu(ctx, px, py, scale, t, pose, shirtColor) {
  ctx.save();
  ctx.translate(px, py);
  ctx.scale(scale, scale);

  const bob = Math.sin(t * 5.0) * 3;

  // ---------------- POSE 1: SITTING ON BENCH ON PHONE ----------------
  if (pose === 'sitting_bench' || pose === 'angry_standing') {
    // Floor Shadow
    drawEllipse(ctx, 0, 126 + bob, 52, 14, 'rgba(0, 0, 0, 0.28)', null);

    // Grey Joggers / Trackpants (Legs bent sitting on bench)
    ctx.fillStyle = '#475569';
    // Left Leg (Crossed or bent)
    ctx.beginPath();
    ctx.moveTo(-22, 10 + bob);
    ctx.quadraticCurveTo(-45, 45 + bob, -50, 80 + bob);
    ctx.lineTo(-30, 80 + bob);
    ctx.quadraticCurveTo(-26, 45 + bob, -8, 10 + bob);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 2.2; ctx.stroke();

    // Left lower leg down to floor
    drawRoundRect(ctx, -52, 78 + bob, 22, 44, 4, '#475569', '#1e293b', 2);

    // Right Leg (Draped down)
    ctx.beginPath();
    ctx.moveTo(8, 10 + bob);
    ctx.quadraticCurveTo(24, 45 + bob, 26, 80 + bob);
    ctx.lineTo(46, 80 + bob);
    ctx.quadraticCurveTo(42, 45 + bob, 24, 10 + bob);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 2.2; ctx.stroke();

    drawRoundRect(ctx, 24, 78 + bob, 22, 44, 4, '#475569', '#1e293b', 2);

    // Dark Slide Slippers
    drawRoundRect(ctx, -56, 120 + bob, 28, 10, 4, '#1e293b', '#0f172a', 2);
    drawRoundRect(ctx, 22, 120 + bob, 28, 10, 4, '#1e293b', '#0f172a', 2);

    // T-Shirt Body
    ctx.fillStyle = shirtColor || '#facc15';
    ctx.beginPath();
    ctx.moveTo(-32, 14 + bob);
    ctx.quadraticCurveTo(-36, -35 + bob, -34, -72 + bob);
    ctx.lineTo(-44, -86 + bob); // shoulder slope
    ctx.quadraticCurveTo(-18, -96 + bob, 0, -94 + bob);
    ctx.quadraticCurveTo(18, -96 + bob, 44, -86 + bob);
    ctx.lineTo(34, -72 + bob);
    ctx.quadraticCurveTo(36, -35 + bob, 32, 14 + bob);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#b45309'; ctx.lineWidth = 2.4; ctx.stroke();

    // Crewneck Collar
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(0, -94 + bob, 14, 0.2, Math.PI - 0.2);
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = '#b45309';
    ctx.stroke();

    // Sleeves
    drawRoundRect(ctx, -54, -86 + bob, 20, 32, 5, shirtColor || '#facc15', '#b45309', 2);
    drawRoundRect(ctx, 34, -86 + bob, 20, 32, 5, shirtColor || '#facc15', '#b45309', 2);

    // Arms: Right hand holding smartphone to ear!
    ctx.fillStyle = '#c68b59';
    ctx.strokeStyle = '#a66838';
    ctx.lineWidth = 12; ctx.lineCap = 'round';

    // Left arm resting on knee / lap
    ctx.beginPath(); ctx.moveTo(-46, -56 + bob); ctx.lineTo(-32, 10 + bob); ctx.stroke();
    drawCircle(ctx, -30, 14 + bob, 9, '#c68b59', '#a66838', 2);

    // Right arm bent up with smartphone at ear!
    if (pose === 'angry_standing') {
      // Shouting into phone: phone held slightly in front of mouth!
      ctx.beginPath(); ctx.moveTo(46, -56 + bob); ctx.lineTo(32, -60 + bob); ctx.lineTo(16, -110 + bob); ctx.stroke();
      drawCircle(ctx, 16, -112 + bob, 9.5, '#c68b59', '#a66838', 2);
      // Smartphone held in hand
      drawRoundRect(ctx, 14, -132 + bob, 16, 32, 4, '#0f172a', '#38bdf8', 2);
    } else {
      // Normal phone at ear
      ctx.beginPath(); ctx.moveTo(46, -56 + bob); ctx.lineTo(44, -88 + bob); ctx.lineTo(24, -126 + bob); ctx.stroke();
      drawCircle(ctx, 24, -128 + bob, 9.5, '#c68b59', '#a66838', 2);
      // Smartphone held to ear
      drawRoundRect(ctx, 20, -145 + bob, 15, 30, 4, '#0f172a', '#38bdf8', 2);
    }

    // Neck
    ctx.fillStyle = '#c68b59';
    ctx.fillRect(-9, -110 + bob, 18, 18);
    ctx.strokeStyle = '#a66838'; ctx.lineWidth = 1.8;
    ctx.strokeRect(-9, -110 + bob, 18, 18);

    // Head
    drawDipuHead(ctx, bob, pose);

  } else if (pose === 'lying_grass') {
    // ---------------- POSE 2: LYING ON GREEN GRASS ----------------
    // Body rotated casually, head raised, knee up
    ctx.save();
    ctx.rotate(-0.10); // relaxed slope

    // Grey Joggers Legs (Crossed casually in grass)
    ctx.fillStyle = '#475569';
    // Back leg
    drawRoundRect(ctx, -20, 20 + bob, 120, 28, 8, '#475569', '#1e293b', 2.2);
    drawRoundRect(ctx, 80, 20 + bob, 32, 70, 8, '#475569', '#1e293b', 2.2);
    // Bare feet
    drawRoundRect(ctx, 92, 85 + bob, 26, 12, 4, '#c68b59', '#a66838', 1.8);

    // Front bent knee leg
    ctx.beginPath();
    ctx.moveTo(-10, 22 + bob);
    ctx.quadraticCurveTo(45, -20 + bob, 70, 20 + bob);
    ctx.lineTo(84, 30 + bob);
    ctx.quadraticCurveTo(45, -8 + bob, -10, 44 + bob);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 2.2; ctx.stroke();
    // Bare foot on grass
    drawRoundRect(ctx, 64, 40 + bob, 24, 12, 4, '#c68b59', '#a66838', 1.8);

    // Maroon T-Shirt Torso lying down
    ctx.fillStyle = shirtColor || '#991b1b';
    drawRoundRect(ctx, -68, -25 + bob, 78, 54, 12, shirtColor || '#991b1b', '#7f1d1d', 2.5);

    // Left arm resting on stomach
    ctx.fillStyle = '#c68b59';
    ctx.strokeStyle = '#a66838'; ctx.lineWidth = 11; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-60, -10 + bob); ctx.lineTo(-20, 5 + bob); ctx.stroke();
    drawCircle(ctx, -16, 6 + bob, 9, '#c68b59', '#a66838', 2);

    // Right arm holding phone to ear
    ctx.beginPath(); ctx.moveTo(-62, -22 + bob); ctx.lineTo(-76, -55 + bob); ctx.lineTo(-84, -70 + bob); ctx.stroke();
    drawCircle(ctx, -84, -72 + bob, 9, '#c68b59', '#a66838', 2);
    // Smartphone
    drawRoundRect(ctx, -94, -84 + bob, 15, 30, 4, '#0f172a', '#38bdf8', 2);

    // Neck
    ctx.fillStyle = '#c68b59';
    ctx.fillRect(-82, -45 + bob, 18, 18);

    // Head
    ctx.save();
    ctx.translate(-92, -58);
    drawDipuHead(ctx, bob, 'lying_confused');
    ctx.restore();

    ctx.restore();
  }

  ctx.restore();
}

// Helper to draw Dipu's Head & Expressive Face
function drawDipuHead(ctx, bob, pose) {
  const headY = (pose === 'lying_confused') ? 0 : -148 + bob;

  // Face Base Oval
  ctx.fillStyle = '#c68b59';
  ctx.beginPath();
  ctx.moveTo(-18, headY + 8);
  ctx.lineTo(-17, headY + 30);
  ctx.quadraticCurveTo(-14, headY + 50, 0, headY + 52);
  ctx.quadraticCurveTo(14, headY + 50, 17, headY + 30);
  ctx.lineTo(18, headY + 8);
  ctx.quadraticCurveTo(0, headY - 8, -18, headY + 8);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#a66838'; ctx.lineWidth = 2; ctx.stroke();

  // Ears
  drawEllipse(ctx, -19, headY + 22, 3.5, 7, '#c68b59', '#a66838', 1.6);
  drawEllipse(ctx, 19, headY + 22, 3.5, 7, '#c68b59', '#a66838', 1.6);

  // Big Fluffy Tousled Anime Hair
  ctx.fillStyle = '#111827';
  ctx.beginPath();
  ctx.moveTo(-20, headY + 16);
  ctx.lineTo(-24, headY + 4);
  ctx.lineTo(-20, headY - 10);
  ctx.lineTo(-12, headY - 20);
  ctx.lineTo(-18, headY - 28);
  ctx.lineTo(-6, headY - 24);
  ctx.lineTo(-4, headY - 36); // left spike
  ctx.lineTo(4, headY - 26);
  ctx.lineTo(10, headY - 38); // center spike
  ctx.lineTo(16, headY - 24);
  ctx.lineTo(24, headY - 30); // right spike
  ctx.lineTo(22, headY - 10);
  ctx.lineTo(26, headY - 2);
  ctx.lineTo(22, headY + 8);
  ctx.lineTo(22, headY + 18);
  // Bangs over forehead
  ctx.lineTo(16, headY + 8);
  ctx.quadraticCurveTo(6, headY + 2, 0, headY + 12);
  ctx.quadraticCurveTo(-6, headY + 2, -14, headY + 12);
  ctx.lineTo(-18, headY + 8);
  ctx.closePath();
  ctx.fill();

  // Eyebrows
  ctx.strokeStyle = '#111827'; ctx.lineWidth = 2.8; ctx.lineCap = 'round';
  if (pose === 'angry_standing') {
    // Furiously slanted down
    ctx.beginPath(); ctx.moveTo(-14, headY + 10); ctx.lineTo(-4, headY + 15); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(14, headY + 10); ctx.lineTo(4, headY + 15); ctx.stroke();
  } else if (pose === 'lying_confused') {
    // Baffled / questioning eyebrows (one cocked high)
    ctx.beginPath(); ctx.moveTo(-14, headY + 11); ctx.lineTo(-4, headY + 14); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(14, headY + 7); ctx.lineTo(4, headY + 12); ctx.stroke();
  } else if (pose === 'crying_shock') {
    // Comical sad/crying arch
    ctx.beginPath(); ctx.moveTo(-14, headY + 9); ctx.lineTo(-4, headY + 13); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(14, headY + 9); ctx.lineTo(4, headY + 13); ctx.stroke();
  } else {
    // Inquisitive / friendly
    ctx.beginPath(); ctx.moveTo(-14, headY + 13); ctx.lineTo(-4, headY + 13); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(14, headY + 13); ctx.lineTo(4, headY + 13); ctx.stroke();
  }

  // Eyes
  if (pose === 'crying_shock') {
    // Comical anime shock tears streaming down!
    drawEllipse(ctx, -8, headY + 22, 6.5, 7.5, '#ffffff', '#111827', 2);
    drawEllipse(ctx, 8, headY + 22, 6.5, 7.5, '#ffffff', '#111827', 2);
    drawCircle(ctx, -8, headY + 22, 2.5, '#0f172a', null);
    drawCircle(ctx, 8, headY + 22, 2.5, '#0f172a', null);

    // Blue water tear waterfalls!
    ctx.fillStyle = 'rgba(56, 189, 248, 0.75)';
    drawRoundRect(ctx, -10, headY + 26, 5, 26, 2.5, 'rgba(56, 189, 248, 0.75)', null);
    drawRoundRect(ctx, 6, headY + 26, 5, 26, 2.5, 'rgba(56, 189, 248, 0.75)', null);

  } else if (pose === 'angry_standing') {
    // Glaring angry eyes
    drawEllipse(ctx, -8, headY + 22, 6, 6, '#ffffff', '#111827', 1.8);
    drawEllipse(ctx, 8, headY + 22, 6, 6, '#ffffff', '#111827', 1.8);
    drawCircle(ctx, -8, headY + 22, 2.6, '#451a03', null);
    drawCircle(ctx, 8, headY + 22, 2.6, '#451a03', null);
  } else {
    // Cartoon eyes
    drawEllipse(ctx, -8, headY + 21, 6.5, 7, '#ffffff', '#111827', 1.8);
    drawEllipse(ctx, 8, headY + 21, 6.5, 7, '#ffffff', '#111827', 1.8);
    drawCircle(ctx, -8.5, headY + 21, 4, '#542d13', null);
    drawCircle(ctx, 7.5, headY + 21, 4, '#542d13', null);
    drawCircle(ctx, -8.8, headY + 21, 2.2, '#111827', null);
    drawCircle(ctx, 7.2, headY + 21, 2.2, '#111827', null);
    drawCircle(ctx, -10, headY + 19.5, 1.2, '#ffffff', null);
    drawCircle(ctx, 6, headY + 19.5, 1.2, '#ffffff', null);
  }

  // Nose
  drawCircle(ctx, 0, headY + 28, 1.6, '#a66838', null);

  // Mouth
  if (pose === 'angry_standing') {
    // Wide yelling mouth ("আরে শালা তোর না, আমার লাগবো!")
    drawEllipse(ctx, 0, headY + 38, 7.5, 9, '#b91c1c', '#111827', 1.8);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-5, headY + 30, 10, 2.5);
    ctx.fillStyle = '#f87171';
    drawCircle(ctx, 0, headY + 42, 3.5, '#f87171', null);
  } else if (pose === 'lying_confused') {
    // Dumbfounded open O-mouth ("তুই জানলি কেমনে?!")
    drawEllipse(ctx, 0, headY + 36, 5, 6, '#b91c1c', '#111827', 1.6);
  } else if (pose === 'crying_shock') {
    // Screaming in funny despair
    drawEllipse(ctx, 0, headY + 38, 7, 8.5, '#b91c1c', '#111827', 1.8);
  } else {
    // Speaking / smiling
    ctx.strokeStyle = '#b91c1c'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0, headY + 34, 4.5, 0.2, Math.PI - 0.2); ctx.stroke();
  }
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

// Grand Outro Card (34.5s - 38.04s)
function drawOutroCard(ctx, w, h, isPort, t) {
  const p = Math.max(0, Math.min(1, (t - 34.5) / 0.8));
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
function drawSpeechBalloon(ctx, w, h, speaker, text, isFriendOnPhone) {
  ctx.save();
  const fontSize = 28;
  ctx.font = `bold ${fontSize}px "Noto Sans Bengali", sans-serif`;
  const tm = ctx.measureText(text);
  const bw = Math.min(w - 60, Math.max(260, tm.width + 64));
  const bh = 82;

  // In phone comedy, Friend on phone appears on right, Dipu on left
  const bx = isFriendOnPhone ? w - bw - 32 : 32;
  const by = Math.floor(h * 0.16);

  // Drop shadow
  drawRoundRect(ctx, bx + 5, by + 5, bw, bh, 18, 'rgba(0,0,0,0.24)', null);
  // Bubble body (cyan for phone friend, white for Dipu)
  const bubbleFill = isFriendOnPhone ? '#f0fdf4' : '#ffffff';
  drawRoundRect(ctx, bx, by, bw, bh, 18, bubbleFill, '#0f172a', 3.5);

  // Speaker Badge
  const badgeBg = isFriendOnPhone ? '#16a34a' : '#0284c7';
  const badgeW = 200;
  const badgeH = 34;
  drawRoundRect(ctx, bx + 16, by - 18, badgeW, badgeH, 8, badgeBg, '#ffffff', 2);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 17px "Noto Sans Bengali", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(speaker, bx + 24, by + 5);

  // Dialogue Text
  ctx.fillStyle = '#0f172a';
  ctx.font = `bold ${fontSize}px "Noto Sans Bengali", sans-serif`;
  ctx.fillText(text, bx + 24, by + 52);

  ctx.restore();
}

function drawBottomSubtitleBar(ctx, w, h, speaker, text) {
  const barH = 130;
  const barY = h - barH - 24;
  const barW = w - 48;
  const barX = (w - barW) / 2;

  drawRoundRect(ctx, barX, barY, barW, barH, 20, 'rgba(15, 23, 42, 0.92)', '#ffd54f', 3);

  const isFriend = speaker.includes('ফোনে');
  const badgeCol = isFriend ? '#16a34a' : '#0284c7';
  const badgeW = 210;
  drawRoundRect(ctx, barX + 18, barY + 14, badgeW, 46, 12, badgeCol, '#ffffff', 2);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px "Noto Sans Bengali", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(speaker, barX + 18 + badgeW / 2, barY + 44);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffeb3b';
  ctx.font = 'bold 26px "Noto Sans Bengali", sans-serif';
  ctx.fillText(text, barX + barW / 2, barY + 102);
}

// ----------------------------------------------------------------------------
// MAIN FRAME RENDERER (t: 0 -> 38.04s)
// ----------------------------------------------------------------------------
function frame(ctx, w, h, t) {
  ctx.clearRect(0, 0, w, h);
  const isPort = h > w;

  let speaker = '';
  let speechText = '';
  let isFriendOnPhone = false;
  let currentSetting = 'tea_stall';
  let dipuPose = 'sitting_bench';
  let shirtColor = '#facc15'; // yellow

  // ==================== 1. SCENE TIMING & SCRIPT ====================
  // CALL 1: (0.0 - 4.5s)
  if (t < 1.0) {
    speaker = '📞 দিপু:';
    speechText = 'হ্যালো?';
    currentSetting = 'tea_stall';
    dipuPose = 'sitting_bench';
  } else if (t < 2.2) {
    speaker = '📱 বন্ধু (ফোনে):';
    speechText = 'হ্যাঁ ভাই একটা কাজ আছিলো।';
    isFriendOnPhone = true;
    currentSetting = 'tea_stall';
    dipuPose = 'sitting_bench';
  } else if (t < 4.5) {
    speaker = '📞 দিপু:';
    speechText = 'ঠিক আছে আগে কাজ কর, পরে কল দিস! 😂';
    currentSetting = 'tea_stall';
    dipuPose = 'sitting_bench';
  }
  // CALL 2: (4.5 - 11.5s) - Lying in Grass
  else if (t < 6.0) {
    speaker = '📞 দিপু:';
    speechText = 'হ্যালো ভাই?';
    currentSetting = 'grass_field';
    dipuPose = 'lying_grass';
    shirtColor = '#991b1b'; // maroon
  } else if (t < 7.0) {
    speaker = '📱 বন্ধু (ফোনে):';
    speechText = 'হ্যাঁ ভাই বল।';
    isFriendOnPhone = true;
    currentSetting = 'grass_field';
    dipuPose = 'lying_grass';
    shirtColor = '#991b1b';
  } else if (t < 8.8) {
    speaker = '📞 দিপু:';
    speechText = 'ভাই ৫০০ টাকা লাগবো।';
    currentSetting = 'grass_field';
    dipuPose = 'lying_grass';
    shirtColor = '#991b1b';
  } else if (t < 11.5) {
    speaker = '📱 বন্ধু (ফোনে):';
    speechText = 'হ্যাঁ লাগবো তো, তুই জানলি কেমনে?! 😂';
    isFriendOnPhone = true;
    currentSetting = 'grass_field';
    dipuPose = 'lying_grass';
    shirtColor = '#991b1b';
  }
  // CALL 3: (11.5 - 25.0s) - Angry argument at Tea stall
  else if (t < 13.0) {
    speaker = '📞 দিপু:';
    speechText = 'হ্যালো ভাই?';
    currentSetting = 'tea_stall';
    dipuPose = 'sitting_bench';
    shirtColor = '#facc15';
  } else if (t < 14.0) {
    speaker = '📱 বন্ধু (ফোনে):';
    speechText = 'হ্যাঁ ভাই বল।';
    isFriendOnPhone = true;
    currentSetting = 'tea_stall';
    dipuPose = 'sitting_bench';
    shirtColor = '#facc15';
  } else if (t < 15.2) {
    speaker = '📞 দিপু:';
    speechText = 'ভাই ৫০০ টাকা লাগবো।';
    currentSetting = 'tea_stall';
    dipuPose = 'sitting_bench';
    shirtColor = '#facc15';
  } else if (t < 16.0) {
    speaker = '📱 বন্ধু (ফোনে):';
    speechText = 'হ্যাঁ লাগবো তো!';
    isFriendOnPhone = true;
    currentSetting = 'tea_stall';
    dipuPose = 'sitting_bench';
    shirtColor = '#facc15';
  } else if (t < 19.0) {
    speaker = '📞 দিপু:';
    speechText = 'আরে শালা তোর না, আমার লাগবো! আমার, আমার! 😡';
    currentSetting = 'tea_stall';
    dipuPose = 'angry_standing';
    shirtColor = '#facc15';
  } else if (t < 23.5) {
    speaker = '📱 বন্ধু (ফোনে):';
    speechText = 'তাহলে আরেকজনের কাছ থেকে ১০০০ ধার কর, ৫০০ আমারে দে আর ৫০০ তুই নে! 🤣';
    isFriendOnPhone = true;
    currentSetting = 'tea_stall';
    dipuPose = 'angry_standing';
    shirtColor = '#facc15';
  } else if (t < 25.0) {
    speaker = '📞 দিপু:';
    speechText = 'শালা...!! 🤦‍♂️';
    currentSetting = 'tea_stall';
    dipuPose = 'angry_standing';
    shirtColor = '#facc15';
  }
  // CALL 4: (25.0 - 34.5s) - Park Bench reverse twist
  else if (t < 28.0) {
    speaker = '📞 দিপু:';
    speechText = 'হ্যালো ভাই?';
    currentSetting = 'park';
    dipuPose = 'sitting_bench';
    shirtColor = '#334155'; // dark grey
  } else if (t < 31.5) {
    speaker = '📱 অন্য বন্ধু (ফোনে):';
    speechText = 'হ্যালো বন্ধু, একটা কাজ আছে ৫০০ টেকা পাঠা তো তাড়াতাড়ি!';
    isFriendOnPhone = true;
    currentSetting = 'park';
    dipuPose = 'crying_shock';
    shirtColor = '#334155';
  } else if (t < 34.5) {
    speaker = '📞 দিপু:';
    speechText = 'ওরে খোদা...! 😭😂 (কান্নার রোল)';
    currentSetting = 'park';
    dipuPose = 'crying_shock';
    shirtColor = '#334155';
  }

  // ==================== 2. DRAW ENVIRONMENT ====================
  if (currentSetting === 'tea_stall') {
    drawTeaStallBackground(ctx, w, h, t);
    // Draw Dipu sitting on tea stall bench
    const px = w * 0.40;
    const py = h * 0.68;
    drawDipu(ctx, px, py, 2.5, t, dipuPose, shirtColor);

  } else if (currentSetting === 'grass_field') {
    drawGrassFieldBackground(ctx, w, h, t);
    // Draw Dipu lying down in grass
    const px = w * 0.50;
    const py = h * 0.58;
    drawDipu(ctx, px, py, 2.3, t, dipuPose, shirtColor);

  } else {
    drawParkBackground(ctx, w, h, t);
    // Draw Dipu sitting on park bench
    const px = w * 0.40;
    const py = h * 0.66;
    drawDipu(ctx, px, py, 2.5, t, dipuPose, shirtColor);
  }

  // ==================== 3. UI, BALLOON & SUBTITLES ====================
  if (speaker && speechText && t < 34.5) {
    drawSpeechBalloon(ctx, w, h, speaker, speechText, isFriendOnPhone);
    drawBottomSubtitleBar(ctx, w, h, speaker, speechText);
  }

  // Watermark
  if (t < 34.5) {
    drawChannelWatermark(ctx, w, h, isPort, t);
  }

  // Grand Outro Screen (34.5s - 38.04s)
  if (t >= 34.5) {
    drawOutroCard(ctx, w, h, isPort, t);
  }
}
