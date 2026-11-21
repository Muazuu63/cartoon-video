// ============================================================================
// DipuToons - Premium 3D Cartoon Animation Engine
// Episode: "ভিখারি নাকি ভগবান?!" (Beggar vs Bhagwan 3D Comedy)
// Characters: দীপু ও ভিখারি (Dipu & The Prophet Beggar - 3D Pixar Style)
// Channel: DipuToons (ছোট্ট কার্টুন, বড় হাসি!)
// ============================================================================

const DURATION = CONFIG.duration;
const BEATS = CONFIG.scenes;

// ----------------------------------------------------------------------------
// Asset Preloading (Official DipuToons Logo, 3D Beggar, 3D Dipu, Dipu Pray)
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

window.PRELOAD_ASSETS = () => {
  const promises = [];
  const list = [
    [logoImg, CONFIG.logo_data],
    [beggarClosedImg, CONFIG.beggar_closed_3d],
    [beggarOpenImg, CONFIG.beggar_open_3d],
    [dipuClosedImg, CONFIG.dipu_closed_3d],
    [dipuOpenImg, CONFIG.dipu_open_3d],
    [dipuPrayImg, CONFIG.dipu_pray_3d]
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
    const badgeW = 140;
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
  ctx.font = 'bold 36px "Noto Sans Bengali", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y + 4);

  ctx.restore();
}

// ----------------------------------------------------------------------------
// 3D City Apartment & Street Background
// ----------------------------------------------------------------------------
function drawCityStreet3D(ctx, W, H, t) {
  ctx.save();

  // 1. Sky Gradient with Morning Sunlight
  const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.6);
  skyGrad.addColorStop(0, '#60a5fa');
  skyGrad.addColorStop(0.4, '#93c5fd');
  skyGrad.addColorStop(1, '#e0f2fe');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, H);

  // Soft Clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.beginPath();
  ctx.arc(220, 140, 50, 0, Math.PI * 2);
  ctx.arc(270, 130, 65, 0, Math.PI * 2);
  ctx.arc(330, 145, 55, 0, Math.PI * 2);
  ctx.arc(W - 200, 180, 60, 0, Math.PI * 2);
  ctx.arc(W - 140, 170, 75, 0, Math.PI * 2);
  ctx.fill();

  // 2. High-Rise Modern Apartment Tower (Background Perspective)
  const bldgX = 140, bldgY = 120, bldgW = 480, bldgH = 950;
  ctx.fillStyle = '#dbeafe';
  ctx.fillRect(bldgX, bldgY, bldgW, bldgH);

  // Balconies & Windows pattern
  ctx.fillStyle = '#93c5fd';
  for (let r = bldgY + 40; r < bldgY + bldgH - 60; r += 70) {
    for (let c = bldgX + 30; c < bldgX + bldgW - 50; c += 80) {
      drawRoundRect(ctx, c, r, 55, 45, 6, '#bfdbfe', '#60a5fa', 2);
    }
  }

  // 3. Green Trees & Foliage (Midground)
  ctx.fillStyle = '#15803d';
  ctx.beginPath();
  ctx.arc(80, 850, 160, 0, Math.PI * 2);
  ctx.arc(220, 800, 180, 0, Math.PI * 2);
  ctx.arc(W - 180, 820, 200, 0, Math.PI * 2);
  ctx.arc(W - 40, 860, 160, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#166534';
  ctx.beginPath();
  ctx.arc(140, 870, 170, 0, Math.PI * 2);
  ctx.arc(W - 110, 870, 180, 0, Math.PI * 2);
  ctx.fill();

  // 4. Modern Residential Apartment Wall & Gate
  const wallY = 960;
  // Boundary Wall
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(0, wallY, W, 220);
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(0, wallY + 200, W, 20); // bottom curb

  // Modern decorative gate panels
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 4;
  for (let x = 60; x < W - 60; x += 60) {
    ctx.beginPath();
    ctx.moveTo(x, wallY + 20);
    ctx.lineTo(x, wallY + 190);
    ctx.stroke();
  }

  // 5. Paved Concrete Sidewalk & Ground
  const groundY = 1180;
  const pavementGrad = ctx.createLinearGradient(0, groundY, 0, H);
  pavementGrad.addColorStop(0, '#94a3b8');
  pavementGrad.addColorStop(0.3, '#64748b');
  pavementGrad.addColorStop(1, '#334155');
  ctx.fillStyle = pavementGrad;
  ctx.fillRect(0, groundY, W, H - groundY);

  // Sidewalk perspective lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 3;
  for (let i = -200; i < W + 400; i += 180) {
    ctx.beginPath();
    ctx.moveTo(i, groundY);
    ctx.lineTo(i + (i - W / 2) * 0.9, H);
    ctx.stroke();
  }

  // Soft Ambient Occlusion shadow at curb
  const aoGrad = ctx.createLinearGradient(0, groundY, 0, groundY + 80);
  aoGrad.addColorStop(0, 'rgba(0, 0, 0, 0.5)');
  aoGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = aoGrad;
  ctx.fillRect(0, groundY, W, 80);

  ctx.restore();
}

