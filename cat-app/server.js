const express = require("express");

var io = require("socket.io")({
	path: "/webrtc",
});

const app = express();
const port = 8081;

app.use(express.static(__dirname + "/build"));

app.get("/*", (req, res) => {
	res.sendfile(__dirname + "/build/index.html");
});

const server = app.listen(port, () => console.log("Exemple app listen"));

io.listen(server);

const peers = io.of("/webrtcPeer");

let connectedPeers = new Map();

peers.on("connection", (socket) => {
	console.log(socket.id);

	socket.emit("connection-success", { success: socket.id });

	connectedPeers.set(socket.id, socket);

	socket.on("disconnect", () => {
		console.log("disconnected");
		connectedPeers.delete(socket.io);
	});

	socket.on("offer", (data) => {
		for (const [socketID, socket] of connectedPeers.entries()) {
			if (socketID !== data.socketID) {
				console.log(socketID, data.payload.type);
				socket.emit("offer", data.payload);
			}
		}
	});

	socket.on("Answer", (data) => {
		for (const [socketID, socket] of connectedPeers.entries()) {
			if (socketID !== data.socketID) {
				console.log(socketID, data.payload.type);
				socket.emit("Answer", data.payload);
			}
		}
	});
	socket.on("debut", () => {
		socket.emit("debut");
	});

	socket.on("candidate", (data) => {
		for (const [socketID, socket] of connectedPeers.entries()) {
			if (socketID !== data.socketID) {
				console.log(socketID, data.payload);
				socket.emit("candidate", data.payload);
			}
		}
	});
});
