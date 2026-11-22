// ============================================================================
// DipuToons - Premium 3D Cartoon Animation Engine
// Episode: "ভিখারি নাকি ভগবান?!" (Beggar vs Bhagwan 3D Comedy)
// Characters: দীপু, দুই বন্ধু, ভিখারি ও প্রেমিকা (3D Pixar Style)
// Channel: DipuToons (ছোট্ট কার্টুন, বড় হাসি!)
// ============================================================================

const DURATION = CONFIG.duration;
const BEATS = CONFIG.scenes;

// ----------------------------------------------------------------------------
// Asset Preloading
// ----------------------------------------------------------------------------
const logoImg = new Image();
let logoLoaded = false;
logoImg.onload = () => { logoLoaded = true; };

const beggarClosedImg = new Image();
let beggarClosedLoaded = false;
beggarClosedImg.onload = () => { beggarClosedLoaded = true; };

const beggarOpenImg = new Image();
let beggarOpenLoaded = false;
beggarOpenImg.onload = () => { beggarOpenLoaded = true; };

const dipuClosedImg = new Image();
let dipuClosedLoaded = false;
dipuClosedImg.onload = () => { dipuClosedLoaded = true; };

const dipuOpenImg = new Image();
let dipuOpenLoaded = false;
dipuOpenImg.onload = () => { dipuOpenLoaded = true; };

const dipuPrayImg = new Image();
let dipuPrayLoaded = false;
dipuPrayImg.onload = () => { dipuPrayLoaded = true; };

const girlfriendImg = new Image();
let girlfriendLoaded = false;
girlfriendImg.onload = () => { girlfriendLoaded = true; };

const friend1Img = new Image();
let friend1Loaded = false;
friend1Img.onload = () => { friend1Loaded = true; };

const friend2Img = new Image();
let friend2Loaded = false;
friend2Img.onload = () => { friend2Loaded = true; };

window.PRELOAD_ASSETS = () => {
  const promises = [];
  const list = [
    [logoImg, CONFIG.logo_data],
    [beggarClosedImg, CONFIG.beggar_closed_3d],
    [beggarOpenImg, CONFIG.beggar_open_3d],
    [dipuClosedImg, CONFIG.dipu_closed_3d],
    [dipuOpenImg, CONFIG.dipu_open_3d],
    [dipuPrayImg, CONFIG.dipu_pray_3d],
    [girlfriendImg, CONFIG.girlfriend_3d],
    [friend1Img, CONFIG.friend1_3d],
    [friend2Img, CONFIG.friend2_3d]
  ];
  for (const [img, data] of list) {
    if (data) {
      img.src = data;
      if (img.decode) promises.push(img.decode().catch(() => {}));
    }
  }
  return Promise.all(promises);
};

// ----------------------------------------------------------------------------
// Math & Helper Utilities
// ----------------------------------------------------------------------------
function clampVal(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function easeOutQuad(t) {
  return t * (2 - t);
}

function drawRoundRect(ctx, x, y, w, h, rad, fill, stroke, lw = 2) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, rad);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); }
}

