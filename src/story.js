
// Full-Color 2D Cartoon Animation Engine - Class 3 Breakup & Bald Girlfriend
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

function drawCloud(ctx, x, y, s = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, 0, 28, 0, Math.PI * 2);
  ctx.arc(26, -10, 34, 0, Math.PI * 2);
  ctx.arc(58, -4, 26, 0, Math.PI * 2);
  ctx.arc(78, 10, 20, 0, Math.PI * 2);
  ctx.arc(-22, 10, 20, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// ----------------------------------------------------
// Background 1: Tea Stall (চায়ের দোকান)
// ----------------------------------------------------
function drawTeaStallBG(ctx, W, H, t, floorY) {
  // Stall wall
  const wallGrad = ctx.createLinearGradient(0, 0, 0, floorY);
  wallGrad.addColorStop(0, '#f9e79f');
  wallGrad.addColorStop(1, '#f5cba7');
  ctx.fillStyle = wallGrad;
  ctx.fillRect(0, 0, W, H);

  // Wooden / concrete ground
  const groundGrad = ctx.createLinearGradient(0, floorY, 0, H);
  groundGrad.addColorStop(0, '#8d6e63');
  groundGrad.addColorStop(1, '#5d4037');
  ctx.fillStyle = groundGrad;
  ctx.fillRect(0, floorY, W, H - floorY);

  // Shelf with glass cookie/biscuit jars
  const shelfY = floorY - 320;
  drawRoundRect(ctx, W * 0.1, shelfY, W * 0.8, 16, 4, '#5d4037', '#3e2723', 3);
  // Glass jars on shelf
  for (let i = 0; i < 4; i++) {
    const jx = W * 0.15 + i * (W * 0.18);
    // Jar body
    drawRoundRect(ctx, jx, shelfY - 60, 48, 58, 6, 'rgba(235, 245, 251, 0.85)', '#2c3e50', 3);
    // Lid
    drawRoundRect(ctx, jx - 3, shelfY - 70, 54, 12, 3, '#e74c3c', '#2c3e50', 2.5);
    // Colorful biscuits inside
    const bColor = ['#d35400', '#f39c12', '#795548', '#e67e22'][i];
    drawCircle(ctx, jx + 16, shelfY - 20, 10, bColor, null);
    drawCircle(ctx, jx + 32, shelfY - 20, 10, bColor, null);
    drawCircle(ctx, jx + 24, shelfY - 36, 10, bColor, null);
  }

  // Tea Counter / Table in foreground
  const tableY = floorY - 60;
  drawRoundRect(ctx, W * 0.15, tableY, W * 0.7, 70, 10, '#6d4c41', '#3e2723', 4);

  // Big traditional tea kettle releasing steam
  const kx = W * 0.5, ky = tableY - 15;
  ctx.save();
  // Kettle body
  ctx.beginPath();
  ctx.arc(kx, ky - 30, 36, 0, Math.PI * 2);
  strokeFill(ctx, '#95a5a6', '#2c3e50', 4);
  // Kettle spout
  ctx.beginPath();
  ctx.moveTo(kx + 28, ky - 40);
  ctx.quadraticCurveTo(kx + 65, ky - 60, kx + 60, ky - 80);
  ctx.lineTo(kx + 50, ky - 82);
  ctx.quadraticCurveTo(kx + 45, ky - 50, kx + 20, ky - 20);
  ctx.closePath();
  strokeFill(ctx, '#7f8c8d', '#2c3e50', 3.5);
  // Kettle handle
  ctx.strokeStyle = '#2c3e50';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(kx, ky - 35, 46, Math.PI * 1.1, Math.PI * 1.9);
  ctx.stroke();

  // Steam curls from kettle spout
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.lineWidth = 3.5;
  const sOffset = (t * 40) % 60;
  ctx.beginPath();
  ctx.moveTo(kx + 55, ky - 85);
  ctx.quadraticCurveTo(kx + 65 + Math.sin(t * 4) * 10, ky - 105 - sOffset, kx + 55, ky - 130 - sOffset);
  ctx.stroke();
  ctx.restore();

  // Two Glass Tea Cups with hot milk tea
  [W * 0.38, W * 0.62].forEach((cx, idx) => {
    drawRoundRect(ctx, cx - 14, tableY - 35, 28, 38, 4, 'rgba(255, 255, 255, 0.9)', '#2c3e50', 3);
    // Milk tea fill
    drawRoundRect(ctx, cx - 11, tableY - 26, 22, 26, 2, '#d4ac0d', null);
    // Cup handle
    ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx + (idx === 0 ? -14 : 14), tableY - 18, 9, Math.PI * 0.5, Math.PI * 1.5, idx === 0);
    ctx.stroke();
  });
}

