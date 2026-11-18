// Full-Color 2D Cartoon Animation Engine - Blind Man Bridge Prank
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

// ----------------------------------------------------
// Environments: Garden Path & Bridge over Hyacinth Canal
// ----------------------------------------------------
function drawGardenBG(ctx, W, H, t, vertical) {
  // Dramatic overcast sky (like in original video)
  const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.65);
  skyGrad.addColorStop(0, '#78909c');
  skyGrad.addColorStop(0.4, '#90a4ae');
  skyGrad.addColorStop(0.75, '#b0bec5');
  skyGrad.addColorStop(1, '#cfd8dc');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, H);

  // Soft rolling clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
  for (let c = 0; c < 5; c++) {
    const cx = (W * 0.2 + c * (W * 0.25) + t * 5) % (W + 200) - 100;
    const cy = H * 0.15 + (c % 2) * (H * 0.08);
    ctx.beginPath();
    ctx.ellipse(cx, cy, 140, 45, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 60, cy - 15, 90, 40, 0, 0, Math.PI * 2);
    ctx.ellipse(cx - 50, cy - 10, 80, 35, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Background Green Fence Panels
  const fenceY = H * 0.42;
  const fenceH = H * 0.24;
  ctx.fillStyle = '#2e7d32';
  ctx.fillRect(0, fenceY, W, fenceH);

  // Fence posts & vertical slats
  ctx.strokeStyle = '#1b5e20';
  ctx.lineWidth = 4;
  for (let fx = 0; fx <= W; fx += (vertical ? 60 : 80)) {
    ctx.beginPath();
    ctx.moveTo(fx, fenceY);
    ctx.lineTo(fx, fenceY + fenceH);
    ctx.stroke();
  }

  // Green Lawn on Left/Center
  const lawnY = fenceY + fenceH;
  const lawnGrad = ctx.createLinearGradient(0, lawnY, 0, H);
  lawnGrad.addColorStop(0, '#43a047');
  lawnGrad.addColorStop(0.5, '#4caf50');
  lawnGrad.addColorStop(1, '#388e3c');
  ctx.fillStyle = lawnGrad;
  ctx.fillRect(0, lawnY, W, H - lawnY);

  // Concrete pathway / patio on right
  const pathGrad = ctx.createLinearGradient(0, lawnY, 0, H);
  pathGrad.addColorStop(0, '#b0bec5');
  pathGrad.addColorStop(0.5, '#cfd8dc');
  pathGrad.addColorStop(1, '#90a4ae');
  ctx.fillStyle = pathGrad;

  const pathLeft = W * (vertical ? 0.42 : 0.48);
  ctx.beginPath();
  ctx.moveTo(pathLeft, lawnY);
  ctx.lineTo(W, lawnY);
  ctx.lineTo(W, H);
  ctx.lineTo(pathLeft - (vertical ? 80 : 120), H);
  ctx.closePath();
  ctx.fill();

  // Brick Curb / Ledge separating lawn and path
  ctx.fillStyle = '#8d6e63';
  ctx.strokeStyle = '#5d4037';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(pathLeft - 15, lawnY);
  ctx.lineTo(pathLeft + 20, lawnY);
  ctx.lineTo(pathLeft - (vertical ? 60 : 100), H);
  ctx.lineTo(pathLeft - (vertical ? 95 : 135), H);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Individual bricks on curb
  for (let b = 0; b < 16; b++) {
    const by = lawnY + b * ((H - lawnY) / 16);
    const bx = pathLeft - (b * (vertical ? 5 : 7));
    ctx.beginPath();
    ctx.moveTo(bx - 10, by);
    ctx.lineTo(bx + 20, by);
    ctx.stroke();
  }

  // Ornamental shrubs / bushes on lawn
  const shrubs = [
    { x: 0.12, y: 0.68, r: 45 },
    { x: 0.28, y: 0.72, r: 55 },
    { x: 0.18, y: 0.85, r: 60 }
  ];
  shrubs.forEach(sh => {
    ctx.fillStyle = '#2e7d32';
    drawCircle(ctx, W * sh.x, H * sh.y, sh.r, '#2e7d32', '#1b5e20', 3);
    drawCircle(ctx, W * sh.x + 15, H * sh.y - 10, sh.r * 0.75, '#388e3c', null, 0);
  });
}

function drawBridgeBG(ctx, W, H, t, vertical) {
  // Overcast sky with gloomy atmosphere
  const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.55);
  skyGrad.addColorStop(0, '#607d8b');
  skyGrad.addColorStop(0.5, '#78909c');
  skyGrad.addColorStop(1, '#b0bec5');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, H);

  // Distant Village Trees & Bamboo on Left/Back
  ctx.fillStyle = '#2e7d32';
  ctx.beginPath();
  ctx.moveTo(0, H * 0.45);
  for (let x = 0; x <= W * 0.65; x += 40) {
    const ty = H * 0.42 + Math.sin(x * 0.02) * 20;
    ctx.lineTo(x, ty);
  }
  ctx.lineTo(W * 0.65, H * 0.55);
  ctx.lineTo(0, H * 0.55);
  ctx.closePath();
  ctx.fill();

  // Deep Canal with Lush Green Water Hyacinths (কচুরিপানা)
  const canalW = W * (vertical ? 0.52 : 0.48);
  const hyacinthGrad = ctx.createLinearGradient(0, H * 0.5, 0, H);
  hyacinthGrad.addColorStop(0, '#2e7d32');
  hyacinthGrad.addColorStop(0.4, '#388e3c');
  hyacinthGrad.addColorStop(0.8, '#43a047');
  hyacinthGrad.addColorStop(1, '#1b5e20');
  ctx.fillStyle = hyacinthGrad;
  ctx.fillRect(0, H * 0.5, canalW, H * 0.5);

  // Hyacinth leaf clusters & cute purple blossoms
  for (let i = 0; i < 70; i++) {
    const hx = ((i * 37) % canalW);
    const hy = H * 0.52 + ((i * 53) % (H * 0.46));
    ctx.fillStyle = (i % 2 === 0) ? '#4caf50' : '#388e3c';
    ctx.beginPath();
    ctx.ellipse(hx, hy, 18, 12, (i * 0.5), 0, Math.PI * 2);
    ctx.fill();

    // Occasional purple hyacinth flower
    if (i % 5 === 0) {
      ctx.fillStyle = '#ab47bc';
      drawCircle(ctx, hx, hy - 6, 4.5, '#ab47bc', '#7b1fa2', 1.5);
      ctx.fillStyle = '#ffeb3b';
      drawCircle(ctx, hx, hy - 6, 1.8, '#ffeb3b', null, 0);
    }
  }

  // Concrete Bridge Roadway (Right side)
  const roadGrad = ctx.createLinearGradient(canalW, 0, W, 0);
  roadGrad.addColorStop(0, '#78909c');
  roadGrad.addColorStop(0.3, '#90a4ae');
  roadGrad.addColorStop(1, '#607d8b');
  ctx.fillStyle = roadGrad;
  ctx.fillRect(canalW, H * 0.45, W - canalW, H * 0.55);

  // Mud / debris texture on bridge edge
  ctx.fillStyle = 'rgba(93, 64, 55, 0.4)';
  ctx.fillRect(canalW, H * 0.45, 30, H * 0.55);

  // Concrete Bridge Railing (The Narrow Ledge!)
  // Vertical Railing Posts
  const railTopY = H * (vertical ? 0.62 : 0.58);
  const railBotY = H;
  ctx.fillStyle = '#cfd8dc';
  ctx.strokeStyle = '#37474f';
  ctx.lineWidth = 4;

  // Railing horizontal beam
  const railW = vertical ? 55 : 70;
  const railX = canalW - railW * 0.5;

  ctx.beginPath();
  ctx.roundRect(railX - 15, railTopY, railW + 30, 24, 6);
  strokeFill(ctx, '#eceff1', '#37474f', 4);

  // Concrete posts under the rail
  for (let p = 0; p < 4; p++) {
    const py = railTopY + 24 + p * (H * 0.12);
    ctx.beginPath();
    ctx.roundRect(railX, py, railW, 40, 4);
    strokeFill(ctx, '#b0bec5', '#37474f', 3);
  }

  // Railing main pillar wall
  ctx.fillStyle = '#90a4ae';
  ctx.fillRect(railX + 5, railTopY + 24, railW - 10, H - (railTopY + 24));
  ctx.strokeRect(railX + 5, railTopY + 24, railW - 10, H - (railTopY + 24));

  // Moss and weathering stains on the concrete railing
  ctx.fillStyle = 'rgba(56, 142, 60, 0.35)';
  ctx.fillRect(railX + 5, railTopY + 40, railW - 10, 80);
}

