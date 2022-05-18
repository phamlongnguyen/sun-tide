function TideShape({ data = [] }) {
  const WIDTH_SCREEN = window.innerWidth
  const HEIGHT_CANVAS = window.innerHeight / 2

  const generatePathWave = (data, width, height, mainWidth) => {
    const newData = Object.values(data)
    const halfWidth = mainWidth / 2
    const aQuarterWidth = mainWidth / 4
    const threePartsWidth = (mainWidth / 4) * 3
    const aQuarterHeight = height / 4

    const getWaveValue = (item, index, resolveItem) => {
      return item?.[index]?.tide
        ? (height * 3) / 4 -
            aQuarterHeight * (resolveItem ? resolveItem : item?.[index]?.tide)
        : false
    }

    const rs = newData.reduce((acc, item, index) => {
      const startPoints = index * width * 2
      const wave1 = getWaveValue(item, 0)
      const wave2 = getWaveValue(item, 1)
      const wave3 = getWaveValue(item, 2)
      const wave4 = getWaveValue(item, 3)
      const wave5 = getWaveValue(item, 2, newData[index + 1]?.[0]?.tide)

      const left1 =
        wave2 && wave1
          ? ` M ${startPoints},${wave1} C${
              startPoints + aQuarterWidth
            },${wave1} ${startPoints + aQuarterWidth},${wave2} ${
              startPoints + halfWidth
            },${wave2} V ${height} L ${startPoints} ${height} Z`
          : ''

      const right1 =
        wave3 && wave2
          ? ` M ${startPoints + halfWidth},${wave2} C${
              startPoints + threePartsWidth
            },${wave2} ${startPoints + threePartsWidth},${wave3} ${
              startPoints + width
            },${wave3} V ${height} L ${startPoints + halfWidth} ${height} Z`
          : ''

      const left2 =
        wave4 && wave3
          ? `M ${startPoints + width},${wave3} C${
              startPoints + width + aQuarterWidth
            },${wave3} ${startPoints + width + aQuarterWidth},${wave4} ${
              startPoints + width + halfWidth
            },${wave4} V ${height} L ${startPoints + width},${height} Z `
          : ''

      const right2 =
        wave5 && wave4
          ? ` M ${startPoints + width + halfWidth},${wave4} C${
              startPoints + width + threePartsWidth
            },${wave4} ${startPoints + width + threePartsWidth},${wave5} ${
              startPoints + width * 2
            },${wave5} V ${height} L ${
              startPoints + width + halfWidth
            },${height} Z`
          : ''
      return acc + left1 + right1 + left2 + right2
    }, '')
    return rs
  }

  return (
    <path
      d={generatePathWave(data, WIDTH_SCREEN, HEIGHT_CANVAS, WIDTH_SCREEN)}
      strokeWidth="5"
      fill="#C1E5F7"
    />
  )
}

export default TideShape