// ----------------------------------------------------
// Background 2: Home Flashback (ঘরের দৃশ্য)
// ----------------------------------------------------
function drawHomeFlashbackBG(ctx, W, H, t, floorY) {
  // Soft lavender-blue wallpaper
  const wallGrad = ctx.createLinearGradient(0, 0, 0, floorY);
  wallGrad.addColorStop(0, '#ebf5fb');
  wallGrad.addColorStop(1, '#d6eaf8');
  ctx.fillStyle = wallGrad;
  ctx.fillRect(0, 0, W, H);

  // Floor
  ctx.fillStyle = '#d5bdaf';
  ctx.fillRect(0, floorY, W, H - floorY);
  drawRoundRect(ctx, 0, floorY - 12, W, 12, 0, '#ffffff', '#2c3e50', 2.5);

  // Cozy bed/sofa with striped pillow
  const bedX = W * 0.18, bedY = floorY - 110, bedW = W * 0.64;
  drawRoundRect(ctx, bedX, bedY, bedW, 110, 14, '#5499c7', '#1f618d', 4);
  drawRoundRect(ctx, bedX + 15, bedY + 20, 110, 60, 10, '#f9e79f', '#d4ac0d', 3.5);
  // Bed wooden legs
  drawRoundRect(ctx, bedX + 10, floorY - 5, 16, 25, 4, '#6e2c00', '#2c3e50', 2.5);
  drawRoundRect(ctx, bedX + bedW - 26, floorY - 5, 16, 25, 4, '#6e2c00', '#2c3e50', 2.5);

  // Wall family photo frame
  const fx = W * 0.5 - 60, fy = floorY - 340;
  drawRoundRect(ctx, fx, fy, 120, 90, 6, '#f39c12', '#2c3e50', 3.5);
  drawRoundRect(ctx, fx + 6, fy + 6, 108, 78, 3, '#fef9e7', null);
  drawCircle(ctx, fx + 40, fy + 45, 14, '#e74c3c', '#c0392b', 2);
  drawCircle(ctx, fx + 80, fy + 48, 12, '#3498db', '#2980b9', 2);
}

// ----------------------------------------------------
// Background 3: School Reveal & Meme Zoom
// ----------------------------------------------------
function drawSchoolRevealBG(ctx, W, H, t, floorY, isMeme) {
  if (isMeme) {
    // Dynamic Rainbow / Comic Pop Explosion
    const cx = W / 2, cy = H * 0.45;
    for (let i = 0; i < 24; i++) {
      const a1 = (i / 24) * Math.PI * 2 + (t * 0.8);
      const a2 = ((i + 1) / 24) * Math.PI * 2 + (t * 0.8);
      ctx.fillStyle = i % 2 === 0 ? '#ffea00' : '#ff7675';
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, Math.max(W, H) * 1.2, a1, a2);
      ctx.closePath();
      ctx.fill();
    }
    // Floating crying-laughing emoji hints 😂
    const numEmojis = 5;
    for (let j = 0; j < numEmojis; j++) {
      const ex = (W * 0.15 + j * (W * 0.18) + Math.sin(t * 3 + j) * 20);
      const ey = 140 + Math.cos(t * 4 + j) * 35;
      drawCircle(ctx, ex, ey, 28, '#f1c40f', '#b7950b', 3);
      // Closed laughing arc eyes
      ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(ex - 10, ey - 6, 7, Math.PI, 0);
      ctx.arc(ex + 10, ey - 6, 7, Math.PI, 0);
      ctx.stroke();
      // Giant smile
      ctx.fillStyle = '#922b21';
      ctx.beginPath(); ctx.arc(ex, ey + 4, 14, 0, Math.PI); ctx.fill(); ctx.stroke();
      // Blue tears
      drawCircle(ctx, ex - 18, ey + 4, 5, '#3498db', null);
      drawCircle(ctx, ex + 18, ey + 4, 5, '#3498db', null);
    }
    return;
  }

  // Outdoor School Grounds
  const skyGrad = ctx.createLinearGradient(0, 0, 0, floorY * 0.7);
  skyGrad.addColorStop(0, '#5dade2');
  skyGrad.addColorStop(1, '#aed6f1');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, H);

  // Clouds
  drawCloud(ctx, W * 0.2 + Math.sin(t * 0.5) * 20, 80, 1.1);
  drawCloud(ctx, W * 0.7 - Math.sin(t * 0.5) * 20, 120, 0.9);

  // School Building
  const sX = W * 0.15, sY = floorY - 260, sW = W * 0.7, sH = 260;
  drawRoundRect(ctx, sX, sY, sW, sH, 8, '#fce4ec', '#2c3e50', 4);
  // Red roof
  ctx.fillStyle = '#e74c3c';
  ctx.beginPath();
  ctx.moveTo(sX - 20, sY); ctx.lineTo(sX + sW / 2, sY - 60); ctx.lineTo(sX + sW + 20, sY);
  ctx.closePath();
  strokeFill(ctx, '#e74c3c', '#2c3e50', 4);
  // School sign
  drawRoundRect(ctx, sX + sW / 2 - 120, sY + 20, 240, 50, 8, '#ffffff', '#2c3e50', 3);
  ctx.save();
  ctx.font = 'bold 24px "Noto Sans Bengali", sans-serif';
  ctx.fillStyle = '#2c3e50'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('প্রাইমারি স্কুল', sX + sW / 2, sY + 45);
  ctx.restore();

  // Green lawn
  ctx.fillStyle = '#27ae60';
  ctx.fillRect(0, floorY, W, H - floorY);
}