// ----------------------------------------------------
// Character Drawing Functions
// ----------------------------------------------------

// 1. Blind Man with Shades & Walking Stick
function drawBlindMan(ctx, x, y, scale, pose, t) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // Shadow
  ctx.fillStyle = 'rgba(20, 30, 20, 0.35)';
  ctx.beginPath();
  ctx.ellipse(0, 115, 36, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  // Legs & Jeans
  const legSwing = (pose === 'walking') ? Math.sin(t * 7) * 0.3 : 0;
  
  // Left leg (Blue jeans)
  ctx.save();
  ctx.translate(-14, 45);
  ctx.rotate(-legSwing);
  ctx.fillStyle = '#1565c0';
  ctx.beginPath();
  ctx.roundRect(-8, 0, 16, 65, 6);
  ctx.fill();
  ctx.strokeStyle = '#0d47a1'; ctx.lineWidth = 2.5; ctx.stroke();
  // White slide / sandal
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(-10, 60, 22, 12, 5);
  ctx.fill();
  ctx.restore();

  // Right leg
  ctx.save();
  ctx.translate(14, 45);
  ctx.rotate(legSwing);
  ctx.fillStyle = '#1976d2';
  ctx.beginPath();
  ctx.roundRect(-8, 0, 16, 65, 6);
  ctx.fill();
  ctx.strokeStyle = '#0d47a1'; ctx.lineWidth = 2.5; ctx.stroke();
  // White slide
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(-10, 60, 22, 12, 5);
  ctx.fill();
  ctx.restore();

  // Torso & Grey Polo Shirt
  ctx.fillStyle = '#78909c';
  ctx.beginPath();
  ctx.roundRect(-24, -25, 48, 75, 10);
  ctx.fill();
  ctx.strokeStyle = '#37474f'; ctx.lineWidth = 3; ctx.stroke();

  // Collar
  ctx.fillStyle = '#546e7a';
  ctx.beginPath();
  ctx.moveTo(-16, -25); ctx.lineTo(0, -10); ctx.lineTo(16, -25);
  ctx.lineTo(10, -28); ctx.lineTo(-10, -28);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Head & Neck
  // Neck
  ctx.fillStyle = '#d7ccc8';
  ctx.fillRect(-8, -36, 16, 14);

  // Head
  ctx.fillStyle = '#bcaaa4';
  ctx.beginPath();
  ctx.ellipse(0, -55, 20, 24, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#5d4037'; ctx.lineWidth = 2.5; ctx.stroke();

  // Hair & Beard
  ctx.fillStyle = '#212121';
  ctx.beginPath();
  ctx.arc(0, -62, 21, Math.PI * 0.9, Math.PI * 2.1);
  ctx.fill();
  // Neat stubble/beard
  ctx.fillStyle = '#424242';
  ctx.beginPath();
  ctx.ellipse(0, -42, 12, 8, 0, 0, Math.PI);
  ctx.fill();

  // Cool Dark Sunglasses (The iconic blind man shades!)
  ctx.fillStyle = '#121212';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  // Left lens
  ctx.beginPath();
  ctx.roundRect(-17, -60, 15, 12, 3);
  ctx.fill(); ctx.stroke();
  // Right lens
  ctx.beginPath();
  ctx.roundRect(2, -60, 15, 12, 3);
  ctx.fill(); ctx.stroke();
  // Bridge of glasses
  ctx.beginPath();
  ctx.moveTo(-2, -55); ctx.lineTo(2, -55);
  ctx.stroke();

  // Innocent cheerful smile
  ctx.strokeStyle = '#3e2723';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(0, -44, 7, 0.2, Math.PI - 0.2);
  ctx.stroke();

  // Arms & Walking Stick
  if (pose === 'balancing') {
    // Balancing on the railing: one arm holding cane vertically, one arm raised waving!
    // Left arm holding cane
    ctx.strokeStyle = '#78909c';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(-22, -15);
    ctx.lineTo(-45, 10);
    ctx.stroke();

    // Cane (Long silver walking stick)
    ctx.strokeStyle = '#b0bec5';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-45, -20);
    ctx.lineTo(-45, 115);
    ctx.stroke();
    // Cane tip
    ctx.fillStyle = '#ff1744';
    ctx.beginPath();
    ctx.roundRect(-47, 105, 5, 10, 2);
    ctx.fill();

    // Right arm raised high in the air waving happily!
    const wave = Math.sin(t * 8) * 12;
    ctx.strokeStyle = '#78909c';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(22, -15);
    ctx.lineTo(40, -65 + wave);
    ctx.stroke();

    // Open hand waving
    ctx.fillStyle = '#bcaaa4';
    drawCircle(ctx, 42, -72 + wave, 9, '#bcaaa4', '#5d4037', 2);

  } else {
    // Walking cane tapping in front
    const tap = Math.sin(t * 6) * 15;
    ctx.strokeStyle = '#78909c';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(20, -15);
    ctx.lineTo(35, 15);
    ctx.stroke();

    // Walking stick tapping
    ctx.strokeStyle = '#b0bec5';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(35, 15);
    ctx.lineTo(55 + tap, 112);
    ctx.stroke();

    // Left arm relaxed or held
    ctx.strokeStyle = '#78909c';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(-20, -15);
    ctx.lineTo(-30, 25);
    ctx.stroke();
  }

  ctx.restore();
}

