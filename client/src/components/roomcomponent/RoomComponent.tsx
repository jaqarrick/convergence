import React from "react"
import { RouteChildrenProps } from "react-router-dom"

interface Props extends RouteChildrenProps<{ roomid: string }> {}
const RoomComponent: React.FC<Props> = ({ match }) => {
  return (
    <div>
      {" "}
      <h1> {match?.params.roomid} </h1>{" "}
    </div>
  )
}

export default RoomComponent
