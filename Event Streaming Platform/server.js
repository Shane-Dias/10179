const express = require("express");
const WebSocket = require("ws");
const http = require("http");
const path = require("path");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// In-memory storage for events and participants
const events = {};

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html for the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Helper function to get userIds from an event
function getEventParticipantIds(eventId) {
  if (!events[eventId]) return [];
  return events[eventId].participants.map((p) => p.userId);
}

// WebSocket connection handling
wss.on("connection", (ws) => {
  ws.isAlive = true;

  // Set up ping-pong to detect disconnected clients
  ws.on("pong", () => {
    ws.isAlive = true;
  });

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);

      switch (data.type) {
        case "joinEvent":
          handleJoinEvent(ws, data.eventId, data.userId);
          break;
        case "sendMessage":
          handleSendMessage(data.eventId, data.userId, data.message);
          break;
        case "leaveEvent":
          handleLeaveEvent(ws, data.eventId, data.userId);
          break;
      }
    } catch (error) {
      console.error("Error handling message:", error);
    }
  });

  ws.on("close", () => {
    // Handle user disconnection
    handleDisconnect(ws);
  });
});

// Ping all clients every 30 seconds to check connection
const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) {
      handleDisconnect(ws);
      return ws.terminate();
    }

    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on("close", () => {
  clearInterval(interval);
});

// Handle user disconnection
function handleDisconnect(ws) {
  Object.keys(events).forEach((eventId) => {
    const event = events[eventId];
    const participant = event.participants.find((p) => p.ws === ws);

    if (participant) {
      handleLeaveEvent(ws, eventId, participant.userId);
    }
  });
}

// Handle user joining an event
function handleJoinEvent(ws, eventId, userId) {
  // Create event if it doesn't exist
  if (!events[eventId]) {
    events[eventId] = { participants: [], messages: [] };
  }

  // Check if user is already in the event
  const existingParticipant = events[eventId].participants.find(
    (p) => p.userId === userId
  );
  if (existingParticipant) {
    // Update the user's WebSocket connection
    existingParticipant.ws = ws;
  } else {
    // Add new participant
    events[eventId].participants.push({ ws, userId });
  }

  // Send welcome message to the user
  ws.send(
    JSON.stringify({
      type: "eventUpdate",
      message: `Welcome to the event "${eventId}"!`,
    })
  );

  // Broadcast join message to other participants
  broadcastEventUpdate(eventId, `${userId} joined the event.`, ws);

  // Send recent messages history to the user
  const recentMessages = events[eventId].messages.slice(-20); // Last 20 messages
  recentMessages.forEach((msg) => {
    ws.send(
      JSON.stringify({
        type: "newMessage",
        ...msg,
      })
    );
  });

  // Update all clients with new participant list
  broadcastParticipantsList(eventId);
}

// Handle user sending a message
function handleSendMessage(eventId, userId, message) {
  if (events[eventId]) {
    const timestamp = new Date().toISOString();
    const messageData = { userId, message, timestamp };

    // Store the message
    events[eventId].messages.push(messageData);

    // Keep only the latest 100 messages
    if (events[eventId].messages.length > 100) {
      events[eventId].messages = events[eventId].messages.slice(-100);
    }

    // Broadcast to all participants
    broadcastMessage(eventId, messageData);
  }
}

// Handle user leaving an event
function handleLeaveEvent(ws, eventId, userId) {
  if (events[eventId]) {
    // Remove the participant
    events[eventId].participants = events[eventId].participants.filter(
      (p) => !(p.userId === userId && p.ws === ws)
    );

    // Broadcast leave message
    broadcastEventUpdate(eventId, `${userId} left the event.`);

    // Update participant list
    broadcastParticipantsList(eventId);

    // Clean up empty events
    if (events[eventId].participants.length === 0) {
      delete events[eventId];
    }
  }
}

// Broadcast event updates to all participants
function broadcastEventUpdate(eventId, message, excludeWs = null) {
  if (events[eventId]) {
    events[eventId].participants.forEach((participant) => {
      if (!excludeWs || participant.ws !== excludeWs) {
        participant.ws.send(
          JSON.stringify({
            type: "eventUpdate",
            message,
          })
        );
      }
    });
  }
}

// Broadcast messages to all participants
function broadcastMessage(eventId, messageData) {
  if (events[eventId]) {
    events[eventId].participants.forEach((participant) => {
      participant.ws.send(
        JSON.stringify({
          type: "newMessage",
          ...messageData,
        })
      );
    });
  }
}

// Broadcast participants list to all users in an event
function broadcastParticipantsList(eventId) {
  if (events[eventId]) {
    const participantIds = getEventParticipantIds(eventId);

    events[eventId].participants.forEach((participant) => {
      participant.ws.send(
        JSON.stringify({
          type: "participantsUpdate",
          participants: participantIds,
        })
      );
    });
  }
}

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
