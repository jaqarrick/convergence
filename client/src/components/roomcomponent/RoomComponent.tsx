import React from "react"
import { RouteChildrenProps, Link } from "react-router-dom"

interface RouteProps extends RouteChildrenProps<{ roomid: string }> {}
interface PassedProps {
  message: string
}
const RoomComponent: React.FC<RouteProps & PassedProps> = ({
  message,
  match,
}) => {
  console.log(message)

  return (
    <div>
      {" "}
      <h1> {match?.params.roomid} </h1>
      <p> {message} </p>
      <Link to='/'> Home </Link>
    </div>
  )
}

export default RoomComponent
