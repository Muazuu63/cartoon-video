// ============================================================================
// DipuToons - Premium 2D Cartoon Animation Engine
// Episode: "বিড়ালের চাকরির ইন্টারভিউ" (Cat Job Interview)
// Characters: বারনি বাবু (Boss / HR) & ভোলা (The Cat Candidate)
// Channel: DipuToons (ছোট্ট কার্টুন, বড় হাসি!)
// ============================================================================

const DURATION = CONFIG.duration;
const BEATS = CONFIG.scenes;

// ----------------------------------------------------------------------------
// Asset Preloading (Logo Image)
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
// Office Background & Environment
// ----------------------------------------------------------------------------
function drawOfficeBackground(ctx, w, h, isPort, t) {
  // 1. Soft corporate wall gradient
  const wallGrad = ctx.createLinearGradient(0, 0, 0, h * 0.75);
  wallGrad.addColorStop(0, '#e1edf2');
  wallGrad.addColorStop(0.6, '#edf4f7');
  wallGrad.addColorStop(1, '#d5e2e8');
  ctx.fillStyle = wallGrad;
  ctx.fillRect(0, 0, w, h);

  // 2. Stylish Office Window with Daylight & distant cityscape
  const winX = isPort ? w * 0.06 : w * 0.05;
  const winY = isPort ? h * 0.08 : h * 0.07;
  const winW = isPort ? w * 0.40 : w * 0.28;
  const winH = isPort ? h * 0.28 : h * 0.40;

  // Window frame shadow & glass
  drawRoundRect(ctx, winX - 8, winY - 8, winW + 16, winH + 16, 12, '#37474f', null);
  drawRoundRect(ctx, winX, winY, winW, winH, 8, '#b3e5fc', '#546e7a', 4);

  // Distant buildings
  ctx.save();
  ctx.beginPath();
  ctx.rect(winX, winY, winW, winH);
  ctx.clip();
  ctx.fillStyle = '#81d4fa';
  ctx.fillRect(winX, winY, winW, winH);
  // Sun
  drawCircle(ctx, winX + winW * 0.8, winY + winH * 0.28, winW * 0.16, '#fff9c4', null);
  // City towers
  const towers = [
    { x: 0.08, w: 0.22, h: 0.52, c: '#90caf9' },
    { x: 0.35, w: 0.26, h: 0.72, c: '#64b5f6' },
    { x: 0.66, w: 0.25, h: 0.46, c: '#90caf9' }
  ];
  for (const b of towers) {
    const bx = winX + winW * b.x;
    const bh = winH * b.h;
    const by = winY + winH - bh;
    const bw = winW * b.w;
    ctx.fillStyle = b.c;
    ctx.fillRect(bx, by, bw, bh);
    ctx.fillStyle = '#ffffffaa';
    for (let r = by + 10; r < winY + winH - 10; r += 16) {
      for (let c = bx + 6; c < bx + bw - 6; c += 10) {
        ctx.fillRect(c, r, 5, 8);
      }
    }
  }
  // Window panes cross bars
  ctx.strokeStyle = '#455a64';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(winX + winW / 2, winY);
  ctx.lineTo(winX + winW / 2, winY + winH);
  ctx.moveTo(winX, winY + winH * 0.45);
  ctx.lineTo(winX + winW, winY + winH * 0.45);
  ctx.stroke();
  ctx.restore();

  // 3. Office Bookshelf & Document Binders (Right side)
  const shelfX = isPort ? w * 0.64 : w * 0.79;
  const shelfY = isPort ? h * 0.08 : h * 0.08;
  const shelfW = isPort ? w * 0.30 : w * 0.18;
  const shelfH = isPort ? h * 0.32 : h * 0.46;

  drawRoundRect(ctx, shelfX, shelfY, shelfW, shelfH, 8, '#4e342e', '#271206', 4);
  const shelfRows = 3;
  const rowH = shelfH / shelfRows;
  for (let i = 0; i < shelfRows; i++) {
    const sy = shelfY + i * rowH;
    ctx.fillStyle = '#6d4c41';
    ctx.fillRect(shelfX + 4, sy + rowH - 10, shelfW - 8, 10);
    const colors = ['#e53935', '#1e88e5', '#43a047', '#fbc02d', '#8e24aa', '#fb8c00', '#00acc1'];
    let bx = shelfX + 10;
    let bIdx = 0;
    while (bx < shelfX + shelfW - 18) {
      const bw = 10 + ((i + bIdx) % 3) * 4;
      const bh = rowH - 20 - ((bIdx * 3) % 8);
      const col = colors[(i * 3 + bIdx) % colors.length];
      drawRoundRect(ctx, bx, sy + rowH - 10 - bh, bw, bh, 3, col, '#1a1a1a', 1.5);
      ctx.fillStyle = '#ffffffcc';
      ctx.fillRect(bx + 2, sy + rowH - 10 - bh + 8, bw - 4, 10);
      bx += bw + 4;
      bIdx++;
    }
  }

  // 4. Floor (Warm wooden polished floor)
  const floorY = isPort ? h * 0.60 : h * 0.66;
  const floorGrad = ctx.createLinearGradient(0, floorY, 0, h);
  floorGrad.addColorStop(0, '#5d4037');
  floorGrad.addColorStop(0.4, '#4e342e');
  floorGrad.addColorStop(1, '#3e2723');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, floorY, w, h - floorY);

  ctx.strokeStyle = '#27140655';
  ctx.lineWidth = 3;
  for (let y = floorY + 30; y < h; y += 45) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  ctx.fillStyle = '#2d1b10';
  ctx.fillRect(0, floorY - 14, w, 14);
}

