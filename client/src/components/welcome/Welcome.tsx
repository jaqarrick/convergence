import React, { useEffect, useCallback, useState } from "react"
import "./Welcome.css"
import { v4 as uuidv4 } from "uuid"
import TextBanner from "../textbanner/TextBanner"
import Info from "../info/Info"
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
  useEffect(() => console.log(allRooms), [allRooms])
  const [isListOpen, setIsListOpen] = useState<Boolean>(true)
  const createNewRoom = useCallback(() => {
    const roomId = uuidv4()
    updateRoom(roomId)
  }, [updateRoom])

  return (
    <div className='welcome-container'>
      <TextBanner />
      <Info />

      <div className='old-welcome'>
        <button onClick={createNewRoom}> Join New Room </button>
        <button onClick={() => setIsListOpen(!isListOpen)}>
          {" "}
          Join Existing Room{" "}
        </button>
        <div className={isListOpen ? "room-list active" : "room-list"}>
          <ul>
            {allRooms.map(({ roomid }) => (
              <li
                onClick={() => {
                  updateRoom(roomid)
                }}
                key={roomid}>
                {" "}
                {roomid}{" "}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Welcome
