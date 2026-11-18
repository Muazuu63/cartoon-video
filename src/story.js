
// Full-Color 2D Cartoon Animation Engine - The Cursed Bed & The Clever Uncle
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

// ----------------------------------------------------
// Bedroom & Cursed Bed Background
// ----------------------------------------------------
function drawBedroomBG(ctx, W, H, t, floorY, isSpooky, spookyProgress) {
  // Wall color shifts to eerie twilight if spooky
  const wallGrad = ctx.createLinearGradient(0, 0, 0, floorY);
  if (isSpooky) {
    const sDark = Math.min(1, spookyProgress);
    wallGrad.addColorStop(0, `rgb(${Math.round(230 - sDark * 120)}, ${Math.round(240 - sDark * 130)}, ${Math.round(250 - sDark * 100)})`);
    wallGrad.addColorStop(1, `rgb(${Math.round(180 - sDark * 110)}, ${Math.round(200 - sDark * 120)}, ${Math.round(220 - sDark * 90)})`);
  } else {
    wallGrad.addColorStop(0, '#fef9e7');
    wallGrad.addColorStop(1, '#fdebd0');
  }
  ctx.fillStyle = wallGrad;
  ctx.fillRect(0, 0, W, H);

  // Floor
  const floorGrad = ctx.createLinearGradient(0, floorY, 0, H);
  floorGrad.addColorStop(0, '#a0522d');
  floorGrad.addColorStop(1, '#6e2c00');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, floorY, W, H - floorY);

  // Wooden baseboard
  drawRoundRect(ctx, 0, floorY - 14, W, 14, 0, '#ffffff', '#2c3e50', 2.5);

  // Bedroom Window (Moonlight or daylight)
  const winW = W > H ? 240 : 180;
  const winH = W > H ? 280 : 300;
  const winX = W > H ? 100 : 30;
  const winY = W > H ? 80 : 220;

  drawRoundRect(ctx, winX - 8, winY - 8, winW + 16, winH + 16, 6, '#ffffff', '#2c3e50', 3.5);
  ctx.save();
  ctx.beginPath(); ctx.rect(winX, winY, winW, winH); ctx.clip();
  const skyGrad = ctx.createLinearGradient(winX, winY, winX, winY + winH);
  if (isSpooky) {
    skyGrad.addColorStop(0, '#1a252f');
    skyGrad.addColorStop(1, '#2c3e50');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(winX, winY, winW, winH);
    // Glowing Moon
    drawCircle(ctx, winX + winW - 50, winY + 60, 26, '#f9e79f', '#f1c40f', 2);
  } else {
    skyGrad.addColorStop(0, '#5dade2');
    skyGrad.addColorStop(1, '#aed6f1');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(winX, winY, winW, winH);
    drawCircle(ctx, winX + winW - 50, winY + 60, 24, '#f39c12', null);
  }
  ctx.restore();
  // Window frame cross
  ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(winX + winW / 2, winY); ctx.lineTo(winX + winW / 2, winY + winH);
  ctx.moveTo(winX, winY + winH * 0.45); ctx.lineTo(winX + winW, winY + winH * 0.45);
  ctx.stroke();

  // Curtains
  ctx.fillStyle = '#9b59b6'; ctx.strokeStyle = '#6c3483'; ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(winX - 12, winY - 10); ctx.lineTo(winX + 35, winY - 10);
  ctx.quadraticCurveTo(winX + 15, winY + winH * 0.5, winX + 40, winY + winH + 10);
  ctx.lineTo(winX - 18, winY + winH + 10);
  ctx.closePath(); ctx.fill(); ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(winX + winW + 12, winY - 10); ctx.lineTo(winX + winW - 35, winY - 10);
  ctx.quadraticCurveTo(winX + winW - 15, winY + winH * 0.5, winX + winW - 40, winY + winH + 10);
  ctx.lineTo(winX + winW + 18, winY + winH + 10);
  ctx.closePath(); ctx.fill(); ctx.stroke();

  // Spooky eerie mist/shadow vignette
  if (isSpooky && spookyProgress > 0) {
    const mistAlpha = Math.min(0.45, spookyProgress * 0.45);
    ctx.fillStyle = `rgba(38, 14, 56, ${mistAlpha})`;
    ctx.fillRect(0, 0, W, H);
  }
}

