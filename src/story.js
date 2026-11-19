// ============================================================================
// DipuToons - Premium 2D Cartoon Animation Engine
// Story: "মীরজাফর বন্ধু বনাম রিয়াল মাদ্রিদ জার্সির রেস্টুরেন্ট টুইস্ট"
// ============================================================================
const DURATION = CONFIG.duration;
const BEATS = CONFIG.scenes;

// ----------------------------------------------------------------------------
// Utilities
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

// ----------------------------------------------------------------------------
// Realistic & Authentic Real Madrid Jersey Graphics
// ----------------------------------------------------------------------------
function drawRealMadridCrest(ctx, x, y, size = 46) {
  ctx.save();
  ctx.translate(x, y);
  const s = size / 46;
  ctx.scale(s, s);

  // 1. Royal Crown
  // Red velvet inner cushion
  ctx.fillStyle = '#b71c1c';
  ctx.beginPath();
  ctx.arc(0, -18, 9, Math.PI, 0);
  ctx.fill();

  // Gold Crown Arches & Peaks
  ctx.fillStyle = '#fbc02d';
  ctx.beginPath();
  ctx.moveTo(-16, -14);
  ctx.lineTo(-18, -23);
  ctx.lineTo(-10, -18);
  ctx.lineTo(0, -26); // Center peak
  ctx.lineTo(10, -18);
  ctx.lineTo(18, -23);
  ctx.lineTo(16, -14);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#9a6700';
  ctx.lineWidth = 1.8;
  ctx.stroke();

  // Crown Band
  ctx.fillStyle = '#f57f17';
  ctx.beginPath();
  ctx.roundRect(-16, -14, 32, 5, 2);
  ctx.fill();
  ctx.strokeStyle = '#9a6700'; ctx.lineWidth = 1.2; ctx.stroke();

  // Jewels
  ctx.fillStyle = '#d32f2f'; drawCircle(ctx, 0, -11.5, 1.8, '#d32f2f', null);
  ctx.fillStyle = '#0288d1'; drawCircle(ctx, -9, -11.5, 1.5, '#0288d1', null);
  drawCircle(ctx, 9, -11.5, 1.5, '#0288d1', null);

  // Cross on center peak
  ctx.strokeStyle = '#fbc02d';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(0, -26); ctx.lineTo(0, -32);
  ctx.moveTo(-3, -29); ctx.lineTo(3, -29);
  ctx.stroke();

  // 2. Circular Shield
  // Gold Outer Ring
  ctx.fillStyle = '#fbc02d';
  ctx.beginPath();
  ctx.arc(0, 4, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#9a6700';
  ctx.lineWidth = 2;
  ctx.stroke();

  // White Disc
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, 4, 14.5, 0, Math.PI * 2);
  ctx.fill();

  // 3. Castilian Purple Diagonal Sash
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 4, 14.5, 0, Math.PI * 2);
  ctx.clip();

  ctx.fillStyle = '#512da8'; // Royal Madrid purple
  ctx.beginPath();
  ctx.moveTo(-16, -6);
  ctx.lineTo(-8, -14);
  ctx.lineTo(16, 12);
  ctx.lineTo(8, 20);
  ctx.closePath();
  ctx.fill();

  // 4. Gold MCF Monogram
  ctx.fillStyle = '#9a6700';
  ctx.font = 'bold 12px "Arial", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('M', 0, 4);
  ctx.font = 'bold 9px "Arial", sans-serif';
  ctx.fillText('C', -5, 6);
  ctx.fillText('F', 5, 6);
  ctx.restore();

  ctx.restore();
}

function drawAdidasLogo(ctx, x, y, size = 32) {
  ctx.save();
  ctx.translate(x, y);
  const s = size / 32;
  ctx.scale(s, s);

  ctx.fillStyle = '#0d233a';

  // 3 Slanted Diagonal Bars
  ctx.beginPath();
  ctx.moveTo(-10, 4); ctx.lineTo(-6, -3); ctx.lineTo(-3, -3); ctx.lineTo(-7, 4);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-4, 4); ctx.lineTo(2, -8); ctx.lineTo(5, -8); ctx.lineTo(-1, 4);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(2, 4); ctx.lineTo(10, -13); ctx.lineTo(13, -13); ctx.lineTo(5, 4);
  ctx.fill();

  ctx.font = 'bold 5.5px "Arial", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('adidas', 0, 11);
  ctx.restore();
}

