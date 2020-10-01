let rooms = []

const sendUpdatedRooms = (io, currentRoomId, currentPeerId = null) => {
  console.log(currentRoomId, currentPeerId)
  const getCurrentObject = (property, arrayOfObjects) => {
    return arrayOfObjects.find(({ roomid }) => roomid === property)
  }

  const currentObject = getCurrentObject(currentRoomId, rooms)
  if (currentRoomId && !currentObject & !currentPeerId) {
    rooms.push({ roomid: currentRoomId, peerids: [] })
  } else if (currentObject && currentRoomId && currentPeerId) {
    currentObject.peerids = [...currentObject.peerids, currentPeerId]
    console.log(currentObject)
  }
  io.emit("update room list", rooms)
}

module.exports = sendUpdatedRooms