// ----------------------------------------------------
// The Bed (বিছানা)
// ----------------------------------------------------
function drawBed(ctx, bedX, bedY, bedW, isSpooky, spookyProgress) {
  ctx.save();
  // Bed Headboard (Left side)
  drawRoundRect(ctx, bedX - 16, bedY - 140, 24, 160, 6, '#6e2c00', '#3e1b00', 4);
  drawCircle(ctx, bedX - 4, bedY - 150, 12, '#873600', '#3e1b00', 3);

  // Footboard (Right side)
  drawRoundRect(ctx, bedX + bedW - 8, bedY - 90, 20, 110, 6, '#6e2c00', '#3e1b00', 4);
  drawCircle(ctx, bedX + bedW + 2, bedY - 98, 10, '#873600', '#3e1b00', 3);

  // Bed Base / Frame
  drawRoundRect(ctx, bedX, bedY - 25, bedW, 35, 6, '#7e3805', '#3e1b00', 4);

  // Bed Legs
  drawRoundRect(ctx, bedX + 10, bedY + 8, 16, 25, 4, '#542403', '#2c3e50', 2.5);
  drawRoundRect(ctx, bedX + bedW - 26, bedY + 8, 16, 25, 4, '#542403', '#2c3e50', 2.5);

  // Mattress
  const matY = bedY - 55;
  drawRoundRect(ctx, bedX + 4, matY, bedW - 8, 34, 8, '#ffffff', '#2c3e50', 3.5);

  // Colorful Bedsheet / Blanket (Red & Gold / Spooky tinted)
  const sheetColor = isSpooky ? `rgb(${Math.round(231 - spookyProgress * 100)}, 76, 60)` : '#e74c3c';
  drawRoundRect(ctx, bedX + 25, matY - 4, bedW - 35, 34, 6, sheetColor, '#922b21', 3.5);
  // Sheet floral / diamond pattern
  ctx.strokeStyle = '#f1c40f'; ctx.lineWidth = 2;
  for (let sx = bedX + 60; sx < bedX + bedW - 40; sx += 45) {
    ctx.strokeRect(sx, matY + 4, 18, 18);
  }

  // Soft Fluffy Pillow
  drawRoundRect(ctx, bedX + 14, matY - 26, 75, 36, 12, '#fcf3cf', '#b7950b', 3);

  ctx.restore();
}