// ----------------------------------------------------------------------------
// Big Executive Office Desk & Accessories
// (Monitor moved to far left so Boss is completely unobstructed!)
// ----------------------------------------------------------------------------
function drawExecutiveDesk(ctx, deskX, deskY, deskW, deskH, isPort, t) {
  // Shadow under desk
  ctx.fillStyle = '#00000055';
  ctx.beginPath();
  ctx.ellipse(deskX + deskW / 2, deskY + deskH + 20, deskW * 0.52, 28, 0, 0, Math.PI * 2);
  ctx.fill();

  // Desk top surface (3D perspective slab)
  const topGrad = ctx.createLinearGradient(deskX, deskY, deskX, deskY + deskH * 0.35);
  topGrad.addColorStop(0, '#a1653d');
  topGrad.addColorStop(1, '#794625');
  drawRoundRect(ctx, deskX - 20, deskY, deskW + 40, deskH * 0.38, 16, topGrad, '#3e1e0a', 4);

  // Desk front panel
  const frontGrad = ctx.createLinearGradient(deskX, deskY + deskH * 0.35, deskX, deskY + deskH);
  frontGrad.addColorStop(0, '#6d3c19');
  frontGrad.addColorStop(1, '#4a240c');
  drawRoundRect(ctx, deskX, deskY + deskH * 0.35, deskW, deskH * 0.65, 8, frontGrad, '#301505', 4);

  // Decorative inner panels on desk front
  const panelW = deskW * 0.24;
  for (let i = 0; i < 3; i++) {
    const px = deskX + deskW * 0.08 + i * (panelW + deskW * 0.06);
    const py = deskY + deskH * 0.44;
    drawRoundRect(ctx, px, py, panelW, deskH * 0.48, 6, '#5a2f12', '#2c1204', 2.5);
  }

  // Desk Accessories on Top:
  // 1. Sleek Computer Monitor (Placed at the far left edge of the desk!)
  const monX = deskX + 8;
  const monY = deskY - deskH * 0.48;
  const monW = deskW * 0.18;
  const monH = deskH * 0.46;
  // Stand
  drawRoundRect(ctx, monX + monW * 0.42, monY + monH, monW * 0.16, deskH * 0.22, 3, '#78909c', '#37474f', 2);
  drawRoundRect(ctx, monX + monW * 0.25, monY + monH + deskH * 0.18, monW * 0.5, 8, 4, '#455a64', '#263238', 2);
  // Screen
  drawRoundRect(ctx, monX, monY, monW, monH, 8, '#212121', '#000000', 3);
  drawRoundRect(ctx, monX + 5, monY + 5, monW - 10, monH - 10, 4, '#1565c0', null);
  // Graphs on screen
  ctx.fillStyle = '#42a5f5';
  ctx.fillRect(monX + 12, monY + monH - 20, monW * 0.18, 12);
  ctx.fillStyle = '#66bb6a';
  ctx.fillRect(monX + 12 + monW * 0.24, monY + monH - 30, monW * 0.18, 22);
  ctx.fillStyle = '#ffa726';
  ctx.fillRect(monX + 12 + monW * 0.48, monY + monH - 38, monW * 0.18, 30);

  // 2. Acrylic Nameplate: "বারনি বালাবাবু (HR Boss)"
  const plateX = deskX + deskW * 0.32;
  const plateY = deskY + deskH * 0.08;
  const plateW = deskW * 0.28;
  const plateH = deskH * 0.24;
  drawRoundRect(ctx, plateX, plateY, plateW, plateH, 5, '#fff8e1', '#b78103', 3);
  ctx.fillStyle = '#b71c1c';
  ctx.font = `bold ${Math.max(14, Math.floor(plateW * 0.1))}px "Noto Sans Bengali", sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText('বারনি বাবু (অফিসার)', plateX + plateW / 2, plateY + plateH * 0.55);
  ctx.font = `bold ${Math.max(11, Math.floor(plateW * 0.07))}px "Noto Sans Bengali", sans-serif`;
  ctx.fillStyle = '#455a64';
  ctx.fillText('DipuToons HR DEPT', plateX + plateW / 2, plateY + plateH * 0.88);

  // 3. Pen Holder with pens
  const penX = deskX + deskW * 0.62;
  const penY = deskY - deskH * 0.10;
  drawRoundRect(ctx, penX, penY, 22, 34, 4, '#37474f', '#212121', 2);
  ctx.strokeStyle = '#e53935'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(penX + 6, penY); ctx.lineTo(penX + 2, penY - 16); ctx.stroke();
  ctx.strokeStyle = '#1e88e5'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(penX + 14, penY); ctx.lineTo(penX + 16, penY - 20); ctx.stroke();
}

// ----------------------------------------------------------------------------
// Glass of Water (Interactive: tilts & falls in Scene 4!)
// ----------------------------------------------------------------------------
function drawWaterGlass(ctx, gx, gy, gw, gh, t) {
  ctx.save();
  ctx.translate(gx, gy);

  let tilt = 0;
  let fallOffY = 0;
  let spilled = false;

  if (t >= 17.2 && t < 18.0) {
    tilt = Math.sin((t - 17.2) * 20) * 0.22;
  } else if (t >= 18.0 && t < 21.0) {
    spilled = true;
    tilt = Math.min(Math.PI / 2, (t - 18.0) * 4.5);
    fallOffY = Math.min(30, (t - 18.0) * 60);
  }

  ctx.rotate(tilt);
  ctx.translate(0, fallOffY);

  // Glass body
  drawRoundRect(ctx, -gw / 2, -gh, gw, gh, 5, '#e0f7fa99', '#80deea', 2.5);

  // Water level inside
  if (!spilled) {
    ctx.fillStyle = '#29b6f6aa';
    ctx.beginPath();
    ctx.roundRect(-gw / 2 + 3, -gh * 0.65, gw - 6, gh * 0.62, 3);
    ctx.fill();
  }

  ctx.restore();

  // Spilled puddle
  if (spilled) {
    ctx.save();
    ctx.fillStyle = '#4fc3f7bb';
    ctx.beginPath();
    ctx.ellipse(gx + 30, gy + 10, 48, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    for (let d = 0; d < 6; d++) {
      const dropX = gx + 40 + Math.cos(d * 1.1) * 35;
      const dropY = gy - 10 + Math.sin(d * 1.1) * 20;
      drawCircle(ctx, dropX, dropY, 4, '#29b6f6', null);
    }
    ctx.restore();
  }
}

// ----------------------------------------------------------------------------
// Character: Officer / HR Boss ("বারনি বাবু")
// ----------------------------------------------------------------------------
function drawBossCharacter(ctx, bx, by, scale, t, isTalking, expression) {
  ctx.save();
  ctx.translate(bx, by);
  ctx.scale(scale, scale);

  const bob = Math.sin(t * 3.5) * 3;
  const talkMouth = isTalking ? Math.abs(Math.sin(t * 14)) : 0;

  // 1. High-Back Executive Leather Chair (Behind Boss)
  if (expression !== 'in_corner') {
    drawRoundRect(ctx, -68, -190 + bob, 136, 215, 24, '#212121', '#111111', 5);
    ctx.strokeStyle = '#424242';
    ctx.lineWidth = 3;
    ctx.strokeRect(-52, -170 + bob, 104, 175);
    // Armrests
    drawRoundRect(ctx, -85, -85 + bob, 22, 90, 8, '#37474f', '#263238', 3);
    drawRoundRect(ctx, 63, -85 + bob, 22, 90, 8, '#37474f', '#263238', 3);
  }

  // 2. Suit Body & Torso
  ctx.fillStyle = '#263238';
  ctx.beginPath();
  ctx.moveTo(-54, -40 + bob);
  ctx.lineTo(-44, -100 + bob);
  ctx.lineTo(44, -100 + bob);
  ctx.lineTo(54, -40 + bob);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#102027'; ctx.lineWidth = 4; ctx.stroke();

  // White Dress Shirt
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(-24, -100 + bob);
  ctx.lineTo(24, -100 + bob);
  ctx.lineTo(0, -35 + bob);
  ctx.closePath();
  ctx.fill();

  // Bright Red Tie
  ctx.fillStyle = '#d32f2f';
  ctx.beginPath();
  ctx.moveTo(-8, -94 + bob);
  ctx.lineTo(8, -94 + bob);
  ctx.lineTo(12, -30 + bob);
  ctx.lineTo(0, -16 + bob);
  ctx.lineTo(-12, -30 + bob);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#b71c1c'; ctx.lineWidth = 2; ctx.stroke();

  // Lapels
  ctx.fillStyle = '#37474f';
  ctx.beginPath();
  ctx.moveTo(-44, -100 + bob); ctx.lineTo(-15, -50 + bob); ctx.lineTo(-25, -48 + bob); ctx.lineTo(-40, -94 + bob); ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(44, -100 + bob); ctx.lineTo(15, -50 + bob); ctx.lineTo(25, -48 + bob); ctx.lineTo(40, -94 + bob); ctx.closePath(); ctx.fill();

  // 3. Hands / Gestures
  if (expression === 'shocked' || expression === 'panicked') {
    // Hands in air in shock!
    ctx.strokeStyle = '#263238'; ctx.lineWidth = 18; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-44, -90 + bob); ctx.lineTo(-78, -145 + bob); ctx.stroke();
    drawCircle(ctx, -78, -152 + bob, 14, '#ffcc80', '#e65100', 3);

    ctx.beginPath(); ctx.moveTo(44, -90 + bob); ctx.lineTo(78, -145 + bob); ctx.stroke();
    drawCircle(ctx, 78, -152 + bob, 14, '#ffcc80', '#e65100', 3);

    // Sweat drops flying off forehead
    ctx.fillStyle = '#29b6f6';
    for (let s = 0; s < 4; s++) {
      const sx = (s % 2 === 0 ? -62 : 62) + Math.sin(t * 12 + s) * 10;
      const sy = -170 + s * 14;
      drawCircle(ctx, sx, sy, 5, '#29b6f6', null);
    }
  } else {
    // Resting arm + Holding yellow clipboard dossier
    ctx.strokeStyle = '#263238'; ctx.lineWidth = 18; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-44, -85 + bob); ctx.lineTo(-24, -45 + bob); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(44, -85 + bob); ctx.lineTo(28, -45 + bob); ctx.stroke();

    const clipX = -20;
    const clipY = -55 + bob;
    drawRoundRect(ctx, clipX, clipY, 60, 48, 5, '#ffa726', '#e65100', 3);
    drawRoundRect(ctx, clipX + 4, clipY + 6, 52, 36, 3, '#ffffff', '#b0bec5', 1.5);
    ctx.fillStyle = '#78909c';
    ctx.fillRect(clipX + 8, clipY + 14, 30, 4);
    ctx.fillRect(clipX + 8, clipY + 22, 44, 4);
    ctx.fillRect(clipX + 8, clipY + 30, 36, 4);
    drawRoundRect(ctx, clipX + 18, clipY - 3, 24, 8, 3, '#90a4ae', '#455a64', 2);
  }

  // 4. Neck & Head
  drawRoundRect(ctx, -14, -112 + bob, 28, 20, 5, '#ffcc80', '#d7ccc8', 2);
  const headY = -146 + bob;
  drawRoundRect(ctx, -38, headY, 76, 74, 24, '#ffcc80', '#e65100', 3);

  // Hair
  ctx.fillStyle = '#212121';
  ctx.beginPath();
  ctx.arc(0, headY + 12, 42, Math.PI, 0);
  ctx.lineTo(42, headY + 28);
  ctx.lineTo(36, headY + 35);
  ctx.lineTo(26, headY + 15);
  ctx.lineTo(-26, headY + 8);
  ctx.lineTo(-42, headY + 32);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#424242'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(-16, headY + 4); ctx.lineTo(16, headY - 4); ctx.stroke();

  // Ears
  drawCircle(ctx, -40, headY + 38, 10, '#ffcc80', '#e65100', 2.5);
  drawCircle(ctx, 40, headY + 38, 10, '#ffcc80', '#e65100', 2.5);

  // Eyebrows
  ctx.strokeStyle = '#212121'; ctx.lineWidth = 4; ctx.lineCap = 'round';
  if (expression === 'shocked' || expression === 'panicked') {
    ctx.beginPath(); ctx.moveTo(-28, headY + 16); ctx.lineTo(-10, headY + 10); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(28, headY + 16); ctx.lineTo(10, headY + 10); ctx.stroke();
  } else if (expression === 'inquisitive') {
    ctx.beginPath(); ctx.moveTo(-28, headY + 14); ctx.lineTo(-10, headY + 20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(28, headY + 10); ctx.lineTo(10, headY + 14); ctx.stroke();
  } else {
    ctx.beginPath(); ctx.moveTo(-28, headY + 20); ctx.lineTo(-10, headY + 18); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(28, headY + 20); ctx.lineTo(10, headY + 18); ctx.stroke();
  }

  // Eyeglasses
  ctx.strokeStyle = '#102027'; ctx.lineWidth = 3.5;
  drawRoundRect(ctx, -32, headY + 26, 26, 20, 5, '#ffffff77', '#102027', 3);
  drawRoundRect(ctx, 6, headY + 26, 26, 20, 5, '#ffffff77', '#102027', 3);
  ctx.beginPath(); ctx.moveTo(-6, headY + 34); ctx.lineTo(6, headY + 34); ctx.stroke();

  // Eyes
  if (expression === 'shocked' || expression === 'panicked') {
    drawCircle(ctx, -19, headY + 36, 6.5, '#ffffff', '#000000', 2);
    drawCircle(ctx, -19, headY + 36, 2.5, '#000000', null);
    drawCircle(ctx, 19, headY + 36, 6.5, '#ffffff', '#000000', 2);
    drawCircle(ctx, 19, headY + 36, 2.5, '#000000', null);
  } else {
    const blink = (t % 4.2 < 0.15);
    if (blink) {
      ctx.strokeStyle = '#212121'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(-25, headY + 36); ctx.lineTo(-13, headY + 36); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(13, headY + 36); ctx.lineTo(25, headY + 36); ctx.stroke();
    } else {
      drawCircle(ctx, -19, headY + 36, 4.5, '#212121', null);
      drawCircle(ctx, 19, headY + 36, 4.5, '#212121', null);
      drawCircle(ctx, -20.5, headY + 34.5, 1.8, '#ffffff', null);
      drawCircle(ctx, 17.5, headY + 34.5, 1.8, '#ffffff', null);
    }
  }

  // Nose
  ctx.strokeStyle = '#d7ccc8'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(0, headY + 44); ctx.lineTo(-4, headY + 54); ctx.lineTo(2, headY + 54); ctx.stroke();

  // Mouth
  if (expression === 'shocked' || expression === 'panicked') {
    drawEllipse(ctx, 0, headY + 64, 11, 15, '#b71c1c', '#212121', 2.5);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-6, headY + 53, 12, 4);
  } else if (isTalking) {
    const mh = 5 + talkMouth * 12;
    drawEllipse(ctx, 0, headY + 62, 8, mh, '#b71c1c', '#212121', 2);
    ctx.fillStyle = '#ff8a80';
    drawCircle(ctx, 0, headY + 62 + mh * 0.4, 4, '#ff8a80', null);
  } else {
    ctx.strokeStyle = '#b71c1c'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(0, headY + 58, 8, 0.2, Math.PI - 0.2); ctx.stroke();
  }

  ctx.restore();
}

// ----------------------------------------------------------------------------
// Character: Bhola the Cat Candidate ("ভোলা")
// Matches DipuToons Logo: Cute Chubby Orange Tabby Cat
// ----------------------------------------------------------------------------
function drawBholaCat(ctx, cx, cy, scale, t, isTalking, action) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  const bob = Math.sin(t * 4.0) * 4;
  const tailWag = Math.sin(t * 3.5) * 0.25;
  const talkMouth = isTalking ? Math.abs(Math.sin(t * 16)) : 0;

  // 1. Swivel Chair for Cat (Candidate side)
  if (action !== 'takeover_boss_desk') {
    drawRoundRect(ctx, -55, -90 + bob, 110, 130, 18, '#37474f', '#212121', 4);
    drawRoundRect(ctx, -68, -40 + bob, 16, 60, 6, '#263238', '#111111', 2);
    drawRoundRect(ctx, 52, -40 + bob, 16, 60, 6, '#263238', '#111111', 2);
    ctx.fillStyle = '#78909c';
    ctx.fillRect(-8, 30 + bob, 16, 45);
    ctx.strokeStyle = '#455a64'; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(-45, 75 + bob); ctx.lineTo(45, 75 + bob); ctx.stroke();
    drawCircle(ctx, -45, 80 + bob, 6, '#212121', null);
    drawCircle(ctx, 45, 80 + bob, 6, '#212121', null);
  }

  // 2. Cat Tail (Gracefully curling up on the right side)
  ctx.save();
  ctx.translate(42, 10 + bob);
  ctx.rotate(0.2 + tailWag);
  ctx.strokeStyle = '#ef6c00'; ctx.lineWidth = 18; ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(45, -35, 30, -85);
  ctx.quadraticCurveTo(15, -115, 28, -135);
  ctx.stroke();
  // Tabby stripes on tail
  ctx.strokeStyle = '#d84315'; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(22, -30); ctx.lineTo(34, -36); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(32, -65); ctx.lineTo(44, -70); ctx.stroke();
  // White tip of tail
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 16;
  ctx.beginPath(); ctx.moveTo(22, -120); ctx.lineTo(28, -135); ctx.stroke();
  ctx.restore();

  // 3. Cat Chubby Body
  drawRoundRect(ctx, -46, -70 + bob, 92, 105, 36, '#ff9800', '#e65100', 4);
  drawRoundRect(ctx, -26, -55 + bob, 52, 85, 24, '#ffffff', '#ffe0b2', 2.5);

  // 4. Professional Attire: White Collar, Blue Tie & ID Badge!
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(-28, -62 + bob);
  ctx.lineTo(-8, -44 + bob);
  ctx.lineTo(0, -55 + bob);
  ctx.lineTo(8, -44 + bob);
  ctx.lineTo(28, -62 + bob);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#cfd8dc'; ctx.lineWidth = 2.5; ctx.stroke();

  // Royal Blue Necktie with Gold Stripes
  ctx.fillStyle = '#1565c0';
  ctx.beginPath();
  ctx.moveTo(-8, -46 + bob);
  ctx.lineTo(8, -46 + bob);
  ctx.lineTo(12, 0 + bob);
  ctx.lineTo(0, 12 + bob);
  ctx.lineTo(-12, 0 + bob);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#0d47a1'; ctx.lineWidth = 2; ctx.stroke();
  ctx.strokeStyle = '#ffeb3b'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(-6, -34 + bob); ctx.lineTo(6, -26 + bob); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-8, -18 + bob); ctx.lineTo(8, -10 + bob); ctx.stroke();

  // ID Lanyard & Badge ("ভোলা")
  ctx.strokeStyle = '#0288d1'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(-20, -55 + bob); ctx.lineTo(-14, -10 + bob); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(20, -55 + bob); ctx.lineTo(-14, -10 + bob); ctx.stroke();

  const idX = -26;
  const idY = -12 + bob;
  drawRoundRect(ctx, idX, idY, 24, 32, 3, '#ffffff', '#0288d1', 2);
  drawCircle(ctx, idX + 12, idY + 11, 6, '#ff9800', null);
  ctx.fillStyle = '#1565c0';
  ctx.fillRect(idX + 4, idY + 22, 16, 4);

  // 5. Cat Paws & Gestures
  if (action === 'cool_stress_free') {
    // Paws behind head in relaxed posture!
    drawCircle(ctx, -48, -110 + bob, 14, '#ffffff', '#ff9800', 3);
    drawCircle(ctx, 48, -110 + bob, 14, '#ffffff', '#ff9800', 3);
  } else if (action === 'nudge_glass') {
    // Left paw reaching towards desk glass!
    ctx.strokeStyle = '#ff9800'; ctx.lineWidth = 16; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-25, -35 + bob); ctx.lineTo(-70 + Math.sin(t * 8) * 8, -25 + bob); ctx.stroke();
    drawCircle(ctx, -75 + Math.sin(t * 8) * 8, -25 + bob, 13, '#ffffff', '#e65100', 3);
    drawCircle(ctx, -75 + Math.sin(t * 8) * 8, -25 + bob, 5, '#f48fb1', null);
    // Right paw resting
    drawCircle(ctx, 28, 5 + bob, 13, '#ffffff', '#ff9800', 3);
  } else if (action === 'point_to_corner' || action === 'vacate_chair') {
    // Authoritatively pointing with paw to corner!
    ctx.strokeStyle = '#ff9800'; ctx.lineWidth = 16; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-20, -35 + bob); ctx.lineTo(-70, -55 + bob); ctx.stroke();
    drawCircle(ctx, -76, -58 + bob, 13, '#ffffff', '#e65100', 3);
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(-76, -58 + bob); ctx.lineTo(-94, -68 + bob); ctx.stroke();
    drawCircle(ctx, 28, 5 + bob, 13, '#ffffff', '#ff9800', 3);
  } else {
    // Cute fluffy resting kitten paws with pink toe pads!
    drawCircle(ctx, -28, 6 + bob, 13, '#ffffff', '#ff9800', 3);
    drawCircle(ctx, -28, 6 + bob, 4.5, '#f48fb1', null);
    drawCircle(ctx, 28, 6 + bob, 13, '#ffffff', '#ff9800', 3);
    drawCircle(ctx, 28, 6 + bob, 4.5, '#f48fb1', null);
  }

  // 6. Cat Head
  const headY = -120 + bob;

  // Ears
  ctx.fillStyle = '#ef6c00';
  ctx.beginPath(); ctx.moveTo(-45, headY - 10); ctx.lineTo(-58, headY - 60); ctx.lineTo(-20, headY - 35); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#d84315'; ctx.lineWidth = 3.5; ctx.stroke();
  ctx.fillStyle = '#ff80ab';
  ctx.beginPath(); ctx.moveTo(-42, headY - 15); ctx.lineTo(-52, headY - 50); ctx.lineTo(-24, headY - 32); ctx.closePath(); ctx.fill();

  ctx.fillStyle = '#ef6c00';
  ctx.beginPath(); ctx.moveTo(45, headY - 10); ctx.lineTo(58, headY - 60); ctx.lineTo(20, headY - 35); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#d84315'; ctx.lineWidth = 3.5; ctx.stroke();
  ctx.fillStyle = '#ff80ab';
  ctx.beginPath(); ctx.moveTo(42, headY - 15); ctx.lineTo(52, headY - 50); ctx.lineTo(24, headY - 32); ctx.closePath(); ctx.fill();

  // Head base (Chubby round cheeks)
  drawCircle(ctx, 0, headY, 52, '#ffa726', '#e65100', 4);
  ctx.fillStyle = '#ffa726';
  ctx.beginPath(); ctx.moveTo(-48, headY + 5); ctx.lineTo(-65, headY + 18); ctx.lineTo(-46, headY + 28); ctx.fill();
  ctx.beginPath(); ctx.moveTo(48, headY + 5); ctx.lineTo(65, headY + 18); ctx.lineTo(46, headY + 28); ctx.fill();

  // Forehead Tabby Stripes
  ctx.fillStyle = '#e65100';
  ctx.beginPath(); ctx.moveTo(-8, headY - 45); ctx.lineTo(0, headY - 26); ctx.lineTo(8, headY - 45); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-22, headY - 38); ctx.lineTo(-14, headY - 22); ctx.lineTo(-10, headY - 36); ctx.fill();
  ctx.beginPath(); ctx.moveTo(22, headY - 38); ctx.lineTo(14, headY - 22); ctx.lineTo(10, headY - 36); ctx.fill();

  // White Muzzle & Cheeks
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(-14, headY + 18, 18, 14, 0, 0, Math.PI * 2);
  ctx.ellipse(14, headY + 18, 18, 14, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#ffe0b2'; ctx.lineWidth = 1.5; ctx.stroke();

  // Pink Triangular Nose
  ctx.fillStyle = '#f06292';
  ctx.beginPath(); ctx.moveTo(-7, headY + 10); ctx.lineTo(7, headY + 10); ctx.lineTo(0, headY + 18); ctx.closePath(); ctx.fill();

  // Whiskers
  const whiskerWobble = Math.sin(t * 8) * 2;
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-24, headY + 14); ctx.lineTo(-72, headY + 8 + whiskerWobble); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-24, headY + 20); ctx.lineTo(-74, headY + 22); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-24, headY + 26); ctx.lineTo(-68, headY + 34 - whiskerWobble); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(24, headY + 14); ctx.lineTo(72, headY + 8 - whiskerWobble); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(24, headY + 20); ctx.lineTo(74, headY + 22); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(24, headY + 26); ctx.lineTo(68, headY + 34 + whiskerWobble); ctx.stroke();

  // 7. Eyes or Cool Sunglasses
  if (action === 'cool_stress_free' || action === 'takeover_boss_desk') {
    drawRoundRect(ctx, -46, headY - 14, 42, 28, 8, '#212121', '#000000', 3);
    drawRoundRect(ctx, 4, headY - 14, 42, 28, 8, '#212121', '#000000', 3);
    ctx.strokeStyle = '#424242'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(-4, headY - 4); ctx.lineTo(4, headY - 4); ctx.stroke();
    ctx.strokeStyle = '#90caf9'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(-38, headY + 8); ctx.lineTo(-24, headY - 8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(12, headY + 8); ctx.lineTo(26, headY - 8); ctx.stroke();
  } else {
    const blink = (t % 3.6 < 0.18);
    if (blink) {
      ctx.strokeStyle = '#d84315'; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(-22, headY - 4, 12, 0.2, Math.PI - 0.2); ctx.stroke();
      ctx.beginPath(); ctx.arc(22, headY - 4, 12, 0.2, Math.PI - 0.2); ctx.stroke();
    } else {
      drawEllipse(ctx, -22, headY - 4, 15, 18, '#ffffff', '#e65100', 2.5);
      drawEllipse(ctx, 22, headY - 4, 15, 18, '#ffffff', '#e65100', 2.5);
      drawEllipse(ctx, -20, headY - 3, 11, 14, '#2e7d32', null);
      drawEllipse(ctx, 24, headY - 3, 11, 14, '#2e7d32', null);
      drawEllipse(ctx, -19, headY - 3, 7, 10, '#111111', null);
      drawEllipse(ctx, 25, headY - 3, 7, 10, '#111111', null);
      drawCircle(ctx, -22, headY - 7, 4, '#ffffff', null);
      drawCircle(ctx, 22, headY - 7, 4, '#ffffff', null);
      drawCircle(ctx, -17, headY + 2, 2, '#ffffff', null);
      drawCircle(ctx, 27, headY + 2, 2, '#ffffff', null);
    }
  }

  // 8. Cat Mouth
  if (isTalking) {
    const mh = 6 + talkMouth * 14;
    drawEllipse(ctx, 0, headY + 26, 10, mh, '#b71c1c', '#d84315', 2.5);
    ctx.fillStyle = '#ff80ab';
    drawCircle(ctx, 0, headY + 26 + mh * 0.4, 5, '#ff80ab', null);
    // Kitty fangs
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.moveTo(-6, headY + 26 - mh * 0.4); ctx.lineTo(-4, headY + 26); ctx.lineTo(-2, headY + 26 - mh * 0.4); ctx.fill();
    ctx.beginPath(); ctx.moveTo(2, headY + 26 - mh * 0.4); ctx.lineTo(4, headY + 26); ctx.lineTo(6, headY + 26 - mh * 0.4); ctx.fill();
  } else {
    ctx.strokeStyle = '#d84315'; ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-10, headY + 22);
    ctx.quadraticCurveTo(-5, headY + 28, 0, headY + 21);
    ctx.quadraticCurveTo(5, headY + 28, 10, headY + 22);
    ctx.stroke();
  }

  ctx.restore();
}

// ----------------------------------------------------------------------------
// Thought Bubbles & Fantasy Effects (Scenes 2, 3, 5)
// ----------------------------------------------------------------------------
function drawFantasyBubble(ctx, bx, by, bw, bh, t, kind) {
  ctx.save();

  // Cloud dots connecting to character
  drawCircle(ctx, bx - bw * 0.35, by + bh * 0.65, 8, '#ffffff', '#90caf9', 2);
  drawCircle(ctx, bx - bw * 0.22, by + bh * 0.52, 14, '#ffffff', '#90caf9', 2);
  drawCircle(ctx, bx - bw * 0.1, by + bh * 0.4, 20, '#ffffff', '#90caf9', 2);

  // Big cloud bubble
  drawRoundRect(ctx, bx, by, bw, bh, 24, '#ffffff', '#42a5f5', 4);

  if (kind === 'sleep_and_fridge') {
    // Refrigerator
    const rx = bx + 22;
    const ry = by + 18;
    const rw = bw * 0.35;
    const rh = bh - 48;
    drawRoundRect(ctx, rx, ry, rw, rh, 8, '#cfd8dc', '#37474f', 3);
    drawRoundRect(ctx, rx + 4, ry + 4, rw - 8, rh * 0.38, 4, '#e0f7fa', '#455a64', 2);
    drawRoundRect(ctx, rx + 4, ry + rh * 0.42, rw - 8, rh * 0.54, 4, '#e0f7fa', '#455a64', 2);
    ctx.fillStyle = '#263238';
    ctx.fillRect(rx + rw - 12, ry + 15, 5, 20);
    ctx.fillRect(rx + rw - 12, ry + rh * 0.48, 5, 24);

    // Sleeping Cat on Cushion with Zzz
    const cx = bx + bw * 0.70;
    const cy = by + bh * 0.55;
    drawEllipse(ctx, cx, cy, 42, 20, '#ff9800', '#e65100', 3);
    drawCircle(ctx, cx - 22, cy - 8, 18, '#ffa726', '#e65100', 3);
    ctx.fillStyle = '#1e88e5';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('Z', cx + 15, cy - 20 - Math.sin(t * 5) * 5);
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText('Z', cx + 32, cy - 40 - Math.sin(t * 5) * 5);

    ctx.font = 'bold 18px "Noto Sans Bengali", sans-serif';
    ctx.fillStyle = '#0d47a1';
    ctx.textAlign = 'center';
    ctx.fillText('সারাদিন ঘুম ও ফ্রিজ পাহারা! 🐟💤', bx + bw / 2, by + bh - 12);
  } else if (kind === 'hilsa_salary') {
    const fx = bx + bw * 0.5;
    const fy = by + bh * 0.40;

    ctx.save();
    ctx.translate(fx, fy);
    const fishGrad = ctx.createLinearGradient(-70, 0, 70, 0);
    fishGrad.addColorStop(0, '#e0e0e0');
    fishGrad.addColorStop(0.5, '#ffffff');
    fishGrad.addColorStop(1, '#b0bec5');

    ctx.fillStyle = fishGrad;
    ctx.beginPath();
    ctx.moveTo(-75, 0);
    ctx.quadraticCurveTo(-30, -32, 50, -8);
    ctx.lineTo(82, -26);
    ctx.lineTo(70, 0);
    ctx.lineTo(82, 26);
    ctx.lineTo(50, 8);
    ctx.quadraticCurveTo(-30, 32, -75, 0);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#78909c'; ctx.lineWidth = 3; ctx.stroke();

    ctx.strokeStyle = '#d32f2f'; ctx.lineWidth = 3.5;
    ctx.beginPath(); ctx.arc(-42, 0, 14, -1.2, 1.2); ctx.stroke();
    drawCircle(ctx, -56, -6, 5, '#ffffff', '#212121', 2);
    drawCircle(ctx, -56, -6, 2.5, '#000000', null);

    ctx.strokeStyle = '#cfd8dc'; ctx.lineWidth = 2;
    for (let s = -20; s <= 30; s += 16) {
      ctx.beginPath(); ctx.arc(s, 0, 8, -Math.PI / 2, Math.PI / 2); ctx.stroke();
    }
    ctx.restore();

    // Bowl of Fresh Milk
    const mx = bx + bw * 0.22;
    const my = by + bh * 0.68;
    drawEllipse(ctx, mx, my, 35, 14, '#ffffff', '#37474f', 3);
    drawEllipse(ctx, mx, my - 4, 30, 10, '#e1f5fe', '#0288d1', 2);

    ctx.font = 'bold 22px "Noto Sans Bengali", sans-serif';
    ctx.fillStyle = '#b71c1c';
    ctx.textAlign = 'center';
    ctx.fillText('৩০ কেজি ইলিশ ও দুবেলা দুধ! 🐟🥛', bx + bw / 2, by + bh - 14);
  }

  ctx.restore();
}

// ----------------------------------------------------------------------------
// Official Channel Watermark & Outro Card
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

// Grand Outro Screen (47.0s - 49.64s)
function drawOutroCard(ctx, w, h, isPort, t) {
  const p = Math.max(0, Math.min(1, (t - 47.0) / 0.8));
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
// ----------------------------------------------------------------------------
function drawSpeechBalloon(ctx, x, y, speaker, text, pointLeft) {
  ctx.save();
  ctx.font = 'bold 24px "Noto Sans Bengali", sans-serif';
  const tm = ctx.measureText(text);
  const bw = Math.max(220, tm.width + 48);
  const bh = 70;
  const bx = pointLeft ? x : x - bw;
  const by = y - bh - 24;

  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  drawRoundRect(ctx, bx + 4, by + 4, bw, bh, 18, 'rgba(0,0,0,0.25)', null);
  drawRoundRect(ctx, bx, by, bw, bh, 18, '#ffffff', '#263238', 3.5);

  // Pointer Tail
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  if (pointLeft) {
    ctx.moveTo(bx + 30, by + bh);
    ctx.lineTo(bx + 10, by + bh + 22);
    ctx.lineTo(bx + 48, by + bh);
  } else {
    ctx.moveTo(bx + bw - 30, by + bh);
    ctx.lineTo(bx + bw - 10, by + bh + 22);
    ctx.lineTo(bx + bw - 48, by + bh);
  }
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#263238'; ctx.lineWidth = 3.5; ctx.stroke();

  // Speaker Badge
  const isBoss = speaker.includes('বারনি');
  const badgeBg = isBoss ? '#c62828' : '#e65100';
  drawRoundRect(ctx, bx + 16, by - 16, 175, 28, 8, badgeBg, '#ffffff', 2);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 15px "Noto Sans Bengali", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(speaker, bx + 24, by + 3);

  // Dialogue Text
  ctx.fillStyle = '#102027';
  ctx.font = 'bold 23px "Noto Sans Bengali", sans-serif';
  ctx.fillText(text, bx + 24, by + 46);

  ctx.restore();
}

function drawBottomSubtitleBar(ctx, w, h, speaker, text) {
  const isPort = h > w;
  const barH = isPort ? 130 : 90;
  const barY = h - barH - 24;
  const barW = isPort ? w - 48 : w * 0.84;
  const barX = (w - barW) / 2;

  drawRoundRect(ctx, barX, barY, barW, barH, 20, 'rgba(15, 23, 42, 0.90)', '#ffd54f', 3);

  const isBoss = speaker.includes('বারনি');
  const badgeCol = isBoss ? '#c62828' : '#ef6c00';
  const badgeW = isPort ? 210 : 230;
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
// MAIN FRAME RENDERER (Called for every frame t: 0 -> 49.64)
// ----------------------------------------------------------------------------
function frame(ctx, w, h, t) {
  ctx.clearRect(0, 0, w, h);
  const isPort = h > w;

  // 1. Draw Office Environment
  drawOfficeBackground(ctx, w, h, isPort, t);

  // Determine Active Dialogue Beat & Characters State
  let speaker = '';
  let speechText = '';
  let activeSpeaker = 'none'; // 'boss' | 'cat'
  let sceneAction = 'normal';
  let bossExpr = 'normal';
  let catAction = 'normal';

  if (t < 2.0) {
    speaker = '👔 বারনি বাবু (অফিসার)';
    speechText = 'নাম?';
    activeSpeaker = 'boss';
  } else if (t < 3.2) {
    speaker = '🐱 ভোলা (প্রার্থী)';
    speechText = 'ভোলা।';
    activeSpeaker = 'cat';
  } else if (t < 4.1) {
    speaker = '👔 বারনি বাবু (অফিসার)';
    speechText = 'ডাকনাম?';
    activeSpeaker = 'boss';
    bossExpr = 'inquisitive';
  } else if (t < 5.0) {
    speaker = '🐱 ভোলা (প্রার্থী)';
    speechText = 'মিউ মিউ।';
    activeSpeaker = 'cat';
  } else if (t < 7.0) {
    speaker = '👔 বারনি বাবু (অফিসার)';
    speechText = 'আগের অফিসে কী কাজ করতেন?';
    activeSpeaker = 'boss';
    bossExpr = 'inquisitive';
  } else if (t < 10.5) {
    speaker = '🐱 ভোলা (প্রার্থী)';
    speechText = 'সারাদিন ঘুমাতাম, ফ্রিজ পাহারা দিতাম!';
    activeSpeaker = 'cat';
    sceneAction = 'sleep_fridge';
  } else if (t < 12.5) {
    speaker = '👔 বারনি বাবু (অফিসার)';
    speechText = 'আপনার সবচেয়ে বড় গুণ কী?';
    activeSpeaker = 'boss';
    bossExpr = 'inquisitive';
  } else if (t < 15.0) {
    speaker = '🐱 ভোলা (প্রার্থী)';
    speechText = 'কাজ না করেও কোনো চাপ নিই না!';
    activeSpeaker = 'cat';
    catAction = 'cool_stress_free';
  } else if (t < 17.0) {
    speaker = '👔 বারনি বাবু (অফিসার)';
    speechText = 'আপনার দুর্বলতা কী?';
    activeSpeaker = 'boss';
    bossExpr = 'inquisitive';
  } else if (t < 21.0) {
    speaker = '🐱 ভোলা (প্রার্থী)';
    speechText = 'টেবিলে গ্লাস দেখলে ফেলে দিতে ইচ্ছে করে!';
    activeSpeaker = 'cat';
    catAction = 'nudge_glass';
    if (t >= 18.0) bossExpr = 'shocked';
  } else if (t < 23.5) {
    speaker = '👔 বারনি বাবু (অফিসার)';
    speechText = 'বেতন কত চান?';
    activeSpeaker = 'boss';
  } else if (t < 28.5) {
    speaker = '🐱 ভোলা (প্রার্থী)';
    speechText = '৩০ কেজি ইলিশ, আর দুবেলা দুধ!';
    activeSpeaker = 'cat';
    sceneAction = 'hilsa_salary';
  } else if (t < 34.0) {
    speaker = '👔 বারনি বাবু (অফিসার)';
    speechText = 'ঠিক আছে, আপনাকে চাকরিতে নিলাম!';
    activeSpeaker = 'boss';
  } else if (t < 38.0) {
    speaker = '🐱 ভোলা (প্রার্থী)';
    speechText = 'আগে আপনার চেয়ারটা ছাড়ুন!';
    activeSpeaker = 'cat';
    catAction = 'vacate_chair';
    bossExpr = 'shocked';
  } else if (t < 40.0) {
    speaker = '👔 বারনি বাবু (অফিসার)';
    speechText = 'কী?!';
    activeSpeaker = 'boss';
    bossExpr = 'shocked';
  } else if (t < 43.5) {
    speaker = '👔 বারনি বাবু (অফিসার)';
    speechText = 'তাহলে আমি কোথায় বসব?!';
    activeSpeaker = 'boss';
    bossExpr = 'panicked';
  } else if (t < 47.0) {
    speaker = '🐱 ভোলা (নতুন বস)';
    speechText = 'ওই কোণে যান!';
    activeSpeaker = 'cat';
    catAction = 'point_to_corner';
    sceneAction = 'boss_in_corner';
  }

  // 2. Desk & Characters Layout
  if (!isPort) {
    // ---------------- LANDSCAPE LAYOUT (16:9) ----------------
    const deskW = w * 0.48;
    const deskH = h * 0.28;
    const deskX = w * 0.26;
    const deskY = h * 0.60;

    if (sceneAction === 'boss_in_corner') {
      // Climax Twist: Boss sent to the corner on a tiny stool!
      const cornerX = w * 0.12;
      const cornerY = h * 0.74;
      drawRoundRect(ctx, cornerX - 25, cornerY - 10, 50, 14, 4, '#8d6e63', '#4e342e', 2);
      ctx.fillStyle = '#5d4037';
      ctx.fillRect(cornerX - 20, cornerY + 4, 8, 35);
      ctx.fillRect(cornerX + 12, cornerY + 4, 8, 35);
      drawBossCharacter(ctx, cornerX, cornerY - 10, 0.95, t, false, 'panicked');

      // Desk
      drawExecutiveDesk(ctx, deskX, deskY, deskW, deskH, isPort, t);

      // Bhola sitting behind the desk in the big Boss chair wearing sunglasses!
      drawBholaCat(ctx, deskX + deskW * 0.52, deskY - 30, 1.45, t, activeSpeaker === 'cat', 'takeover_boss_desk');
    } else {
      // Normal Interview Setup
      // Boss behind the desk (Elevated and clear)
      const bossX = w * 0.42;
      const bossY = deskY - 45;
      drawBossCharacter(ctx, bossX, bossY, 1.35, t, activeSpeaker === 'boss', bossExpr);

      // Desk in front
      drawExecutiveDesk(ctx, deskX, deskY, deskW, deskH, isPort, t);

      // Glass of water on desk
      const gx = deskX + deskW * 0.80;
      const gy = deskY + deskH * 0.14;
      drawWaterGlass(ctx, gx, gy, 28, 44, t);

      // Bhola the Cat Candidate on Right in his rolling chair
      const catX = w * 0.78;
      const catY = deskY + deskH * 0.38;
      drawBholaCat(ctx, catX, catY, 1.35, t, activeSpeaker === 'cat', catAction);
    }

    // Fantasy Thought Bubbles
    if (sceneAction === 'sleep_fridge') {
      drawFantasyBubble(ctx, w * 0.40, h * 0.08, 390, 210, t, 'sleep_and_fridge');
    } else if (sceneAction === 'hilsa_salary') {
      drawFantasyBubble(ctx, w * 0.40, h * 0.08, 400, 210, t, 'hilsa_salary');
    }

    // Speech Balloon above talking character
    if (activeSpeaker === 'boss') {
      drawSpeechBalloon(ctx, w * 0.42, h * 0.32, speaker, speechText, true);
    } else if (activeSpeaker === 'cat') {
      drawSpeechBalloon(ctx, w * 0.76, h * 0.36, speaker, speechText, false);
    }

  } else {
    // ---------------- PORTRAIT LAYOUT (9:16) ----------------
    const deskW = w * 0.88;
    const deskH = h * 0.20;
    const deskX = (w - deskW) / 2;
    const deskY = h * 0.58;

    if (sceneAction === 'boss_in_corner') {
      const cornerX = w * 0.18;
      const cornerY = h * 0.48;
      drawRoundRect(ctx, cornerX - 25, cornerY - 10, 50, 14, 4, '#8d6e63', '#4e342e', 2);
      ctx.fillStyle = '#5d4037';
      ctx.fillRect(cornerX - 20, cornerY + 4, 8, 35);
      ctx.fillRect(cornerX + 12, cornerY + 4, 8, 35);
      drawBossCharacter(ctx, cornerX, cornerY - 10, 1.05, t, false, 'panicked');

      drawExecutiveDesk(ctx, deskX, deskY, deskW, deskH, isPort, t);
      drawBholaCat(ctx, deskX + deskW * 0.55, deskY - 35, 1.6, t, activeSpeaker === 'cat', 'takeover_boss_desk');
    } else {
      const bossX = w * 0.40;
      const bossY = deskY - 50;
      drawBossCharacter(ctx, bossX, bossY, 1.45, t, activeSpeaker === 'boss', bossExpr);

      drawExecutiveDesk(ctx, deskX, deskY, deskW, deskH, isPort, t);

      const gx = deskX + deskW * 0.74;
      const gy = deskY + deskH * 0.14;
      drawWaterGlass(ctx, gx, gy, 30, 48, t);

      const catX = w * 0.76;
      const catY = deskY + deskH * 0.44;
      drawBholaCat(ctx, catX, catY, 1.45, t, activeSpeaker === 'cat', catAction);
    }

    if (sceneAction === 'sleep_fridge') {
      drawFantasyBubble(ctx, w * 0.24, h * 0.12, 350, 200, t, 'sleep_and_fridge');
    } else if (sceneAction === 'hilsa_salary') {
      drawFantasyBubble(ctx, w * 0.24, h * 0.12, 350, 200, t, 'hilsa_salary');
    }

    if (activeSpeaker === 'boss') {
      drawSpeechBalloon(ctx, w * 0.40, h * 0.28, speaker, speechText, true);
    } else if (activeSpeaker === 'cat') {
      drawSpeechBalloon(ctx, w * 0.74, h * 0.38, speaker, speechText, false);
    }
  }

  // 3. Bottom Subtitle Banner
  if (speaker && speechText && t < 47.0) {
    drawBottomSubtitleBar(ctx, w, h, speaker, speechText);
  }

  // 4. Channel Watermark Badge (DipuToons)
  if (t < 47.0) {
    drawChannelWatermark(ctx, w, h, isPort, t);
  }

  // 5. Outro End Card (47.0s - 49.64s)
  if (t >= 47.0) {
    drawOutroCard(ctx, w, h, isPort, t);
  }
}
