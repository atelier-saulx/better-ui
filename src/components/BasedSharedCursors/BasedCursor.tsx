import React, {useEffect, useRef, useState} from "react";
import {Badge} from "../Badge/index.js";
import {ClickCoordinates, MouseCoordinates} from "../../hooks/useTrackMouse/index.js";

export type CursorProps = {
  fps?: number,
  size?: number,
  visible?: boolean,
  position?: MouseCoordinates,
  click?: ClickCoordinates,
  color?: string,
  svgPath?: string,
  svgUrl?: string,
  text?: string
}

const svgDefaultPath: string = 'M0 55.2V426c0 12.2 9.9 22 22 22c6.3 0 12.4-2.7 16.6-7.5L121.2 346l58.1 116.3c7.9 15.8 27.1 22.2 42.9 14.3s22.2-27.1 14.3-42.9L179.8 320H297.9c12.2 0 22.1-9.9 22.1-22.1c0-6.3-2.7-12.3-7.4-16.5L38.6 37.9C34.3 34.1 28.9 32 23.2 32C10.4 32 0 42.4 0 55.2z';

export const BasedCursor: React.FC<CursorProps> = ({ fps = 1, size= 19, visible = false, position = {x: 0, y:0}, click = {x: 0, y:0, timestamp: 0}, color = '#000000', svgPath = svgDefaultPath, svgUrl, text}) => {
  const previousTimestampRef = useRef<number>(click.timestamp);
  const [clickAnimation, setClickAnimation] = useState<boolean>(false)
  const [mousePosition, setMousePosition] = useState<MouseCoordinates>(position)
  const transitionByFPS = (fps: number): number => {
    if (fps <= 5) {
      return fps * 0.5
    } else if (fps >= 5 && fps < 10) {
      return fps * 0.05
    } else if (fps >= 10) {
      return fps * 0.01
    } else {
      return 1
    }
  }
  const transitionFPS = useRef<number>(transitionByFPS(fps))
  const delayRef = useRef<number>(transitionFPS.current * 1000);

  const deviateMousePosition = (mousePosition: MouseCoordinates) => {
    setMousePosition(mousePosition)

    setTimeout(() => {
      setClickAnimation(true)

      setTimeout(() => {
        setClickAnimation(false)
      }, 500)
    }, delayRef.current)
  }

  const checkClickElapsedTime = (actualTimestamp: number, transitionFPS: number) => {
    const elapsedTime: number = actualTimestamp - previousTimestampRef.current;
    const delay: number = transitionFPS * 1000

    return elapsedTime > delay;
  }

  useEffect(() => {
    if (click.timestamp !== previousTimestampRef.current && checkClickElapsedTime(click.timestamp, transitionFPS.current)) {
      previousTimestampRef.current = click.timestamp

      deviateMousePosition({
        x: click.x,
        y: click.y,
      })
    } else {
      setMousePosition({
        x: position.x,
        y: position.y,
      })
    }
  }, [click.timestamp, position.x, position.y]);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          transition: `all ${transitionFPS.current}s ease, opacity .2s ease`,
          opacity: visible ? 1 : 0,
          width: `${size}px`,
          height: `${size}px`,
          pointerEvents: 'none',
          left: `${mousePosition.x - 8}px`,
          top: `${mousePosition.y - 4}px`
        }}
      >
        {svgPath &&
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 231 512"
          >
            <path d={svgPath} fill={color}/>
          </svg>
        }
        {svgUrl &&
          <img
            src={svgUrl}
            alt="custom cursor"
            style={{width: '100%', height: '100%'}}
          />
        }
        <div style={{
          position: 'absolute',
          left: '5px',
          top: '-48px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100px'
        }}>
          <div style={{
            width: '0px',
            height: '0px',
            border: '0.2px solid rgba(0, 0, 0, 0.2)',
            borderRadius: '50%',
            transformOrigin: 'center',
            animation: clickAnimation ? `0.5s ease 0s infinite forwards click-ring` : 'none'
          }}></div>
        </div>
        {text &&
          <Badge children={text} size="small" color="primary" style={{
            opacity: 0.6,
            top: size - 5,
            left: size,
            fontSize: '8px',
            background: color,
            position: 'absolute'
          }}/>
        }
      </div>
    </>
  )
}