// ============================================
// RNG Gacha - 3D Multiplayer World
// Using Three.js for 3D rendering
// ============================================

// WebSocket connection
let ws = null;
let playerId = '';
let username = '';
let connected = false;

// Game state
const players = new Map();
let myPlayer = null;

// Three.js components
let scene, camera, renderer;
let playerMesh;

// World settings
const WORLD_SIZE = 200;
const PLAYER_HEIGHT = 1.8;
const PLAYER_SPEED = 8;
const RUN_SPEED = 16;
const JUMP_FORCE = 10;
const GRAVITY = 25;

// Player state
let velocity = { x: 0, y: 0, z: 0 };
let isOnGround = true;
let isLocked = false;

// Camera rotation
let pitch = 0;
let yaw = 0;

// Input state
const keys = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
    run: false
};

// Player colors
const PLAYER_COLORS = [
    0x667eea, 0x764ba2, 0x22c55e, 0xf59e0b, 0xef4444,
    0xec4899, 0x8b5cf6, 0x06b6d4, 0x10b981, 0xf97316
];

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    setupUsernameModal();
});

function setupUsernameModal() {
    const input = document.getElementById('usernameInput');
    const btn = document.getElementById('submitBtn');

    input.addEventListener('input', () => {
        btn.disabled = input.value.trim().length < 3;
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !btn.disabled) {
            startGame();
        }
    });

    btn.addEventListener('click', startGame);
}

function startGame() {
    const input = document.getElementById('usernameInput');
    username = input.value.trim();
    if (username.length < 3) return;

    playerId = 'roam_' + Math.random().toString(36).substr(2, 9);

    // Hide modal, show game
    document.getElementById('usernameModal').classList.add('hidden');
    document.getElementById('gameContainer').classList.remove('hidden');

    // Initialize Three.js
    initThreeJS();

    // Setup controls
    setupControls();

    // Setup chat
    setupChat();

    // Connect to server
    connectWebSocket();

    // Add welcome message
    addChatMessage(null, `Welcome ${username}! Use WASD to move, mouse to look around.`, true);

    // Start game loop
    animate();
}

// ============================================
// Three.js Setup
// ============================================

