const express = require("express")
const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server)
const sendUpdatedRooms = require("./middleware/sendUpdatedRooms")

io.on("connection", socket => {
  sendUpdatedRooms(io, null)
  console.log("A user has connected!")
  socket.on("update room", roomid => {
    sendUpdatedRooms(io, roomid)
  })

  socket.on("update room", roomid => {
    socket.join(roomid)
  })
  socket.on("disconnect", () => {
    console.log("A user has disconnected!")
  })
})

const PORT = 5000
server.listen(PORT, () => {
  console.log("backend server is up and running on Port: " + PORT)
})
