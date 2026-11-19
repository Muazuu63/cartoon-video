// ============================================================================
// DipuToons - Premium 2D Cartoon Animation Engine
// Episode: "ছাত্র ও শিক্ষিকার চরম হাসির কথোপকথন" (Naughty Student & Angry Teacher)
// Characters: শিক্ষিকা (Teacher in blue-patterned kurti) & ছাত্র (Student in Real Madrid kit)
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
// Classroom & Study Room Environment
// ----------------------------------------------------------------------------
function drawClassroomBackground(ctx, w, h, isPort, t) {
  // 1. Soft Warm Classroom Wall
  const wallGrad = ctx.createLinearGradient(0, 0, 0, h * 0.72);
  wallGrad.addColorStop(0, '#f8fafc');
  wallGrad.addColorStop(0.5, '#f1f5f9');
  wallGrad.addColorStop(1, '#e2e8f0');
  ctx.fillStyle = wallGrad;
  ctx.fillRect(0, 0, w, h);

  // 2. Wall Clock (Centered above board)
  const clockX = w / 2;
  const clockY = isPort ? h * 0.055 : h * 0.045;
  const clockR = isPort ? 26 : 24;
  drawCircle(ctx, clockX, clockY, clockR, '#ffffff', '#1e293b', 3);
  drawCircle(ctx, clockX, clockY, 2.5, '#1e293b', null);
  // Clock hands (showing 10:10)
  ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(clockX, clockY); ctx.lineTo(clockX - 10, clockY - 12); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(clockX, clockY); ctx.lineTo(clockX + 14, clockY - 6); ctx.stroke();

  // 3. Classroom Whiteboard / Study Board in Center
  const boardW = isPort ? w * 0.88 : w * 0.54;
  const boardH = isPort ? h * 0.24 : h * 0.32;
  const boardX = (w - boardW) / 2;
  const boardY = isPort ? h * 0.10 : h * 0.08;

  // Board Frame
  drawRoundRect(ctx, boardX - 8, boardY - 8, boardW + 16, boardH + 16, 12, '#475569', '#1e293b', 3.5);
  drawRoundRect(ctx, boardX, boardY, boardW, boardH, 8, '#ffffff', '#94a3b8', 2);

  // Board Content (Equations & DipuToons Coaching Header)
  ctx.save();
  ctx.fillStyle = '#0284c7';
  ctx.font = `bold ${isPort ? 24 : 22}px "Noto Sans Bengali", sans-serif`;
  ctx.textAlign = 'left';
  ctx.fillText('📚 DipuToons স্পেশাল কোচিং', boardX + 24, boardY + (isPort ? 42 : 36));

  ctx.fillStyle = '#334155';
  ctx.font = `bold ${isPort ? 18 : 18}px sans-serif`;
  ctx.fillText('Math: (a + b)² = a² + 2ab + b²', boardX + 24, boardY + (isPort ? 82 : 68));
  ctx.fillText('English: Spoken & Grammar Practice', boardX + 24, boardY + (isPort ? 118 : 98));
  ctx.fillStyle = '#10b981';
  ctx.fillText('Target: 100% GPA-5 🎯', boardX + 24, boardY + (isPort ? 154 : 128));
  ctx.restore();

  // Marker Tray at bottom of board
  drawRoundRect(ctx, boardX + 30, boardY + boardH - 4, boardW - 60, 8, 3, '#94a3b8', '#64748b', 1.5);
  // Color Markers
  drawRoundRect(ctx, boardX + 50, boardY + boardH - 8, 22, 6, 2, '#ef4444', null);
  drawRoundRect(ctx, boardX + 80, boardY + boardH - 8, 22, 6, 2, '#3b82f6', null);
  drawRoundRect(ctx, boardX + 110, boardY + boardH - 8, 22, 6, 2, '#10b981', null);

  // 4. Sunlit Window (Only in landscape where space allows)
  if (!isPort) {
    const winX = w * 0.05;
    const winY = h * 0.08;
    const winW = w * 0.18;
    const winH = h * 0.32;

    drawRoundRect(ctx, winX - 6, winY - 6, winW + 12, winH + 12, 10, '#ffffff', '#94a3b8', 2.5);
    drawRoundRect(ctx, winX, winY, winW, winH, 6, '#e0f2fe', '#64748b', 3);

    ctx.save();
    ctx.beginPath();
    ctx.rect(winX, winY, winW, winH);
    ctx.clip();
    ctx.fillStyle = '#bae6fd';
    ctx.fillRect(winX, winY, winW, winH);
    drawCircle(ctx, winX + winW * 0.4, winY + winH * 0.8, winW * 0.45, '#86efac', null);
    drawCircle(ctx, winX + winW * 0.8, winY + winH * 0.6, winW * 0.35, '#4ade80', null);
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(winX + winW / 2, winY); ctx.lineTo(winX + winW / 2, winY + winH); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(winX, winY + winH / 2); ctx.lineTo(winX + winW, winY + winH / 2); ctx.stroke();
    ctx.restore();
  }

  // 5. Floor: Polished Classroom Floor
  const floorY = h * 0.70;
  const floorGrad = ctx.createLinearGradient(0, floorY, 0, h);
  floorGrad.addColorStop(0, '#9a3412');
  floorGrad.addColorStop(0.3, '#7c2d12');
  floorGrad.addColorStop(1, '#5a1e0b');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, floorY, w, h - floorY);

  // Floor plank lines
  ctx.strokeStyle = '#3a120733';
  ctx.lineWidth = 2.5;
  for (let y = floorY + 30; y < h; y += 42) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }

  // White Baseboard Trim
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, floorY - 14, w, 14);
  ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2;
  ctx.strokeRect(0, floorY - 14, w, 14);

  // 6. Teacher's Desk in background (Left side)
  const deskX = isPort ? w * 0.05 : w * 0.06;
  const deskY = floorY - 60;
  const deskW = isPort ? w * 0.28 : w * 0.22;
  const deskH = 60;

  drawRoundRect(ctx, deskX, deskY, deskW, deskH, 6, '#78350f', '#451a03', 2.5);
  drawRoundRect(ctx, deskX + 15, deskY - 16, 36, 16, 2, '#3b82f6', '#1d4ed8', 1.5);
  drawRoundRect(ctx, deskX + 18, deskY - 26, 32, 12, 2, '#ef4444', '#b91c1c', 1.5);
  drawRoundRect(ctx, deskX + deskW - 35, deskY - 22, 18, 22, 3, '#94a3b8', '#475569', 1.5);
}

