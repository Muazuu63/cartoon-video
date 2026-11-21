// ============================================================================
// DipuToons - Premium 3D Cartoon Animation Engine
// Episode: "নিজেরাই নিজেরাই বিয়া করছো?!" (Father Son 3D Marriage Comedy)
// Characters: বাবা ও ছেলে (Father & Son - 3D Pixar Style)
// Channel: DipuToons (ছোট্ট কার্টুন, বড় হাসি!)
// ============================================================================

const DURATION = CONFIG.duration;
const BEATS = CONFIG.scenes;

// ----------------------------------------------------------------------------
// Asset Preloading (Official DipuToons Logo, 3D Father, 3D Kid)
// ----------------------------------------------------------------------------
const logoImg = new Image();
let logoLoaded = false;
logoImg.onload = () => { logoLoaded = true; };

const fatherImg = new Image();
let fatherLoaded = false;
fatherImg.onload = () => { fatherLoaded = true; };

const fatherClosedImg = new Image();
let fatherClosedLoaded = false;
fatherClosedImg.onload = () => { fatherClosedLoaded = true; };

const kidImg = new Image();
let kidLoaded = false;
kidImg.onload = () => { kidLoaded = true; };

const kidClosedImg = new Image();
let kidClosedLoaded = false;
kidClosedImg.onload = () => { kidClosedLoaded = true; };

window.PRELOAD_ASSETS = () => {
  const promises = [];
  if (CONFIG.logo_data) {
    logoImg.src = CONFIG.logo_data;
    if (logoImg.decode) promises.push(logoImg.decode().catch(() => {}));
  }
  if (CONFIG.father_3d) {
    fatherImg.src = CONFIG.father_3d;
    if (fatherImg.decode) promises.push(fatherImg.decode().catch(() => {}));
  }
  if (CONFIG.father_closed_3d) {
    fatherClosedImg.src = CONFIG.father_closed_3d;
    if (fatherClosedImg.decode) promises.push(fatherClosedImg.decode().catch(() => {}));
  }
  if (CONFIG.kid_3d) {
    kidImg.src = CONFIG.kid_3d;
    if (kidImg.decode) promises.push(kidImg.decode().catch(() => {}));
  }
  if (CONFIG.kid_closed_3d) {
    kidClosedImg.src = CONFIG.kid_closed_3d;
    if (kidClosedImg.decode) promises.push(kidClosedImg.decode().catch(() => {}));
  }
  return Promise.all(promises);
};

// ----------------------------------------------------------------------------
// Math & Drawing Utilities
// ----------------------------------------------------------------------------
function clampVal(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
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
  const bw = Math.max(metrics.width + paddingX * 2, 290);
  const bh = 100;
  const bx = x - bw / 2;
  const by = y - bh / 2;

  // Soft drop shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 8;

  // Bubble body
  drawRoundRect(ctx, bx, by, bw, bh, 24, color, '#222222', 4);
  ctx.shadowColor = 'transparent';

  // Bubble tail pointer
  const tx = tailX || x;
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.strokeStyle = '#222222';
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
    const badgeW = 120;
    const badgeH = 34;
    const badgeX = bx + 24;
    const badgeY = by - 16;
    drawRoundRect(ctx, badgeX, badgeY, badgeW, badgeH, 12, '#ffcc00', '#222222', 3);
    ctx.fillStyle = '#111111';
    ctx.font = 'bold 20px "Noto Sans Bengali", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(speakerName, badgeX + badgeW / 2, badgeY + badgeH / 2);
  }

  // Dialogue Text
  ctx.fillStyle = '#111111';
  ctx.font = 'bold 38px "Noto Sans Bengali", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y + 4);

  ctx.restore();
}