function drawStarballBadge(ctx, x, y, size = 26) {
  ctx.save();
  ctx.translate(x, y);
  const s = size / 26;
  ctx.scale(s, s);

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, 0, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#0d233a';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 8 Navy Stars
  ctx.fillStyle = '#0d233a';
  for (let i = 0; i < 8; i++) {
    const ang = (i * Math.PI) / 4;
    const sx = Math.cos(ang) * 7;
    const sy = Math.sin(ang) * 7;
    ctx.beginPath();
    ctx.arc(sx, sy, 2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

// ----------------------------------------------------------------------------
// Natural Cartoon Eye Renderer
// ----------------------------------------------------------------------------
function drawCartoonEye(ctx, x, y, lookX = 0, lookY = 0, wide = false, eyeRadius = 9.5) {
  ctx.save();
  ctx.translate(x, y);

  // Sclera
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, 0, eyeRadius, 0, Math.PI * 2);
  ctx.fill();

  // Eye shadow on top
  ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
  ctx.beginPath();
  ctx.arc(0, 0, eyeRadius, Math.PI, 0);
  ctx.fill();

  // Rich colored iris
  const irisR = eyeRadius * 0.65;
  const ix = lookX * (eyeRadius * 0.35);
  const iy = lookY * (eyeRadius * 0.3);

  ctx.fillStyle = '#3e2723';
  ctx.beginPath();
  ctx.arc(ix, iy, irisR, 0, Math.PI * 2);
  ctx.fill();

  // Black pupil
  ctx.fillStyle = '#111111';
  ctx.beginPath();
  ctx.arc(ix, iy, irisR * 0.55, 0, Math.PI * 2);
  ctx.fill();

  // Double catchlight sparkle
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(ix - irisR * 0.32, iy - irisR * 0.32, irisR * 0.32, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(ix + irisR * 0.32, iy + irisR * 0.28, irisR * 0.18, 0, Math.PI * 2);
  ctx.fill();

  // Expressive curved upper lash
  ctx.strokeStyle = '#1c1b18';
  ctx.lineWidth = 3.2;
  ctx.beginPath();
  ctx.arc(0, 0, eyeRadius + 0.5, Math.PI * 1.1, Math.PI * 1.9);
  ctx.stroke();

  ctx.restore();
}

// ----------------------------------------------------------------------------
// Character 1: Real Madrid Friend (Left Side in original video)
// ----------------------------------------------------------------------------
function drawRealMadridFriend(ctx, cx, cy, scale, pose, isSpeaking, t) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  const breathe = Math.sin(t * 3.5) * 2;
  const talkCycle = isSpeaking ? Math.sin(t * 22) : -1;

  // 1. Lower Body / Track Pants
  ctx.fillStyle = '#1c2227';
  ctx.beginPath();
  ctx.roundRect(-70, 50, 140, 110, [10, 10, 0, 0]);
  ctx.fill();
  ctx.strokeStyle = '#0f1316';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Adidas 3 white vertical stripes down pants side seams
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(-65, 52); ctx.lineTo(-65, 160);
  ctx.moveTo(-61, 52); ctx.lineTo(-61, 160);
  ctx.moveTo(-57, 52); ctx.lineTo(-57, 160);
  ctx.moveTo(65, 52); ctx.lineTo(65, 160);
  ctx.moveTo(61, 52); ctx.lineTo(61, 160);
  ctx.moveTo(57, 52); ctx.lineTo(57, 160);
  ctx.stroke();

  // 2. Torso - Crisp White Real Madrid Long-Sleeve Jersey
  ctx.save();
  ctx.translate(0, breathe);

  // Jersey Main Body
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(-82, -50);
  ctx.quadraticCurveTo(-90, 15, -72, 60);
  ctx.lineTo(72, 60);
  ctx.quadraticCurveTo(90, 15, 82, -50);
  ctx.quadraticCurveTo(40, -65, 0, -62);
  ctx.quadraticCurveTo(-40, -65, -82, -50);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#cfd8dc';
  ctx.lineWidth = 3.5;
  ctx.stroke();

  // Silver 3-Stripes along both shoulders
  ctx.strokeStyle = '#b0bec5';
  ctx.lineWidth = 2.8;
  ctx.beginPath();
  ctx.moveTo(-80, -46); ctx.lineTo(-35, -57);
  ctx.moveTo(-78, -42); ctx.lineTo(-33, -53);
  ctx.moveTo(-76, -38); ctx.lineTo(-31, -49);
  ctx.moveTo(80, -46); ctx.lineTo(35, -57);
  ctx.moveTo(78, -42); ctx.lineTo(33, -53);
  ctx.moveTo(76, -38); ctx.lineTo(31, -49);
  ctx.stroke();

  // Left Chest (viewer's right): Real Madrid Crest
  drawRealMadridCrest(ctx, 42, -22, 44);

  // Right Chest (viewer's left): Adidas Logo
  drawAdidasLogo(ctx, -42, -24, 32);

  // Center Chest: "Fly Emirates" Sponsor in Bold Navy
  ctx.save();
  ctx.fillStyle = '#0d233a';
  ctx.textAlign = 'center';
  ctx.font = 'bold 15px "Arial", sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillText('Fly', 0, 5);
  ctx.font = '900 21px "Arial", sans-serif';
  ctx.letterSpacing = '1.8px';
  ctx.fillText('Emirates', 0, 26);
  ctx.restore();

  // Ribbed Jersey Collar
  ctx.fillStyle = '#eceff1';
  ctx.beginPath();
  ctx.arc(0, -62, 26, 0, Math.PI);
  ctx.fill();
  ctx.strokeStyle = '#b0bec5';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Gold Chain Necklace
  ctx.strokeStyle = '#ffd700';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(0, -63, 21, 0.1, Math.PI - 0.1);
  ctx.stroke();

  // Neck
  ctx.fillStyle = '#c58d5e';
  ctx.beginPath();
  ctx.roundRect(-18, -88, 36, 30, 6);
  ctx.fill();
  ctx.strokeStyle = '#8d5528';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // 3. Head & Expressive Face
  ctx.fillStyle = '#c58d5e';
  ctx.beginPath();
  ctx.moveTo(-36, -122);
  ctx.quadraticCurveTo(-42, -80, -24, -62);
  ctx.quadraticCurveTo(0, -54, 24, -62);
  ctx.quadraticCurveTo(42, -80, 36, -122);
  ctx.quadraticCurveTo(0, -154, -36, -122);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#8d5528';
  ctx.lineWidth = 3.5;
  ctx.stroke();

  // Ears
  drawCircle(ctx, -38, -102, 9, '#c58d5e', '#8d5528', 2.5);
  drawCircle(ctx, 38, -102, 9, '#c58d5e', '#8d5528', 2.5);

  // Modern Textured Dark Wavy Hair
  ctx.fillStyle = '#1c1b18';
  ctx.beginPath();
  ctx.moveTo(-42, -112);
  ctx.quadraticCurveTo(-48, -148, -15, -156);
  ctx.quadraticCurveTo(20, -160, 42, -138);
  ctx.quadraticCurveTo(46, -112, 40, -100);
  ctx.lineTo(34, -118);
  ctx.quadraticCurveTo(25, -140, 0, -140);
  ctx.quadraticCurveTo(-25, -140, -34, -118);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.arc(-14, -152, 12, 0, Math.PI);
  ctx.arc(10, -154, 14, 0, Math.PI);
  ctx.fill();

  // Thin Dark Mustache
  ctx.fillStyle = '#261c14';
  ctx.beginPath();
  ctx.ellipse(-9, -78, 9, 3.5, -0.1, 0, Math.PI * 2);
  ctx.ellipse(9, -78, 9, 3.5, 0.1, 0, Math.PI * 2);
  ctx.fill();

  // Nose
  ctx.strokeStyle = '#8d5528';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(0, -106); ctx.lineTo(-3, -87); ctx.lineTo(3, -87);
  ctx.stroke();

  // Dynamic Eyes & Mouth
  if (pose === 'phone_call' || isSpeaking) {
    // Talking on Phone: Smiling happy arcs (^ ^)
    ctx.strokeStyle = '#1c1b18';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(-15, -104, 9, Math.PI * 1.15, Math.PI * 1.85);
    ctx.arc(15, -104, 9, Math.PI * 1.15, Math.PI * 1.85);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(-15, -118, 11, Math.PI * 1.1, Math.PI * 1.9);
    ctx.arc(15, -118, 11, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 64, 129, 0.5)';
    drawCircle(ctx, -26, -90, 9, 'rgba(255, 64, 129, 0.5)', null);
    drawCircle(ctx, 26, -90, 9, 'rgba(255, 64, 129, 0.5)', null);

    if (talkCycle > 0) {
      ctx.fillStyle = '#b71c1c';
      ctx.beginPath();
      ctx.ellipse(0, -68, 11, 9, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-8, -75, 16, 5);
      ctx.fillStyle = '#ff8a80';
      ctx.beginPath(); ctx.arc(0, -62, 7, 0, Math.PI, true); ctx.fill();
      ctx.strokeStyle = '#8d5528'; ctx.lineWidth = 2.5; ctx.stroke();
    } else {
      ctx.strokeStyle = '#8d5528';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, -70, 12, 0.1, Math.PI * 0.9);
      ctx.stroke();
    }

  } else if (pose === 'brother_hug') {
    // Joyfully hugged face
    ctx.strokeStyle = '#1c1b18';
    ctx.lineWidth = 3.8;
    ctx.beginPath();
    ctx.arc(-15, -104, 9, Math.PI * 1.15, Math.PI * 1.85);
    ctx.arc(15, -104, 9, Math.PI * 1.15, Math.PI * 1.85);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, -70, 12, 0, Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#8d5528'; ctx.lineWidth = 3; ctx.stroke();

    ctx.fillStyle = '#00e5ff';
    ctx.beginPath();
    ctx.ellipse(32, -109, 4.5, 7.5, 0.3, 0, Math.PI * 2);
    ctx.fill();

  } else {
    // Awkward guilty side-eye glance with charming cartoon eyes
    drawCartoonEye(ctx, -15, -104, -0.6, 0.1, false, 9.5);
    drawCartoonEye(ctx, 15, -104, -0.6, 0.1, false, 9.5);

    ctx.strokeStyle = '#1c1b18';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(-26, -119); ctx.lineTo(-6, -116);
    ctx.moveTo(6, -116); ctx.lineTo(26, -119);
    ctx.stroke();

    ctx.strokeStyle = '#8d5528';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(-10, -70); ctx.quadraticCurveTo(0, -66, 11, -72);
    ctx.stroke();

    const dropY = -109 + (t * 12) % 20;
    ctx.fillStyle = '#29b6f6';
    ctx.beginPath();
    ctx.ellipse(32, dropY, 4, 7, 0.25, 0, Math.PI * 2);
    ctx.fill();
  }

  // 4. Arms & Gestures
  drawStarballBadge(ctx, -75, -15, 24);

  if (pose === 'phone_call' || isSpeaking) {
    // Hand on hip
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 22;
    ctx.beginPath();
    ctx.moveTo(-75, -42); ctx.lineTo(-105, 10); ctx.lineTo(-72, 55);
    ctx.stroke();
    ctx.strokeStyle = '#cfd8dc'; ctx.lineWidth = 3.5; ctx.stroke();
    drawCircle(ctx, -70, 58, 12, '#c58d5e', '#8d5528', 2.5);

    // Left arm holding phone up to ear
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 22;
    ctx.beginPath();
    ctx.moveTo(75, -42); ctx.lineTo(112, -25); ctx.lineTo(52, -96);
    ctx.stroke();
    ctx.strokeStyle = '#cfd8dc'; ctx.lineWidth = 3.5; ctx.stroke();

    ctx.fillStyle = '#212121';
    ctx.fillRect(45, -82, 16, 7);

    // Modern Smartphone
    ctx.fillStyle = '#0288d1';
    ctx.beginPath();
    ctx.roundRect(38, -128, 26, 48, 6);
    ctx.fill();
    ctx.strokeStyle = '#01579b'; ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = '#e1f5fe';
    ctx.fillRect(42, -123, 18, 38);

    drawCircle(ctx, 48, -99, 11, '#c58d5e', '#8d5528', 2.5);

    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 3.5;
    const ringW = (t * 14) % 3;
    ctx.beginPath();
    ctx.arc(68, -104, 16 + ringW * 8, -0.6, 0.6);
    ctx.stroke();

  } else if (pose === 'brother_hug') {
    // Relaxed hug
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 22;
    ctx.beginPath();
    ctx.moveTo(75, -42); ctx.lineTo(105, 15); ctx.lineTo(82, 60);
    ctx.stroke();
    drawCircle(ctx, 80, 62, 12, '#c58d5e', '#8d5528', 2.5);
    ctx.fillStyle = '#0288d1';
    ctx.fillRect(74, 56, 16, 28);

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 22;
    ctx.beginPath();
    ctx.moveTo(-75, -42); ctx.lineTo(-105, 10); ctx.lineTo(-72, 55);
    ctx.stroke();
    drawCircle(ctx, -70, 58, 12, '#c58d5e', '#8d5528', 2.5);

  } else {
    // Idle pose: hand behind head
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 22;
    ctx.beginPath();
    ctx.moveTo(75, -42); ctx.lineTo(115, -80); ctx.lineTo(48, -132);
    ctx.stroke();
    ctx.strokeStyle = '#cfd8dc'; ctx.lineWidth = 3.5; ctx.stroke();
    drawCircle(ctx, 46, -134, 12, '#c58d5e', '#8d5528', 2.5);

    // Hand on hip
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 22;
    ctx.beginPath();
    ctx.moveTo(-75, -42); ctx.lineTo(-105, 10); ctx.lineTo(-72, 55);
    ctx.stroke();
    ctx.strokeStyle = '#cfd8dc'; ctx.lineWidth = 3.5; ctx.stroke();
    drawCircle(ctx, -70, 58, 12, '#c58d5e', '#8d5528', 2.5);
  }

  ctx.restore(); // restore torso & head
  ctx.restore(); // restore character transform
}

// ----------------------------------------------------------------------------
// Character 2: Green Sweater Friend (The Orator - Right Side)
// ----------------------------------------------------------------------------
function drawGreenSweaterFriend(ctx, cx, cy, scale, pose, isSpeaking, t) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  const breathe = Math.sin(t * 3.5 + 0.8) * 2;
  const talkCycle = isSpeaking ? Math.sin(t * 22) : -1;

  // 1. Lower Body / Seafoam Denim Jeans
  ctx.fillStyle = '#4db6ac';
  ctx.beginPath();
  ctx.roundRect(-70, 50, 140, 110, [10, 10, 0, 0]);
  ctx.fill();
  ctx.strokeStyle = '#00796b';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Denim pockets
  ctx.strokeStyle = '#b2dfdb';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(-42, 65, 24, 0, Math.PI * 0.5);
  ctx.arc(42, 65, 24, Math.PI * 0.5, Math.PI);
  ctx.stroke();

  // 2. Torso - Sage / Olive Green Sweatshirt
  ctx.save();
  ctx.translate(0, breathe);

  // Sweatshirt Body
  ctx.fillStyle = '#6f9372';
  ctx.beginPath();
  ctx.moveTo(-82, -50);
  ctx.quadraticCurveTo(-90, 15, -72, 60);
  ctx.lineTo(72, 60);
  ctx.quadraticCurveTo(90, 15, 82, -50);
  ctx.quadraticCurveTo(40, -65, 0, -62);
  ctx.quadraticCurveTo(-40, -65, -82, -50);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#436946';
  ctx.lineWidth = 3.5;
  ctx.stroke();

  // Ribbed Hem
  ctx.fillStyle = '#5c7e5f';
  ctx.fillRect(-71, 48, 142, 14);
  ctx.strokeStyle = '#436946'; ctx.lineWidth = 2; ctx.strokeRect(-71, 48, 142, 14);

  // "RISK" Black rectangular patch on left chest
  ctx.fillStyle = '#1c1b18';
  ctx.beginPath();
  ctx.roundRect(24, -22, 34, 16, 3);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 11px "Arial", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('RISK', 41, -10);

  // Black Tactical Zipper Pocket on Left Arm Sleeve
  ctx.fillStyle = '#1c1b18';
  ctx.beginPath();
  ctx.roundRect(76, -5, 18, 42, 4);
  ctx.fill();
  ctx.strokeStyle = '#e0e0e0'; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(85, -2); ctx.lineTo(85, 32); ctx.stroke();
  ctx.fillStyle = '#ffffff';
  drawCircle(ctx, 85, 4, 3, '#ffffff', null);

  // Ribbed Collar
  ctx.fillStyle = '#5c7e5f';
  ctx.beginPath();
  ctx.arc(0, -62, 26, 0, Math.PI);
  ctx.fill();
  ctx.strokeStyle = '#436946';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Neck
  ctx.fillStyle = '#c58d5e';
  ctx.beginPath();
  ctx.roundRect(-18, -88, 36, 30, 6);
  ctx.fill();
  ctx.strokeStyle = '#8d5528';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // 3. Head & Facial Expressions
  ctx.fillStyle = '#c58d5e';
  ctx.beginPath();
  ctx.moveTo(-36, -122);
  ctx.quadraticCurveTo(-42, -80, -24, -62);
  ctx.quadraticCurveTo(0, -54, 24, -62);
  ctx.quadraticCurveTo(42, -80, 36, -122);
  ctx.quadraticCurveTo(0, -154, -36, -122);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#8d5528';
  ctx.lineWidth = 3.5;
  ctx.stroke();

  // Ears
  drawCircle(ctx, -38, -102, 9, '#c58d5e', '#8d5528', 2.5);
  drawCircle(ctx, 38, -102, 9, '#c58d5e', '#8d5528', 2.5);

  // Modern Clean Combed Hair with Side Fade
  ctx.fillStyle = '#1c1b18';
  ctx.beginPath();
  ctx.moveTo(-40, -112);
  ctx.quadraticCurveTo(-46, -148, -12, -156);
  ctx.quadraticCurveTo(24, -160, 42, -138);
  ctx.quadraticCurveTo(46, -112, 40, -100);
  ctx.lineTo(34, -118);
  ctx.quadraticCurveTo(20, -140, 0, -140);
  ctx.quadraticCurveTo(-22, -140, -34, -118);
  ctx.closePath();
  ctx.fill();

  // Clean Chin Goatee & Jawline Stubble
  ctx.fillStyle = '#31241b';
  ctx.beginPath();
  ctx.ellipse(0, -60, 14, 9, 0, 0, Math.PI);
  ctx.fill();
  ctx.fillRect(-38, -106, 5, 16);
  ctx.fillRect(33, -106, 5, 16);

  // Nose
  ctx.strokeStyle = '#8d5528';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(0, -106); ctx.lineTo(-3, -87); ctx.lineTo(3, -87);
  ctx.stroke();

  // Dynamic Eyes & Mouth
  if (pose === 'brother_hug') {
    // 180° Flip! Big beaming brotherly love! (^ ^)
    ctx.strokeStyle = '#1c1b18';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(-15, -104, 9, Math.PI * 1.15, Math.PI * 1.85);
    ctx.arc(15, -104, 9, Math.PI * 1.15, Math.PI * 1.85);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(-15, -119, 11, Math.PI * 1.1, Math.PI * 1.9);
    ctx.arc(15, -119, 11, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();

    // Red blush
    ctx.fillStyle = 'rgba(255, 82, 82, 0.5)';
    drawCircle(ctx, -26, -90, 9, 'rgba(255, 82, 82, 0.5)', null);
    drawCircle(ctx, 26, -90, 9, 'rgba(255, 82, 82, 0.5)', null);

    // Giant smile with white teeth
    ctx.fillStyle = '#b71c1c';
    ctx.beginPath();
    ctx.arc(0, -68, 15, 0, Math.PI);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-12, -68, 24, 6);
    ctx.strokeStyle = '#8d5528'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(0, -68, 15, 0, Math.PI); ctx.stroke();

  } else if (pose === 'shocked_overhearing') {
    // Overhearing phone call! Shocked wide cartoon eyes!
    drawCartoonEye(ctx, -15, -104, -0.7, 0, true, 11.5);
    drawCartoonEye(ctx, 15, -104, -0.7, 0, true, 11.5);

    ctx.strokeStyle = '#1c1b18'; ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(-15, -124, 12, Math.PI * 1.15, Math.PI * 1.85);
    ctx.arc(15, -124, 12, Math.PI * 1.15, Math.PI * 1.85);
    ctx.stroke();

    // Open round shocked mouth
    ctx.fillStyle = '#b71c1c';
    drawCircle(ctx, 0, -68, 11, '#b71c1c', '#8d5528', 3);
    ctx.fillStyle = '#ff8a80';
    drawCircle(ctx, 0, -64, 6, '#ff8a80', null);

    // Comical idea lightbulb above head
    ctx.fillStyle = '#ffeb3b';
    drawCircle(ctx, 42, -145, 14, '#ffeb3b', '#f57f17', 2.5);
    ctx.fillStyle = '#f57f17';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('💡', 33, -139);

  } else {
    // Passionate orator shouting to camera with handsome cartoon eyes!
    drawCartoonEye(ctx, -15, -104, 0, 0, false, 9.5);
    drawCartoonEye(ctx, 15, -104, 0, 0, false, 9.5);

    // Deep slanted angry eyebrows (\ /)
    ctx.strokeStyle = '#1c1b18'; ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.moveTo(-28, -122); ctx.lineTo(-4, -114);
    ctx.moveTo(28, -122); ctx.lineTo(4, -114);
    ctx.stroke();

    // Shouting animated mouth
    if (talkCycle > 0) {
      ctx.fillStyle = '#b71c1c';
      ctx.beginPath();
      ctx.ellipse(0, -68, 13, 11, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-10, -77, 20, 6);
      ctx.fillStyle = '#ff8a80';
      ctx.beginPath(); ctx.arc(0, -61, 8, 0, Math.PI, true); ctx.fill();
      ctx.strokeStyle = '#8d5528'; ctx.lineWidth = 2.5; ctx.stroke();
    } else {
      ctx.strokeStyle = '#8d5528'; ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-11, -70); ctx.quadraticCurveTo(0, -74, 11, -70);
      ctx.stroke();
    }
  }

  // 4. Arms & Dramatic Pointing / Hugging
  if (pose === 'brother_hug') {
    // Arm hooked around Real Madrid friend's neck/shoulder from behind!
    ctx.strokeStyle = '#6f9372';
    ctx.lineWidth = 26;
    ctx.beginPath();
    ctx.moveTo(-75, -42);
    ctx.quadraticCurveTo(-110, -65, -145, -35);
    ctx.stroke();
    ctx.strokeStyle = '#436946'; ctx.lineWidth = 3.5; ctx.stroke();

    // Hand resting visibly on Real Madrid friend's chest/shoulder!
    drawCircle(ctx, -148, -35, 14, '#c58d5e', '#8d5528', 3);

    // Right arm giving big enthusiastic thumbs-up!
    ctx.strokeStyle = '#6f9372';
    ctx.lineWidth = 22;
    ctx.beginPath();
    ctx.moveTo(75, -42); ctx.lineTo(115, 0); ctx.lineTo(125, -35);
    ctx.stroke();
    ctx.strokeStyle = '#436946'; ctx.lineWidth = 3.5; ctx.stroke();
    drawCircle(ctx, 128, -38, 14, '#c58d5e', '#8d5528', 3);
    ctx.fillStyle = '#c58d5e';
    ctx.beginPath(); ctx.roundRect(125, -55, 9, 20, 4); ctx.fill();

  } else if (pose === 'shocked_overhearing') {
    ctx.strokeStyle = '#6f9372';
    ctx.lineWidth = 22;
    ctx.beginPath();
    ctx.moveTo(-75, -42); ctx.lineTo(-95, 10); ctx.lineTo(-70, 50);
    ctx.moveTo(75, -42); ctx.lineTo(95, 10); ctx.lineTo(70, 50);
    ctx.stroke();
    drawCircle(ctx, -70, 52, 12, '#c58d5e', '#8d5528', 2.5);
    drawCircle(ctx, 70, 52, 12, '#c58d5e', '#8d5528', 2.5);

  } else {
    // Pointing accusingly at the Real Madrid friend!
    ctx.strokeStyle = '#6f9372';
    ctx.lineWidth = 24;
    ctx.beginPath();
    ctx.moveTo(-75, -42); ctx.lineTo(-115, -10); ctx.lineTo(-145, 12);
    ctx.stroke();
    ctx.strokeStyle = '#436946'; ctx.lineWidth = 3.5; ctx.stroke();

    drawCircle(ctx, -148, 12, 13, '#c58d5e', '#8d5528', 2.5);
    ctx.fillStyle = '#c58d5e';
    ctx.beginPath();
    ctx.roundRect(-172, 8, 26, 8, 4);
    ctx.fill();
    ctx.strokeStyle = '#8d5528'; ctx.lineWidth = 2; ctx.stroke();

    ctx.strokeStyle = '#6f9372';
    ctx.lineWidth = 22;
    ctx.beginPath();
    ctx.moveTo(75, -42); ctx.lineTo(105, 10); ctx.lineTo(82, 55);
    ctx.stroke();
    ctx.strokeStyle = '#436946'; ctx.lineWidth = 3.5; ctx.stroke();
    drawCircle(ctx, 80, 58, 12, '#c58d5e', '#8d5528', 2.5);
  }

  ctx.restore(); // restore torso & head
  ctx.restore(); // restore character transform
}

