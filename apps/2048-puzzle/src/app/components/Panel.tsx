import { FC } from 'react'
import styled from '@emotion/styled'

interface PanelProps {
    score: number
    onNewGame: () => void
}

export const Panel: FC<PanelProps> = ({ score, onNewGame }) => {
    return (
        <PanelWrapper>
            <h1>2048</h1>
            <NewGame onClick={onNewGame}>new game</NewGame>
            <p>score: {score}</p>
        </PanelWrapper>
    )
}

const NewGame = styled.button`
    display: block;
    margin: 2rem auto;
    padding: 1rem 1rem;
    background-color: #8f7a66;
    font-family: Arial;
    color: white;
    border-radius: 1rem;
    text-decoration: none;
    cursor: pointer;

    :hover {
        background-color: #9f8b77;
    }
`

const PanelWrapper = styled.div`
    display: block;
    margin: 0 auto;
    width: 50rem;
    text-align: center;

    h1 {
        font-family: Arial;
        font-size: 6rem;
        font-weight: bold;
    }

    p {
        font-family: Arial;
        font-size: 2.5rem;
        margin: 2rem auto;
    }
`
