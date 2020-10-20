const joinRoom = require("./joinRoom")
const { uuidv4 } = require("uuidv4")
let rooms = []

const updateRooms = (roomid, peerid, socket, io) => {
	//if no roomid is specified, create a random roomid and add it to the room data array
	if (!roomid) {
		const randomRoomid = uuidv4()
		//create a new room object with a roomid and array of peerids
		const roomObject = {
			roomid: randomRoomid,
			peerids: [peerid],
		}
		rooms.push(roomObject)
		joinRoom(socket, io, randomRoomid)
	} else {
		//if roomid is specified, find that specific roomObject in rooms
		console.log(roomid)

		//find the room object in the array
		const getCurrentObject = (property, arrayOfObjects) =>
			arrayOfObjects.find(({ roomid }) => roomid === property)
		const currentRoom = getCurrentObject(roomid, rooms)
		if (currentRoom) {
			//join the room
			joinRoom(socket, io, roomid)
			//update the peers in the room
			//check if the peerid already exists in the room
			//if it doesn't, add the peerid to the array
			if (!currentRoom.peerids.includes(peerid)) {
				currentRoom.peerids = [...currentRoom.peerids, peerid]
				console.log(rooms)
			}
		} else {
			throw "the current room can't be found... something went wrong"
		}
	}
	//send the updated list of room data back to all clients connected
	io.emit("send rooms", rooms)
}

//this is an initial request from a socket that has connected
const sendRooms = socket => {
	socket.emit("send rooms", rooms)
	console.log("sent rooms list")
}

module.exports = { updateRooms, sendRooms }
//if there is no roomid specified, create a random roomid
//socket.join that room
//update the rooms array with the roomid, and inside the room object add an array of peerids

//if a roomid is specified, socket.join that room
//then update the room object in rooms

//after all this, emit an event that returns the rooms array

// const sendUpdatedRooms = (io, currentRoomId, currentPeerId = null) => {
//   console.log(currentRoomId, currentPeerId)
//   const getCurrentObject = (property, arrayOfObjects) => {
//     return arrayOfObjects.find(({ roomid }) => roomid === property)
//   }

//   const currentObject = getCurrentObject(currentRoomId, rooms)
//   if (currentRoomId && !currentObject & !currentPeerId) {
//     rooms.push({ roomid: currentRoomId, peerids: [] })
//   } else if (currentObject && currentRoomId && currentPeerId) {
//     currentObject.peerids = [...currentObject.peerids, currentPeerId]
//     console.log(currentObject)
//   }
//   io.emit("update room list", rooms)
// }

// module.exports = sendUpdatedRooms

// const joinRoom = (socket, io, roomid) => {
//     socket.join(roomid)
//     const data = {
//       message: `A new user has joined the room (${roomid})`,
//       roomid: roomid,
//     }
//     io.in(roomid).emit("confirm room join", data)
//   }

//   module.exports = joinRoom