// ----------------------------------------------------
// Character: বাবা (Father with mustache)
// ----------------------------------------------------
function drawFather(ctx, x, y, s, t, action, local) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  const skin = '#fcd0a1';
  const skinShadow = '#e5ab75';
  const outline = '#1f1a17';
  const panjabiColor = '#ffffff';

  // Legs
  drawRoundRect(ctx, -26, -45, 18, 52, 6, '#34495e', outline, 3.5);
  drawRoundRect(ctx, 8, -45, 18, 52, 6, '#34495e', outline, 3.5);
  drawRoundRect(ctx, -34, 0, 28, 14, 6, '#7f8c8d', outline, 3);
  drawRoundRect(ctx, 6, 0, 28, 14, 6, '#7f8c8d', outline, 3);

  // Torso / White Punjabi
  ctx.beginPath();
  ctx.moveTo(-38, -155); ctx.lineTo(38, -155);
  ctx.lineTo(44, -35); ctx.lineTo(-44, -35);
  ctx.closePath();
  strokeFill(ctx, panjabiColor, outline, 4);

  // Punjabi Placket & Buttons
  drawRoundRect(ctx, -6, -150, 12, 55, 3, '#eaeded', outline, 2);
  drawCircle(ctx, 0, -135, 3, '#d4ac0d', null);
  drawCircle(ctx, 0, -118, 3, '#d4ac0d', null);
  drawCircle(ctx, 0, -102, 3, '#d4ac0d', null);

  // Neck
  drawRoundRect(ctx, -14, -180, 28, 32, 4, skin, outline, 3.5);

  // Head
  const headSway = (action === 'shock_chokh_chorokgach') ? Math.sin(t * 12) * 0.12 : 0;
  ctx.save();
  ctx.translate(0, -195);
  ctx.rotate(headSway);

  // Ears
  drawCircle(ctx, -36, 0, 11, skin, outline, 3.5);
  drawCircle(ctx, 36, 0, 11, skin, outline, 3.5);

  // Face
  drawCircle(ctx, 0, 0, 36, skin, outline, 4);

  // Short neat black hair
  ctx.fillStyle = '#2c2523'; ctx.strokeStyle = outline; ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-36, -6);
  ctx.quadraticCurveTo(-42, -42, 0, -45);
  ctx.quadraticCurveTo(42, -42, 36, -6);
  ctx.quadraticCurveTo(24, -26, -10, -25);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Eyebrows
  ctx.strokeStyle = outline; ctx.lineWidth = 3.5;
  if (action === 'burst_laughter') {
    // Closed laughing eyes
    ctx.beginPath();
    ctx.arc(-14, -6, 7, Math.PI, 0);
    ctx.arc(14, -6, 7, Math.PI, 0);
    ctx.stroke();
  } else {
    // Worried / serious tired brows
    ctx.beginPath();
    ctx.moveTo(-22, -12); ctx.lineTo(-8, -16);
    ctx.moveTo(8, -16); ctx.lineTo(22, -12);
    ctx.stroke();
    drawCircle(ctx, -14, -6, 7, '#ffffff', outline, 3);
    drawCircle(ctx, 14, -6, 7, '#ffffff', outline, 3);
    drawCircle(ctx, -12, -6, 3.5, '#1f1a17', null);
    drawCircle(ctx, 16, -6, 3.5, '#1f1a17', null);
  }

  // Iconic Mustache!
  ctx.fillStyle = '#1c2833';
  ctx.beginPath();
  ctx.moveTo(-22, 10);
  ctx.quadraticCurveTo(0, 4, 22, 10);
  ctx.quadraticCurveTo(12, 18, 0, 12);
  ctx.quadraticCurveTo(-12, 18, -22, 10);
  ctx.closePath();
  ctx.fill();

  // Mouth
  if (action === 'burst_laughter') {
    // Huge laughing mouth
    ctx.fillStyle = '#78281f';
    ctx.beginPath(); ctx.arc(0, 16, 12, 0, Math.PI); ctx.fill(); ctx.stroke();
    drawCircle(ctx, 0, 22, 6, '#ff7675', null); // tongue
  } else {
    // Talking mouth
    const talk = (Math.sin(t * 18) > 0) ? 7 : 2;
    ctx.fillStyle = '#78281f';
    ctx.beginPath(); ctx.ellipse(0, 18, 6, talk, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  }

  ctx.restore(); // end head

  // Arms
  if (action === 'burst_laughter') {
    // Holding belly laughing!
    drawRoundRect(ctx, -48, -135, 18, 48, 8, panjabiColor, outline, 3.5);
    drawCircle(ctx, -20, -90, 10, skin, outline, 3);
    drawRoundRect(ctx, 30, -135, 18, 48, 8, panjabiColor, outline, 3.5);
    drawCircle(ctx, 20, -90, 10, skin, outline, 3);
  } else if (action === 'flashback_father_son') {
    // Reaching hand to comfort son's head/shoulder
    ctx.save();
    ctx.translate(-30, -140);
    ctx.strokeStyle = outline; ctx.lineWidth = 14;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-65, 20); ctx.lineTo(-120, 25); ctx.stroke();
    ctx.strokeStyle = panjabiColor; ctx.lineWidth = 9;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-65, 20); ctx.lineTo(-118, 25); ctx.stroke();
    drawCircle(ctx, -120, 25, 11, skin, outline, 3); // hand on kid
    ctx.restore();

    drawRoundRect(ctx, 28, -135, 18, 45, 8, panjabiColor, outline, 3.5);
    drawCircle(ctx, 36, -85, 10, skin, outline, 3);
  } else {
    // Holding tea cup in hand
    ctx.save();
    ctx.translate(30, -140);
    ctx.strokeStyle = outline; ctx.lineWidth = 14;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(35, 20); ctx.lineTo(30, -10); ctx.stroke();
    ctx.strokeStyle = panjabiColor; ctx.lineWidth = 9;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(35, 20); ctx.stroke();
    // Small tea cup in father's hand
    drawRoundRect(ctx, 20, -32, 22, 28, 4, '#ffffff', outline, 2.5);
    drawRoundRect(ctx, 22, -26, 18, 20, 2, '#d4ac0d', null);
    drawCircle(ctx, 25, -12, 8, skin, outline, 3);
    ctx.restore();

    drawRoundRect(ctx, -48, -135, 18, 45, 8, panjabiColor, outline, 3.5);
    drawCircle(ctx, -40, -85, 10, skin, outline, 3);
  }

  ctx.restore();
}

