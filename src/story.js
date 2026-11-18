// Full-Color 2D Cartoon Animation Engine - Blind Man Bus Prank (Full Concept)
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
// Environments: Garden Lawn & The Concrete Bridge
// ----------------------------------------------------
function drawGardenBG(ctx, W, H, t, vertical) {
  // Overcast sky with soft cinematic lighting
  const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.65);
  skyGrad.addColorStop(0, '#78909c');
  skyGrad.addColorStop(0.4, '#90a4ae');
  skyGrad.addColorStop(0.75, '#b0bec5');
  skyGrad.addColorStop(1, '#cfd8dc');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, H);

  // Soft moving clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  for (let c = 0; c < 5; c++) {
    const cx = (W * 0.15 + c * (W * 0.25) + t * 4) % (W + 200) - 100;
    const cy = H * 0.12 + (c % 2) * (H * 0.08);
    ctx.beginPath();
    ctx.ellipse(cx, cy, 140, 45, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 60, cy - 15, 90, 40, 0, 0, Math.PI * 2);
    ctx.ellipse(cx - 50, cy - 10, 80, 35, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Green Security Fence Panels (Background)
  const fenceY = H * 0.38;
  const fenceH = H * 0.28;
  ctx.fillStyle = '#2e7d32';
  ctx.fillRect(0, fenceY, W, fenceH);

  // Fence vertical slats
  ctx.strokeStyle = '#1b5e20';
  ctx.lineWidth = 4;
  for (let fx = 0; fx <= W; fx += (vertical ? 60 : 80)) {
    ctx.beginPath();
    ctx.moveTo(fx, fenceY);
    ctx.lineTo(fx, fenceY + fenceH);
    ctx.stroke();
  }

  // Lush Green Grass Lawn
  const lawnY = fenceY + fenceH;
  const lawnGrad = ctx.createLinearGradient(0, lawnY, 0, H);
  lawnGrad.addColorStop(0, '#43a047');
  lawnGrad.addColorStop(0.5, '#4caf50');
  lawnGrad.addColorStop(1, '#388e3c');
  ctx.fillStyle = lawnGrad;
  ctx.fillRect(0, lawnY, W, H - lawnY);

  // Concrete driveway / path on right
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
  ctx.lineTo(pathLeft - (vertical ? 75 : 110), H);
  ctx.closePath();
  ctx.fill();

  // Brick Curb / Ledge separating lawn and path (where friends sit!)
  ctx.fillStyle = '#b71c1c';
  ctx.strokeStyle = '#5d4037';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(pathLeft - 20, lawnY);
  ctx.lineTo(pathLeft + 25, lawnY);
  ctx.lineTo(pathLeft - (vertical ? 55 : 90), H);
  ctx.lineTo(pathLeft - (vertical ? 95 : 130), H);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Red clay brick pattern
  for (let b = 0; b < 18; b++) {
    const by = lawnY + b * ((H - lawnY) / 18);
    const bx = pathLeft - (b * (vertical ? 4.5 : 6.5));
    ctx.beginPath();
    ctx.moveTo(bx - 15, by);
    ctx.lineTo(bx + 20, by);
    ctx.stroke();
  }

  // Ornamental shrubs / bushes on lawn
  const shrubs = [
    { x: 0.12, y: 0.70, r: 45 },
    { x: 0.28, y: 0.74, r: 55 },
    { x: 0.18, y: 0.88, r: 60 }
  ];
  shrubs.forEach(sh => {
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
  for (let i = 0; i < 75; i++) {
    const hx = ((i * 37) % canalW);
    const hy = H * 0.52 + ((i * 53) % (H * 0.46));
    ctx.fillStyle = (i % 2 === 0) ? '#4caf50' : '#388e3c';
    ctx.beginPath();
    ctx.ellipse(hx, hy, 20, 13, (i * 0.5), 0, Math.PI * 2);
    ctx.fill();

    // Occasional purple hyacinth flower
    if (i % 5 === 0) {
      drawCircle(ctx, hx, hy - 6, 4.5, '#ab47bc', '#7b1fa2', 1.5);
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

  // Concrete Bridge Railing (The Narrow Ledge!)
  const railTopY = H * (vertical ? 0.62 : 0.58);
  const railW = vertical ? 60 : 75;
  const railX = canalW - railW * 0.5;

  // Railing main pillar wall
  ctx.fillStyle = '#90a4ae';
  ctx.fillRect(railX + 5, railTopY + 24, railW - 10, H - (railTopY + 24));
  ctx.strokeStyle = '#37474f'; ctx.lineWidth = 4;
  ctx.strokeRect(railX + 5, railTopY + 24, railW - 10, H - (railTopY + 24));

  // Concrete posts under the rail
  for (let p = 0; p < 4; p++) {
    const py = railTopY + 28 + p * (H * 0.11);
    ctx.beginPath();
    ctx.roundRect(railX - 2, py, railW + 4, 38, 4);
    strokeFill(ctx, '#b0bec5', '#37474f', 3);
  }

  // Top Railing Beam (Where the blind man balances!)
  ctx.beginPath();
  ctx.roundRect(railX - 16, railTopY, railW + 32, 28, 6);
  strokeFill(ctx, '#eceff1', '#37474f', 4);
}

// ----------------------------------------------------
// Bottle & Cups (The Catalyst for the Prank!)
// ----------------------------------------------------
function drawBottleAndCups(ctx, x, y, spilled, t) {
  ctx.save();
  ctx.translate(x, y);

  if (!spilled) {
    // Standing bottle
    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.beginPath();
    ctx.ellipse(0, 32, 16, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Glass bottle body
    ctx.fillStyle = 'rgba(255, 236, 179, 0.85)';
    ctx.beginPath();
    ctx.roundRect(-12, -15, 24, 45, 4);
    ctx.fill();
    ctx.strokeStyle = '#5d4037'; ctx.lineWidth = 2.5; ctx.stroke();

    // Amber liquor inside
    ctx.fillStyle = '#e65100';
    ctx.fillRect(-10, 0, 20, 28);

    // Label on bottle
    ctx.fillStyle = '#3f51b5';
    ctx.fillRect(-10, 5, 20, 14);
    ctx.fillStyle = '#ffd700';
    drawCircle(ctx, 0, 12, 4, '#ffd700', null, 0);

    // Bottle neck & cap
    ctx.fillStyle = 'rgba(255, 236, 179, 0.85)';
    ctx.fillRect(-5, -28, 10, 15);
    ctx.strokeRect(-5, -28, 10, 15);
    // Gold cap
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(-6, -32, 12, 6);

    // Plastic Cups
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#bdbdbd'; ctx.lineWidth = 1.5;
    // Cup 1
    ctx.beginPath();
    ctx.moveTo(18, 15); ctx.lineTo(28, 15); ctx.lineTo(26, 32); ctx.lineTo(20, 32);
    ctx.closePath(); ctx.fill(); ctx.stroke();
    // Cup 2
    ctx.beginPath();
    ctx.moveTo(-28, 15); ctx.lineTo(-18, 15); ctx.lineTo(-20, 32); ctx.lineTo(-26, 32);
    ctx.closePath(); ctx.fill(); ctx.stroke();

  } else {
    // Spilled / knocked down bottle!
    // Spilled amber liquid puddle
    ctx.fillStyle = 'rgba(230, 81, 0, 0.8)';
    ctx.beginPath();
    ctx.ellipse(5, 25, 40, 14, -0.1, 0, Math.PI * 2);
    ctx.fill();

    // Splashing droplets!
    const splash = Math.sin(t * 12) * 5;
    ctx.fillStyle = '#e65100';
    drawCircle(ctx, -20, 15 - splash, 4, '#e65100', null, 0);
    drawCircle(ctx, 35, 18 - splash, 5, '#e65100', null, 0);
    drawCircle(ctx, 15, 8 - splash * 1.5, 4.5, '#e65100', null, 0);

    // Bottle lying horizontally on its side
    ctx.save();
    ctx.translate(-5, 20);
    ctx.rotate(Math.PI * 0.48);

    ctx.fillStyle = 'rgba(255, 236, 179, 0.85)';
    ctx.beginPath();
    ctx.roundRect(-12, -15, 24, 45, 4);
    ctx.fill();
    ctx.strokeStyle = '#5d4037'; ctx.lineWidth = 2.5; ctx.stroke();

    // Partial empty liquor
    ctx.fillStyle = '#e65100';
    ctx.fillRect(-10, 15, 20, 12);

    // Neck & cap
    ctx.fillStyle = 'rgba(255, 236, 179, 0.85)';
    ctx.fillRect(-5, -28, 10, 15);
    ctx.strokeRect(-5, -28, 10, 15);
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(-6, -32, 12, 6);
    ctx.restore();

    // Knocked over cups
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(32, 28, 8, 5, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(-32, 26, 8, 5, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Big dramatic SPLASH text!
    ctx.font = 'bold 28px sans-serif';
    ctx.fillStyle = '#ff1744';
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3;
    ctx.strokeText('💥 SPLASH!', 0, -10);
    ctx.fillText('💥 SPLASH!', 0, -10);
  }

  ctx.restore();
}

// ----------------------------------------------------
// Character 1: Blind Man (With Cane, Shades & Iconic Bus Wave)
// ----------------------------------------------------
function drawBlindMan(ctx, x, y, scale, pose, t) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // Shadow
  ctx.fillStyle = 'rgba(20, 30, 20, 0.35)';
  ctx.beginPath();
  ctx.ellipse(0, 115, 34, 11, 0, 0, Math.PI * 2);
  ctx.fill();

  // Legs & Jeans
  const legSwing = (pose === 'walking') ? Math.sin(t * 7) * 0.3 : 0;
  
  // Left leg (Blue jeans)
  ctx.save();
  ctx.translate(-13, 45);
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
  ctx.translate(13, 45);
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
  // Neat beard
  ctx.fillStyle = '#424242';
  ctx.beginPath();
  ctx.ellipse(0, -42, 12, 8, 0, 0, Math.PI);
  ctx.fill();

  // Iconic Dark Sunglasses (Shades)
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
  // Bridge
  ctx.beginPath();
  ctx.moveTo(-2, -55); ctx.lineTo(2, -55);
  ctx.stroke();

  // Cheerful innocent open-mouthed expression!
  if (pose === 'calling_bus') {
    // Shouting "এই বাস থামান!"
    ctx.fillStyle = '#b71c1c';
    ctx.beginPath();
    ctx.ellipse(0, -43, 8, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#3e2723'; ctx.lineWidth = 2; ctx.stroke();
    // White upper teeth
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(-6, -49, 12, 5, 2);
    ctx.fill();
  } else {
    // Friendly smile
    ctx.strokeStyle = '#3e2723';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, -44, 7, 0.2, Math.PI - 0.2);
    ctx.stroke();
  }

  // Arms & Walking Stick
  if (pose === 'calling_bus') {
    // Left hand holding cane pointing downwards into the hyacinth abyss!
    ctx.strokeStyle = '#78909c';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(-22, -15);
    ctx.lineTo(-42, 15);
    ctx.stroke();

    // Walking stick dipping down over the edge
    ctx.strokeStyle = '#b0bec5';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-42, 15);
    ctx.lineTo(-48, 140);
    ctx.stroke();
    // Cane red tip
    ctx.fillStyle = '#ff1744';
    ctx.beginPath();
    ctx.roundRect(-50, 130, 5, 10, 2);
    ctx.fill();

    // RIGHT ARM RAISED STRAIGHT UP TO THE SKY (Iconic bus stop pose!)
    const armWave = Math.sin(t * 8) * 10;
    ctx.strokeStyle = '#78909c';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(22, -15);
    ctx.lineTo(28, -75 + armWave);
    ctx.stroke();

    // Open hand waving to the oncoming "bus"
    ctx.fillStyle = '#bcaaa4';
    drawCircle(ctx, 29, -84 + armWave, 10, '#bcaaa4', '#5d4037', 2);
    // Five fingers spread out waving
    for (let f = 0; f < 5; f++) {
      const fAngle = -Math.PI * 0.5 + (f - 2) * 0.35;
      ctx.beginPath();
      ctx.moveTo(29 + Math.cos(fAngle) * 8, -84 + armWave + Math.sin(fAngle) * 8);
      ctx.lineTo(29 + Math.cos(fAngle) * 17, -84 + armWave + Math.sin(fAngle) * 17);
      ctx.stroke();
    }

  } else if (pose === 'cane_clink') {
    // Stick forcefully tapping forward knocking the bottle!
    ctx.strokeStyle = '#78909c';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(20, -15);
    ctx.lineTo(48, 5);
    ctx.stroke();

    // Metal cane hitting the brick
    ctx.strokeStyle = '#b0bec5';
    ctx.lineWidth = 5.5;
    ctx.beginPath();
    ctx.moveTo(48, 5);
    ctx.lineTo(82, 115);
    ctx.stroke();

    // Clink impact sparks!
    ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 2.5;
    for (let s = 0; s < 4; s++) {
      const sAng = s * (Math.PI * 0.5);
      ctx.beginPath();
      ctx.moveTo(82, 115);
      ctx.lineTo(82 + Math.cos(sAng) * 15, 115 + Math.sin(sAng) * 15);
      ctx.stroke();
    }

  } else {
    // Normal walking cane
    const tap = Math.sin(t * 6) * 12;
    ctx.strokeStyle = '#78909c';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(20, -15);
    ctx.lineTo(35, 15);
    ctx.stroke();

    // Stick
    ctx.strokeStyle = '#b0bec5';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(35, 15);
    ctx.lineTo(55 + tap, 112);
    ctx.stroke();

    // Left arm
    ctx.strokeStyle = '#78909c';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(-20, -15);
    ctx.lineTo(-30, 25);
    ctx.stroke();
  }

  ctx.restore();
}

// ----------------------------------------------------
// Character 2: Friend 1 (Striped Shirt - Mischief Master)
// ----------------------------------------------------
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

  // White slides
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

  // White vertical stripes
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

  // Facial Expression depending on pose
  if (pose === 'shocked_angry') {
    // Eyes wide open in horror looking at spilled bottle!
    ctx.fillStyle = '#ffffff';
    drawCircle(ctx, -7, -54, 7, '#ffffff', '#212121', 2);
    drawCircle(ctx, 7, -54, 7, '#ffffff', '#212121', 2);
    // Pupils looking down in shock
    ctx.fillStyle = '#d50000';
    drawCircle(ctx, -7, -51, 3.5, '#d50000', null, 0);
    drawCircle(ctx, 7, -51, 3.5, '#d50000', null, 0);

    // Mouth wide open in angry shock (NOOO!)
    ctx.fillStyle = '#b71c1c';
    ctx.beginPath();
    ctx.roundRect(-8, -42, 16, 12, 3);
    ctx.fill();

  } else if (pose === 'laughing_uncontrollably') {
    // Squeezed laughing eyes with tears!
    ctx.strokeStyle = '#212121';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-12, -54); ctx.lineTo(-4, -50); ctx.lineTo(-12, -46);
    ctx.moveTo(12, -54); ctx.lineTo(4, -50); ctx.lineTo(12, -46);
    ctx.stroke();

    // Huge wide open laughing grin!
    ctx.fillStyle = '#b71c1c';
    ctx.beginPath();
    ctx.arc(0, -38, 11, 0, Math.PI);
    ctx.fill();

    // Tears flying!
    ctx.fillStyle = '#29b6f6';
    drawCircle(ctx, -18, -48, 4, '#29b6f6', null, 0);
    drawCircle(ctx, 18, -48, 4, '#29b6f6', null, 0);

  } else {
    // Sneaky plotting grin
    ctx.strokeStyle = '#212121';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(-7, -52, 4, 0.1, Math.PI * 1.1);
    ctx.arc(7, -52, 4, 0.1, Math.PI * 1.1);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(3, -40, 8, 0.2, Math.PI * 0.9);
    ctx.stroke();
  }

  // Arms
  if (pose === 'helping') {
    ctx.strokeStyle = '#212121';
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(-20, -10);
    ctx.lineTo(-45, 10);
    ctx.stroke();
  } else if (pose === 'laughing_uncontrollably') {
    // Holding stomach laughing
    ctx.strokeStyle = '#212121';
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(-20, -10); ctx.lineTo(-5, 15);
    ctx.moveTo(20, -10); ctx.lineTo(5, 15);
    ctx.stroke();
  }

  ctx.restore();
}

// ----------------------------------------------------
// Character 3: Friend 2 (Two-Tone Sporty Shirt)
// ----------------------------------------------------
function drawFriend2(ctx, x, y, scale, pose, t) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // Shadow
  ctx.fillStyle = 'rgba(20, 30, 20, 0.35)';
  ctx.beginPath();
  ctx.ellipse(0, 115, 34, 11, 0, 0, Math.PI * 2);
  ctx.fill();

  // Black track pants with red stripe
  ctx.fillStyle = '#212121';
  ctx.beginPath();
  ctx.roundRect(-20, 45, 17, 65, 6);
  ctx.roundRect(3, 45, 17, 65, 6);
  ctx.fill();

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

  // Hair
  ctx.fillStyle = '#1e1e1e';
  ctx.beginPath();
  ctx.arc(0, -58, 20, Math.PI * 0.8, Math.PI * 2.2);
  ctx.fill();

  // Facial Expression
  if (pose === 'shocked_angry') {
    ctx.fillStyle = '#ffffff';
    drawCircle(ctx, -7, -54, 7, '#ffffff', '#212121', 2);
    drawCircle(ctx, 7, -54, 7, '#ffffff', '#212121', 2);
    ctx.fillStyle = '#d50000';
    drawCircle(ctx, -7, -51, 3.5, '#d50000', null, 0);
    drawCircle(ctx, 7, -51, 3.5, '#d50000', null, 0);

    // Jaw dropped
    ctx.fillStyle = '#b71c1c';
    ctx.beginPath();
    ctx.roundRect(-8, -42, 16, 12, 3);
    ctx.fill();

  } else if (pose === 'laughing_uncontrollably') {
    ctx.strokeStyle = '#212121';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-12, -54); ctx.lineTo(-4, -50); ctx.lineTo(-12, -46);
    ctx.moveTo(12, -54); ctx.lineTo(4, -50); ctx.lineTo(12, -46);
    ctx.stroke();

    ctx.fillStyle = '#b71c1c';
    ctx.beginPath();
    ctx.arc(0, -38, 11, 0, Math.PI);
    ctx.fill();

    // Tears
    ctx.fillStyle = '#29b6f6';
    drawCircle(ctx, -18, -48, 4, '#29b6f6', null, 0);
    drawCircle(ctx, 18, -48, 4, '#29b6f6', null, 0);

  } else {
    // Scheming grin
    ctx.strokeStyle = '#212121';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(-7, -52, 4, 0.1, Math.PI * 1.1);
    ctx.arc(7, -52, 4, 0.1, Math.PI * 1.1);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, -42, 8, 0.1, Math.PI * 0.9);
    ctx.stroke();
  }

  // Arms
  if (pose === 'helping') {
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(20, -10);
    ctx.lineTo(45, 10);
    ctx.stroke();
  } else if (pose === 'laughing_uncontrollably') {
    // Pointing finger and laughing
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(-20, -10);
    ctx.lineTo(-45, -15);
    ctx.stroke();
  }

  ctx.restore();
}