// 2. Prankster Friend 1 (Striped Shirt - Mischievous)
function drawFriend1(ctx, x, y, scale, pose, t) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // Shadow
  ctx.fillStyle = 'rgba(20, 30, 20, 0.35)';
  ctx.beginPath();
  ctx.ellipse(0, 115, 34, 11, 0, 0, Math.PI * 2);
  ctx.fill();

  // Dark brown pants
  ctx.fillStyle = '#4e342e';
  ctx.beginPath();
  ctx.roundRect(-20, 45, 17, 65, 6);
  ctx.roundRect(3, 45, 17, 65, 6);
  ctx.fill();

  // White crocs/slides
  ctx.fillStyle = '#f5f5f5';
  ctx.beginPath();
  ctx.roundRect(-22, 105, 20, 11, 5);
  ctx.roundRect(3, 105, 20, 11, 5);
  ctx.fill();

  // Torso: Vertical Black & White Striped Shirt
  ctx.fillStyle = '#212121';
  ctx.beginPath();
  ctx.roundRect(-24, -25, 48, 75, 10);
  ctx.fill();
  ctx.strokeStyle = '#000000'; ctx.lineWidth = 2; ctx.stroke();

  // White stripes
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  for (let s = -18; s <= 18; s += 9) {
    ctx.beginPath();
    ctx.moveTo(s, -25);
    ctx.lineTo(s, 50);
    ctx.stroke();
  }

  // Head
  ctx.fillStyle = '#a1887f';
  ctx.beginPath();
  ctx.ellipse(0, -52, 19, 22, 0, 0, Math.PI * 2);
  ctx.fill();

  // Hair
  ctx.fillStyle = '#1e1e1e';
  ctx.beginPath();
  ctx.arc(0, -58, 20, Math.PI * 0.9, Math.PI * 2.1);
  ctx.fill();

  // Eyes (Smirking / Sneaky squint)
  ctx.strokeStyle = '#212121';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(-7, -52, 4, 0.1, Math.PI * 1.1);
  ctx.arc(7, -52, 4, 0.1, Math.PI * 1.1);
  ctx.stroke();

  // Sneaky grin
  ctx.beginPath();
  ctx.arc(3, -40, 8, 0.2, Math.PI * 0.9);
  ctx.stroke();

  // Arms
  if (pose === 'helping') {
    // Guiding the blind man's arm
    ctx.strokeStyle = '#212121';
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(-20, -10);
    ctx.lineTo(-45, 10);
    ctx.stroke();
  } else if (pose === 'sneaking_laugh') {
    // Hand covering mouth laughing!
    ctx.strokeStyle = '#212121';
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(18, -10);
    ctx.lineTo(8, -38);
    ctx.stroke();
    // Hand over mouth
    drawCircle(ctx, 6, -40, 8, '#a1887f', null, 0);
  }

  ctx.restore();
}

