// ============================================
// OPTIMIZED VFX ENGINE
// Smooth 60fps visual effects for gacha reveals
// ============================================

class VFXEngine {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.shockwaves = [];
        this.lightRays = [];
        this.flares = [];
        this.animationFrame = null;
        this.maxParticles = 150; // Limit particles for performance
        this.init();
    }

    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'vfx-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        // Use lower resolution for better performance
        const dpr = Math.min(window.devicePixelRatio, 2);
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.ctx.scale(dpr, dpr);
    }

    createParticle(x, y, config) {
        const angle = config.angle ?? Math.random() * Math.PI * 2;
        const speed = config.speed ?? (Math.random() * 8 + 4);
        const size = config.size ?? (Math.random() * 6 + 2);

        return {
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size,
            color: config.color,
            alpha: 1,
            decay: config.decay ?? 0.02,
            gravity: config.gravity ?? 0.15,
            friction: config.friction ?? 0.98,
            type: config.type ?? 'circle'
        };
    }

    createShockwave(x, y, config) {
        return {
            x, y,
            radius: config.startRadius ?? 10,
            maxRadius: config.maxRadius ?? 300,
            speed: config.speed ?? 12,
            lineWidth: config.lineWidth ?? 4,
            color: config.color ?? '#ffffff',
            alpha: 1,
            decay: config.decay ?? 0.04
        };
    }

    createLightRay(x, y, config) {
        return {
            x, y,
            angle: config.angle ?? Math.random() * Math.PI * 2,
            length: config.length ?? 200,
            width: config.width ?? 3,
            color: config.color,
            alpha: 0,
            fadeIn: true,
            fadeSpeed: config.fadeSpeed ?? 0.08,
            rotationSpeed: config.rotationSpeed ?? 0.003
        };
    }

    // ============================================
    // RARITY VFX - OPTIMIZED
    // ============================================

    triggerCommonReveal(x, y) {
        // Simple dust poof - 8 particles
        for (let i = 0; i < 8; i++) {
            this.particles.push(this.createParticle(x, y, {
                color: '#9ca3af',
                speed: Math.random() * 3 + 2,
                size: Math.random() * 4 + 2,
                decay: 0.035
            }));
        }

        this.shockwaves.push(this.createShockwave(x, y, {
            maxRadius: 80,
            speed: 10,
            lineWidth: 2,
            color: '#9ca3af',
            decay: 0.06
        }));
    }

    triggerUncommonReveal(x, y) {
        // Green burst - 15 particles
        for (let i = 0; i < 15; i++) {
            this.particles.push(this.createParticle(x, y, {
                color: i % 2 === 0 ? '#22c55e' : '#4ade80',
                speed: Math.random() * 5 + 3,
                size: Math.random() * 5 + 3,
                decay: 0.025
            }));
        }

        this.shockwaves.push(this.createShockwave(x, y, {
            maxRadius: 120,
            speed: 12,
            lineWidth: 3,
            color: '#22c55e',
            decay: 0.05
        }));
    }

    triggerRareReveal(x, y) {
        // Blue electric burst - 25 particles
        for (let i = 0; i < 25; i++) {
            const angle = (i / 25) * Math.PI * 2;
            this.particles.push(this.createParticle(x, y, {
                color: i % 2 === 0 ? '#3b82f6' : '#60a5fa',
                speed: Math.random() * 8 + 5,
                angle: angle + (Math.random() - 0.5) * 0.5,
                size: Math.random() * 5 + 3,
                decay: 0.02,
                type: i % 3 === 0 ? 'spark' : 'circle'
            }));
        }

        // Double shockwave
        this.shockwaves.push(this.createShockwave(x, y, {
            maxRadius: 180,
            speed: 15,
            lineWidth: 4,
            color: '#3b82f6',
            decay: 0.04
        }));

        setTimeout(() => {
            this.shockwaves.push(this.createShockwave(x, y, {
                maxRadius: 140,
                speed: 12,
                lineWidth: 3,
                color: '#60a5fa',
                decay: 0.05
            }));
        }, 50);

        // Light rays
        for (let i = 0; i < 6; i++) {
            this.lightRays.push(this.createLightRay(x, y, {
                angle: (i / 6) * Math.PI * 2,
                length: 150,
                width: 3,
                color: '#3b82f6'
            }));
        }
    }

    triggerEpicReveal(x, y) {
        // Purple aurora - 40 particles
        const colors = ['#a855f7', '#c084fc', '#e879f9'];
        for (let i = 0; i < 40; i++) {
            const angle = (i / 40) * Math.PI * 2;
            this.particles.push(this.createParticle(x, y, {
                color: colors[i % 3],
                speed: Math.random() * 10 + 6,
                angle: angle + (Math.random() - 0.5) * 0.6,
                size: Math.random() * 6 + 3,
                decay: 0.015,
                type: i % 4 === 0 ? 'star' : 'circle'
            }));
        }

        // Core particles
        for (let i = 0; i < 12; i++) {
            this.particles.push(this.createParticle(x, y, {
                color: '#ffffff',
                speed: Math.random() * 6 + 3,
                size: Math.random() * 3 + 2,
                decay: 0.03
            }));
        }

        // Triple shockwave
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                this.shockwaves.push(this.createShockwave(x, y, {
                    maxRadius: 250 - i * 50,
                    speed: 18 - i * 3,
                    lineWidth: 5 - i,
                    color: i % 2 === 0 ? '#a855f7' : '#e879f9',
                    decay: 0.035
                }));
            }, i * 40);
        }

        // Light rays
        for (let i = 0; i < 8; i++) {
            this.lightRays.push(this.createLightRay(x, y, {
                angle: (i / 8) * Math.PI * 2,
                length: 250,
                width: 4,
                color: i % 2 === 0 ? '#a855f7' : '#d946ef',
                rotationSpeed: 0.004
            }));
        }

        this.screenFlash('#a855f7', 0.3);
    }

    triggerLegendaryReveal(x, y) {
        // Screen darken for drama
        this.screenDarken(0.5, 200);

        setTimeout(() => {
            // Golden explosion - 60 particles max
            const colors = ['#f59e0b', '#fbbf24', '#fcd34d', '#ef4444'];
            for (let i = 0; i < 60; i++) {
                const angle = (i / 60) * Math.PI * 2;
                this.particles.push(this.createParticle(x, y, {
                    color: colors[Math.floor(Math.random() * colors.length)],
                    speed: Math.random() * 15 + 10,
                    angle: angle + Math.random() * 0.4,
                    size: Math.random() * 8 + 4,
                    decay: 0.01,
                    gravity: 0.08,
                    type: i % 4 === 0 ? 'star' : 'circle'
                }));
            }

            // White core
            for (let i = 0; i < 15; i++) {
                this.particles.push(this.createParticle(x, y, {
                    color: '#ffffff',
                    speed: Math.random() * 8 + 4,
                    size: Math.random() * 4 + 2,
                    decay: 0.025
                }));
            }

            // Floating embers
            for (let i = 0; i < 20; i++) {
                this.particles.push(this.createParticle(x, y, {
                    color: i % 2 === 0 ? '#f59e0b' : '#ef4444',
                    speed: Math.random() * 3 + 1,
                    angle: -Math.PI / 2 + (Math.random() - 0.5) * 1,
                    size: Math.random() * 3 + 2,
                    decay: 0.008,
                    gravity: -0.03
                }));
            }

            // Shockwave cascade
            for (let i = 0; i < 4; i++) {
                setTimeout(() => {
                    this.shockwaves.push(this.createShockwave(x, y, {
                        maxRadius: 350 - i * 60,
                        speed: 20 - i * 3,
                        lineWidth: 6 - i,
                        color: i % 2 === 0 ? '#f59e0b' : '#fbbf24',
                        decay: 0.025
                    }));
                }, i * 30);
            }

            // Divine light rays
            for (let i = 0; i < 12; i++) {
                this.lightRays.push(this.createLightRay(x, y, {
                    angle: (i / 12) * Math.PI * 2,
                    length: 400,
                    width: i % 3 === 0 ? 6 : 3,
                    color: i % 2 === 0 ? '#f59e0b' : '#fbbf24',
                    rotationSpeed: 0.006,
                    fadeSpeed: 0.04
                }));
            }

            this.screenShake(12, 400);
            this.screenFlash('#fbbf24', 0.5);

        }, 200);
    }

    triggerMythicReveal(x, y) {
        // MYTHIC - The rarest, most epic reveal
        this.screenDarken(0.8, 300);

        setTimeout(() => {
            // Crimson explosion - 80 particles
            const colors = ['#ef4444', '#dc2626', '#b91c1c', '#f87171', '#fca5a5'];
            for (let i = 0; i < 80; i++) {
                const angle = (i / 80) * Math.PI * 2;
                this.particles.push(this.createParticle(x, y, {
                    color: colors[Math.floor(Math.random() * colors.length)],
                    speed: Math.random() * 20 + 12,
                    angle: angle + Math.random() * 0.5,
                    size: Math.random() * 10 + 5,
                    decay: 0.008,
                    gravity: 0.06,
                    type: i % 3 === 0 ? 'star' : 'circle'
                }));
            }

            // White-hot core
            for (let i = 0; i < 20; i++) {
                this.particles.push(this.createParticle(x, y, {
                    color: '#ffffff',
                    speed: Math.random() * 10 + 5,
                    size: Math.random() * 5 + 3,
                    decay: 0.02
                }));
            }

            // Blood embers rising
            for (let i = 0; i < 30; i++) {
                this.particles.push(this.createParticle(x, y, {
                    color: i % 2 === 0 ? '#ef4444' : '#b91c1c',
                    speed: Math.random() * 4 + 2,
                    angle: -Math.PI / 2 + (Math.random() - 0.5) * 1.2,
                    size: Math.random() * 4 + 2,
                    decay: 0.005,
                    gravity: -0.04
                }));
            }

            // Massive shockwave cascade
            for (let i = 0; i < 6; i++) {
                setTimeout(() => {
                    this.shockwaves.push(this.createShockwave(x, y, {
                        maxRadius: 450 - i * 60,
                        speed: 25 - i * 3,
                        lineWidth: 8 - i,
                        color: i % 2 === 0 ? '#ef4444' : '#dc2626',
                        decay: 0.02
                    }));
                }, i * 25);
            }

            // Crimson divine rays
            for (let i = 0; i < 16; i++) {
                this.lightRays.push(this.createLightRay(x, y, {
                    angle: (i / 16) * Math.PI * 2,
                    length: 500,
                    width: i % 4 === 0 ? 8 : 4,
                    color: i % 2 === 0 ? '#ef4444' : '#dc2626',
                    rotationSpeed: 0.008,
                    fadeSpeed: 0.03
                }));
            }

            this.screenShake(18, 600);
            this.screenFlash('#ef4444', 0.7);

        }, 300);
    }

    // ============================================
    // SCREEN EFFECTS
    // ============================================

    screenFlash(color, intensity = 0.5) {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            background: ${color};
            opacity: ${intensity};
            pointer-events: none;
            z-index: 9998;
            animation: vfxFlashOut 0.4s ease-out forwards;
        `;
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 400);
    }

    screenDarken(intensity = 0.5, duration = 200) {
        const darken = document.createElement('div');
        darken.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            background: #000;
            opacity: 0;
            pointer-events: none;
            z-index: 9997;
            transition: opacity ${duration}ms ease-out;
        `;
        document.body.appendChild(darken);
        requestAnimationFrame(() => darken.style.opacity = intensity);
        setTimeout(() => {
            darken.style.opacity = 0;
            setTimeout(() => darken.remove(), duration);
        }, duration + 300);
    }

    screenShake(intensity = 10, duration = 400) {
        const container = document.querySelector('.container') || document.body;
        const startTime = Date.now();

        const shake = () => {
            const elapsed = Date.now() - startTime;
            if (elapsed < duration) {
                const decay = 1 - elapsed / duration;
                const x = (Math.random() - 0.5) * 2 * intensity * decay;
                const y = (Math.random() - 0.5) * 2 * intensity * decay;
                container.style.transform = `translate(${x}px, ${y}px)`;
                requestAnimationFrame(shake);
            } else {
                container.style.transform = '';
            }
        };
        shake();
    }

    // ============================================
    // OPTIMIZED ANIMATION LOOP
    // ============================================

    animate() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        this.ctx.clearRect(0, 0, w, h);

        // Limit total particles for performance
        while (this.particles.length > this.maxParticles) {
            this.particles.shift();
        }

        this.updateParticles();
        this.updateShockwaves();
        this.updateLightRays();

        this.animationFrame = requestAnimationFrame(() => this.animate());
    }

    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            p.vy += p.gravity;
            p.vx *= p.friction;
            p.vy *= p.friction;
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            this.ctx.save();
            this.ctx.globalAlpha = p.alpha;
            this.ctx.fillStyle = p.color;

            // Simplified glow - only for bigger particles
            if (p.size > 4) {
                this.ctx.shadowColor = p.color;
                this.ctx.shadowBlur = 8;
            }

            this.ctx.translate(p.x, p.y);

            if (p.type === 'star') {
                this.drawStar(0, 0, p.size, p.size * 0.4, 5);
            } else if (p.type === 'spark') {
                this.drawSpark(0, 0, p.size);
            } else {
                this.ctx.beginPath();
                this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
                this.ctx.fill();
            }

            this.ctx.restore();
        }
    }

    drawStar(cx, cy, outerR, innerR, points) {
        let rot = -Math.PI / 2;
        const step = Math.PI / points;
        this.ctx.beginPath();
        for (let i = 0; i < points * 2; i++) {
            const r = i % 2 === 0 ? outerR : innerR;
            const x = cx + Math.cos(rot) * r;
            const y = cy + Math.sin(rot) * r;
            i === 0 ? this.ctx.moveTo(x, y) : this.ctx.lineTo(x, y);
            rot += step;
        }
        this.ctx.closePath();
        this.ctx.fill();
    }

    drawSpark(x, y, size) {
        this.ctx.strokeStyle = this.ctx.fillStyle;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(x - size, y);
        this.ctx.lineTo(x + size, y);
        this.ctx.moveTo(x, y - size);
        this.ctx.lineTo(x, y + size);
        this.ctx.stroke();
    }

    updateShockwaves() {
        for (let i = this.shockwaves.length - 1; i >= 0; i--) {
            const s = this.shockwaves[i];

            s.radius += s.speed;
            s.alpha -= s.decay;

            if (s.alpha <= 0 || s.radius >= s.maxRadius) {
                this.shockwaves.splice(i, 1);
                continue;
            }

            this.ctx.save();
            this.ctx.globalAlpha = s.alpha;
            this.ctx.strokeStyle = s.color;
            this.ctx.lineWidth = s.lineWidth;
            this.ctx.shadowColor = s.color;
            this.ctx.shadowBlur = 10;

            this.ctx.beginPath();
            this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.restore();
        }
    }

    updateLightRays() {
        for (let i = this.lightRays.length - 1; i >= 0; i--) {
            const r = this.lightRays[i];

            if (r.fadeIn) {
                r.alpha += r.fadeSpeed;
                if (r.alpha >= 0.8) r.fadeIn = false;
            } else {
                r.alpha -= r.fadeSpeed * 0.4;
            }

            r.angle += r.rotationSpeed;

            if (r.alpha <= 0) {
                this.lightRays.splice(i, 1);
                continue;
            }

            const endX = r.x + Math.cos(r.angle) * r.length;
            const endY = r.y + Math.sin(r.angle) * r.length;

            this.ctx.save();
            this.ctx.globalAlpha = r.alpha * 0.5;

            const gradient = this.ctx.createLinearGradient(r.x, r.y, endX, endY);
            gradient.addColorStop(0, r.color);
            gradient.addColorStop(1, 'transparent');

            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = r.width;
            this.ctx.lineCap = 'round';

            this.ctx.beginPath();
            this.ctx.moveTo(r.x, r.y);
            this.ctx.lineTo(endX, endY);
            this.ctx.stroke();
            this.ctx.restore();
        }
    }

    getRollFrameCenter() {
        const rollFrame = document.getElementById('rollFrame');
        if (rollFrame) {
            const rect = rollFrame.getBoundingClientRect();
            return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        }
        return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    }

    trigger(rarity) {
        const pos = this.getRollFrameCenter();
        switch (rarity) {
            case 'common': this.triggerCommonReveal(pos.x, pos.y); break;
            case 'uncommon': this.triggerUncommonReveal(pos.x, pos.y); break;
            case 'rare': this.triggerRareReveal(pos.x, pos.y); break;
            case 'epic': this.triggerEpicReveal(pos.x, pos.y); break;
            case 'legendary': this.triggerLegendaryReveal(pos.x, pos.y); break;
            case 'mythic': this.triggerMythicReveal(pos.x, pos.y); break;
        }
    }
}

const vfx = new VFXEngine();

// CSS animations
const vfxStyles = document.createElement('style');
vfxStyles.textContent = `
    @keyframes vfxFlashOut {
        0% { opacity: inherit; }
        100% { opacity: 0; }
    }
`;
document.head.appendChild(vfxStyles);
