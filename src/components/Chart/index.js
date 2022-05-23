import React from 'react'
import moment from 'moment'
import './Chart.scss'
import TideShape from '../TideShape'
import InfoWeather from '../InfoWeather'

const ALL_MINUTES_ONE_DAY = 720

const Chart = ({ data = [] }) => {
  const WIDTH_SCREEN = window.innerWidth
  const HEIGHT_CANVAS = window.innerHeight / 2
  const lineRef = React.useRef(null)
  const containerRef = React.useRef(null)
  const [currentTime, setCurrentTime] = React.useState({
    time: '06:00 am',
    day: '1',
  })

  React.useEffect(() => {
    const container = containerRef.current
    const onScroll = () => {
      const oneMinutes = WIDTH_SCREEN / ALL_MINUTES_ONE_DAY

      const day =
        parseInt(
          (container.scrollLeft + WIDTH_SCREEN / 2) / (WIDTH_SCREEN * 2)
        ) + 1
      setCurrentTime({
        day: day,
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

  const generatePathShadow = (width, timeLoop) => {
    let count = width * 1.5
    const newItem = Array.from({ length: timeLoop }).map((_, index) => {
      count += !index ? 0 : width * 2
      return {
        x: count,
        y: 0,
      }
    })
    return [{ x: 0, y: 0 }, ...newItem]
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

  const chartWeather = data.reduce((acc, item) => {
    const key = moment(item.hour).format('YYYY-MM-DD')
    return acc[key]
      ? { ...acc, [key]: [...acc[key], item] }
      : { ...acc, [key]: [item] }
  }, {})
  const positionShadow = generatePathShadow(
    WIDTH_SCREEN,
    Object.keys(chartWeather).length * 2
  )

  return (
    <div className="Chart__wave__container" ref={containerRef}>
      <svg
        data-testid="chart-svg"
        height={HEIGHT_CANVAS}
        width={WIDTH_SCREEN * Object.keys(chartWeather).length * 2}
      >
        <TideShape data={chartWeather} />
        <InfoWeather data={data} />
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
          d={Array.from({ length: Object.keys(chartWeather).length * 3 })
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
      </svg>
      <div className="Chart__wave__kim"></div>
      {hiddenSun(
        (containerRef.current?.scrollLeft || 0) + WIDTH_SCREEN / 2 - 10,
        positionShadow
      ) && <img className="Chart__wave__moon" src={`/moon.svg`} alt="moon" />}
      <p className="Chart__wave__time">{currentTime.time}</p>
      <p className="Chart__wave__day">Day {currentTime.day} </p>
    </div>
  )
}

export default Chart
