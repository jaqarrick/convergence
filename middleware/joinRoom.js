const joinRoom = (socket, io, roomid) => {
  socket.join(roomid)
  const message = `A new user has joined the room (${roomid})`
  io.in(roomid).emit("confirm room join", message)
}

module.exports = joinRoom
