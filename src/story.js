// ============================================================================
// DipuToons - 2D Cartoon Animation Engine
// Episode: "কড়া পাহারা!" (Strict Guard Dog Comedy)
// Characters: কুকুর (টমি) ও রাজমিস্ত্রি (2D Desi Cartoon Style)
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

const streetBgImg = new Image();
let streetBgLoaded = false;
streetBgImg.onload = () => { streetBgLoaded = true; };

const dogOpenImg = new Image();
let dogOpenLoaded = false;
dogOpenImg.onload = () => { dogOpenLoaded = true; };

const dogClosedImg = new Image();
let dogClosedLoaded = false;
dogClosedImg.onload = () => { dogClosedLoaded = true; };

const workerImg = new Image();
let workerLoaded = false;
workerImg.onload = () => { workerLoaded = true; };

const workerShockedImg = new Image();
let workerShockedLoaded = false;
workerShockedImg.onload = () => { workerShockedLoaded = true; };

window.PRELOAD_ASSETS = () => {
  const promises = [];
  const list = [
    [logoImg, CONFIG.logo_data],
    [streetBgImg, CONFIG.street_2d_bg],
    [dogOpenImg, CONFIG.dog_open_2d],
    [dogClosedImg, CONFIG.dog_closed_2d],
    [workerImg, CONFIG.worker_2d],
    [workerShockedImg, CONFIG.worker_shocked_2d]
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

function drawRoundRect(ctx, x, y, w, h, r, fillColor, strokeColor, strokeWidth) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }
  if (strokeColor && strokeWidth) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
  }
}

// ----------------------------------------------------------------------------
// 1. Draw 2D Street Environment
// ----------------------------------------------------------------------------
function drawStreet2D(ctx, W, H, t) {
  if (streetBgLoaded && streetBgImg.width > 0) {
    // Subtle breathing camera scale
    const zoom = 1.0 + Math.sin(t * 0.4) * 0.015;
    ctx.save();
    ctx.translate(W / 2, H / 2);
    ctx.scale(zoom, zoom);
    ctx.drawImage(streetBgImg, -W / 2, -H / 2, W, H);
    ctx.restore();
  } else {
    // Fallback vibrant sky & road
    const sky = ctx.createLinearGradient(0, 0, 0, H * 0.7);
    sky.addColorStop(0, '#38bdf8');
    sky.addColorStop(1, '#fde68a');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#64748b';
    ctx.fillRect(0, H * 0.7, W, H * 0.3);
  }

  // Soft warm ambient sunlight vignette
  const sunGlow = ctx.createRadialGradient(W * 0.8, H * 0.15, 20, W * 0.8, H * 0.15, 600);
  sunGlow.addColorStop(0, 'rgba(254, 240, 138, 0.25)');
  sunGlow.addColorStop(1, 'rgba(254, 240, 138, 0)');
  ctx.fillStyle = sunGlow;
  ctx.fillRect(0, 0, W, H);
}

