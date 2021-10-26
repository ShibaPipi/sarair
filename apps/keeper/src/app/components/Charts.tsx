import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import dayjs from 'dayjs'
import { compose, map, max, pluck, reduce } from 'ramda'
import * as echarts from 'echarts/core'
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

import { Empty, Spin } from '@sarair/shared/ui'

import type { HealthItem } from '../../types/health'

interface ChartProps {
  loading: boolean
  data: HealthItem[]
}

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
])

const generateData = (
  name: string,
  key: string,
  record: Array<Record<string, unknown>>
) => {
  const data = pluck(key)(record) as number[]
  const max = Math.ceil(Math.max(...data))
  const min = Math.floor(Math.min(...data))

  return {
    title: {
      text: `${name}折线图`
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: [name]
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: map((item) => dayjs(item as number).format('YYYY/MM/DD'))(
        pluck('created')(record)
      )
    },
    yAxis: {
      type: 'value',
      max,
      min
    },
    series: [
      {
        name,
        type: 'line',
        stack: 'Total',
        data
      }
    ]
  }
}

export const Charts: React.FC<ChartProps> = ({ loading, data }) => {
  console.log(data)
  const chartDOMRef = useRef<HTMLDivElement | null>(null)
  const option = useMemo(() => {
    return generateData(
      '体重',
      'weight',
      data as unknown as Record<string, unknown>[]
    )
  }, [data])

  const renderChart = useCallback(() => {
    if (!chartDOMRef.current) return

    let chartInstance = echarts.getInstanceByDom(chartDOMRef.current)
    if (!chartInstance) {
      chartInstance = echarts.init(chartDOMRef.current)
    }

    chartInstance.clear()
    chartInstance.setOption(option)
  }, [option])

  const dispose = useCallback(() => {
    chartDOMRef.current && echarts.dispose(chartDOMRef.current)
  }, [])

  useEffect(() => {
    renderChart()

    return () => dispose()
  }, [dispose, renderChart])

  return (
    <Spin spinning={loading}>
      {!data && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      <div ref={chartDOMRef} style={{ height: '40rem' }} />
    </Spin>
  )
}
