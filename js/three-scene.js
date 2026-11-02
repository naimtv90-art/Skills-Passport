/* ===================================================================
   SKILLS PASSPORT - 3D NEURAL CONSTELLATION & PARTICLE SCENE
   Renders interactive HI + AI neural network & 3D floating nodes
   =================================================================== */

(function () {
  const canvasContainer = document.getElementById('bg-canvas-container');
  if (!canvasContainer) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'three-canvas';
  canvasContainer.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };

  // Responsive Canvas Resize
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  // Particle Class
  class Particle {
    constructor() {
      this.reset();
      this.x = Math.random() * width;
      this.y = Math.random() * height;
    }

    reset() {
      this.x = Math.random() * (width || window.innerWidth);
      this.y = Math.random() * (height || window.innerHeight);
      this.z = Math.random() * 2 + 0.5; // depth factor for 3D feel
      this.vx = (Math.random() - 0.5) * 0.8 * this.z;
      this.vy = (Math.random() - 0.5) * 0.8 * this.z;
      this.size = (Math.random() * 2.2 + 1) * this.z;
      this.baseAlpha = Math.random() * 0.5 + 0.2;
      this.alpha = this.baseAlpha;
      // Color toggle: 65% neon cyan, 35% electric violet
      this.isCyan = Math.random() > 0.35;
      this.color = this.isCyan ? '0, 242, 254' : '138, 43, 226';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Screen boundary wrapping
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      // Mouse interaction (gravity repulsion)
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 3;
          this.y -= Math.sin(angle) * force * 3;
          this.alpha = Math.min(1, this.baseAlpha + 0.4);
        } else {
          this.alpha = this.baseAlpha;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
      ctx.shadowBlur = this.size * 3;
      ctx.shadowColor = `rgba(${this.color}, 0.8)`;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // Floating 3D Geometric Ring
  class FloatingRing3D {
    constructor(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.angleX = Math.random() * Math.PI;
      this.angleY = Math.random() * Math.PI;
      this.rotSpeedX = 0.003;
      this.rotSpeedY = 0.005;
    }

    update() {
      this.angleX += this.rotSpeedX;
      this.angleY += this.rotSpeedY;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.beginPath();
      const points = 32;
      for (let i = 0; i <= points; i++) {
        const theta = (i / points) * Math.PI * 2;
        // 3D rotation projection
        const px = this.radius * Math.cos(theta);
        const py = this.radius * Math.sin(theta) * Math.cos(this.angleX);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();
    }
  }

  let floatingRings = [];

  function initParticles() {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 14000), 90);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }

    floatingRings = [
      new FloatingRing3D(width * 0.15, height * 0.25, 90, 'rgba(138, 43, 226, 0.25)'),
      new FloatingRing3D(width * 0.85, height * 0.7, 120, 'rgba(0, 242, 254, 0.2)'),
      new FloatingRing3D(width * 0.5, height * 0.85, 75, 'rgba(74, 0, 224, 0.2)')
    ];
  }

  // Draw Interconnecting Neural Synapses
  function drawConnections() {
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update and draw floating 3D rings
    floatingRings.forEach(ring => {
      ring.update();
      ring.draw();
    });

    // Update particles
    particles.forEach(p => p.update());

    // Connect them with neural network lines
    drawConnections();

    // Draw particle dots
    particles.forEach(p => p.draw());

    requestAnimationFrame(animate);
  }

  // Mouse Listeners
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  });

  window.addEventListener('touchend', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', resize);

  // Initialize
  resize();
  animate();
})();