// ----------------------------------------------------------------------------
// 2. Draw 2D Characters (Dog & Worker with Lip Sync & Comedy)
// ----------------------------------------------------------------------------
function drawCharacters2D(ctx, W, H, t) {
  const groundY = 1600;

  // --- Character 1: DOG (Left Foreground) ---
  const dogBaseX = 330;
  const dogBaseY = groundY;
  const dogScale = 0.88;
  const dogW = 876 * dogScale;
  const dogH = 664 * dogScale;

  // Lip-sync state for Dog
  // Dog speaks during:
  // 0.0s - 3.0s ("Bhaiya, bahut achha kaam kar rahe ho...")
  // 6.0s - 8.5s ("Mummy boli hai aap logo ko dekhte rehna...")
  // 8.5s - 10.5s ("...kuch chura na lein kahin! 😆")
  const isDogSpeaking = (t >= 0.1 && t <= 2.95) || (t >= 6.0 && t <= 8.4) || (t >= 8.5 && t <= 10.45);
  const dogMouthOpen = isDogSpeaking && (Math.sin(t * 15.0) > -0.15);

  // Dog animation bobs
  let dogBobY = Math.sin(t * 3.0) * 4;
  let dogAngle = 0;
  if (isDogSpeaking) {
    dogBobY += Math.sin(t * 14.0) * 6;
    dogAngle = Math.sin(t * 7.0) * 0.025;
  }
  // Subtle tail wag / joy bounce at punchline (8.5 - 10.5)
  if (t >= 8.5 && t <= 10.5) {
    dogBobY += Math.sin(t * 18.0) * 5;
    dogAngle = Math.sin(t * 10.0) * 0.04;
  }

  // Soft ground shadow for Dog
  ctx.save();
  ctx.fillStyle = 'rgba(20, 25, 30, 0.45)';
  ctx.beginPath();
  ctx.ellipse(dogBaseX, dogBaseY + 10, dogW * 0.38, 30, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Draw Dog Sprite
  ctx.save();
  ctx.translate(dogBaseX, dogBaseY + dogBobY);
  ctx.rotate(dogAngle);
  const dogImgToDraw = (dogMouthOpen && dogOpenLoaded) ? dogOpenImg : (dogClosedLoaded ? dogClosedImg : dogOpenImg);
  if (dogImgToDraw && dogImgToDraw.width > 0) {
    ctx.drawImage(dogImgToDraw, -dogW / 2, -dogH, dogW, dogH);
  }
  ctx.restore();

  // --- Character 2: WORKER (Right Midground) ---
  const workerBaseX = 740;
  const workerBaseY = groundY + 30;
  const workerScale = 0.92;
  const workerW = 913 * workerScale;
  const workerH = 838 * workerScale;

  // Worker state:
  // 0.0s - 3.0s: Listening & shoveling sand gently
  // 3.0s - 6.0s: Speaking proudly ("Haan woh toh pata hai hum log karte hain...")
  // 6.0s - 8.5s: Listening curiously
  // 8.5s - 10.5s: SHOCKED & DUMBSTRUCK! ("Kyun?! ...kuch chura na lein!")
  const isWorkerSpeaking = (t >= 3.05 && t <= 5.95);
  const isWorkerShocked = (t >= 8.45 && t <= 10.5);

  let workerBobY = Math.sin(t * 2.8) * 5;
  let workerAngle = 0;
  let workerShakeX = 0;

  if (isWorkerSpeaking) {
    workerBobY += Math.sin(t * 12.0) * 7;
    workerAngle = Math.sin(t * 6.0) * 0.02;
  }

  if (isWorkerShocked) {
    // Extreme cartoon vibration shake
    workerShakeX = (Math.random() - 0.5) * 12;
    workerBobY += (Math.random() - 0.5) * 8;
  }

  // Soft ground shadow for Worker
  ctx.save();
  ctx.fillStyle = 'rgba(20, 25, 30, 0.45)';
  ctx.beginPath();
  ctx.ellipse(workerBaseX, workerBaseY + 12, workerW * 0.36, 32, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Draw Worker Sprite
  ctx.save();
  ctx.translate(workerBaseX + workerShakeX, workerBaseY + workerBobY);
  ctx.rotate(workerAngle);

  const workerImgToDraw = (isWorkerShocked && workerShockedLoaded) ? workerShockedImg : workerImg;
  if (workerImgToDraw && workerImgToDraw.width > 0) {
    ctx.drawImage(workerImgToDraw, -workerW / 2, -workerH, workerW, workerH);
  }
  ctx.restore();

  // --- Visual FX for Worker Shock (8.5s - 10.5s) ---
  if (isWorkerShocked) {
    const shockTime = t - 8.45;
    ctx.save();
    // Flying sweat beads (💦)
    const sweatCount = 4;
    for (let i = 0; i < sweatCount; i++) {
      const angle = -Math.PI * 0.2 - (i * 0.35);
      const dist = 70 + ((shockTime * 320 + i * 45) % 180);
      const sx = workerBaseX - 30 + Math.cos(angle) * dist;
      const sy = (workerBaseY - workerH * 0.8) + Math.sin(angle) * dist;
      const size = 12 + Math.sin(shockTime * 10 + i) * 3;

      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(sx, sy, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    // Shock impact lines around head
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    for (let j = 0; j < 5; j++) {
      const a = -Math.PI * 0.85 + (j * 0.42);
      const r1 = 180 + Math.sin(t * 30 + j) * 15;
      const r2 = r1 + 35;
      const hx = workerBaseX;
      const hy = workerBaseY - workerH * 0.78;
      ctx.beginPath();
      ctx.moveTo(hx + Math.cos(a) * r1, hy + Math.sin(a) * r1);
      ctx.lineTo(hx + Math.cos(a) * r2, hy + Math.sin(a) * r2);
      ctx.stroke();
    }
    ctx.restore();
  }
}

// ----------------------------------------------------------------------------
// 3. Dialogue Speech Bubbles (High-contrast Bengali Text)
// ----------------------------------------------------------------------------
function drawDialogueBeat(ctx, W, H, t) {
  // During outro (t >= 10.5), do not draw dialogue bubbles
  if (t >= 10.5) return;

  // Scene 1: 0.0s - 3.0s (Dog speaks)
  if (t < 3.0) {
    const bx = 330;
    const by = 860;
    const bw = 560;
    const bh = 145;

    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = 18;
    drawRoundRect(ctx, bx - bw / 2, by - bh / 2, bw, bh, 28, '#ffffff', '#f59e0b', 5);

    // Pointer tail to Dog
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(bx - 40, by + bh / 2 - 2);
    ctx.lineTo(bx - 10, by + bh / 2 + 35);
    ctx.lineTo(bx + 20, by + bh / 2 - 2);
    ctx.closePath();
    ctx.fill();
    ctx.shadowColor = 'transparent';

    ctx.fillStyle = '#d97706';
    ctx.font = 'bold 28px "Noto Sans Bengali", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🐕 টমি (মিষ্টি সুরে):', bx, by - 24);

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 32px "Noto Sans Bengali", sans-serif';
    ctx.fillText('"ভাইয়া, আপনারা খুব সুন্দর কাজ করছেন!"', bx, by + 28);
    ctx.restore();
  }
  // Scene 2: 3.0s - 6.0s (Worker speaks proudly)
  else if (t >= 3.0 && t < 6.0) {
    const bx = 710;
    const by = 780;
    const bw = 600;
    const bh = 175;

    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = 18;
    drawRoundRect(ctx, bx - bw / 2, by - bh / 2, bw, bh, 28, '#ffffff', '#10b981', 5);

    // Pointer tail to Worker
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(bx + 20, by + bh / 2 - 2);
    ctx.lineTo(bx + 60, by + bh / 2 + 40);
    ctx.lineTo(bx + 80, by + bh / 2 - 2);
    ctx.closePath();
    ctx.fill();
    ctx.shadowColor = 'transparent';

    ctx.fillStyle = '#059669';
    ctx.font = 'bold 28px "Noto Sans Bengali", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('👷‍♂️ রাজমিস্ত্রি (গর্বের সাথে):', bx, by - 38);

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 30px "Noto Sans Bengali", sans-serif';
    ctx.fillText('"হ্যাঁ ভাই, তা তো জানি,', bx, by + 6);
    ctx.fillText('আমরা সবসময়ই সেরা কাজ করি!" 😎', bx, by + 48);
    ctx.restore();
  }
  // Scene 3: 6.0s - 8.5s (Dog whispers mom's order)
  else if (t >= 6.0 && t < 8.5) {
    const bx = 350;
    const by = 840;
    const bw = 590;
    const bh = 165;

    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = 18;
    drawRoundRect(ctx, bx - bw / 2, by - bh / 2, bw, bh, 28, '#ffffff', '#f59e0b', 5);

    // Pointer tail to Dog
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(bx - 40, by + bh / 2 - 2);
    ctx.lineTo(bx - 10, by + bh / 2 + 35);
    ctx.lineTo(bx + 20, by + bh / 2 - 2);
    ctx.closePath();
    ctx.fill();
    ctx.shadowColor = 'transparent';

    ctx.fillStyle = '#d97706';
    ctx.font = 'bold 28px "Noto Sans Bengali", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🐕 টমি (কড়া পাহারা):', bx, by - 32);

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 29px "Noto Sans Bengali", sans-serif';
    ctx.fillText('"আসলে মাম্মি বলেছে আপনাদের ওপর', bx, by + 12);
    ctx.fillText('কড়া নজর রাখতে..." 👀', bx, by + 50);
    ctx.restore();
  }
  // Scene 4: 8.5s - 10.5s (Dog punchline & Worker shock!)
  else if (t >= 8.5 && t < 10.5) {
    // Dog's laughing punchline bubble
    const bx = 340;
    const by = 820;
    const bw = 580;
    const bh = 150;

    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 20;
    drawRoundRect(ctx, bx - bw / 2, by - bh / 2, bw, bh, 28, '#ffffff', '#ef4444', 5);

    // Pointer tail to Dog
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(bx - 40, by + bh / 2 - 2);
    ctx.lineTo(bx - 10, by + bh / 2 + 35);
    ctx.lineTo(bx + 20, by + bh / 2 - 2);
    ctx.closePath();
    ctx.fill();
    ctx.shadowColor = 'transparent';

    ctx.fillStyle = '#dc2626';
    ctx.font = 'bold 28px "Noto Sans Bengali", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🐕 টমি (হেসে কুটি কুটি):', bx, by - 26);

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 31px "Noto Sans Bengali", sans-serif';
    ctx.fillText('"...যাতে কিছু চুরি না করে নিয়ে যান! 😆"', bx, by + 26);
    ctx.restore();

    // Worker's reaction shock callout
    const rx = 760;
    const ry = 680;
    const pulse = 1.0 + Math.sin(t * 25.0) * 0.08;

    ctx.save();
    ctx.translate(rx, ry);
    ctx.scale(pulse, pulse);
    ctx.shadowColor = 'rgba(239, 68, 68, 0.8)';
    ctx.shadowBlur = 24;
    drawRoundRect(ctx, -140, -45, 280, 90, 24, '#fef08a', '#dc2626', 4);
    ctx.shadowColor = 'transparent';

    ctx.fillStyle = '#991b1b';
    ctx.font = 'bold 36px "Noto Sans Bengali", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('কীহ্?! 😱💥', 0, 0);
    ctx.restore();
  }
}

// ----------------------------------------------------------------------------
// 4. DipuToons Header Watermark (Hidden during outro)
// ----------------------------------------------------------------------------
function drawHeaderBrand(ctx, W, H, t) {
  if (t >= 10.5) return;

  ctx.save();
  const cardW = 340;
  const cardH = 76;
  const cardX = W / 2 - cardW / 2;
  const cardY = 52;

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
// 5. DEDICATED DipuToons Outro Card (Appears ONLY in the added 10.50s - 12.00s)
// ----------------------------------------------------------------------------
function drawOutroCard(ctx, W, H, t) {
  if (t < 10.5) return;

  const progress = clampVal((t - 10.5) / 0.35, 0, 1);
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

  // 1. Draw 2D Street Environment
  drawStreet2D(ctx, W, H, t);

  // 2. Draw 2D Characters with Lip Sync & Comedy Reactions
  drawCharacters2D(ctx, W, H, t);

  // 3. Draw Dialogue Speech Bubbles
  drawDialogueBeat(ctx, W, H, t);

  // 4. Draw Header Watermark
  drawHeaderBrand(ctx, W, H, t);

  // 5. Draw Dedicated Outro Card (10.50s - 12.00s only)
  drawOutroCard(ctx, W, H, t);
}
