import React, { useCallback, useEffect, useState } from "react"
import "./App.css"
import { Switch, Route, Redirect, useHistory } from "react-router-dom"
import io from "socket.io-client"
import Welcome from "./components/welcome/Welcome"
import RoomComponent from "./components/roomcomponent/RoomComponent"

const socket = io.connect("http://localhost:5000")

function App() {
  let history = useHistory()
  const [currentRoom, setCurrentRoom] = useState()
  const [allRooms, setAllRooms] = useState<any[]>([])
  useEffect(() => console.log(allRooms), [allRooms])
  socket.on("update room list", (rooms: any[]) => {
    setAllRooms(rooms)
  })
  const updateRoom = useCallback(
    roomid => {
      history.push(`/rooms/${roomid}`)
      setCurrentRoom(roomid)
      socket.emit("update room", roomid)
    },
    [setCurrentRoom, history]
  )

  const joinRoom = useCallback(roomid => {
    socket.emit("join room", roomid)
    console.log(`You have joined room: ${roomid}`)
  }, [])
  // const [currentRoom, setCurrentRoom] = useState<any>(null)
  return (
    <Switch>
      <Route path={"/rooms/:roomid"} component={RoomComponent} />
      <Route path='/welcome'>
        <Welcome
          // history={history}
          allRooms={allRooms}
          updateRoom={updateRoom}
          joinRoom={joinRoom}
        />
      </Route>
      <Route exact path='/'>
        <Redirect to='/welcome' />
      </Route>
    </Switch>
  )
}

export default App