function drawSpeechBubble(ctx, x, y, text, speakerName, color = '#ffffff', arrowDir = 'down', tailX = 0) {
  ctx.save();
  ctx.font = 'bold 36px "Noto Sans Bengali", sans-serif';
  const metrics = ctx.measureText(text);
  const paddingX = 36;
  const bw = Math.max(metrics.width + paddingX * 2, 320);
  const bh = 104;
  const bx = x - bw / 2;
  const by = y - bh / 2;

  // Drop shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 8;

  // Bubble body
  drawRoundRect(ctx, bx, by, bw, bh, 24, color, '#1e293b', 4);
  ctx.shadowColor = 'transparent';

  // Bubble pointer
  const tx = tailX || x;
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 4;
  if (arrowDir === 'down') {
    ctx.moveTo(tx - 18, by + bh - 2);
    ctx.lineTo(tx, by + bh + 26);
    ctx.lineTo(tx + 18, by + bh - 2);
  } else {
    ctx.moveTo(tx - 18, by + 2);
    ctx.lineTo(tx, by - 26);
    ctx.lineTo(tx + 18, by + 2);
  }
  ctx.fill();
  ctx.stroke();

  // Speaker Badge
  if (speakerName) {
    const badgeW = 160;
    const badgeH = 36;
    const badgeX = bx + 24;
    const badgeY = by - 18;
    drawRoundRect(ctx, badgeX, badgeY, badgeW, badgeH, 14, '#ffcc00', '#1e293b', 3);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 22px "Noto Sans Bengali", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(speakerName, badgeX + badgeW / 2, badgeY + badgeH / 2);
  }

  // Dialogue text
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 36px "Noto Sans Bengali", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y + 4);

  ctx.restore();
}

// ----------------------------------------------------------------------------
// Background: 3D Modern Residential Street & Apartment Gate
// ----------------------------------------------------------------------------
function drawCityStreet3D(ctx, W, H, t) {
  ctx.save();

  // 1. Sky Gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.55);
  skyGrad.addColorStop(0, '#38bdf8');
  skyGrad.addColorStop(0.5, '#7dd3fc');
  skyGrad.addColorStop(1, '#e0f2fe');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, H);

  // Soft Clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.beginPath();
  ctx.arc(220, 160, 55, 0, Math.PI * 2);
  ctx.arc(280, 150, 75, 0, Math.PI * 2);
  ctx.arc(350, 165, 60, 0, Math.PI * 2);
  ctx.arc(W - 220, 200, 65, 0, Math.PI * 2);
  ctx.arc(W - 150, 190, 80, 0, Math.PI * 2);
  ctx.fill();

  // 2. High-Rise Modern Apartment Tower
  const bldgX = 140, bldgY = 140, bldgW = 520, bldgH = 920;
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(bldgX, bldgY, bldgW, bldgH);

  // Windows pattern
  ctx.fillStyle = '#94a3b8';
  for (let r = bldgY + 50; r < bldgY + bldgH - 60; r += 75) {
    for (let c = bldgX + 35; c < bldgX + bldgW - 55; c += 85) {
      drawRoundRect(ctx, c, r, 60, 48, 6, '#cbd5e1', '#64748b', 2);
    }
  }

  // 3. Green Trees & Landscaping
  ctx.fillStyle = '#15803d';
  ctx.beginPath();
  ctx.arc(70, 880, 170, 0, Math.PI * 2);
  ctx.arc(220, 830, 190, 0, Math.PI * 2);
  ctx.arc(W - 200, 850, 210, 0, Math.PI * 2);
  ctx.arc(W - 40, 890, 170, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#166534';
  ctx.beginPath();
  ctx.arc(130, 900, 180, 0, Math.PI * 2);
  ctx.arc(W - 120, 900, 190, 0, Math.PI * 2);
  ctx.fill();

  // 4. Modern Residential Apartment Wall & Gate
  const wallY = 990;
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(0, wallY, W, 210);
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(0, wallY + 190, W, 20); // curb

  // Gate Bars
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 4;
  for (let x = 50; x < W - 40; x += 60) {
    ctx.beginPath();
    ctx.moveTo(x, wallY + 20);
    ctx.lineTo(x, wallY + 180);
    ctx.stroke();
  }

  // 5. Paved Concrete Sidewalk Ground
  const groundY = 1200;
  const pavementGrad = ctx.createLinearGradient(0, groundY, 0, H);
  pavementGrad.addColorStop(0, '#94a3b8');
  pavementGrad.addColorStop(0.3, '#64748b');
  pavementGrad.addColorStop(1, '#334155');
  ctx.fillStyle = pavementGrad;
  ctx.fillRect(0, groundY, W, H - groundY);

  // Sidewalk perspective lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 3;
  for (let i = -200; i < W + 400; i += 180) {
    ctx.beginPath();
    ctx.moveTo(i, groundY);
    ctx.lineTo(i + (i - W / 2) * 0.9, H);
    ctx.stroke();
  }

  // Soft Ambient shadow at curb
  const aoGrad = ctx.createLinearGradient(0, groundY, 0, groundY + 90);
  aoGrad.addColorStop(0, 'rgba(0, 0, 0, 0.55)');
  aoGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = aoGrad;
  ctx.fillRect(0, groundY, W, 90);

  ctx.restore();
}