// ----------------------------------------------------
// The Cat on the Bed (বেড়াল)
// ----------------------------------------------------
function drawCat(ctx, x, y, s, t, stage, progress) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  const outline = '#1f1a17';

  // If cat flees (Stage: 'flees')
  if (stage === 'flees') {
    // Leaping off bed in wild panic!
    const jumpProgress = Math.min(1, progress);
    ctx.translate(jumpProgress * 320, -Math.sin(jumpProgress * Math.PI) * 120 + jumpProgress * 80);
    ctx.rotate(0.35);

    // Completely black panicking cat
    drawCircle(ctx, 0, -25, 22, '#1a1a1a', outline, 3.5); // Body
    drawCircle(ctx, 22, -40, 18, '#1a1a1a', outline, 3.5); // Head
    // Ears standing straight up
    ctx.fillStyle = '#1a1a1a'; ctx.strokeStyle = outline; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(15, -55); ctx.lineTo(22, -72); ctx.lineTo(28, -52); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(27, -50); ctx.lineTo(36, -68); ctx.lineTo(39, -48); ctx.closePath(); ctx.fill(); ctx.stroke();
    // Huge terror white eyes
    drawCircle(ctx, 24, -42, 6, '#ffffff', outline, 2);
    drawCircle(ctx, 33, -42, 6, '#ffffff', outline, 2);
    drawCircle(ctx, 25, -42, 2, '#1f1a17', null);
    drawCircle(ctx, 34, -42, 2, '#1f1a17', null);
    // Open screaming meow mouth
    ctx.fillStyle = '#ff7675';
    ctx.beginPath(); ctx.arc(32, -32, 5, 0, Math.PI); ctx.fill(); ctx.stroke();
    // Paws outstretched
    drawRoundRect(ctx, 20, -15, 26, 10, 4, '#1a1a1a', outline, 2.5);
    drawRoundRect(ctx, -20, -10, 22, 10, 4, '#1a1a1a', outline, 2.5);
    // Fluffed panic tail
    ctx.strokeStyle = '#1a1a1a'; ctx.lineWidth = 9;
    ctx.beginPath(); ctx.moveTo(-18, -25); ctx.quadraticCurveTo(-45, -55, -35, -75); ctx.stroke();

    ctx.restore();
    return;
  }

  // Fur color darkens from ginger orange to deep black!
  const darkVal = Math.min(1, Math.max(0, progress));
  const rFur = Math.round(230 - darkVal * 195);
  const gFur = Math.round(126 - darkVal * 95);
  const bFur = Math.round(34 - darkVal * 5);
  const furColor = `rgb(${rFur}, ${gFur}, ${bFur})`;

  // Sleeping / Lounging Cat Body
  const breathe = Math.sin(t * 3) * 2;
  ctx.beginPath();
  ctx.ellipse(0, -18 + breathe, 38, 22, 0, 0, Math.PI * 2);
  strokeFill(ctx, furColor, outline, 3.5);

  // Cat Head
  const headX = 28, headY = -32 + breathe * 0.5;
  drawCircle(ctx, headX, headY, 18, furColor, outline, 3.5);

  // Cat Ears
  ctx.fillStyle = furColor; ctx.strokeStyle = outline; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(headX - 10, headY - 14); ctx.lineTo(headX - 14, headY - 32); ctx.lineTo(headX, headY - 16); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(headX + 4, headY - 16); ctx.lineTo(headX + 16, headY - 30); ctx.lineTo(headX + 14, headY - 12); ctx.closePath(); ctx.fill(); ctx.stroke();

  // Cat Eyes: Turn black and eerie as Uncle narrates!
  if (stage === 'creepy_eyes') {
    // Creepy pitch-black eyes growing!
    const eyeSize = 5 + darkVal * 4;
    drawCircle(ctx, headX - 6, headY - 2, eyeSize, '#1a1a1a', '#000000', 2);
    drawCircle(ctx, headX + 8, headY - 2, eyeSize, '#1a1a1a', '#000000', 2);
    // Eerie tiny purple pupil shine
    drawCircle(ctx, headX - 6, headY - 3, 1.5, '#bb86fc', null);
    drawCircle(ctx, headX + 8, headY - 3, 1.5, '#bb86fc', null);
  } else if (darkVal > 0.4) {
    // Suspicious squinting eyes
    ctx.strokeStyle = outline; ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(headX - 10, headY - 2); ctx.lineTo(headX - 2, headY - 4);
    ctx.moveTo(headX + 4, headY - 4); ctx.lineTo(headX + 12, headY - 2);
    ctx.stroke();
  } else {
    // Normal peaceful closed cat eyes
    ctx.strokeStyle = outline; ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(headX - 6, headY - 2, 5, 0.2, Math.PI - 0.2);
    ctx.arc(headX + 8, headY - 2, 5, 0.2, Math.PI - 0.2);
    ctx.stroke();
  }

  // Pink nose & whiskers
  drawCircle(ctx, headX + 1, headY + 5, 2.5, '#ff7675', null);
  ctx.strokeStyle = outline; ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(headX - 4, headY + 5); ctx.lineTo(headX - 18, headY + 3);
  ctx.moveTo(headX - 4, headY + 7); ctx.lineTo(headX - 18, headY + 9);
  ctx.moveTo(headX + 6, headY + 5); ctx.lineTo(headX + 20, headY + 3);
  ctx.moveTo(headX + 6, headY + 7); ctx.lineTo(headX + 20, headY + 9);
  ctx.stroke();

  // Cat curled tail
  const tailSway = Math.sin(t * 4) * 5;
  ctx.strokeStyle = furColor; ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(-35, -15);
  ctx.quadraticCurveTo(-55, -25 + tailSway, -45, -45 + tailSway);
  ctx.stroke();
  ctx.strokeStyle = outline; ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.restore();
}