// 3. Prankster Friend 2 (Two-tone Sporty Shirt)
function drawFriend2(ctx, x, y, scale, pose, t) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // Shadow
  ctx.fillStyle = 'rgba(20, 30, 20, 0.35)';
  ctx.beginPath();
  ctx.ellipse(0, 115, 34, 11, 0, 0, Math.PI * 2);
  ctx.fill();

  // Black track pants with red side-stripe
  ctx.fillStyle = '#212121';
  ctx.beginPath();
  ctx.roundRect(-20, 45, 17, 65, 6);
  ctx.roundRect(3, 45, 17, 65, 6);
  ctx.fill();

  // Red track stripe
  ctx.strokeStyle = '#e53935';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-19, 45); ctx.lineTo(-19, 108);
  ctx.moveTo(19, 45); ctx.lineTo(19, 108);
  ctx.stroke();

  // Slides
  ctx.fillStyle = '#757575';
  ctx.beginPath();
  ctx.roundRect(-22, 105, 20, 11, 5);
  ctx.roundRect(3, 105, 20, 11, 5);
  ctx.fill();

  // Torso: Two-tone shirt (White upper chest, dark black lower)
  ctx.fillStyle = '#212121';
  ctx.beginPath();
  ctx.roundRect(-24, -25, 48, 75, 10);
  ctx.fill();
  ctx.strokeStyle = '#000000'; ctx.lineWidth = 2; ctx.stroke();

  // Upper white panel
  ctx.fillStyle = '#e0e0e0';
  ctx.beginPath();
  ctx.roundRect(-24, -25, 48, 35, { topLeft: 10, topRight: 10, bottomLeft: 0, bottomRight: 0 });
  ctx.fill();

  // Head
  ctx.fillStyle = '#8d6e63';
  ctx.beginPath();
  ctx.ellipse(0, -52, 19, 22, 0, 0, Math.PI * 2);
  ctx.fill();

  // Hair (Modern textured fade)
  ctx.fillStyle = '#1e1e1e';
  ctx.beginPath();
  ctx.arc(0, -58, 20, Math.PI * 0.8, Math.PI * 2.2);
  ctx.fill();

  // Smirking laughing face
  ctx.strokeStyle = '#212121';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(-7, -52, 4, 0.1, Math.PI * 1.1);
  ctx.arc(7, -52, 4, 0.1, Math.PI * 1.1);
  ctx.stroke();

  // Wide grin
  ctx.beginPath();
  ctx.arc(0, -42, 8, 0.1, Math.PI * 0.9);
  ctx.stroke();

  // Arms
  if (pose === 'helping') {
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(20, -10);
    ctx.lineTo(45, 10);
    ctx.stroke();
  } else if (pose === 'sneaking_laugh') {
    // Sneaking away gesturing with both hands
    ctx.strokeStyle = '#212121';
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(20, -10);
    ctx.lineTo(35, 15);
    ctx.stroke();
  }

  ctx.restore();
}

