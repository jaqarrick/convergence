import React, { useCallback, useState } from "react"
import "./Welcome.css"
import { v4 as uuidv4 } from "uuid"
interface Props {
  // history: any
  updateRoom: (roomid: string) => void
  allRooms: any[]
  joinRoom: (roomid: string) => void
}
const Welcome: React.FC<Props> = ({
  // history,
  updateRoom,
  allRooms,
  joinRoom,
}) => {
  const [isListOpen, setIsListOpen] = useState<Boolean>(true)
  const createNewRoom = useCallback(() => {
    const roomId = uuidv4()
    updateRoom(roomId)
  }, [updateRoom])

  return (
    <div>
      <button onClick={createNewRoom}> Join New Room </button>
      <button onClick={() => setIsListOpen(!isListOpen)}>
        {" "}
        Join Existing Room{" "}
      </button>
      <div className={isListOpen ? "room-list active" : "room-list"}>
        <ul>
          {allRooms.map(room => (
            <li
              onClick={() => {
                updateRoom(room)
              }}
              key={room}>
              {" "}
              {room}{" "}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Welcome
