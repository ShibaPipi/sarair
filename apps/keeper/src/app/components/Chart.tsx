import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import dayjs from 'dayjs'
import { map, pluck } from 'ramda'
import * as echarts from 'echarts/core'

import { getRandomColor } from '@sarair/shared/utils'
import { healthFieldsMap } from '../../models/health'

import type { Health, HealthFieldForCharts } from '../../models/health'

interface ChartProps {
    height?: string | number
    data: Health[]
    field: HealthFieldForCharts
}

const generateData = (
    key: string,
    name: string,
    record: Record<string, unknown>[]
) => {
    const data = pluck(key)(record) as number[]
    const max = Math.ceil(Math.max(...data))
    const min = Math.floor(Math.min(...data))
    const color = getRandomColor()

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
            data: map(item => dayjs(item as number).format('YYYY/MM/DD'))(
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
                color, // broken point color
                lineStyle: {
                    color // broken line color
                },
                data
            }
        ]
    }
}

export const Chart: React.FC<ChartProps> = ({ height, data, field }) => {
    const chartDOMRef = useRef<HTMLDivElement | null>(null)
    const option = useMemo(() => {
        return generateData(
            field,
            healthFieldsMap[field].name,
            data as unknown as Record<string, unknown>[]
        )
    }, [data, field])

    const renderChart = useCallback(() => {
        if (!chartDOMRef.current) return

        let chartInstance = echarts.getInstanceByDom(chartDOMRef.current)
        if (!chartInstance) {
            chartInstance = echarts.init(chartDOMRef.current)
        }

        chartInstance.clear()
        chartInstance.setOption(option)
        chartInstance.resize()
    }, [option])

    const dispose = useCallback(() => {
        chartDOMRef.current && echarts.dispose(chartDOMRef.current)
    }, [chartDOMRef])

    useEffect(() => {
        renderChart()

        return () => dispose()
    }, [dispose, renderChart])

    return <div ref={chartDOMRef} style={{ height: height || '20rem' }} />
}