// 4. Legendary Laughing Meme Man (Grey Suit, Gold Chains, Chai Cup)
function drawMemeLaugher(ctx, x, y, scale, t) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  const laughShake = Math.sin(t * 22) * 5;
  ctx.translate(0, laughShake);

  // Grey Suit Jacket
  ctx.fillStyle = '#78909c';
  ctx.beginPath();
  ctx.roundRect(-60, 10, 120, 120, 15);
  ctx.fill();
  ctx.strokeStyle = '#37474f'; ctx.lineWidth = 4; ctx.stroke();

  // Light Blue Collared Shirt
  ctx.fillStyle = '#90caf9';
  ctx.beginPath();
  ctx.moveTo(-25, 10); ctx.lineTo(0, 70); ctx.lineTo(25, 10);
  ctx.closePath();
  ctx.fill();

  // Chunky Gold Chains
  ctx.strokeStyle = '#ffd700';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(0, 30, 24, 0.1, Math.PI - 0.1);
  ctx.stroke();
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, 42, 28, 0.2, Math.PI - 0.2);
  ctx.stroke();

  // Head (Tilted back in hysterical laughter)
  ctx.save();
  ctx.translate(0, -35);
  ctx.rotate(0.12);

  // Face
  ctx.fillStyle = '#bcaaa4';
  ctx.beginPath();
  ctx.ellipse(0, 0, 42, 48, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#5d4037'; ctx.lineWidth = 3.5; ctx.stroke();

  // Hairline & Black Hair
  ctx.fillStyle = '#1e1e1e';
  ctx.beginPath();
  ctx.arc(0, -15, 43, Math.PI * 1.05, Math.PI * 1.95);
  ctx.fill();

  // Red Bindi / Tilak dot on forehead
  ctx.fillStyle = '#d50000';
  drawCircle(ctx, 0, -26, 4.5, '#d50000', null, 0);

  // Mustache
  ctx.fillStyle = '#212121';
  ctx.beginPath();
  ctx.ellipse(-14, 8, 16, 6, 0.2, 0, Math.PI * 2);
  ctx.ellipse(14, 8, 16, 6, -0.2, 0, Math.PI * 2);
  ctx.fill();

  // Huge Hysterical Open Laughing Mouth!
  ctx.fillStyle = '#b71c1c';
  ctx.beginPath();
  ctx.ellipse(0, 24, 28, 18, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#3e2723'; ctx.lineWidth = 3; ctx.stroke();

  // Bright White Teeth Row
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(-22, 10, 44, 12, 4);
  ctx.fill();

  // Squeezed Closed Laughing Eyes (> <)
  ctx.strokeStyle = '#212121';
  ctx.lineWidth = 4.5;
  // Left eye
  ctx.beginPath();
  ctx.moveTo(-30, -8); ctx.lineTo(-14, -2); ctx.lineTo(-28, 6);
  ctx.stroke();
  // Right eye
  ctx.beginPath();
  ctx.moveTo(30, -8); ctx.lineTo(14, -2); ctx.lineTo(28, 6);
  ctx.stroke();

  // Flying Laughing Tears!
  ctx.fillStyle = '#29b6f6';
  ctx.beginPath();
  ctx.ellipse(-38, -6, 8, 5, -0.4, 0, Math.PI * 2);
  ctx.ellipse(38, -6, 8, 5, 0.4, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  // Chai / Tea Mug in Hand!
  ctx.save();
  ctx.translate(45, 60);
  // Ceramic Mug
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(-18, -25, 36, 45, 6);
  ctx.fill();
  ctx.strokeStyle = '#212121'; ctx.lineWidth = 3; ctx.stroke();
  // Colorful print stripe on mug
  ctx.fillStyle = '#e91e63';
  ctx.fillRect(-18, -10, 36, 15);
  // Mug handle
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(20, -5, 12, -Math.PI * 0.4, Math.PI * 0.4);
  ctx.stroke();
  ctx.strokeStyle = '#212121'; ctx.lineWidth = 2; ctx.stroke();
  // Gold rings on fingers
  ctx.fillStyle = '#ffd700';
  drawCircle(ctx, -10, 5, 5, '#ffd700', '#b78103', 1.5);
  drawCircle(ctx, 5, 8, 5, '#ffd700', '#b78103', 1.5);

  ctx.restore();

  ctx.restore();
}

// ----------------------------------------------------
// Main Frame Renderer
// ----------------------------------------------------
function frame(ctx, w, h, t) {
  const vertical = h > w;
  const scene = BEATS.find(b => t >= b.start && t < b.end) || BEATS[BEATS.length - 1];
  const local = t - scene.start;
  const font = '"Noto Sans Bengali", "Nirmala UI", Arial, sans-serif';

  // Scene Background & Action
  if (scene.action === 'blind_man_asking') {
    // Scene 1: Lawn background; Blind man walks up asking two sitting friends
    drawGardenBG(ctx, w, h, t, vertical);

    const groundY = vertical ? h * 0.72 : h * 0.68;
    const pScale = vertical ? 2.1 : 1.75;

    // Blind man on left walking forward with cane tapping
    const bX = w * (vertical ? 0.32 : 0.34);
    drawBlindMan(ctx, bX, groundY, pScale, 'walking', t);

    // Two friends on right sitting on the curb
    const f1X = w * (vertical ? 0.64 : 0.62);
    const f2X = w * (vertical ? 0.82 : 0.76);
    drawFriend1(ctx, f1X, groundY + 15, pScale * 0.95, 'sitting', t);
    drawFriend2(ctx, f2X, groundY + 20, pScale * 0.95, 'sitting', t);

    // Speech / Question bubble
    if (Math.sin(t * 4) > 0.2) {
      ctx.font = `bold ${vertical ? 50 : 38}px sans-serif`;
      ctx.fillStyle = '#ffea00';
      ctx.strokeStyle = '#000000'; ctx.lineWidth = 5;
      ctx.strokeText('🦯❓', bX, groundY - 160);
      ctx.fillText('🦯❓', bX, groundY - 160);
    }

  } else if (scene.action === 'friends_guiding_blind') {
    // Scene 2: Two friends holding blind man's arms, guiding him towards the bridge
    drawGardenBG(ctx, w, h, t, vertical);

    const groundY = vertical ? h * 0.72 : h * 0.68;
    const pScale = vertical ? 2.15 : 1.8;

    // Group walking together across center
    const groupX = w * 0.5 + Math.sin(local * 2) * 15;

    // Friend 1 on left holding arm
    drawFriend1(ctx, groupX - (vertical ? 95 : 105), groundY, pScale * 0.95, 'helping', t);

    // Blind Man in center
    drawBlindMan(ctx, groupX, groundY, pScale, 'walking', t);

    // Friend 2 on right holding arm
    drawFriend2(ctx, groupX + (vertical ? 95 : 105), groundY, pScale * 0.95, 'helping', t);

    // Helping angel / star emoji
    ctx.font = `${vertical ? 48 : 36}px sans-serif`;
    ctx.fillText('😇', groupX, groundY - 170);

  } else if (scene.action === 'lifting_on_railing') {
    // Scene 3: The Bridge! Lifting him onto the narrow railing
    drawBridgeBG(ctx, w, h, t, vertical);

    const canalW = w * (vertical ? 0.52 : 0.48);
    const railTopY = h * (vertical ? 0.62 : 0.58);
    const pScale = vertical ? 2.0 : 1.7;

    // Target position right on top of the railing beam!
    const targetY = railTopY - (110 * pScale);
    const groundY = h * 0.74;

    // Lifting animation progress
    const liftP = Math.min(1, local / 3.0);
    const blindY = groundY * (1 - liftP) + targetY * liftP;

    // Friends hoisting him from road side
    drawFriend1(ctx, canalW + (vertical ? 80 : 90), groundY, pScale * 0.95, 'helping', t);
    drawFriend2(ctx, canalW + (vertical ? 150 : 170), groundY, pScale * 0.95, 'helping', t);

    // Blind man stepping up onto the railing
    drawBlindMan(ctx, canalW, blindY, pScale, (liftP > 0.8 ? 'balancing' : 'walking'), t);

    // Danger / Warning indicator
    ctx.font = `bold ${vertical ? 50 : 40}px sans-serif`;
    ctx.fillText('⚠️', canalW, targetY - 70);

  } else if (scene.action === 'balancing_on_edge') {
    // Scene 4: Standing & balancing on the narrow railing, waving happily, friends sneaking off!
    drawBridgeBG(ctx, w, h, t, vertical);

    const canalW = w * (vertical ? 0.52 : 0.48);
    const railTopY = h * (vertical ? 0.62 : 0.58);
    const pScale = vertical ? 2.05 : 1.75;

    // Blind man standing directly on the white railing beam
    const blindY = railTopY - (110 * pScale);
    drawBlindMan(ctx, canalW, blindY, pScale, 'balancing', t);

    // Friends sneaking away to the right, giggling
    const sneakX = w * (vertical ? 0.72 : 0.70) + (local * 20);
    drawFriend1(ctx, sneakX, h * 0.74, pScale * 0.9, 'sneaking_laugh', t);
    drawFriend2(ctx, sneakX + 75, h * 0.74, pScale * 0.9, 'sneaking_laugh', t);

    // Waving text / thank you heart in vibrant yellow with black outline
    ctx.font = `bold ${vertical ? 50 : 38}px ${font}`;
    ctx.fillStyle = '#ffea00';
    ctx.strokeStyle = '#000000'; ctx.lineWidth = 7;
    ctx.strokeText('🙋‍♂️ "ধন্যবাদ ভাই!"', canalW - 20, blindY - 90);
    ctx.fillText('🙋‍♂️ "ধন্যবাদ ভাই!"', canalW - 20, blindY - 90);

    ctx.font = `${vertical ? 54 : 40}px sans-serif`;
    ctx.fillText('🤭', sneakX, h * 0.74 - 130);

  } else if (scene.action === 'meme_laugh_punchline') {
    // Scene 5: Extreme meme laugh punchline!
    // Colorful vibrant meme burst background
    const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, w * 0.75);
    bgGrad.addColorStop(0, '#ffeb3b');
    bgGrad.addColorStop(0.4, '#ff9800');
    bgGrad.addColorStop(0.8, '#f44336');
    bgGrad.addColorStop(1, '#880e4f');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Rotating celebration burst rays
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.rotate(t * 0.6);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
    for (let r = 0; r < 14; r++) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, w, (r / 14) * Math.PI * 2, ((r + 0.5) / 14) * Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // Giant Laughing Meme Man in Center!
    const mScale = vertical ? 2.5 : 2.0;
    drawMemeLaugher(ctx, w / 2, h * (vertical ? 0.52 : 0.50), mScale, t);

    // Floating Laughing Emojis
    const lY = (t * 60) % 120;
    ctx.font = `${vertical ? 60 : 48}px sans-serif`;
    ctx.fillText('😂', w * 0.22, h * 0.35 - lY);
    ctx.fillText('🤣', w * 0.78, h * 0.38 - lY);
    ctx.fillText('💥', w * 0.30, h * 0.72 - lY * 0.5);
    ctx.fillText('☕', w * 0.72, h * 0.70 - lY * 0.5);
  }

  // Smooth scene fade transitions
  const fade = Math.min(cl(local / 0.22), cl((scene.end - t) / 0.22));
  if (fade < 1) {
    ctx.fillStyle = `rgba(0, 0, 0, ${(1 - fade) * 0.25})`;
    ctx.fillRect(0, 0, w, h);
  }

  // Text Styling & Overlay
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Scene Title Banner (Top)
  const titleSize = vertical ? 52 : 36;
  ctx.font = `800 ${titleSize}px ${font}`;
  const titleLines = wrap(ctx, scene.title, w * 0.88);

  titleLines.forEach((lineText, i) => {
    const yPos = (vertical ? 180 : 65) + i * titleSize * 1.35;
    ctx.strokeStyle = '#000000'; ctx.lineWidth = 8;
    ctx.strokeText(lineText, w / 2, yPos);
    ctx.fillStyle = '#ffea00';
    ctx.fillText(lineText, w / 2, yPos);
  });

  // Bengali Subtitles (Heavy black outline + crisp white fill)
  if (CONFIG.captions) {
    const cue = CONFIG.cues?.find(c => t >= c.start && t < c.end);
    const caption = cue ? cue.text : (!CONFIG.cues ? scene.narration : '');

    if (caption) {
      const capSize = vertical ? 48 : 34;
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

  // Zero watermark per user instruction!
}

function H_railY(h, vertical) {
  return h * (vertical ? 0.52 : 0.48);
}

// Global hook
window.frame = frame;
