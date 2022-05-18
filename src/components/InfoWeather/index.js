import moment from 'moment'
import React from 'react'

function InfoWeather({ data }) {
  const WIDTH_SCREEN = window.innerWidth
  const HEIGHT_CANVAS = window.innerHeight / 2
  const generateInfoTide = (width, height, tempData) => {
    const spaceWave = 90
    const newItem = tempData.map((e, index) => {
      return {
        xRect: (index * width) / 2 - 35,
        yRect: (height * 3) / 4 - (height / 4) * e.tide - spaceWave,
        time: moment(e.hour, 'YYYY-MM-DD HH:mm').format('hh:mm a'),
        tide: e.tide + ' m',
      }
    })
    return newItem
  }
  return generateInfoTide(WIDTH_SCREEN, HEIGHT_CANVAS, data).map((e, index) => {
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
  })
}

export default React.memo(InfoWeather)