// ----------------------------------------------------
// Character: চাচা (Uncle / Chacha)
// ----------------------------------------------------
function drawUncle(ctx, x, y, s, t, action, local) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  const bob = Math.sin(t * 3) * 2;
  ctx.translate(0, bob);

  const skin = '#fcd0a1';
  const skinShadow = '#e5ab75';
  const outline = '#1f1a17';
  const kurtaColor = '#f39c12';

  // If sitting on bed (Scene 7, 8, 9)
  const isSitting = (action === 'sit_on_bed' || action === 'uncle_reveals_trick' || action === 'clever_idea_finish');

  if (isSitting) {
    // Sitting legs folded
    drawRoundRect(ctx, -32, -35, 64, 25, 6, '#2c3e50', outline, 3.5);
    drawRoundRect(ctx, -38, -15, 28, 14, 5, '#ffffff', outline, 3);
    drawRoundRect(ctx, 10, -15, 28, 14, 5, '#ffffff', outline, 3);
  } else {
    // Standing legs
    drawRoundRect(ctx, -26, -45, 18, 52, 6, '#2c3e50', outline, 3.5);
    drawRoundRect(ctx, 8, -45, 18, 52, 6, '#2c3e50', outline, 3.5);
    drawRoundRect(ctx, -34, 0, 28, 14, 6, '#ffffff', outline, 3);
    drawRoundRect(ctx, 6, 0, 28, 14, 6, '#ffffff', outline, 3);
  }

  // Torso / Mustard Kurta
  ctx.beginPath();
  ctx.moveTo(-36, -155); ctx.lineTo(36, -155);
  ctx.lineTo(42, -40); ctx.lineTo(-42, -40);
  ctx.closePath();
  strokeFill(ctx, kurtaColor, outline, 4);

  // Kurta buttons
  drawRoundRect(ctx, -6, -150, 12, 50, 3, '#d35400', outline, 2);
  drawCircle(ctx, 0, -136, 3, '#ffffff', null);
  drawCircle(ctx, 0, -120, 3, '#ffffff', null);

  // Neck
  drawRoundRect(ctx, -14, -180, 28, 32, 4, skin, outline, 3.5);

  // Head
  ctx.save();
  ctx.translate(0, -195);

  // Ears
  drawCircle(ctx, -36, 0, 11, skin, outline, 3.5);
  drawCircle(ctx, 36, 0, 11, skin, outline, 3.5);

  // Face
  drawCircle(ctx, 0, 0, 36, skin, outline, 4);

  // Hair & spectacles
  ctx.fillStyle = '#4a5568'; ctx.strokeStyle = outline; ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-36, -6);
  ctx.quadraticCurveTo(-42, -42, 0, -45);
  ctx.quadraticCurveTo(42, -42, 36, -6);
  ctx.quadraticCurveTo(24, -26, -10, -25);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Cool Round Spectacles (চশমা)
  drawCircle(ctx, -15, -6, 11, 'rgba(255, 255, 255, 0.4)', outline, 3);
  drawCircle(ctx, 15, -6, 11, 'rgba(255, 255, 255, 0.4)', outline, 3);
  // Spectacle bridge
  ctx.strokeStyle = outline; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(-4, -6); ctx.lineTo(4, -6); ctx.stroke();

  // Eyes behind glasses
  drawCircle(ctx, -15, -6, 4, '#1f1a17', null);
  drawCircle(ctx, 15, -6, 4, '#1f1a17', null);
  drawCircle(ctx, -16, -7, 1.5, '#ffffff', null);
  drawCircle(ctx, 14, -7, 1.5, '#ffffff', null);

  // Expressions & Mouth
  const isSpeaking = (action !== 'sit_on_bed');
  const mouthOpen = isSpeaking ? (Math.sin(t * 18) > 0 ? 11 : 3) : 3;

  if (action === 'uncle_reveals_trick') {
    // Laughing hysterically at his prank!
    ctx.fillStyle = '#922b21';
    ctx.beginPath(); ctx.arc(0, 12, 14, 0, Math.PI); ctx.fill(); ctx.stroke();
    drawCircle(ctx, 0, 20, 6, '#ff7675', null);
  } else {
    // Talking mouth
    ctx.fillStyle = '#78281f';
    ctx.beginPath(); ctx.ellipse(0, 14, 7, mouthOpen, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    if (mouthOpen > 6) {
      ctx.fillStyle = '#ffffff'; ctx.fillRect(-5, 14 - mouthOpen + 2, 10, 3.5);
    }
  }

  // Neat trimmed mustache
  ctx.fillStyle = '#2c3e50';
  ctx.beginPath();
  ctx.moveTo(-18, 8); ctx.quadraticCurveTo(0, 4, 18, 8); ctx.quadraticCurveTo(0, 12, -18, 8);
  ctx.fill();

  ctx.restore(); // end head

  // Arms & Gestures
  if (action === 'uncle_reveals_trick') {
    // Waving hand dismissively & laughing
    const lHand = Math.sin(t * 12) * 15;
    ctx.save();
    ctx.translate(34, -140);
    ctx.strokeStyle = outline; ctx.lineWidth = 14;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(35, -20); ctx.lineTo(45 + lHand, -70); ctx.stroke();
    ctx.strokeStyle = kurtaColor; ctx.lineWidth = 9;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(35, -20); ctx.stroke();
    drawCircle(ctx, 45 + lHand, -70, 11, skin, outline, 3);
    ctx.restore();

    drawRoundRect(ctx, -48, -135, 16, 45, 8, kurtaColor, outline, 3.5);
    drawCircle(ctx, -40, -85, 10, skin, outline, 3);
  } else if (action === 'spooky_warning' || action === 'cat_turning_black' || action === 'cat_creepy_eyes') {
    // Spooky storytelling gesture: pointing with dramatic spooky hand
    ctx.save();
    ctx.translate(-30, -140);
    ctx.strokeStyle = outline; ctx.lineWidth = 14;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-45, 15); ctx.lineTo(-95, -10); ctx.stroke();
    ctx.strokeStyle = kurtaColor; ctx.lineWidth = 9;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-45, 15); ctx.stroke();
    // Hand pointing towards the bed/cat
    drawCircle(ctx, -95, -10, 9, skin, outline, 3);
    ctx.strokeStyle = outline; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(-95, -10); ctx.lineTo(-118, -14); ctx.stroke();
    ctx.restore();

    drawRoundRect(ctx, 28, -135, 18, 45, 8, kurtaColor, outline, 3.5);
    drawCircle(ctx, 36, -85, 10, skin, outline, 3);
  } else {
    // Relaxed pose / resting on bed
    drawRoundRect(ctx, -46, -135, 16, 45, 8, kurtaColor, outline, 3.5);
    drawCircle(ctx, -38, -85, 10, skin, outline, 3);
    drawRoundRect(ctx, 30, -135, 16, 45, 8, kurtaColor, outline, 3.5);
    drawCircle(ctx, 38, -85, 10, skin, outline, 3);
  }

  ctx.restore();
}

