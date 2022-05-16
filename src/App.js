import React from 'react'
import moment from 'moment'
import './App.scss'

const LOOP_BACKGROUND = 10
const HEIGHT_WAVE = 50
const ALL_MINUTES_ONE_DAY = 720

function App() {
  const WIDTH_SCREEN = window.innerWidth
  const HEIGHT_CANVAS = window.innerHeight / 2
  const lineRef = React.useRef(null)
  const containerRef = React.useRef(null)
  const [point, setPoint] = React.useState({ x: 0, y: 0 })
  const [currentTime, setCurrentTime] = React.useState({
    time: '06:00 am',
    day: '1',
  })

  React.useEffect(() => {
    const container = containerRef.current
    const onScroll = () => {
      const oneMinutes = WIDTH_SCREEN / ALL_MINUTES_ONE_DAY

      setPoint({
        x: container.scrollLeft + WIDTH_SCREEN / 2 - 10,
        y:
          Number(
            findY(
              lineRef.current,
              container.scrollLeft + WIDTH_SCREEN / 2,
              WIDTH_SCREEN
            )
          ) - 10,
      })
      const day = (container.scrollLeft + WIDTH_SCREEN / 2) / (WIDTH_SCREEN * 2)
      setCurrentTime({
        day: parseInt(day) + 1,
        time: moment
          .utc()
          .startOf('day')
          .add(container.scrollLeft / oneMinutes, 'minutes')
          .add(6, 'hours')
          .format('hh:mm a'),
      })
    }
    container.addEventListener('scroll', onScroll)
    return () => container.removeEventListener('scroll', onScroll)
  }, [WIDTH_SCREEN])

  function findY(path, x, width) {
    var pathLength = path.getTotalLength()
    var start = 0
    var end = pathLength
    var target = width / 2

    x = Math.max(x, path.getPointAtLength(0).x)
    x = Math.min(x, path.getPointAtLength(pathLength).x)
    while (target >= start && target <= pathLength) {
      var pos = path.getPointAtLength(target)
      if (Math.abs(pos.x - x) < 0.001) {
        return pos.y
      } else if (pos.x > x) {
        end = target
      } else {
        start = target
      }
      target = (start + end) / 2
    }
  }
  console.log('=====console===== >>22 ')
  const generatePathWave = (width, height, mainWidth) => {
    const pathSize = width - mainWidth
    const halfWidth = mainWidth / 2 + pathSize
    const aQuarterWidth = mainWidth / 4 + pathSize
    const halfHeight = height / 2
    const upWave = halfHeight + HEIGHT_WAVE
    const downWave = halfHeight - HEIGHT_WAVE

    const leftPoint = `M ${pathSize},${upWave} C${aQuarterWidth},${upWave} ${aQuarterWidth},${downWave} ${halfWidth},${downWave} V ${height} L ${
      width - mainWidth
    } ${height} z`

    const rightPoint = `M ${halfWidth - 1},${halfHeight - HEIGHT_WAVE} C${
      mainWidth / 4 + halfWidth
    },${downWave} ${
      mainWidth / 4 + halfWidth
    },${upWave} ${width},${upWave} V ${height} L ${pathSize} ${height} z`

    return [leftPoint, rightPoint]
  }

  const generatePathShadow = (width, timeLoop) => {
    let count = width + width / 2
    const newItem = Array.from({ length: timeLoop }).map((_, index) => {
      count += !index ? 0 : width * 2
      return {
        x: count,
        y: 0,
      }
    })
    return [{ x: 0, y: 0 }, ...newItem]
  }

  const generateInfoTide = (width, height, timeLoop) => {
    const oneMinutes = WIDTH_SCREEN / ALL_MINUTES_ONE_DAY
    const spaceWave = 70
    const newItem = Array.from({ length: timeLoop / 0.5 }).map((_, index) => {
      return {
        xRect: (index * width) / 2 - 35,
        yRect:
          index % 2 === 0
            ? height / 2 + HEIGHT_WAVE - spaceWave
            : height / 2 - HEIGHT_WAVE - spaceWave,
        time: moment
          .utc()
          .startOf('day')
          .add((index * width) / 2 / oneMinutes, 'minutes')
          .format('hh:mm a'),
        tide: index % 2 === 0 ? '0.3m' : '2m',
      }
    })
    return newItem
  }

  const generateLineSun = (width, height, mainWidth, index) => {
    const pathSize = width - mainWidth + mainWidth / 2 // diem bat dau cua svg
    const aQuarterWidth = mainWidth / 4 + pathSize // diem bat dau cau 1/4
    const threePathWidth = (mainWidth / 4) * 3 + pathSize // diem bat dau cau 1/4

    return (
      (!index ? `M 0,${height + 2} H ${mainWidth / 2}` : '') +
      ` M ${pathSize},${height + 2} C${aQuarterWidth},0 ${threePathWidth},0 ${
        width + mainWidth / 2
      },${height + 2}  H ${pathSize + mainWidth * 2} `
    )
  }

  const hiddenSun = (x, shadowPoints) =>
    shadowPoints.some((e, index) => {
      return e.x <= x && e.x + (!index ? WIDTH_SCREEN / 2 : WIDTH_SCREEN) > x
    })

  const positionShadow = generatePathShadow(WIDTH_SCREEN, LOOP_BACKGROUND)
  return (
    <div className="App">
      <div className="App__top">oke</div>

      <div className="App__bottom" ref={containerRef}>
        <svg height={HEIGHT_CANVAS} width={WIDTH_SCREEN * LOOP_BACKGROUND}>
          <path
            d={Array.from({ length: LOOP_BACKGROUND })
              .map((_, index) => {
                return generatePathWave(
                  WIDTH_SCREEN * (index + 1),
                  HEIGHT_CANVAS,
                  WIDTH_SCREEN
                )[0]
              })
              .join(' ')}
            strokeWidth="5"
            fill="#C1E5F7"
          />
          <path
            d={Array.from({ length: LOOP_BACKGROUND })
              .map((_, index) => {
                return generatePathWave(
                  WIDTH_SCREEN * (index + 1),
                  HEIGHT_CANVAS,
                  WIDTH_SCREEN
                )[1]
              })
              .join(' ')}
            strokeWidth="5"
            fill="#C1E5F7"
          />
          {generateInfoTide(WIDTH_SCREEN, HEIGHT_CANVAS, LOOP_BACKGROUND).map(
            (e, index) => {
              return (
                <g key={index}>
                  <rect
                    x={e.xRect}
                    y={e.yRect}
                    width="70"
                    height="50"
                    fill="#e4e4e4"
                  ></rect>
                  <text
                    x={e.xRect + 21}
                    y={e.yRect + 20}
                    fontFamily="Verdana"
                    fontSize="12"
                    fill="black"
                  >
                    {e.tide}
                  </text>
                  <text
                    x={e.xRect + 6.5}
                    y={e.yRect + 40}
                    fontFamily="Verdana"
                    fontSize="12"
                    fill="black"
                  >
                    {e.time}
                  </text>
                </g>
              )
            }
          )}
          {positionShadow.map((e, index) => {
            return (
              <rect
                key={index}
                x={e.x}
                y={e.y}
                width={!index ? WIDTH_SCREEN / 2 : WIDTH_SCREEN}
                height={HEIGHT_CANVAS}
                fill="black"
                opacity={0.2}
              />
            )
          })}
          <path
            d={Array.from({ length: LOOP_BACKGROUND })
              .map((_, index) => {
                return index % 2 === 0
                  ? generateLineSun(
                      WIDTH_SCREEN * (index + 1),
                      HEIGHT_CANVAS,
                      WIDTH_SCREEN,
                      index
                    )
                  : ''
              })
              .filter(e => e)
              .join(` `)}
            stroke="#FE8516"
            ref={lineRef}
            strokeWidth={2}
            strokeLinecap="round"
            fill="none"
          />

          <image
            href="/sun.svg"
            width="20"
            height="20"
            style={{
              display: hiddenSun(point.x, positionShadow) ? 'none' : 'block',
            }}
            x={point.x}
            y={point.y}
          />
        </svg>
        <div className="App__bottom__kim"></div>
        <img
          className="App__bottom__moon"
          src={`/moon.svg`}
          alt="moon"
          style={{
            display: hiddenSun(point.x, positionShadow) ? 'block' : 'none',
          }}
        />
        <p className="App__bottom__time">{currentTime.time}</p>
        <p className="App__bottom_day">Day {currentTime.day} </p>
      </div>
    </div>
  )
}

export default App