// ----------------------------------------------------------------------------
// 3D Interior Environment (Modern Pixar Style Living Room)
// ----------------------------------------------------------------------------
function drawLivingRoom3D(ctx, W, H, t) {
  ctx.save();

  // 1. Back Wall Gradient with Soft Studio Lighting
  const wallGrad = ctx.createLinearGradient(0, 0, W, H * 0.72);
  wallGrad.addColorStop(0, '#f9f3e9');
  wallGrad.addColorStop(0.4, '#ede3d1');
  wallGrad.addColorStop(1, '#d8cbba');
  ctx.fillStyle = wallGrad;
  ctx.fillRect(0, 0, W, H);

  // 2. Sunlight Volumetric Rays from Arch Window
  ctx.save();
  const rayGrad = ctx.createLinearGradient(0, 100, W * 0.8, H * 0.9);
  rayGrad.addColorStop(0, 'rgba(255, 250, 230, 0.45)');
  rayGrad.addColorStop(0.5, 'rgba(255, 245, 210, 0.18)');
  rayGrad.addColorStop(1, 'rgba(255, 240, 200, 0)');
  ctx.fillStyle = rayGrad;
  ctx.beginPath();
  ctx.moveTo(100, 120);
  ctx.lineTo(W * 0.9, H * 0.85);
  ctx.lineTo(W * 0.3, H * 0.95);
  ctx.lineTo(20, 380);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // 3. Elegant Modern Arched Window (Upper Left)
  const winX = 80, winY = 160, winW = 280, winH = 480;
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
  ctx.shadowBlur = 20;
  drawRoundRect(ctx, winX - 12, winY - 12, winW + 24, winH + 24, [140, 140, 16, 16], '#ffffff', '#c5b8a5', 5);
  ctx.restore();

  // Outside landscape view (lush green trees and blue sky)
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(winX, winY, winW, winH, [130, 130, 10, 10]);
  ctx.clip();
  const skyGrad = ctx.createLinearGradient(winX, winY, winX, winY + winH);
  skyGrad.addColorStop(0, '#7ac9f8');
  skyGrad.addColorStop(0.6, '#bfe6fc');
  skyGrad.addColorStop(1, '#e3f4ff');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(winX, winY, winW, winH);

  // Soft clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.beginPath();
  ctx.arc(winX + 70, winY + 90, 40, 0, Math.PI * 2);
  ctx.arc(winX + 110, winY + 80, 50, 0, Math.PI * 2);
  ctx.arc(winX + 160, winY + 95, 45, 0, Math.PI * 2);
  ctx.fill();

  // Green outdoor foliage
  ctx.fillStyle = '#489f3a';
  ctx.beginPath();
  ctx.arc(winX + 50, winY + 400, 120, 0, Math.PI * 2);
  ctx.arc(winX + 180, winY + 420, 130, 0, Math.PI * 2);
  ctx.arc(winX + 260, winY + 440, 110, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#2f7924';
  ctx.beginPath();
  ctx.arc(winX + 110, winY + 460, 140, 0, Math.PI * 2);
  ctx.fill();

  // Window mullions / panes
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(winX + winW / 2, winY);
  ctx.lineTo(winX + winW / 2, winY + winH);
  ctx.moveTo(winX, winY + 220);
  ctx.lineTo(winX + winW, winY + 220);
  ctx.moveTo(winX, winY + 350);
  ctx.lineTo(winX + winW, winY + 350);
  ctx.stroke();
  ctx.restore();

  // 4. Wall Painting Frame (Upper Right)
  const artX = W - 360, artY = 200, artW = 260, artH = 340;
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.25)';
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 10;
  drawRoundRect(ctx, artX, artY, artW, artH, 16, '#2c2218', '#c99e52', 8);
  ctx.restore();

  // Painting Art Interior
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(artX + 14, artY + 14, artW - 28, artH - 28, 8);
  ctx.clip();
  const artGrad = ctx.createLinearGradient(artX, artY, artX, artY + artH);
  artGrad.addColorStop(0, '#f2784b');
  artGrad.addColorStop(0.5, '#f5af65');
  artGrad.addColorStop(1, '#e3d29a');
  ctx.fillStyle = artGrad;
  ctx.fillRect(artX, artY, artW, artH);
  // Mountains
  ctx.fillStyle = '#4f3b2f';
  ctx.beginPath();
  ctx.moveTo(artX, artY + 280);
  ctx.lineTo(artX + 80, artY + 170);
  ctx.lineTo(artX + 160, artY + 260);
  ctx.lineTo(artX + 220, artY + 190);
  ctx.lineTo(artX + artW, artY + 280);
  ctx.lineTo(artX + artW, artY + artH);
  ctx.lineTo(artX, artY + artH);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // 5. Wooden Wainscoting & Baseboard
  const floorY = H * 0.72;
  const baseboardH = 45;
  ctx.fillStyle = '#785b41';
  ctx.fillRect(0, floorY - baseboardH, W, baseboardH);
  ctx.fillStyle = '#a88866';
  ctx.fillRect(0, floorY - baseboardH, W, 8);
  ctx.fillStyle = '#4e3825';
  ctx.fillRect(0, floorY - 6, W, 6);

  // 6. Polished Parquet Wooden Floor with 3D Depth
  const floorGrad = ctx.createLinearGradient(0, floorY, 0, H);
  floorGrad.addColorStop(0, '#4a3321');
  floorGrad.addColorStop(0.4, '#6a4c33');
  floorGrad.addColorStop(1, '#382415');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, floorY, W, H - floorY);

  // Floor plank lines with perspective
  ctx.strokeStyle = 'rgba(30, 18, 9, 0.4)';
  ctx.lineWidth = 3;
  for (let i = -400; i < W + 600; i += 180) {
    ctx.beginPath();
    ctx.moveTo(i, floorY);
    ctx.lineTo(i + (i - W / 2) * 0.8, H);
    ctx.stroke();
  }

  // Soft Ambient Occlusion shadow at wall-floor seam
  const aoGrad = ctx.createLinearGradient(0, floorY, 0, floorY + 110);
  aoGrad.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
  aoGrad.addColorStop(0.3, 'rgba(0, 0, 0, 0.25)');
  aoGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = aoGrad;
  ctx.fillRect(0, floorY, W, 110);

  // 7. Indoor Modern Plant (Right edge)
  const plantX = W - 90, plantY = floorY + 120;
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 12;
  ctx.beginPath();
  ctx.moveTo(plantX - 60, plantY - 140);
  ctx.lineTo(plantX + 60, plantY - 140);
  ctx.lineTo(plantX + 45, plantY);
  ctx.lineTo(plantX - 45, plantY);
  ctx.closePath();
  const potGrad = ctx.createLinearGradient(plantX - 60, plantY - 140, plantX + 60, plantY);
  potGrad.addColorStop(0, '#ffffff');
  potGrad.addColorStop(0.7, '#e8e8e8');
  potGrad.addColorStop(1, '#b0b0b0');
  ctx.fillStyle = potGrad;
  ctx.fill();
  ctx.restore();

  // Green leaves
  ctx.fillStyle = '#2d6a26';
  for (let a = -1; a <= 1; a += 0.8) {
    ctx.save();
    ctx.translate(plantX + a * 20, plantY - 150);
    ctx.rotate(a * 0.4 + Math.sin(t * 1.5 + a) * 0.05);
    ctx.beginPath();
    ctx.ellipse(0, -90, 45, 90, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  ctx.restore();
}

// ----------------------------------------------------------------------------
// 3D Characters Rendering & Rigging
// ----------------------------------------------------------------------------
function drawCharacters3D(ctx, W, H, t) {
  // Ground baseline on polished floor
  const groundY = 1680;

  // Camera Zoom Logic:
  // Scene 5 (8.0s - 10.0s) has dramatic comedic punch zoom!
  let zoom = 1.0;
  let camPanY = 0;
  let camPanX = 0;

  if (t >= 8.0 && t <= 10.0) {
    const p = clampVal((t - 8.0) / 0.4, 0, 1);
    zoom = 1.0 + easeInOut(p) * 0.18;
    camPanY = -easeInOut(p) * 90;
    camPanX = -easeInOut(p) * 40;
  }

  ctx.save();
  ctx.translate(W / 2 + camPanX, H / 2 + camPanY);
  ctx.scale(zoom, zoom);
  ctx.translate(-W / 2, -H / 2);

  // --------------------------------------------------------------------------
  // 1. Father (3D Character) - Screen Left
  // --------------------------------------------------------------------------
  const fatherBaseX = 360;
  const fatherBaseY = groundY;
  const fatherH = 920;
  const fatherW = (fatherH * 220) / 572; // proportional ratio ~353px

  const isFatherSpeaking = (t >= 2.0 && t < 4.0) || (t >= 6.0 && t < 8.0) || (t >= 10.0);
  // Visibly flap mouth with syllables during speech:
  const isFatherMouthOpen = isFatherSpeaking && (Math.sin(t * 18.0) > -0.15);
  const fatherSprite = (isFatherMouthOpen && fatherLoaded) ? fatherImg : (fatherClosedLoaded ? fatherClosedImg : fatherImg);
  const fatherSway = isFatherSpeaking ? Math.sin(t * 14.0) * 8 : Math.sin(t * 2.2) * 4;
  const fatherBreath = Math.sin(t * 2.8) * 0.008;
  const fatherNod = isFatherSpeaking ? Math.sin(t * 16.0) * 0.045 : 0;

  // Speaker Active Aura / Sound waves when Father speaks
  if (isFatherSpeaking) {
    ctx.save();
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.4)';
    ctx.lineWidth = 4;
    const waveR = 80 + Math.sin(t * 20.0) * 20;
    ctx.beginPath();
    ctx.arc(fatherBaseX + 10, fatherBaseY - fatherH * 0.78, waveR, -Math.PI * 0.3, Math.PI * 0.3);
    ctx.stroke();
    ctx.restore();
  }

  // Floor Contact Shadow (tightly hugging sandals)
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(fatherBaseX, fatherBaseY - 14, fatherW * 0.40, 16, 0, 0, Math.PI * 2);
  const fShadow = ctx.createRadialGradient(fatherBaseX, fatherBaseY - 14, 8, fatherBaseX, fatherBaseY - 14, fatherW * 0.40);
  fShadow.addColorStop(0, 'rgba(12, 6, 0, 0.65)');
  fShadow.addColorStop(0.5, 'rgba(12, 6, 0, 0.25)');
  fShadow.addColorStop(1, 'rgba(12, 6, 0, 0)');
  ctx.fillStyle = fShadow;
  ctx.fill();
  ctx.restore();

  // Draw Father Sprite with Lip-Sync Mouth Swapping
  ctx.save();
  ctx.translate(fatherBaseX, fatherBaseY);
  ctx.rotate(fatherNod);
  ctx.scale(1 + fatherBreath, 1 - fatherBreath);

  if (fatherSprite && fatherSprite.width > 0) {
    ctx.drawImage(fatherSprite, -fatherW / 2, -fatherH + fatherSway, fatherW, fatherH);
  }
  ctx.restore();

  // --------------------------------------------------------------------------
  // 2. Kid (3D Character) - Screen Right
  // --------------------------------------------------------------------------
  const kidBaseX = 740;
  const kidBaseY = groundY;
  const kidH = 680;
  const kidW = (kidH * 170) / 572; // proportional ratio ~202px

  const isKidSpeaking = (t >= 0.0 && t < 2.0) || (t >= 4.0 && t < 6.0) || (t >= 8.0 && t < 10.0);
  const isShocked = (t >= 8.0 && t < 10.0);
  // Visibly flap mouth with syllables during speech:
  const isKidMouthOpen = isKidSpeaking && (isShocked || Math.sin(t * 18.0) > -0.15);
  const kidSprite = (isKidMouthOpen && kidLoaded) ? kidImg : (kidClosedLoaded ? kidClosedImg : kidImg);
  const kidBounce = isShocked ? Math.sin(t * 24.0) * 12 : (isKidSpeaking ? Math.sin(t * 16.0) * 8 : Math.sin(t * 2.5) * 4);
  const kidTilt = isShocked ? 0.12 + Math.sin(t * 20.0) * 0.05 : (isKidSpeaking ? -0.06 + Math.sin(t * 16.0) * 0.04 : 0);

  // Speaker Active Aura / Sound waves when Kid speaks
  if (isKidSpeaking && !isShocked) {
    ctx.save();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
    ctx.lineWidth = 4;
    const waveR = 70 + Math.sin(t * 20.0) * 18;
    ctx.beginPath();
    ctx.arc(kidBaseX - 10, kidBaseY - kidH * 0.52, waveR, Math.PI * 0.7, Math.PI * 1.3);
    ctx.stroke();
    ctx.restore();
  }

  // Floor Contact Shadow (tightly hugging sandals)
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(kidBaseX, kidBaseY - 14, kidW * 0.38, 14, 0, 0, Math.PI * 2);
  const kShadow = ctx.createRadialGradient(kidBaseX, kidBaseY - 14, 6, kidBaseX, kidBaseY - 14, kidW * 0.38);
  kShadow.addColorStop(0, 'rgba(12, 6, 0, 0.65)');
  kShadow.addColorStop(0.5, 'rgba(12, 6, 0, 0.25)');
  kShadow.addColorStop(1, 'rgba(12, 6, 0, 0)');
  ctx.fillStyle = kShadow;
  ctx.fill();
  ctx.restore();

  // Draw Kid Sprite with Lip-Sync Mouth Swapping
  ctx.save();
  ctx.translate(kidBaseX, kidBaseY);
  ctx.rotate(kidTilt);

  if (kidSprite && kidSprite.width > 0) {
    ctx.drawImage(kidSprite, -kidW / 2, -kidH + kidBounce, kidW, kidH);
  }

  // Comical Shock FX over Kid in Scene 5 ("নিজেরাই নিজেরাই বিয়া করছো??!!")
  if (isShocked) {
    ctx.save();
    const headY = -kidH + kidBounce + 120;

    // Shock sweat drops
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(kidW / 2 + 18, headY + 30, 10, 0, Math.PI * 2);
    ctx.arc(kidW / 2 + 30, headY + 50, 7, 0, Math.PI * 2);
    ctx.fill();

    // Comic shock exclamation marks floating
    ctx.font = 'bold 72px sans-serif';
    ctx.fillStyle = '#facc15';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 7;
    ctx.textAlign = 'center';
    ctx.strokeText('?!', 0, headY - 45);
    ctx.fillText('?!', 0, headY - 45);

    // Shock vibration lines
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-kidW / 2 - 20, headY - 20);
    ctx.lineTo(-kidW / 2 - 45, headY - 40);
    ctx.moveTo(kidW / 2 + 20, headY - 20);
    ctx.lineTo(kidW / 2 + 45, headY - 40);
    ctx.stroke();

    ctx.restore();
  }

  ctx.restore();
  ctx.restore();
}