// ----------------------------------------------------
// Character: বন্ধু (Tea stall friend)
// ----------------------------------------------------
function drawFriend(ctx, x, y, s, t, action, local) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  const skin = '#fcd0a1';
  const outline = '#1f1a17';
  const shirtColor = '#3498db';

  // Legs
  drawRoundRect(ctx, -26, -45, 18, 52, 6, '#2c3e50', outline, 3.5);
  drawRoundRect(ctx, 8, -45, 18, 52, 6, '#2c3e50', outline, 3.5);
  drawRoundRect(ctx, -34, 0, 28, 14, 6, '#ffffff', outline, 3);
  drawRoundRect(ctx, 6, 0, 28, 14, 6, '#ffffff', outline, 3);

  // Torso / Blue Polo
  ctx.beginPath();
  ctx.moveTo(-36, -155); ctx.lineTo(36, -155);
  ctx.lineTo(42, -45); ctx.lineTo(-42, -45);
  ctx.closePath();
  strokeFill(ctx, shirtColor, outline, 4);

  // Neck
  drawRoundRect(ctx, -14, -180, 28, 32, 4, skin, outline, 3.5);

  // Head
  ctx.save();
  ctx.translate(0, -195);

  drawCircle(ctx, -36, 0, 11, skin, outline, 3.5);
  drawCircle(ctx, 36, 0, 11, skin, outline, 3.5);
  drawCircle(ctx, 0, 0, 36, skin, outline, 4);

  // Hair
  ctx.fillStyle = '#2c2523'; ctx.strokeStyle = outline; ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-36, -6);
  ctx.quadraticCurveTo(-40, -42, 0, -45);
  ctx.quadraticCurveTo(38, -42, 36, -6);
  ctx.quadraticCurveTo(24, -26, -10, -25);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Expressions
  if (action === 'shock_chokh_chorokgach') {
    // CHOKH CHOROKGACH: Eyes pop out completely!
    ctx.strokeStyle = outline; ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(-15, -24, 12, Math.PI * 1.1, Math.PI * 1.9);
    ctx.arc(15, -24, 12, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();

    // Giant bulging eyes popping past face!
    drawCircle(ctx, -16, -10, 14, '#ffffff', outline, 4);
    drawCircle(ctx, 16, -10, 14, '#ffffff', outline, 4);
    drawCircle(ctx, -15, -10, 4.5, '#1f1a17', null);
    drawCircle(ctx, 17, -10, 4.5, '#1f1a17', null);

    // Jaw drops wide open!
    ctx.fillStyle = '#78281f';
    ctx.beginPath();
    ctx.ellipse(0, 18, 12, 16, 0, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
  } else if (action === 'burst_laughter') {
    // Rolling on the floor laughing
    ctx.strokeStyle = outline; ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(-14, -6, 8, Math.PI, 0);
    ctx.arc(14, -6, 8, Math.PI, 0);
    ctx.stroke();
    // Tears of laughter
    drawCircle(ctx, -22, 2, 5, '#3498db', null);
    drawCircle(ctx, 22, 2, 5, '#3498db', null);
    // Mouth wide
    ctx.fillStyle = '#922b21';
    ctx.beginPath(); ctx.arc(0, 12, 16, 0, Math.PI); ctx.fill(); ctx.stroke();
  } else {
    // Curious / Blinking listening
    drawCircle(ctx, -14, -6, 7, '#ffffff', outline, 3);
    drawCircle(ctx, 14, -6, 7, '#ffffff', outline, 3);
    drawCircle(ctx, -16, -6, 3.5, '#1f1a17', null);
    drawCircle(ctx, 12, -6, 3.5, '#1f1a17', null);
    ctx.beginPath(); ctx.moveTo(-6, 12); ctx.lineTo(6, 12); ctx.stroke();
  }

  ctx.restore(); // end head

  // Arms
  if (action === 'shock_chokh_chorokgach') {
    // Both hands on head in utter disbelief!
    drawRoundRect(ctx, -55, -165, 18, 55, 8, shirtColor, outline, 3.5);
    drawCircle(ctx, -38, -170, 11, skin, outline, 3);
    drawRoundRect(ctx, 38, -165, 18, 55, 8, shirtColor, outline, 3.5);
    drawCircle(ctx, 38, -170, 11, skin, outline, 3);
  } else if (action === 'burst_laughter') {
    // Falling off chair laughing
    const lShake = Math.sin(t * 20) * 8;
    drawRoundRect(ctx, -48, -135 + lShake, 18, 45, 8, shirtColor, outline, 3.5);
    drawCircle(ctx, -40, -85 + lShake, 10, skin, outline, 3);
    drawRoundRect(ctx, 30, -135 - lShake, 18, 45, 8, shirtColor, outline, 3.5);
    drawCircle(ctx, 40, -85 - lShake, 10, skin, outline, 3);
  } else {
    // Resting on table
    drawRoundRect(ctx, -46, -135, 16, 45, 8, shirtColor, outline, 3.5);
    drawCircle(ctx, -38, -85, 9, skin, outline, 3);
    drawRoundRect(ctx, 30, -135, 16, 45, 8, shirtColor, outline, 3.5);
    drawCircle(ctx, 38, -85, 9, skin, outline, 3);
  }

  ctx.restore();
}

// ----------------------------------------------------
// Character: ছোট ছেলে (8-year-old Kid / Class 3)
// ----------------------------------------------------
function drawKid(ctx, x, y, s, t, action, local) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  const skin = '#fcd0a1';
  const outline = '#1f1a17';
  const tShirt = '#2ecc71';

  // Short legs & cute sneakers
  drawRoundRect(ctx, -22, -35, 16, 42, 6, '#e67e22', outline, 3);
  drawRoundRect(ctx, 6, -35, 16, 42, 6, '#e67e22', outline, 3);
  drawRoundRect(ctx, -28, 0, 24, 12, 5, '#ffffff', outline, 3);
  drawRoundRect(ctx, 4, 0, 24, 12, 5, '#ffffff', outline, 3);

  // Small Torso / Green T-shirt
  ctx.beginPath();
  ctx.moveTo(-30, -125); ctx.lineTo(30, -125);
  ctx.lineTo(34, -35); ctx.lineTo(-34, -35);
  ctx.closePath();
  strokeFill(ctx, tShirt, outline, 3.5);

  // Neck
  drawRoundRect(ctx, -12, -145, 24, 25, 4, skin, outline, 3);

  // Head (Cute round child head)
  ctx.save();
  ctx.translate(0, -165);

  drawCircle(ctx, -30, 0, 9, skin, outline, 3);
  drawCircle(ctx, 30, 0, 9, skin, outline, 3);
  drawCircle(ctx, 0, 0, 32, skin, outline, 3.5);

  // Child messy hair
  ctx.fillStyle = '#2c2523'; ctx.strokeStyle = outline; ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(-32, -6);
  ctx.quadraticCurveTo(-38, -38, 0, -42);
  ctx.quadraticCurveTo(38, -38, 32, -6);
  ctx.quadraticCurveTo(18, -22, -6, -22);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  if (action === 'kid_deep_sigh') {
    // Deep tragic sigh: eyes tightly closed, frowning
    ctx.strokeStyle = outline; ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(-16, -14); ctx.lineTo(-4, -18);
    ctx.moveTo(4, -18); ctx.lineTo(16, -14);
    ctx.stroke();
    // Closed suffering eyes
    ctx.beginPath();
    ctx.moveTo(-18, -6); ctx.lineTo(-6, -6);
    ctx.moveTo(6, -6); ctx.lineTo(18, -6);
    ctx.stroke();
    // Dramatic frowning mouth
    ctx.beginPath();
    ctx.arc(0, 16, 9, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();
  } else {
    // Talking or Devdas look
    drawCircle(ctx, -12, -6, 6, '#ffffff', outline, 2.5);
    drawCircle(ctx, 12, -6, 6, '#ffffff', outline, 2.5);
    drawCircle(ctx, -11, -5, 3, '#1f1a17', null);
    drawCircle(ctx, 13, -5, 3, '#1f1a17', null);
    const kmouth = (Math.sin(t * 18) > 0) ? 6 : 2;
    ctx.fillStyle = '#78281f';
    ctx.beginPath(); ctx.ellipse(0, 10, 6, kmouth, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  }

  ctx.restore(); // end head

  // Arms: Crossed over chest in deep dramatic pain!
  if (action === 'kid_deep_sigh') {
    drawRoundRect(ctx, -38, -110, 76, 22, 8, tShirt, outline, 3.5);
    drawCircle(ctx, -30, -100, 8, skin, outline, 2.5);
    drawCircle(ctx, 30, -100, 8, skin, outline, 2.5);
  } else {
    drawRoundRect(ctx, -42, -115, 14, 38, 6, tShirt, outline, 3);
    drawCircle(ctx, -36, -75, 7, skin, outline, 2.5);
    drawRoundRect(ctx, 28, -115, 14, 38, 6, tShirt, outline, 3);
    drawCircle(ctx, 36, -75, 7, skin, outline, 2.5);
  }

  ctx.restore();
}

// ----------------------------------------------------
// Character: ন্যাড়া মাথার গার্লফ্রেন্ড (The Bald Girlfriend!)
// ----------------------------------------------------
function drawBaldGirlfriend(ctx, x, y, s, t, isZoom) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);

  const skin = '#fcd0a1';
  const outline = '#1f1a17';

  // School Uniform (Blue Pinafore / Frock over white shirt)
  drawRoundRect(ctx, -18, -40, 14, 46, 5, skin, outline, 3);
  drawRoundRect(ctx, 4, -40, 14, 46, 5, skin, outline, 3);
  // White socks & black school shoes
  drawRoundRect(ctx, -24, 0, 20, 12, 4, '#1c2833', outline, 2.5);
  drawRoundRect(ctx, 4, 0, 20, 12, 4, '#1c2833', outline, 2.5);

  // Blue Pinafore Dress
  ctx.beginPath();
  ctx.moveTo(-28, -130); ctx.lineTo(28, -130);
  ctx.lineTo(40, -40); ctx.lineTo(-40, -40);
  ctx.closePath();
  strokeFill(ctx, '#2980b9', outline, 4);

  // Red belt & white collar
  ctx.fillStyle = '#e74c3c';
  ctx.fillRect(-34, -75, 68, 10);
  // White round collar
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(-12, -130, 14, 0, Math.PI);
  ctx.arc(12, -130, 14, 0, Math.PI);
  ctx.fill(); ctx.stroke();

  // Neck
  drawRoundRect(ctx, -12, -150, 24, 25, 4, skin, outline, 3);

  // Head: THE FAMOUS COMPLETELY SHINY BALD HEAD! (চকচকে গোল ন্যাড়া মাথা)
  ctx.save();
  ctx.translate(0, -185);

  // Ears
  drawCircle(ctx, -38, 0, 12, skin, outline, 3.5);
  drawCircle(ctx, 38, 0, 12, skin, outline, 3.5);

  // Smooth, completely round bald head
  drawCircle(ctx, 0, 0, 38, skin, outline, 4);

  // SHINY LIGHT REFLECTION on bald head! (চকচকে আলোর ঝলক)
  ctx.save();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.beginPath();
  ctx.ellipse(-14, -22, 16, 7, -0.4, 0, Math.PI * 2);
  ctx.fill();
  drawCircle(ctx, 8, -26, 4, 'rgba(255, 255, 255, 0.9)', null);
  ctx.restore();

  // Big cute happy cartoon eyes!
  drawCircle(ctx, -15, -4, 9, '#ffffff', outline, 3);
  drawCircle(ctx, 15, -4, 9, '#ffffff', outline, 3);
  drawCircle(ctx, -14, -4, 4.5, '#1f1a17', null);
  drawCircle(ctx, 16, -4, 4.5, '#1f1a17', null);
  drawCircle(ctx, -15, -6, 2, '#ffffff', null);
  drawCircle(ctx, 15, -6, 2, '#ffffff', null);

  // Cute rosy cheeks
  drawCircle(ctx, -24, 8, 8, 'rgba(231, 76, 60, 0.45)', null);
  drawCircle(ctx, 24, 8, 8, 'rgba(231, 76, 60, 0.45)', null);

  // Giant 32-teeth grin from ear to ear! (বত্রিশ পাটি দাঁত বের করা হাসি)
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = outline;
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(0, 10, 18, 0.1, Math.PI - 0.1);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Grid of shiny white teeth
  for (let tx = -12; tx <= 12; tx += 6) {
    ctx.beginPath(); ctx.moveTo(tx, 10); ctx.lineTo(tx, 24); ctx.stroke();
  }
  ctx.beginPath(); ctx.moveTo(-16, 17); ctx.lineTo(16, 17); ctx.stroke();

  ctx.restore(); // end head

  // Arms: Cute little hands clasped happily in front
  drawRoundRect(ctx, -35, -120, 14, 42, 6, '#ffffff', outline, 3);
  drawRoundRect(ctx, 21, -120, 14, 42, 6, '#ffffff', outline, 3);
  drawCircle(ctx, -15, -80, 8, skin, outline, 2.5);
  drawCircle(ctx, 15, -80, 8, skin, outline, 2.5);

  ctx.restore();
}