// ----------------------------------------------------
// Character 4: Laughing Meme Legend (Punchline!)
// ----------------------------------------------------
function drawMemeLaugher(ctx, x, y, scale, t) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  const laughShake = Math.sin(t * 24) * 6;
  ctx.translate(0, laughShake);

  // Grey Suit Jacket
  ctx.fillStyle = '#78909c';
  ctx.beginPath();
  ctx.roundRect(-60, 10, 120, 120, 15);
  ctx.fill();
  ctx.strokeStyle = '#37474f'; ctx.lineWidth = 4; ctx.stroke();

  // Light Blue Shirt
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

  // Hair
  ctx.fillStyle = '#1e1e1e';
  ctx.beginPath();
  ctx.arc(0, -15, 43, Math.PI * 1.05, Math.PI * 1.95);
  ctx.fill();

  // Red Bindi / Tilak dot on forehead
  drawCircle(ctx, 0, -26, 4.5, '#d50000', null, 0);

  // Mustache
  ctx.fillStyle = '#212121';
  ctx.beginPath();
  ctx.ellipse(-14, 8, 16, 6, 0.2, 0, Math.PI * 2);
  ctx.ellipse(14, 8, 16, 6, -0.2, 0, Math.PI * 2);
  ctx.fill();

  // Huge Hysterical Laughing Mouth!
  ctx.fillStyle = '#b71c1c';
  ctx.beginPath();
  ctx.ellipse(0, 24, 28, 18, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#3e2723'; ctx.lineWidth = 3; ctx.stroke();

  // White Teeth
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(-22, 10, 44, 12, 4);
  ctx.fill();

  // Closed Laughing Eyes (> <)
  ctx.strokeStyle = '#212121';
  ctx.lineWidth = 4.5;
  ctx.beginPath();
  ctx.moveTo(-30, -8); ctx.lineTo(-14, -2); ctx.lineTo(-28, 6);
  ctx.moveTo(30, -8); ctx.lineTo(14, -2); ctx.lineTo(28, 6);
  ctx.stroke();

  // Flying Laughing Tears!
  ctx.fillStyle = '#29b6f6';
  ctx.beginPath();
  ctx.ellipse(-38, -6, 9, 6, -0.4, 0, Math.PI * 2);
  ctx.ellipse(38, -6, 9, 6, 0.4, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  // Chai / Tea Mug in Hand!
  ctx.save();
  ctx.translate(45, 60);
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(-18, -25, 36, 45, 6);
  ctx.fill();
  ctx.strokeStyle = '#212121'; ctx.lineWidth = 3; ctx.stroke();
  // Pink stripe on cup
  ctx.fillStyle = '#e91e63';
  ctx.fillRect(-18, -10, 36, 15);
  // Handle
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(20, -5, 12, -Math.PI * 0.4, Math.PI * 0.4);
  ctx.stroke();
  ctx.strokeStyle = '#212121'; ctx.lineWidth = 2; ctx.stroke();
  // Gold rings
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

  // Scene Selection & Action Direction
  if (scene.action === 'bottle_knockdown') {
    // Scene 1: The Spilled Bottle Incident!
    drawGardenBG(ctx, w, h, t, vertical);

    const groundY = vertical ? h * 0.72 : h * 0.68;
    const pScale = vertical ? 2.1 : 1.75;
    const pathLeft = w * (vertical ? 0.42 : 0.48);

    // Bottle position on the brick curb
    const bottleX = pathLeft - 10;
    const bottleY = groundY + 10;
    const hasSpilled = local > 2.0;

    // Draw Bottle & Cups
    drawBottleAndCups(ctx, bottleX, bottleY, hasSpilled, t);

    // Blind man walking towards the curb
    const walkProgress = Math.min(1, local / 2.2);
    const bX = (w * 0.15) * (1 - walkProgress) + (bottleX - 60) * walkProgress;
    const blindPose = (local >= 1.8 && local <= 2.8) ? 'cane_clink' : 'walking';
    drawBlindMan(ctx, bX, groundY, pScale, blindPose, t);

    // Friends sitting on curb
    const f1X = w * (vertical ? 0.64 : 0.62);
    const f2X = w * (vertical ? 0.82 : 0.76);
    const friendPose = hasSpilled ? 'shocked_angry' : 'sitting';
    drawFriend1(ctx, f1X, groundY + 15, pScale * 0.95, friendPose, t);
    drawFriend2(ctx, f2X, groundY + 20, pScale * 0.95, friendPose, t);

    // Question / Asking text from blind man
    if (local > 2.8) {
      ctx.font = `bold ${vertical ? 44 : 34}px ${font}`;
      ctx.fillStyle = '#ffea00';
      ctx.strokeStyle = '#000000'; ctx.lineWidth = 6;
      ctx.strokeText('🦯 "ভাই, বাস কোনদিকে?"', bX, groundY - 160);
      ctx.fillText('🦯 "ভাই, বাস কোনদিকে?"', bX, groundY - 160);

      // Angry exclamation from friends
      ctx.fillStyle = '#ff1744';
      ctx.strokeText('😡 "আমাদের বোতল শেষ!"', f1X + 20, groundY - 140);
      ctx.fillText('😡 "আমাদের বোতল শেষ!"', f1X + 20, groundY - 140);
    }

  } else if (scene.action === 'fake_help_revenge') {
    // Scene 2: Fake Helping March (Plotting Revenge)
    drawGardenBG(ctx, w, h, t, vertical);

    const groundY = vertical ? h * 0.72 : h * 0.68;
    const pScale = vertical ? 2.15 : 1.8;

    // Walking across the driveway
    const groupX = w * 0.5 + Math.sin(local * 2) * 15;

    // Friend 1 on left holding arm with devil smirk
    drawFriend1(ctx, groupX - (vertical ? 95 : 105), groundY, pScale * 0.95, 'helping', t);

    // Blind Man in center
    drawBlindMan(ctx, groupX, groundY, pScale, 'walking', t);

    // Friend 2 on right holding arm
    drawFriend2(ctx, groupX + (vertical ? 95 : 105), groundY, pScale * 0.95, 'helping', t);

    // Devil revenge thought bubble above friends!
    ctx.font = `bold ${vertical ? 44 : 34}px ${font}`;
    ctx.fillStyle = '#ffea00';
    ctx.strokeStyle = '#000000'; ctx.lineWidth = 6;
    ctx.strokeText('😈 "তোরে আজ এমন বাসে তুলব..."', groupX, groundY - 170);
    ctx.fillText('😈 "তোরে আজ এমন বাসে তুলব..."', groupX, groundY - 170);

  } else if (scene.action === 'lifting_on_railing') {
    // Scene 3: The Deceptive Boarding (Lifting him onto the bridge railing)
    drawBridgeBG(ctx, w, h, t, vertical);

    const canalW = w * (vertical ? 0.52 : 0.48);
    const railTopY = h * (vertical ? 0.62 : 0.58);
    const pScale = vertical ? 2.0 : 1.7;

    const targetY = railTopY - (110 * pScale);
    const groundY = h * 0.74;

    // Step up animation
    const liftP = Math.min(1, local / 3.0);
    const blindY = groundY * (1 - liftP) + targetY * liftP;

    // Friends hoisting him
    drawFriend1(ctx, canalW + (vertical ? 80 : 90), groundY, pScale * 0.95, 'helping', t);
    drawFriend2(ctx, canalW + (vertical ? 150 : 170), groundY, pScale * 0.95, 'helping', t);

    // Blind man stepping up
    drawBlindMan(ctx, canalW, blindY, pScale, (liftP > 0.8 ? 'calling_bus' : 'walking'), t);

    // Text: "ভাই সামনে সিঁড়ি, পা তুলে দাঁড়ান!"
    ctx.font = `bold ${vertical ? 44 : 34}px ${font}`;
    ctx.fillStyle = '#ffea00';
    ctx.strokeStyle = '#000000'; ctx.lineWidth = 6;
    ctx.strokeText('🪜 "ভাই সামনে সিঁড়ি, সাবধানে উঠুন!"', canalW + 60, targetY - 60);
    ctx.fillText('🪜 "ভাই সামনে সিঁড়ি, সাবধানে উঠুন!"', canalW + 60, targetY - 60);

  } else if (scene.action === 'calling_bus_on_edge') {
    // Scene 4: Calling the Bus on the Railing! (The peak hilarious scene!)
    drawBridgeBG(ctx, w, h, t, vertical);

    const canalW = w * (vertical ? 0.52 : 0.48);
    const railTopY = h * (vertical ? 0.62 : 0.58);
    const pScale = vertical ? 2.05 : 1.75;

    // Blind man standing on the narrow railing, ARM RAISED HIGH WAVING TO STOP THE BUS!
    const blindY = railTopY - (110 * pScale);
    drawBlindMan(ctx, canalW, blindY, pScale, 'calling_bus', t);

    // Friends backing away laughing uncontrollably!
    const sneakX = w * (vertical ? 0.72 : 0.70) + (local * 15);
    drawFriend1(ctx, sneakX, h * 0.74, pScale * 0.9, 'laughing_uncontrollably', t);
    drawFriend2(ctx, sneakX + 75, h * 0.74, pScale * 0.9, 'laughing_uncontrollably', t);

    // Speech banner: "এই গাড়ি থামান! বাস থামান!"
    ctx.font = `bold ${vertical ? 52 : 40}px ${font}`;
    ctx.fillStyle = '#ffea00';
    ctx.strokeStyle = '#000000'; ctx.lineWidth = 7;
    ctx.strokeText('🚌 "এই বাস থামান! বাস!!" 🙋‍♂️', canalW - 20, blindY - 95);
    ctx.fillText('🚌 "এই বাস থামান! বাস!!" 🙋‍♂️', canalW - 20, blindY - 95);

    // Laughing reactions from friends
    ctx.font = `${vertical ? 50 : 38}px sans-serif`;
    ctx.fillText('🤣🤣🤣', sneakX + 30, h * 0.74 - 130);

  } else if (scene.action === 'meme_laugh_punchline') {
    // Scene 5: Ultimate Laughing Meme Man Punchline!
    const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, w * 0.75);
    bgGrad.addColorStop(0, '#ffeb3b');
    bgGrad.addColorStop(0.4, '#ff9800');
    bgGrad.addColorStop(0.8, '#f44336');
    bgGrad.addColorStop(1, '#880e4f');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Rotating burst rays
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.rotate(t * 0.8);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    for (let r = 0; r < 14; r++) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, w, (r / 14) * Math.PI * 2, ((r + 0.5) / 14) * Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // Giant Laughing Meme Legend in Center!
    const mScale = vertical ? 2.5 : 2.0;
    drawMemeLaugher(ctx, w / 2, h * (vertical ? 0.52 : 0.50), mScale, t);

    // Floating laughing emojis
    const lY = (t * 70) % 130;
    ctx.font = `${vertical ? 64 : 50}px sans-serif`;
    ctx.fillText('😂', w * 0.20, h * 0.35 - lY);
    ctx.fillText('🤣', w * 0.80, h * 0.38 - lY);
    ctx.fillText('💥', w * 0.28, h * 0.72 - lY * 0.5);
    ctx.fillText('☕', w * 0.72, h * 0.70 - lY * 0.5);
  }

  // Smooth scene fade transitions
  const fade = Math.min(cl(local / 0.22), cl((scene.end - t) / 0.22));
  if (fade < 1) {
    ctx.fillStyle = `rgba(0, 0, 0, ${(1 - fade) * 0.25})`;
    ctx.fillRect(0, 0, w, h);
  }

  // Scene Title Banner (Top)
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
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

// Global hook
window.frame = frame;