function initThreeJS() {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    scene.fog = new THREE.Fog(0x1a1a2e, 50, 150);

    // Camera (first-person)
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, PLAYER_HEIGHT, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('gameContainer').appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404060, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(50, 100, 50);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.camera.left = -100;
    directionalLight.shadow.camera.right = 100;
    directionalLight.shadow.camera.top = 100;
    directionalLight.shadow.camera.bottom = -100;
    scene.add(directionalLight);

    // Hemisphere light for better ambient
    const hemiLight = new THREE.HemisphereLight(0x667eea, 0x0a0a0f, 0.6);
    scene.add(hemiLight);

    // Ground
    createGround();

    // Skybox (simple gradient)
    createSkybox();

    // Environment objects
    createEnvironment();

    // Create local player
    myPlayer = {
        id: playerId,
        username: username,
        x: 0,
        y: PLAYER_HEIGHT,
        z: 0,
        rotY: 0,
        color: PLAYER_COLORS[Math.floor(Math.random() * PLAYER_COLORS.length)]
    };
    players.set(playerId, myPlayer);

    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

function createGround() {
    // Main ground
    const groundGeometry = new THREE.PlaneGeometry(WORLD_SIZE * 2, WORLD_SIZE * 2, 50, 50);
    const groundMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a2e,
        roughness: 0.8,
        metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Grid overlay
    const gridHelper = new THREE.GridHelper(WORLD_SIZE * 2, 40, 0x667eea, 0x333355);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // Boundary walls (invisible but for visual reference, add glowing edges)
    const wallMaterial = new THREE.MeshBasicMaterial({
        color: 0x667eea,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide
    });

    const wallHeight = 20;
    const walls = [
        { pos: [0, wallHeight / 2, -WORLD_SIZE], rot: [0, 0, 0] },
        { pos: [0, wallHeight / 2, WORLD_SIZE], rot: [0, 0, 0] },
        { pos: [-WORLD_SIZE, wallHeight / 2, 0], rot: [0, Math.PI / 2, 0] },
        { pos: [WORLD_SIZE, wallHeight / 2, 0], rot: [0, Math.PI / 2, 0] }
    ];

    walls.forEach(w => {
        const wallGeo = new THREE.PlaneGeometry(WORLD_SIZE * 2, wallHeight);
        const wall = new THREE.Mesh(wallGeo, wallMaterial);
        wall.position.set(...w.pos);
        wall.rotation.set(...w.rot);
        scene.add(wall);
    });
}

function createSkybox() {
    // Simple gradient sky using a large sphere
    const skyGeo = new THREE.SphereGeometry(500, 32, 32);
    const skyMat = new THREE.ShaderMaterial({
        uniforms: {
            topColor: { value: new THREE.Color(0x0a0a1a) },
            bottomColor: { value: new THREE.Color(0x1a1a3e) },
            offset: { value: 20 },
            exponent: { value: 0.6 }
        },
        vertexShader: `
            varying vec3 vWorldPosition;
            void main() {
                vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                vWorldPosition = worldPosition.xyz;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 topColor;
            uniform vec3 bottomColor;
            uniform float offset;
            uniform float exponent;
            varying vec3 vWorldPosition;
            void main() {
                float h = normalize(vWorldPosition + offset).y;
                gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
            }
        `,
        side: THREE.BackSide
    });
    const sky = new THREE.Mesh(skyGeo, skyMat);
    scene.add(sky);
}

function createEnvironment() {
    // Platform at center
    const platformGeo = new THREE.CylinderGeometry(15, 15, 0.5, 32);
    const platformMat = new THREE.MeshStandardMaterial({
        color: 0x667eea,
        roughness: 0.5,
        metalness: 0.3
    });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.y = 0.25;
    platform.receiveShadow = true;
    platform.castShadow = true;
    scene.add(platform);

    // Pillars around the platform
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const pillarGeo = new THREE.CylinderGeometry(0.5, 0.5, 6, 8);
        const pillarMat = new THREE.MeshStandardMaterial({
            color: 0x764ba2,
            roughness: 0.4,
            metalness: 0.5
        });
        const pillar = new THREE.Mesh(pillarGeo, pillarMat);
        pillar.position.set(Math.cos(angle) * 12, 3, Math.sin(angle) * 12);
        pillar.castShadow = true;
        pillar.receiveShadow = true;
        scene.add(pillar);

        // Glowing orb on top
        const orbGeo = new THREE.SphereGeometry(0.4, 16, 16);
        const orbMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
        const orb = new THREE.Mesh(orbGeo, orbMat);
        orb.position.set(Math.cos(angle) * 12, 6.5, Math.sin(angle) * 12);
        scene.add(orb);
    }

    // Scattered cubes/boxes
    const boxPositions = [
        [-30, 1, -30], [30, 1.5, -25], [-25, 1, 35], [40, 2, 30],
        [-50, 1.5, 10], [50, 1, -10], [-10, 1, 50], [20, 1, -45],
        [-45, 2, -45], [45, 1.5, 45], [-35, 1, 0], [0, 1, -35],
        [60, 1, 60], [-60, 1.5, -60], [70, 2, -30], [-70, 1, 40]
    ];

    boxPositions.forEach(pos => {
        const size = 1 + Math.random() * 2;
        const boxGeo = new THREE.BoxGeometry(size, size * 1.5, size);
        const boxMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(Math.random(), 0.5, 0.3),
            roughness: 0.7,
            metalness: 0.3
        });
        const box = new THREE.Mesh(boxGeo, boxMat);
        box.position.set(pos[0], pos[1], pos[2]);
        box.rotation.y = Math.random() * Math.PI;
        box.castShadow = true;
        box.receiveShadow = true;
        scene.add(box);
    });

    // Floating crystals
    for (let i = 0; i < 20; i++) {
        const crystalGeo = new THREE.OctahedronGeometry(0.5 + Math.random() * 0.5, 0);
        const crystalMat = new THREE.MeshStandardMaterial({
            color: PLAYER_COLORS[i % PLAYER_COLORS.length],
            roughness: 0.2,
            metalness: 0.8,
            transparent: true,
            opacity: 0.8
        });
        const crystal = new THREE.Mesh(crystalGeo, crystalMat);
        crystal.position.set(
            (Math.random() - 0.5) * WORLD_SIZE * 1.5,
            3 + Math.random() * 5,
            (Math.random() - 0.5) * WORLD_SIZE * 1.5
        );
        crystal.userData.floatOffset = Math.random() * Math.PI * 2;
        crystal.userData.isFloating = true;
        scene.add(crystal);
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// ============================================
// Controls
// ============================================

function setupControls() {
    // Pointer lock
    const clickOverlay = document.getElementById('clickToStart');
    const gameContainer = document.getElementById('gameContainer');

    clickOverlay.addEventListener('click', () => {
        renderer.domElement.requestPointerLock();
    });

    document.addEventListener('pointerlockchange', () => {
        isLocked = document.pointerLockElement === renderer.domElement;
        clickOverlay.classList.toggle('hidden', isLocked);
    });

    // Mouse movement
    document.addEventListener('mousemove', (e) => {
        if (!isLocked) return;

        const sensitivity = 0.002;
        yaw -= e.movementX * sensitivity;
        pitch -= e.movementY * sensitivity;

        // Clamp pitch
        pitch = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, pitch));
    });

    // Keyboard
    document.addEventListener('keydown', (e) => {
        // If typing in chat, don't process game keys
        if (document.activeElement === document.getElementById('chatInput')) {
            if (e.key === 'Escape') {
                document.getElementById('chatInput').blur();
            }
            return;
        }

        switch (e.code) {
            case 'KeyW': keys.forward = true; break;
            case 'KeyS': keys.backward = true; break;
            case 'KeyA': keys.left = true; break;
            case 'KeyD': keys.right = true; break;
            case 'Space':
                if (isOnGround) {
                    velocity.y = JUMP_FORCE;
                    isOnGround = false;
                }
                e.preventDefault();
                break;
            case 'ShiftLeft':
            case 'ShiftRight':
                keys.run = true;
                break;
            case 'KeyT':
                e.preventDefault();
                document.getElementById('chatInput').focus();
                break;
        }
    });

    document.addEventListener('keyup', (e) => {
        switch (e.code) {
            case 'KeyW': keys.forward = false; break;
            case 'KeyS': keys.backward = false; break;
            case 'KeyA': keys.left = false; break;
            case 'KeyD': keys.right = false; break;
            case 'ShiftLeft':
            case 'ShiftRight':
                keys.run = false;
                break;
        }
    });
}

