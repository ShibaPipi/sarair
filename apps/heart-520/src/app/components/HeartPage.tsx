import { FC, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import styled from '@emotion/styled'

import { useInterval } from '@sarair/shared/hooks'

import {
    Avatar,
    Carousel,
    Image,
    TypographyText
} from '@sarair/desktop/shared/ui'
import { HeartCanvas } from './HeartCanvas'
import { HeartWind } from './HeartWind'

import lyy from '../../assets/lyy.jpg'
import syp from '../../assets/syp.jpg'
import { HISTORY } from '../../config'

const dateTogether = dayjs('2019-02-19')

export const HeartPage: FC = () => {
    const [now, setNow] = useState<Dayjs>(dayjs())
    const [text, setText] = useState<string | undefined>(
        HISTORY.find(({ year }) => 2019 === year)?.text
    )

    useInterval(() => setNow(dayjs()), 1000)

    return (
        <PageWrapper>
            <HeartCanvas />
            <HeartWind />
            <TextWrapper>
                <TextTitle>小宝贝儿，这是我们在一起的</TextTitle>
                <Text>
                    {now.diff(dateTogether, 'day')} 天 {now.hour()} 时{' '}
                    {now.minute()} 分 {now.second()} 秒
                </Text>
            </TextWrapper>
            <Lyy src={lyy} size={160} />
            <Syp src={syp} size={160} />
            <Together>
                <Carousel
                    autoplay
                    dotPosition="left"
                    beforeChange={(_, to) =>
                        setText(
                            HISTORY.find(({ year }) => 2019 + to === year)?.text
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
                        <div>{phrase}</div>
                    ))}
                </ImageText>
            </Together>
        </PageWrapper>
    )
}

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

const Syp = styled(Avatar)`
    position: absolute;
    right: 15%;
    top: 35%;
    opacity: 0;
    animation: move-left 2s linear;

    @keyframes move-left {
        0% {
            right: 15%;
            opacity: 1;
        }
        100% {
            right: 41.5%;
            opacity: 0;
        }
    }
`

const Lyy = styled(Avatar)`
    position: absolute;
    left: 15%;
    top: 35%;
    opacity: 0;
    animation: move-right 2s linear;

    @keyframes move-right {
        0% {
            left: 15%;
            opacity: 1;
        }
        100% {
            left: 41.5%;
            opacity: 0;
        }
    }
`

const Text = styled.div`
    font-size: 32px;
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
