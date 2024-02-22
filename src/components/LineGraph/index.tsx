import React, { FunctionComponent, useRef, useState, useEffect } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { NumberFormat } from '@based/pretty-number'
import { LineGraphDataInput, LineXGraphFormat } from './types.js'
import { getGlobalMinMax, processData } from './utils.js'
import genLabels from './genLabels.js'
import { genPaths } from './genPath.js'
import XAxis from './XAxis.js'
import Labels from './Labels.js'
import OverlayWrapper from './OverlayWrapper.js'
import { Text } from '../../index.js'

const Graph = ({
  width,
  height,
  data: dataInput,
  xFormat,
  label,
  valueFormat,
}: {
  width: number
  height: number
  data: LineGraphDataInput
  xFormat?: LineXGraphFormat
  label?: string
  valueFormat?: NumberFormat | string
}) => {
  const labelRef = useRef<any>()
  const [labelWidth, updateLabelWidth] = useState(0)
  const svgWidth = width - labelWidth
  const svgHeight = height - (label ? 66 : 32) + (xFormat ? 0 : 16)

  const data = processData({ dataInput })
  const { globalMaxY, globalMinY, globalMaxX, globalMinX } =
    getGlobalMinMax(data)
  const ySpread = globalMaxY - globalMinY

  useEffect(() => {
    if (labelRef.current) {
      updateLabelWidth(labelRef.current.getBoundingClientRect().width)
    }
  }, [ySpread])

  const { paths, lineRefs } = genPaths({
    data: data,
    width: svgWidth,
    height: svgHeight,
  })

  const { labels, labelHeight } = genLabels(svgHeight, ySpread, globalMaxY)

  return (
    <div
      style={{
        width,
        height,
      }}
    >
      {label ? (
        <Text style={{ fontWeight: 600, fontSize: 15, marginBottom: 24 }}>
          {label}
        </Text>
      ) : null}
      <div
        style={{
          width,
          height: svgHeight,
          display: 'flex',
          paddingTop: 12,
        }}
      >
        <div
          ref={labelRef}
          style={{
            marginTop: -32,
            paddingRight: 24,
          }}
        >
          <Labels
            labels={labels}
            labelHeight={labelHeight}
            valueFormat={valueFormat}
          />
        </div>
        <OverlayWrapper
          isStacked={false}
          legend={false}
          width={svgWidth}
          height={svgHeight}
          labelHeight={labelHeight}
          labels={labels}
          data={data}
          ySpread={ySpread}
          lineRefs={lineRefs}
          xFormat={xFormat}
        >
          {paths}
        </OverlayWrapper>
      </div>
      {xFormat ? (
        <div
          style={{
            paddingLeft: labelWidth + 'px',
          }}
        >
          <XAxis
            maxX={globalMaxX}
            minX={globalMinX}
            xFormat={xFormat}
            width={svgWidth}
          />
        </div>
      ) : null}
    </div>
  )
}

export type LineGraphProps = {
  data: LineGraphDataInput
  xFormat?: LineXGraphFormat
  valueFormat?: NumberFormat | string
  label?: string
}
export const LineGraph: FunctionComponent<LineGraphProps> = ({
  data,
  label,
  xFormat = 'number',
  valueFormat = 'number-short',
}) => {
  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <Graph
            label={label}
            data={data}
            height={height}
            width={width}
            xFormat={xFormat}
            valueFormat={valueFormat}
          />
        )
      }}
    </AutoSizer>
  )
}
