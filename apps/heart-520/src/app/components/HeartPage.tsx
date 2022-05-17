import { FC, useState } from 'react'
import { useInterval, useMemoizedFn } from 'ahooks'
import dayjs, { Dayjs } from 'dayjs'
import styled from '@emotion/styled'

import { HISTORY } from '../../config'

import { Avatar, Carousel, Image } from 'antd'
import createFromIconfontCN from '@ant-design/icons/es/components/IconFont'
import { SarairRow } from '@sarair/desktop/shared/ui'
import { HeartCanvas } from './HeartCanvas'
import { HeartWind } from './HeartWind'

import lyy from '../../assets/lyy.jpg'
import syp from '../../assets/syp.jpg'

const dateTogether = dayjs('2019-02-19')

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_3406918_yj87cwkdb.js'
})

export const HeartPage: FC = () => {
    const [clicked, setClicked] = useState<boolean>(false)
    const [iconType, setIconType] = useState<
        'icon-valentine_-lock-heart-love-key' | 'icon-heartbeat'
    >('icon-valentine_-lock-heart-love-key')

    const [now, setNow] = useState<Dayjs>(dayjs())
    const [text, setText] = useState<string | undefined>(
        HISTORY.find(({ year }) => 2019 === year)?.text
    )

    const handleIconClick = useMemoizedFn(() => {
        setIconType('icon-heartbeat')
        setTimeout(() => setClicked(true), 800)
    })

    useInterval(() => setNow(dayjs()), 1000)

    return (
        <PageWrapper>
            <div style={{ display: clicked ? 'block' : 'none' }}>
                <HeartCanvas />
                <HeartWind />
                <TextWrapper>
                    <TextTitle>小宝贝儿，这是我们在一起的</TextTitle>
                    <Text>
                        {now.diff(dateTogether, 'day')} <Unit>天</Unit>{' '}
                        {now.hour()} <Unit>时</Unit> {now.minute()}{' '}
                        <Unit>分</Unit> {now.second()} <Unit>秒</Unit>
                    </Text>
                </TextWrapper>
                <Lyy>
                    <Avatar src={lyy} size={160} />
                </Lyy>
                <Syp>
                    <Avatar src={syp} size={160} />
                </Syp>
                <Together>
                    <Carousel
                        autoplay
                        dotPosition="left"
                        beforeChange={(_, to) =>
                            setText(
                                HISTORY.find(({ year }) => 2019 + to === year)
                                    ?.text
                            )
                        }
                    >
                        {HISTORY.map(({ year, src }) => (
                            <div key={year}>
                                <Image src={src} preview={false} width={160} />
                            </div>
                        ))}
                    </Carousel>
                    <ImageText>
                        {text?.split('|').map(phrase => (
                            <div key={phrase}>{phrase}</div>
                        ))}
                    </ImageText>
                </Together>
            </div>
            <div style={{ display: clicked ? 'none' : 'flex' }}>
                <ClickText>点击进入 &gt; &gt; &gt;</ClickText>
                <ClickIcon type={iconType} onClick={handleIconClick} />
            </div>
        </PageWrapper>
    )
}

const ClickText = styled.div`
    margin: 16px;
    color: #ff7875;
    font-size: 20px;
`

const ClickIcon = styled(IconFont)`
    svg {
        width: 48px;
        height: 48px;

        animation: zoom 2.4s infinite;

        @keyframes zoom {
            0%,
            100% {
                width: 48px;
                height: 48px;
            }
            50% {
                width: 60px;
                height: 60px;
            }
        }
    }
`

const ImageText = styled.div`
    margin-top: 16px;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
`

const Together = styled.div`
    position: absolute;
    top: 50%;
    left: 40%;
    transform: translate(-50%, -50%);

    animation: show 4.8s linear;
    @keyframes show {
        0%,
        25% {
            display: none;
            opacity: 0;
        }
        50% {
            display: block;
            opacity: 1;
        }
        100% {
            left: 40%;
        }
    }
`

const Syp = styled.div`
    position: absolute;
    right: 15%;
    top: 35%;
    opacity: 0;
    animation: move-left 2s linear;

    @keyframes move-left {
        0% {
            right: 15%;
        }
        50% {
            opacity: 1;
        }
        100% {
            right: 41.5%;
            opacity: 0;
        }
    }
`

const Lyy = styled.div`
    position: absolute;
    left: 15%;
    top: 35%;
    opacity: 0;
    animation: move-right 2s linear;

    @keyframes move-right {
        0% {
            left: 15%;
        }
        50% {
            opacity: 1;
        }
        100% {
            left: 41.5%;
            opacity: 0;
        }
    }
`

const Unit = styled.span`
    margin: 4px;
    font-size: 24px;
`

const Text = styled.div`
    font-size: 36px;
    animation: shine 2.4s infinite;

    @keyframes shine {
        0%,
        100% {
            color: #fff;
            text-shadow: 0 0 10px #fff, 0 0 10px #fff;
        }
        50% {
            text-shadow: 0 0 10px #fff, 0 0 40px #fff;
        }
    }
`

const TextTitle = styled.div`
    margin-bottom: 8px;
    font-size: 24px;
`

const TextWrapper = styled.div`
    position: absolute;
    bottom: 15%;
    right: 10%;
    color: #fff;
    font-weight: bold;
`

const PageWrapper = styled.div`
    position: relative;
`

export default HeartPage