// ----------------------------------------------------------------------------
// Character 3: Laughing Meme Guy (End Punchline Beat)
// ----------------------------------------------------------------------------
function drawLaughingMemePunchline(ctx, W, H, t) {
  ctx.save();
  const cx = W * 0.5;
  const cy = H * 0.50;

  const numRays = 26;
  for (let i = 0; i < numRays; i++) {
    const a1 = (i * Math.PI * 2) / numRays + t * 0.6;
    const a2 = ((i + 0.5) * Math.PI * 2) / numRays + t * 0.6;
    ctx.fillStyle = i % 2 === 0 ? '#ffb300' : '#ffa000';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, Math.max(W, H) * 1.1, a1, a2);
    ctx.closePath();
    ctx.fill();
  }

  const emojis = ['😂', '🤣', '☕', '🔥', '🤣', '😂'];
  ctx.font = '42px sans-serif';
  for (let e = 0; e < emojis.length; e++) {
    const ex = cx + Math.cos(t * 2 + e * 1.05) * (W * 0.38);
    const ey = cy + Math.sin(t * 2.5 + e * 1.25) * (H * 0.32);
    ctx.fillText(emojis[e], ex, ey);
  }

  const bounce = Math.sin(t * 20) * 8;
  const scale = Math.min(W / 1920, H / 1080) * 2.1;

  ctx.translate(cx, cy + 40 + bounce);
  ctx.scale(scale, scale);

  ctx.fillStyle = '#78909c';
  ctx.beginPath();
  ctx.roundRect(-85, -20, 170, 180, [18, 18, 6, 6]);
  ctx.fill();
  ctx.strokeStyle = '#37474f'; ctx.lineWidth = 4; ctx.stroke();

  ctx.fillStyle = '#90caf9';
  ctx.beginPath();
  ctx.moveTo(-40, -20); ctx.lineTo(0, 60); ctx.lineTo(40, -20);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(0, 10, 28, 0.2, Math.PI - 0.2);
  ctx.stroke();

  ctx.fillStyle = '#607d8b';
  ctx.beginPath();
  ctx.moveTo(-85, -20); ctx.lineTo(-28, 55); ctx.lineTo(-50, 55);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(85, -20); ctx.lineTo(28, 55); ctx.lineTo(50, 55);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#bcaaa4';
  drawCircle(ctx, 74, 50, 16, '#bcaaa4', '#5d4037', 3);
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.roundRect(58, 28, 32, 44, 5); ctx.fill();
  ctx.strokeStyle = '#37474f'; ctx.lineWidth = 2.5; ctx.stroke();
  ctx.fillStyle = '#e53935'; ctx.fillRect(59, 40, 30, 9);
  ctx.fillStyle = '#fbc02d'; ctx.fillRect(59, 52, 30, 9);
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.arc(92, 50, 11, -Math.PI * 0.4, Math.PI * 0.4); ctx.stroke();

  ctx.fillStyle = '#a1724f';
  ctx.beginPath();
  ctx.ellipse(0, -82, 46, 52, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#5d4037'; ctx.lineWidth = 4; ctx.stroke();

  ctx.fillStyle = '#212121';
  ctx.beginPath();
  ctx.arc(0, -98, 47, Math.PI * 0.8, Math.PI * 2.2);
  ctx.fill();
  ctx.fillStyle = '#d50000';
  drawCircle(ctx, 0, -104, 4.5, '#d50000', null);

  ctx.fillStyle = '#212121';
  ctx.beginPath();
  ctx.ellipse(-16, -68, 16, 6, -0.15, 0, Math.PI * 2);
  ctx.ellipse(16, -68, 16, 6, 0.15, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#212121'; ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(-32, -86); ctx.lineTo(-16, -83); ctx.lineTo(-32, -80);
  ctx.moveTo(32, -86); ctx.lineTo(16, -83); ctx.lineTo(32, -80);
  ctx.stroke();

  ctx.fillStyle = '#00e5ff';
  const tearT = (t * 9) % 12;
  ctx.beginPath();
  ctx.ellipse(-42 - tearT * 2, -82 - tearT, 6, 11, -0.6, 0, Math.PI * 2);
  ctx.ellipse(42 + tearT * 2, -82 - tearT, 6, 11, 0.6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#b71c1c';
  ctx.beginPath();
  ctx.arc(0, -60, 27, 0, Math.PI);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-20, -60, 40, 10);
  ctx.strokeStyle = '#3e2723'; ctx.lineWidth = 3.5;
  ctx.beginPath(); ctx.arc(0, -60, 27, 0, Math.PI); ctx.stroke();

  ctx.restore();
}

// ----------------------------------------------------------------------------
// Prominent Cartoon Speech Balloon (Clean Short Comic Pointer)
// ----------------------------------------------------------------------------
function drawSpeechBalloon(ctx, speakerX, speakerHeadTop, speakerName, speechText, theme) {
  ctx.save();
  const W = ctx.canvas.width;
  const bubbleW = Math.min(640, W * 0.90);
  const bubbleH = 100;

  const bubbleY = Math.max(90, speakerHeadTop - bubbleH - 26);
  const bubbleX = Math.max(20, Math.min(W - bubbleW - 20, speakerX - bubbleW * 0.5));

  // Cute short comic pointer triangle attached to bottom edge
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(speakerX - 16, bubbleY + bubbleH);
  ctx.lineTo(speakerX - 6, bubbleY + bubbleH + 22);
  ctx.lineTo(speakerX + 14, bubbleY + bubbleH);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = theme.border;
  ctx.lineWidth = 4;
  ctx.stroke();

  // Main Speech Bubble Body
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(bubbleX, bubbleY, bubbleW, bubbleH, 18);
  ctx.fill();
  ctx.strokeStyle = theme.border;
  ctx.lineWidth = 4;
  ctx.stroke();

  // Speaker Badge on top-left of bubble
  ctx.fillStyle = theme.badgeBg;
  ctx.beginPath();
  ctx.roundRect(bubbleX + 16, bubbleY - 18, 260, 34, 17);
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px "Noto Sans Bengali", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(speakerName, bubbleX + 146, bubbleY + 5);

  // Spoken text inside balloon
  ctx.fillStyle = '#0d1b2a';
  ctx.font = 'bold 21px "Noto Sans Bengali", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(speechText, bubbleX + bubbleW * 0.5, bubbleY + 58);

  ctx.restore();
}

// ----------------------------------------------------------------------------
// Master Frame Renderer: story.frame(ctx, w, h, t)
// ----------------------------------------------------------------------------
function frame(ctx, w, h, t) {
  const isPortrait = h > w;

  ctx.clearRect(0, 0, w, h);

  const beat = BEATS.find(b => t >= b.start && t < b.end) || BEATS[BEATS.length - 1];
  const cue = (CONFIG.cues || []).find(c => t >= c.start && t < c.end);

  const isGreenSpeaking = (t < 20.5) || (t >= 28.0 && t < 39.5);
  const isRealMadridSpeaking = (t >= 20.5 && t < 28.0);
  const isMemeOutro = (t >= 39.5);

  // 1. Meme Outro Beat
  if (isMemeOutro) {
    drawLaughingMemePunchline(ctx, w, h, t);

    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.88)';
    ctx.beginPath();
    ctx.roundRect(w * 0.5 - 340, 50, 680, 64, 16);
    ctx.fill();
    ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 3.5; ctx.stroke();
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 28px "Noto Sans Bengali", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('বন্ধুর গিরগিটির মতো চরম রংবদল! 😂', w * 0.5, 93);
    ctx.restore();
    return;
  }

  // 2. Rural Outdoor Background
  const horizonY = isPortrait ? h * 0.40 : h * 0.50;

  const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY * 1.3);
  skyGrad.addColorStop(0, '#53a7ff');
  skyGrad.addColorStop(0.45, '#99d2ff');
  skyGrad.addColorStop(0.8, '#e6f5ff');
  skyGrad.addColorStop(1, '#fffde7');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  // Clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  for (let c = 0; c < 5; c++) {
    const cx = ((c * (w * 0.26) + t * 5) % (w + 260)) - 130;
    const cy = horizonY * 0.22 + (c % 2) * 45;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 110, 34, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 40, cy - 12, 70, 28, 0, 0, Math.PI * 2);
    ctx.ellipse(cx - 35, cy - 8, 60, 24, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Lush Green Rural Foliage
  ctx.fillStyle = '#2e7d32';
  ctx.beginPath();
  ctx.moveTo(0, horizonY);
  for (let x = 0; x <= w; x += 60) {
    const ty = horizonY - 25 + Math.sin(x * 0.015) * 18 + Math.cos(x * 0.03) * 10;
    ctx.lineTo(x, ty);
  }
  ctx.lineTo(w, horizonY + 80);
  ctx.lineTo(0, horizonY + 80);
  ctx.closePath();
  ctx.fill();

  // Banana Tree fronds
  ctx.fillStyle = '#388e3c';
  for (let b = 0; b < 7; b++) {
    const bx = (b * (w / 6) + 35) % w;
    const by = horizonY - 10;
    ctx.beginPath();
    ctx.ellipse(bx - 35, by - 16, 50, 16, -0.35, 0, Math.PI * 2);
    ctx.ellipse(bx + 35, by - 16, 50, 16, 0.35, 0, Math.PI * 2);
    ctx.fill();
  }

  // Ground
  const groundGrad = ctx.createLinearGradient(0, horizonY, 0, h);
  groundGrad.addColorStop(0, '#cbb89d');
  groundGrad.addColorStop(0.35, '#d9cbba');
  groundGrad.addColorStop(0.75, '#bead96');
  groundGrad.addColorStop(1, '#9b876f');
  ctx.fillStyle = groundGrad;
  ctx.fillRect(0, horizonY, w, h - horizonY);

  // 3. Staging: Medium Close-Up (Waist-Up Framing)
  let charScale, rmX, rmY, greenX, greenY;
  let rmPose = 'idle';
  let greenPose = 'angry_speech';

  if (isPortrait) {
    // 9:16 Vertical - Nicely centered and filling the screen!
    charScale = (w / 1080) * 2.25;
    rmY = h * 0.64;
    greenY = h * 0.64;

    if (t < 20.5) {
      rmX = w * 0.30;
      greenX = w * 0.70;
      rmPose = 'awkward_listening';
      greenPose = 'angry_speech';

    } else if (t < 28.0) {
      rmX = w * 0.32;
      greenX = w * 0.68;
      rmPose = 'phone_call';
      greenPose = 'shocked_overhearing';

    } else {
      rmX = w * 0.40;
      greenX = w * 0.60;
      rmPose = 'brother_hug';
      greenPose = 'brother_hug';
    }

  } else {
    // Landscape 16:9
    charScale = (h / 1080) * 1.95;
    rmY = h * 0.82;
    greenY = h * 0.82;

    if (t < 20.5) {
      rmX = w * 0.36;
      greenX = w * 0.64;
      rmPose = 'awkward_listening';
      greenPose = 'angry_speech';

    } else if (t < 28.0) {
      rmX = w * 0.38;
      greenX = w * 0.62;
      rmPose = 'phone_call';
      greenPose = 'shocked_overhearing';

    } else {
      rmX = w * 0.44;
      greenX = w * 0.56;
      rmPose = 'brother_hug';
      greenPose = 'brother_hug';
    }
  }

  // 4. Render Characters
  drawRealMadridFriend(ctx, rmX, rmY, charScale, rmPose, isRealMadridSpeaking, t);
  drawGreenSweaterFriend(ctx, greenX, greenY, charScale, greenPose, isGreenSpeaking, t);

  // 5. Floating Action & Food Effects
  if (t >= 20.5 && t < 28.0) {
    ctx.save();
    const bx = greenX + 45;
    const by = greenY - charScale * 140;
    ctx.font = '44px sans-serif';
    ctx.fillText('🍗', bx - 35, by + Math.sin(t * 4) * 10);
    ctx.fillText('🍲', bx + 25, by - 35 + Math.sin(t * 3.5) * 10);
    ctx.fillText('😋', bx + 65, by + 10 + Math.sin(t * 5) * 10);
    ctx.restore();

  } else if (t >= 28.0 && t < 39.5) {
    ctx.save();
    const hx = (rmX + greenX) * 0.5;
    const hy = rmY - charScale * 150;
    ctx.font = '42px sans-serif';
    ctx.fillText('❤️', hx - 65, hy + Math.sin(t * 4) * 12);
    ctx.fillText('🤝', hx, hy - 40 + Math.sin(t * 3) * 12);
    ctx.fillText('🍲', hx + 65, hy + Math.sin(t * 4.5) * 12);
    ctx.restore();
  }

  // 6. Cartoon Speech Balloon Placed Comfortably Above Speaker Head
  if (cue) {
    if (isGreenSpeaking) {
      const greenHeadTop = greenY - charScale * 155;
      const bubbleTitle = t >= 28.0 ? '🤝 সবুজ সোয়েটার (১৮০° পল্টি)' : '🎤 কথা বলছে: সবুজ সোয়েটার';
      drawSpeechBalloon(ctx, greenX, greenHeadTop, bubbleTitle, cue.text, {
        border: '#00c853',
        badgeBg: '#1b5e20'
      });
    } else if (isRealMadridSpeaking) {
      const rmHeadTop = rmY - charScale * 155;
      drawSpeechBalloon(ctx, rmX, rmHeadTop, '📱 ফোনে: রিয়াল মাদ্রিদ জার্সি', cue.text, {
        border: '#0091ea',
        badgeBg: '#0d47a1'
      });
    }
  }

  // 7. Top Scene Title Banner
  ctx.save();
  const topTitle = beat.title || 'রিয়াল মাদ্রিদের বন্ধু ও রেস্টুরেন্ট টুইস্ট';
  ctx.font = 'bold 24px "Noto Sans Bengali", sans-serif';
  const tw = ctx.measureText(topTitle).width + 56;
  const pillX = w * 0.5 - tw * 0.5;
  const pillY = 32;

  ctx.fillStyle = 'rgba(15, 20, 25, 0.90)';
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, tw, 50, 25);
  ctx.fill();
  ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 3; ctx.stroke();

  ctx.fillStyle = '#ffd700';
  ctx.textAlign = 'center';
  ctx.fillText(topTitle, w * 0.5, pillY + 34);
  ctx.restore();

  // 8. Bottom Synchronized Subtitle Box
  if (cue) {
    ctx.save();
    const boxW = Math.min(w * 0.94, 1200);
    const boxH = 72;
    const boxX = w * 0.5 - boxW * 0.5;
    const boxY = h - 96;

    ctx.fillStyle = 'rgba(10, 15, 20, 0.92)';
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 16);
    ctx.fill();
    ctx.strokeStyle = isGreenSpeaking ? '#00e676' : '#00e5ff';
    ctx.lineWidth = 3;
    ctx.stroke();

    const speakerTag = isGreenSpeaking ? '[সবুজ সোয়েটার]: ' : '[রিয়াল মাদ্রিদ]: ';
    ctx.font = 'bold 22px "Noto Sans Bengali", sans-serif';
    ctx.textAlign = 'center';

    ctx.fillStyle = isGreenSpeaking ? '#b9f6ca' : '#e0f7fa';
    ctx.fillText(`${speakerTag}"${cue.text}"`, w * 0.5, boxY + 45);
    ctx.restore();
  }
}

// Attach to global export
if (typeof story === 'undefined') {
  globalThis.story = { frame };
} else {
  story.frame = frame;
}