// ----------------------------------------------------------------------------
// Character 1: Female Teacher ("মিস / শিক্ষিকা")
// Exactly matching user 3D photo (media_1795113324354_5f57bb47.jpg):
// Black straight hair, dark glasses, beautiful white kurti with blue floral pattern,
// dark navy/black salwar, slide flat sandals, holding notebook/clipboard
// ----------------------------------------------------------------------------
function drawTeacher(ctx, tx, ty, scale, t, isTalking, expr) {
  ctx.save();
  ctx.translate(tx, ty);
  ctx.scale(scale, scale);

  const bob = Math.sin(t * 3.8) * 3;
  const talkMouth = isTalking ? Math.abs(Math.sin(t * 15)) : 0;

  // Floor Shadow
  drawEllipse(ctx, 0, 134 + bob, 44, 11, 'rgba(0, 0, 0, 0.28)', null);

  // ==================== 1. SALWAR & LEGS ====================
  // Dark navy/black comfortable salwar
  ctx.fillStyle = '#1e293b';
  // Left Leg
  ctx.beginPath();
  ctx.moveTo(-22, 20 + bob);
  ctx.quadraticCurveTo(-26, 75 + bob, -24, 124 + bob);
  ctx.lineTo(-6, 124 + bob);
  ctx.quadraticCurveTo(-6, 75 + bob, -4, 20 + bob);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2; ctx.stroke();

  // Right Leg
  ctx.beginPath();
  ctx.moveTo(4, 20 + bob);
  ctx.quadraticCurveTo(6, 75 + bob, 6, 124 + bob);
  ctx.lineTo(24, 124 + bob);
  ctx.quadraticCurveTo(26, 75 + bob, 22, 20 + bob);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2; ctx.stroke();

  // Slide Flat Sandals
  drawRoundRect(ctx, -26, 124 + bob, 22, 8, 3, '#78350f', '#451a03', 1.6);
  drawRoundRect(ctx, -23, 121 + bob, 16, 5, 2, '#9a3412', null);
  drawCircle(ctx, -9, 125 + bob, 2.5, '#c68b59', null); // toes

  drawRoundRect(ctx, 4, 124 + bob, 22, 8, 3, '#78350f', '#451a03', 1.6);
  drawRoundRect(ctx, 7, 121 + bob, 16, 5, 2, '#9a3412', null);
  drawCircle(ctx, 21, 125 + bob, 2.5, '#c68b59', null); // toes

  // ==================== 2. WHITE & BLUE FLORAL KURTI ====================
  // Kurti Body (Long traditional top extending down to knees)
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(-26, 26 + bob);
  ctx.lineTo(-24, -68 + bob);
  ctx.lineTo(-34, -80 + bob); // left shoulder
  ctx.quadraticCurveTo(-16, -88 + bob, 0, -86 + bob);
  ctx.quadraticCurveTo(16, -88 + bob, 34, -80 + bob); // right shoulder
  ctx.lineTo(24, -68 + bob);
  ctx.lineTo(26, 26 + bob);
  ctx.quadraticCurveTo(0, 30 + bob, -26, 26 + bob);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 2; ctx.stroke();

  // Intricate Blue Floral Block Pattern on Kurti
  ctx.fillStyle = '#2563eb';
  const flowerOffsets = [
    [-14, -60], [12, -58], [-4, -45], [14, -35], [-16, -25], [4, -18],
    [-10, 0], [12, 2], [-18, 16], [8, 18]
  ];
  for (const [fx, fy] of flowerOffsets) {
    drawCircle(ctx, fx, fy + bob, 3.2, '#2563eb', null);
    drawCircle(ctx, fx - 2, fy - 2 + bob, 2, '#60a5fa', null);
    drawCircle(ctx, fx + 2, fy - 2 + bob, 2, '#60a5fa', null);
    drawCircle(ctx, fx, fy + 3 + bob, 2, '#60a5fa', null);
  }

  // Kurti Embroidered Blue Border at Bottom & Neck
  drawRoundRect(ctx, -26, 21 + bob, 52, 6, 2, '#1d4ed8', '#1e40af', 1.5);
  ctx.strokeStyle = '#1d4ed8'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(0, -86 + bob, 11, 0.2, Math.PI - 0.2); ctx.stroke();

  // Kurti Sleeves (Long sleeves ending mid-forearm with blue border)
  // Left Sleeve
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.moveTo(-34, -80 + bob);
  ctx.lineTo(-45, -35 + bob);
  ctx.lineTo(-34, -32 + bob);
  ctx.lineTo(-24, -68 + bob);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 1.8; ctx.stroke();
  drawRoundRect(ctx, -45, -36 + bob, 12, 5, 1.5, '#1d4ed8', null);

  // Right Sleeve
  ctx.fillStyle = '#f8fafc';
  if (expr === 'angry_ruler') {
    // Right arm raised high with wooden ruler!
    ctx.beginPath();
    ctx.moveTo(34, -80 + bob);
    ctx.lineTo(46, -108 + bob);
    ctx.lineTo(36, -112 + bob);
    ctx.lineTo(24, -68 + bob);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 1.8; ctx.stroke();
    drawRoundRect(ctx, 36, -114 + bob, 12, 5, 1.5, '#1d4ed8', null);
  } else {
    // Normal standing / holding notebook
    ctx.beginPath();
    ctx.moveTo(34, -80 + bob);
    ctx.lineTo(45, -35 + bob);
    ctx.lineTo(34, -32 + bob);
    ctx.lineTo(24, -68 + bob);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 1.8; ctx.stroke();
    drawRoundRect(ctx, 33, -36 + bob, 12, 5, 1.5, '#1d4ed8', null);
  }

  // ==================== 3. ARMS & ACCESSORIES ====================
  ctx.fillStyle = '#c68b59';
  ctx.strokeStyle = '#a66838';

  if (expr === 'angry_ruler') {
    // Left hand on hip
    ctx.lineWidth = 9; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-40, -34 + bob); ctx.lineTo(-28, -8 + bob); ctx.stroke();
    drawCircle(ctx, -28, -6 + bob, 7, '#c68b59', '#a66838', 1.8);

    // Right arm raised with wooden ruler / stick!
    ctx.beginPath(); ctx.moveTo(42, -110 + bob); ctx.lineTo(48, -135 + bob); ctx.stroke();
    drawCircle(ctx, 48, -137 + bob, 7.5, '#c68b59', '#a66838', 1.8);

    // Wooden Ruler / Duster in hand!
    drawRoundRect(ctx, 45, -180 + bob, 7, 50, 2, '#d97706', '#92400e', 1.8);
    // Ruler millimeter markings
    ctx.strokeStyle = '#78350f'; ctx.lineWidth = 1.2;
    for (let r = -175; r < -135; r += 6) {
      ctx.beginPath(); ctx.moveTo(45, r + bob); ctx.lineTo(49, r + bob); ctx.stroke();
    }
  } else {
    // Holding teacher study notebook / clipboard
    ctx.lineWidth = 9; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-40, -34 + bob); ctx.lineTo(-14, -20 + bob); ctx.stroke();
    drawCircle(ctx, -12, -18 + bob, 7, '#c68b59', '#a66838', 1.8);

    ctx.beginPath(); ctx.moveTo(40, -34 + bob); ctx.lineTo(14, -20 + bob); ctx.stroke();
    drawCircle(ctx, 12, -18 + bob, 7, '#c68b59', '#a66838', 1.8);

    // Notebook / Register in arms
    drawRoundRect(ctx, -16, -26 + bob, 32, 22, 3, '#0284c7', '#0369a1', 1.8);
    drawRoundRect(ctx, -13, -24 + bob, 26, 18, 2, '#ffffff', null);
    ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-10, -18 + bob); ctx.lineTo(10, -18 + bob); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-10, -12 + bob); ctx.lineTo(6, -12 + bob); ctx.stroke();
  }

  // ==================== 4. HAIR BACK (Behind neck and shoulders) ====================
  const headY = -134 + bob;
  ctx.fillStyle = '#0f172a';
  // Left flowing hair
  ctx.beginPath();
  ctx.moveTo(-16, headY + 12);
  ctx.quadraticCurveTo(-27, headY + 45, -23, headY + 85);
  ctx.lineTo(-15, headY + 85);
  ctx.quadraticCurveTo(-18, headY + 45, -14, headY + 22);
  ctx.closePath();
  ctx.fill();

  // Right flowing hair
  ctx.beginPath();
  ctx.moveTo(16, headY + 12);
  ctx.quadraticCurveTo(27, headY + 45, 23, headY + 85);
  ctx.lineTo(15, headY + 85);
  ctx.quadraticCurveTo(18, headY + 45, 14, headY + 22);
  ctx.closePath();
  ctx.fill();

  // ==================== 5. NECK ====================
  ctx.fillStyle = '#c68b59';
  ctx.fillRect(-7, -98 + bob, 14, 16);
  ctx.strokeStyle = '#a66838'; ctx.lineWidth = 1.6;
  ctx.strokeRect(-7, -98 + bob, 14, 16);

  // ==================== 6. HEAD & BEAUTIFUL FACE ====================
  // Face Oval
  ctx.fillStyle = '#c68b59';
  ctx.beginPath();
  ctx.moveTo(-16, headY + 8);
  ctx.lineTo(-15, headY + 28);
  ctx.quadraticCurveTo(-12, headY + 44, 0, headY + 46);
  ctx.quadraticCurveTo(12, headY + 44, 15, headY + 28);
  ctx.lineTo(16, headY + 8);
  ctx.quadraticCurveTo(0, headY - 6, -16, headY + 8);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#a66838'; ctx.lineWidth = 1.8; ctx.stroke();

  // Ears
  drawEllipse(ctx, -17, headY + 22, 3, 6, '#c68b59', '#a66838', 1.5);
  drawEllipse(ctx, 17, headY + 22, 3, 6, '#c68b59', '#a66838', 1.5);

  // Eyebrows (Placed cleanly above glasses at headY + 9)
  ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 2.2; ctx.lineCap = 'round';
  if (expr === 'angry_ruler' || expr === 'annoyed') {
    // Furiously slanted eyebrows!
    ctx.beginPath(); ctx.moveTo(-14, headY + 8); ctx.lineTo(-3, headY + 12); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(14, headY + 8); ctx.lineTo(3, headY + 12); ctx.stroke();
  } else {
    // Calm scholarly eyebrows
    ctx.beginPath(); ctx.moveTo(-14, headY + 9); ctx.lineTo(-3, headY + 9); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(14, headY + 9); ctx.lineTo(3, headY + 9); ctx.stroke();
  }

  // Eyes (Gentle anime eyes)
  drawEllipse(ctx, -8, headY + 20, 5, 4.5, '#ffffff', '#0f172a', 1.2);
  drawEllipse(ctx, 8, headY + 20, 5, 4.5, '#ffffff', '#0f172a', 1.2);

  // Warm Dark Brown Irises
  drawCircle(ctx, -7.5, headY + 20, 2.8, '#451a03', null);
  drawCircle(ctx, 8.5, headY + 20, 2.8, '#451a03', null);
  drawCircle(ctx, -7.2, headY + 20, 1.6, '#0f172a', null);
  drawCircle(ctx, 8.8, headY + 20, 1.6, '#0f172a', null);
  drawCircle(ctx, -8.2, headY + 19, 0.9, '#ffffff', null);
  drawCircle(ctx, 7.8, headY + 19, 0.9, '#ffffff', null);

  // Eyelashes
  ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.6;
  ctx.beginPath(); ctx.moveTo(-13, headY + 17); ctx.lineTo(-11, headY + 15); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(13, headY + 17); ctx.lineTo(11, headY + 15); ctx.stroke();

  // Stylish Dark Rectangular Eyeglasses (Framing eyes naturally with ample space)
  ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1.6;
  drawRoundRect(ctx, -15, headY + 12, 14, 15, 3.5, 'rgba(255, 255, 255, 0.22)', '#1e293b', 1.6);
  drawRoundRect(ctx, 1, headY + 12, 14, 15, 3.5, 'rgba(255, 255, 255, 0.22)', '#1e293b', 1.6);
  // Glasses Bridge
  ctx.beginPath(); ctx.moveTo(-1, headY + 18); ctx.lineTo(1, headY + 18); ctx.stroke();
  // Temples to ears
  ctx.beginPath(); ctx.moveTo(-15, headY + 16); ctx.lineTo(-17, headY + 19); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(15, headY + 16); ctx.lineTo(17, headY + 19); ctx.stroke();

  // Nose
  ctx.strokeStyle = '#a66838'; ctx.lineWidth = 1.6;
  ctx.beginPath(); ctx.moveTo(0, headY + 20); ctx.lineTo(-1.2, headY + 28); ctx.lineTo(1.2, headY + 28); ctx.stroke();

  // Mouth
  if (expr === 'angry_ruler') {
    // Wide shouting angry teacher mouth ("দাঁড়া! এখন মাইর দিবো!")
    drawEllipse(ctx, 0, headY + 36, 7, 8, '#b91c1c', '#0f172a', 1.8);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-4, headY + 30, 8, 2.5);
    ctx.fillStyle = '#f87171';
    drawCircle(ctx, 0, headY + 40, 3, '#f87171', null);
  } else if (isTalking) {
    const mh = 2.5 + talkMouth * 6;
    drawEllipse(ctx, 0, headY + 35, 5, mh, '#b91c1c', '#0f172a', 1.6);
  } else if (expr === 'annoyed') {
    // Annoyed stern straight line
    ctx.strokeStyle = '#b91c1c'; ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.moveTo(-5, headY + 35); ctx.lineTo(5, headY + 35); ctx.stroke();
  } else {
    // Gentle polite teacher smile
    ctx.strokeStyle = '#b91c1c'; ctx.lineWidth = 1.8;
    ctx.beginPath(); ctx.arc(0, headY + 34, 4.5, 0.2, Math.PI - 0.2); ctx.stroke();
  }

  // Hair Top & Middle Parting (Framing forehead cleanly)
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.moveTo(-18, headY + 12);
  ctx.quadraticCurveTo(-16, headY - 16, 0, headY - 18);
  ctx.quadraticCurveTo(16, headY - 16, 18, headY + 12);
  ctx.lineTo(14, headY + 6);
  ctx.quadraticCurveTo(6, headY - 4, 0, headY + 4); // center part
  ctx.quadraticCurveTo(-6, headY - 4, -14, headY + 6);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