// ----------------------------------------------------
// Character: আঁখি (Akhi - Little Girl with pigtails)
// ----------------------------------------------------
function drawAkhi(ctx, x, y, s, t, action, local) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  const skin = '#fcd0a1';
  const outline = '#1f1a17';
  const dressColor = '#e91e63';

  // Legs & Cute Shoes
  drawRoundRect(ctx, -18, -35, 14, 42, 5, skin, outline, 3);
  drawRoundRect(ctx, 4, -35, 14, 42, 5, skin, outline, 3);
  // Red Mary Jane shoes with yellow socks
  drawRoundRect(ctx, -24, 0, 20, 12, 4, '#c0392b', outline, 2.5);
  drawRoundRect(ctx, 4, 0, 20, 12, 4, '#c0392b', outline, 2.5);

  // Pink/Magenta Frock
  ctx.beginPath();
  ctx.moveTo(-26, -125); ctx.lineTo(26, -125);
  ctx.lineTo(36, -35); ctx.lineTo(-36, -35);
  ctx.closePath();
  strokeFill(ctx, dressColor, outline, 3.5);

  // Yellow waistband & ribbon bow
  ctx.fillStyle = '#f1c40f';
  ctx.fillRect(-30, -75, 60, 8);
  drawCircle(ctx, 0, -71, 5, '#f39c12', null);

  // Neck
  drawRoundRect(ctx, -10, -145, 20, 25, 4, skin, outline, 3);

  // Head
  ctx.save();
  ctx.translate(0, -165);

  // Cute Pigtails on both sides with ribbons!
  // Left pigtail
  ctx.fillStyle = '#2c2523'; ctx.strokeStyle = outline; ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(-36, -16, 16, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
  drawCircle(ctx, -32, -18, 6, '#f1c40f', '#b7950b', 2); // yellow hair tie
  // Right pigtail
  ctx.beginPath();
  ctx.arc(36, -16, 16, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
  drawCircle(ctx, 32, -18, 6, '#f1c40f', '#b7950b', 2);

  // Ears
  drawCircle(ctx, -30, 0, 8, skin, outline, 2.5);
  drawCircle(ctx, 30, 0, 8, skin, outline, 2.5);

  // Face
  drawCircle(ctx, 0, 0, 30, skin, outline, 3.5);

  // Cute bangs hair
  ctx.fillStyle = '#2c2523'; ctx.strokeStyle = outline; ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(-30, -4);
  ctx.quadraticCurveTo(-34, -36, 0, -38);
  ctx.quadraticCurveTo(34, -36, 30, -4);
  ctx.quadraticCurveTo(15, -18, -4, -18);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Face Expression depending on Horror vs Relief
  if (action === 'cat_flees_scared') {
    // "মাগো বাঁচাও!" - Screaming in total terror!
    ctx.strokeStyle = outline; ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(-12, -18, 8, Math.PI * 1.1, Math.PI * 1.9);
    ctx.arc(12, -18, 8, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();

    // Giant terrified round eyes
    drawCircle(ctx, -12, -6, 9, '#ffffff', outline, 3);
    drawCircle(ctx, 12, -6, 9, '#ffffff', outline, 3);
    drawCircle(ctx, -12, -6, 3, '#1f1a17', null);
    drawCircle(ctx, 12, -6, 3, '#1f1a17', null);

    // Wide screaming open mouth
    ctx.fillStyle = '#922b21';
    ctx.beginPath(); ctx.ellipse(0, 14, 8, 12, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    // Tears flying
    drawCircle(ctx, -22, -2, 4, '#3498db', null);
    drawCircle(ctx, 22, -2, 4, '#3498db', null);
  } else if (action === 'clever_idea_finish') {
    // Beaming with happy admiration!
    drawCircle(ctx, -12, -6, 7, '#ffffff', outline, 2.5);
    drawCircle(ctx, 12, -6, 7, '#ffffff', outline, 2.5);
    drawCircle(ctx, -10, -6, 3.5, '#1f1a17', null);
    drawCircle(ctx, 14, -6, 3.5, '#1f1a17', null);
    // Rosy cheeks
    drawCircle(ctx, -18, 4, 6, 'rgba(231, 76, 60, 0.45)', null);
    drawCircle(ctx, 18, 4, 6, 'rgba(231, 76, 60, 0.45)', null);
    // Big cheerful smile
    ctx.fillStyle = '#922b21';
    ctx.beginPath(); ctx.arc(0, 8, 10, 0, Math.PI); ctx.fill(); ctx.stroke();
  } else {
    // Curious / Spooked listening
    const isAfraid = (action === 'cat_turning_black' || action === 'cat_creepy_eyes' || action === 'darkness_vanishing');
    drawCircle(ctx, -12, -6, 7, '#ffffff', outline, 2.5);
    drawCircle(ctx, 12, -6, 7, '#ffffff', outline, 2.5);
    drawCircle(ctx, -14, -6, 3, '#1f1a17', null);
    drawCircle(ctx, 10, -6, 3, '#1f1a17', null);
    if (isAfraid) {
      // Trembling mouth
      ctx.strokeStyle = outline; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(-6, 12); ctx.quadraticCurveTo(0, 8, 6, 12); ctx.stroke();
    } else {
      ctx.beginPath(); ctx.arc(0, 8, 6, 0, Math.PI); ctx.stroke();
    }
  }

  ctx.restore(); // end head

  // Arms & Hand Gestures
  if (action === 'cat_flees_scared') {
    // Both hands holding cheeks in terror!
    drawRoundRect(ctx, -38, -140, 14, 45, 6, dressColor, outline, 3);
    drawCircle(ctx, -24, -150, 8, skin, outline, 2.5);
    drawRoundRect(ctx, 24, -140, 14, 45, 6, dressColor, outline, 3);
    drawCircle(ctx, 24, -150, 8, skin, outline, 2.5);
  } else if (action === 'clever_idea_finish') {
    // Clapping / Thumbs up!
    drawRoundRect(ctx, -36, -120, 14, 38, 6, dressColor, outline, 3);
    drawCircle(ctx, -26, -85, 8, skin, outline, 2.5);
    drawRoundRect(ctx, 22, -120, 14, 38, 6, dressColor, outline, 3);
    drawCircle(ctx, 26, -85, 8, skin, outline, 2.5);
  } else {
    // Standing curiously
    drawRoundRect(ctx, -36, -115, 12, 38, 5, dressColor, outline, 2.5);
    drawCircle(ctx, -30, -75, 7, skin, outline, 2.5);
    drawRoundRect(ctx, 24, -115, 12, 38, 5, dressColor, outline, 2.5);
    drawCircle(ctx, 30, -75, 7, skin, outline, 2.5);
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

  // Adaptive Floor & Scale
  const floorY = vertical ? h * 0.70 : h * 0.78;
  const charScale = vertical ? (w / 1080) * 2.25 : (h / 1080) * 1.55;

  // Calculate Spooky Atmosphere Progress
  const isSpooky = (t >= 6.25 && t < 20.5);
  const spookyProgress = isSpooky ? Math.min(1, (t - 6.25) / 6.0) : 0;

  // 1. Render Bedroom Background
  drawBedroomBG(ctx, w, h, t, floorY, isSpooky, spookyProgress);

  // 2. Render Bed in Center / Left-Center
  const bedW = vertical ? w * 0.52 : w * 0.36;
  const bedX = vertical ? w * 0.15 : w * 0.22;
  const bedY = floorY;
  drawBed(ctx, bedX, bedY, bedW, isSpooky, spookyProgress);

  // 3. Render Cat on Bed (unless already fled after 18s)
  if (t < 20.5) {
    let catStage = 'normal';
    let catProgress = 0;
    if (scene.action === 'cat_turning_black') {
      catStage = 'darkening';
      catProgress = (t - 6.25) / 4.75;
    } else if (scene.action === 'cat_creepy_eyes') {
      catStage = 'creepy_eyes';
      catProgress = (t - 11.0) / 4.0;
    } else if (scene.action === 'darkness_vanishing') {
      catStage = 'creepy_eyes';
      catProgress = 1.0;
    } else if (scene.action === 'cat_flees_scared') {
      catStage = 'flees';
      catProgress = (t - 17.5) / 1.5;
    }

    const catX = bedX + bedW * 0.55;
    const catY = bedY - 50;
    drawCat(ctx, catX, catY, charScale * 0.95, t, catStage, catProgress);
  }

  // 4. Render Uncle & Akhi
  const uncleX = vertical ? w * 0.74 : w * 0.68;
  const akhiX = vertical ? w * 0.88 : w * 0.84;

  if (scene.action === 'sit_on_bed' || scene.action === 'uncle_reveals_trick' || scene.action === 'clever_idea_finish') {
    // Uncle sits on the bed!
    const sittingUncleX = bedX + bedW * 0.5;
    drawUncle(ctx, sittingUncleX, bedY - 35, charScale, t, scene.action, local);
    drawAkhi(ctx, akhiX, floorY, charScale * 0.88, t, scene.action, local);
  } else {
    // Uncle and Akhi standing together looking at the bed
    drawUncle(ctx, uncleX, floorY, charScale, t, scene.action, local);
    drawAkhi(ctx, akhiX, floorY, charScale * 0.88, t, scene.action, local);
  }

  // Smooth scene fade
  const fade = Math.min(cl(local / 0.2), cl((scene.end - t) / 0.2));
  if (fade < 1) {
    ctx.fillStyle = `rgba(0, 0, 0, ${(1 - fade) * 0.35})`;
    ctx.fillRect(0, 0, w, h);
  }

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const font = '"Noto Sans Bengali","Nirmala UI",sans-serif';

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

  // Bengali Subtitles (Heavy black stroke, crisp white text)
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

  // Zero brand watermark drawn on video (Per user request)
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