// ----------------------------------------------------------------------------
// 3D Characters Rendering & Lip-Sync Animation
// ----------------------------------------------------------------------------
function drawCharacters3D(ctx, W, H, t) {
  const groundY = 1680;

  // Climax Camera Logic (22.0s to 31.25s)
  let zoom = 1.0;
  let panX = 0;
  let panY = 0;

  if (t >= 22.0 && t < 31.25) {
    const p = clampVal((t - 22.0) / 0.5, 0, 1);
    zoom = 1.0 + easeInOut(p) * 0.12;
    panY = -easeInOut(p) * 60;
  }

  ctx.save();
  ctx.translate(W / 2 + panX, H / 2 + panY);
  ctx.scale(zoom, zoom);
  ctx.translate(-W / 2, -H / 2);

  // --------------------------------------------------------------------------
  // 1. Beggar (Screen Left)
  // --------------------------------------------------------------------------
  const beggarBaseX = 350;
  const beggarBaseY = groundY;
  const beggarH = 920;
  const beggarW = (beggarH * 896) / 1200; // proportional ratio ~687px

  const isBeggarSpeaking = (t >= 0.0 && t < 2.5) || (t >= 5.0 && t < 9.5);
  // Natural mouth flap:
  const isBeggarMouthOpen = isBeggarSpeaking && (Math.sin(t * 14.0) > -0.15);
  const beggarSprite = (isBeggarMouthOpen && beggarOpenLoaded) ? beggarOpenImg : (beggarClosedLoaded ? beggarClosedImg : beggarClosedImg);
  const beggarNod = isBeggarSpeaking ? Math.sin(t * 4.0) * 0.02 : 0;

  // Climax Divine Glow behind Beggar (22s to 31.25s)
  if (t >= 22.0 && t < 31.25) {
    ctx.save();
    const glowR = 260 + Math.sin(t * 4.0) * 20;
    const glowGrad = ctx.createRadialGradient(beggarBaseX, beggarBaseY - beggarH * 0.6, 20, beggarBaseX, beggarBaseY - beggarH * 0.6, glowR);
    glowGrad.addColorStop(0, 'rgba(250, 204, 21, 0.65)');
    glowGrad.addColorStop(0.5, 'rgba(250, 204, 21, 0.25)');
    glowGrad.addColorStop(1, 'rgba(250, 204, 21, 0)');
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(beggarBaseX, beggarBaseY - beggarH * 0.6, glowR, 0, Math.PI * 2);
    ctx.fill();

    // Divine halo ring
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.ellipse(beggarBaseX, beggarBaseY - beggarH * 0.95, 80, 20, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // Floor Contact Shadow
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(beggarBaseX, beggarBaseY - 14, beggarW * 0.32, 18, 0, 0, Math.PI * 2);
  const bShadow = ctx.createRadialGradient(beggarBaseX, beggarBaseY - 14, 8, beggarBaseX, beggarBaseY - 14, beggarW * 0.32);
  bShadow.addColorStop(0, 'rgba(10, 15, 25, 0.65)');
  bShadow.addColorStop(0.5, 'rgba(10, 15, 25, 0.25)');
  bShadow.addColorStop(1, 'rgba(10, 15, 25, 0)');
  ctx.fillStyle = bShadow;
  ctx.fill();
  ctx.restore();

  // Draw Beggar Sprite (Steady grounded stance)
  ctx.save();
  ctx.translate(beggarBaseX, beggarBaseY);
  ctx.rotate(beggarNod);

  if (beggarSprite && beggarSprite.width > 0) {
    ctx.drawImage(beggarSprite, -beggarW / 2, -beggarH, beggarW, beggarH);
  }
  ctx.restore();

  // --------------------------------------------------------------------------
  // 2. Dipu (Screen Right)
  // --------------------------------------------------------------------------
  const dipuBaseX = 730;
  const dipuBaseY = groundY;
  const dipuH = 920;
  const dipuW = (dipuH * 896) / 1200; // proportional ratio ~687px

  const isDipuSpeaking = (t >= 2.5 && t < 5.0) || (t >= 9.5 && t < 13.5);
  const isBreakupShock = (t >= 13.5 && t < 22.0);
  const isPrayingClimax = (t >= 22.0 && t < 31.25);

  const isDipuMouthOpen = isDipuSpeaking && (Math.sin(t * 14.0) > -0.15);
  let dipuSprite = (isDipuMouthOpen && dipuOpenLoaded) ? dipuOpenImg : (dipuClosedLoaded ? dipuClosedImg : dipuClosedImg);

  // In Climax (22.0s - 31.25s), switch to Gratitude Namaste Pose!
  if (isPrayingClimax && dipuPrayLoaded) {
    dipuSprite = dipuPrayImg;
  }

  const dipuNod = isDipuSpeaking ? Math.sin(t * 4.5) * 0.02 : 0;
  const dipuTilt = isPrayingClimax ? -0.06 : (isDipuSpeaking ? -0.03 : 0);

  // Floor Contact Shadow
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(dipuBaseX, dipuBaseY - 14, dipuW * 0.32, 18, 0, 0, Math.PI * 2);
  const dShadow = ctx.createRadialGradient(dipuBaseX, dipuBaseY - 14, 8, dipuBaseX, dipuBaseY - 14, dipuW * 0.32);
  dShadow.addColorStop(0, 'rgba(10, 15, 25, 0.65)');
  dShadow.addColorStop(0.5, 'rgba(10, 15, 25, 0.25)');
  dShadow.addColorStop(1, 'rgba(10, 15, 25, 0)');
  ctx.fillStyle = dShadow;
  ctx.fill();
  ctx.restore();

  // Draw Dipu Sprite (Steady grounded stance)
  ctx.save();
  ctx.translate(dipuBaseX, dipuBaseY);
  ctx.rotate(dipuTilt + dipuNod);

  if (dipuSprite && dipuSprite.width > 0) {
    ctx.drawImage(dipuSprite, -dipuW / 2, -dipuH, dipuW, dipuH);
  }

  // Dropping Coin Animation at 10.5s
  if (t >= 10.2 && t <= 12.0) {
    const p = (t - 10.2) / 1.0;
    if (p <= 1.0) {
      const coinX = -dipuW * 0.15 - p * 200;
      const coinY = -dipuH * 0.55 + p * 120 + Math.sin(p * Math.PI) * -40;
      ctx.save();
      ctx.fillStyle = '#facc15';
      ctx.strokeStyle = '#ca8a04';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(coinX, coinY, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  }

  // Girlfriend Breakup Call Icon Vibrating (13.5s - 22.0s)
  if (isBreakupShock) {
    ctx.save();
    const phoneX = dipuW * 0.18;
    const phoneY = -dipuH * 0.65;
    // Vibrating sound lines
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(phoneX + 40, phoneY, 24, -Math.PI * 0.3, Math.PI * 0.3);
    ctx.arc(phoneX + 54, phoneY, 36, -Math.PI * 0.3, Math.PI * 0.3);
    ctx.stroke();

    // Broken Heart Emoji
    ctx.font = '48px sans-serif';
    ctx.fillText('💔', phoneX + 60, phoneY - 30);
    ctx.restore();
  }

  ctx.restore();
  ctx.restore();
}

// ----------------------------------------------------------------------------
// Dialogue & Speech Bubbles System
// ----------------------------------------------------------------------------
function drawDialogueBeat(ctx, W, H, t) {
  // Scene 1 (0.0s - 2.5s): Beggar asks for money
  if (t >= 0.1 && t < 2.5) {
    drawSpeechBubble(ctx, 380, 680, 'ভাইয়া, কিছু টাকা দিন...', 'ভিখারি 🥣', '#ffffff', 'down', 360);
  }
  // Scene 2 (2.5s - 5.0s): Dipu dismisses
  else if (t >= 2.5 && t < 5.0) {
    drawSpeechBubble(ctx, 700, 640, 'আরে যা তো, সকাল সকাল মাথা খাস না!', 'দীপু 📱', '#fef08a', 'down', 720);
  }
  // Scene 3 (5.0s - 9.5s): Beggar predicts good news
  else if (t >= 5.0 && t < 9.5) {
    drawSpeechBubble(ctx, 380, 660, 'গরিবকে সাহায্য করুন, খুব শীঘ্রই সুখবর পাবেন!', 'ভিখারি 🥣', '#ffffff', 'down', 360);
  }
  // Scene 4 (9.5s - 13.5s): Dipu gives coin
  else if (t >= 9.5 && t < 13.5) {
    drawSpeechBubble(ctx, 700, 640, 'সত্যি?! এই নে!', 'দীপু 🪙', '#fef08a', 'down', 720);
  }
  // Scene 5 (13.5s - 22.0s): Girlfriend Breakup Message on Phone
  else if (t >= 13.5 && t < 22.0) {
    drawSpeechBubble(ctx, 540, 580, 'চিরদিনের জন্য চলে যাচ্ছি! পেপার্স পাঠালে সাইন করিস!', 'প্রেমিকা 💔', '#ffe4e6', 'down', 720);
  }
  // Scene 6 (22.0s - 31.25s): The Climax Banner - Beggar vs Bhagwan!
  else if (t >= 22.0 && t < 31.25) {
    ctx.save();
    const bx = W / 2;
    const by = 560;
    // Glowing celebratory banner
    ctx.shadowColor = 'rgba(250, 204, 21, 0.8)';
    ctx.shadowBlur = 24;
    drawRoundRect(ctx, bx - 380, by - 60, 760, 120, 28, '#0f172a', '#facc15', 5);
    ctx.shadowColor = 'transparent';

    ctx.fillStyle = '#facc15';
    ctx.font = 'bold 44px "Noto Sans Bengali", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ভিখারি ❌ ভগবান 🙌', bx, by - 10);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 24px "Noto Sans Bengali", sans-serif';
    ctx.fillText('মুক্তির চেয়ে বড় সুখবর আর হয় না! 😂', bx, by + 34);
    ctx.restore();
  }
}

// ----------------------------------------------------------------------------
// DipuToons Header Watermark
// ----------------------------------------------------------------------------
function drawHeaderBrand(ctx, W, H, t) {
  // Only show header during the main story (0 to 31.25s)
  if (t >= 31.25) return;

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
// DEDICATED DipuToons 3D Outro Card (Appears ONLY in the added 31.25s - 32.50s)
// ----------------------------------------------------------------------------
function drawOutroCard(ctx, W, H, t) {
  // STRICT RULE: Does NOT overlap main story! Only appears in the added extra time!
  if (t < 31.25) return;

  const progress = clampVal((t - 31.25) / 0.35, 0, 1);
  const alpha = easeInOut(progress);

  ctx.save();
  // Deep elegant backdrop
  ctx.fillStyle = `rgba(10, 15, 24, ${alpha * 0.96})`;
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2;
  const cy = H / 2 - 60;
  const scale = 0.85 + alpha * 0.15;

  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  // 1. Center Circular DipuToons Logo Badge with Gold Glow
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

  // 1. Draw 3D City Street Environment
  drawCityStreet3D(ctx, W, H, t);

  // 2. Draw 3D Characters with Lip Sync
  drawCharacters3D(ctx, W, H, t);

  // 3. Draw Dialogue Speech Bubbles
  drawDialogueBeat(ctx, W, H, t);

  // 4. Draw Header Watermark
  drawHeaderBrand(ctx, W, H, t);

  // 5. Draw Dedicated Outro Card (31.25s - 32.50s only)
  drawOutroCard(ctx, W, H, t);
}
