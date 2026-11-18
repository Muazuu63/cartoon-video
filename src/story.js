// Full-Color 2D Cartoon Animation Engine - Puchke Cat Duo (Swagger Walk & Adventure)
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
// Lush Green Meadow & Sunny Nature Background
// ----------------------------------------------------
function drawNatureBG(ctx, W, H, t, vertical) {
  // Vibrant Sky Gradient (Sunny day with soft warmth)
  const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.7);
  skyGrad.addColorStop(0, '#58b4f7');
  skyGrad.addColorStop(0.35, '#8be0f9');
  skyGrad.addColorStop(0.65, '#c8f0fc');
  skyGrad.addColorStop(1, '#eaf8db');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, H);

  // Distant warm sunlight glow
  const sunX = W * 0.82;
  const sunY = H * 0.18;
  const sunGlow = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, W * 0.45);
  sunGlow.addColorStop(0, 'rgba(255, 255, 220, 0.45)');
  sunGlow.addColorStop(0.3, 'rgba(255, 245, 180, 0.22)');
  sunGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = sunGlow;
  ctx.fillRect(0, 0, W, H * 0.8);

  // Distant soft hill treeline (Layer 1 - deep background)
  ctx.save();
  ctx.fillStyle = '#689f38';
  ctx.beginPath();
  ctx.moveTo(0, H * 0.48);
  for (let x = 0; x <= W; x += 60) {
    const y = H * 0.46 + Math.sin(x * 0.005 + 1.2) * (H * 0.04) + Math.cos(x * 0.012) * 12;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(W, H);
  ctx.lineTo(0, H);
  ctx.closePath();
  ctx.fill();

  // Distant Trees & Bamboo stalks (Layer 2)
  ctx.fillStyle = '#497d26';
  ctx.beginPath();
  ctx.moveTo(0, H * 0.53);
  for (let x = 0; x <= W; x += 40) {
    const y = H * 0.51 + Math.sin(x * 0.008 + 2.5) * (H * 0.035) + Math.sin(x * 0.02) * 8;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(W, H);
  ctx.lineTo(0, H);
  ctx.closePath();
  ctx.fill();

  // Bamboo grove silhouettes on the upper right/left
  ctx.strokeStyle = '#33691e';
  ctx.lineWidth = vertical ? 5 : 7;
  for (let i = 0; i < 9; i++) {
    const bx = W * 0.05 + i * (W * 0.032);
    const by1 = H * 0.22 + Math.sin(i * 1.5) * 30;
    const by2 = H * 0.58;
    ctx.beginPath();
    ctx.moveTo(bx, by2);
    ctx.quadraticCurveTo(bx + Math.sin(t * 0.5 + i) * 15, (by1 + by2) / 2, bx + Math.sin(t * 0.5 + i) * 25, by1);
    ctx.stroke();

    // Bamboo leafy clusters
    ctx.fillStyle = '#558b2f';
    for (let j = 0; j < 4; j++) {
      const ly = by1 + j * 35;
      const lx = bx + Math.sin(t * 0.5 + i) * (20 - j * 4);
      ctx.beginPath();
      ctx.ellipse(lx + 15, ly, 18, 6, Math.PI * 0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(lx - 15, ly + 8, 18, 6, -Math.PI * 0.15, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Right side bamboo trees
  for (let i = 0; i < 8; i++) {
    const bx = W * 0.75 + i * (W * 0.035);
    const by1 = H * 0.20 + Math.cos(i * 1.3) * 35;
    const by2 = H * 0.56;
    ctx.beginPath();
    ctx.moveTo(bx, by2);
    ctx.quadraticCurveTo(bx + Math.cos(t * 0.6 + i) * 15, (by1 + by2) / 2, bx + Math.cos(t * 0.6 + i) * 22, by1);
    ctx.stroke();

    ctx.fillStyle = '#689f38';
    for (let j = 0; j < 4; j++) {
      const ly = by1 + j * 38;
      const lx = bx + Math.cos(t * 0.6 + i) * (18 - j * 3);
      ctx.beginPath();
      ctx.ellipse(lx - 16, ly, 18, 6, -Math.PI * 0.18, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Midground Bushes & Foliage (Layer 3 - Rich lush green bushes)
  const bushGrad = ctx.createLinearGradient(0, H * 0.5, 0, H * 0.75);
  bushGrad.addColorStop(0, '#558b2f');
  bushGrad.addColorStop(0.6, '#33691e');
  bushGrad.addColorStop(1, '#255012');
  ctx.fillStyle = bushGrad;

  ctx.beginPath();
  ctx.moveTo(0, H * 0.62);
  for (let x = 0; x <= W; x += 30) {
    const wave = Math.sin(x * 0.015) * 25 + Math.cos(x * 0.035) * 14;
    ctx.lineTo(x, H * 0.58 + wave);
  }
  ctx.lineTo(W, H);
  ctx.lineTo(0, H);
  ctx.closePath();
  ctx.fill();

  // Foreground Grassy Lawn & Walking Trail
  const grassGrad = ctx.createLinearGradient(0, H * 0.65, 0, H);
  grassGrad.addColorStop(0, '#7cb342');
  grassGrad.addColorStop(0.3, '#8bc34a');
  grassGrad.addColorStop(0.7, '#689f38');
  grassGrad.addColorStop(1, '#457a1e');
  ctx.fillStyle = grassGrad;
  ctx.fillRect(0, H * 0.66, W, H * 0.34);

  // Dirt/grass footpath texture in center
  const pathGrad = ctx.createLinearGradient(0, H * 0.66, 0, H);
  pathGrad.addColorStop(0, 'rgba(161, 136, 127, 0.25)');
  pathGrad.addColorStop(0.5, 'rgba(141, 110, 99, 0.35)');
  pathGrad.addColorStop(1, 'rgba(121, 85, 72, 0.4)');
  ctx.fillStyle = pathGrad;

  ctx.beginPath();
  const trailTopLeft = W * 0.38;
  const trailTopRight = W * 0.62;
  const trailBotLeft = W * 0.15;
  const trailBotRight = W * 0.85;
  ctx.moveTo(trailTopLeft, H * 0.66);
  ctx.bezierCurveTo(W * 0.35, H * 0.78, W * 0.22, H * 0.88, trailBotLeft, H);
  ctx.lineTo(trailBotRight, H);
  ctx.bezierCurveTo(W * 0.75, H * 0.88, W * 0.65, H * 0.78, trailTopRight, H * 0.66);
  ctx.closePath();
  ctx.fill();

  // Lush Grass Blades Swaying in Wind
  ctx.strokeStyle = '#558b2f';
  ctx.lineWidth = 2.5;
  for (let i = 0; i < 45; i++) {
    const gx = (i * (W / 40) + Math.sin(i * 12) * 15) % W;
    const gy = H * 0.68 + (i * 17) % (H * 0.3);
    const sway = Math.sin(t * 3 + i) * 8;
    ctx.beginPath();
    ctx.moveTo(gx, gy);
    ctx.quadraticCurveTo(gx + sway * 0.5, gy - 16, gx + sway, gy - 26);
    ctx.stroke();
  }

  // Little Meadow Flowers (Pink, Yellow, White buttercups)
  const flowers = [
    { x: 0.15, y: 0.72, c: '#ffeb3b' },
    { x: 0.22, y: 0.84, c: '#ffffff' },
    { x: 0.32, y: 0.76, c: '#ff80ab' },
    { x: 0.70, y: 0.74, c: '#ffeb3b' },
    { x: 0.80, y: 0.82, c: '#ffffff' },
    { x: 0.88, y: 0.70, c: '#ff4081' },
    { x: 0.28, y: 0.92, c: '#ffee58' },
    { x: 0.75, y: 0.90, c: '#f48fb1' }
  ];
  flowers.forEach(fl => {
    const fx = W * fl.x;
    const fy = H * fl.y;
    ctx.fillStyle = fl.c;
    for (let a = 0; a < 5; a++) {
      const ang = (a / 5) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(fx + Math.cos(ang) * 5, fy + Math.sin(ang) * 5, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = '#ff9800';
    ctx.beginPath();
    ctx.arc(fx, fy, 3.5, 0, Math.PI * 2);
    ctx.fill();
  });

  // Animated Fluttering Butterflies
  for (let b = 0; b < 2; b++) {
    const bPhase = t * 2.2 + b * 3.14;
    const bx = W * (0.25 + b * 0.45) + Math.sin(bPhase * 0.8) * (W * 0.15);
    const by = H * (0.55 + b * 0.1) + Math.cos(bPhase * 1.2) * (H * 0.08);
    const flap = Math.sin(t * 18 + b);

    ctx.save();
    ctx.translate(bx, by);
    ctx.fillStyle = b === 0 ? '#ffea00' : '#4fc3f7';
    ctx.strokeStyle = '#212121';
    ctx.lineWidth = 1.2;

    // Left wing
    ctx.beginPath();
    ctx.ellipse(-6 * Math.abs(flap), -3, 8 * Math.abs(flap), 10, -0.3, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    // Right wing
    ctx.beginPath();
    ctx.ellipse(6 * Math.abs(flap), -3, 8 * Math.abs(flap), 10, 0.3, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    // Butterfly body
    ctx.fillStyle = '#263238';
    ctx.beginPath();
    ctx.ellipse(0, 0, 2, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Floating dandelion seeds / warm air particles
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  for (let p = 0; p < 12; p++) {
    const px = (W * 0.1 + p * (W * 0.08) + t * 22) % W;
    const py = (H * 0.3 + Math.sin(t * 1.5 + p) * 45 + p * 30) % (H * 0.7);
    ctx.beginPath();
    ctx.arc(px, py, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

// ----------------------------------------------------
// Big Tuxedo Cat (Boro Biral - Boss Swagger & Relaxed)
// ----------------------------------------------------
function drawBigCat(ctx, x, y, scale, state, t) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  const bob = Math.sin(t * 8) * 5;
  const legSwing = Math.sin(t * 8);

  if (state === 'walk_away') {
    // Walking away from camera (viewed from behind / 3/4)
    // Shadow under feet
    ctx.fillStyle = 'rgba(20, 40, 10, 0.35)';
    ctx.beginPath();
    ctx.ellipse(0, 50, 45, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    // Back legs walking
    // Left back leg (white sock)
    ctx.save();
    ctx.translate(-20, 20);
    ctx.rotate(-legSwing * 0.35);
    ctx.fillStyle = '#1e1e1e';
    ctx.beginPath();
    ctx.roundRect(-8, 0, 16, 32, 8);
    ctx.fill();
    // White sock
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(-8, 20, 16, 14, 6);
    ctx.fill();
    ctx.restore();

    // Right back leg (white sock)
    ctx.save();
    ctx.translate(20, 20);
    ctx.rotate(legSwing * 0.35);
    ctx.fillStyle = '#1e1e1e';
    ctx.beginPath();
    ctx.roundRect(-8, 0, 16, 32, 8);
    ctx.fill();
    // White sock
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(-8, 20, 16, 14, 6);
    ctx.fill();
    ctx.restore();

    // Cat Rear & Body (Black back, white belly sides)
    ctx.save();
    ctx.translate(0, bob);

    // Body oval
    ctx.fillStyle = '#1e1e1e';
    ctx.beginPath();
    ctx.ellipse(0, -5, 34, 42, 0, 0, Math.PI * 2);
    ctx.fill();

    // White belly fur patch showing on sides
    ctx.fillStyle = '#f8f9fa';
    ctx.beginPath();
    ctx.ellipse(-18, 5, 12, 22, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(18, 5, 12, 22, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Spine / Black coat contour
    ctx.fillStyle = '#121212';
    ctx.beginPath();
    ctx.ellipse(0, 8, 22, 30, 0, 0, Math.PI * 2);
    ctx.fill();

    // Back of head & Ears
    ctx.fillStyle = '#1e1e1e';
    ctx.beginPath();
    ctx.ellipse(0, -42, 26, 22, 0, 0, Math.PI * 2);
    ctx.fill();

    // Ears (Pointy black ears)
    ctx.fillStyle = '#121212';
    // Left ear
    ctx.beginPath();
    ctx.moveTo(-24, -45);
    ctx.lineTo(-32, -72);
    ctx.lineTo(-12, -58);
    ctx.closePath();
    ctx.fill();
    // Right ear
    ctx.beginPath();
    ctx.moveTo(24, -45);
    ctx.lineTo(32, -72);
    ctx.lineTo(12, -58);
    ctx.closePath();
    ctx.fill();

    // Pink inner ear trim visible from angle
    ctx.fillStyle = '#ff80ab';
    ctx.beginPath();
    ctx.ellipse(-22, -56, 5, 9, -0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(22, -56, 5, 9, 0.4, 0, Math.PI * 2);
    ctx.fill();

    // High Erect Tail with swagger curve (Just like reference video!)
    const tailSway = Math.sin(t * 6) * 12;
    ctx.strokeStyle = '#121212';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.bezierCurveTo(tailSway * 0.5, -30, tailSway, -80, tailSway * 1.5 + 10, -115);
    ctx.stroke();

    // White tail tip
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(tailSway * 1.3 + 7, -100);
    ctx.lineTo(tailSway * 1.5 + 10, -115);
    ctx.stroke();

    ctx.restore();

  } else if (state === 'lying_down' || state === 'smiling') {
    // Big cat resting comfortably on the lawn (Sphinx/Loaf pose)
    // Drop shadow
    ctx.fillStyle = 'rgba(20, 40, 10, 0.35)';
    ctx.beginPath();
    ctx.ellipse(10, 38, 75, 18, 0, 0, Math.PI * 2);
    ctx.fill();

    // Tail swishing gently on grass
    const swish = Math.sin(t * 3) * 15;
    ctx.strokeStyle = '#1e1e1e';
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(60, 22);
    ctx.bezierCurveTo(90, 25, 120 + swish, 15, 140 + swish, -5);
    ctx.stroke();
    // White tip
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(125 + swish, 10);
    ctx.lineTo(140 + swish, -5);
    ctx.stroke();

    // Hind quarters & Body resting
    ctx.fillStyle = '#1e1e1e';
    ctx.beginPath();
    ctx.ellipse(35, 15, 48, 28, 0.08, 0, Math.PI * 2);
    ctx.fill();

    // White belly and chest patch
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(-15, 16, 28, 22, -0.1, 0, Math.PI * 2);
    ctx.fill();

    // Front paws tucked forward
    ctx.fillStyle = '#ffffff';
    // Front left paw
    ctx.beginPath();
    ctx.roundRect(-45, 24, 38, 14, 7);
    ctx.fill();
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Front right paw
    ctx.beginPath();
    ctx.roundRect(-30, 26, 36, 14, 7);
    ctx.fill();
    ctx.stroke();

    // Cat Head (Upright, handsome, boss expression)
    ctx.save();
    ctx.translate(-25, -12);
    const headTilt = Math.sin(t * 1.5) * 0.05;
    ctx.rotate(headTilt);

    // Black ears
    ctx.fillStyle = '#121212';
    // Left ear
    ctx.beginPath();
    ctx.moveTo(-22, -20);
    ctx.lineTo(-28, -52);
    ctx.lineTo(-8, -32);
    ctx.closePath();
    ctx.fill();
    // Right ear
    ctx.beginPath();
    ctx.moveTo(8, -32);
    ctx.lineTo(26, -52);
    ctx.lineTo(24, -20);
    ctx.closePath();
    ctx.fill();

    // Inner ears (pink)
    ctx.fillStyle = '#ff80ab';
    ctx.beginPath();
    ctx.ellipse(-18, -36, 6, 11, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(18, -36, 6, 11, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Head base (Round cartoon head)
    ctx.fillStyle = '#1e1e1e';
    ctx.beginPath();
    ctx.arc(0, -10, 28, 0, Math.PI * 2);
    ctx.fill();

    // Tuxedo white muzzle & forehead blaze
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(0, -32);
    ctx.lineTo(-10, -5);
    ctx.bezierCurveTo(-22, 5, -18, 16, 0, 16);
    ctx.bezierCurveTo(18, 16, 22, 5, 10, -5);
    ctx.closePath();
    ctx.fill();

    // Little pink nose
    ctx.fillStyle = '#ff80ab';
    ctx.beginPath();
    ctx.moveTo(-5, 2);
    ctx.lineTo(5, 2);
    ctx.lineTo(0, 7);
    ctx.closePath();
    ctx.fill();

    // Mouth
    ctx.strokeStyle = '#212121';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(-7, 9);
    ctx.quadraticCurveTo(-3, 12, 0, 7);
    ctx.quadraticCurveTo(3, 12, 7, 9);
    ctx.stroke();

    // Big expressive cartoon eyes
    const blink = (t % 3.8 < 0.18);
    if (state === 'smiling') {
      // Content happy closed eyes (^ ^)
      ctx.strokeStyle = '#1b5e20';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.arc(-11, -8, 7, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(11, -8, 7, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke();

      // Cheerful blush
      ctx.fillStyle = 'rgba(255, 64, 129, 0.35)';
      ctx.beginPath();
      ctx.arc(-18, 2, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(18, 2, 7, 0, Math.PI * 2);
      ctx.fill();
    } else if (blink) {
      // Blinking
      ctx.strokeStyle = '#212121';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-17, -8); ctx.lineTo(-5, -8);
      ctx.moveTo(5, -8); ctx.lineTo(17, -8);
      ctx.stroke();
    } else {
      // Emerald green cat eyes looking fondly towards Puchke
      ctx.fillStyle = '#76ff03';
      ctx.beginPath();
      ctx.ellipse(-11, -8, 8, 10, -0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(11, -8, 8, 10, 0.1, 0, Math.PI * 2);
      ctx.fill();

      // Pupil (slit / dilated)
      ctx.fillStyle = '#121212';
      ctx.beginPath();
      ctx.ellipse(-12, -8, 3.5, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(10, -8, 3.5, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Eye shine highlight
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-13, -11, 2.5, 0, Math.PI * 2);
      ctx.arc(9, -11, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Whiskers
    ctx.strokeStyle = '#424242';
    ctx.lineWidth = 1.8;
    // Left whiskers
    ctx.beginPath();
    ctx.moveTo(-12, 5); ctx.lineTo(-38, 2);
    ctx.moveTo(-12, 8); ctx.lineTo(-36, 12);
    ctx.stroke();
    // Right whiskers
    ctx.beginPath();
    ctx.moveTo(12, 5); ctx.lineTo(38, 2);
    ctx.moveTo(12, 8); ctx.lineTo(36, 12);
    ctx.stroke();

    ctx.restore();
  }

  ctx.restore();
}

// ----------------------------------------------------
// Little Puchke Kitten (Curious, Swagger, Adorable)
// ----------------------------------------------------
function drawPuchkeKitten(ctx, x, y, scale, state, t) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  const bob = Math.sin(t * 11) * 4;
  const legSwing = Math.sin(t * 11);

  if (state === 'walk_away') {
    // Little kitten walking away with proud erect tail!
    // Shadow
    ctx.fillStyle = 'rgba(20, 40, 10, 0.35)';
    ctx.beginPath();
    ctx.ellipse(0, 36, 26, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    // Tiny legs
    ctx.save();
    ctx.translate(-12, 14);
    ctx.rotate(-legSwing * 0.4);
    ctx.fillStyle = '#8d6e63';
    ctx.beginPath();
    ctx.roundRect(-5, 0, 10, 22, 5);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.translate(12, 14);
    ctx.rotate(legSwing * 0.4);
    ctx.fillStyle = '#8d6e63';
    ctx.beginPath();
    ctx.roundRect(-5, 0, 10, 22, 5);
    ctx.fill();
    ctx.restore();

    // Body & Fur
    ctx.save();
    ctx.translate(0, bob);

    ctx.fillStyle = '#a1887f';
    ctx.beginPath();
    ctx.ellipse(0, -2, 22, 26, 0, 0, Math.PI * 2);
    ctx.fill();

    // Tabby Stripes
    ctx.strokeStyle = '#5d4037';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-10, -8); ctx.lineTo(-2, -5);
    ctx.moveTo(10, -8); ctx.lineTo(2, -5);
    ctx.moveTo(-12, 4); ctx.lineTo(-4, 6);
    ctx.moveTo(12, 4); ctx.lineTo(4, 6);
    ctx.stroke();

    // Head
    ctx.fillStyle = '#bcaaa4';
    ctx.beginPath();
    ctx.ellipse(0, -28, 18, 16, 0, 0, Math.PI * 2);
    ctx.fill();

    // Kitten ears
    ctx.fillStyle = '#8d6e63';
    ctx.beginPath();
    ctx.moveTo(-16, -30); ctx.lineTo(-22, -48); ctx.lineTo(-6, -38);
    ctx.closePath(); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(16, -30); ctx.lineTo(22, -48); ctx.lineTo(6, -38);
    ctx.closePath(); ctx.fill();

    ctx.fillStyle = '#ff80ab';
    ctx.beginPath();
    ctx.ellipse(-14, -38, 4, 7, -0.3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath();
    ctx.ellipse(14, -38, 4, 7, 0.3, 0, Math.PI * 2); ctx.fill();

    // Proud erect kitten tail (Antenna tail!)
    const kTail = Math.sin(t * 8) * 8;
    ctx.strokeStyle = '#6d4c41';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(0, 6);
    ctx.bezierCurveTo(kTail * 0.4, -20, kTail, -55, kTail * 1.3, -85);
    ctx.stroke();

    // Striped rings on tail
    ctx.strokeStyle = '#3e2723';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(kTail * 0.8, -45); ctx.lineTo(kTail * 0.9, -52);
    ctx.moveTo(kTail * 1.1, -68); ctx.lineTo(kTail * 1.2, -76);
    ctx.stroke();

    ctx.restore();

  } else if (state === 'sniffing') {
    // Little kitten leaning forward into bushes
    ctx.fillStyle = 'rgba(20, 40, 10, 0.35)';
    ctx.beginPath();
    ctx.ellipse(-8, 36, 32, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    const sniffWiggle = Math.sin(t * 14) * 3;
    ctx.save();
    ctx.translate(-10, bob);

    // Body angled down
    ctx.fillStyle = '#a1887f';
    ctx.beginPath();
    ctx.ellipse(10, 8, 25, 18, 0.25, 0, Math.PI * 2);
    ctx.fill();

    // Tabby stripes
    ctx.strokeStyle = '#5d4037';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(4, 0); ctx.lineTo(6, 15);
    ctx.moveTo(14, -2); ctx.lineTo(16, 14);
    ctx.stroke();

    // Paws on grass
    ctx.fillStyle = '#d7ccc8';
    ctx.beginPath();
    ctx.roundRect(-22, 22, 14, 14, 6);
    ctx.roundRect(-8, 22, 14, 14, 6);
    ctx.roundRect(14, 22, 14, 14, 6);
    ctx.roundRect(26, 22, 14, 14, 6);
    ctx.fill();

    // Head sniffing low
    ctx.save();
    ctx.translate(-26 + sniffWiggle, 12);
    ctx.rotate(-0.15);

    // Ears
    ctx.fillStyle = '#8d6e63';
    ctx.beginPath();
    ctx.moveTo(-10, -10); ctx.lineTo(-18, -28); ctx.lineTo(-2, -18);
    ctx.closePath(); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(6, -16); ctx.lineTo(14, -32); ctx.lineTo(16, -10);
    ctx.closePath(); ctx.fill();

    // Head
    ctx.fillStyle = '#bcaaa4';
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, Math.PI * 2);
    ctx.fill();

    // Snout & Pink nose
    ctx.fillStyle = '#f5f5f5';
    ctx.beginPath();
    ctx.ellipse(-8, 5, 10, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ff80ab';
    ctx.beginPath();
    ctx.arc(-14, 4, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Sniff action lines
    ctx.strokeStyle = '#81c784';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(-22, 2, 6, -0.6, 0.6);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(-26, 2, 9, -0.6, 0.6);
    ctx.stroke();

    ctx.restore();

    // High quivering tail
    const qTail = Math.sin(t * 16) * 6;
    ctx.strokeStyle = '#6d4c41';
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(32, 2);
    ctx.bezierCurveTo(42, -15, 38 + qTail, -45, 45 + qTail, -75);
    ctx.stroke();

    ctx.restore();

  } else {
    // Face forward / 3/4 cute look with huge anime eyes!
    ctx.fillStyle = 'rgba(20, 40, 10, 0.35)';
    ctx.beginPath();
    ctx.ellipse(0, 36, 28, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.translate(0, bob);

    // Sitting/Standing body
    ctx.fillStyle = '#a1887f';
    ctx.beginPath();
    ctx.ellipse(0, 10, 20, 22, 0, 0, Math.PI * 2);
    ctx.fill();

    // White chest patch
    ctx.fillStyle = '#f5f5f5';
    ctx.beginPath();
    ctx.ellipse(0, 10, 11, 15, 0, 0, Math.PI * 2);
    ctx.fill();

    // Little front paws
    ctx.fillStyle = '#f5f5f5';
    ctx.beginPath();
    ctx.roundRect(-12, 22, 11, 14, 5);
    ctx.roundRect(1, 22, 11, 14, 5);
    ctx.fill();

    // Head (Large cute proportion)
    ctx.save();
    ctx.translate(0, -16);
    const tilt = Math.sin(t * 2) * 0.12;
    ctx.rotate(tilt);

    // Big kitten ears
    ctx.fillStyle = '#8d6e63';
    ctx.beginPath();
    ctx.moveTo(-18, -12); ctx.lineTo(-26, -38); ctx.lineTo(-6, -24);
    ctx.closePath(); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(18, -12); ctx.lineTo(26, -38); ctx.lineTo(6, -24);
    ctx.closePath(); ctx.fill();

    ctx.fillStyle = '#ff80ab';
    ctx.beginPath();
    ctx.ellipse(-16, -26, 6, 10, -0.3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath();
    ctx.ellipse(16, -26, 6, 10, 0.3, 0, Math.PI * 2); ctx.fill();

    // Round cute kitten face
    ctx.fillStyle = '#bcaaa4';
    ctx.beginPath();
    ctx.arc(0, 0, 24, 0, Math.PI * 2);
    ctx.fill();

    // Forehead tabby stripes
    ctx.strokeStyle = '#5d4037';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, -20); ctx.lineTo(0, -10);
    ctx.moveTo(-6, -18); ctx.lineTo(-4, -10);
    ctx.moveTo(6, -18); ctx.lineTo(4, -10);
    ctx.stroke();

    // Muzzle & Pink nose
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(-6, 8, 8, 6, 0, 0, Math.PI * 2);
    ctx.ellipse(6, 8, 8, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ff80ab';
    ctx.beginPath();
    ctx.moveTo(-4, 4); ctx.lineTo(4, 4); ctx.lineTo(0, 8);
    ctx.closePath(); ctx.fill();

    // Cute mouth
    ctx.strokeStyle = '#3e2723';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-5, 9); ctx.quadraticCurveTo(-2, 12, 0, 8); ctx.quadraticCurveTo(2, 12, 5, 9);
    ctx.stroke();

    // Huge sparkly kitten eyes!
    const blink = (t % 4.2 < 0.18);
    if (blink) {
      ctx.strokeStyle = '#3e2723';
      ctx.lineWidth = 2.8;
      ctx.beginPath();
      ctx.moveTo(-15, -2); ctx.lineTo(-3, -2);
      ctx.moveTo(3, -2); ctx.lineTo(15, -2);
      ctx.stroke();
    } else {
      // Big shiny blue-green anime eyes
      ctx.fillStyle = '#00e5ff';
      ctx.beginPath();
      ctx.ellipse(-9, -2, 8, 10, 0, 0, Math.PI * 2);
      ctx.ellipse(9, -2, 8, 10, 0, 0, Math.PI * 2);
      ctx.fill();

      // Deep pupil
      ctx.fillStyle = '#1a237e';
      ctx.beginPath();
      ctx.ellipse(-9, -2, 5, 8, 0, 0, Math.PI * 2);
      ctx.ellipse(9, -2, 5, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Big sparkle highlights
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-11, -5, 3.2, 0, Math.PI * 2);
      ctx.arc(7, -5, 3.2, 0, Math.PI * 2);
      ctx.arc(-7, 2, 1.8, 0, Math.PI * 2);
      ctx.arc(11, 2, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }

    // Whiskers
    ctx.strokeStyle = '#616161';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(-10, 7); ctx.lineTo(-28, 4);
    ctx.moveTo(-10, 10); ctx.lineTo(-26, 13);
    ctx.moveTo(10, 7); ctx.lineTo(28, 4);
    ctx.moveTo(10, 10); ctx.lineTo(26, 13);
    ctx.stroke();

    ctx.restore();

    // Tail swinging cheerfully
    const tSwing = Math.sin(t * 6) * 15;
    ctx.strokeStyle = '#6d4c41';
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(12, 14);
    ctx.bezierCurveTo(24, 0, 26 + tSwing, -30, 32 + tSwing, -65);
    ctx.stroke();

    ctx.restore();
  }

  ctx.restore();
}

// ----------------------------------------------------
// Main Frame Renderer
// ----------------------------------------------------
function frame(ctx, w, h, t) {
  const vertical = h > w;
  const scene = BEATS.find(b => t >= b.start && t < b.end) || BEATS[BEATS.length - 1];
  const local = t - scene.start;

  // Background
  drawNatureBG(ctx, w, h, t, vertical);

  // Character Positioning & Scene Direction
  if (scene.action === 'duo_swagger_walk') {
    // Scene 1: Both cats walking together away down the grassy path
    const camProgress = local / (scene.end - scene.start);
    const catY = (vertical ? h * 0.76 : h * 0.70) - camProgress * (h * 0.08);

    // Big Cat walking on right
    const bigX = w * (vertical ? 0.64 : 0.58);
    const bigScale = (vertical ? 2.05 : 1.65) * (1 - camProgress * 0.12);
    drawBigCat(ctx, bigX, catY, bigScale, 'walk_away', t);

    // Little Kitten walking on left
    const kittenX = w * (vertical ? 0.36 : 0.42);
    const kittenScale = (vertical ? 1.55 : 1.25) * (1 - camProgress * 0.12);
    drawPuchkeKitten(ctx, kittenX, catY + (vertical ? 30 : 20), kittenScale, 'walk_away', t);

    // Fun swagger indicator / bouncy musical notes
    if (Math.sin(t * 4) > 0.3) {
      ctx.fillStyle = '#ffeb3b';
      ctx.font = `bold ${vertical ? 48 : 36}px sans-serif`;
      ctx.fillText('✨', bigX + 45, catY - 140);
      ctx.fillText('🎵', kittenX - 35, catY - 90);
    }

  } else if (scene.action === 'big_cat_resting') {
    // Scene 2: Big cat lying down relaxing like a boss on right; Puchke wandering on left
    const bigX = w * (vertical ? 0.65 : 0.64);
    const bigY = vertical ? h * 0.74 : h * 0.70;
    const bigScale = vertical ? 2.1 : 1.75;
    drawBigCat(ctx, bigX, bigY, bigScale, 'lying_down', t);

    // Puchke kitten walking and exploring on left
    const kX = w * (vertical ? 0.28 : 0.32) + Math.sin(local * 1.5) * (w * 0.08);
    const kY = (vertical ? h * 0.78 : h * 0.74) + Math.cos(local * 1.2) * 15;
    const kScale = vertical ? 1.65 : 1.35;
    drawPuchkeKitten(ctx, kX, kY, kScale, 'walk_away', t);

    // Purring paw bubble from Big Cat
    if (Math.sin(t * 3) > 0.4) {
      ctx.fillStyle = '#ff4081';
      ctx.font = `${vertical ? 42 : 32}px sans-serif`;
      ctx.fillText('🐾', bigX - 60, bigY - 80);
    }

  } else if (scene.action === 'kitten_exploring_bushes') {
    // Scene 3: Little Puchke sniffing into the green bushes
    const bigX = w * (vertical ? 0.68 : 0.68);
    const bigY = vertical ? h * 0.74 : h * 0.68;
    const bigScale = vertical ? 2.0 : 1.6;
    drawBigCat(ctx, bigX, bigY, bigScale, 'lying_down', t);

    // Puchke right by the lush bushes on left
    const bushX = w * (vertical ? 0.30 : 0.35);
    const bushY = vertical ? h * 0.78 : h * 0.72;
    const kScale = vertical ? 1.75 : 1.45;
    drawPuchkeKitten(ctx, bushX, bushY, kScale, 'sniffing', t);

    // Question marks / curiosity bubbles
    const qY = (local * 40) % 80;
    ctx.font = `bold ${vertical ? 50 : 40}px sans-serif`;
    ctx.fillStyle = '#ffea00';
    ctx.fillText('❓', bushX - 45, bushY - 60 - qY);

  } else if (scene.action === 'kitten_curious_look') {
    // Scene 4: Little Puchke turns to look at camera / big cat with cute sparkling eyes!
    const bigX = w * (vertical ? 0.68 : 0.68);
    const bigY = vertical ? h * 0.74 : h * 0.68;
    const bigScale = vertical ? 2.1 : 1.65;
    drawBigCat(ctx, bigX, bigY, bigScale, 'smiling', t);

    // Puchke in front / center-left facing us
    const kX = w * (vertical ? 0.32 : 0.36);
    const kY = vertical ? h * 0.78 : h * 0.72;
    const kScale = vertical ? 1.85 : 1.45;
    drawPuchkeKitten(ctx, kX, kY, kScale, 'face_forward', t);

    // Love & sparkle effects
    ctx.font = `${vertical ? 52 : 44}px sans-serif`;
    ctx.fillText('💖', kX + 65, kY - 110);
    ctx.fillText('😻', bigX - 40, bigY - 100);
    ctx.fillText('✨', w * 0.5, h * 0.55);
  }

  // Smooth scene fade transitions
  const fade = Math.min(cl(local / 0.25), cl((scene.end - t) / 0.25));
  if (fade < 1) {
    ctx.fillStyle = `rgba(0, 0, 0, ${(1 - fade) * 0.25})`;
    ctx.fillRect(0, 0, w, h);
  }

  // Text Styling & Overlay
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const font = '"Noto Sans Bengali", "Nirmala UI", Arial, sans-serif';

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

  // Bengali Subtitles (Heavy black outline + crisp white/yellow fill)
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
