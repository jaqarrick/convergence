import React, { useCallback, useEffect, useState, useRef } from "react"
import { RouteChildrenProps, Link } from "react-router-dom"
import RoomDataObject from "../../types"

interface RouteProps extends RouteChildrenProps<{ roomid: string }> {}
interface PassedProps {
  message: string
  currentRoom: string
  currentPeer: any
  createPeer: () => any
  currentRoomObject: RoomDataObject | undefined
}
const RoomComponent: React.FC<RouteProps & PassedProps> = ({
  message,
  match,
  createPeer,
  currentRoom,
  currentPeer,
  currentRoomObject,
}) => {
  useEffect(() => console.log(message, currentRoom), [currentRoom, message])
  const [stream, setStream] = useState<MediaStream>()
  const initVideo = useCallback(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then(stream => {
        setStream(stream)
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = stream
          console.log(userVideoRef.current)
        }
      })
  }, [])

  const userVideoRef = useRef<any>(null)
  return (
    <div>
      {" "}
      <button onClick={createPeer}> Create New Peer </button>
      <button onClick={initVideo}> StartVideo </button>
      <p>
        {" "}
        {currentPeer
          ? `Your peer id is ${currentPeer}`
          : `You haven't created a peer id yet`}{" "}
      </p>
      <h1> {match?.params.roomid} </h1>
      <p> {message} </p>
      <div>
        {" "}
        <ul>
          {currentRoomObject?.peerids.map((peerid, i) => {
            if (peerid !== currentPeer) return <li key={i}> Call {peerid} </li>
          })}
        </ul>
      </div>
      <div>
        {" "}
        <video autoPlay ref={userVideoRef}></video>
      </div>
      <Link to='/'> Home </Link>
    </div>
  )
}

export default RoomComponent