// ----------------------------------------------------------------------------
// Dialogue & Speech Bubbles System
// ----------------------------------------------------------------------------
function drawDialogueBeat(ctx, W, H, t) {
  // Scene 1 (0.0s - 2.0s): Kid asks dad
  if (t >= 0.05 && t < 2.0) {
    drawSpeechBubble(ctx, 700, 840, 'বাবা, তুমি কাকে বিয়া করছো?', 'ছেলে 👦', '#ffffff', 'down', 740);
  }
  // Scene 2 (2.0s - 4.0s): Dad answers
  else if (t >= 2.0 && t < 4.0) {
    drawSpeechBubble(ctx, 400, 680, 'তোর মাকে!', 'বাবা 👨', '#fef08a', 'down', 360);
  }
  // Scene 3 (4.0s - 6.0s): Kid questions about mom
  else if (t >= 4.0 && t < 6.0) {
    drawSpeechBubble(ctx, 700, 840, 'মা কাকে বিয়া করছিলো?', 'ছেলে 👦', '#ffffff', 'down', 740);
  }
  // Scene 4 (6.0s - 8.0s): Dad proudly answers
  else if (t >= 6.0 && t < 8.0) {
    drawSpeechBubble(ctx, 400, 680, 'আমাকে!', 'বাবা 👨', '#fef08a', 'down', 360);
  }
  // Scene 5 (8.0s - 10.0s): The hilarious shock twist!
  else if (t >= 8.0 && t < 10.0) {
    drawSpeechBubble(ctx, 540, 660, 'নিজেরাই নিজেরাই বিয়া করছো??!!', 'ছেলে 😱', '#ffe4e6', 'down', 720);
  }
}

