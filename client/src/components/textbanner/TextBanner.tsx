import React, { useCallback, useRef, useEffect } from "react"
import "./TextBanner.css"
interface Props {}
const TextBanner: React.FunctionComponent<Props> = () => {
  return (
    <div className='text-banner-container'>
      <TextTicker />
    </div>
  )
}

interface TickerProps {}
const TextTicker: React.FunctionComponent<TickerProps> = () => {
  const scaledFrame = useRef<number>(0)
  const requestRef = useRef<number>(0)
  const spanRef = useRef<any>()

  useEffect(() => {
    animate()
  })
  useEffect(() => console.log(scaledFrame), [scaledFrame])
  const animate = useCallback(() => {
    requestRef.current = requestAnimationFrame(animate)
    if (scaledFrame.current < 28000) {
      scaledFrame.current = requestRef.current * 2
    } else if (scaledFrame.current >= 28000) {
      spanRef.current.style.transform = `translateX(${
        scaledFrame.current - 60000
      })`
    }
    spanRef.current.style.transform = `translateX(${
      scaledFrame.current - 30000
    }px)`
  }, [])

  return (
    <div ref={spanRef} className='text-container'>
      <span>
        make some noise make some noise make some noise make some noise make
        some noise make some noise make some noise make some noise make some
        noise make some noise make some noise make some noise make some noise
        make some noise make some noise make some noise make some noise make
        some noise make some noise make some noise make some noise make some
        noise make some noise make some noise make some noise make some noise
        make some noise make some noise make some noise make some noise make
        some noise make some noise make some noise make some noise make some
        noise make some noise make some noise make some noise make some noise
        make some noise make some noise make some noise make some noise make
        some noise make some noise make some noise make some noise make some
        noise make some noise make some noise make some noise make some noise
        make some noise make some noise make some noise make some noise make
        some noise make some noise make some noise make some noise make some
        noise make some noise make some noise make some noise make some noise
        make some noise make some noise make some noise make some noise make
        some noise make some noise make some noise make some noise make some
        noise make some noise make some noise make some noise make some noise
        make some noise make some noise make some noise make some noise make
        some noise make some noise make some noise make some noise make some
        noise make some noise make some noise make some noise make some noise
        make some noise make some noise make some noise make some noise make
        some noise make some noise make some noise make some noise make some
        noise make some noise make some noise make some noise make some noise
        make some noise make some noise make some noise make some noise make
        some noise make some noise make some noise make some noise make some
        noise make some noise make some noise make some noise make some noise
        make some noise make some noise make some noise make some noise make
        some noise make some noise make some noise make some noise make some
        noise make some noise make some noise make some noise make some noise
        make some noise make some noise make some noise make some noise make
        some noise make some noise make some noise make some noise make some
        noise make some noise make some noise make some noise make some noise
        make some noise make some noise make some noise make some noise make
        some noise make some noise make some noise make some noise make some
        noise make some noise make some noise make some noise make some noise
        make some noise make some noise make some noise make some noise make
        some noise make some noise make some noise make some noise make some
        noise make some noise make some noise make some noise
      </span>
    </div>
  )
}
export default TextBanner
