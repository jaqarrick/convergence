const joinRoom = (socket, io, roomid) => {
	socket.join(roomid)
	const data = {
		message: `A new user has joined the room (${roomid})`,
		roomid: roomid,
	}
	io.in(roomid).emit("confirm room join", data)
	socket.emit("update socket room", roomid)
}

module.exports = joinRoom