// ----------------------------------------------------------------------------
// DipuToons Header Watermark
// ----------------------------------------------------------------------------
function drawHeaderBrand(ctx, W, H, t) {
  ctx.save();
  const cardW = 340;
  const cardH = 76;
  const cardX = W / 2 - cardW / 2;
  const cardY = 48;

  // Modern pill badge
  ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
  ctx.shadowBlur = 14;
  drawRoundRect(ctx, cardX, cardY, cardW, cardH, 38, '#1e1b18', '#facc15', 3);
  ctx.shadowColor = 'transparent';

  // Circular clipped mini logo
  if (logoLoaded && logoImg.width > 0) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cardX + 44, cardY + cardH / 2, 28, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(logoImg, cardX + 16, cardY + cardH / 2 - 28, 56, 56);
    ctx.restore();
  }

  // DipuToons Text
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
// Official DipuToons 3D Animated Outro Card (10.0s - 11.17s)
// ----------------------------------------------------------------------------
function drawOutroCard(ctx, W, H, t) {
  if (t < 10.0) return;

  const progress = clampVal((t - 10.0) / 0.35, 0, 1);
  const alpha = easeInOut(progress);

  ctx.save();
  ctx.fillStyle = `rgba(15, 12, 10, ${alpha * 0.94})`;
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2;
  const cy = H / 2 - 60;
  const scale = 0.85 + alpha * 0.15;

  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  // 1. Center Circular Logo Badge with Gold Glow
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

    // Gold circular border ring
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

  // 1. Draw 3D Living Room Environment
  drawLivingRoom3D(ctx, W, H, t);

  // 2. Draw 3D Rigged Characters (Father & Kid)
  drawCharacters3D(ctx, W, H, t);

  // 3. Draw Dialogue Speech Bubbles
  drawDialogueBeat(ctx, W, H, t);

  // 4. Draw DipuToons Header Badge
  drawHeaderBrand(ctx, W, H, t);

  // 5. Draw 3D Animated Outro Card
  drawOutroCard(ctx, W, H, t);
}
