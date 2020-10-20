const express = require("express")
const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server)
const sendUpdatedRooms = require("./middleware/sendUpdatedRooms")
const joinRoom = require("./middleware/joinRoom")
const { send } = require("process")
const updateRooms = require("./middleware/updateRooms.js").updateRooms
const sendRooms = require("./middleware/updateRooms").sendRooms

io.on("connection", socket => {
	// sendUpdatedRooms(io, null)
	console.log("A user has connected!")
	socket.emit("welcome", "welcome to convergence")
	// socket.on("update room", roomid => {
	//   sendUpdatedRooms(io, roomid)
	// })

	//handles initial request of rooms on App render
	socket.on("request room data", () => sendRooms(socket))

	//handles joining a new or existing room
	socket.on("update room", ({ roomid, peerid }) => {
		updateRooms(roomid, peerid, socket, io)
	})
	socket.on("update peers", data => {
		const { roomid, peerid } = data

		sendUpdatedRooms(io, roomid, peerid)
	})
	socket.on("disconnect", () => {
		console.log("A user has disconnected!")
		//need to add a function here that removes and updates rooms data
	})
})

const PORT = 5000
server.listen(PORT, () => {
	console.log("backend server is up and running on Port: " + PORT)
})
