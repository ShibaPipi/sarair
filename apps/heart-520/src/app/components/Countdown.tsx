import { FC } from 'react'
import styled from '@emotion/styled'

import { useTime } from '../../api'
import { TIMEUP } from '../../config'

import { StatisticCountdown } from '@sarair/desktop/shared/ui'
import { HeartWind } from './HeartWind'

export const Countdown: FC = () => {
    const {
        methods: { setTimeup }
    } = useTime()

    return (
        <CountdownWrapper>
            <HeartWind />
            <StatisticCountdown
                title="距离 2022 年 520 告白日还有"
                value={TIMEUP}
                format="D 天 H 时 m 分 s 秒 SSS ..."
                valueStyle={{ fontSize: 48, color: '#eb2f96' }}
                onFinish={() => setTimeup(true)}
            />
        </CountdownWrapper>
    )
}

const CountdownWrapper = styled.div`
    .ant-statistic-title {
        font-size: 24px;
    }
`

export default Countdown
