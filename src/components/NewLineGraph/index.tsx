import * as React from 'react'

export function NewLineGraph({ data }) {
  const containerRef = React.useRef(null)
  const [dimensions, setDimensions] = React.useState({
    width: 0,
    height: 0,
  })

  const handleResize = React.useCallback(() => {
    const { clientWidth: width, clientHeight: height } = containerRef.current
    setDimensions((prevDimensions) => {
      if (prevDimensions.width !== width || prevDimensions.height !== height) {
        return { width, height }
      }
      return prevDimensions
    })
  }, [])

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver(handleResize)

    if (containerRef.current) {
      handleResize()
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [handleResize])

  React.useLayoutEffect(() => {
    handleResize() // Ensure immediate DOM updates
  }, [dimensions.width, dimensions.height, handleResize])

  const paths = React.useMemo(() => {
    let minX = Infinity
    let maxX = -Infinity
    let minY = Infinity
    let maxY = -Infinity

    const pathsArray = []

    for (const line of data) {
      const points = []

      for (let i = 0; i < line.length; i++) {
        const point = line[i]

        minX = Math.min(minX, point.x)
        maxX = Math.max(maxX, point.x)
        minY = Math.min(minY, point.y)
        maxY = Math.max(maxY, point.y)

        points.push(point)
      }

      const pathData = points
        .map(
          (point) =>
            `${((point.x - minX) / (maxX - minX)) * (dimensions.width - 0) + 0} ${((point.y - minY) / (maxY - minY)) * (dimensions.height - 0) + 0}`,
        )
        .join(' ')

      pathsArray.push(pathData)
    }

    return pathsArray
  }, [data, dimensions])

  return (
    <svg
      ref={containerRef}
      width="100%"
      height="100%"
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
    >
      {dimensions.width > 0 &&
        dimensions.height > 0 &&
        paths.map((pathData, index) => (
          <path key={index} d={`M ${pathData}`} fill="none" stroke="red" />
        ))}
    </svg>
  )
}
