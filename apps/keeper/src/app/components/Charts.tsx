// Basic Imports
import React from 'react'
import styled from '@emotion/styled'

// Echarts Imports
import * as echarts from 'echarts/core'
import {
    GridComponent,
    LegendComponent,
    TitleComponent,
    ToolboxComponent,
    TooltipComponent
} from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

// Types Imports
import type { Health } from '../../models/health'

// UI Imports
import { Col, Empty, Row, Spin } from '@sarair/desktop/shared/ui'
import { Chart } from './Chart'

interface ChartProps {
    loading: boolean
    data: Health[]
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

export const Charts: React.FC<ChartProps> = ({ loading, data }) => {
    if (!data.length) return null

    return (
        <ChartsWrapper spinning={loading}>
            {!data && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            <Chart data={data} field="weight" />
            <ChartRow>
                <Col span={12}>
                    <Chart data={data} field="bmi" />
                </Col>
                <Col span={12}>
                    <Chart data={data} field="bodyFatRate" />
                </Col>
            </ChartRow>
            <ChartRow>
                <Col span={8}>
                    <Chart data={data} field="muscle" />
                </Col>
                <Col span={8}>
                    <Chart data={data} field="water" />
                </Col>
                <Col span={8}>
                    <Chart data={data} field="protein" />
                </Col>
            </ChartRow>
            <ChartRow>
                <Col span={8}>
                    <Chart data={data} field="subcutaneousFat" />
                </Col>
                <Col span={8}>
                    <Chart data={data} field="weightWithoutFat" />
                </Col>
                <Col span={8}>
                    <Chart data={data} field="skeletalMuscleRate" />
                </Col>
            </ChartRow>
        </ChartsWrapper>
    )
}

const ChartsWrapper = styled(Spin)`
    height: 20rem;
`

const ChartRow = styled(Row)`
    padding: 1.6rem 0;
`