function setupChat() {
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');

    sendBtn.addEventListener('click', sendChatMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
            input.blur();
        }
    });
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;

    input.value = '';

    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
            type: 'ROAM_CHAT',
            from: playerId,
            username: username,
            message: message
        }));
    }

    addChatMessage(username, message);
}

function addChatMessage(sender, message, isSystem = false) {
    const container = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = 'chat-message' + (isSystem ? ' system' : '');

    if (isSystem) {
        div.textContent = message;
    } else {
        const senderSpan = document.createElement('span');
        senderSpan.className = 'sender';
        senderSpan.textContent = sender + ':';
        div.appendChild(senderSpan);
        div.appendChild(document.createTextNode(' ' + message));
    }

    container.appendChild(div);
    container.scrollTop = container.scrollHeight;

    while (container.children.length > 50) {
        container.removeChild(container.firstChild);
    }
}

// ============================================
// WebSocket
// ============================================

function connectWebSocket() {
    ws = new WebSocket(`ws://${window.location.hostname}:3001`);

    ws.onopen = () => {
        connected = true;
        console.log('Connected to server');

        ws.send(JSON.stringify({
            type: 'ROAM_JOIN',
            playerId: playerId,
            username: username,
            x: myPlayer.x,
            y: myPlayer.y,
            z: myPlayer.z,
            color: myPlayer.color
        }));

        setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ type: 'HEARTBEAT', playerId }));
            }
        }, 5000);
    };

    ws.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            handleServerMessage(data);
        } catch (err) {
            console.error('Error parsing message:', err);
        }
    };

    ws.onclose = () => {
        connected = false;
        addChatMessage(null, 'Disconnected. Reconnecting...', true);
        setTimeout(connectWebSocket, 3000);
    };

    ws.onerror = (err) => {
        console.error('WebSocket error:', err);
    };
}