// ----------------------------------------------------
// Frame Renderer for 16:9 Landscape & 9:16 Portrait
// ----------------------------------------------------
function frame(ctx, w, h, t) {
  const vertical = h > w;
  const scene = BEATS.find(s => t >= s.start && t < s.end) || BEATS.at(-1);
  const local = t - scene.start;

  // Adaptive Floor Level
  const floorY = vertical ? h * 0.70 : h * 0.78;
  const charScale = vertical ? (w / 1080) * 2.25 : (h / 1080) * 1.55;

  // 1. Render Background & Choreography per Scene
  if (scene.action === 'tea_stall_talk' || scene.action === 'thought_bubble_devdas' || scene.action === 'shock_chokh_chorokgach') {
    drawTeaStallBG(ctx, w, h, t, floorY);

    const fatherX = vertical ? w * 0.32 : w * 0.36;
    const friendX = vertical ? w * 0.72 : w * 0.68;
    drawFather(ctx, fatherX, floorY, charScale, t, scene.action, local);
    drawFriend(ctx, friendX, floorY, charScale, t, scene.action, local);

    // In Scene 2: Thought Bubble with Devdas kid!
    if (scene.action === 'thought_bubble_devdas') {
      const bx = vertical ? w * 0.5 : w * 0.52;
      const by = vertical ? h * 0.28 : h * 0.30;
      // Bubble cloud
      drawCloud(ctx, bx - 60, by, vertical ? 1.6 : 1.3);
      // Small dots leading to bubble
      drawCircle(ctx, bx - 100, by + 120, 12, '#ffffff', '#2c3e50', 2.5);
      drawCircle(ctx, bx - 70, by + 90, 18, '#ffffff', '#2c3e50', 2.5);
      // Broken Heart inside thought bubble!
      ctx.save();
      ctx.translate(bx + 10, by - 10);
      ctx.fillStyle = '#e74c3c'; ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 0); ctx.bezierCurveTo(-14, -14, -28, 10, 0, 30); ctx.bezierCurveTo(28, 10, 14, -14, 0, 0);
      ctx.fill(); ctx.stroke();
      // Broken jagged line in heart
      ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 5); ctx.lineTo(-4, 12); ctx.lineTo(4, 18); ctx.lineTo(0, 26);
      ctx.stroke();
      ctx.restore();
    }
  } else if (scene.action === 'flashback_father_son' || scene.action === 'kid_deep_sigh') {
    drawHomeFlashbackBG(ctx, w, h, t, floorY);

    if (scene.action === 'flashback_father_son') {
      const fatherX = vertical ? w * 0.68 : w * 0.65;
      const kidX = vertical ? w * 0.35 : w * 0.38;
      drawFather(ctx, fatherX, floorY, charScale, t, 'flashback_father_son', local);
      drawKid(ctx, kidX, floorY, charScale * 0.82, t, 'talking', local);
    } else {
      // Kid's Close-up deep sigh
      const kidX = w * 0.5;
      drawKid(ctx, kidX, floorY + 40, charScale * 1.35, t, 'kid_deep_sigh', local);
    }
  } else if (scene.action === 'bald_girlfriend_reveal') {
    drawSchoolRevealBG(ctx, w, h, t, floorY, false);

    // Cute Bald Girl in school uniform smiling with 32 teeth!
    const girlX = w * 0.5;
    drawBaldGirlfriend(ctx, girlX, floorY, charScale * 1.15, t, false);
  } else if (scene.action === 'burst_laughter') {
    drawTeaStallBG(ctx, w, h, t, floorY);

    const fatherX = vertical ? w * 0.32 : w * 0.36;
    const friendX = vertical ? w * 0.72 : w * 0.68;
    drawFather(ctx, fatherX, floorY, charScale, t, 'burst_laughter', local);
    drawFriend(ctx, friendX, floorY, charScale, t, 'burst_laughter', local);
  } else if (scene.action === 'gopal_meme_zoom') {
    drawSchoolRevealBG(ctx, w, h, t, floorY, true);

    // Meme Slow-Motion Zoom on Bald Girl!
    const zoomProgress = cl(local / 1.76);
    const zoomScale = charScale * (1.2 + zoomProgress * 0.5);
    drawBaldGirlfriend(ctx, w * 0.5, floorY + 30, zoomScale, t, true);
  }

  // Smooth cinematic scene transition
  const fade = Math.min(cl(local / 0.2), cl((scene.end - t) / 0.2));
  if (fade < 1) {
    ctx.fillStyle = `rgba(0, 0, 0, ${(1 - fade) * 0.4})`;
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

  // Bengali Subtitles / Narration (Ref Style: Heavy black stroke, white text)
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

  // No brand watermark as requested by user ("hasan skill zone je ache ta video te asbe na")
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