// ----------------------------------------------------------------------------
// Falling Marigold Flower Petals Generator for Climax
// ----------------------------------------------------------------------------
function drawMarigoldPetals(ctx, W, H, t) {
  if (t < 21.5 || t >= 31.25) return;

  ctx.save();
  const numPetals = 65;
  const elapsed = t - 21.5;

  for (let i = 0; i < numPetals; i++) {
    const seed = (i * 9301 + 49297) % 233280;
    const startX = (seed % (W + 240)) - 120;
    const speedY = 175 + (seed % 150);
    const speedX = Math.sin(seed + elapsed * 1.5) * 60;
    const rotSpeed = 2.0 + (seed % 4);

    let py = ((elapsed * speedY + seed) % (H + 140)) - 70;
    let px = startX + Math.sin(elapsed * 2.0 + i) * 55 + speedX * 0.5;

    const isOrange = i % 2 === 0;
    const petalColor = isOrange ? '#f97316' : '#facc15';

    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(elapsed * rotSpeed + i);
    ctx.fillStyle = petalColor;
    ctx.beginPath();
    ctx.ellipse(0, 0, 18, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

// ----------------------------------------------------------------------------
// Aarti Thali with Diya & Flame Animation
// ----------------------------------------------------------------------------
function drawAartiThali(ctx, x, y, t) {
  ctx.save();
  // Circular Aarti devotional motion
  const aartiOffsetX = Math.cos(t * 3.5) * 45;
  const aartiOffsetY = Math.sin(t * 3.5) * 24;

  const tx = x + aartiOffsetX;
  const ty = y + aartiOffsetY;

  ctx.translate(tx, ty);

  // 1. Thali Soft Shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
  ctx.beginPath();
  ctx.ellipse(0, 28, 95, 22, 0, 0, Math.PI * 2);
  ctx.fill();

  // 2. Brass / Gold Thali (Plate)
  const plateGrad = ctx.createLinearGradient(-90, 0, 90, 0);
  plateGrad.addColorStop(0, '#b45309');
  plateGrad.addColorStop(0.25, '#f59e0b');
  plateGrad.addColorStop(0.5, '#fef08a');
  plateGrad.addColorStop(0.75, '#f59e0b');
  plateGrad.addColorStop(1, '#b45309');
  ctx.fillStyle = plateGrad;
  ctx.beginPath();
  ctx.ellipse(0, 0, 90, 26, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Rim pattern
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(0, 0, 80, 20, 0, 0, Math.PI * 2);
  ctx.stroke();

  // 3. Flower petals on the plate
  ctx.fillStyle = '#f97316';
  ctx.beginPath();
  ctx.arc(-42, -2, 8, 0, Math.PI * 2);
  ctx.arc(42, -2, 8, 0, Math.PI * 2);
  ctx.arc(-18, 6, 7, 0, Math.PI * 2);
  ctx.arc(18, 6, 7, 0, Math.PI * 2);
  ctx.fill();

  // 4. Center Brass Diya (Lamp)
  ctx.fillStyle = '#b45309';
  ctx.beginPath();
  ctx.ellipse(0, -4, 22, 11, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // 5. Sacred Diya Flame with Warm Glow
  const flameFlicker = Math.sin(t * 18.0) * 4;
  const flameH = 42 + flameFlicker;

  ctx.shadowColor = 'rgba(251, 191, 36, 0.95)';
  ctx.shadowBlur = 32;

  const flameGrad = ctx.createRadialGradient(0, -16, 2, 0, -22, 26);
  flameGrad.addColorStop(0, '#ffffff');
  flameGrad.addColorStop(0.3, '#fef08a');
  flameGrad.addColorStop(0.6, '#f59e0b');
  flameGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
  ctx.fillStyle = flameGrad;

  ctx.beginPath();
  ctx.moveTo(-12, -8);
  ctx.quadraticCurveTo(-16, -26, 0, -8 - flameH);
  ctx.quadraticCurveTo(16, -26, 12, -8);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

// ----------------------------------------------------------------------------
// Characters Rendering & Lip-Sync Animation
// ----------------------------------------------------------------------------
function drawCharacters3D(ctx, W, H, t) {
  // Ground line where soles rest firmly on pavement:
  const groundY = 1700;

  // Climax Camera Zoom (21.5s to 31.25s)
  let zoom = 1.0;
  let panX = 0;
  let panY = 0;

  if (t >= 21.5 && t < 31.25) {
    const p = clampVal((t - 21.5) / 0.6, 0, 1);
    zoom = 1.0 + easeInOut(p) * 0.08;
    panY = -easeInOut(p) * 40;
  }

  ctx.save();
  ctx.translate(W / 2 + panX, H / 2 + panY);
  ctx.scale(zoom, zoom);
  ctx.translate(-W / 2, -H / 2);

  // States
  const isPrayingClimax = (t >= 21.5 && t < 31.25);
  const isGirlfriendScene = (t >= 13.5 && t < 21.5);

  // --------------------------------------------------------------------------
  // 1. BEGGAR (Left in Scene 1-4; Center Divine Guru in Climax)
  // --------------------------------------------------------------------------
  let beggarBaseX = isPrayingClimax ? 400 : (isGirlfriendScene ? 190 : 250);
  let beggarBaseY = groundY;
  let beggarH = 860;

  const isBeggarSpeaking = (t >= 0.0 && t < 2.5) || (t >= 5.0 && t < 9.5);
  const isBeggarMouthOpen = isBeggarSpeaking && (Math.sin(t * 14.0) > -0.15);
  const beggarSprite = (isBeggarMouthOpen && beggarOpenLoaded) ? beggarOpenImg : (beggarClosedLoaded ? beggarClosedImg : beggarClosedImg);
  const beggarNod = isBeggarSpeaking ? Math.sin(t * 4.0) * 0.02 : 0;

  let beggarW = beggarSprite && beggarSprite.height > 0 ? (beggarH * beggarSprite.width) / beggarSprite.height : 260;

  // In Climax (21.5s - 31.25s): Beggar is in Center with Golden Halo
  if (isPrayingClimax) {
    beggarH = 880;
    beggarW = beggarSprite && beggarSprite.height > 0 ? (beggarH * beggarSprite.width) / beggarSprite.height : 265;

    // Divine Radiant Sunburst & Golden Halo
    ctx.save();
    const glowR = 290 + Math.sin(t * 4.0) * 20;
    const glowGrad = ctx.createRadialGradient(beggarBaseX, beggarBaseY - beggarH * 0.65, 20, beggarBaseX, beggarBaseY - beggarH * 0.65, glowR);
    glowGrad.addColorStop(0, 'rgba(250, 204, 21, 0.75)');
    glowGrad.addColorStop(0.5, 'rgba(250, 204, 21, 0.3)');
    glowGrad.addColorStop(1, 'rgba(250, 204, 21, 0)');
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(beggarBaseX, beggarBaseY - beggarH * 0.65, glowR, 0, Math.PI * 2);
    ctx.fill();

    // Golden Halo Ring
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 8;
    ctx.shadowColor = '#fef08a';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.ellipse(beggarBaseX, beggarBaseY - beggarH * 0.98, 95, 24, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // Beggar Floor Shadow
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(beggarBaseX, beggarBaseY + 4, beggarW * 0.55, 16, 0, 0, Math.PI * 2);
  const bShadow = ctx.createRadialGradient(beggarBaseX, beggarBaseY + 4, 6, beggarBaseX, beggarBaseY + 4, beggarW * 0.55);
  bShadow.addColorStop(0, 'rgba(15, 23, 42, 0.75)');
  bShadow.addColorStop(0.6, 'rgba(15, 23, 42, 0.25)');
  bShadow.addColorStop(1, 'rgba(15, 23, 42, 0)');
  ctx.fillStyle = bShadow;
  ctx.fill();
  ctx.restore();

  // Draw Beggar Sprite
  ctx.save();
  ctx.translate(beggarBaseX, beggarBaseY);
  ctx.rotate(beggarNod);
  if (beggarSprite && beggarSprite.width > 0) {
    ctx.drawImage(beggarSprite, -beggarW / 2, -beggarH, beggarW, beggarH);
  }

  // In Climax (21.5s - 31.25s): Marigold Flower Garland around Beggar's neck!
  if (isPrayingClimax) {
    ctx.save();
    const garlandNeckY = -beggarH * 0.66;
    const garlandHangY = -beggarH * 0.38;
    for (let g = 0; g <= 16; g++) {
      const u = g / 16;
      const gx = -75 + u * 150;
      const gy = garlandNeckY + (garlandHangY - garlandNeckY) * (4 * u * (1 - u));
      const gColor = g % 2 === 0 ? '#f97316' : '#facc15';
      ctx.fillStyle = gColor;
      ctx.beginPath();
      ctx.arc(gx, gy, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#c2410c';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    ctx.restore();
  }
  ctx.restore();

  // --------------------------------------------------------------------------
  // 2. THE 3 FRIENDS: Dipu, Friend 1, Friend 2
  // --------------------------------------------------------------------------

  // FRIEND 1 (Yellow T-Shirt, Bearded Buddy)
  // In Girlfriend scene: huddled behind Dipu on left!
  let f1X = isPrayingClimax ? 170 : (isGirlfriendScene ? 340 : 910);
  let f1Y = groundY;
  let f1H = isPrayingClimax ? 760 : 810;
  let f1W = friend1Img && friend1Img.height > 0 ? (f1H * friend1Img.width) / friend1Img.height : 240;
  let f1Tilt = isPrayingClimax ? 0.08 : (isGirlfriendScene ? -0.06 : -0.02);

  // Friend 1 Floor Shadow
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(f1X, f1Y + 4, f1W * 0.55, 14, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(15, 23, 42, 0.55)';
  ctx.fill();
  ctx.restore();

  // Draw Friend 1
  if (friend1Loaded && friend1Img.width > 0) {
    ctx.save();
    ctx.translate(f1X, f1Y);
    ctx.rotate(f1Tilt);
    ctx.drawImage(friend1Img, -f1W / 2, -f1H, f1W, f1H);
    ctx.restore();
  }

  // FRIEND 2 (Orange/Red T-Shirt Buddy)
  // In Girlfriend scene: huddled behind Dipu on left!
  let f2X = isPrayingClimax ? 960 : (isGirlfriendScene ? 430 : 770);
  let f2Y = isPrayingClimax ? groundY : groundY - 10;
  let f2H = isPrayingClimax ? 770 : 800;
  let f2W = friend2Img && friend2Img.height > 0 ? (f2H * friend2Img.width) / friend2Img.height : 240;
  let f2Tilt = isPrayingClimax ? -0.08 : (isGirlfriendScene ? -0.04 : 0.02);

  // Friend 2 Floor Shadow
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(f2X, f2Y + 4, f2W * 0.55, 14, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(15, 23, 42, 0.55)';
  ctx.fill();
  ctx.restore();

  // Draw Friend 2
  if (friend2Loaded && friend2Img.width > 0) {
    ctx.save();
    ctx.translate(f2X, f2Y);
    ctx.rotate(f2Tilt);
    ctx.drawImage(friend2Img, -f2W / 2, -f2H, f2W, f2H);
    ctx.restore();
  }

  // MAIN HERO: DIPU (Black T-shirt, silver chain, cargo pants)
  let dipuBaseX = isPrayingClimax ? 710 : (isGirlfriendScene ? 550 : 600);
  let dipuBaseY = groundY;
  let dipuH = 860;

  const isDipuSpeaking = (t >= 2.5 && t < 5.0) || (t >= 9.5 && t < 13.5);
  const isDipuMouthOpen = isDipuSpeaking && (Math.sin(t * 14.0) > -0.15);
  let dipuSprite = (isDipuMouthOpen && dipuOpenLoaded) ? dipuOpenImg : (dipuClosedLoaded ? dipuClosedImg : dipuClosedImg);

  if (isPrayingClimax && dipuPrayLoaded) {
    dipuSprite = dipuPrayImg;
  }

  let dipuW = dipuSprite && dipuSprite.height > 0 ? (dipuH * dipuSprite.width) / dipuSprite.height : 320;
  const dipuNod = isDipuSpeaking ? Math.sin(t * 4.5) * 0.02 : 0;
  const dipuTilt = isPrayingClimax ? -0.06 : (isGirlfriendScene ? -0.05 : 0);

  // Dipu Floor Shadow
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(dipuBaseX, dipuBaseY + 4, dipuW * 0.5, 16, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
  ctx.fill();
  ctx.restore();

  // Draw Dipu Sprite
  ctx.save();
  ctx.translate(dipuBaseX, dipuBaseY);
  ctx.rotate(dipuTilt + dipuNod);
  if (dipuSprite && dipuSprite.width > 0) {
    ctx.drawImage(dipuSprite, -dipuW / 2, -dipuH, dipuW, dipuH);
  }

  // Coin Dropping Animation (10.0s to 12.0s)
  if (t >= 10.0 && t <= 12.2) {
    const p = (t - 10.0) / 1.2;
    if (p <= 1.0) {
      const coinX = -dipuW * 0.2 - p * 220;
      const coinY = -dipuH * 0.48 + p * 120 + Math.sin(p * Math.PI) * -45;
      ctx.save();
      ctx.fillStyle = '#facc15';
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(coinX, coinY, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(coinX - 4, coinY - 4, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  ctx.restore();

  // --------------------------------------------------------------------------
  // 3. ANGRY GIRLFRIEND (Storms in at 13.5s - 21.5s!)
  // --------------------------------------------------------------------------
  if (isGirlfriendScene && girlfriendLoaded && girlfriendImg.width > 0) {
    let gfProgress = clampVal((t - 13.5) / 0.7, 0, 1);
    let gfX = (W + 80) - easeOutQuad(gfProgress) * 260; // stops around 900px

    if (t >= 20.0) {
      const leaveP = clampVal((t - 20.0) / 0.8, 0, 1);
      gfX += easeInOut(leaveP) * 350;
    }

    const gfY = groundY;
    const gfH = 860;
    const gfW = (gfH * girlfriendImg.width) / girlfriendImg.height;
    const gfShout = Math.sin(t * 12.0) * 0.02;

    // Girlfriend Floor Shadow
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(gfX, gfY + 4, gfW * 0.45, 16, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
    ctx.fill();
    ctx.restore();

    // Draw Girlfriend Sprite
    ctx.save();
    ctx.translate(gfX, gfY);
    ctx.rotate(gfShout);
    ctx.drawImage(girlfriendImg, -gfW / 2, -gfH, gfW, gfH);

    // Broken Heart Emoji floating
    ctx.font = '54px sans-serif';
    ctx.fillText('💔', -gfW * 0.65, -gfH * 0.88 + Math.sin(t * 4.0) * 10);
    ctx.restore();
  }

  // --------------------------------------------------------------------------
  // 4. AARTI THALI IN FRONT OF DIPU (Climax 21.5s - 31.25s)
  // --------------------------------------------------------------------------
  if (isPrayingClimax) {
    drawAartiThali(ctx, 550, groundY - dipuH * 0.42, t);
  }

  ctx.restore();
}

// ----------------------------------------------------------------------------
// Dialogue & Speech Bubbles System
// ----------------------------------------------------------------------------
function drawDialogueBeat(ctx, W, H, t) {
  // Scene 1 (0.0s - 2.5s): Beggar asks for money
  if (t >= 0.1 && t < 2.5) {
    drawSpeechBubble(ctx, 360, 680, 'ভাইয়া, কিছু টাকা দিন না...', 'ভিখারি', '#ffffff', 'down', 260);
  }
  // Scene 2 (2.5s - 5.0s): Dipu dismisses him
  else if (t >= 2.5 && t < 5.0) {
    drawSpeechBubble(ctx, 680, 640, 'আরে তুই যা তো! সকাল সকাল মাথা খাস না!', 'দীপু', '#fef08a', 'down', 600);
  }
  // Scene 3 (5.0s - 9.5s): Beggar predicts great good news
  else if (t >= 5.0 && t < 9.5) {
    drawSpeechBubble(ctx, 380, 660, 'গরিবকে সাহায্য করুন, খুব শীঘ্রই বিরাট সুখবর পাবেন!', 'ভিখারি', '#ffffff', 'down', 260);
  }
  // Scene 4 (9.5s - 13.5s): Dipu gives coin
  else if (t >= 9.5 && t < 13.5) {
    drawSpeechBubble(ctx, 680, 640, 'সত্যি?! এই নে!', 'দীপু', '#fef08a', 'down', 600);
  }
  // Scene 5 (13.5s - 21.5s): Girlfriend screams breakup in person!
  else if (t >= 13.5 && t < 21.5) {
    drawSpeechBubble(ctx, 540, 560, 'চিরদিনের জন্য চলে যাচ্ছি! ডিভোর্স পেপার পাঠাব, সই করে দিবি!', 'প্রেমিকা', '#ffe4e6', 'down', 860);
  }
  // Scene 6 (21.5s - 31.25s): The Climax Banner - Beggar vs Bhagwan!
  else if (t >= 21.5 && t < 31.25) {
    ctx.save();
    const bx = W / 2;
    const by = 540;
    ctx.shadowColor = 'rgba(250, 204, 21, 0.85)';
    ctx.shadowBlur = 28;
    drawRoundRect(ctx, bx - 390, by - 65, 780, 130, 28, '#0f172a', '#facc15', 5);
    ctx.shadowColor = 'transparent';

    ctx.fillStyle = '#facc15';
    ctx.font = 'bold 46px "Noto Sans Bengali", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ভিখারি ❌ ভগবান 🙌', bx, by - 14);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 26px "Noto Sans Bengali", sans-serif';
    ctx.fillText('এর চেয়ে বড় সুখবর আর হতেই পারে না! 😂', bx, by + 34);
    ctx.restore();
  }
}

// ----------------------------------------------------------------------------
// DipuToons Header Watermark
// ----------------------------------------------------------------------------
function drawHeaderBrand(ctx, W, H, t) {
  if (t >= 31.25) return;

  ctx.save();
  const cardW = 340;
  const cardH = 76;
  const cardX = W / 2 - cardW / 2;
  const cardY = 48;

  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
  ctx.shadowBlur = 14;
  drawRoundRect(ctx, cardX, cardY, cardW, cardH, 38, '#1e1b18', '#facc15', 3);
  ctx.shadowColor = 'transparent';

  if (logoLoaded && logoImg.width > 0) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cardX + 44, cardY + cardH / 2, 28, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(logoImg, cardX + 16, cardY + cardH / 2 - 28, 56, 56);
    ctx.restore();
  }

  ctx.fillStyle = '#facc15';
  ctx.font = 'bold 32px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('DipuToons', cardX + 86, cardY + cardH / 2 - 10);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px "Noto Sans Bengali", sans-serif';
  ctx.fillText('ছোট্ট কার্টুন, বড় হাসি!', cardX + 86, cardY + cardH / 2 + 18);

  ctx.restore();
}

// ----------------------------------------------------------------------------
// DEDICATED DipuToons 3D Outro Card (Appears ONLY in the added 31.25s - 32.50s)
// ----------------------------------------------------------------------------
function drawOutroCard(ctx, W, H, t) {
  if (t < 31.25) return;

  const progress = clampVal((t - 31.25) / 0.35, 0, 1);
  const alpha = easeInOut(progress);

  ctx.save();
  ctx.fillStyle = `rgba(10, 15, 24, ${alpha * 0.96})`;
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2;
  const cy = H / 2 - 60;
  const scale = 0.85 + alpha * 0.15;

  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  // 1. Center Circular DipuToons Logo Badge
  const logoRadius = 260;
  if (logoLoaded && logoImg.width > 0) {
    ctx.save();
    ctx.shadowColor = 'rgba(250, 204, 21, 0.75)';
    ctx.shadowBlur = 36;
    ctx.beginPath();
    ctx.arc(0, -70, logoRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.clip();
    ctx.drawImage(logoImg, -logoRadius, -70 - logoRadius, logoRadius * 2, logoRadius * 2);
    ctx.restore();

    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(0, -70, logoRadius, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 2. Animated YouTube Subscribe Button
  const btnW = 440;
  const btnH = 92;
  const btnY = logoRadius + 20;
  const btnPulse = 1.0 + Math.sin(t * 8.0) * 0.03;

  ctx.save();
  ctx.translate(0, btnY);
  ctx.scale(btnPulse, btnPulse);
  ctx.shadowColor = 'rgba(239, 68, 68, 0.85)';
  ctx.shadowBlur = 24;
  drawRoundRect(ctx, -btnW / 2, -btnH / 2, btnW, btnH, 46, '#ef4444', '#ffffff', 4);

  // Play icon
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(-btnW / 2 + 50, -18);
  ctx.lineTo(-btnW / 2 + 82, 0);
  ctx.lineTo(-btnW / 2 + 50, 18);
  ctx.closePath();
  ctx.fill();

  // Button Text
  ctx.font = 'bold 36px "Noto Sans Bengali", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('সাবস্ক্রাইব করুন', 25, 0);
  ctx.restore();

  // 3. Bell Notification Icon & Slogan
  ctx.fillStyle = '#facc15';
  ctx.font = 'bold 34px "Noto Sans Bengali", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🔔 লাইক ও শেয়ার করুন!', 0, btnY + 110);

  ctx.restore();
}

// ----------------------------------------------------------------------------
// Master Frame Render Function
// ----------------------------------------------------------------------------
function frame(ctx, W, H, t) {
  ctx.clearRect(0, 0, W, H);

  // 1. Draw 3D City Street Environment
  drawCityStreet3D(ctx, W, H, t);

  // 2. Draw 3D Characters with Lip Sync
  drawCharacters3D(ctx, W, H, t);

  // 3. Draw Falling Marigold Petals during Climax
  drawMarigoldPetals(ctx, W, H, t);

  // 4. Draw Dialogue Speech Bubbles
  drawDialogueBeat(ctx, W, H, t);

  // 5. Draw Header Watermark
  drawHeaderBrand(ctx, W, H, t);

  // 6. Draw Dedicated Outro Card (31.25s - 32.50s only)
  drawOutroCard(ctx, W, H, t);
}