function handleServerMessage(data) {
    switch (data.type) {
        case 'ROAM_PLAYERS':
            data.players.forEach(p => {
                if (p.id !== playerId) {
                    createPlayerMesh(p);
                }
            });
            updatePlayerList();
            updatePlayerCount();
            break;

        case 'ROAM_PLAYER_JOINED':
            if (data.id !== playerId) {
                createPlayerMesh(data);
                addChatMessage(null, `${data.username} joined the world`, true);
                updatePlayerList();
                updatePlayerCount();
            }
            break;

        case 'ROAM_MOVE':
            if (data.from !== playerId && players.has(data.from)) {
                const player = players.get(data.from);
                player.targetX = data.x;
                player.targetY = data.y;
                player.targetZ = data.z;
                player.targetRotY = data.rotY || 0;
            }
            break;

        case 'ROAM_LEAVE':
            if (players.has(data.from)) {
                const player = players.get(data.from);
                addChatMessage(null, `${player.username} left the world`, true);
                if (player.mesh) scene.remove(player.mesh);
                if (player.label) scene.remove(player.label);
                players.delete(data.from);
                updatePlayerList();
                updatePlayerCount();
            }
            break;

        case 'ROAM_CHAT':
            if (data.from !== playerId) {
                addChatMessage(data.username, data.message);
            }
            break;
    }
}

function createPlayerMesh(playerData) {
    // Body
    const bodyGeo = new THREE.CapsuleGeometry(0.4, 1, 4, 8);
    const bodyMat = new THREE.MeshStandardMaterial({
        color: playerData.color,
        roughness: 0.5,
        metalness: 0.3
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);

    // Head
    const headGeo = new THREE.SphereGeometry(0.3, 16, 16);
    const headMat = new THREE.MeshStandardMaterial({
        color: 0xffcc99,
        roughness: 0.7,
        metalness: 0.1
    });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 0.9;

    // Group
    const playerGroup = new THREE.Group();
    playerGroup.add(body);
    playerGroup.add(head);
    playerGroup.position.set(playerData.x, playerData.y || PLAYER_HEIGHT, playerData.z);
    playerGroup.castShadow = true;
    scene.add(playerGroup);

    // Name label (using sprite)
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 64;
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, 0, 256, 64);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(playerData.username, 128, 42);

    const labelTexture = new THREE.CanvasTexture(canvas);
    const labelMat = new THREE.SpriteMaterial({ map: labelTexture, transparent: true });
    const label = new THREE.Sprite(labelMat);
    label.scale.set(3, 0.75, 1);
    label.position.set(playerData.x, (playerData.y || PLAYER_HEIGHT) + 1.5, playerData.z);
    scene.add(label);

    const player = {
        id: playerData.id,
        username: playerData.username,
        x: playerData.x,
        y: playerData.y || PLAYER_HEIGHT,
        z: playerData.z,
        targetX: playerData.x,
        targetY: playerData.y || PLAYER_HEIGHT,
        targetZ: playerData.z,
        targetRotY: 0,
        color: playerData.color,
        mesh: playerGroup,
        label: label
    };
    players.set(playerData.id, player);
}

function sendPosition() {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
            type: 'ROAM_MOVE',
            from: playerId,
            x: myPlayer.x,
            y: myPlayer.y,
            z: myPlayer.z,
            rotY: yaw
        }));
    }
}

