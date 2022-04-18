import { useEffect, useState } from 'react'
import styled from '@emotion/styled'

const data = Array(4)
    .fill(0)
    .map((_, index) => index * 10)

export const Test = () => {
    const [size, setSize] = useState<number>()

    return (
        <Container>
            {data.map((item, index) => (
                <Cell
                    key={index}
                    style={{ width: size || item, height: size || item }}
                >
                    123
                </Cell>
            ))}
            <button onClick={() => setSize(200)}>set size</button>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
`

const Cell = styled.div`
    background-color: black;
    color: white;
    font-size: 20px;
    transition: all 3s;
`