// ----------------------------------------------------------------------------
// Character 2: Student ("ছাত্র")
// Exactly matching user 3D photo (media_1795113324354_5f57bb47.jpg):
// Tousled spiky black hair, mischievous smile, Real Madrid white striped jersey,
// white shorts with black side stripe, black crew socks, sporty grey sneakers
// ----------------------------------------------------------------------------
function drawStudent(ctx, sx, sy, scale, t, isTalking, expr) {
  ctx.save();
  ctx.translate(sx, sy);
  ctx.scale(scale, scale);

  const bob = Math.sin(t * 4.4) * 3.5;
  const talkMouth = isTalking ? Math.abs(Math.sin(t * 16)) : 0;

  // Floor Shadow
  drawEllipse(ctx, 0, 134 + bob, 42, 10, 'rgba(0, 0, 0, 0.26)', null);

  // ==================== 1. SHORTS, SOCKS & SNEAKERS ====================
  // White Athletic Shorts (Real Madrid style)
  ctx.fillStyle = '#ffffff';
  drawRoundRect(ctx, -20, 10 + bob, 17, 34, 3.5, '#ffffff', '#cbd5e1', 2);
  drawRoundRect(ctx, 3, 10 + bob, 17, 34, 3.5, '#ffffff', '#cbd5e1', 2);
  // Black Side Stripes on Shorts
  ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(-19, 10 + bob); ctx.lineTo(-19, 44 + bob); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(19, 10 + bob); ctx.lineTo(19, 44 + bob); ctx.stroke();

  // Bare Legs
  ctx.fillStyle = '#c68b59';
  drawRoundRect(ctx, -16, 44 + bob, 10, 36, 3, '#c68b59', '#a66838', 1.8);
  drawRoundRect(ctx, 6, 44 + bob, 10, 36, 3, '#c68b59', '#a66838', 1.8);

  // Black Crew Athletic Socks
  drawRoundRect(ctx, -17, 80 + bob, 12, 22, 3, '#1e293b', '#0f172a', 1.8);
  drawRoundRect(ctx, 5, 80 + bob, 12, 22, 3, '#1e293b', '#0f172a', 1.8);
  // Sock Ribbing Stripes
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(-16, 84 + bob); ctx.lineTo(-6, 84 + bob); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(6, 84 + bob); ctx.lineTo(16, 84 + bob); ctx.stroke();

  // Cool Grey & White Sporty Sneakers
  // Left Sneaker
  drawRoundRect(ctx, -24, 102 + bob, 22, 14, 4, '#475569', '#1e293b', 1.8);
  drawRoundRect(ctx, -26, 112 + bob, 25, 6, 2, '#ffffff', '#94a3b8', 1.5); // sole
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(-18, 106 + bob); ctx.lineTo(-12, 106 + bob); ctx.stroke(); // laces

  // Right Sneaker
  drawRoundRect(ctx, 2, 102 + bob, 22, 14, 4, '#475569', '#1e293b', 1.8);
  drawRoundRect(ctx, 1, 112 + bob, 25, 6, 2, '#ffffff', '#94a3b8', 1.5); // sole
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(8, 106 + bob); ctx.lineTo(14, 106 + bob); ctx.stroke(); // laces

  // ==================== 2. WHITE STRIPED FOOTBALL JERSEY ====================
  // White Athletic Jersey Body
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(-26, 12 + bob);
  ctx.lineTo(-27, -65 + bob);
  ctx.lineTo(-36, -78 + bob); // left shoulder
  ctx.quadraticCurveTo(-18, -86 + bob, 0, -84 + bob);
  ctx.quadraticCurveTo(18, -86 + bob, 36, -78 + bob); // right shoulder
  ctx.lineTo(27, -65 + bob);
  ctx.lineTo(26, 12 + bob);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 2; ctx.stroke();

  // Real Madrid Signature Vertical Black Pinstripes
  ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 2.2;
  const stripeX = [-14, -6, 6, 14];
  for (const sx of stripeX) {
    ctx.beginPath(); ctx.moveTo(sx, -76 + bob); ctx.lineTo(sx, 12 + bob); ctx.stroke();
  }

  // Black V-Neck Collar
  ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(-12, -84 + bob);
  ctx.lineTo(0, -74 + bob);
  ctx.lineTo(12, -84 + bob);
  ctx.stroke();

  // Sleeves with Black Hem Trim
  // Left Sleeve
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(-36, -78 + bob);
  ctx.lineTo(-48, -50 + bob);
  ctx.lineTo(-36, -44 + bob);
  ctx.lineTo(-27, -65 + bob);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1.8; ctx.stroke();
  drawRoundRect(ctx, -48, -52 + bob, 14, 5, 2, '#1e293b', null); // black cuff trim

  // Right Sleeve
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(36, -78 + bob);
  ctx.lineTo(48, -50 + bob);
  ctx.lineTo(36, -44 + bob);
  ctx.lineTo(27, -65 + bob);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1.8; ctx.stroke();
  drawRoundRect(ctx, 34, -52 + bob, 14, 5, 2, '#1e293b', null); // black cuff trim

  // ==================== 3. ARMS & MISCHIEVOUS GESTURES ====================
  ctx.fillStyle = '#c68b59';
  ctx.strokeStyle = '#a66838';

  if (expr === 'running_scared') {
    // Running away terrified, hands flailing in the air! ("ওরে বাবা!")
    ctx.lineWidth = 10; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-42, -48 + bob); ctx.lineTo(-58, -85 + bob); ctx.stroke();
    drawCircle(ctx, -60, -88 + bob, 8, '#c68b59', '#a66838', 1.8);

    ctx.beginPath(); ctx.moveTo(42, -48 + bob); ctx.lineTo(58, -85 + bob); ctx.stroke();
    drawCircle(ctx, 60, -88 + bob, 8, '#c68b59', '#a66838', 1.8);
  } else if (expr === 'giggling_roast') {
    // Both hands on belly giggling/laughing
    ctx.lineWidth = 10; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-42, -48 + bob); ctx.quadraticCurveTo(-35, -20 + bob, -14, -12 + bob); ctx.stroke();
    drawCircle(ctx, -12, -10 + bob, 8, '#c68b59', '#a66838', 1.8);

    ctx.beginPath(); ctx.moveTo(42, -48 + bob); ctx.quadraticCurveTo(35, -20 + bob, 14, -12 + bob); ctx.stroke();
    drawCircle(ctx, 12, -10 + bob, 8, '#c68b59', '#a66838', 1.8);
  } else if (expr === 'pointing_question') {
    // Left hand in pocket/side, Right hand raised asking question
    ctx.lineWidth = 10; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-42, -48 + bob); ctx.lineTo(-36, -6 + bob); ctx.stroke();
    drawCircle(ctx, -35, -2 + bob, 8, '#c68b59', '#a66838', 1.8);

    // Right arm raised high pointing index finger up
    ctx.beginPath(); ctx.moveTo(42, -48 + bob); ctx.lineTo(48, -78 + bob); ctx.stroke();
    drawCircle(ctx, 48, -80 + bob, 8, '#c68b59', '#a66838', 1.8);
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(48, -82 + bob); ctx.lineTo(50, -96 + bob); ctx.stroke();
  } else {
    // Natural mischievous teenage stance
    ctx.lineWidth = 10; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-42, -48 + bob); ctx.lineTo(-36, -4 + bob); ctx.stroke();
    drawCircle(ctx, -35, -1 + bob, 8, '#c68b59', '#a66838', 1.8);

    ctx.beginPath(); ctx.moveTo(42, -48 + bob); ctx.lineTo(36, -4 + bob); ctx.stroke();
    drawCircle(ctx, 35, -1 + bob, 8, '#c68b59', '#a66838', 1.8);
  }

  // ==================== 4. NECK ====================
  ctx.fillStyle = '#c68b59';
  ctx.fillRect(-8, -98 + bob, 16, 16);
  ctx.strokeStyle = '#a66838'; ctx.lineWidth = 1.6;
  ctx.strokeRect(-8, -98 + bob, 16, 16);

  // ==================== 5. HEAD & ADORABLE ANIME FACE ====================
  const headY = -138 + bob;

  // Face Oval
  ctx.fillStyle = '#c68b59';
  ctx.beginPath();
  ctx.moveTo(-18, headY + 8);
  ctx.lineTo(-17, headY + 30);
  ctx.quadraticCurveTo(-14, headY + 48, 0, headY + 50);
  ctx.quadraticCurveTo(14, headY + 48, 17, headY + 30);
  ctx.lineTo(18, headY + 8);
  ctx.quadraticCurveTo(0, headY - 6, -18, headY + 8);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#a66838'; ctx.lineWidth = 1.8; ctx.stroke();

  // Ears
  drawEllipse(ctx, -19, headY + 22, 3.2, 6.5, '#c68b59', '#a66838', 1.5);
  drawEllipse(ctx, 19, headY + 22, 3.2, 6.5, '#c68b59', '#a66838', 1.5);

  // Spiky Fluffy Black Anime Hair (Tousled dynamic spikes)
  ctx.fillStyle = '#111827';
  ctx.beginPath();
  ctx.moveTo(-20, headY + 18);
  ctx.lineTo(-24, headY + 6);
  ctx.lineTo(-20, headY - 8);
  ctx.lineTo(-14, headY - 18);
  ctx.lineTo(-20, headY - 26);
  ctx.lineTo(-8, headY - 22);
  ctx.lineTo(-6, headY - 34); // left top spike
  ctx.lineTo(0, headY - 24);
  ctx.lineTo(8, headY - 36);  // center top spike
  ctx.lineTo(14, headY - 22);
  ctx.lineTo(22, headY - 28); // right top spike
  ctx.lineTo(20, headY - 10);
  ctx.lineTo(26, headY - 2);
  ctx.lineTo(22, headY + 8);
  ctx.lineTo(22, headY + 18);
  // Dynamic bangs over forehead
  ctx.lineTo(16, headY + 10);
  ctx.quadraticCurveTo(6, headY + 4, 0, headY + 14);
  ctx.quadraticCurveTo(-6, headY + 4, -14, headY + 14);
  ctx.lineTo(-18, headY + 10);
  ctx.closePath();
  ctx.fill();

  // Eyebrows
  ctx.strokeStyle = '#111827'; ctx.lineWidth = 2.6; ctx.lineCap = 'round';
  if (expr === 'running_scared') {
    // Terrified high arched eyebrows!
    ctx.beginPath(); ctx.moveTo(-14, headY + 8); ctx.lineTo(-4, headY + 14); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(14, headY + 8); ctx.lineTo(4, headY + 14); ctx.stroke();
  } else if (expr === 'giggling_roast' || expr === 'pointing_question') {
    // Playful raised eyebrow
    ctx.beginPath(); ctx.moveTo(-14, headY + 14); ctx.lineTo(-4, headY + 12); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(14, headY + 9); ctx.lineTo(4, headY + 12); ctx.stroke();
  } else {
    // Inquisitive kid brows
    ctx.beginPath(); ctx.moveTo(-14, headY + 13); ctx.lineTo(-4, headY + 13); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(14, headY + 13); ctx.lineTo(4, headY + 13); ctx.stroke();
  }

  // Giant Sparkling Brown Cartoon Anime Eyes
  if (expr === 'giggling_roast') {
    // Joyful squinting eyes (^ ^)
    ctx.strokeStyle = '#111827'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(-8, headY + 22, 5.5, Math.PI, 0); ctx.stroke();
    ctx.beginPath(); ctx.arc(8, headY + 22, 5.5, Math.PI, 0); ctx.stroke();
  } else if (expr === 'running_scared') {
    // Huge wide terrified anime eyes (O_O)
    drawEllipse(ctx, -8, headY + 22, 7, 8, '#ffffff', '#111827', 2);
    drawEllipse(ctx, 8, headY + 22, 7, 8, '#ffffff', '#111827', 2);
    drawCircle(ctx, -8, headY + 22, 3, '#0f172a', null);
    drawCircle(ctx, 8, headY + 22, 3, '#0f172a', null);
  } else {
    // Sclera
    drawEllipse(ctx, -8, headY + 22, 6.5, 7.5, '#ffffff', '#111827', 1.8);
    drawEllipse(ctx, 8, headY + 22, 6.5, 7.5, '#ffffff', '#111827', 1.8);

    // Warm Chocolate Brown Irises (looking playfully towards teacher!)
    drawCircle(ctx, -9, headY + 21, 4.5, '#542d13', null);
    drawCircle(ctx, 7, headY + 21, 4.5, '#542d13', null);

    // Dark Pupil
    drawCircle(ctx, -9.5, headY + 21, 2.8, '#111827', null);
    drawCircle(ctx, 6.5, headY + 21, 2.8, '#111827', null);

    // Catchlights
    drawCircle(ctx, -11, headY + 19, 1.6, '#ffffff', null);
    drawCircle(ctx, 5, headY + 19, 1.6, '#ffffff', null);
    drawCircle(ctx, -8, headY + 23, 1, '#ffffff', null);
    drawCircle(ctx, 8, headY + 23, 1, '#ffffff', null);
  }

  // Nose
  drawCircle(ctx, 0, headY + 28, 1.6, '#a66838', null);

  // Mouth
  if (expr === 'running_scared') {
    // Wide open screaming mouth ("ওরে বাবা!")
    drawEllipse(ctx, 0, headY + 38, 7.5, 10, '#b91c1c', '#111827', 1.8);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-5, headY + 29, 10, 2.5);
    ctx.fillStyle = '#f87171';
    drawCircle(ctx, 0, headY + 42, 4, '#f87171', null);
  } else if (expr === 'giggling_roast') {
    // Hearty laughing kid mouth
    drawEllipse(ctx, 0, headY + 36, 7, 8, '#b91c1c', '#111827', 1.8);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-4.5, headY + 30, 9, 2);
  } else if (isTalking) {
    const mh = 2.5 + talkMouth * 6.5;
    ctx.fillStyle = '#b91c1c';
    ctx.beginPath();
    ctx.arc(0, headY + 34, 5, 0.1, Math.PI - 0.1);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#111827'; ctx.lineWidth = 1.6; ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-3.5, headY + 34, 7, 2);
    if (talkMouth > 0.3) {
      ctx.fillStyle = '#f87171';
      drawCircle(ctx, 0, headY + 37, 2.2, '#f87171', null);
    }
  } else {
    // Cheeky confident teenage smile
    ctx.strokeStyle = '#b91c1c'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0, headY + 34, 5, 0.2, Math.PI - 0.2); ctx.stroke();
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