// ============================================
// Game Loop
// ============================================

let lastTime = 0;
let lastPositionSend = 0;
const POSITION_SEND_INTERVAL = 50;

function animate(currentTime = 0) {
    requestAnimationFrame(animate);

    const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
    lastTime = currentTime;

    update(delta, currentTime);
    render();
}

function update(delta, currentTime) {
    if (!myPlayer) return;

    // Get movement direction
    const speed = keys.run ? RUN_SPEED : PLAYER_SPEED;
    let moveX = 0;
    let moveZ = 0;

    if (keys.forward) moveZ -= 1;
    if (keys.backward) moveZ += 1;
    if (keys.left) moveX -= 1;
    if (keys.right) moveX += 1;

    // Normalize if diagonal
    if (moveX !== 0 && moveZ !== 0) {
        const len = Math.sqrt(moveX * moveX + moveZ * moveZ);
        moveX /= len;
        moveZ /= len;
    }

    // Rotate movement by yaw
    const cos = Math.cos(yaw);
    const sin = Math.sin(yaw);
    const worldMoveX = moveX * cos - moveZ * sin;
    const worldMoveZ = moveX * sin + moveZ * cos;

    // Apply movement
    myPlayer.x += worldMoveX * speed * delta;
    myPlayer.z += worldMoveZ * speed * delta;

    // Apply gravity
    velocity.y -= GRAVITY * delta;
    myPlayer.y += velocity.y * delta;

    // Ground collision
    if (myPlayer.y <= PLAYER_HEIGHT) {
        myPlayer.y = PLAYER_HEIGHT;
        velocity.y = 0;
        isOnGround = true;
    }

    // World boundaries
    myPlayer.x = Math.max(-WORLD_SIZE + 1, Math.min(WORLD_SIZE - 1, myPlayer.x));
    myPlayer.z = Math.max(-WORLD_SIZE + 1, Math.min(WORLD_SIZE - 1, myPlayer.z));

    // Update camera position
    camera.position.set(myPlayer.x, myPlayer.y, myPlayer.z);
    camera.rotation.order = 'YXZ';
    camera.rotation.y = yaw;
    camera.rotation.x = pitch;

    // Send position update
    if (currentTime - lastPositionSend > POSITION_SEND_INTERVAL) {
        sendPosition();
        lastPositionSend = currentTime;
    }

    // Interpolate other players
    players.forEach((player) => {
        if (player.id !== playerId && player.mesh) {
            player.x += (player.targetX - player.x) * 0.15;
            player.y += (player.targetY - player.y) * 0.15;
            player.z += (player.targetZ - player.z) * 0.15;

            player.mesh.position.set(player.x, player.y - PLAYER_HEIGHT / 2 + 0.5, player.z);
            player.mesh.rotation.y = player.targetRotY || 0;

            if (player.label) {
                player.label.position.set(player.x, player.y + 0.8, player.z);
            }
        }
    });

    // Animate floating crystals
    scene.traverse((obj) => {
        if (obj.userData.isFloating) {
            obj.position.y += Math.sin(currentTime * 0.001 + obj.userData.floatOffset) * 0.003;
            obj.rotation.y += 0.01;
        }
    });
}

function render() {
    renderer.render(scene, camera);
}

// ============================================
// UI Updates
// ============================================

function updatePlayerList() {
    const container = document.getElementById('playerListContent');
    container.innerHTML = '';

    players.forEach(player => {
        const div = document.createElement('div');
        div.className = 'player-list-item';

        const dot = document.createElement('div');
        dot.className = 'player-dot';
        dot.style.backgroundColor = '#' + player.color.toString(16).padStart(6, '0');

        const name = document.createElement('span');
        name.className = 'player-name' + (player.id === playerId ? ' self' : '');
        name.textContent = player.username + (player.id === playerId ? ' (You)' : '');

        div.appendChild(dot);
        div.appendChild(name);
        container.appendChild(div);
    });
}

function updatePlayerCount() {
    document.getElementById('playerCount').textContent = players.size;
}
