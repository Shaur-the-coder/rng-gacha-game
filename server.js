// WebSocket server for RNG Game Trading + Free Roam
// Run with: node server.js

const WebSocket = require('ws');

const PORT = 3001;
const wss = new WebSocket.Server({ port: PORT });

// Store connected players (trading)
const players = new Map();

// Store roam players separately
const roamPlayers = new Map();

console.log(`🎮 RNG Trade Server running on ws://localhost:${PORT}`);

wss.on('connection', (ws) => {
    let playerId = null;
    let isRoamPlayer = false;

    ws.on('message', (data) => {
        try {
            const message = JSON.parse(data);

            // ============================================
            // FREE ROAM HANDLERS
            // ============================================

            if (message.type === 'ROAM_JOIN') {
                playerId = message.playerId;
                isRoamPlayer = true;
                roamPlayers.set(playerId, {
                    ws,
                    id: playerId,
                    username: message.username,
                    x: message.x,
                    y: message.y,
                    z: message.z || 0,
                    rotY: message.rotY || 0,
                    color: message.color,
                    lastSeen: Date.now()
                });
                console.log(`🌍 Roam player joined: ${message.username} (${playerId})`);

                // Send current roam players to new player
                const playerList = [];
                roamPlayers.forEach((player, id) => {
                    if (id !== playerId) {
                        playerList.push({
                            id: player.id,
                            username: player.username,
                            x: player.x,
                            y: player.y,
                            z: player.z,
                            rotY: player.rotY,
                            color: player.color
                        });
                    }
                });
                ws.send(JSON.stringify({ type: 'ROAM_PLAYERS', players: playerList }));

                // Broadcast new player to all others
                broadcastRoam({
                    type: 'ROAM_PLAYER_JOINED',
                    id: playerId,
                    username: message.username,
                    x: message.x,
                    y: message.y,
                    color: message.color
                }, playerId);
                return;
            }

            if (message.type === 'ROAM_MOVE') {
                if (roamPlayers.has(message.from)) {
                    const player = roamPlayers.get(message.from);
                    player.x = message.x;
                    player.y = message.y;
                    player.z = message.z || 0;
                    player.rotY = message.rotY || 0;
                    player.lastSeen = Date.now();

                    // Broadcast position to all other roam players
                    broadcastRoam({
                        type: 'ROAM_MOVE',
                        from: message.from,
                        x: message.x,
                        y: message.y,
                        z: message.z,
                        rotY: message.rotY
                    }, message.from);
                }
                return;
            }

            if (message.type === 'ROAM_CHAT') {
                if (roamPlayers.has(message.from)) {
                    roamPlayers.get(message.from).lastSeen = Date.now();
                    // Broadcast chat to all other roam players
                    broadcastRoam({
                        type: 'ROAM_CHAT',
                        from: message.from,
                        username: message.username,
                        message: message.message
                    }, message.from);
                }
                return;
            }

            // ============================================
            // TRADING HANDLERS (existing)
            // ============================================

            // Handle player registration
            if (message.type === 'REGISTER') {
                playerId = message.playerId;
                isRoamPlayer = false;
                players.set(playerId, {
                    ws,
                    username: message.username,
                    lastSeen: Date.now()
                });
                console.log(`✅ Player connected: ${message.username} (${playerId})`);

                // Send current online players to new player
                const onlineList = {};
                players.forEach((player, id) => {
                    if (id !== playerId) {
                        onlineList[id] = { username: player.username };
                    }
                });
                ws.send(JSON.stringify({ type: 'PLAYER_LIST', players: onlineList }));

                // Broadcast new player to all others
                broadcast({
                    type: 'PLAYER_ONLINE',
                    from: playerId,
                    username: message.username
                }, playerId);
                return;
            }

            // Handle heartbeat
            if (message.type === 'HEARTBEAT') {
                if (players.has(playerId)) {
                    players.get(playerId).lastSeen = Date.now();
                }
                if (roamPlayers.has(playerId)) {
                    roamPlayers.get(playerId).lastSeen = Date.now();
                }
                return;
            }

            // Forward messages to specific player or broadcast
            if (message.to) {
                // Send to specific player
                const target = players.get(message.to);
                if (target && target.ws.readyState === WebSocket.OPEN) {
                    target.ws.send(JSON.stringify(message));
                }
            } else {
                // Broadcast to all except sender
                broadcast(message, playerId);
            }
        } catch (err) {
            console.error('Error handling message:', err);
        }
    });

    ws.on('close', () => {
        if (playerId) {
            // Handle roam player disconnect
            if (roamPlayers.has(playerId)) {
                const player = roamPlayers.get(playerId);
                console.log(`🌍 Roam player disconnected: ${player.username}`);
                roamPlayers.delete(playerId);
                broadcastRoam({ type: 'ROAM_LEAVE', from: playerId });
            }

            // Handle trading player disconnect
            if (players.has(playerId)) {
                const player = players.get(playerId);
                console.log(`❌ Player disconnected: ${player.username}`);
                players.delete(playerId);
                broadcast({ type: 'PLAYER_OFFLINE', from: playerId });
            }
        }
    });

    ws.on('error', (err) => {
        console.error('WebSocket error:', err);
    });
});

// Broadcast message to all trading players except sender
function broadcast(message, excludeId = null) {
    const data = JSON.stringify(message);
    players.forEach((player, id) => {
        if (id !== excludeId && player.ws.readyState === WebSocket.OPEN) {
            player.ws.send(data);
        }
    });
}

// Broadcast message to all roam players except sender
function broadcastRoam(message, excludeId = null) {
    const data = JSON.stringify(message);
    roamPlayers.forEach((player, id) => {
        if (id !== excludeId && player.ws.readyState === WebSocket.OPEN) {
            player.ws.send(data);
        }
    });
}

// Clean up stale connections every 10 seconds
setInterval(() => {
    const now = Date.now();

    // Clean up trading players
    players.forEach((player, id) => {
        if (now - player.lastSeen > 15000) {
            console.log(`🕐 Player timed out: ${player.username}`);
            player.ws.close();
            players.delete(id);
            broadcast({ type: 'PLAYER_OFFLINE', from: id });
        }
    });

    // Clean up roam players
    roamPlayers.forEach((player, id) => {
        if (now - player.lastSeen > 15000) {
            console.log(`🕐 Roam player timed out: ${player.username}`);
            player.ws.close();
            roamPlayers.delete(id);
            broadcastRoam({ type: 'ROAM_LEAVE', from: id });
        }
    });
}, 10000);

console.log('Waiting for players to connect...');
