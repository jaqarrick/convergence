let rooms = []

const sendUpdatedRooms = (io, roomid) => {
  if (roomid && !rooms.includes(roomid)) rooms.push(roomid)
  io.emit("update room list", rooms)
}

module.exports = sendUpdatedRooms