// Grand Outro Card (23.5s - 26.77s)
function drawOutroCard(ctx, w, h, isPort, t) {
  const p = Math.max(0, Math.min(1, (t - 23.5) / 0.8));
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
  const isTeacher = speaker.includes('মিস');
  const badgeBg = isTeacher ? '#db2777' : '#0284c7';
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

  const isTeacher = speaker.includes('মিস');
  const badgeCol = isTeacher ? '#db2777' : '#0284c7';
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
// MAIN FRAME RENDERER (Called for every frame t: 0 -> 26.77)
// ----------------------------------------------------------------------------
function frame(ctx, w, h, t) {
  ctx.clearRect(0, 0, w, h);
  const isPort = h > w;

  // 1. Draw Classroom Environment
  drawClassroomBackground(ctx, w, h, isPort, t);

  // Dialogue Beat Timing
  let speaker = '';
  let speechText = '';
  let activeSpeaker = 'none'; // 'teacher' | 'student'
  let teacherExpr = 'normal';
  let studentExpr = 'normal';

  if (t < 2.2) {
    speaker = '👦 ছাত্র:';
    speechText = 'আচ্ছা মিস, একটা প্রশ্ন করি? বলবো?';
    activeSpeaker = 'student';
    studentExpr = 'pointing_question';
  } else if (t < 3.4) {
    speaker = '👩‍🏫 মিস:';
    speechText = 'হুঁ।';
    activeSpeaker = 'teacher';
  } else if (t < 4.6) {
    speaker = '👦 ছাত্র:';
    speechText = 'আপনি কি প্রেম করেন?';
    activeSpeaker = 'student';
    studentExpr = 'pointing_question';
  } else if (t < 5.8) {
    speaker = '👩‍🏫 মিস:';
    speechText = 'কেন?';
    activeSpeaker = 'teacher';
    teacherExpr = 'annoyed';
  } else if (t < 7.5) {
    speaker = '👦 ছাত্র:';
    speechText = 'এমনে বলতেছি, এমনে করেন?';
    activeSpeaker = 'student';
  } else if (t < 8.6) {
    speaker = '👩‍🏫 মিস:';
    speechText = 'না।';
    activeSpeaker = 'teacher';
    teacherExpr = 'annoyed';
  } else if (t < 12.0) {
    speaker = '👦 ছাত্র:';
    speechText = 'আপনার তো এমনে বয়ফ্রেন্ডও থাকবে না, যে রাগি! 😂';
    activeSpeaker = 'student';
    studentExpr = 'giggling_roast';
    teacherExpr = 'annoyed';
  } else if (t < 14.0) {
    speaker = '👦 ছাত্র:';
    speechText = 'কিছু মনে নিয়েন না, এমনে এমনে।';
    activeSpeaker = 'student';
  } else if (t < 16.5) {
    speaker = '👦 ছাত্র:';
    speechText = 'আচ্ছা, আরেকটা কোয়েশ্চেন করি, রাগিয়েন না।';
    activeSpeaker = 'student';
    studentExpr = 'pointing_question';
  } else if (t < 18.8) {
    speaker = '👦 ছাত্র:';
    speechText = 'আপনার বিয়া কখন?';
    activeSpeaker = 'student';
  } else if (t < 20.2) {
    speaker = '👩‍🏫 মিস:';
    speechText = 'কেন?';
    activeSpeaker = 'teacher';
    teacherExpr = 'annoyed';
  } else if (t < 23.2) {
    speaker = '👦 ছাত্র:';
    speechText = 'আপনি বিয়ে করলে কি আমারে দাওয়াত দিবেন?';
    activeSpeaker = 'student';
    studentExpr = 'pointing_question';
  } else if (t < 24.8) {
    speaker = '👩‍🏫 মিস:';
    speechText = 'দাঁড়া! এখন মাইর দিবো! মাইর দিবো! 😡';
    activeSpeaker = 'teacher';
    teacherExpr = 'angry_ruler';
    studentExpr = 'running_scared';
  } else {
    speaker = '👦 ছাত্র:';
    speechText = 'ওরে বাবা! 🏃💨';
    activeSpeaker = 'student';
    teacherExpr = 'angry_ruler';
    studentExpr = 'running_scared';
  }

  // 2. Characters Positions & Layout
  if (!isPort) {
    // ---------------- LANDSCAPE LAYOUT (16:9) ----------------
    const groundY = h * 0.88;
    const tScale = 2.40;
    const sScale = 2.40;

    let tx = w * 0.38;
    let sx = w * 0.68;

    // In chase climax, teacher moves forward and student dashes right!
    if (t >= 23.2) {
      const chaseP = Math.min(1, (t - 23.2) / 3.0);
      tx += chaseP * 120;
      sx += chaseP * 180;
    }

    const ty = groundY - 124 * tScale;
    const sy = groundY - 110 * sScale;

    drawTeacher(ctx, tx, ty, tScale, t, activeSpeaker === 'teacher', teacherExpr);
    drawStudent(ctx, sx, sy, sScale, t, activeSpeaker === 'student', studentExpr);

    // Speech Balloon
    if (activeSpeaker === 'student') {
      drawSpeechBalloon(ctx, w, h, sx, sy - 138 * sScale, speaker, speechText, false, false);
    } else if (activeSpeaker === 'teacher') {
      drawSpeechBalloon(ctx, w, h, tx, ty - 134 * tScale, speaker, speechText, true, false);
    }

  } else {
    // ---------------- PORTRAIT LAYOUT (9:16) ----------------
    const groundY = h * 0.86;
    const tScale = 2.45;
    const sScale = 2.45;

    let tx = w * 0.36;
    let sx = w * 0.72;

    // In chase climax, movement across frame!
    if (t >= 23.2) {
      const chaseP = Math.min(1, (t - 23.2) / 3.0);
      tx += chaseP * 80;
      sx += chaseP * 120;
    }

    const ty = groundY - 124 * tScale;
    const sy = groundY - 110 * sScale;

    drawTeacher(ctx, tx, ty, tScale, t, activeSpeaker === 'teacher', teacherExpr);
    drawStudent(ctx, sx, sy, sScale, t, activeSpeaker === 'student', studentExpr);

    // Speech Balloon in Portrait
    if (activeSpeaker === 'student') {
      drawSpeechBalloon(ctx, w, h, sx, sy - 138 * sScale, speaker, speechText, false, true);
    } else if (activeSpeaker === 'teacher') {
      drawSpeechBalloon(ctx, w, h, tx, ty - 134 * tScale, speaker, speechText, true, true);
    }
  }

  // 3. Bottom Subtitle Banner (Active until Outro)
  if (speaker && speechText && t < 23.5) {
    drawBottomSubtitleBar(ctx, w, h, speaker, speechText);
  }

  // 4. Channel Watermark Badge (DipuToons)
  if (t < 23.5) {
    drawChannelWatermark(ctx, w, h, isPort, t);
  }

  // 5. Grand Outro Card (23.5s - 26.77s)
  if (t >= 23.5) {
    drawOutroCard(ctx, w, h, isPort, t);
  }
}
