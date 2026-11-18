// Full-Color 2D Cartoon Animation Engine - Real Madrid Friend Restaurant Twist
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
// Outdoor Field & Village Background
// ----------------------------------------------------
function drawOutdoorBG(ctx, W, H, t, vertical) {
  // Sunny warm sky gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.65);
  skyGrad.addColorStop(0, '#64b5f6');
  skyGrad.addColorStop(0.4, '#90caf9');
  skyGrad.addColorStop(0.75, '#e3f2fd');
  skyGrad.addColorStop(1, '#fff9c4');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, H);

  // Soft moving clouds
  ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
  for (let c = 0; c < 5; c++) {
    const cx = (W * 0.15 + c * (W * 0.28) + t * 4) % (W + 200) - 100;
    const cy = H * 0.12 + (c % 2) * (H * 0.08);
    ctx.beginPath();
    ctx.ellipse(cx, cy, 130, 40, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + 50, cy - 12, 80, 35, 0, 0, Math.PI * 2);
    ctx.ellipse(cx - 45, cy - 8, 75, 30, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Distant green tree line / palm trees
  ctx.fillStyle = '#388e3c';
  ctx.beginPath();
  ctx.moveTo(0, H * 0.48);
  for (let x = 0; x <= W; x += 40) {
    const ty = H * 0.45 + Math.sin(x * 0.015) * 18 + Math.cos(x * 0.03) * 10;
    ctx.lineTo(x, ty);
  }
  ctx.lineTo(W, H * 0.58);
  ctx.lineTo(0, H * 0.58);
  ctx.closePath();
  ctx.fill();

  // Banana tree fronds / lush foliage
  for (let b = 0; b < 6; b++) {
    const bx = (b * (W / 5) + 30) % W;
    const by = H * 0.46;
    ctx.fillStyle = '#4caf50';
    ctx.beginPath();
    ctx.ellipse(bx - 30, by - 15, 45, 14, -0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(bx + 30, by - 15, 45, 14, 0.4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Warm sandy earth / ground
  const groundGrad = ctx.createLinearGradient(0, H * 0.55, 0, H);
  groundGrad.addColorStop(0, '#c8b79b');
  groundGrad.addColorStop(0.3, '#d7ccc8');
  groundGrad.addColorStop(0.7, '#bcaaa4');
  groundGrad.addColorStop(1, '#a1887f');
  ctx.fillStyle = groundGrad;
  ctx.fillRect(0, H * 0.54, W, H * 0.46);

  // Soft dirt trail texture
  ctx.fillStyle = 'rgba(141, 110, 99, 0.25)';
  for (let i = 0; i < 25; i++) {
    const sx = ((i * 73) % W);
    const sy = H * 0.58 + ((i * 47) % (H * 0.4));
    ctx.beginPath();
    ctx.ellipse(sx, sy, 22, 6, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

// ----------------------------------------------------
// Character 1: Green Sweater Friend (The Orator)
// ----------------------------------------------------
function drawGreenSweaterGuy(ctx, x, y, scale, pose, t) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // Shadow
  ctx.fillStyle = 'rgba(20, 30, 20, 0.35)';
  ctx.beginPath();
  ctx.ellipse(0, 115, 34, 11, 0, 0, Math.PI * 2);
  ctx.fill();

  // Cyan / Teal Jeans
  ctx.fillStyle = '#26a69a';
  ctx.beginPath();
  ctx.roundRect(-20, 45, 17, 65, 6);
  ctx.roundRect(3, 45, 17, 65, 6);
  ctx.fill();
  ctx.strokeStyle = '#00796b'; ctx.lineWidth = 2.5; ctx.stroke();

  // White shoes
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(-22, 105, 20, 11, 5);
  ctx.roundRect(3, 105, 20, 11, 5);
  ctx.fill();

  // Torso: Olive / Sage Green Sweatshirt
  ctx.fillStyle = '#81c784';
  ctx.beginPath();
  ctx.roundRect(-25, -25, 50, 75, 10);
  ctx.fill();
  ctx.strokeStyle = '#388e3c'; ctx.lineWidth = 3; ctx.stroke();

  // Black sleeve utility pocket on right arm
  ctx.fillStyle = '#212121';
  ctx.beginPath();
  ctx.roundRect(16, -10, 12, 24, 3);
  ctx.fill();
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.5; ctx.stroke();

  // "RISE" badge on left chest
  ctx.fillStyle = '#212121';
  ctx.beginPath();
  ctx.roundRect(-18, -12, 16, 8, 2);
  ctx.fill();

  // Collar
  ctx.strokeStyle = '#66bb6a'; ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, -25, 12, 0, Math.PI);
  ctx.stroke();

  // Neck
  ctx.fillStyle = '#d7ccc8';
  ctx.fillRect(-8, -36, 16, 14);

  // Head
  ctx.fillStyle = '#bcaaa4';
  ctx.beginPath();
  ctx.ellipse(0, -52, 19, 22, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#5d4037'; ctx.lineWidth = 2.5; ctx.stroke();

  // Hair & Stubble
  ctx.fillStyle = '#1e1e1e';
  ctx.beginPath();
  ctx.arc(0, -58, 20, Math.PI * 0.9, Math.PI * 2.1);
  ctx.fill();
  // Neat chin beard
  ctx.fillStyle = '#424242';
  ctx.beginPath();
  ctx.ellipse(0, -38, 10, 6, 0, 0, Math.PI);
  ctx.fill();

  // Facial Expressions
  if (pose === 'angry_speech') {
    // Angry intense eyes looking at camera
    ctx.fillStyle = '#ffffff';
    drawCircle(ctx, -7, -54, 6, '#ffffff', '#212121', 2);
    drawCircle(ctx, 7, -54, 6, '#ffffff', '#212121', 2);
    ctx.fillStyle = '#212121';
    drawCircle(ctx, -7, -54, 3, '#212121', null, 0);
    drawCircle(ctx, 7, -54, 3, '#212121', null, 0);

    // Slanted angry eyebrows
    ctx.strokeStyle = '#212121'; ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-13, -62); ctx.lineTo(-2, -58);
    ctx.moveTo(13, -62); ctx.lineTo(2, -58);
    ctx.stroke();

    // Shouting mouth
    ctx.fillStyle = '#b71c1c';
    ctx.beginPath();
    ctx.ellipse(0, -42, 8, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#3e2723'; ctx.lineWidth = 2; ctx.stroke();

  } else if (pose === 'shocked_hearing') {
    // Big wide eyes hearing restaurant news!
    ctx.fillStyle = '#ffffff';
    drawCircle(ctx, -7, -54, 8, '#ffffff', '#212121', 2);
    drawCircle(ctx, 7, -54, 8, '#ffffff', '#212121', 2);
    // Looking right towards the Real Madrid friend
    ctx.fillStyle = '#0d47a1';
    drawCircle(ctx, -5, -54, 4, '#0d47a1', null, 0);
    drawCircle(ctx, 9, -54, 4, '#0d47a1', null, 0);

    // Raised surprised eyebrows
    ctx.strokeStyle = '#212121'; ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(-7, -62, 7, Math.PI * 1.1, Math.PI * 1.9);
    ctx.arc(7, -62, 7, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();

    // Small surprised mouth 'O'
    ctx.fillStyle = '#b71c1c';
    drawCircle(ctx, 0, -42, 5, '#b71c1c', '#3e2723', 2);

  } else if (pose === 'brother_hug') {
    // Giant happy face (^ ^) with cheeks blushing!
    ctx.strokeStyle = '#1b5e20'; ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(-7, -54, 6, Math.PI * 1.1, Math.PI * 1.9);
    ctx.arc(7, -54, 6, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();

    // Giant wide open happy smile!
    ctx.fillStyle = '#b71c1c';
    ctx.beginPath();
    ctx.arc(0, -42, 10, 0, Math.PI);
    ctx.fill();
    // White teeth
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(-8, -42, 16, 5, 2);
    ctx.fill();

    // Cheerful blush
    ctx.fillStyle = 'rgba(255, 64, 129, 0.4)';
    drawCircle(ctx, -14, -46, 5, 'rgba(255, 64, 129, 0.4)', null, 0);
    drawCircle(ctx, 14, -46, 5, 'rgba(255, 64, 129, 0.4)', null, 0);
  }

  // Arms
  if (pose === 'angry_speech') {
    // Pointing left hand angrily at the Real Madrid friend!
    ctx.strokeStyle = '#81c784'; ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(-20, -10); ctx.lineTo(-48, -15);
    ctx.stroke();
    // Pointing finger
    ctx.fillStyle = '#bcaaa4';
    drawCircle(ctx, -52, -15, 6, '#bcaaa4', null, 0);

    // Right arm behind back or gesturing
    ctx.beginPath();
    ctx.moveTo(20, -10); ctx.lineTo(35, 15);
    ctx.stroke();

  } else if (pose === 'brother_hug') {
    // Arm extended over friend's shoulder!
    ctx.strokeStyle = '#81c784'; ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(-20, -10); ctx.lineTo(-65, -15);
    ctx.stroke();
    drawCircle(ctx, -70, -15, 7, '#bcaaa4', null, 0);

    // Thumbs up on right hand!
    ctx.beginPath();
    ctx.moveTo(20, -10); ctx.lineTo(42, -5);
    ctx.stroke();
    ctx.fillStyle = '#ffd700';
    drawCircle(ctx, 46, -7, 6, '#ffd700', null, 0);

  } else {
    // Normal relaxed arms behind back
    ctx.strokeStyle = '#81c784'; ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(-20, -10); ctx.lineTo(-10, 20);
    ctx.moveTo(20, -10); ctx.lineTo(10, 20);
    ctx.stroke();
  }

  ctx.restore();
}

// ----------------------------------------------------
// Character 2: White Real Madrid Jersey Friend (The Lover)
// ----------------------------------------------------
function drawRealMadridGuy(ctx, x, y, scale, pose, t) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // Shadow
  ctx.fillStyle = 'rgba(20, 30, 20, 0.35)';
  ctx.beginPath();
  ctx.ellipse(0, 115, 34, 11, 0, 0, Math.PI * 2);
  ctx.fill();

  // Dark Grey / Black track pants
  ctx.fillStyle = '#263238';
  ctx.beginPath();
  ctx.roundRect(-20, 45, 17, 65, 6);
  ctx.roundRect(3, 45, 17, 65, 6);
  ctx.fill();
  ctx.strokeStyle = '#102027'; ctx.lineWidth = 2.5; ctx.stroke();

  // White sneakers
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(-22, 105, 20, 11, 5);
  ctx.roundRect(3, 105, 20, 11, 5);
  ctx.fill();

  // Torso: Crisp White Real Madrid Jersey (Long Sleeve)
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(-25, -25, 50, 75, 10);
  ctx.fill();
  ctx.strokeStyle = '#cfd8dc'; ctx.lineWidth = 3; ctx.stroke();

  // Real Madrid Golden Crest on left chest
  ctx.fillStyle = '#ffd700';
  drawCircle(ctx, -12, -10, 6, '#ffd700', '#002b80', 1.5);
  ctx.fillStyle = '#002b80';
  ctx.fillRect(-14, -11, 5, 2);

  // "Fly Emirates" logo across chest
  ctx.fillStyle = '#002b80';
  ctx.font = 'bold 9px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Fly Emirates', 0, 12);

  // Three blue stripes on shoulders
  ctx.strokeStyle = '#1e88e5'; ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-24, -25); ctx.lineTo(-12, -25);
  ctx.moveTo(24, -25); ctx.lineTo(12, -25);
  ctx.stroke();

  // Head
  ctx.fillStyle = '#8d6e63';
  ctx.beginPath();
  ctx.ellipse(0, -52, 19, 22, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#4e342e'; ctx.lineWidth = 2.5; ctx.stroke();

  // Hair
  ctx.fillStyle = '#1e1e1e';
  ctx.beginPath();
  ctx.arc(0, -58, 20, Math.PI * 0.8, Math.PI * 2.2);
  ctx.fill();

  // Facial Expression
  if (pose === 'phone_call' || pose === 'eating_excited') {
    // Talking on phone, smiling romantically!
    ctx.strokeStyle = '#212121'; ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(-7, -54, 4, 0.1, Math.PI * 1.1);
    ctx.arc(7, -54, 4, 0.1, Math.PI * 1.1);
    ctx.stroke();

    // Sweet smile talking into phone
    ctx.beginPath();
    ctx.arc(0, -42, 7, 0.1, Math.PI * 0.9);
    ctx.stroke();

    // Romantic blush
    ctx.fillStyle = 'rgba(255, 64, 129, 0.4)';
    drawCircle(ctx, -14, -46, 5, 'rgba(255, 64, 129, 0.4)', null, 0);

  } else {
    // Awkward / guilty side-eye expression
    ctx.fillStyle = '#ffffff';
    drawCircle(ctx, -7, -54, 6, '#ffffff', '#212121', 2);
    drawCircle(ctx, 7, -54, 6, '#ffffff', '#212121', 2);
    // Pupils looking sideways
    ctx.fillStyle = '#212121';
    drawCircle(ctx, -9, -54, 3, '#212121', null, 0);
    drawCircle(ctx, 5, -54, 3, '#212121', null, 0);

    // Awkward mouth
    ctx.strokeStyle = '#212121'; ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-6, -42); ctx.lineTo(6, -40);
    ctx.stroke();
  }

  // Arms & Smartphone
  if (pose === 'phone_call' || pose === 'eating_excited') {
    // Left arm holding black smartphone to left ear!
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(-20, -10); ctx.lineTo(-24, -40);
    ctx.stroke();

    // Black Smartphone held at ear
    ctx.fillStyle = '#212121';
    ctx.beginPath();
    ctx.roundRect(-30, -56, 12, 22, 3);
    ctx.fill();
    ctx.strokeStyle = '#4fc3f7'; ctx.lineWidth = 1.5; ctx.stroke();

    // Phone signal waves
    const sig = Math.sin(t * 8) * 3;
    ctx.strokeStyle = '#00e676'; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(-34, -45, 8 + sig, -0.8, 0.8);
    ctx.stroke();

    // Right arm on waist
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(20, -10); ctx.lineTo(32, 10); ctx.lineTo(22, 22);
    ctx.stroke();

  } else {
    // Hand on head scratching (like in the original video!)
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(-20, -10); ctx.lineTo(-28, -48); ctx.lineTo(-10, -68);
    ctx.stroke();
    drawCircle(ctx, -8, -70, 6, '#8d6e63', null, 0);

    // Other hand on hip
    ctx.beginPath();
    ctx.moveTo(20, -10); ctx.lineTo(34, 10); ctx.lineTo(22, 22);
    ctx.stroke();
  }

  ctx.restore();
}

// ----------------------------------------------------
// Character 3: Laughing Meme Legend (Punchline)
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
  ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 6;
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

  // Red Tilak dot on forehead
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
  ctx.strokeStyle = '#212121'; ctx.lineWidth = 4.5;
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
  ctx.fillStyle = '#e91e63';
  ctx.fillRect(-18, -10, 36, 15);
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(20, -5, 12, -Math.PI * 0.4, Math.PI * 0.4);
  ctx.stroke();
  ctx.strokeStyle = '#212121'; ctx.lineWidth = 2; ctx.stroke();
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

  // Base Background
  if (scene.action !== 'meme_laugh_punchline') {
    drawOutdoorBG(ctx, w, h, t, vertical);
  }

  const groundY = vertical ? h * 0.72 : h * 0.68;
  const pScale = vertical ? 2.1 : 1.75;

  // Scene Action & Layout
  if (scene.action === 'mirjafar_speech') {
    // Scene 1: Green sweater guy giving fiery "Mir Jafar" speech; Real Madrid guy looking awkward
    const gX = w * (vertical ? 0.68 : 0.62);
    const rX = w * (vertical ? 0.32 : 0.38);

    drawRealMadridGuy(ctx, rX, groundY, pScale, 'awkward', t);
    drawGreenSweaterGuy(ctx, gX, groundY, pScale, 'angry_speech', t);

    // Fiery Mir Jafar label / betrayal badge
    ctx.font = `bold ${vertical ? 44 : 34}px ${font}`;
    ctx.fillStyle = '#ff1744';
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 5;
    ctx.strokeText('🐍 "আস্ত মীরজাফর!"', rX, groundY - 160);
    ctx.fillText('🐍 "আস্ত মীরজাফর!"', rX, groundY - 160);

  } else if (scene.action === 'boycott_friend') {
    // Scene 2: Green sweater guy urging audience to boycott such friends!
    const gX = w * (vertical ? 0.65 : 0.60);
    const rX = w * (vertical ? 0.30 : 0.36);

    drawRealMadridGuy(ctx, rX, groundY, pScale, 'awkward', t);
    drawGreenSweaterGuy(ctx, gX, groundY, pScale, 'angry_speech', t);

    // Red X / Boycott symbol
    ctx.font = `bold ${vertical ? 50 : 38}px sans-serif`;
    ctx.fillStyle = '#d50000';
    ctx.fillText('🚫 BOYCOTT 🚫', w / 2, groundY - 170);

  } else if (scene.action === 'phone_call_twist') {
    // Scene 3: The Phone Call Twist! Real Madrid guy answers phone: "Hello jaan!"
    const gX = w * (vertical ? 0.68 : 0.62);
    const rX = w * (vertical ? 0.32 : 0.38);

    drawRealMadridGuy(ctx, rX, groundY, pScale, 'phone_call', t);
    // Green sweater guy hears this and stops speaking, stunned and curious!
    drawGreenSweaterGuy(ctx, gX, groundY, pScale, 'shocked_hearing', t);

    // Phone call bubble with romantic restaurant vibes!
    ctx.font = `bold ${vertical ? 42 : 32}px ${font}`;
    ctx.fillStyle = '#ffea00';
    ctx.strokeStyle = '#000000'; ctx.lineWidth = 6;
    ctx.strokeText('📱 "হ্যালো জান! রেস্টুরেন্টে গিয়ে বসছ?" 🍗', rX + 40, groundY - 170);
    ctx.fillText('📱 "হ্যালো জান! রেস্টুরেন্টে গিয়ে বসছ?" 🍗', rX + 40, groundY - 170);

    // Green guy's thought bubble: "বিরিয়ানি?! রেস্টুরেন্ট?!"
    ctx.fillStyle = '#00e676';
    ctx.strokeText('💡 "রেস্টুরেন্ট?! বান্ধবী আসছে?!"', gX - 10, groundY - 130);
    ctx.fillText('💡 "রেস্টুরেন্ট?! বান্ধবী আসছে?!"', gX - 10, groundY - 130);

  } else if (scene.action === 'instant_brother_hug') {
    // Scene 4: Instant 180-degree flip! Throws arm over friend: "ও বন্ধু না, ও আমার নিজের ভাই!"
    const centerGroupX = w * 0.5;
    const gX = centerGroupX + (vertical ? 55 : 65);
    const rX = centerGroupX - (vertical ? 55 : 65);

    drawRealMadridGuy(ctx, rX, groundY, pScale, 'eating_excited', t);
    drawGreenSweaterGuy(ctx, gX, groundY, pScale, 'brother_hug', t);

    // Giant love & brother banner
    ctx.font = `bold ${vertical ? 52 : 40}px ${font}`;
    ctx.fillStyle = '#ffea00';
    ctx.strokeStyle = '#000000'; ctx.lineWidth = 7;
    ctx.strokeText('❤️ "ও বন্ধু না, ও আমার ভাই!" 🤝', w / 2, groundY - 165);
    ctx.fillText('❤️ "ও বন্ধু না, ও আমার ভাই!" 🤝', w / 2, groundY - 165);

    // Flying food & celebration emojis
    ctx.font = `${vertical ? 48 : 36}px sans-serif`;
    ctx.fillText('🍗 🍲 🍛', w / 2, groundY - 115);

  } else if (scene.action === 'meme_laugh_punchline') {
    // Scene 5: Ultimate Laughing Meme Punchline!
    const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, w * 0.75);
    bgGrad.addColorStop(0, '#ffeb3b');
    bgGrad.addColorStop(0.4, '#ff9800');
    bgGrad.addColorStop(0.8, '#f44336');
    bgGrad.addColorStop(1, '#880e4f');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Rotating celebration rays
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
      const capSize = vertical ? 46 : 32;
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
